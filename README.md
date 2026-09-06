# Catálogo Altus

Catálogo de servicios de software con estética de cuadernillo físico: portada y contraportada de una sola hoja, páginas interiores en libro abierto (o en pantalla completa una por una en móvil), con una animación real de "pasar hoja".

## Estado actual

### Estructura del proyecto

```
catalogo_software/
├── index.html          Estructura de la página, carga estilos y scripts
├── css/
│   ├── styles.css      Tokens de diseño, tipografía, tarjetas, portada, índice, etc.
│   └── demos.css       El diálogo de la maqueta y el kit de interfaz que comparten
└── js/
    ├── data.js          Categorías, productos e ilustraciones (contenido puro)
    ├── render.js         Arma el HTML de cada página a partir de data.js
    ├── demos.js          Las 11 maquetas interactivas (marcado + comportamiento)
    └── app.js            Inicializa StPageFlip, conecta botones/índice/teclado y abre las maquetas
```

No hay build ni dependencias que instalar: son archivos estáticos. Para verlo, abre `index.html` directamente en el navegador (doble clic), o sírvelo con un servidor local si prefieres (por ejemplo `npx serve` desde esta carpeta).

### Contenido del catálogo

7 hojas / 6 páginas de libro (portada y contraportada son hojas únicas; el resto forma aperturas de dos páginas):

1. **Portada** — marca Altus, hoja única alineada a la derecha.
2. **Índice** — lista las 4 categorías con conteo de servicios y enlace directo a cada una.
3. **Presencia Digital** (3 servicios) — Página web, E-commerce, Dashboard empresarial.
4. **Relación con Clientes + Finanzas y Pagos** (4 servicios, comparten una hoja) — Chatbot, CRM, Facturación automática, Pasarela de pagos.
5. **Integración y Datos** (4 servicios) — Módulos e integraciones, Scraper, Conexión con sistemas externos, Automatización de procesos.
6. **Contraportada** — hoja única alineada a la izquierda.

Cada servicio muestra: ilustración propia, nombre, descripción y precio de referencia en pesos mexicanos (MXN, editables en `data.js`).

### Sistema de ilustración

Cada uno de los 11 servicios tiene su **escena ilustrada propia** (no un ícono genérico): una mini-maqueta del producto — el navegador con su hero para Página web, el panel de KPIs para Dashboard, la factura timbrada con su sello para Facturación, etc.

Cada ilustración vive en `ILLUS` (`js/data.js`) y tiene tres partes:

- `bg` — el fondo degradado, que se aplica **por CSS** y va a sangre: llena la tarjeta sea cual sea su proporción.
- `art` — la escena en SVG, que se dibuja **encima** y se escala entera y centrada (`preserveAspectRatio="xMidYMid meet"`).
- `vb` — el encuadre (`viewBox`) de la escena dentro del lienzo 160×120.

La separación en dos capas es lo que hace que funcione: la misma ilustración aparece en tarjetas de proporciones muy distintas (banda ancha 20:9 en las verticales, banda lateral alta en las horizontales, y otra vez distinta en móvil), y en ninguna se recorta ni se deforma — solo cambia cuánto fondo se ve alrededor.

Convenciones dentro de `art`: sujeto en blanco/claro con sombra proyectada, un solo acento cálido que dirige la mirada, y paleta por servicio dentro de la familia de marca (azul eléctrico ↔ naranja), más fría en categorías de producto/dato y más cálida en cliente/dinero. Los `id` de `<defs>` llevan prefijo propio porque todas las ilustraciones conviven en el mismo documento.

### Maquetas interactivas

Cada tarjeta del catálogo es un botón: al pulsarla se abre una **simulación jugable** de ese servicio, no una captura de pantalla. Todas usan datos inventados y no salen a la red.

