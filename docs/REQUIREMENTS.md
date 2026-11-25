# Requisitos y alcance

## Confirmados por el propietario (2026-11-25)

- R-001: extensión llamada **Open New Workspace**.
- R-002: navegador Vivaldi de escritorio en PC Windows.
- R-003: Chromium-compatible no es requisito independiente; Vivaldi tiene prioridad.
- R-004: repositorio con estructura, instrucciones de trabajo, agentes, diseño, estado de desarrollo/build y pendientes autosuficientes.

## Hipótesis de producto, no aprobadas

- H-001: crear un Workspace nativo de Vivaldi desde la extensión. El nombre sugiere esta intención; no la confirma.
- H-002: un acceso desde la barra de extensiones, mediante popup o acción directa. La base incluye un popup informativo temporal, no una decisión de UX final.
- H-003: no modificar Workspaces ni pestañas existentes como principio conservador hasta conocer el comportamiento deseado.

## Preguntas pendientes de definición

- ¿Qué debe hacer exactamente la extensión al activarla: crear un Workspace vacío, abrir uno existente, crear y mover pestañas, o algún otro flujo?
- ¿Debe activarse el nuevo Workspace? ¿En qué ventana? ¿Debe llevar nombre, icono o URL inicial?
- ¿Qué entradas se requieren: botón, menú contextual, atajo, enlace, regla automática u otras?
- ¿Qué pasa con duplicados, múltiples ventanas, perfiles y errores? ¿Hay automatización o personalización?
- ¿Se distribuirá de forma privada, mediante tienda o de otro modo? ¿Idioma final, licencia y versión mínima de Vivaldi?

No implementar estas decisiones como requisitos hasta que estén confirmadas. No exigir compatibilidad Chrome/Edge, Mac/Linux, móviles, sincronización ni publicación en tienda.

## Criterios provisionales para el futuro MVP

Si H-001 se aprueba: una acción explícita crea exactamente un Workspace nativo según el comportamiento confirmado; el resultado se verifica en la interfaz de Vivaldi. Un fallo se informa sin cambios no solicitados. La operación no requiere permisos adicionales sin justificación. Validación manual en Windows/Vivaldi obligatoria.
