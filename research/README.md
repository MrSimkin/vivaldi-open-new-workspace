# Investigación local de Vivaldi (P1/P3)

Estos archivos son herramientas de diagnóstico, no parte de la extensión ni de su build. No se instalan ni se ejecutan automáticamente. ONW-MENU-v1 fue ejecutado por el propietario; otras herramientas no se presumen ejecutadas. No modificar el perfil habitual, el puente DTC, preferencias, seguridad ni archivos instalados. No reiniciar el navegador.

## Paso 1: versión actual

En Vivaldi abrir vivaldi://about y anotar únicamente versión de Vivaldi, Chromium y Windows. No copiar rutas de perfil ni datos personales.

## Paso 2: inspección estática P3 (preferida, sin tocar la sesión)

Descargar Find-WorkspaceActions.ps1 y revisar su texto. Localizar la carpeta de la versión actualmente instalada resources\vivaldi que contiene window.html. La ruta del ejecutable en vivaldi://about permite encontrar el directorio Application; la subcarpeta con número de versión contiene resources\vivaldi. En PowerShell, desde el directorio del script, ejecutar:

```powershell
.\Find-WorkspaceActions.ps1 -UiRoot 'C:\RUTA\Application\VERSION\resources\vivaldi'
```

Sustituir RUTA y VERSION por los valores reales. No cambiar políticas de ejecución si el sistema bloquea el script; informar el error. El script solo lee archivos JS instalados, sin acceder a perfiles ni invocar APIs. Devuelve nombres de archivo relativos, conteos y muestras acotadas de código; revisar antes de compartir. No compartir el bundle entero ni datos personales. Coincidencia textual no demuestra que una función sea invocable; cero coincidencias tampoco demuestra ausencia (minificación o módulos cargados dinámicamente).

## Paso 3: diagnóstico P1 opcional, solo lectura de catálogo

Si hace falta complementar la inspección estática, abrir vivaldi://inspect/#apps, buscar window.html de la UI de Vivaldi y pulsar Inspect; no usar consola de una página web ni main.html. Revisar inspect-workspace-ui.js y ejecutar su contenido únicamente en la consola de la UI indicada. Si la consola no permite pegar, no desactivar protecciones: informar el bloqueo y usar la inspección estática. El script verifica contexto, enumera nombres de API y consulta el esquema del catálogo mediante prefs.get; no imprime nombres de Workspaces, IDs, URL, títulos, historial o contenido de pestañas. No instala un mod, no abre ventanas ni crea espacios. Copiar solo el objeto JSON ONW-P1 o describir el error.

## Paso 4: análisis y pruebas controladas

Con ambos informes, localizar la implementación real de los comandos de crear/seleccionar y determinar si requiere función interna, módulo UI o diálogo. Usar perfil de prueba independiente para cualquier mutación futura. No ejecutar funciones encontradas por nombre hasta entender firma y contexto. Validar primero apertura base, luego creación rápida y personalizada y por último selección/enfoque. Registrar versión, evidencia y resultado en FEASIBILITY y STATUS. Si no hay mecanismo utilizable, evaluar la alternativa de comandos/diálogo y explicitar sus límites antes de diseñar el MVP.

El repositorio público no debe contener informes con datos de usuario ni código propietario completo de Vivaldi. Conservar solo observaciones técnicas, referencias y conclusiones.

## Diagnóstico dirigido ONW-MENU (solo lectura, 0.1.2)

Con ONW desactivado y sin su puente, preferentemente en instalación de prueba, abrir DevTools de window.html como en Paso 3. Revisar inspect-native-workspace-menu.js. Ejecutar su contenido en esa consola; cuando aparezca el aviso, abrir manualmente el selector nativo de Workspaces y dejarlo visible ocho segundos, sin seleccionar un espacio. Volver a DevTools y copiar únicamente JSON ONW-MENU. Si DevTools impide mantener menú visible, informar bloqueo; no desactivar protecciones. El informe solo incluye estructura, handlers conocidos, coincidencias por ordinal, conteos y estado activo; no nombres/IDs/URL/títulos. No modifica DOM, no instala listeners, no ejecuta eventos ni toca DTC. Si rowsAfter vacío, no inferir ausencia del menú sin verificar que estaba abierto.

