$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# Pre-declare test variables at script scope so the mock setup can populate
# them once and the test bodies can read them.
$script:endpoint = $null
$script:filesEndpoint = $null
$script:uploadHeaders = $null
$script:mainMetadata = $null
$script:serverMetadata = $null
$script:clientArchive = $null
$script:serverArchive = $null
$script:changelog = $null
$script:ReleaseType = $null
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$script:pack = Get-Content -LiteralPath (Join-Path $repoRoot 'pack\pack.json') -Raw | ConvertFrom-Json
$script:version = '0.3.2'

# Test B. Dry run with neither secret set.
Remove-Item Env:CURSEFORGE_API_TOKEN -ErrorAction SilentlyContinue
Remove-Item Env:CURSEFORGE_API_KEY -ErrorAction SilentlyContinue
$out = powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot '..\scripts\publish_curseforge.ps1') -DryRun 2>&1
$ec = $LASTEXITCODE
$outText = ($out | Out-String)
if ($ec -ne 0) { Write-Host "B. DRYRUN_FAIL ec=$ec out=$outText"; exit 1 }
if ($outText -notmatch 'DRY RUN') { Write-Host "B. DRYRUN_NO_OUTPUT out=$outText"; exit 1 }
if ($outText -match 'CURSEFORGE_API_TOKEN') { Write-Host "B. DRYRUN_TOUCHED_TOKEN out=$outText"; exit 1 }
if ($outText -match 'CURSEFORGE_API_KEY') { Write-Host "B. DRYRUN_TOUCHED_KEY out=$outText"; exit 1 }
Write-Host "B. DRYRUN_OK"

# Tests C-I use a mock harness. Load the publisher's helpers in a fresh
# scope without running the top-level invocation.
$scriptPath = Join-Path $repoRoot 'scripts\publish_curseforge.ps1'
$version = $script:version
$clientArchive = Join-Path $repoRoot "dist\$($script:pack.name)-$version.zip"
$serverArchive = Join-Path $repoRoot "dist\$($script:pack.name)-$version-server.zip"
$distDir = Join-Path $repoRoot 'dist'
if (-not (Test-Path -LiteralPath $distDir)) { New-Item -ItemType Directory -Path $distDir | Out-Null }
'x' | Set-Content -LiteralPath $clientArchive
'x' | Set-Content -LiteralPath $serverArchive

$publisherText = Get-Content -LiteralPath $scriptPath -Raw
$paramStart = $publisherText.IndexOf("[CmdletBinding()]")
$paramEnd = $publisherText.IndexOf("`n)", $paramStart)
if ($paramStart -ge 0 -and $paramEnd -gt $paramStart) {
    $publisherText = $publisherText.Remove($paramStart, $paramEnd - $paramStart + 2)
}
$fnStart = $publisherText.IndexOf("function Get-UploadErrorBody")
if ($fnStart -lt 0) { throw 'Could not find Get-UploadErrorBody.' }
$publisherText = $publisherText.Substring($fnStart)
$idx = $publisherText.IndexOf('$clientFileId = Publish-File $mainMetadata $clientArchive')
if ($idx -lt 0) { throw 'Could not find top-level invocation block.' }
$publisherText = $publisherText.Substring(0, $idx)

# Load the publisher's helpers at script scope (not inside a function) so
# they are visible to all tests.
$helpersPath = Join-Path $env:TEMP "pcf_helpers.ps1"
Set-Content -LiteralPath $helpersPath -Value $publisherText -Encoding utf8
. $helpersPath
Remove-Item -LiteralPath $helpersPath -ErrorAction SilentlyContinue

# Shared state for mocks
$script:UploadCalls = New-Object System.Collections.ArrayList
$script:CoreCalls = New-Object System.Collections.ArrayList
$script:Mode = $null
$script:ClientDuplicate = $false
$script:ServerDuplicate = $false
$script:CorePage1 = $null
$script:CorePage2 = $null

