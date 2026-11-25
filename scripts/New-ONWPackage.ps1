# Run from a reviewed checkout. No release or upload.
[CmdletBinding()]
param([string]$Destination = '')
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$version = (Get-Content -Raw -LiteralPath (Join-Path $root 'extension\manifest.json') | ConvertFrom-Json).version
if ($version -notmatch '^\d+\.\d+\.\d+$') { throw 'Invalid version.' }
if (-not $Destination) { $Destination = Join-Path $root 'dist' }
New-Item -ItemType Directory -Path $Destination -Force | Out-Null
$zip = Join-Path $Destination "ONW_${version}_windows.zip"
if (Test-Path -LiteralPath $zip) { throw "Package already exists: $zip" }
$parts = @('extension','bridge','Install-ONW.ps1') | ForEach-Object { Join-Path $root $_ }
Compress-Archive -LiteralPath $parts -DestinationPath $zip -CompressionLevel Optimal
Get-FileHash -LiteralPath $zip -Algorithm SHA256
