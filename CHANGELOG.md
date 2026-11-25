# Changelog

## 0.1.5 en desarrollo (no release, no instalar)

- Registrada QA real 0.1.4: 13 OK, 2 parciales, 2 fallos y 1 no comprobable.
- Requisitos nuevos confirmados: ES por defecto solo si no hay preferencia válida previa; conservar EN explícito. Cuatro temas persistentes: gris oscuro predeterminado, gris claro, claro azulado y Dark Blue (azul oscuro atenuado). Objetivo ancho efectivo 420 px y menor altura, sin perder tres acciones/listado/icono NW; error compacto con código desplegable y advertencia de ventana adicional visible.
- UX integrada: ES predeterminado, cuarto tema, ancho intrínseco, filas compactas y código de error desplegable; nuevas pruebas de contrato y de render con dobles. Sin incremento de versión ni release.
- Identidad y panel pendientes de evidencia estática; herramienta y propuesta diagnóstica conservadas en research, no aplicadas al puente.
- CI Windows 34/34 en 7a5917b, 36/36 en 11919c0; check/test/build aprobados, no runtime Vivaldi.

## Operación y continuidad (2026-11-25, D-033)

- Confirmada única instalación habitual; sustituida recomendación Standalone por instalación manual controlada y reversible. Flujo de dos chats: instrucciones y prompt antes del reinicio, QA después. Cambio documental, sin modificación del candidato 0.1.4.

## 0.1.4 candidata funcional (2026-11-25) | sin release

- V2 identifica menú real y eventos de filas. DTC recuperado sin cambios según reporte; coexistencia tras operaciones aún no confirmada.
- Candidato 0.1.4: protocolo 3 obligatorio en extensión/puente (incompatible con 2, evita mutaciones con puente antiguo); selector acotado al menú real y botón de barra confirmado, activación de botón con coordenadas de centro verificadas y fila mediante un único click dirigido con onClick comprobado. Identificación de todas las filas mediante catálogo, texto/título/aria y descendientes, nombres con emoji y sufijo numérico acotado como hipótesis, exige biyección y revalidación; nunca ordinal/subcadena arbitraria. Si no resuelve, error explícito sin elegir otra fila. Verifica ventana destino enfocada antes de mutar; deadline previo; lectura posterior. Foco estándar con consulta posterior acotada y snapshot desde destino, no se crea ventana ante fallo de foco. No modificar preferencias, DTC, cierre de panel o pestañas. UX 0.1.3 conservada. Pruebas con dobles añadidas, runtime pendiente.
- CI Windows 45645828628 aprobada (check/test/build); QA real pendiente en habitual según D-033; no considerar estable.

## 0.1.3 candidata UX (2026-11-25) | sin release

- Popup más ancho (420px), listado automático visible, refresco manual, icono NW gris y Configuración con tres temas persistentes (gris oscuro inicial, gris claro y claro azulado atenuados).
- Aislamiento: DTC falla con y sin ONW en ambos ámbitos; panel lateral solo aparece en Existing, no Ctrl+N ni Base. Incidencias separadas, sin causa exacta confirmada.
- Se registran resultados reales de 0.1.2: catálogo, base e idioma OK; interfaz parcial; foco y apertura fallan. Incidencia DTC sin detección, coexistencia no aprobada.
- Registrada apertura inesperada del panel lateral Lista de vistas de lectura; causa pendiente y comparación de eventos DOM/React documentada.
- Sin cambios a bridge, permisos, worker ni lógica de selección; no instalar en habitual hasta recuperar DTC. Tests estáticos añadidos, CI nueva pendiente de verificación.

## 0.1.2 experimental (2026-11-25) | sin release

- Implementación candidata de listado, detección de ventana activa, foco y apertura de Workspace existente.
- Puente independiente ONW y service worker; selección nativa por menú con coincidencia estricta y verificación posterior. Creación diferida.
- Añadida suite de pruebas; check/test/build aprobados en GitHub Actions Windows (run 45632780858), integración Vivaldi pendiente.
- Añadida guía de instalación manual personal y reversión (sin release ni instalador automático); prueba real pendiente. No se instaló puente ni se modificó DTC.

- Ampliada documentación de coexistencia con DTC, control de escrituras concurrentes, reversión selectiva y pruebas C-01 a C-05; sin cambios de código ni pruebas reales. Utilidad asistida propuesta, no implementada.

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