| Servicio | Qué se puede hacer |
|---|---|
| Página web | Cambiar el ancho (escritorio/tablet/móvil) y ver el sitio reacomodarse, encender y apagar secciones, cambiar el color de marca |
| E-commerce | Agregar al carrito, ajustar cantidades, ver el envío volverse gratis al pasar $999 y cerrar el pedido |
| Dashboard | Cambiar de periodo y sucursal; los KPIs, la serie y el ranking se recalculan |
| Chatbot | Preguntar por escrito o con sugerencias; responde por intención y escala a una persona si se le pide |
| CRM | Avanzar y retroceder oportunidades de etapa; los totales por columna se actualizan |
| Facturación | Timbrar una venta o todas; se generan folio y UUID y cambia el estado |
| Pasarela de pagos | Capturar tarjeta con validación y formato en vivo; aprueba o rechaza (los números terminados en 0 se rechazan) |
| Módulos | Encender módulos y ver la cotización; las dependencias se activan y desactivan solas |
| Scraper | Elegir fuente y campos, ejecutar la corrida viendo llegar las filas y ver el CSV de salida |
| Conexión | Emparejar campos entre ERP y tienda y correr la prueba, que avisa si falta algún campo obligatorio |
| Automatización | Encender/apagar pasos y ejecutar el flujo, que corre en secuencia y omite lo apagado |

Cómo está armado:

- `DEMOS` (`js/demos.js`) guarda cada maqueta como `{ html, init }`. `init` recibe la raíz ya insertada y engancha el comportamiento; al cerrar el diálogo se vacía el contenedor y los listeners se van con los nodos.
- El diálogo es un `<dialog>` nativo (`js/app.js`), así que Esc y el foco atrapado funcionan sin código propio.
- El kit `.d-*` de `css/demos.css` (barras, chips, tablas, campos, badges, registro) es lo que hace que las once se vean de la misma familia sin repetir estilos.
- Las maquetas que tardan (timbrar, cobrar, ejecutar un flujo) usan una pausa que se vuelve instantánea con "reducir movimiento", y comprueban `isConnected` antes de seguir, para no escribir en nodos de un diálogo ya cerrado.

### Funcionalidad implementada

