# Instalación personal Windows | histórico 0.1.2 y candidato 0.1.4

Versión objetivo: Vivaldi 8.3.4191.47 x64 / Chromium 156.0.8078.110. Check/test/build aprobados en Windows mediante GitHub Actions, run 45632780858. No se ha ejecutado Vivaldi real con ONW. No es un release estable ni se garantiza compatibilidad de APIs privadas. New Workspace queda en construcción.

## Actualización candidata 0.1.4 (no instalada)

Requiere ambos componentes 0.1.4 y protocolo 3; no mezclar con bridge 0.1.2/0.1.3. Obtener ZIP de commit candidato con CI aprobada, verificar manifest y bridge, seguir instalación separada de aplicación y perfil. No sobrescribir carpeta de instalación habitual E:\\Vivaldi_OpenNewWorkspace. Si existe ONW en Standalone, respaldar bridge ONW y carpeta extension, sustituir solo ONW y conservar referencia única si ya existe. No tocar DTC. Antes de cualquier cierre/reinicio entregar prompt actualizado según AGENTS. Tras arranque verificar foco/apertura y panel de lectura, origen, base/listado y temas. Ante error no repetir y reportar código. La sección siguiente conserva instrucciones y ZIP históricos 0.1.2, no usar ese ZIP para 0.1.4.

## Descargar

