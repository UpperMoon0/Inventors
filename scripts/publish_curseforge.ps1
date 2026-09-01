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
if (-not $SkipBuild) {
    & (Join-Path $PSScriptRoot 'build_modpack.ps1') -Version $Version
}
foreach ($archive in @($clientArchive, $serverArchive)) {
    if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) {
        throw "Missing release archive: $archive"
    }
}

$changelog = Get-Content -LiteralPath $ChangelogFile -Raw
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

$token = [Environment]::GetEnvironmentVariable('CURSEFORGE_API_TOKEN')
if ([string]::IsNullOrWhiteSpace($token)) {
    throw 'CURSEFORGE_API_TOKEN is required for publishing.'
}
$headers = @{ 'X-Api-Token' = $token }

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

function Publish-File($Metadata, $Archive) {
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
            Write-Host "CurseForge already has $(Split-Path -Leaf $Archive); treating this rerun as successful."
            return $null
        }
        throw "CurseForge upload failed for ${Archive}: $body"
    }
}

$clientFileId = Publish-File $mainMetadata $clientArchive
if ($null -eq $clientFileId) {
    Write-Host 'Client file already published; assuming its server child file exists too and skipping upload.'
    exit 0
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
    Write-Host "Published client file ID $clientFileId; server child file already exists."
} else {
    Write-Host "Published client file ID $clientFileId and server child file ID $serverFileId."
}
