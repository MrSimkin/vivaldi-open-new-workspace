# Instalación y actualización manual en Windows | 0.1.4 candidata

## Entorno obligatorio D-033

El propietario dispone de una sola instalación de Vivaldi, la habitual. No tiene Standalone ni otra instalación. No exigirlas ni usar un perfil adicional como aislamiento. Las pruebas serán controladas en habitual; existe riesgo residual para la sesión. No se autoriza automatizar cierre/reinicio, cambiar DTC (Duplicate Tabs Closer), su reparador, permisos, seguridad, perfiles, binarios ni otros mods.

Chat anterior al reinicio: entregar instrucciones completas, ZIP fijo, checkpoint y prompt completo descargable/copiable. NO entregar formulario QA ni pedir resultados posreinicio en ese chat. Usuario guarda el prompt fuera del navegador, instala, reinicia y lo pega en nuevo chat temporal. Nuevo chat: confirmar instalación y efectuar QA. Ver AGENTS, WORKFLOW, RESUME_PROMPT y D-033.

## Paquete actual

Vivaldi objetivo 8.3.4191.47 x64, Chromium 156.0.8078.110, Windows 11 26H2 build 26300.9974 (reporte 2026-11-25). Código 0.1.4 eb4c60f2f911b88292fb1f61791006076988c404. CI Windows 45645828628 aprobada: check/test/build. No runtime 0.1.4 ni release; creación diferida.

ZIP fijo: https://github.com/MrSimkin/vivaldi-open-new-workspace/archive/eb4c60f2f911b88292fb1f61791006076988c404.zip

La versión 0.1.4 exige extensión y puente protocolo 3; no mezclar con 0.1.2/0.1.3 (protocolo 2). No requiere Node, npm, compilación ni CRX. Conservar ID poebajclpmcacjgkdbkjfjbngmagakbe y ruta de carga E:\Vivaldi_OpenNewWorkspace\extension para mantener preferencias.

## A. Antes de cerrar Vivaldi

1. Guardar prompt íntegro actualizado en disco y descargar ZIP. Extraer en carpeta de preparación distinta de E:\Vivaldi_OpenNewWorkspace (ej. E:\ONW_0.1.4_STAGE). Localizar raíz extraída con extension/manifest.json versión 0.1.4 y bridge/onw-workspace-bridge.js con PROTOCOL = 3. No copiar el ZIP como extensión.
2. Abrir vivaldi://about, identificar ruta del ejecutable y versión activa; localizar Application\<versión>\resources\vivaldi con window.html. No asumir %LOCALAPPDATA% ni tocar otras versiones, User Data o perfil.
3. Guardar trabajo y usar mecanismos habituales de restauración de sesión; no cerrar pestañas de trabajo ni borrar datos. DTC actualmente funciona por reporte; si deja de funcionar antes de actualizar, detenerse sin modificar ONW. Desactivar ONW (solo ONW) en vivaldi://extensions si está habilitado. No quitarlo ni cambiar su ruta/ID. Guardar prompt antes de cerrar.
4. Cerrar voluntariamente Vivaldi completo. Confirmar que no queden procesos vivaldi.exe en Administrador de tareas; si quedan, esperar salida normal, no forzar ni matar procesos. Si no se puede cerrar normalmente, detenerse.

## B. Con Vivaldi cerrado

