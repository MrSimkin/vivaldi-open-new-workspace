# ONW static row identity investigation. Read-only: no UI events, no API calls.
[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$UiRoot)
$ErrorActionPreference = 'Stop'
$root=(Resolve-Path -LiteralPath $UiRoot).Path
if (-not (Test-Path -LiteralPath (Join-Path $root 'window.html') -PathType Leaf)) { throw 'Expected resources\vivaldi containing window.html' }
$needles=@('workspace-item-wrapper','WorkspacePopup-DragArea','WorkspacePopup-Items','tabbar-workspace-button')
$files=@(Get-ChildItem -LiteralPath $root -File -Recurse -Filter '*.js' | Where-Object {$_.FullName -notmatch '[\\/](dtc-mods|onw-mods|javascript|node_modules)[\\/]'} | Sort-Object FullName)
$samples=[System.Collections.Generic.List[object]]::new()
$skipped=[System.Collections.Generic.List[string]]::new()
$counts=@{}; foreach($n in $needles){$counts[$n]=0}
foreach($f in $files){
  $rel=$f.FullName.Substring($root.Length).TrimStart([char[]]@('\','/'))
  if($f.Length -gt 100MB){$skipped.Add($rel);continue}
  $src=[System.IO.File]::ReadAllText($f.FullName)
  foreach($n in $needles){
    $at=0
    while($at -lt $src.Length){
      $i=$src.IndexOf($n,$at,[StringComparison]::Ordinal)
      if($i -lt 0){break}
      $counts[$n]++
      if($counts[$n] -le 4){
        $lo=[Math]::Max(0,$i-1100);$hi=[Math]::Min($src.Length,$i+$n.Length+1800)
        $samples.Add([pscustomobject]@{needle=$n;file=$rel;offset=$i;context=$src.Substring($lo,$hi-$lo)})
      }
      $at=$i+$n.Length
    }
  }
}
[pscustomobject]@{probe='ONW-ROW-STATIC-1';files=$files.Count;skipped=@($skipped.ToArray());counts=$counts;samples=@($samples.ToArray())} | ConvertTo-Json -Depth 6