function Invoke-RestMethod {
    param([string]$Uri, [string]$Method = 'Get', [hashtable]$Headers, [hashtable]$Form)
    if ($Uri -like '*/upload-file' -and $Method -eq 'Post') {
        [void]$script:UploadCalls.Add([pscustomobject]@{ Uri = $Uri; Headers = $Headers; Form = $Form })
        $file = $Form['file']
        $isServer = $file.FullName -like '*-server.zip'
        if ($isServer -and $script:ServerDuplicate) {
            throw [System.Net.WebException]::new('server returned 409: file already exists for this project')
        }
        if (-not $isServer -and $script:ClientDuplicate) {
            throw [System.Net.WebException]::new('server returned 409: file already exists for this project')
        }
        if ($isServer) { $script:ServerDuplicate = $true; return [pscustomobject]@{ id = '456' } }
        $script:ClientDuplicate = $true
        return [pscustomobject]@{ id = '123' }
    }
    if ($Uri -like '*/v1/mods/*/files*') {
        [void]$script:CoreCalls.Add([pscustomobject]@{ Uri = $Uri; Headers = $Headers })
        # Parse index from query string and return the configured page.
        $index = 0
        if ($Uri -match 'index=(\d+)') { $index = [int]$Matches[1] }
        if ($index -eq 0 -and $script:CorePage1) { return $script:CorePage1 }
        if ($index -eq 50 -and $script:CorePage2) { return $script:CorePage2 }
        if ($index -eq 1 -and $script:CorePage2) { return $script:CorePage2 }
        # Default: empty page so the loop terminates cleanly.
        return [pscustomobject]@{
            data = @()
            pagination = [pscustomobject]@{ resultCount = 0; totalCount = 0 }
        }
    }
    return $null
}

function Reset-Mocks {
    $script:UploadCalls.Clear()
    $script:CoreCalls.Clear()
    $script:ClientDuplicate = $false
    $script:ServerDuplicate = $false
    $script:CorePage1 = $null
    $script:CorePage2 = $null
    Remove-Item Env:CURSEFORGE_API_KEY -ErrorAction SilentlyContinue
    $env:CURSEFORGE_API_TOKEN = 'fake-token'
    $env:CURSEFORGE_API_KEY = 'fake-core-key'
    # The trimmed body only defines functions; the script-level variables
    # ($endpoint, $filesEndpoint, $uploadHeaders, $mainMetadata, ...) were
    # in the removed invocation block. Define them at script scope so the
    # test bodies can read them.
    $projectId = [long]$script:pack.curseForgeProjectId
    $script:endpoint = "https://minecraft.curseforge.com/api/projects/$projectId/upload-file"
    $script:filesEndpoint = "https://api.curseforge.com/v1/mods/$projectId/files"
    $uploadToken = [Environment]::GetEnvironmentVariable('CURSEFORGE_API_TOKEN')
    $script:uploadHeaders = @{ 'X-Api-Token' = $uploadToken }
    $script:mainMetadata = [ordered]@{
        changelog = 'test changelog'
        changelogType = 'markdown'
        displayName = "$($script:pack.name) $($script:version)"
        gameVersionNames = @('Client', [string]$script:pack.minecraftVersion, 'NeoForge')
        releaseType = [string]$script:pack.releaseType
    }
    $script:serverMetadata = [ordered]@{
        changelog = 'test changelog'
        changelogType = 'markdown'
        displayName = "$($script:pack.name) $($script:version) Server Pack"
        parentFileID = [long]123
        releaseType = [string]$script:pack.releaseType
    }
    $script:clientArchive = $clientArchive
    $script:serverArchive = $serverArchive
    $script:ReleaseType = [string]$script:pack.releaseType
}

function Assert([string]$Name, [bool]$Cond, [string]$Detail = '') {
    if (-not $Cond) { Write-Host "$Name FAIL $Detail"; exit 1 }
    Write-Host "$Name OK"
}

# ------------------------------------------------------------------
# Test C. Normal upload path
# ------------------------------------------------------------------
Reset-Mocks
$clientId = Publish-File $script:mainMetadata $script:clientArchive
Assert 'C1' ($clientId -eq '123') "got=$clientId"
$serverId = Publish-File $script:serverMetadata $script:serverArchive
Assert 'C2' ($serverId -eq '456') "got=$serverId"
Assert 'C3' ($script:CoreCalls.Count -eq 0) "core calls=$($script:CoreCalls.Count)"
$upload = $script:UploadCalls[0]
$uploadHeadersSeen = @($upload.Headers.Keys) | Sort-Object
Assert 'C4' ($uploadHeadersSeen -contains 'X-Api-Token') "headers=$uploadHeadersSeen"
Assert 'C5' ($uploadHeadersSeen -notcontains 'x-api-key') "headers=$uploadHeadersSeen"
$seenCount = if ($uploadHeadersSeen -is [array]) { $uploadHeadersSeen.Length } else { 1 }
Assert 'C6' ($seenCount -eq 1) "headers=$uploadHeadersSeen"

