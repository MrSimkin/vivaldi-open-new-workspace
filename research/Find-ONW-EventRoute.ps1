# ONW static event route, second focused stage. No browser events or writes.
[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$UiRoot)
$ErrorActionPreference='Stop'
$root=(Resolve-Path -LiteralPath $UiRoot).Path
if(-not (Test-Path -LiteralPath (Join-Path $root 'window.html') -PathType Leaf)){throw 'UiRoot must contain window.html'}
$path=Join-Path $root 'bundle.js'
if(-not (Test-Path -LiteralPath $path -PathType Leaf)){throw 'Expected bundle.js in UiRoot'}
$src=[System.IO.File]::ReadAllText($path)
$samples=[System.Collections.Generic.List[object]]::new()
function Add-Context([string]$label,[int]$at,[int]$before,[int]$after){
  $lo=[Math]::Max(0,$at-$before);$hi=[Math]::Min($src.Length,$at+$after)
  $samples.Add([pscustomobject]@{label=$label;offset=$at;start=$lo;context=$src.Substring($lo,$hi-$lo)})
}
function Find-Unique([string]$anchor){
  $i=$src.IndexOf($anchor,[StringComparison]::Ordinal)
  if($i -lt 0 -or $src.IndexOf($anchor,$i+$anchor.Length,[StringComparison]::Ordinal) -ge 0){throw "Anchor absent or ambiguous: $anchor"}
  return $i
}
$menu=Find-Unique 'WorkspacePopup-Items'
$toolbar=Find-Unique 'tabbar-workspace-button'
Add-Context 'menu-selection-callbacks' $menu 12500 600
Add-Context 'workspace-toolbar-toggle' $toolbar 10000 800
# Locate the toolbar wrapper import observed in stage 1; only inspect bounded
# event-related excerpts in the matching webpack module, if identifiable.
$aliases=@([regex]::Matches($src.Substring(0,$toolbar),'\bDs\s*=\s*[$\w]+\((\d+)\)'))
$wrapperId=$null
if($aliases.Count -gt 0){
  $alias=$aliases[$aliases.Count-1];$wrapperId=$alias.Groups[1].Value
  Add-Context 'toolbar-wrapper-import-candidate' $alias.Index 160 240
  $modulePattern='(?:^|[,{}])'+[regex]::Escape($wrapperId)+':\s*(?:\([^)]{0,80}\)|[$\w]+)\s*=>\s*\{'
  $modules=@([regex]::Matches($src,$modulePattern))
  if($modules.Count -eq 1){
    $start=$modules[0].Index;$len=[Math]::Min(60000,$src.Length-$start)
    $region=$src.Substring($start,$len)
    $next=[regex]::Match($region.Substring(1),',\d{2,}:\s*(?:\([^)]{0,80}\)|[$\w]+)\s*=>\s*\{')
    if($next.Success){$region=$region.Substring(0,$next.Index+1)}
    foreach($needle in @('onPointerDown','onPointerUp','onClick','onKeyDown')){
      $matches=@([regex]::Matches($region,[regex]::Escape($needle)) | Select-Object -First 3)
      foreach($match in $matches){Add-Context ('wrapper-'+$needle) ($start+$match.Index) 550 700}
    }
  }
}
[pscustomobject]@{probe='ONW-EVENT-STATIC-2';bundle='bundle.js';sha256=(Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash;wrapperCandidate=$wrapperId;samples=@($samples.ToArray())} | ConvertTo-Json -Depth 6
