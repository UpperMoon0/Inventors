[CmdletBinding()]
param(
    [string]$Version,
    [string]$OutputDirectory,
    [switch]$NoServerDownloads
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
$packConfigPath = Join-Path $repoRoot 'pack/pack.json'
$instancePath = Join-Path $repoRoot 'minecraftinstance.json'
$pack = Get-Content -LiteralPath $packConfigPath -Raw | ConvertFrom-Json
$instance = Get-Content -LiteralPath $instancePath -Raw | ConvertFrom-Json

if ([string]::IsNullOrWhiteSpace($Version)) {
    $Version = [string]$pack.version
}
if ($Version -notmatch '^[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$') {
    throw "Invalid pack version '$Version'. Expected semantic version format."
}
if ([string]::IsNullOrWhiteSpace($OutputDirectory)) {
    $OutputDirectory = Join-Path $repoRoot 'dist'
}

$buildRoot = Join-Path $repoRoot ('.pack-build/' + [guid]::NewGuid().ToString('N'))
$clientRoot = Join-Path $buildRoot 'client'
$serverRoot = Join-Path $buildRoot 'server'
$clientOverrides = Join-Path $clientRoot 'overrides'
$null = New-Item -ItemType Directory -Path $clientOverrides, $serverRoot, $OutputDirectory -Force

function Copy-RelativeFile {
    param(
        [Parameter(Mandatory)] [string]$RelativePath,
        [Parameter(Mandatory)] [string]$DestinationRoot
    )

    $source = Join-Path $repoRoot $RelativePath
    $destination = Join-Path $DestinationRoot $RelativePath
    $parent = Split-Path -Parent $destination
    if ($parent) {
        $null = New-Item -ItemType Directory -Path $parent -Force
    }
    Copy-Item -LiteralPath $source -Destination $destination -Force
}

function Test-ServerPath {
    param([Parameter(Mandatory)] [string]$RelativePath)

    foreach ($pattern in $pack.serverExcludedPaths) {
        if ($RelativePath -like [string]$pattern) {
            return $false
        }
    }
    return $true
}

function Get-TrackedPackFiles {
    $paths = @(& git -C $repoRoot ls-files -- config kubejs defaultconfigs mods .pg-native)
    if ($LASTEXITCODE -ne 0) {
        throw 'Unable to enumerate tracked pack files with git.'
    }
    return $paths | Where-Object {
        $_ -and
        (Test-Path -LiteralPath (Join-Path $repoRoot $_) -PathType Leaf) -and
        ($_ -notlike '*.bak')
    }
}

function Get-CurseForgeFiles {
    $embedded = @($pack.embeddedProjectIds | ForEach-Object { [long]$_ })
    return @($instance.installedAddons |
        Where-Object {
            $_.addonID -and $_.installedFile.id -and ([long]$_.addonID -notin $embedded)
        } |
        Sort-Object { [long]$_.addonID } |
        ForEach-Object {
            [ordered]@{
                projectID = [long]$_.addonID
                fileID = [long]$_.installedFile.id
                required = ($_.isEnabled -ne $false)
                isLocked = $false
            }
        })
}

function Write-Utf8NoBom {
    param([Parameter(Mandatory)] [string]$Path, [Parameter(Mandatory)] [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Compress-Directory {
    param([Parameter(Mandatory)] [string]$Source, [Parameter(Mandatory)] [string]$Destination)
    if (Test-Path -LiteralPath $Destination) {
        Remove-Item -LiteralPath $Destination -Force
    }
    [System.IO.Compression.ZipFile]::CreateFromDirectory(
        $Source,
        $Destination,
        [System.IO.Compression.CompressionLevel]::Optimal,
        $false
    )
}

function Copy-OrDownloadServerMod {
    param([Parameter(Mandatory)] $Addon, [Parameter(Mandatory)] [string]$DestinationDirectory)

    $fileName = [string]$Addon.installedFile.fileName
    if ([string]::IsNullOrWhiteSpace($fileName)) {
        $fileName = "$($Addon.addonID)-$($Addon.installedFile.id).jar"
    }
    $destination = Join-Path $DestinationDirectory $fileName
    $local = Join-Path $repoRoot ('mods/' + $fileName)
    if (Test-Path -LiteralPath $local) {
        Copy-Item -LiteralPath $local -Destination $destination -Force
    }
    elseif ($NoServerDownloads) {
        throw "Server mod '$fileName' is not available locally and downloads are disabled."
    }
    else {
        $uri = [string]$Addon.installedFile.downloadUrl
        if ([string]::IsNullOrWhiteSpace($uri)) {
            $uri = "https://www.curseforge.com/api/v1/mods/$($Addon.addonID)/files/$($Addon.installedFile.id)/download"
        }
        Write-Host "Downloading server mod $fileName"
        Invoke-WebRequest -Uri $uri -OutFile $destination -MaximumRedirection 8
    }

    $sha1 = $Addon.installedFile.hashes | Where-Object { $_.type -eq 1 } | Select-Object -First 1
    if ($sha1 -and $sha1.value) {
        $actual = (Get-FileHash -LiteralPath $destination -Algorithm SHA1).Hash
        if ($actual -ne ([string]$sha1.value).ToUpperInvariant()) {
            throw "SHA-1 verification failed for $fileName."
        }
    }
}

try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem

    $trackedFiles = @(Get-TrackedPackFiles)
    foreach ($relativePath in $trackedFiles) {
        Copy-RelativeFile -RelativePath $relativePath -DestinationRoot $clientOverrides
        if (Test-ServerPath -RelativePath $relativePath) {
            Copy-RelativeFile -RelativePath $relativePath -DestinationRoot $serverRoot
        }
    }

    $curseForgeFiles = @(Get-CurseForgeFiles)
    $manifest = [ordered]@{
        minecraft = [ordered]@{
            version = [string]$pack.minecraftVersion
            modLoaders = @([ordered]@{
                id = "neoforge-$($pack.neoForgeVersion)"
                primary = $true
            })
            javaVersion = [int]$pack.javaVersion
        }
        manifestType = 'minecraftModpack'
        manifestVersion = 1
        name = [string]$pack.name
        version = $Version
        author = [string]$pack.author
        overrides = 'overrides'
        files = $curseForgeFiles
    }
    Write-Utf8NoBom -Path (Join-Path $clientRoot 'manifest.json') -Content ($manifest | ConvertTo-Json -Depth 8)

    $modList = [System.Text.StringBuilder]::new('<ul>')
    foreach ($addon in ($instance.installedAddons | Sort-Object name)) {
        $name = [System.Net.WebUtility]::HtmlEncode([string]$addon.name)
        $author = [System.Net.WebUtility]::HtmlEncode([string]$addon.primaryAuthor)
        $url = [System.Net.WebUtility]::HtmlEncode([string]$addon.webSiteURL)
        $null = $modList.AppendLine()
        $null = $modList.Append("<li><a href=`"$url`">$name</a> (by $author)</li>")
    }
    $null = $modList.AppendLine()
    $null = $modList.Append('</ul>')
    Write-Utf8NoBom -Path (Join-Path $clientRoot 'modlist.html') -Content $modList.ToString()

    $serverMods = Join-Path $serverRoot 'mods'
    $null = New-Item -ItemType Directory -Path $serverMods -Force
    $clientOnly = @($pack.clientOnlyProjectIds | ForEach-Object { [long]$_ })
    foreach ($addon in $instance.installedAddons) {
        if ($addon.isEnabled -eq $false -or [long]$addon.addonID -in $clientOnly -or
                [long]$addon.addonID -in @($pack.embeddedProjectIds | ForEach-Object { [long]$_ })) {
            continue
        }
        Copy-OrDownloadServerMod -Addon $addon -DestinationDirectory $serverMods
    }

    foreach ($file in Get-ChildItem -LiteralPath (Join-Path $repoRoot 'pack/server') -File) {
        Copy-Item -LiteralPath $file.FullName -Destination (Join-Path $serverRoot $file.Name) -Force
    }

    $installerName = "neoforge-$($pack.neoForgeVersion)-installer.jar"
    $installerDestination = Join-Path $serverRoot $installerName
    $installerBase = "https://maven.neoforged.net/releases/net/neoforged/neoforge/$($pack.neoForgeVersion)/$installerName"
    Invoke-WebRequest -Uri $installerBase -OutFile $installerDestination
    $expectedInstallerSha1 = (Invoke-RestMethod -Uri "$installerBase.sha1").Trim()
    $actualInstallerSha1 = (Get-FileHash -LiteralPath $installerDestination -Algorithm SHA1).Hash
    if ($actualInstallerSha1 -ne $expectedInstallerSha1.ToUpperInvariant()) {
        throw 'NeoForge installer SHA-1 verification failed.'
    }

    $clientArchive = Join-Path $OutputDirectory "$($pack.name)-$Version.zip"
    $serverArchive = Join-Path $OutputDirectory "$($pack.name)-$Version-server.zip"
    Compress-Directory -Source $clientRoot -Destination $clientArchive
    Compress-Directory -Source $serverRoot -Destination $serverArchive

    $clientHash = (Get-FileHash -LiteralPath $clientArchive -Algorithm SHA256).Hash
    $serverHash = (Get-FileHash -LiteralPath $serverArchive -Algorithm SHA256).Hash
    Write-Host "Built $clientArchive"
    Write-Host "SHA-256 $clientHash"
    Write-Host "Built $serverArchive"
    Write-Host "SHA-256 $serverHash"
}
finally {
    $resolvedBuildRoot = [System.IO.Path]::GetFullPath($buildRoot)
    $resolvedBuildParent = [System.IO.Path]::GetFullPath((Join-Path $repoRoot '.pack-build'))
    if ($resolvedBuildRoot.StartsWith($resolvedBuildParent, [System.StringComparison]::OrdinalIgnoreCase) -and
            (Test-Path -LiteralPath $resolvedBuildRoot)) {
        Remove-Item -LiteralPath $resolvedBuildRoot -Recurse -Force
    }
}