# ------------------------------------------------------------------
# Test D. Duplicate client recovery
# ------------------------------------------------------------------
Reset-Mocks
$script:CorePage1 = [pscustomobject]@{
    data = @(
        [pscustomobject]@{ id = '999'; displayName = 'Other mod file' }
        [pscustomobject]@{ id = '123'; displayName = "$($script:pack.name) $($script:version)" }
    )
    pagination = [pscustomobject]@{ resultCount = 2; totalCount = 2 }
}
# Simulate: client was already uploaded (e.g. by a previous partial run).
$script:ClientDuplicate = $true
$clientId = Publish-File $script:mainMetadata $script:clientArchive
Assert 'D1' ($clientId -eq '123') "got=$clientId"
Assert 'D2' ($script:CoreCalls.Count -eq 1) "core calls=$($script:CoreCalls.Count)"
$coreHeaders = $script:CoreCalls[0].Headers.Keys | Sort-Object
Assert 'D3' ($coreHeaders -contains 'x-api-key') "headers=$coreHeaders"
Assert 'D4' ($coreHeaders -notcontains 'X-Api-Token') "headers=$coreHeaders"
$serverId = Publish-File $script:serverMetadata $script:serverArchive
Assert 'D5' ($serverId -eq '456') "got=$serverId"
$serverUpload = $script:UploadCalls[1]
$serverHeaders = $serverUpload.Headers.Keys | Sort-Object
Assert 'D6' ($serverHeaders -contains 'X-Api-Token') "headers=$serverHeaders"
Assert 'D7' ($serverHeaders -notcontains 'x-api-key') "headers=$serverHeaders"

# ------------------------------------------------------------------
# Test E. Missing Core API key
# ------------------------------------------------------------------
Reset-Mocks
Remove-Item Env:CURSEFORGE_API_KEY -ErrorAction SilentlyContinue
Write-Host "E0: API_KEY is '$($env:CURSEFORGE_API_KEY)'"
$script:ClientDuplicate = $true
$err = $null
try {
    $null = Publish-File $script:mainMetadata $script:clientArchive
} catch {
    $err = [string]$_.Exception.Message
}
Write-Host "E0: err=$err"
Assert 'E1' ($err -match 'CURSEFORGE_API_KEY') "msg=$err"
Assert 'E2' ($script:UploadCalls.Count -eq 1) "upload calls=$($script:UploadCalls.Count) (only the first attempt)"
Assert 'E3' ($script:CoreCalls.Count -eq 0) "core calls=$($script:CoreCalls.Count)"

# ------------------------------------------------------------------
# Test F. Authentication headers (re-verify)
# ------------------------------------------------------------------
Reset-Mocks
$script:CorePage1 = [pscustomobject]@{
    data = @(
        [pscustomobject]@{ id = '123'; displayName = "$($script:pack.name) $($script:version)" }
    )
    pagination = [pscustomobject]@{ resultCount = 1; totalCount = 1 }
}
$script:ClientDuplicate = $true
$null = Publish-File $script:mainMetadata $script:clientArchive
$coreReq = $script:CoreCalls[0]
$coreKeys = @($coreReq.Headers.Keys) | Sort-Object
Assert 'F1' ($coreKeys -contains 'x-api-key') "core headers=$coreKeys"
Assert 'F2' ($coreKeys -notcontains 'X-Api-Token') "core headers=$coreKeys"
$coreKeyCount = if ($coreKeys -is [array]) { $coreKeys.Length } else { 1 }
Assert 'F3' ($coreKeyCount -eq 1) "core headers=$coreKeys"
$uploadReq = $script:UploadCalls[0]
$uploadKeys = @($uploadReq.Headers.Keys) | Sort-Object
Assert 'F4' ($uploadKeys -contains 'X-Api-Token') "upload headers=$uploadKeys"
Assert 'F5' ($uploadKeys -notcontains 'x-api-key') "upload headers=$uploadKeys"
$uploadKeyCount = if ($uploadKeys -is [array]) { $uploadKeys.Length } else { 1 }
Assert 'F6' ($uploadKeyCount -eq 1) "upload headers=$uploadKeys"

