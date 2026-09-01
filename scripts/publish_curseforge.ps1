[CmdletBinding()]
param(
    [string]$Version,
    [ValidateSet('alpha', 'beta', 'release')] [string]$ReleaseType,
    [string]$ChangelogFile,
    [switch]$SkipBuild,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
$pack = Get-Content -LiteralPath (Join-Path $repoRoot 'pack/pack.json') -Raw | ConvertFrom-Json
if ([string]::IsNullOrWhiteSpace($Version)) { $Version = [string]$pack.version }
if ([string]::IsNullOrWhiteSpace($ReleaseType)) { $ReleaseType = [string]$pack.releaseType }
if ([string]::IsNullOrWhiteSpace($ChangelogFile)) {
    $ChangelogFile = Join-Path $repoRoot "changelog/$Version.md"
}

$clientArchive = Join-Path $repoRoot "dist/$($pack.name)-$Version.zip"
$serverArchive = Join-Path $repoRoot "dist/$($pack.name)-$Version-server.zip"
# [string] cast and -Encoding utf8 matter: on Windows PowerShell 5.1 the raw string keeps
# PSObject note properties that ConvertTo-Json serializes as garbage, and ANSI decoding
# would mangle non-ASCII characters in the changelog.
$changelog = [string](Get-Content -LiteralPath $ChangelogFile -Raw -Encoding utf8)
$endpoint = "https://minecraft.curseforge.com/api/projects/$($pack.curseForgeProjectId)/upload-file"
$mainMetadata = [ordered]@{
    changelog = $changelog
    changelogType = 'markdown'
    displayName = "$($pack.name) $Version"
    gameVersionNames = @('Client', [string]$pack.minecraftVersion, 'NeoForge')
    releaseType = $ReleaseType
}

if ($DryRun) {
    Write-Host "DRY RUN: would upload $clientArchive"
    Write-Host ($mainMetadata | ConvertTo-Json -Depth 5)
    Write-Host "DRY RUN: would attach $serverArchive as the server child file"
    exit 0
}

if (-not $SkipBuild) {
    & (Join-Path $PSScriptRoot 'build_modpack.ps1') -Version $Version
}
foreach ($archive in @($clientArchive, $serverArchive)) {
    if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) {
        throw "Missing release archive: $archive"
    }
}

$token = [Environment]::GetEnvironmentVariable('CURSEFORGE_API_TOKEN')
if ([string]::IsNullOrWhiteSpace($token)) {
    throw 'CURSEFORGE_API_TOKEN is required for publishing.'
}
$headers = @{ 'X-Api-Token' = $token }
$projectId = [long]$pack.curseForgeProjectId
$filesEndpoint = "https://api.curseforge.com/v1/mods/$projectId/files"

function Get-UploadErrorBody($ErrorRecord) {
    if ($ErrorRecord.ErrorDetails -and $ErrorRecord.ErrorDetails.Message) {
        return [string]$ErrorRecord.ErrorDetails.Message
    }
    $response = $ErrorRecord.Exception.Response
    if (-not $response) { return [string]$ErrorRecord.Exception.Message }
    try {
        $stream = $response.GetResponseStream()
        if (-not $stream) { return [string]$ErrorRecord.Exception.Message }
        $reader = New-Object System.IO.StreamReader($stream)
        try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
    } catch {
        return [string]$ErrorRecord.Exception.Message
    }
}

function Get-ExistingFileId($DisplayName) {
    # Page through the project's files to find one whose displayName matches the
    # archive we are about to upload. Used to recover from a partial-release
    # failure: if the client archive uploaded but the server child failed, the
    # next run will see a "duplicate" error on the client and must continue with
    # the existing parent file ID instead of skipping the server child upload.
    $pageSize = 50
    for ($index = 0; $index -lt 50; $index += $pageSize) {
        $uri = "$filesEndpoint`?index=$index&pageSize=$pageSize"
        $page = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
        if (-not $page -or -not $page.data) { break }
        foreach ($file in @($page.data)) {
            if ($file.displayName -eq $DisplayName -and $file.id) {
                return [string]$file.id
            }
        }
        if ($page.data.Count -lt $pageSize) { break }
    }
    return $null
}

function Publish-File($Metadata, $Archive) {
    $archiveName = Split-Path -Leaf $Archive
    try {
        $response = Invoke-RestMethod -Uri $endpoint -Method Post -Headers $headers -Form @{
            metadata = ($Metadata | ConvertTo-Json -Compress -Depth 5)
            file = Get-Item -LiteralPath $Archive
        }
        if (-not $response.id) {
            throw "CurseForge did not return an ID for $Archive."
        }
        return [string]$response.id
    } catch {
        $body = Get-UploadErrorBody $_
        if ($body -match 'already|duplicate') {
            $existing = Get-ExistingFileId $Metadata.displayName
            if ($existing) {
                Write-Host "CurseForge already has $archiveName (file id $existing); reusing it for this rerun."
                return $existing
            }
            throw "CurseForge reported $archiveName as a duplicate but the file could not be located via $filesEndpoint. Aborting so a stale partial release is not silently accepted."
        }
        throw "CurseForge upload failed for ${Archive}: $body"
    }
}

$clientFileId = Publish-File $mainMetadata $clientArchive
if ($null -eq $clientFileId) {
    # Publish-File only returns $null on a catastrophic code path; the duplicate
    # branch above now returns the existing ID instead. Guard anyway so the
    # server-child step is never skipped because of a silent null.
    throw "Internal: client upload returned no file id for $clientArchive."
}

$serverMetadata = [ordered]@{
    changelog = $changelog
    changelogType = 'markdown'
    displayName = "$($pack.name) $Version Server Pack"
    parentFileID = [long]$clientFileId
    releaseType = $ReleaseType
}
$serverFileId = Publish-File $serverMetadata $serverArchive
if ($null -eq $serverFileId) {
    Write-Host "Client file id $clientFileId and its server child file are both present on CurseForge."
} else {
    Write-Host "Published client file id $clientFileId and server child file id $serverFileId."
}
