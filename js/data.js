// data.js — contenido del catálogo: categorías, productos e ilustraciones (sin lógica de render)

var EMBLEM = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21 L16 7 L26 21"/><path d="M16 7 L16 25"/></svg>';

// ILUSTRACIONES DE PRODUCTO
// Cada servicio tiene su propia escena ilustrada, no un ícono suelto. Sistema compartido:
//
//   · Dos capas: `bg` es el fondo degradado, que va a sangre por CSS y llena la tarjeta
//     sea cual sea su proporción; `art` es la escena en SVG, que se escala entera y
//     centrada (preserveAspectRatio="meet") para que ninguna proporción de tarjeta la
//     recorte ni la deforme. `vb` es el encuadre de la escena dentro del lienzo 160x120.
//   · Dentro de `art`: sujeto blanco/claro con sombra proyectada y un solo acento cálido
//     que dirige la mirada.
//   · Paleta por servicio dentro de la familia de marca (azul eléctrico ↔ naranja),
//     más fría en producto/dato y más cálida en cliente/dinero.
//   · Los ids de <defs> llevan prefijo propio porque todas conviven en el mismo documento.
var ILLUS = {

  // Página web — navegador con hero, versión móvil y cursor sobre el CTA
  web: {
    bg: 'radial-gradient(46% 54% at 88% 10%, rgba(255,255,255,.16), transparent 70%), radial-gradient(42% 48% at 6% 92%, rgba(8,22,60,.45), transparent 70%), linear-gradient(135deg,#0f2660 0%,#1f5fd0 55%,#42a5ff 100%)',
    vb: '18 22 128 78',
    art: `
      <defs>
        <linearGradient id="wbHero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f86ff"/><stop offset="1" stop-color="#8ac9ff"/></linearGradient>
        <filter id="wbSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#04102c" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#wbSh)">
        <rect x="22" y="26" width="88" height="66" rx="7" fill="#ffffff"/>
        <path d="M22 33a7 7 0 0 1 7-7h74a7 7 0 0 1 7 7v5H22z" fill="#e7eefb"/>
        <circle cx="30" cy="32" r="2" fill="#ff8a3d"/><circle cx="37" cy="32" r="2" fill="#ffc94d"/><circle cx="44" cy="32" r="2" fill="#4fd08a"/>
        <rect x="29" y="45" width="52" height="25" rx="4" fill="url(#wbHero)"/>
        <rect x="34" y="52" width="31" height="4" rx="2" fill="#ffffff" opacity=".95"/>
        <rect x="34" y="60" width="20" height="3.2" rx="1.6" fill="#ffffff" opacity=".72"/>
        <rect x="29" y="75" width="27" height="10" rx="5" fill="#ff7a1a"/>
        <rect x="86" y="45" width="18" height="18" rx="3.5" fill="#dbe6fa"/>
        <rect x="86" y="68" width="18" height="3.4" rx="1.7" fill="#c9d8f2"/>
        <rect x="86" y="76" width="12" height="3.4" rx="1.7" fill="#c9d8f2"/>
      </g>
      <g filter="url(#wbSh)">
        <rect x="112" y="46" width="30" height="52" rx="6.5" fill="#ffffff"/>
        <rect x="116" y="54" width="22" height="35" rx="3" fill="#eaf1fd"/>
        <rect x="119" y="58" width="16" height="10" rx="2.5" fill="#3a8dff"/>
        <rect x="119" y="72" width="16" height="2.8" rx="1.4" fill="#c9d8f2"/>
        <rect x="119" y="78" width="10" height="2.8" rx="1.4" fill="#c9d8f2"/>
        <rect x="122" y="92" width="10" height="2" rx="1" fill="#d7e2f5"/>
      </g>
      <path d="M49 80v14l3.6-3.8 2.7 5.2 3-1.5-2.7-5.1 5-.5z" fill="#0b1d3f" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round"/>`
  },

  // E-commerce — bolsa de compra, ficha de producto y etiqueta de precio
  ecommerce: {
    bg: 'radial-gradient(46% 52% at 14% 12%, rgba(255,255,255,.16), transparent 70%), radial-gradient(74% 42% at 50% 104%, rgba(11,20,80,.45), transparent 70%), linear-gradient(135deg,#16205e 0%,#2e4fc0 50%,#4f9bf5 100%)',
    vb: '12 30 132 68',
    art: `
      <defs>
        <linearGradient id="ecImg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f9bf5"/><stop offset="1" stop-color="#9fd0ff"/></linearGradient>
        <filter id="ecSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#060f3a" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#ecSh)">
        <path d="M52 53v-8a10 10 0 0 1 20 0v8" fill="none" stroke="#ffc78c" stroke-width="4.2" stroke-linecap="round"/>
        <path d="M38 52h48a5 5 0 0 1 5 5.5l-3 30.5a7 7 0 0 1-7 6.3H43a7 7 0 0 1-7-6.3l-3-30.5A5 5 0 0 1 38 52z" fill="#ffffff"/>
        <path d="M38 52h48a5 5 0 0 1 5 5.5l-.5 5.5h-57l-.5-5.5A5 5 0 0 1 38 52z" fill="#e8eefb"/>
        <circle cx="62" cy="76" r="10.5" fill="#ff7a1a"/>
        <path d="M57.4 76.4l3.2 3.2 5.4-6.4" stroke="#ffffff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g filter="url(#ecSh)">
        <rect x="98" y="32" width="44" height="56" rx="6" fill="#ffffff"/>
        <rect x="103" y="37" width="34" height="25" rx="4" fill="url(#ecImg)"/>
        <rect x="103" y="68" width="26" height="3.6" rx="1.8" fill="#ccd8f0"/>
        <rect x="103" y="75" width="16" height="3.6" rx="1.8" fill="#dfe7f6"/>
        <rect x="124" y="72" width="13" height="9" rx="4.5" fill="#1f5fd0"/>
      </g>
      <g filter="url(#ecSh)" transform="rotate(-14 30 74)">
        <path d="M18 64h20l8 8-8 8H18a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" fill="#ffd166"/>
        <circle cx="22.5" cy="72" r="2.6" fill="#8a4a00"/>
      </g>`
  },

  // Dashboard empresarial — panel con KPIs, barras y anillo de avance
  dashboard: {
    bg: 'radial-gradient(46% 52% at 92% 90%, rgba(255,255,255,.14), transparent 70%), radial-gradient(38% 44% at 8% 12%, rgba(124,208,255,.22), transparent 70%), linear-gradient(135deg,#04143a 0%,#12408f 55%,#2b7fe0 100%)',
    vb: '14 18 132 84',
    art: `
      <defs>
        <linearGradient id="dbBar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f7fe0"/><stop offset="1" stop-color="#7cd0ff"/></linearGradient>
        <filter id="dbSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="3.4" flood-color="#020a20" flood-opacity=".55"/></filter>
      </defs>
      <g filter="url(#dbSh)">
        <rect x="18" y="22" width="124" height="76" rx="9" fill="#0b1f47"/>
        <rect x="18.7" y="22.7" width="122.6" height="74.6" rx="8.3" fill="none" stroke="#ffffff" stroke-opacity=".16"/>
        <path d="M18 31a9 9 0 0 1 9-9h13v76H27a9 9 0 0 1-9-9z" fill="#081737"/>
        <circle cx="29" cy="33" r="3.4" fill="#ff8a3d"/>
        <rect x="24" y="44" width="11" height="3.4" rx="1.7" fill="#2f5ea8"/>
        <rect x="24" y="53" width="11" height="3.4" rx="1.7" fill="#1e4380"/>
        <rect x="24" y="62" width="11" height="3.4" rx="1.7" fill="#1e4380"/>
        <rect x="48" y="30" width="26" height="17" rx="3.5" fill="#12306a"/>
        <rect x="52" y="35" width="14" height="3.2" rx="1.6" fill="#7cd0ff"/>
        <rect x="52" y="41" width="9" height="2.6" rx="1.3" fill="#33538f"/>
        <rect x="78" y="30" width="26" height="17" rx="3.5" fill="#12306a"/>
        <rect x="82" y="35" width="14" height="3.2" rx="1.6" fill="#ffb066"/>
        <rect x="82" y="41" width="9" height="2.6" rx="1.3" fill="#33538f"/>
        <rect x="108" y="30" width="26" height="17" rx="3.5" fill="#12306a"/>
        <rect x="112" y="35" width="14" height="3.2" rx="1.6" fill="#6fe0a8"/>
        <rect x="112" y="41" width="9" height="2.6" rx="1.3" fill="#33538f"/>
        <rect x="48" y="86" width="86" height="1.6" rx="0.8" fill="#22447e"/>
        <rect x="50" y="70" width="9" height="16" rx="2.5" fill="url(#dbBar)"/>
        <rect x="63" y="62" width="9" height="24" rx="2.5" fill="url(#dbBar)"/>
        <rect x="76" y="68" width="9" height="18" rx="2.5" fill="url(#dbBar)"/>
        <rect x="89" y="55" width="9" height="31" rx="2.5" fill="#ff7a1a"/>
        <path d="M52 66l13-9 13 5 13-12" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="119" cy="70" r="13" fill="none" stroke="#1b3a72" stroke-width="6"/>
        <path d="M119 57a13 13 0 0 1 9.2 22.2" fill="none" stroke="#ff9433" stroke-width="6" stroke-linecap="round"/>
      </g>`
  },

  // Chatbot — conversación, avatar robot y destellos de IA
  chatbot: {
    bg: 'radial-gradient(46% 52% at 10% 16%, rgba(255,255,255,.20), transparent 70%), radial-gradient(46% 52% at 92% 92%, rgba(107,36,0,.42), transparent 70%), linear-gradient(135deg,#7a2c00 0%,#e0620a 50%,#ffab4d 100%)',
    vb: '2 14 142 86',
    art: `
      <defs>
        <linearGradient id="cbBub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a1a"/><stop offset="1" stop-color="#ffb066"/></linearGradient>
        <filter id="cbSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#3d1400" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#cbSh)">
        <rect x="38" y="24" width="88" height="72" rx="10" fill="#ffffff"/>
        <path d="M38 34a10 10 0 0 1 10-10h68a10 10 0 0 1 10 10v6H38z" fill="#fff0e2"/>
        <circle cx="49" cy="32" r="3.6" fill="#ff7a1a"/>
        <rect x="57" y="30" width="26" height="3.6" rx="1.8" fill="#e8c7ab"/>
        <rect x="46" y="48" width="42" height="15" rx="7.5" fill="#f1f0ee"/>
        <circle cx="55" cy="55.5" r="2" fill="#b9b2aa"/><circle cx="62" cy="55.5" r="2" fill="#b9b2aa"/><circle cx="69" cy="55.5" r="2" fill="#b9b2aa"/>
        <rect x="66" y="68" width="52" height="15" rx="7.5" fill="url(#cbBub)"/>
        <rect x="73" y="73" width="30" height="3.2" rx="1.6" fill="#ffffff" opacity=".9"/>
        <rect x="46" y="86" width="34" height="4" rx="2" fill="#efece8"/>
      </g>
      <g filter="url(#cbSh)">
        <path d="M22 44v-5" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="22" cy="37" r="2.4" fill="#ffffff"/>
        <rect x="6" y="44" width="32" height="28" rx="9" fill="#12306a"/>
        <circle cx="16" cy="57" r="3.4" fill="#7cd0ff"/><circle cx="28" cy="57" r="3.4" fill="#7cd0ff"/>
        <rect x="16" y="64" width="12" height="2.6" rx="1.3" fill="#ffffff" opacity=".55"/>
      </g>
      <path d="M132 32l2.2 5.6 5.8 2.2-5.8 2.2-2.2 5.6-2.2-5.6-5.8-2.2 5.8-2.2z" fill="#ffffff" opacity=".92"/>
      <path d="M118 18l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z" fill="#ffffff" opacity=".7"/>`
  },

  // CRM — tablero de oportunidades con ficha de contacto al frente
  crm: {
    bg: 'radial-gradient(46% 52% at 90% 12%, rgba(255,255,255,.20), transparent 70%), radial-gradient(74% 42% at 50% 104%, rgba(107,42,0,.40), transparent 70%), linear-gradient(135deg,#8f3a00 0%,#d4700e 50%,#ffc36b 100%)',
    vb: '26 18 108 86',
    art: `
      <defs>
        <filter id="crSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#431a00" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#crSh)">
        <rect x="30" y="22" width="100" height="66" rx="8" fill="#f7f2ea"/>
        <rect x="36" y="28" width="28" height="54" rx="5" fill="#ece5d9"/>
        <rect x="66" y="28" width="28" height="54" rx="5" fill="#ece5d9"/>
        <rect x="96" y="28" width="28" height="54" rx="5" fill="#ece5d9"/>
        <rect x="39" y="31" width="14" height="3" rx="1.5" fill="#d8b98f"/>
        <rect x="69" y="31" width="14" height="3" rx="1.5" fill="#d8b98f"/>
        <rect x="99" y="31" width="14" height="3" rx="1.5" fill="#d8b98f"/>
        <rect x="39" y="38" width="22" height="13" rx="3" fill="#ffffff"/><rect x="42" y="43" width="12" height="2.6" rx="1.3" fill="#cfc6ba"/>
        <rect x="39" y="54" width="22" height="13" rx="3" fill="#ffffff"/><rect x="42" y="59" width="9" height="2.6" rx="1.3" fill="#cfc6ba"/>
        <rect x="69" y="38" width="22" height="13" rx="3" fill="#ffffff"/><rect x="72" y="43" width="12" height="2.6" rx="1.3" fill="#cfc6ba"/>
        <rect x="99" y="38" width="22" height="13" rx="3" fill="#1f5fd0"/><rect x="102" y="43" width="12" height="2.6" rx="1.3" fill="#ffffff" opacity=".8"/>
        <rect x="99" y="54" width="22" height="13" rx="3" fill="#ffffff"/><rect x="102" y="59" width="9" height="2.6" rx="1.3" fill="#cfc6ba"/>
      </g>
      <g filter="url(#crSh)">
        <rect x="40" y="64" width="70" height="36" rx="7" fill="#ffffff"/>
        <path d="M40 71a7 7 0 0 1 7-7h3v36h-3a7 7 0 0 1-7-7z" fill="#ff7a1a"/>
        <circle cx="65" cy="82" r="10.5" fill="#ffe0c2"/>
        <circle cx="65" cy="78.4" r="3.8" fill="#ff7a1a"/>
        <path d="M58.4 88.8a7.2 7.2 0 0 1 13.2 0z" fill="#ff7a1a"/>
        <rect x="81" y="75" width="24" height="4" rx="2" fill="#3b3128"/>
        <rect x="81" y="84" width="16" height="3.4" rx="1.7" fill="#c9bfb2"/>
      </g>`
  },

  // Facturación automática — factura timbrada con sello de validación
  facturacion: {
    bg: 'radial-gradient(46% 52% at 12% 18%, rgba(255,255,255,.16), transparent 70%), radial-gradient(46% 52% at 92% 88%, rgba(7,27,69,.45), transparent 70%), linear-gradient(135deg,#0a2352 0%,#1a56c0 50%,#59a8ff 100%)',
    vb: '24 16 106 86',
    art: `
      <defs>
        <filter id="faSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#04102c" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#faSh)" transform="rotate(-9 62 60)">
        <rect x="34" y="26" width="52" height="68" rx="4" fill="#dbe6fa"/>
      </g>
      <g filter="url(#faSh)">
        <path d="M52 20h56v78l-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2-4 3.2-4-3.2z" fill="#ffffff"/>
        <rect x="60" y="28" width="22" height="4.4" rx="2.2" fill="#1f5fd0"/>
        <rect x="60" y="36" width="14" height="3" rx="1.5" fill="#c7d4ea"/>
        <rect x="60" y="47" width="40" height="2.8" rx="1.4" fill="#e2e8f2"/>
        <rect x="60" y="54" width="40" height="2.8" rx="1.4" fill="#e2e8f2"/>
        <rect x="60" y="61" width="28" height="2.8" rx="1.4" fill="#e2e8f2"/>
        <rect x="60" y="70" width="40" height="9" rx="2.5" fill="#eaf1fd"/>
        <rect x="64" y="73.5" width="12" height="2.6" rx="1.3" fill="#9fb4d4"/>
        <rect x="86" y="73.5" width="10" height="2.6" rx="1.3" fill="#1f5fd0"/>
      </g>
      <g filter="url(#faSh)">
        <circle cx="110" cy="80" r="16" fill="#0ea56d"/>
        <circle cx="110" cy="80" r="12.2" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.6" stroke-dasharray="3 3"/>
        <path d="M103.5 80.4l4.6 4.6 8.4-9.6" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <path d="M28 66h10M28 74h16M28 82h12" stroke="#ffffff" stroke-opacity=".35" stroke-width="2.6" stroke-linecap="round"/>`
  },

  // Pasarela de pagos — tarjetas, pago sin contacto y candado
  pasarela: {
    bg: 'radial-gradient(46% 52% at 90% 16%, rgba(255,255,255,.16), transparent 70%), radial-gradient(74% 44% at 50% 104%, rgba(10,20,80,.45), transparent 70%), linear-gradient(135deg,#0d1f5e 0%,#2549c8 50%,#4f9bf5 100%)',
    vb: '22 20 122 80',
    art: `
      <defs>
        <linearGradient id="paCard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe9fb"/></linearGradient>
        <filter id="paSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="3.2" flood-color="#050d33" flood-opacity=".48"/></filter>
      </defs>
      <g filter="url(#paSh)" transform="rotate(-12 66 52)">
        <rect x="30" y="28" width="72" height="46" rx="7" fill="#1f5fd0"/>
        <rect x="30" y="38" width="72" height="9" fill="#12306a"/>
        <rect x="38" y="56" width="20" height="4" rx="2" fill="#ffffff" opacity=".55"/>
      </g>
      <g filter="url(#paSh)">
        <rect x="42" y="46" width="80" height="50" rx="8" fill="url(#paCard)"/>
        <rect x="42" y="46" width="80" height="8" rx="8" fill="#ff7a1a" opacity=".18"/>
        <rect x="50" y="60" width="14" height="10" rx="2.6" fill="#ffc36b"/>
        <path d="M50 65h14M57 60v10" stroke="#c98a2a" stroke-width="1" opacity=".7"/>
        <rect x="50" y="80" width="30" height="4" rx="2" fill="#9fb4d4"/>
        <rect x="86" y="80" width="14" height="4" rx="2" fill="#c7d4ea"/>
        <path d="M96 60.5a9 9 0 0 1 0 12M103 57a14.5 14.5 0 0 1 0 19" fill="none" stroke="#1f5fd0" stroke-width="2.6" stroke-linecap="round"/>
      </g>
      <g filter="url(#paSh)">
        <circle cx="126" cy="80" r="14" fill="#0ea56d"/>
        <path d="M121 78v-3a5 5 0 0 1 10 0v3" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"/>
        <rect x="119.5" y="78" width="13" height="10" rx="2.5" fill="#ffffff"/>
        <circle cx="126" cy="83" r="1.8" fill="#0ea56d"/>
      </g>`
  },

  // Módulos e integraciones — pieza nueva que encaja en un sistema ya armado
  modulos: {
    bg: 'radial-gradient(46% 52% at 12% 14%, rgba(255,255,255,.18), transparent 70%), radial-gradient(46% 52% at 92% 94%, rgba(92,38,0,.40), transparent 70%), linear-gradient(135deg,#7a3800 0%,#cf6c0c 50%,#ffb85e 100%)',
    vb: '24 14 116 84',
    art: `
      <defs>
        <linearGradient id="moNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7fe0"/><stop offset="1" stop-color="#7cd0ff"/></linearGradient>
        <filter id="moSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#3d1a00" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#moSh)">
        <rect x="28" y="62" width="32" height="32" rx="6" fill="#ffffff"/>
        <rect x="35" y="71" width="18" height="3.4" rx="1.7" fill="#d9cfc2"/>
        <rect x="35" y="79" width="12" height="3.4" rx="1.7" fill="#e6ded3"/>
        <rect x="64" y="62" width="32" height="32" rx="6" fill="#ffffff"/>
        <rect x="71" y="71" width="18" height="3.4" rx="1.7" fill="#d9cfc2"/>
        <rect x="71" y="79" width="12" height="3.4" rx="1.7" fill="#e6ded3"/>
        <rect x="100" y="62" width="32" height="32" rx="6" fill="#ffffff"/>
        <rect x="107" y="71" width="18" height="3.4" rx="1.7" fill="#d9cfc2"/>
        <rect x="107" y="79" width="12" height="3.4" rx="1.7" fill="#e6ded3"/>
      </g>
      <rect x="64" y="26" width="32" height="32" rx="6" fill="#000000" fill-opacity=".14" stroke="#ffffff" stroke-width="2.4" stroke-dasharray="5 4" stroke-opacity=".9"/>
      <path d="M80 58v4M46 62v-4M114 62v-4" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".75"/>
      <g filter="url(#moSh)" transform="rotate(-10 118 34)">
        <rect x="102" y="18" width="32" height="32" rx="6" fill="url(#moNew)"/>
        <path d="M118 27v14M111 34h14" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round"/>
      </g>
      <path d="M99 40q-6 4-11 4" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="2.2" stroke-dasharray="4 4" stroke-linecap="round"/>
      <circle cx="62" cy="78" r="3" fill="#ffffff"/>
      <circle cx="98" cy="78" r="3" fill="#ffffff"/>`
  },

  // Scraper — página fuente convertida en tabla estructurada, con lupa
  scraper: {
    bg: 'radial-gradient(46% 52% at 92% 14%, rgba(255,255,255,.16), transparent 70%), radial-gradient(74% 42% at 50% 104%, rgba(85,35,0,.40), transparent 70%), linear-gradient(135deg,#6e3300 0%,#c9660c 50%,#ffab4d 100%)',
    vb: '10 22 142 76',
    art: `
      <defs>
        <filter id="scSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#3a1600" flood-opacity=".45"/></filter>
      </defs>
      <g filter="url(#scSh)">
        <rect x="14" y="26" width="54" height="68" rx="6" fill="#ffffff" opacity=".9"/>
        <rect x="14" y="26" width="54" height="10" rx="6" fill="#efe6da"/>
        <rect x="20" y="42" width="30" height="3.4" rx="1.7" fill="#d9cfc2"/>
        <rect x="20" y="51" width="42" height="3.4" rx="1.7" fill="#e8e0d5"/>
        <rect x="20" y="60" width="36" height="3.4" rx="1.7" fill="#e8e0d5"/>
        <rect x="20" y="69" width="42" height="3.4" rx="1.7" fill="#e8e0d5"/>
        <rect x="20" y="78" width="24" height="3.4" rx="1.7" fill="#e8e0d5"/>
      </g>
      <path d="M72 60h14m0 0-5-5m5 5-5 5" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <g filter="url(#scSh)">
        <rect x="94" y="26" width="54" height="68" rx="6" fill="#12306a"/>
        <rect x="94" y="26" width="54" height="12" rx="6" fill="#1f5fd0"/>
        <rect x="100" y="30" width="16" height="3.4" rx="1.7" fill="#ffffff" opacity=".85"/>
        <rect x="100" y="46" width="18" height="3.4" rx="1.7" fill="#7cd0ff"/><rect x="124" y="46" width="18" height="3.4" rx="1.7" fill="#7cd0ff"/>
        <rect x="100" y="57" width="18" height="3.4" rx="1.7" fill="#39598f"/><rect x="124" y="57" width="18" height="3.4" rx="1.7" fill="#39598f"/>
        <rect x="100" y="68" width="18" height="3.4" rx="1.7" fill="#39598f"/><rect x="124" y="68" width="18" height="3.4" rx="1.7" fill="#39598f"/>
        <rect x="100" y="79" width="18" height="3.4" rx="1.7" fill="#39598f"/><rect x="124" y="79" width="18" height="3.4" rx="1.7" fill="#39598f"/>
        <path d="M121 42v46" stroke="#39598f" stroke-width="1.4"/>
      </g>
      <g filter="url(#scSh)">
        <circle cx="52" cy="72" r="15" fill="#ffffff" fill-opacity=".22" stroke="#ffffff" stroke-width="4"/>
        <path d="M63 83l9 9" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      </g>`
  },

  // Conexión con sistemas externos — servidor y nube unidos por un nodo API
  conexion: {
    bg: 'radial-gradient(46% 52% at 14% 12%, rgba(255,255,255,.16), transparent 70%), radial-gradient(46% 52% at 90% 94%, rgba(74,30,0,.40), transparent 70%), linear-gradient(135deg,#5f2c05 0%,#c2620f 50%,#ffb054 100%)',
    vb: '12 28 138 74',
    art: `
      <defs>
        <filter id="cxSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#361500" flood-opacity=".45"/></filter>
      </defs>
      <path d="M40 62q40-34 80 0" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="2.4" stroke-dasharray="6 5" stroke-linecap="round"/>
      <g filter="url(#cxSh)">
        <rect x="16" y="42" width="40" height="16" rx="4" fill="#ffffff"/>
        <rect x="16" y="62" width="40" height="16" rx="4" fill="#ffffff"/>
        <rect x="16" y="82" width="40" height="16" rx="4" fill="#f0e8dd"/>
        <circle cx="24" cy="50" r="3" fill="#0ea56d"/><rect x="31" y="48.4" width="17" height="3.2" rx="1.6" fill="#d9cfc2"/>
        <circle cx="24" cy="70" r="3" fill="#ff7a1a"/><rect x="31" y="68.4" width="17" height="3.2" rx="1.6" fill="#d9cfc2"/>
        <circle cx="24" cy="90" r="3" fill="#9fb4d4"/><rect x="31" y="88.4" width="12" height="3.2" rx="1.6" fill="#ded5c9"/>
      </g>
      <g filter="url(#cxSh)">
        <path d="M116 46a15 15 0 0 1 28.6 4.4A11 11 0 0 1 142 72h-30a13 13 0 0 1-1.6-25.9A15 15 0 0 1 116 46z" fill="#ffffff"/>
        <rect x="116" y="56" width="22" height="3.2" rx="1.6" fill="#d9cfc2"/>
        <rect x="116" y="63" width="14" height="3.2" rx="1.6" fill="#e8e0d5"/>
      </g>
      <g filter="url(#cxSh)">
        <path d="M80 44l16 9.5v19L80 82l-16-9.5v-19z" fill="#12306a"/>
        <path d="M80 44l16 9.5v19L80 82l-16-9.5v-19z" fill="none" stroke="#7cd0ff" stroke-width="1.6" stroke-opacity=".6"/>
        <path d="M72 58h4.5l2.5 10 3-14 2.5 8H88" fill="none" stroke="#7cd0ff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <circle cx="60" cy="52" r="3.2" fill="#ffffff"/>
      <circle cx="100" cy="52" r="3.2" fill="#ffffff"/>`
  },

  // Automatización de procesos — flujo de nodos que corre solo, engrane y rayo
  automatizacion: {
    bg: 'radial-gradient(40% 48% at 8% 94%, rgba(74,32,0,.38), transparent 70%), linear-gradient(135deg,#78390a 0%,#d8780f 50%,#ffc073 100%)',
    vb: '12 14 138 80',
    art: `
      <defs>
        <filter id="auSh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#3d1c00" flood-opacity=".45"/></filter>
      </defs>
      <g opacity=".18" fill="#ffffff">
        <path d="M112 26l4.6 1.2 3.4-3.4 3.4 3.4 4.6-1.2 1.2 4.6 3.4 3.4-3.4 3.4-1.2 4.6-4.6-1.2-3.4 3.4-3.4-3.4-4.6 1.2-1.2-4.6-3.4-3.4 3.4-3.4z"/>
        <circle cx="120" cy="34" r="5" fill="#c2620f"/>
      </g>
      <path d="M52 44h34a10 10 0 0 1 10 10v14a10 10 0 0 0 10 10h6" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <g filter="url(#auSh)">
        <rect x="16" y="32" width="42" height="24" rx="6" fill="#ffffff"/>
        <circle cx="27" cy="44" r="5" fill="#ff7a1a"/>
        <path d="M25.2 41.4l4.4 2.6-4.4 2.6z" fill="#ffffff"/>
        <rect x="36" y="42.4" width="16" height="3.2" rx="1.6" fill="#d9cfc2"/>
      </g>
      <g filter="url(#auSh)">
        <rect x="58" y="60" width="42" height="24" rx="6" fill="#ffffff"/>
        <rect x="66" y="66" width="26" height="3.4" rx="1.7" fill="#d9cfc2"/>
        <rect x="66" y="74" width="16" height="3.4" rx="1.7" fill="#e8e0d5"/>
        <path d="M60 60h6v24h-6z" fill="#2f7fe0" opacity=".9"/>
      </g>
      <g filter="url(#auSh)">
        <rect x="106" y="66" width="40" height="24" rx="6" fill="#0ea56d"/>
        <path d="M118 78.4l4 4 8-9" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <path d="M88 18l-12 18h9l-4 14 13-19h-9z" fill="#ffffff" opacity=".92"/>`
  },
};

