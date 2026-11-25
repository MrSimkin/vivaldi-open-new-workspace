# Entrega Windows nominal (D-039) | 2026-11-25

D-033 y D-034 permanecen obligatorias. Candidata 0.1.5 de producto: ab3a01a9d758ca0efd28d4db927f77bbba824566. No hay cambios en extension ni bridge por la entrega; no reinstalar por el mero agregado del instalador.

Nombre de paquete actual: ONW_0.1.5_windows.zip. Contiene extension/, bridge/ e Install-ONW.ps1 en raíz. Generar paquetes futuros desde checkout revisado con scripts/New-ONWPackage.ps1 (PowerShell, destino dist por defecto). No sobreescribe ZIP existente. Mantener ZIP y extracción dentro de E:\Vivaldi_OpenNewWorkspace\versions\<version>\, conservar históricos. Si se requiere nueva entrega de la misma versión, usar subcarpeta/revisión inequívoca; no sobreescribir. El nombre no implica release.

## Verificación sin reinicio

Extraer el paquete en versions\0.1.5\ (carpeta separada si ya existe otra extracción). Ejecutar Install-ONW.ps1 desde la carpeta que contiene extension y bridge, con -Mode Verify (predeterminado). Compara hashes de todos los archivos de ambas carpetas activas, puente instalado y fuente; exige referencias únicas ONW/DTC y comprueba que HTML/DTC no cambien durante la lectura. No comprueba que código esté cargado en memoria, no modifica archivos, no pide reinicio. UiRoot predeterminado es LOCALAPPDATA\Vivaldi\Application\8.3.4191.47\resources\vivaldi; si la ruta real de vivaldi://about es distinta, indicar -UiRoot explícito. Si versión diferente, detener y revisar compatibilidad; no eludir guarda.

## Instalación futura explícita

Solo tras entregar prompt autocontenido, guardar trabajo y sesión, desactivar ONW y cerrar Vivaldi voluntariamente según D-033. Desde paquete extraído bajo versions\<version>\ ejecutar .\Install-ONW.ps1 -Mode Install. No matar procesos, elevar privilegios ni alterar política de ejecución; si bloqueado, informar. El instalador comprueba manifest/ID/permisos/protocolo, rutas, referencias y hashes, exige Vivaldi cerrado y respalda carpetas activas, puente instalado y HTML como evidencia en backups\<version>_<fecha-hora>\. Copia/verifica staging y sustituye solo extension/bridge activos y puente ONW instalado. No modifica HTML, DTC, perfiles, pestañas ni otras versiones, no inicia Vivaldi. Si falta referencia ONW válida o DTC, detenerse; usar guía manual y nuevo checkpoint si procede. No se automatiza integración HTML inicial. Verificar salida JSON con tres Matches true, luego abrir manualmente Vivaldi y habilitar/recargar ONW.

## Fallo y reversión

Ante error, no repetir automáticamente. Si ocurrió tras comenzar cambios, no arrancar Vivaldi antes de revisar o restaurar exclusivamente ONW desde respaldo; pueden existir cambios parciales. Conservar old-extension/old-bridge y demás respaldos. No restaurar HTML entero ni DTC, no modificar otros mods. Seguir INSTALL_WINDOWS y D-033; si se necesita cierre nuevo, generar prompt primero.

## Evidencia

Linux Node 22.16.0 check/test 45/45/build aprobados; tres tests estáticos nuevos. ZIP generado localmente mediante Python, no mediante PowerShell; hash SHA256 2e0b868ad29de23661b49da514c4a961a89344f96a5b340bf4d9431658a7225b. No PowerShell/Windows runtime disponible, nueva CI no confirmada. No afirmar que el instalador funciona en el equipo hasta validar. La QA real de producto 0.1.5 sigue pendiente. No modificar DTC.
