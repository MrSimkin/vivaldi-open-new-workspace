# Investigación local de Vivaldi (P1/P3)

Estos archivos son herramientas de diagnóstico, no parte de la extensión ni de su build. No se instalan ni se ejecutan automáticamente. No se ha ejecutado ninguna en el Vivaldi real. No modificar el perfil habitual, el puente DTC, preferencias, seguridad ni archivos instalados. No reiniciar el navegador.

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
