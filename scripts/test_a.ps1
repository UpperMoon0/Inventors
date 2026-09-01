$tokens = $null
$errors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $PSScriptRoot '..\scripts\publish_curseforge.ps1'),
    [ref]$tokens,
    [ref]$errors
)
if ($errors -and $errors.Count -gt 0) {
    Write-Host "PS_PARSE_FAIL"
    $errors | ForEach-Object { Write-Host ("  - " + $_.Message + " @ line " + $_.Extent.StartLineNumber) }
    exit 1
}
Write-Host "A. PS_PARSE_OK"
