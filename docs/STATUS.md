# Estado actual / checkpoint

Fecha: 2026-11-25 | versión: 0.1.1 preview | etapa: implementación parcial y viabilidad nativa (pre-MVP).

## Implementado

- Extensión MV3 con menú de tres opciones, selector ES/EN persistente local, apertura de ventana normal y guía asistida de selección. New Workspace deshabilitado. Sin integración nativa automática.
- Scripts de comprobación y build sin dependencias externas; pruebas unitarias y estáticas.
- Documentación de requisitos, diseño, decisiones, viabilidad, backlog y trabajo de agentes.
- Workflow de CI para Windows en GitHub Actions.

## Estado de desarrollo y build

| Control | Resultado |
|---|---|
| npm run check | Aprobado: manifiesto, referencias, sintaxis |
| npm test | Aprobado: 7/7 pruebas (preview 0.1.1) |
| npm run build | Aprobado: `dist/extension/` generado; ZIP preview comprobado |
| Carga descomprimida en Vivaldi/Windows | No ejecutada |
| Creación real de Workspace | No implementada ni validada |
| CI GitHub Actions | Configurada; al consultar el commit de importación no se reportaron estados de CI. Ejecución en Windows no confirmada. |
| Repo remoto/commit/push | Importación verificada en `main`: 26 archivos, commit `480da6f4c1640d58ebd31d1774af43a98aa61af7`; se conserva el commit inicial. |
| Publicación/distribución | No realizada |

Entorno de verificación: Linux, Node.js v22.16.0, 2026-11-25 (entorno de ejecución del agente). Pruebas repetidas satisfactoriamente antes de la importación. No se ejecutó Vivaldi ni Windows. El paquete fuente no incluye `dist/`; se regenera con `npm run build`.

## Verificación de importación (2026-11-25)

- Repo `MrSimkin/vivaldi-open-new-workspace`, público, rama `main`; permisos de lectura y escritura verificados.
- El commit inicial del propietario permanece como padre del commit de importación.
- Se verificó la lista de 26 archivos del commit y se compararon los hashes Git de los 14 archivos técnicos (código, configuración, CI, scripts y tests) con los originales locales: 14/14 idénticos.
- La documentación de bootstrap, estado, pendientes y decisiones fue actualizada para reflejar el repositorio existente. ONW-001 y ONW-002 cerradas. Sin release ni licencia asignada.

## Confirmación de requisitos (2026-11-25)

- ONW-003 cerrada: requisitos funcionales aprobados por el propietario, RF-01 a RF-12.
- Uso personal; menú con tres opciones: crear nuevo rápido o con nombre/icono, abrir base, abrir existente o enfocar su ventana si ya está abierto.
- Conservar ventana original; iconos nativos y emojis si es posible; español/inglés configurable.
- No se modificó código, manifiesto, build ni permisos en este checkpoint. Los resultados de pruebas y build anteriores corresponden al scaffold sin cambios; no se volvieron a ejecutar.
- No se ha verificado todavía la capacidad de integración nativa. No se realizó investigación nueva en este checkpoint.

## Investigación de viabilidad: revisión documental (2026-11-25)

- Revisadas ramas master y feature/vivaldi-workspace-scope de DTC, a petición del propietario; referencia fijada a a3b20600bdab4a0f58bade05f0175da5822e259a. Código, handoff, checkpoint y resiliencia consultados.
- Evidencia previa: puente de solo lectura funcional en DTC; APIs internas de lectura, no de creación. Vivaldi documenta enfoque de ventana existente y creación con nombre/icono. Riesgo de escritura directa de prefs reportado por tercero.
- Ruta preferente provisional: comprobar extensión normal, después evaluar puente propio con acciones nativas; alternativa comandos/UI. No copiar código GPL ni tocar DTC. Se documentó matriz y secuencia de prueba en FEASIBILITY.
- ONW no ha ejecutado Vivaldi ni cambiado código, versión, permisos o instalación. No se repitieron tests/build del scaffold. No se verificó CI en esta intervención.

## P3: investigación de acciones internas y herramientas (2026-11-25)

- Identificadas referencias comunitarias de windowPrivate y sessionsPrivate, comandos nativos y catálogo de preferencias. Ninguna confirma una firma de creación activa invocable por ONW. No usar sesiones guardadas ni windowKey como sustituto.
- Añadido research/ con escáner PowerShell de JS instalado, sonda de lectura del esquema/API en UI y guía. Son herramientas de investigación no empaquetadas; no se han ejecutado en Windows/Vivaldi ni se afirma validación de sintaxis PowerShell. No se modificaron código de extensión, versión, permisos ni DTC; no se reejecutó build/tests.
- Criterio de parada documental alcanzado por ahora: siguiente evidencia requiere versión local y resultados de inspección. No reiniciar ni alterar el perfil habitual.

## Preview 0.1.1 y repriorización (2026-11-25)

- Entorno confirmado por captura del propietario: Vivaldi 8.3.4191.47 x64, Chromium 156.0.8078.110, Windows 11 26H2 build 26300.9974. Se omiten datos personales.
- El propietario confirma que DTC sigue siendo compatible y no le ha fallado con nuevas versiones; distinguir reporte actual de incidentes históricos. No se verificó su instalación desde ONW.
- El propietario autoriza diferir creación/nombre/icono para acelerar entrega. Primera versión funcional debe priorizar base y existentes, enfoque e idioma. La preview 0.1.1 solo abre ventana normal, muestra guía manual, cambia idioma y deja creación deshabilitada. No cumple aún RF-07 a RF-10 completos.
- Ejecutados check, test (7/7), build e integridad ZIP en Linux/Node 22.16.0; sin prueba Vivaldi, CI remoto no confirmado. Se verificó que los 5 archivos de extensión del ZIP coinciden con fuentes locales. No se cambia DTC ni se modifica Vivaldi, no se publica release.

## Bloqueos y siguiente acción

1. ONW-004: si el propietario dispone de tiempo, una prueba mínima de la preview (instalar descomprimida y verificar que la nueva ventana sea base). No reiniciar Vivaldi.
2. ONW-005/006: concentrar investigación de selección nativa de existentes (listado/ventana activa/selección/enfoque) usando precedentes DTC. Si requiere diagnóstico local, acotarlo a una sola captura de evidencia; no bloquear por creación. No modificar el puente DTC ni la instalación habitual sin permiso.
3. ONW-007: completar automatización de existentes y base; diferir creación/personalización a ONW-011. No declarar preview como MVP completo.

No se han tocado otros repositorios. No se han declarado permisos de navegador. No se ha asignado una licencia. Se conserva la visibilidad pública observada.

## Plantilla de actualización de checkpoint

- Fecha, versión, rama y commit (si existe):
- Cambios realizados / archivos afectados:
- Comandos ejecutados y resultados:
- Entorno, pruebas manuales y evidencias:
- Estado remoto / CI / release:
- Bloqueos y decisiones pendientes:
- Próxima acción concreta:
