# Puente ONW 0.1.2 experimental

El puente es un complemento local independiente de Duplicate Tabs Closer. NO es una extensión separada, no forma parte de dist/extension y no se instala automáticamente. Su código se ejecuta únicamente en el contexto interno window.html de Vivaldi. Las APIs y selectores no están validados en 8.3.4191.47.

**No instalarlo todavía en el navegador habitual.** Primero probar en una instalación independiente de Vivaldi (no solo un perfil si ambos comparten archivos de aplicación); no interrumpir el navegador actual. El propietario debe autorizar cualquier cambio a archivos internos. No se necesita modificar DTC, usar su ID ni alterar seguridad. No se autoriza un instalador automático ni tarea residente en esta fase.

## Contrato

ID de desarrollo ONW: poebajclpmcacjgkdbkjfjbngmagakbe, derivado de clave pública del manifiesto; no hay clave privada guardada. Este identificador restringe remitentes ordinarios, no constituye una credencial secreta contra otro software local capaz de suplantar una extensión descomprimida. Protocolo 2; mensajes PING, SNAPSHOT y SELECT solamente; cada uno dirigido al ID de ventana del contexto UI, correlación estricta. No aceptar mensajes de web, ejecución arbitraria, URL ni modificación directa de preferencias.

SNAPSHOT lee catálogo real e identifica Workspace activo a partir de pestaña activa y vivExtData en cada ventana normal no privada. Si no hay evidencia suficiente, devuelve unknown. Nombre y emoji son texto, no se renderiza HTML/SVG de terceros. Los iconos nativos sin emoji quedan pendientes de representación.

SELECT verifica que el espacio está inactivo, destino es base, nombres no ambiguos y menú nativo único. Intenta una sola selección usando el botón y fila nativos; comprueba postcondición con metadatos. Si falla, no reintentar mutación, no cerrar ninguna ventana ni mover pestañas como compensación. Selectores y eventos inspirados en la evidencia del proyecto comunitario, implementación propia. No se afirma que sea invocable en 8.3 hasta prueba real.

## Instalación manual disponible

Consultar [guía de instalación Windows](../docs/INSTALL_WINDOWS.md) para descarga, copia, edición explícita del archivo UI, prueba aislada y reversión. No es un instalador automático ni autoriza cambios en la instalación habitual.

## Validación futura mínima

1. En instalación de prueba, cargar extension/ descomprimida y confirmar ID. Sin puente, Existing informa falta de integración; Base abre ventana normal.
2. Con autorización, preparar integración del puente siguiendo el precedente de DTC pero con archivo y referencia propios; se necesita que window.html lo cargue en cada ventana, incluidas las nuevas. Antes de modificar archivos, revisar instalación, backup y rollback específicos. No tocar DTC ni reiniciar sesión habitual.
3. Con dos Workspaces ficticios, comprobar catálogo; seleccionar el activo en otra ventana (no crear ventana); luego uno inactivo (una ventana nueva, selección correcta, origen intacto). Confirmar UI y pestañas. Si hay fallo, guardar código de error y estado de ventanas, no datos personales.
4. Si solo se carga en ventana actual, puede funcionar lectura/enfoque, pero no selección en nuevas ventanas. No confundir hot-load con integración persistente.

No usar esta preview experimental como instalación diaria hasta validar las tres funciones. No publicar release.