No reiniciar Vivaldi para ONW-MENU. Si un diagnóstico posterior realmente requiere cierre/reinicio, cumplir primero la puerta de continuidad de AGENTS.md y docs/WORKFLOW.md.

## ONW-MENU-v2: segunda y última ronda de inspección dinámica dirigida

V1 identificó catálogo/ventanas/botón pero no filas. En el mismo contexto window.html, ejecutar inspect-native-workspace-menu-v2.js y abrir manualmente el selector en la MISMA ventana inspeccionada al aviso. Mantener abierto 15 s sin seleccionar. Copiar solo JSON ONW-MENU-V2. El muestreo observa controles visibles nuevos y clases estructurales, coincidencias de nombres expresadas como ordinales, handlers y pulsaciones humanas sobre el botón, sin almacenar datos de navegación. También verifica referencia script y registro de listener de ambos puentes; no envía mensajes ni ejecuta DTC. El listener pasivo temporal se elimina en finally. No editar archivos ni reiniciar. Si no se detecta pulsación, revisar contexto; si se detecta pero no hay menú DOM, pasar a inspección estática/contexto alternativo, no repetir indefinidamente.

## Restricción operativa vigente D-033

Única instalación habitual, sin Standalone. Los diagnósticos de solo lectura se pueden ejecutar allí sin reinicio; las referencias a instalaciones de prueba separadas son históricas. V1/V2 completados, no repetir. Mutaciones solo bajo guía vigente INSTALL_WINDOWS, con prompt antes de reiniciar; QA en nuevo chat.

## 0.1.5: inspección estática focalizada pendiente (no reiniciar)

Tras QA-ONW-014, el código de identidad genérico puede surgir de fila sin coincidencia, ambigüedad, ID duplicado o revalidación; ninguna hipótesis está confirmada. `Find-ONW-RowIdentity.ps1` es la herramienta recibida del traspaso: lee únicamente JS instalado bajo resources/vivaldi, excluye ONW/DTC y emite contexto acotado de cuatro clases. No ejecuta Vivaldi, no genera eventos, no modifica archivos, no requiere cierre. Ejecutar solo con UiRoot real que contiene window.html, localizado mediante vivaldi://about; no cambiar políticas PowerShell. Compartir informe ONW-ROW-STATIC-1 revisado de datos personales, no el bundle completo ni subirlo al repo público. PowerShell Windows aún no verificado por agente. `proposed-identity-errors.mjs` conserva la transformación diagnóstica del traspaso como función inerte, no aplicada al puente ni ejecutada por producto. La prueba previa del fixture (8/8) no demuestra funcionamiento real. No integrar hasta contar con evidencia estática y revisar contratos. No repetir V1/V2 ni operación fallida.

## Evidencia estática ONW-ROW-STATIC-1 (2026-11-25)

Informe real del propietario, Vivaldi 8.3.4191.47: 20 JS inspeccionados, cero omitidos, siete muestras de bundle.js. No se almacena ni publica el bundle ni el JSON. La fila nativa usa div.title con dos p directos: nombre literal y p.tab-count; icono/avatar separado y title puede añadir texto de hibernación. El padre pasa ID nativo, nombre y onSelect a componente de fila; el botón DOM observado no aporta ID nativo demostrado. No confundir data-handler de drag con ID. El onClick de fila llama a selección con ID; se conserva un solo click y verificaciones. Toolbar registra togglePopup para onClick/onPointerDown, pero falta implementación de togglePopup/toolbar genérico y de selección; no se demuestra causa del panel. No invocar detachWorkspace ni APIs privadas nuevas por la mera aparición de un símbolo.

Corrección candidata: leer exclusivamente p de nombre dentro de div.title directo, exigir exactamente un nombre y un contador, comparar nombre literal exacto, exigir biyección completa y revalidación de la misma fila. No usar tooltip, concatenación, emoji añadido, sufijos numéricos u ordinal. Se integran códigos diagnósticos NO_MATCH/AMBIGUOUS/DUPLICATE/TARGET_MISSING/REVALIDATION/ROW_CHANGED. No cambia creación/foco de ventana, eventos, protocolo 3, permisos, manifest, worker ni DTC. QA runtime pendiente y causa concreta del fallo anterior no demostrada. El panel continúa abierto como problema, se requiere traza estática específica de callbacks; no repetir V1/V2 ni QA 0.1.4. No instalar main ni reiniciar.