- **Animación de pasar hoja real**, con [StPageFlip](https://nodlik.github.io/StPageFlip/) (cargada por CDN desde jsDelivr) — arrastre con mouse/dedo, clic en la esquina, o botones "Anterior/Siguiente".
- **Responsive automático**: la librería decide sola si mostrar el libro abierto (pantallas anchas) o una sola hoja a pantalla completa (pantallas angostas), sin media queries manuales.
- **Portada y contraportada como hojas únicas** (la portada a la derecha, la contraportada a la izquierda) — es el comportamiento nativo de la librería con `showCover:true`, no un ajuste manual.
- **Índice navegable**: cada categoría enlaza directo a su página.
- **Tema claro/oscuro**: toda la paleta (fondo, tarjetas, portada) se adapta a `prefers-color-scheme`, con texto de encabezado/controles en tokens propios (`--stage-ink`) para que siempre contraste bien contra el fondo del escenario (fuera del libro).
- **Paleta azul-naranja eléctrico** en portada/contraportada y acentos de categoría.
- **Accesibilidad de movimiento**: si el sistema tiene activado "reducir movimiento", la animación se vuelve casi instantánea en vez de desactivarse sin aviso.

### Cómo editar el contenido

- **Agregar/editar un servicio**: en `js/data.js`, arreglo `PRODUCTS` (categoría, ícono, nombre, descripción, precio).
- **Agregar una ilustración nueva**: en `js/data.js`, objeto `ILLUS`, con las tres claves `bg` / `vb` / `art` descritas arriba. Dibuja `art` sobre el lienzo 160×120 y ajusta `vb` a la caja real de la escena.
- **Cambiar cómo se agrupan las páginas**: en `js/render.js`, arreglo `PAGES`.
- **Cambiar colores/tipografía**: en `css/styles.css`, bloque `:root` (y su espejo en modo oscuro).
- **Editar una maqueta**: en `js/demos.js`, la entrada del servicio. Los datos de ejemplo están arriba de cada maqueta (`PROD`, `SERIES`, `GUION`, `MODS`, `FUENTES`…) para poder cambiarlos sin tocar el comportamiento.

## Historial reciente (arreglos ya aplicados)

- Se dividió el catálogo de un solo archivo HTML a esta estructura de carpetas.
- Se reemplazó la animación de "pasar hoja" hecha a mano (CSS + rotateY) por StPageFlip, verificando su API directamente desde el código fuente del paquete antes de integrarla.
- Se corrigió que el libro se veía como una sola hoja incluso en pantalla grande (el contenedor no tenía ancho propio en CSS).
- Se corrigió el contraste del encabezado ("Altus — Catálogo de Servicios") y de los controles "Anterior/Siguiente", invisibles sobre fondo oscuro.
- Se quitaron las pestañas laterales de categoría (no se veían bien y quedaban redundantes con el índice).
- Se redujo la duración de la animación de pasar hoja para que se sienta más ágil.
- Se reemplazaron los íconos genéricos a dos tonos por las 11 escenas ilustradas actuales, y con ellas el sistema de dos capas (fondo CSS a sangre + escena SVG que siempre cabe entera). El primer intento usaba una sola capa recortada con `slice`, que mutilaba las escenas en las tarjetas de proporción extrema.
- Se arregló que en una sola hoja (móvil) las descripciones se cortaran a media línea y el precio se saliera de la tarjeta. Eran dos causas: `-webkit-line-clamp` no surtía efecto porque `flex:1` estiraba la descripción por encima del alto del recorte, y las reglas `.cards.nN` tenían más especificidad que los ajustes de `body.is-portrait`.
- Se agregaron las 11 maquetas interactivas. Detalles que costaron y conviene no volver a romper:
  - Las tarjetas viven dentro de las hojas que StPageFlip arrastra, así que **presionarlas empezaba a voltear la página** en vez de abrir la maqueta. Se resuelve con `stopPropagation` en `mousedown`/`touchstart`/`pointerdown` de la tarjeta, no solo en el `click`.
  - La ilustración se pinta dos veces (tarjeta y cabecera del diálogo), así que los `id` de sus `<defs>` quedaban duplicados; al insertarla en el diálogo se les pone prefijo.
  - La gráfica del dashboard se dibujaba con un `viewBox` fijo y `preserveAspectRatio="none"`, y al estirarse ovalaba los puntos. Ahora el `viewBox` se ajusta al tamaño real medido del `<svg>` y se redibuja al cambiar de tamaño.

## Pendiente / próximos pasos

- **Validar los precios** en MXN con el negocio antes de publicar (ver limitaciones).
- Las maquetas usan un negocio de ejemplo (Cafetería Altura). Si el catálogo se va a mandar a un cliente concreto, vale la pena cambiar los datos de ejemplo por algo de su giro.

## Limitaciones conocidas

- El proyecto no puede publicarse como Artifact de Claude (ese formato exige un solo HTML autocontenido); al ser varios archivos con rutas relativas, se comparte y revisa como archivos locales.
- Los precios en MXN son de referencia (puestos por Claude, no confirmados por el negocio) — deben validarse antes de publicar el catálogo real.
- La revisión visual se hace renderizando el catálogo con Chrome en modo headless (`chrome.exe --headless=new --screenshot=... --allow-file-access-from-files file:///.../index.html`). Para capturar una página interior sin que la animación de pasar hoja salga a medias, añade `--force-prefers-reduced-motion` (vuelve el volteo instantáneo).
- **Cuidado al revisar tamaños de móvil en headless**: `--window-size=430,932` no da un viewport CSS de 430px (Chrome renderiza a un ancho mayor y guarda la imagen al tamaño pedido), así que la captura sale recortada por la derecha y *parece* que la página se desborda. Para medir de verdad, carga `index.html` dentro de un `<iframe width="390" height="844">` en una ventana grande: el iframe sí es un viewport real.
#   a l t u s _ c a t - l o g o  
 