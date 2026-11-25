# Puente ONW 0.1.4 candidato

El puente es un complemento local independiente de Duplicate Tabs Closer. NO es una extensión separada, no forma parte de dist/extension y no se instala automáticamente. Su código se ejecuta únicamente en el contexto interno window.html de Vivaldi. Las APIs y selectores no están validados en 8.3.4191.47.

**Entorno del propietario: una sola instalación habitual, sin Standalone (D-033).** Actualización candidata manual, explícita, reversible y controlada según INSTALL_WINDOWS. No asumir aislamiento por perfil; el riesgo residual permanece. Guardar prompt completo antes de cerrar/reiniciar y retomar QA en nuevo chat. No modificar DTC ni seguridad. No instalador automático ni tarea residente.

## Contrato

ID de desarrollo ONW: poebajclpmcacjgkdbkjfjbngmagakbe, derivado de clave pública del manifiesto; no hay clave privada guardada. Este identificador restringe remitentes ordinarios, no constituye una credencial secreta contra otro software local capaz de suplantar una extensión descomprimida. Protocolo 3 (requiere extensión 0.1.4; protocolo 2 rechazado); mensajes PING, SNAPSHOT y SELECT solamente; cada uno dirigido al ID de ventana del contexto UI, correlación estricta. No aceptar mensajes de web, ejecución arbitraria, URL ni modificación directa de preferencias.

SNAPSHOT lee catálogo real e identifica Workspace activo a partir de pestaña activa y vivExtData en cada ventana normal no privada. Si no hay evidencia suficiente, devuelve unknown. Nombre y emoji son texto, no se renderiza HTML/SVG de terceros. Los iconos nativos sin emoji quedan pendientes de representación.

SELECT verifica que el espacio está inactivo, destino es base y enfocado, nombres no ambiguos y menú nativo único; resuelve todas las filas por nombre y decoraciones numéricas/emoji acotadas sin ordinales. Revalida identidad y geometría, un click dirigido. Etiquetas decoradas son hipótesis, no garantía. Intenta una sola selección usando el botón y fila nativos; comprueba postcondición con metadatos. Si falla, no reintentar mutación, no cerrar ninguna ventana ni mover pestañas como compensación. Selectores y eventos inspirados en la evidencia del proyecto comunitario, implementación propia. No se afirma que sea invocable en 8.3 hasta prueba real.

## Instalación manual disponible

Consultar [guía de instalación Windows](../docs/INSTALL_WINDOWS.md) para descarga, copia, edición explícita del archivo UI, prueba controlada en habitual y reversión. Solo cambios ONW autorizados.

## Validación futura mínima

1. En la instalación habitual autorizada, cargar extension/ descomprimida y confirmar ID. Sin puente, Existing informa falta de integración; Base abre ventana normal.
2. Con autorización, preparar integración del puente siguiendo el precedente de DTC pero con archivo y referencia propios; se necesita que window.html lo cargue en cada ventana, incluidas las nuevas. Antes de modificar archivos, revisar instalación, backup y rollback específicos. No tocar DTC; reinicio manual habitual solo tras guardar prompt.
3. Con dos Workspaces ficticios, comprobar catálogo; seleccionar el activo en otra ventana (no crear ventana); luego uno inactivo (una ventana nueva, selección correcta, origen intacto). Confirmar UI y pestañas. Si hay fallo, guardar código de error y estado de ventanas, no datos personales.
4. Si solo se carga en ventana actual, puede funcionar lectura/enfoque, pero no selección en nuevas ventanas. No confundir hot-load con integración persistente.

No considerar la candidata estable hasta validar las tres funciones; no usar para operaciones reales mientras no esté aceptada. No publicar release.