# ------------------------------------------------------------------
# Test G. Page-two recovery
# ------------------------------------------------------------------
Reset-Mocks
$script:CorePage1 = [pscustomobject]@{
    data = @(0..49 | ForEach-Object { [pscustomobject]@{ id = "old$_"; displayName = "Old $_" } })
    pagination = [pscustomobject]@{ resultCount = 50; totalCount = 75 }
}
$script:CorePage2 = [pscustomobject]@{
    data = @(
        [pscustomobject]@{ id = '123'; displayName = "$($script:pack.name) $($script:version)" }
    )
    pagination = [pscustomobject]@{ resultCount = 1; totalCount = 75 }
}
$script:ClientDuplicate = $true
$clientId = Publish-File $script:mainMetadata $script:clientArchive
Assert 'G1' ($clientId -eq '123') "got=$clientId"
Assert 'G2' ($script:CoreCalls.Count -eq 2) "core calls=$($script:CoreCalls.Count)"
$firstUri = [string]$script:CoreCalls[0].Uri
$secondUri = [string]$script:CoreCalls[1].Uri
Assert 'G3' ($firstUri -match 'index=0') "uri=$firstUri"
Assert 'G4' ($secondUri -match 'index=50') "uri=$secondUri"

# ------------------------------------------------------------------
# Test H. Exhausted lookup
# ------------------------------------------------------------------
Reset-Mocks
$script:CorePage1 = [pscustomobject]@{
    data = @(0..49 | ForEach-Object { [pscustomobject]@{ id = "old$_"; displayName = "Old $_" } })
    pagination = [pscustomobject]@{ resultCount = 50; totalCount = 75 }
}
$script:CorePage2 = [pscustomobject]@{
    data = @(0..24 | ForEach-Object { [pscustomobject]@{ id = "new$_"; displayName = "New $_" } })
    pagination = [pscustomobject]@{ resultCount = 25; totalCount = 75 }
}
$script:ClientDuplicate = $true
$err = $null
try {
    $null = Publish-File $script:mainMetadata $script:clientArchive
} catch {
    $err = [string]$_.Exception.Message
}
Assert 'H1' ($err -match 'duplicate') "msg=$err"
Assert 'H2' ($script:CoreCalls.Count -eq 2) "core calls=$($script:CoreCalls.Count)"

# ------------------------------------------------------------------
# Test I. Partial release where both files already exist
# ------------------------------------------------------------------
Reset-Mocks
$script:CorePage1 = [pscustomobject]@{
    data = @(
        [pscustomobject]@{ id = '123'; displayName = "$($script:pack.name) $($script:version)" }
    )
    pagination = [pscustomobject]@{ resultCount = 1; totalCount = 2 }
}
$script:CorePage2 = [pscustomobject]@{
    data = @(
        [pscustomobject]@{ id = '456'; displayName = "$($script:pack.name) $($script:version) Server Pack" }
    )
    pagination = [pscustomobject]@{ resultCount = 1; totalCount = 2 }
}
$script:ClientDuplicate = $true
$script:ServerDuplicate = $true
$clientId = Publish-File $script:mainMetadata $script:clientArchive
$serverId = Publish-File $script:serverMetadata $script:serverArchive
Assert 'I1' ($clientId -eq '123') "got=$clientId"
Assert 'I2' ($serverId -eq '456') "got=$serverId"

# ------------------------------------------------------------------
# Test J. Existing CI
# ------------------------------------------------------------------
$ok = $true
try { python (Join-Path $repoRoot 'scripts\validate_metadata.py') 2>&1 | Out-Null } catch { $ok = $false }
Assert 'J1' ($ok) "validate_metadata.py"

Remove-Item -LiteralPath $clientArchive, $serverArchive -ErrorAction SilentlyContinue
Write-Host "ALL_TESTS_PASS"