1. Crear carpeta de respaldo con fecha/hora fuera de las carpetas activas. Copiar allí E:\Vivaldi_OpenNewWorkspace\extension y bridge completos, window.html de recursos activos y onw-mods\onw-workspace-bridge.js si existe. No sobrescribir respaldos anteriores. Registrar SHA256 del HTML y archivo DTC (si existe) con Get-FileHash -Algorithm SHA256 -LiteralPath. No copiar/restaurar DTC. Registrar referencias DTC actuales; si faltan o son inesperadas, detenerse y diagnosticar sin repararlas.
2. Sustituir solo carpetas ONW extension y bridge en E:\Vivaldi_OpenNewWorkspace por las del ZIP preparado. No mezclar archivos viejos; conservar respaldo y ruta original exacta. Verificar manifest 0.1.4. No eliminar el resto de la carpeta raíz.
3. Copiar nuevo bridge/onw-workspace-bridge.js a resources\vivaldi\onw-mods\onw-workspace-bridge.js de versión activa (crear onw-mods si falta).
4. Inspeccionar window.html. Si ya contiene exactamente una referencia ONW válida, NO editar HTML. Si falta, comprobar cierre body único y agregar solo esta línea antes de él, preservando codificación y todo el resto:

```html
<script src="onw-mods/onw-workspace-bridge.js"></script>
```

Si hay duplicados, referencias no esperadas o permisos insuficientes, detenerse sin edición adicional; no elevar privilegios ni desactivar seguridad. Antes de guardar un HTML editado comprobar hash actual contra leído; si cambió, abortar y revisar (DTC puede reparar en paralelo). Comparar después: solo diferencia autorizada de línea ONW; DTC y demás scripts intactos. Si no editó HTML, su hash debería permanecer igual; si cambió inesperadamente, detenerse y revisar, no restaurar ciegamente. Comparar SHA256 de puente fuente y copiado; DTC debe conservar hash/referencia. Hash no elimina totalmente carreras.

## C. Reinicio y continuación

Abrir Vivaldi habitual normalmente, abrir vivaldi://extensions, habilitar/recargar ONW existente desde misma ruta. Confirmar visualmente 0.1.4 y ID; si no está instalada, Cargar descomprimida seleccionando E:\Vivaldi_OpenNewWorkspace\extension. No usar botones ONW todavía. No modificar DTC.

Abrir nuevo chat temporal con GitHub conectado y pegar prompt completo, informando si completó la instalación/reinicio o cualquier bloqueo. El agente entonces proporciona QA agrupada y formulario con comentarios adicionales. No reiniciar otra vez sin nuevo prompt. Ante sesión inesperada, DTC roto o error de carga, no seleccionar Workspaces con ONW; informar.

## D. Reversión

Si se detecta incidencia: desactivar ONW desde gestor (sin tocar DTC), conservar ventanas y pestañas, guardar evidencia. Si se requiere revertir puente, antes de cualquier cierre generar nuevo prompt. Con Vivaldi cerrado restaurar únicamente carpetas extension/bridge ONW de respaldo a sus rutas y puente ONW de respaldo (o retirar solo su archivo y referencia si se quiere desactivar completamente). No restaurar window.html completo antiguo; editar solo línea ONW si procede, preservar referencias restantes y verificar hashes. No restaurar backups DTC, ejecutar su reparador ni cambiar otras versiones. Reiniciar voluntariamente y retomar en chat nuevo. No hacer rollback solo por QA.

## E. Pruebas después del reinicio (agente del nuevo chat)

Confirmar versión y catálogo; DTC inicial en modo no destructivo con pestañas ficticias; foco activo; apertura inactivo; ausencia panel lectura; preservación de origen/pestañas; base; temas/icono/idioma y persistencia; DTC final. Si DTC inicial falla, no ejecutar mutaciones ONW; si falla foco/apertura, registrar último código al reabrir popup y detener esa ruta, no repetir ciegamente. No cerrar ventanas extra automáticamente. No declarar coexistencia ni versión estable sin pruebas. No repetir ONW-MENU V1/V2. Si identidad no resuelve, inspección estática focalizada.

Histórico: ZIP 0.1.2 https://github.com/MrSimkin/vivaldi-open-new-workspace/archive/e08b4da26206a64ca9f986a2e5eb723e515ad459.zip (no usar para 0.1.4); versiones y pruebas en STATUS. DTC reparador fue inspeccionado y no coordina escrituras concurrentes; scripts independientes, no modificarlo. Recomendaciones históricas Standalone quedan reemplazadas por D-033.