[ZIP de fuentes 0.1.2, revisión fija](https://github.com/MrSimkin/vivaldi-open-new-workspace/archive/e08b4da26206a64ca9f986a2e5eb723e515ad459.zip). La revisión de fuentes precede a la guía de instalación: consultar este documento en main. El diff entre el commit de CI a0f43b3 y e08b4da solo contiene Markdown. También se puede descargar Code > Download ZIP desde GitHub, verificando versión. Extraer a carpeta permanente (p. ej. C:\Tools\Open-New-Workspace). Conservar las carpetas extension y bridge. No se necesita Node.js, npm, CRX, tienda ni compilación: extension/ ya es cargable.

## Primera prueba: Vivaldi independiente

Se recomienda una instalación Standalone con archivos de aplicación y perfil separados; un perfil adicional en la misma instalación NO aísla window.html. [Guía oficial](https://help.vivaldi.com/es/escritorio/instalacion-actualizacion/version-independiente-de-vivaldi/). Utilizar la misma versión que el navegador habitual si está disponible. No importar sesiones, sincronizar ni cerrar el navegador habitual. No desactivar seguridad ni actualizaciones. Si no hay tiempo para probar, posponer el puente hasta tener disponibilidad; no presentar el resultado como validado.

## 1. Cargar extensión

En el Vivaldi de prueba abrir vivaldi://extensions, activar Modo desarrollador, pulsar Cargar descomprimida y seleccionar la carpeta extension del ZIP (la que contiene manifest.json). Si existía preview 0.1.1 en ese perfil, desactivarla para evitar dos iconos, no eliminar datos de otras extensiones. Confirmar versión 0.1.2 e ID poebajclpmcacjgkdbkjfjbngmagakbe. Fijar el icono si es necesario. Sin puente, Workspace existente indicará error de comunicación; Base abre ventana normal, no confirma todavía su pertenencia al espacio base.

## 2. Instalar puente (manual, explícito y reversible)

Antes de solicitar cerrar/reiniciar Vivaldi, cumplir puerta de continuidad de AGENTS.md y docs/WORKFLOW.md: actualizar checkpoint y docs/RESUME_PROMPT.md, entregar al propietario prompt íntegro copiable/descargable para guardar fuera del navegador. No continuar a cierre si falta ese traspaso.

Antes de editar, identificar la instalación de prueba por vivaldi://about (Mostrar más, ruta del ejecutable). Cerrar únicamente esa instancia de prueba cuando no tenga trabajo que preservar. No cerrar ni reiniciar Vivaldi habitual. Localizar el subdirectorio Application\<versión>\resources\vivaldi que contiene window.html. Confirmar que es la versión activa de la instalación separada, no el perfil User Data, ni la instalación habitual.

- Hacer copia de window.html con un nombre nuevo window.html.onw-backup; no sobrescribir copia previa. Si existe un backup ONW anterior, conservarlo y usar nombre con fecha. No reutilizar ni alterar backup DTC.
- Crear subcarpeta onw-mods dentro de resources\vivaldi y copiar bridge/onw-workspace-bridge.js allí. Si ya existe, conservar copia o detenerse y revisar versión.
- Abrir window.html con editor de texto. Preservar codificación y todo el contenido existente, incluidos scripts DTC si los hubiera. Comprobar que existe un único cierre de body; si no existe o el archivo es inesperado, detenerse sin cambios. Insertar una sola vez, justo antes del cierre de body, esta línea:

```html
<script src="onw-mods/onw-workspace-bridge.js"></script>
```

Guardar con el nombre original, no .txt. No sustituir window.html por uno de otro equipo. Si permisos de escritura impiden edición, no cambiar permisos, no desactivar seguridad; detenerse. El mod ejecuta JS en la UI privilegiada del navegador, por ello se limita a la versión revisada y se prueba aislado.

Abrir Vivaldi de prueba desde su ejecutable. El bridge debe cargarse en cada ventana nueva. En una sesión ya abierta, recargar la extensión sola no carga el bridge en window.html; esperar al siguiente arranque natural cuando corresponda. No instalar tareas programadas, mecanismos de persistencia automática ni lanzar/cerrar el navegador por script.

## 3. Prueba mínima

Crear manualmente dos Workspaces ficticios, uno activo en una ventana distinta y otro inactivo. En ONW, seleccionar Workspace existente: debe mostrar nombres reales. Seleccionar el activo: debe enfocar su ventana sin crear otra. Seleccionar el inactivo: debe abrir una ventana y activar ese Workspace; confirmar pestañas del espacio y ventana original intactas. Probar Base: nueva ventana sin Workspace personalizado. Verificar que New permanece deshabilitado y que idioma ES/EN cambia. Ante cualquier error, no repetir ciegamente, no cerrar ventanas con datos: registrar código de error (sin nombres, URLs ni capturas personales) y cuál de las operaciones falló.

Si las operaciones pasan, repetir la misma instalación manual en el navegador habitual solo cuando el propietario lo decida y con backup propio. No modificar DTC ni su script. No se necesita realizar QA extensa ahora; no declarar integración funcional sin estas pruebas. 

## Coexistencia con Duplicate Tabs Closer (DTC)

Revisión estática 2026-11-25: ONW df7fda8, DTC a3b20600bdab4a0f58bade05f0175da5822e259a. Los puentes tienen IDs, protocolos, variables de listener y carpetas diferentes. DTC Repair-VivaldiBridge.ps1 conserva el HTML leído e inserta su referencia si falta, pero no coordina escrituras concurrentes. No se ha inspeccionado el archivo instalado del propietario ni probado coexistencia real.

Antes de intervenir en la instalación habitual, aprobar la prueba Standalone. Con autorización posterior, registrar funcionamiento inicial DTC (consulta/revisión de duplicados sin cerrar pestañas), versión activa, referencias script y hash SHA256 de window.html y del bridge DTC si presente. Si DTC está instalado pero falta su referencia o archivo, detenerse y diagnosticar; no repararlo desde ONW. No editar ni desactivar su reparador, tarea, backups ni puente.

En cada edición ONW: conservar una copia nueva de window.html con fecha/hora; verificar hash justo antes de guardar, evitar una escritura si ha cambiado desde la lectura y comparar después el resultado con el original (único cambio autorizado: referencia ONW). Verificar exactamente una referencia ONW, referencias DTC intactas, hashes del bridge DTC y del nuevo bridge ONW frente a sus originales. Si hay cambio inesperado, detenerse, no restaurar automáticamente un HTML antiguo; revisar la versión actual. La comprobación de hash no elimina por completo una carrera con el reparador. No ejecutar deliberadamente reparaciones simultáneas. No modificar directorios de otras versiones.

Tras arrancar voluntariamente, ejecutar casos C-01 a C-05 de TESTING.md con pestañas ficticias; comprobar DTC antes y después de cambiar Workspace mediante ONW. No activar cierre automático ni cerrar duplicados reales para la prueba. Una prueba Standalone sin DTC no valida coexistencia: para validarla allí se requiere una instalación de DTC independiente y autorizada, o una prueba posterior en habitual autorizada. Si falla DTC, detener operaciones ONW y revertir solo ONW.

Se recomienda evaluar una utilidad PowerShell manual de diagnóstico (por defecto solo lectura), vista previa y aplicación/reversión explícita, sin elevación, reinicios, tareas residentes ni reparación de DTC. No está implementada ni validada; la guía manual sigue siendo la alternativa.

## Desinstalación / reversión

Desactivar o quitar ONW desde vivaldi://extensions. Con la instancia modificada cerrada cuando corresponda, retirar únicamente la línea script de onw-mods/onw-workspace-bridge.js de su window.html, guardar y eliminar únicamente el archivo ONW copiado. Conservar backups y otros mods. No restaurar un backup antiguo completo si se han hecho otros cambios desde la copia. Solo restaurar backup completo si se ha verificado que corresponde exactamente a esa versión y que la única diferencia es la línea ONW. No tocar DTC ni su reparación. El cambio de UI se aplica al siguiente arranque; no forzar cierre del navegador.

## Actualizaciones de Vivaldi

Una actualización puede sustituir recursos; si desaparece el puente, Existing fallará explícitamente. No reutilizar archivos window.html antiguos; volver a verificar el nuevo código, versión y compatibilidad antes de repetir instalación. Según el propietario DTC ha mantenido su compatibilidad; ONW sigue sin prueba real. No hay reparador automático ni garantía de persistencia. La instalación permanente y una distribución automatizada se evaluarán después de la prueba inicial.
