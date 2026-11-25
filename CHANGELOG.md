# Changelog

## 0.1.2 experimental (2026-11-25) | sin release

- Implementación candidata de listado, detección de ventana activa, foco y apertura de Workspace existente.
- Puente independiente ONW y service worker; selección nativa por menú con coincidencia estricta y verificación posterior. Creación diferida.
- Añadida suite de pruebas; check/test/build aprobados en GitHub Actions Windows (run 45632780858), integración Vivaldi pendiente.
- Añadida guía de instalación manual personal y reversión (sin release ni instalador automático); prueba real pendiente. No se instaló puente ni se modificó DTC.

## 0.1.1 preview (2026-11-25) | sin release

- Menú de tres opciones, selector ES/EN persistente, apertura normal y guía de selección manual. New Workspace en construcción.
- Prioridad de entrega ajustada por propietario; creación puede aplazarse, no se elimina.
- Entorno objetivo registrado y continuidad de DTC confirmada por propietario.
- Check/test (7/7)/build local aprobados; ejecución real y base/selección nativa pendientes.

## Sin publicar | diagnóstico P3 (2026-11-25)

- Investigación de windowPrivate, sessionsPrivate, comandos y referencias de modding; firma de creación activa aún desconocida.
- Añadidas herramientas read-only en research/ y guía de ejecución; no incluidas en build ni validadas en Vivaldi/Windows.

## Sin publicar | viabilidad documental (2026-11-25)

- Revisadas ambas ramas de Duplicate Tabs Closer; registrado precedente de puente de lectura, metadatos, restricciones y resiliencia.
- Contrastado comportamiento nativo con documentación oficial y reporte externo de riesgo de escritura directa de preferencias.
- Definidos candidatos, matriz de capacidades y secuencia P0-P4 de pruebas. Sin cambios a código, versión ni permisos.

## Sin publicar | requisitos confirmados (2026-11-25)

- Registrado alcance de uso personal y tres acciones: nuevo, base, existente.
- Confirmadas creación rápida y personalizada, enfoque de ventana existente, conservación de ventana original, iconos nativos/emojis sujetos a viabilidad y configuración ES/EN.
- Actualizados requisitos, instrucciones, diseño, viabilidad, pruebas y backlog. Sin cambios al código ni incremento de versión; investigación técnica pendiente.

## 0.1.0 (2026-11-25) | scaffold inicial, sin release

- Estructura MV3 para Vivaldi Desktop Windows; popup de estado sin funcionalidad de Workspaces.
- Adaptador aislado que declara explícitamente que la integración no está disponible.
- Scripts de validación y build, pruebas automatizadas y configuración CI para Windows.
- Documentación de trabajo, agentes, arquitectura, viabilidad, alcance, pendientes y checkpoint.
- Sin permisos de navegador, dependencias externas, publicación en tienda ni licencia pública seleccionada.
- Importación del scaffold al repositorio creado por el propietario, con conservación del commit inicial y de la visibilidad pública observada.
