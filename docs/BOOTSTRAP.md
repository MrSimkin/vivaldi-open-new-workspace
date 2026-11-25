# Crear y publicar el repositorio inicial

Destino: `MrSimkin/vivaldi-open-new-workspace`. El propietario creó el repositorio público el 25-11-2026, con rama main y README inicial. El conector de GitHub confirma permiso de escritura. El scaffold se importa conservando ese commit inicial; consultar STATUS para el resultado de la verificación. La visibilidad privada era una recomendación previa, no una condición aprobada. No crear otro repositorio ni cambiar visibilidad.

## Clonar y preparar en Windows

Requiere Git, Node/npm y Vivaldi Desktop. Abrir PowerShell en el directorio de proyectos:

```powershell
git clone https://github.com/MrSimkin/vivaldi-open-new-workspace.git
cd vivaldi-open-new-workspace
git status -sb
npm run check
npm test
npm run build
```

La salida local está en `dist/extension/`. Consultar README y TESTING para carga descomprimida. No hay dependencias externas npm. No continuar después de un fallo sin diagnosticarlo.

## Verificar el repositorio y publicar cambios futuros

Si se usa GitHub CLI (`gh`), verificar primero sesión, destino y rama. Si falta gh, instalar desde https://cli.github.com/ o mediante `winget install --id GitHub.cli -e`.

```powershell
gh auth status
gh api user --jq .login
gh repo view MrSimkin/vivaldi-open-new-workspace --json nameWithOwner,visibility,defaultBranchRef,url
git remote -v
git status -sb
git ls-remote --heads origin main
```

Seguir AGENTS.md y docs/WORKFLOW.md para desarrollo, commits, pruebas y actualización de checkpoint. No usar force push. Si el conector no ve el repositorio, concederle acceso desde GitHub/ChatGPT. No duplicar el repo.

## Historial de bootstrap

La creación remota no estaba disponible en el conector de ChatGPT; se entregó un ZIP inicial con 26 archivos. El propietario creó manualmente el repo e indicó cargar esos archivos. Se conserva el contenido técnico y se actualiza la documentación de estado para reflejar el destino existente y su visibilidad.
