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
$mainResponse = Invoke-RestMethod -Uri $endpoint -Method Post -Headers $headers -Form @{
    metadata = ($mainMetadata | ConvertTo-Json -Compress -Depth 5)
    file = Get-Item -LiteralPath $clientArchive
}
if (-not $mainResponse.id) {
    throw 'CurseForge did not return an ID for the client file.'
}

$serverMetadata = [ordered]@{
    changelog = $changelog
    changelogType = 'markdown'
    displayName = "$($pack.name) $Version Server Pack"
    parentFileID = [long]$mainResponse.id
    releaseType = $ReleaseType
}
$serverResponse = Invoke-RestMethod -Uri $endpoint -Method Post -Headers $headers -Form @{
    metadata = ($serverMetadata | ConvertTo-Json -Compress -Depth 5)
    file = Get-Item -LiteralPath $serverArchive
}
if (-not $serverResponse.id) {
    throw 'CurseForge did not return an ID for the server file.'
}

Write-Host "Published client file ID $($mainResponse.id) and server child file ID $($serverResponse.id)."
