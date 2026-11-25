# Instalación y actualización manual en Windows | guía de respaldo

**Estado vigente (2026-11-25): 0.1.5 funcional validada, QA-ONW-015 19/19 OK por reporte del propietario.** Base/Existing y UX aceptados; DTC inicial/final OK; panel de lectura no reproducido. New Workspace sigue diferido; MVP completo pendiente. Código validado: `ab3a01a9d758ca0efd28d4db927f77bbba824566`. No release ni reinstalación. D-033/D-034/D-039 vigentes. Instalador PowerShell todavía no validado en Windows.

Esta guía conserva el procedimiento manual para una futura actualización/reversión autorizada; **no es una instrucción para reinstalar ahora**. Para nuevas entregas, priorizar [D-039](DELIVERY_WINDOWS.md). Los pasos QA históricos solo aplican a una nueva versión que los requiera.

## Entorno obligatorio D-033

El propietario dispone de una sola instalación de Vivaldi, la habitual. No tiene Standalone ni otra instalación. No exigirlas ni usar un perfil adicional como aislamiento. Las pruebas serán controladas en habitual; existe riesgo residual para la sesión. No se autoriza automatizar cierre/reinicio, cambiar DTC (Duplicate Tabs Closer), su reparador, permisos, seguridad, perfiles, binarios ni otros mods.

Chat anterior al reinicio: entregar instrucciones completas, ZIP fijo, checkpoint y prompt completo descargable/copiable. NO entregar formulario QA ni pedir resultados posreinicio en ese chat. Usuario guarda el prompt fuera del navegador, instala, reinicia y lo pega en nuevo chat temporal. Nuevo chat: confirmar instalación y efectuar QA. Ver AGENTS, WORKFLOW, RESUME_PROMPT y D-033.

## Organización local de versiones (D-034)

D-034: todas las futuras entregas de ONW deben mantener ZIP, extracción y respaldos de cada versión dentro de una subcarpeta de E:\Vivaldi_OpenNewWorkspace\. Convención propuesta: versions\<versión>\ (ZIP y extracción) y backups\<versión>_<fecha-hora>\ (respaldo). No pedir carpetas de preparación fuera de la raíz. Mantener extension\ y bridge\ de la raíz como rutas activas estables; copiar desde la subcarpeta de versión, sin mezclar versiones ni borrar archivos históricos. El puente ejecutable sigue en los recursos de Vivaldi. Excepción histórica única 0.1.4: conservar E:\ONW_0.1.4_STAGE\; no mover ni borrar. La regla se aplica a entregas posteriores. No implica cambiar de instalación Vivaldi.

## Paquete actual

Vivaldi objetivo 8.3.4191.47 x64, Chromium 156.0.8078.110, Windows 11 26H2 build 26300.9974 (reporte 2026-11-25). Código 0.1.5 ab3a01a9d758ca0efd28d4db927f77bbba824566. CI Windows 45653569598 aprobada: check/test/build. QA-ONW-015 real 19/19 OK; sin release; creación diferida. 42/42 pruebas históricas. Panel no reproducido.

ZIP fijo: https://github.com/MrSimkin/vivaldi-open-new-workspace/archive/ab3a01a9d758ca0efd28d4db927f77bbba824566.zip

La versión 0.1.5 exige extensión y puente protocolo 3; no mezclar con 0.1.2/0.1.3 (protocolo 2). No requiere Node, npm, compilación ni CRX. Conservar ID poebajclpmcacjgkdbkjfjbngmagakbe y ruta de carga E:\Vivaldi_OpenNewWorkspace\extension para mantener preferencias.

## A. Antes de cerrar Vivaldi

1. Guardar prompt íntegro actualizado en disco y descargar ZIP. Guardar ZIP y extraer en E:\Vivaldi_OpenNewWorkspace\versions\0.1.5\. No reutilizar E:\ONW_0.1.4_STAGE\. Localizar raíz extraída con extension/manifest.json versión 0.1.5 y bridge/onw-workspace-bridge.js con PROTOCOL = 3. No copiar el ZIP como extensión.
2. Abrir vivaldi://about, identificar ruta del ejecutable y versión activa; localizar Application\<versión>\resources\vivaldi con window.html. No asumir %LOCALAPPDATA% ni tocar otras versiones, User Data o perfil.
3. Guardar trabajo y usar mecanismos habituales de restauración de sesión; no cerrar pestañas de trabajo ni borrar datos. DTC actualmente funciona por reporte; si deja de funcionar antes de actualizar, detenerse sin modificar ONW. Desactivar ONW (solo ONW) en vivaldi://extensions si está habilitado. No quitarlo ni cambiar su ruta/ID. Guardar prompt antes de cerrar.
4. Cerrar voluntariamente Vivaldi completo. Confirmar que no queden procesos vivaldi.exe en Administrador de tareas; si quedan, esperar salida normal, no forzar ni matar procesos. Si no se puede cerrar normalmente, detenerse.

## B. Con Vivaldi cerrado

