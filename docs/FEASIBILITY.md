# Viabilidad técnica: Workspaces nativos

Consulta documental inicial: 2026-11-25. Alcance limitado a documentación pública; no se ejecutó Vivaldi.

## Evidencia inicial

- Vivaldi explica que está basado en Chromium y admite extensiones de Chrome: https://help.vivaldi.com/desktop/appearance-customization/extensions/
- Vivaldi documenta creación y gestión de Workspaces desde su propia interfaz: https://help.vivaldi.com/desktop/tabs/workspaces/
- Chrome documenta el manifiesto, los popups y carga descomprimida: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world
- Catálogo de APIs de extensiones Chromium: https://developer.chrome.com/docs/extensions/reference/api

Estas referencias respaldan el enfoque base y la existencia de Workspaces, no demuestran que una extensión ordinaria pueda crear un Workspace nativo. No se ha identificado una API pública y soportada de creación de Workspaces en esta revisión limitada; eso no prueba su inexistencia.

## Investigación reproducible pendiente

1. Confirmar el comportamiento funcional con el propietario.
2. Registrar versión exacta de Vivaldi Stable y Windows, perfil de prueba y tipo de extensión. Confirmar primero la instalación del scaffold.
3. Buscar API documentada, documentación de Vivaldi y ejemplos mantenidos; separar APIs estándar, privadas y código de la UI interna.
4. Si procede, revisar de forma autorizada ejemplos del repositorio relacionado `MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces`; no modificarlo ni asumir que leer metadatos permite crear Workspaces. No se inspeccionó en esta inicialización.
5. Probar disponibilidad desde el contexto real de la extensión descomprimida con mínimo privilegio. Registrar método, permisos, resultado y errores. No invocar operaciones mutantes sin caso de prueba aprobado.
6. Una vez aprobado el comportamiento, usar un perfil desechable para intentar la creación real y verificar el resultado en la UI, persistencia, aislamiento de pestañas y múltiples ventanas según alcance.
7. Documentar resultados reproducibles en este archivo y actualizar STATUS/DECISIONS/BACKLOG.

## Criterio de parada

Si una ruta soportada funciona, pasar al MVP. Si no hay una ruta verificada tras revisar fuentes y ejecutar pruebas razonables, cerrar la investigación con las evidencias, restricciones y alternativas. No repetir búsquedas sin nueva hipótesis ni introducir modificaciones del navegador por cuenta propia.