var CATS = [
  {key:'digital',  tab:'t1', label:'Presencia Digital'},
  {key:'relacion', tab:'t2', label:'Relación con Clientes'},
  {key:'finanzas', tab:'t3', label:'Finanzas y Pagos'},
  {key:'datos',    tab:'t4', label:'Integración y Datos'}
];

var PRODUCTS = [
  {cat:'digital', icon:'web', name:'Página web', desc:'Sitio responsivo, rápido y optimizado para posicionar tu marca y convertir visitas en clientes.', price:'Desde $11,500 MXN'},
  {cat:'digital', icon:'ecommerce', name:'E-commerce', desc:'Tienda en línea completa con catálogo, carrito, pagos e inventario listos para vender.', price:'Desde $32,000 MXN'},
  {cat:'digital', icon:'dashboard', name:'Dashboard empresarial', desc:'Visualiza ventas, operación y KPIs en tiempo real con reportes que se actualizan solos.', price:'Desde $8,900 MXN/mes'},

  {cat:'relacion', icon:'chatbot', name:'Chatbot', desc:'Asistente virtual con IA para atender consultas 24/7 en tu web, WhatsApp o redes sociales.', price:'Desde $5,200 MXN/mes'},
  {cat:'relacion', icon:'crm', name:'CRM', desc:'Gestiona clientes, oportunidades y seguimiento de ventas en un solo lugar, a la medida de tu equipo.', price:'Desde $7,800 MXN/mes'},

  {cat:'finanzas', icon:'facturacion', name:'Facturación automática', desc:'Genera y timbra facturas al cerrar cada venta, sin captura manual ni errores de dedo.', price:'Desde $3,500 MXN/mes'},
  {cat:'finanzas', icon:'pasarela', name:'Pasarela de pagos', desc:'Acepta tarjetas, transferencias y pagos digitales de forma segura dentro de tu propia plataforma.', price:'Desde $4,500 MXN + 2.5%'},

  {cat:'datos', icon:'modulos', name:'Módulos e integraciones', desc:'Añade funciones a tu sistema actual: reportes, permisos, notificaciones y más, sin rehacer nada.', price:'Desde $6,300 MXN/módulo'},
  {cat:'datos', icon:'scraper', name:'Scraper', desc:'Extrae y organiza datos de otros sitios o sistemas de forma automática y programada.', price:'Desde $5,800 MXN/proyecto'},
  {cat:'datos', icon:'conexion', name:'Conexión con sistemas externos', desc:'Conecta tu software con otras plataformas — ERP, bancos, marketplaces — vía API.', price:'Desde $10,900 MXN/proyecto'},
  {cat:'datos', icon:'automatizacion', name:'Automatización de procesos', desc:'Elimina tareas repetitivas: flujos que se ejecutan solos entre tus sistemas y equipos.', price:'Desde $6,900 MXN/proceso'}
];

function productsFor(catKey){ return PRODUCTS.filter(function(p){ return p.cat === catKey; }); }
function pad(n){ return (n < 10 ? '0' : '') + n; }
