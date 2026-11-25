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
| RF-12 | Interfaz configurable entre español e inglés. |

## Requisitos no funcionales

- RNF-01: uso exclusivamente personal; no se exige publicación comercial ni en Chrome Web Store.
- RNF-02: prioridad Vivaldi Windows; sin obligación de compatibilidad transversal.
- RNF-03: interfaz compacta, directa, sin funciones ajenas al objetivo.
- RNF-04: preservar los datos y pestañas existentes; errores explícitos, sin éxito simulado.
- RNF-05: mínimo privilegio y mantenimiento razonable. Se admite evaluar soluciones específicas de Vivaldi para uso personal, sin autorizar por ello cambios invasivos, desactivar seguridad o instalar componentes externos automáticamente.

## Alcance excluido

Administrador completo de Workspaces, edición o eliminación de espacios existentes, gestor propio de pestañas, sincronización adicional, compatibilidad multiplataforma, publicación en tienda. No sustituir Workspaces nativos por tab groups.

## Detalles de diseño pendientes (no bloquean investigación)

- Caso de seleccionar el Workspace activo en la propia ventana: propuesta provisional, mantener/enfocar esa misma ventana sin duplicar; confirmar si importa al flujo.
- Idioma predeterminado (propuesta: idioma del navegador, con selector persistente ES/EN); mecanismo de persistencia y apariencia.
- Catálogo real de iconos/emojis, comportamiento de nombres duplicados, versión mínima de Vivaldi y mensajes de error: investigar comportamiento nativo antes de elegir.
- Tipo de pestaña inicial y semántica exacta del espacio base: respetar el comportamiento nativo y verificarlo.
- Si Vivaldi restringe un Workspace a una ventana, preservar esa restricción. No inventar una lista de espacios o duplicar sesiones.
- Licencia, método de distribución personal y decisiones técnicas de integración pendientes.

## Entrega escalonada autorizada (2026-11-25)

El propietario permite dejar RF-02 a RF-06 para una versión posterior si su complejidad o QA demora el uso inicial. Primera versión funcional prioriza RF-01, RF-07 a RF-12. New Workspace permanece visible, deshabilitado o marcado en construcción. No se cancelan requisitos de creación. La preview 0.1.1 es un paso intermedio: apertura normal y selección asistida no equivalen a cumplir RF-07 a RF-10. Reducir intervención/QA del propietario, sin eliminar la validación mínima de operaciones reales ni tocar su sesión habitual.

## Aceptación del MVP

Las tres operaciones deben actuar sobre el sistema nativo de Vivaldi, mantener abierta la ventana original y preservar datos. Crear rápido y personalizado, abrir base, listar y abrir existentes, enfocar ventana existente y cambiar idioma se verifican con los casos de TESTING. Iconos nativos y emojis quedan sujetos a capacidad real: si alguno no es viable, documentar evidencia y ofrecer solo lo soportado. Validación manual en Windows/Vivaldi obligatoria.
