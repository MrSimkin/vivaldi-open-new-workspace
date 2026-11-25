# Requisitos y alcance

## Confirmados por el propietario (2026-11-25)

- R-001: extensión llamada **Open New Workspace**.
- R-002: Vivaldi Desktop en PC Windows.
- R-003: compatibilidad con otros navegadores Chromium no obligatoria.
- R-004: repositorio autosuficiente con instrucciones, diseño, estado, build y pendientes.

## Requisitos funcionales aprobados

| ID | Requisito |
|---|---|
| RF-01 | Botón en la barra de extensiones. Al pulsarlo, mostrar siempre las tres opciones: New Workspace, Base Workspace, Existing Workspace. |
| RF-02 | Crear un Workspace nativo de Vivaldi, no una simulación ni un grupo de pestañas. |
| RF-03 | Abrir el Workspace nuevo en una ventana independiente. |
| RF-04 | Creación rápida sin configuración; Workspace vacío, salvo pestaña inicial requerida por Vivaldi. |
| RF-05 | Permitir nombre opcional al crear; si se omite, usar el comportamiento predeterminado de Vivaldi. |
| RF-06 | Permitir icono opcional al crear; ofrecer iconos nativos y emojis si es técnicamente posible. |
| RF-07 | Abrir una nueva ventana con el espacio base de Vivaldi, sin crear un Workspace ni asignarle uno nombrado. |
| RF-08 | Mostrar los Workspaces nativos existentes del perfil, con sus nombres y, si están disponibles, iconos. |
| RF-09 | Abrir el Workspace existente seleccionado en otra ventana, conservando sus pestañas y sin duplicarlo, cuando no esté ya abierto. |
| RF-10 | Si el Workspace existente ya está abierto en otra ventana, enfocar esa ventana en lugar de crear otra o trasladar sus pestañas. |
| RF-11 | Mantener abierta la ventana original en todas las operaciones. |
| RF-12 | Interfaz configurable entre español e inglés; ES predeterminado si no hay preferencia válida guardada. |
| RF-13 | Configuración de cuatro temas (gris oscuro predeterminado, gris claro, claro azulado, azul oscuro atenuado) persistentes; mantener icono NW y evitar excesiva luminosidad. |

## Requisitos no funcionales

- RNF-01: uso exclusivamente personal; no se exige publicación comercial ni en Chrome Web Store.
- RNF-02: prioridad Vivaldi Windows; sin obligación de compatibilidad transversal.
- RNF-03: interfaz compacta, directa, sin funciones ajenas al objetivo.
- RNF-04: preservar los datos y pestañas existentes; errores explícitos, sin éxito simulado.
- RNF-05: mínimo privilegio y mantenimiento razonable. Se admite evaluar soluciones específicas de Vivaldi para uso personal, sin autorizar por ello cambios invasivos, desactivar seguridad o instalar componentes externos automáticamente.

- RNF-06: una única instalación habitual de Vivaldi, sin Standalone ni segunda instalación. Validación controlada allí, con respaldos, reversión selectiva y reinicio manual cuando corresponda. Flujo de dos chats temporales D-033; instrucciones/prompt antes, preguntas y QA después.

- RNF-07: organizar todas las futuras entregas, ZIP, extracciones y respaldos en subcarpetas de la raíz de trabajo ONW, conservando rutas activas estables (D-034); excepción 0.1.4 ya instruida.

## Alcance excluido

Administrador completo de Workspaces, edición o eliminación de espacios existentes, gestor propio de pestañas, sincronización adicional, compatibilidad multiplataforma, publicación en tienda. No sustituir Workspaces nativos por tab groups.

## Detalles de diseño pendientes (no bloquean investigación)

- Caso de seleccionar el Workspace activo en la propia ventana: propuesta provisional, mantener/enfocar esa misma ventana sin duplicar; confirmar si importa al flujo.
- Idioma predeterminado confirmado: ES; preservar selección explícita ES/EN.
- Catálogo real de iconos/emojis, comportamiento de nombres duplicados, versión mínima de Vivaldi y mensajes de error: investigar comportamiento nativo antes de elegir.
- Tipo de pestaña inicial y semántica exacta del espacio base: respetar el comportamiento nativo y verificarlo.
- Si Vivaldi restringe un Workspace a una ventana, preservar esa restricción. No inventar una lista de espacios o duplicar sesiones.
- Licencia, método de distribución personal y decisiones técnicas de integración pendientes.

## Entrega escalonada autorizada (2026-11-25)

El propietario permite dejar RF-02 a RF-06 para una versión posterior si su complejidad o QA demora el uso inicial. Primera versión funcional prioriza RF-01, RF-07 a RF-12. New Workspace permanece visible, deshabilitado o marcado en construcción. No se cancelan requisitos de creación. La preview 0.1.1 es un paso intermedio: apertura normal y selección asistida no equivalen a cumplir RF-07 a RF-10. Reducir intervención/QA del propietario, sin eliminar la validación mínima de operaciones reales ni tocar su sesión habitual.

## Aceptación del MVP

Las tres operaciones deben actuar sobre el sistema nativo de Vivaldi, mantener abierta la ventana original y preservar datos. Crear rápido y personalizado, abrir base, listar y abrir existentes, enfocar ventana existente y cambiar idioma se verifican con los casos de TESTING. Iconos nativos y emojis quedan sujetos a capacidad real: si alguno no es viable, documentar evidencia y ofrecer solo lo soportado. Validación manual en Windows/Vivaldi obligatoria.

## Actualización 0.1.5

- RF-14: ancho efectivo objetivo 420 px, reducir altura y compactar mensajes con código desplegable, conservando advertencia de ventana adicional y funciones aprobadas.
- RF-15: Existing no debe abrir panel Lista de vistas de lectura inesperadamente; corregir causa, no ocultar panel automáticamente.

## RNF-08 — Entregas futuras (D-039)
Cada actualización a instalar debe entregarse como ZIP con nombre específico de versión y script PowerShell mantenido en el repositorio, con instrucciones mínimas, respaldo, verificación y reversión selectiva según D-033/D-034. No exigir al propietario Node/npm. No sobrescribir entregas históricas ni modificar DTC.