1. Crear carpeta de respaldo con fecha/hora fuera de las carpetas activas, preferentemente E:\Vivaldi_OpenNewWorkspace\backups\<versión>_<fecha-hora>\; respetar respaldos ya preparados para 0.1.5. Copiar allí E:\Vivaldi_OpenNewWorkspace\extension y bridge completos, window.html de recursos activos y onw-mods\onw-workspace-bridge.js si existe. No sobrescribir respaldos anteriores. Registrar SHA256 del HTML y archivo DTC (si existe) con Get-FileHash -Algorithm SHA256 -LiteralPath. No copiar/restaurar DTC. Registrar referencias DTC actuales; si faltan o son inesperadas, detenerse y diagnosticar sin repararlas.
2. Sustituir solo carpetas ONW extension y bridge en E:\Vivaldi_OpenNewWorkspace por las del ZIP preparado. No mezclar archivos viejos; conservar respaldo y ruta original exacta. Verificar manifest 0.1.5. No eliminar el resto de la carpeta raíz.
3. Copiar nuevo bridge/onw-workspace-bridge.js a resources\vivaldi\onw-mods\onw-workspace-bridge.js de versión activa (crear onw-mods si falta).
4. Inspeccionar window.html. Si ya contiene exactamente una referencia ONW válida, NO editar HTML. Si falta, comprobar cierre body único y agregar solo esta línea antes de él, preservando codificación y todo el resto:

```html
<script src="onw-mods/onw-workspace-bridge.js"></script>
```

Si hay duplicados, referencias no esperadas o permisos insuficientes, detenerse sin edición adicional; no elevar privilegios ni desactivar seguridad. Antes de guardar un HTML editado comprobar hash actual contra leído; si cambió, abortar y revisar (DTC puede reparar en paralelo). Comparar después: solo diferencia autorizada de línea ONW; DTC y demás scripts intactos. Si no editó HTML, su hash debería permanecer igual; si cambió inesperadamente, detenerse y revisar, no restaurar ciegamente. Comparar SHA256 de puente fuente y copiado; DTC debe conservar hash/referencia. Hash no elimina totalmente carreras.

## C. Reinicio y continuación

Abrir Vivaldi habitual normalmente, abrir vivaldi://extensions, habilitar/recargar ONW existente desde misma ruta. Confirmar visualmente 0.1.5 y ID; si no está instalada, Cargar descomprimida seleccionando E:\Vivaldi_OpenNewWorkspace\extension. No usar botones ONW todavía. No modificar DTC.

Abrir nuevo chat temporal con GitHub conectado y pegar prompt completo, informando si completó la instalación/reinicio o cualquier bloqueo. El agente entonces proporciona QA agrupada y formulario con comentarios adicionales. No reiniciar otra vez sin nuevo prompt. Ante sesión inesperada, DTC roto o error de carga, no seleccionar Workspaces con ONW; informar.

## D. Reversión

Si se detecta incidencia: desactivar ONW desde gestor (sin tocar DTC), conservar ventanas y pestañas, guardar evidencia. Si se requiere revertir puente, antes de cualquier cierre generar nuevo prompt. Con Vivaldi cerrado restaurar únicamente carpetas extension/bridge ONW de respaldo a sus rutas y puente ONW de respaldo (o retirar solo su archivo y referencia si se quiere desactivar completamente). No restaurar window.html completo antiguo; editar solo línea ONW si procede, preservar referencias restantes y verificar hashes. No restaurar backups DTC, ejecutar su reparador ni cambiar otras versiones. Reiniciar voluntariamente y retomar en chat nuevo. No hacer rollback solo por QA.

## E. Pruebas después del reinicio (agente del nuevo chat)

Confirmar versión y catálogo; DTC inicial en modo no destructivo con pestañas ficticias; foco activo; apertura inactivo; ausencia panel lectura; preservación de origen/pestañas; base; temas/icono/idioma y persistencia; DTC final. Si DTC inicial falla, no ejecutar mutaciones ONW; si falla foco/apertura, registrar último código al reabrir popup y detener esa ruta, no repetir ciegamente. No cerrar ventanas extra automáticamente. No declarar coexistencia ni versión estable sin pruebas. No repetir ONW-MENU V1/V2, ONW-ROW-STATIC-1 ni ONW-EVENT-STATIC-2. Si identidad o panel falla, registrar una vez y reevaluar sin encadenar diagnósticos.


CI Windows Node 22, [45653569598](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45653569598), commit ab3a01a9d758ca0efd28d4db927f77bbba824566: check/test 42/42 (0 fallos, 0 omitidos)/build aprobados. Prueba adicional local Chromium 144.0.7559.96 Linux: evento KeyboardEvent keydown Enter con keyCode/which 13 recibido por listener delegado con destino exacto, isTrusted=false; no Vivaldi ni Chromium 156. Código 0.1.5 posteriormente aceptado en QA-ONW-015; no release ni MVP completo. Panel: mitigación de ruta de puntero, causa no demostrada.

## Actualización D-039
La guía manual anterior sigue como respaldo, pero para futuras actualizaciones usar ZIP nominal y script según [DELIVERY_WINDOWS.md](DELIVERY_WINDOWS.md). No instalar nuevamente si los archivos candidatos ya fueron copiados. Verify es solo lectura; Install no edita window.html ni DTC y requiere referencias ya correctas, Vivaldi cerrado manualmente y prompt guardado. Si falta referencia, detener y revisar manualmente según guía anterior; no forzar. PowerShell aún pendiente de validación real.
