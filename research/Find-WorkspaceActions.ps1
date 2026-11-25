# ONW research P3: offline read-only scan of installed Vivaldi UI JavaScript.
# No browser launch, no profile reads, no files changed. Output is stdout only.
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$UiRoot,
    [ValidateRange(1,30)][int]$MaxHitsPerNeedle = 5
)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $UiRoot).Path
if (-not (Test-Path -LiteralPath (Join-Path $root 'window.html') -PathType Leaf)) {
    throw 'UiRoot must be the installed resources\vivaldi folder containing window.html.'
}
$needles = @(
    'COMMAND_WORKSPACE_CREATE',
    'COMMAND_WORKSPACE_NEW',
    'COMMAND_CREATE_WORKSPACE',
    'COMMAND_WORKSPACE_SWITCH_',
    'createWorkspace',
    'newWorkspace',
    'switchWorkspace',
    'selectWorkspace',
    'openWorkspace',
    'activateWorkspace',
    'vivaldi.workspaces.list',
    'workspaceId'
)
$files = @(Get-ChildItem -LiteralPath $root -File -Recurse -Filter '*.js' |
    Where-Object { $_.FullName -notmatch '[\\/](dtc-mods|onw-mods|javascript|node_modules)[\\/]' } |
    Sort-Object Length -Descending)
$hits = @{}
$totals = @{}
foreach ($needle in $needles) { $hits[$needle] = 0; $totals[$needle] = 0 }
$results = [System.Collections.Generic.List[object]]::new()
foreach ($file in $files) {
    # Skip exceptionally large individual files rather than exhausting memory.
    if ($file.Length -gt 100MB) { Write-Warning ('Skipped large file: ' + $file.Name); continue }
    $source = [System.IO.File]::ReadAllText($file.FullName)
    $relative = $file.FullName.Substring($root.Length).TrimStart([char[]]@('\','/'))
    foreach ($needle in $needles) {
        $start = 0
        while ($start -lt $source.Length) {
            $idx = $source.IndexOf($needle, $start, [StringComparison]::OrdinalIgnoreCase)
            if ($idx -lt 0) { break }
            $totals[$needle]++
            if ($hits[$needle] -lt $MaxHitsPerNeedle) {
                $left = [Math]::Max(0, $idx - 160)
                $right = [Math]::Min($source.Length, $idx + $needle.Length + 200)
                $results.Add([pscustomobject]@{
                    needle = $needle
                    file = $relative
                    offset = $idx
                    context = ($source.Substring($left, $right - $left) -replace '[\r\n\t]+',' ')
                })
                $hits[$needle]++
            }
            $start = $idx + $needle.Length
        }
    }
}
[pscustomobject]@{
    probe = 'ONW-P3-static-v1'
    filesScanned = $files.Count
    totals = $totals
    samples = @($results.ToArray())
} | ConvertTo-Json -Depth 6
