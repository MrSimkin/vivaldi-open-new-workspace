# Estado actual / checkpoint

Fecha: 2026-11-25 | versión: 0.1.2 experimental | etapa: integración candidata, QA pendiente (pre-MVP).

## Implementado

- Extensión MV3 con menú ES/EN, apertura normal y cliente de puente independiente. Implementación experimental de listado, identificación de activo, foco y selección de existente en nueva ventana. New Workspace deshabilitado. Requiere validación real y puente en todas las ventanas.
- Scripts de comprobación y build sin dependencias externas; pruebas unitarias y estáticas.
- Documentación de requisitos, diseño, decisiones, viabilidad, backlog y trabajo de agentes.
- Workflow de CI para Windows en GitHub Actions.

## Estado de desarrollo y build

| Control | Resultado |
|---|---|
| npm run check | 0.1.2 aprobado en GitHub Actions (Windows) |
| npm test | 0.1.2: suite aprobada en GitHub Actions (Windows) |
| npm run build | 0.1.2 aprobado en GitHub Actions (Windows) |
| Carga descomprimida en Vivaldi/Windows | No ejecutada |
| Creación real de Workspace | No implementada ni validada |
| CI GitHub Actions | 0.1.2: job de Windows exitoso, check/test/build; [run 45632780858](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45632780858). |
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

## 0.1.2: integración experimental (2026-11-25)

- Investigado mod comunitario workspaceButtons.js; identificada ruta de selección por menú nativo. Añadidos bridge/onw-workspace-bridge.js, worker, cliente, tests de lógica y puente con dobles, y guía de validación.
- Listado real candidato; foco por ID verificado; apertura de inactivo en destino mediante selección nativa estricta y postcondición. No se escribe prefs ni mueve/cierra pestañas directamente. Puede quedar ventana adicional ante fallo/carrera, avisada al usuario.
- Se añadió permiso storage (estado de operación en sesión) y clave pública de desarrollo propia; no hay clave privada guardada ni permiso de hosts. No modificar DTC.
- Conector permitió preparar commits, pero el entorno local no resuelve GitHub y no pudo descargar las fuentes exactas del nuevo commit para ejecutar Node. No se atribuyen resultados previos a esta versión. La CI de Windows se verificó posteriormente: check/test/build exitosos en el commit a0f43b31b61269b8f36789e3ccdf0226ad8b3879 (run 45632780858). Ejecución real Vivaldi pendiente; no se entregó ZIP instalable 0.1.2 ni se publicó release.
- La integración depende de instalar/cargar el puente en el UI de todas las ventanas. No hay autorización de modificación del navegador habitual; no realizarla ni reiniciar. Mantener 0.1.1 como preview sin puente hasta validar.

## Entrega de instalación personal experimental (2026-11-25)

- El propietario solicita instalador o instrucciones. Se eligió entrega manual sin dependencias ni scripts de modificación automática: ZIP de fuentes fijado a e08b4da y carga de extension/ directamente; copia del puente independiente y cambio acotado de window.html con backup. Ver docs/INSTALL_WINDOWS.md.
- El código 0.1.2 y resultados de CI no cambian; se comprobó existencia de los archivos en GitHub. No se generó ni verificó un ZIP binario local nuevo; se ofrece el archivo fuente de GitHub, no un CRX ni release.
- No se ha instalado en el PC del propietario, ni se ejecutó Vivaldi, ni se modificó DTC. Prueba en instalación Standalone antes de uso habitual; no reiniciar sesión habitual. Desinstalación y recuperación documentadas. No se repitieron tests por cambio documental.

## Continuación y coexistencia (2026-11-25)

- HEAD inicial df7fda8c5419e002f630cc41db84c00dd51aba7b recuperado por conexión GitHub; DTC sigue en a3b20600bdab4a0f58bade05f0175da5822e259a. Revisados ambos listeners y Repair-VivaldiBridge.ps1: IDs, protocolo y registro global independientes; DTC inserta en HTML existente, sin coordinación de escrituras. Coexistencia plausible, no demostrada.
- Verificado de nuevo el job check del run 45632780858: check/test/build success; comparación a0f43b3...e08b4da y e08b4da...df7fda8 muestra únicamente cambios Markdown. ZIP fuente fijado a e08b4da corresponde al código probado, no contiene la guía posterior.
- Guía y matriz C-01 a C-05 ampliadas; propuesta de utilidad asistida manual sin ejecución automática. No se ha generado instalador, ni ejecutado Vivaldi/Windows ni tocado DTC, PC, perfiles, permisos o código de producto. No se repiten pruebas de código por cambio exclusivamente documental.
- Próxima acción: descargar fuente, cargar extensión en Standalone, identificar recursos y seguir guía; validar ONW y después coexistencia real autorizada. No confundir primera prueba aislada sin DTC con coexistencia.

## Instalación reportada por el propietario (2026-11-25)

- El propietario confirma extracción del ZIP, copia del bridge, respaldo de window.html, inserción de referencia ONW, carga descomprimida y reinicio de Vivaldi. No se ha inspeccionado localmente la instalación ni se conoce si es Standalone o habitual; no se afirma que el bridge responda ni que DTC coexista correctamente.
- Siguiente acción: prueba manual agrupada de DTC inicial, interfaz, catálogo, foco de activo, apertura de inactivo, base, idioma y DTC final. Usar pestañas de prueba; detener ante pérdida de datos o fallo DTC, registrar errores sin reintentos ciegos. Aceptación y pruebas C siguen pendientes. ONW-013 queda como propuesta no bloqueante para esta instalación ya realizada.

## Bloqueos y siguiente acción

1. CI de 0.1.2 aprobada; siguiente puerta de aceptación es prueba real del puente en Vivaldi. No avanzar a instalación habitual sin validar.
2. ONW-004/005/006/007/008: con autorización y disponibilidad, instalar y ejecutar prueba única en instalación separada (catálogo, foco activo, apertura inactivo, origen intacto), según docs/INSTALL_WINDOWS.md. Si no funciona, recoger código de error y esquema/selector mínimo, corregir sin repetir investigación.
3. Base nativa pendiente de confirmación. Creación/personalización diferida ONW-011. No declarar MVP completo.

No se han tocado otros repositorios. La versión 0.1.2 declara solo storage; sin permisos de hosts. No se ha asignado una licencia. Se conserva la visibilidad pública observada.

## Plantilla de actualización de checkpoint

- Fecha, versión, rama y commit (si existe):
- Cambios realizados / archivos afectados:
- Comandos ejecutados y resultados:
- Entorno, pruebas manuales y evidencias:
- Estado remoto / CI / release:
- Bloqueos y decisiones pendientes:
- Próxima acción concreta:
