# Windows PowerShell 5.1+; Verify is read-only, Install is explicit.
[CmdletBinding()]
param(
    [ValidateSet('Verify','Install')][string]$Mode = 'Verify',
    [string]$UiRoot = (Join-Path $env:LOCALAPPDATA 'Vivaldi\Application\8.3.4191.47\resources\vivaldi')
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$root = 'E:\Vivaldi_OpenNewWorkspace'
$source = $PSScriptRoot
$manifest = Get-Content -Raw -LiteralPath (Join-Path $source 'extension\manifest.json') | ConvertFrom-Json
$version = [string]$manifest.version
if ($version -notmatch '^\d+\.\d+\.\d+$' -or $manifest.name -ne 'Open New Workspace') { throw 'Invalid ONW package.' }
$bridgeName = 'onw-workspace-bridge.js'
$sourceBridge = Join-Path $source "bridge\$bridgeName"
$installedBridge = Join-Path $UiRoot "onw-mods\$bridgeName"
$html = Join-Path $UiRoot 'window.html'
$dtc = Join-Path $UiRoot 'dtc-mods\dtc-vivaldi-workspace-bridge.js'
function Hash([string]$path) { (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash }
function TreeHash([string]$path) {
    if (-not (Test-Path -LiteralPath $path -PathType Container)) { return 'MISSING' }
    $base = (Get-Item -LiteralPath $path).FullName.TrimEnd('\')
    $entries = @(Get-ChildItem -LiteralPath $base -Recurse -Force)
    if (@($entries | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count -or ((Get-Item -LiteralPath $base).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'Reparse points not supported.' }
    $lines = @($entries | Where-Object { -not $_.PSIsContainer } | Sort-Object FullName | ForEach-Object { $_.FullName.Substring($base.Length + 1) + ':' + (Hash $_.FullName) })
    return ($lines -join "`n")
}
function AssertClosed { if (Get-Process -Name vivaldi -ErrorAction SilentlyContinue) { throw 'Vivaldi is running. Never force-close it. No installation while running.' } }
function AssertUnchanged {
    if ((Hash $html) -ne $htmlHash -or (Hash $dtc) -ne $dtcHash) { throw 'HTML or DTC changed; stop, do not restore or modify either.' }
}
$expectedUi = '\8.3.4191.47\resources\vivaldi'
if (-not (Test-Path -LiteralPath $html -PathType Leaf) -or -not $UiRoot.TrimEnd('\').EndsWith($expectedUi,[StringComparison]::OrdinalIgnoreCase)) { throw 'Unsupported or incorrect Vivaldi UI root. Check vivaldi://about.' }
$onwRef = '<script src="onw-mods/onw-workspace-bridge.js"></script>'
$dtcRef = 'dtc-mods/dtc-vivaldi-workspace-bridge.js'
$htmlHash = Hash $html
$markup = Get-Content -Raw -LiteralPath $html
if ([regex]::Matches($markup,[regex]::Escape($onwRef)).Count -ne 1 -or [regex]::Matches($markup,[regex]::Escape($bridgeName)).Count -ne 1) { throw 'ONW HTML reference missing, duplicate or unexpected. No HTML edits performed.' }
if ([regex]::Matches($markup,[regex]::Escape($dtcRef)).Count -ne 1 -or -not (Test-Path -LiteralPath $dtc -PathType Leaf)) { throw 'DTC reference or file unexpected. No changes performed.' }
$dtcHash = Hash $dtc
AssertUnchanged
if ((Get-Content -Raw -LiteralPath $sourceBridge) -notmatch 'PROTOCOL\s*=\s*3\b') { throw 'Unexpected bridge protocol.' }
$sha = [Security.Cryptography.SHA256]::Create()
try { $keyHash = [BitConverter]::ToString($sha.ComputeHash([Convert]::FromBase64String($manifest.key))).Replace('-','').ToLowerInvariant().Substring(0,32) } finally { $sha.Dispose() }
$id = -join ($keyHash.ToCharArray() | ForEach-Object { [char] (97 + [Convert]::ToInt32([string]$_,16)) })
if ($id -ne 'poebajclpmcacjgkdbkjfjbngmagakbe' -or (@($manifest.permissions) -join ',') -ne 'storage') { throw 'Unexpected extension identity or permissions.' }
$expectedExtension = TreeHash (Join-Path $source 'extension')
$expectedBridge = TreeHash (Join-Path $source 'bridge')
if ($expectedExtension -eq 'MISSING' -or $expectedBridge -eq 'MISSING') { throw 'Incomplete package.' }
function Report {
    $extensionOk = (TreeHash (Join-Path $root 'extension')) -ceq $expectedExtension
    $bridgeOk = (TreeHash (Join-Path $root 'bridge')) -ceq $expectedBridge
    $installedOk = (Test-Path -LiteralPath $installedBridge -PathType Leaf) -and ((Hash $installedBridge) -eq (Hash $sourceBridge))
    AssertUnchanged
    [pscustomobject]@{ Version=$version; ExtensionMatches=$extensionOk; BridgeFolderMatches=$bridgeOk; InstalledBridgeMatches=$installedOk; ONWReferenceCount=1; DTCReferenceCount=1; HTMLUnchanged=$true; DTCUnchanged=$true; VivaldiRunning=[bool](Get-Process -Name vivaldi -ErrorAction SilentlyContinue); RuntimeVerified=$false } | ConvertTo-Json
    if (-not ($extensionOk -and $bridgeOk -and $installedOk)) { throw 'ONW files differ from package. Do not use Existing until verified.' }
}
if ($Mode -eq 'Verify') { Report; return }
AssertClosed
$versionDir = Join-Path $root "versions\$version"
if (-not ($source.StartsWith($versionDir.TrimEnd('\')+'\',[StringComparison]::OrdinalIgnoreCase) -or $source -ieq $versionDir)) { throw "Extract package below $versionDir first." }
foreach ($path in @($root,(Join-Path $root 'extension'),(Join-Path $root 'bridge'),$UiRoot,(Join-Path $UiRoot 'onw-mods'),$installedBridge,(Join-Path $root 'backups'))) {
    if ((Test-Path -LiteralPath $path) -and ((Get-Item -LiteralPath $path).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'Reparse points not supported.' }
}
# Check active trees before any writes.
$null = TreeHash (Join-Path $root 'extension')
$null = TreeHash (Join-Path $root 'bridge')
$backup = Join-Path $root ("backups\${version}_" + (Get-Date -Format 'yyyyMMdd_HHmmss_fff'))
if (Test-Path -LiteralPath $backup) { throw 'Backup already exists.' }
New-Item -ItemType Directory -Path $backup | Out-Null
try {
    foreach ($name in @('extension','bridge')) {
        $active = Join-Path $root $name
        if (Test-Path -LiteralPath $active) { Copy-Item -LiteralPath $active -Destination (Join-Path $backup $name) -Recurse; if ((TreeHash $active) -cne (TreeHash (Join-Path $backup $name))) { throw 'Backup verification failed.' } }
        Copy-Item -LiteralPath (Join-Path $source $name) -Destination (Join-Path $backup "new-$name") -Recurse
    }
    if ((TreeHash (Join-Path $backup 'new-extension')) -cne $expectedExtension -or (TreeHash (Join-Path $backup 'new-bridge')) -cne $expectedBridge) { throw 'Staging verification failed.' }
    Copy-Item -LiteralPath $html -Destination (Join-Path $backup 'window.html')
    if ((Hash (Join-Path $backup 'window.html')) -ne $htmlHash) { throw 'HTML backup mismatch.' }
    if (Test-Path -LiteralPath $installedBridge) { Copy-Item -LiteralPath $installedBridge -Destination (Join-Path $backup $bridgeName); if ((Hash (Join-Path $backup $bridgeName)) -ne (Hash $installedBridge)) { throw 'Installed bridge backup mismatch.' } }
    AssertClosed; AssertUnchanged
    foreach ($name in @('extension','bridge')) {
        AssertClosed; AssertUnchanged
        $active = Join-Path $root $name
        if (Test-Path -LiteralPath $active) { Move-Item -LiteralPath $active -Destination (Join-Path $backup "old-$name") }
        Move-Item -LiteralPath (Join-Path $backup "new-$name") -Destination $active
    }
    AssertClosed; AssertUnchanged
    New-Item -ItemType Directory -Path (Split-Path -Parent $installedBridge) -Force | Out-Null
    Copy-Item -LiteralPath $sourceBridge -Destination $installedBridge -Force
    Report
    Write-Host "Backup: $backup. Open Vivaldi manually only after successful verification."
} catch {
    Write-Warning "Installation stopped. Backup: $backup. Do not start Vivaldi until ONW is verified or selectively restored; never restore window.html or DTC from this backup."
    throw
}
