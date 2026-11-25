import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const installer = readFileSync(new URL('../Install-ONW.ps1',import.meta.url),'utf8');
const pack = readFileSync(new URL('../scripts/New-ONWPackage.ps1',import.meta.url),'utf8');
test('installer defaults to read-only and requires explicit install with closed browser',()=>{
  assert.match(installer,/\$Mode = 'Verify'/);
  assert.match(installer,/if \(\$Mode -eq 'Verify'\) \{ Report; return \}\s*AssertClosed/);
  assert.doesNotMatch(installer,/\b(?:Stop-Process|Start-Process|Set-ExecutionPolicy|Invoke-Expression|Remove-Item)\b/i);
});
test('installer retains active paths and backs up; no HTML or DTC write target',()=>{
  assert.match(installer,/E:\\Vivaldi_OpenNewWorkspace/);
  assert.match(installer,/versions\\\$version/);
  assert.match(installer,/backups\\\$\{version\}/);
  assert.match(installer,/AssertUnchanged/);
  assert.doesNotMatch(installer,/-Destination\s+\$(?:html|dtc)\b/i);
  assert.match(installer,/RuntimeVerified=\$false/);
});
test('package is named and includes both components and script without replacing existing archives',()=>{
  assert.match(pack,/ONW_\$\{version\}_windows\.zip/);
  assert.match(pack,/@\('extension','bridge','Install-ONW\.ps1'\)/);
  assert.match(pack,/Package already exists/);
});
