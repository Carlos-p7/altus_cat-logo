// demos.js — maqueta interactiva de cada servicio.
//
// Al abrir una tarjeta del catálogo se muestra una simulación jugable de esa función:
// el chatbot responde, la facturación timbra, la pasarela aprueba o declina. Todo con
// datos inventados y sin red — es una demostración, no el producto conectado.
//
// Cada entrada de DEMOS tiene:
//   html  — el marcado de la maqueta (usa el kit .d-* de css/demos.css)
//   init  — recibe la raíz ya insertada en el DOM y engancha el comportamiento
// Los listeners viven en los nodos de la maqueta, así que al cerrar el diálogo se vacía
// el contenedor y se van con él; no hace falta desmontar nada a mano.

var DEMOS = (function () {
  'use strict';

  function $(r, s) { return r.querySelector(s); }
  function $$(r, s) { return Array.prototype.slice.call(r.querySelectorAll(s)); }

  var nf = new Intl.NumberFormat('es-MX');
  function mxn(n) { return '$' + nf.format(Math.round(n)); }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // las maquetas que "tardan" (timbrar, cobrar, ejecutar un flujo) usan esta pausa;
  // con movimiento reducido se vuelve instantánea en vez de desaparecer la simulación.
  function wait(ms) { return new Promise(function (r) { setTimeout(r, reduce ? 0 : ms); }); }
  function vivo(root) { return root.isConnected; }

  // delegación: las filas y tarjetas se vuelven a pintar, así que los listeners van arriba
  function on(root, sel, ev, fn) {
    root.addEventListener(ev, function (e) {
      var t = e.target.closest(sel);
      if (t && root.contains(t)) fn(e, t);
    });
  }
  function grupo(root, sel, fn) {
    on(root, sel, 'click', function (e, b) {
      $$(root, sel).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      fn(b);
    });
  }

  /* =====================================================================
     1. Página web — vista previa que se reacomoda y secciones conmutables
     ===================================================================== */
  var web = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Vista previa — Cafetería Altura</span>
          <div class="d-seg" role="group" aria-label="Ancho de pantalla">
            <button class="d-chip" data-dev="desk" aria-pressed="true">Escritorio</button>
            <button class="d-chip" data-dev="tab" aria-pressed="false">Tablet</button>
            <button class="d-chip" data-dev="mob" aria-pressed="false">Móvil</button>
          </div>
        </div>
        <div class="d-split">
          <aside class="d-side">
            <p class="d-side-h">Secciones</p>
            <label class="d-switch"><input type="checkbox" data-sec="hero" checked>Portada</label>
            <label class="d-switch"><input type="checkbox" data-sec="serv" checked>Productos</label>
            <label class="d-switch"><input type="checkbox" data-sec="gal" checked>Galería</label>
            <label class="d-switch"><input type="checkbox" data-sec="test">Testimonios</label>
            <label class="d-switch"><input type="checkbox" data-sec="cta" checked>Contacto</label>
            <p class="d-side-h">Color de marca</p>
            <div class="w-swatches" role="group" aria-label="Color de marca">
              <button data-brand="#1f5fd0" style="--s:#1f5fd0" aria-pressed="true" aria-label="Azul"></button>
              <button data-brand="#ff7a1a" style="--s:#ff7a1a" aria-pressed="false" aria-label="Naranja"></button>
              <button data-brand="#0e9c68" style="--s:#0e9c68" aria-pressed="false" aria-label="Verde"></button>
              <button data-brand="#7b3fe4" style="--s:#7b3fe4" aria-pressed="false" aria-label="Morado"></button>
            </div>
          </aside>
          <div class="d-main">
            <div class="w-frame" data-dev="desk">
              <div class="w-site">
                <header class="w-nav">
                  <span class="w-logo">Altura</span>
                  <span class="w-links"><i></i><i></i><i></i></span>
                  <span class="w-cta">Reservar</span>
                </header>
                <section class="w-sec" data-sec="hero">
                  <h3>Café de altura, tostado aquí</h3>
                  <p>Grano de Veracruz y Chiapas, tostado cada semana en nuestra sucursal.</p>
                  <span class="w-cta">Ver el menú</span>
                </section>
                <section class="w-sec" data-sec="serv">
                  <div class="w-grid3">
                    <div class="w-tile"><i></i><b>Espresso</b><span>Desde $45</span></div>
                    <div class="w-tile"><i></i><b>Métodos</b><span>Desde $60</span></div>
                    <div class="w-tile"><i></i><b>Grano</b><span>Desde $190</span></div>
                  </div>
                </section>
                <section class="w-sec" data-sec="gal">
                  <div class="w-gal"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                </section>
                <section class="w-sec" data-sec="test" hidden>
                  <blockquote>"El mejor filtrado de la colonia, y ya llevamos tres años viniendo."</blockquote>
                  <span class="w-who">— Marisol R.</span>
                </section>
                <section class="w-sec" data-sec="cta">
                  <div class="w-form"><span class="w-inp"></span><span class="w-inp"></span><span class="w-cta">Enviar</span></div>
                </section>
                <footer class="w-foot"></footer>
              </div>
            </div>
            <p class="d-note" style="margin-top:9px">Ancho simulado: <b data-w>1280 px</b> — el mismo contenido se reacomoda solo, sin una versión aparte para móvil.</p>
          </div>
        </div>
      </div>`,
    init: function (root) {
      var frame = $(root, '.w-frame');
      var anchos = { desk: '1280 px', tab: '834 px', mob: '390 px' };
      grupo(root, '[data-dev]', function (b) {
        var d = b.getAttribute('data-dev');
        frame.setAttribute('data-dev', d);
        $(root, '[data-w]').textContent = anchos[d];
      });
      grupo(root, '[data-brand]', function (b) {
        frame.style.setProperty('--brand', b.getAttribute('data-brand'));
      });
      on(root, '[data-sec]', 'change', function (e, inp) {
        if (inp.tagName !== 'INPUT') return;
        $(root, '.w-site [data-sec="' + inp.getAttribute('data-sec') + '"]').hidden = !inp.checked;
      });
    }
  };

  /* =====================================================================
     2. E-commerce — catálogo, carrito con cantidades y cierre de pedido
     ===================================================================== */
  var PROD = [
    { id: 'p1', n: 'Sudadera Altura', p: 890, c: 'linear-gradient(135deg,#1f5fd0,#7cd0ff)' },
    { id: 'p2', n: 'Termo 500 ml', p: 420, c: 'linear-gradient(135deg,#0e9c68,#8fe3bf)' },
    { id: 'p3', n: 'Café en grano 1 kg', p: 390, c: 'linear-gradient(135deg,#8a4a00,#ffb85e)' },
    { id: 'p4', n: 'Prensa francesa', p: 640, c: 'linear-gradient(135deg,#2e4fc0,#9fd0ff)' },
    { id: 'p5', n: 'Taza de cerámica', p: 260, c: 'linear-gradient(135deg,#c9660c,#ffc073)' },
    { id: 'p6', n: 'Molino manual', p: 1250, c: 'linear-gradient(135deg,#16205e,#4f9bf5)' }
  ];
  var ecommerce = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Tienda Altura</span>
          <span class="d-badge info" data-envio>Envío gratis desde $999</span>
          <button class="d-btn" data-open-cart>Carrito · <b data-count>0</b></button>
        </div>
        <div class="d-split">
          <div class="d-main">
            <div class="e-grid">` +
              PROD.map(function (p) {
                return `<article class="e-card">
                  <div class="e-img" style="background:${p.c}"></div>
                  <b class="e-name">${p.n}</b>
                  <span class="e-price">${mxn(p.p)}</span>
                  <button class="d-btn primary sm" data-add="${p.id}">Agregar</button>
                </article>`;
              }).join('') + `
            </div>
          </div>
          <aside class="d-side e-cart">
            <p class="d-side-h">Tu pedido</p>
            <div data-cart></div>
          </aside>
        </div>
      </div>`,
    init: function (root) {
      var carrito = {};
      var cajaCarrito = $(root, '[data-cart]');

      function lineas() {
        return Object.keys(carrito).map(function (id) {
          var p = PROD.filter(function (x) { return x.id === id; })[0];
          return { p: p, q: carrito[id] };
        });
      }
      function pinta() {
        var ls = lineas();
        var n = ls.reduce(function (a, l) { return a + l.q; }, 0);
        $(root, '[data-count]').textContent = n;
        if (!ls.length) {
          cajaCarrito.innerHTML = '<p class="d-empty">Aún no agregas nada.<br>Elige un producto del catálogo.</p>';
          return;
        }
        var sub = ls.reduce(function (a, l) { return a + l.p.p * l.q; }, 0);
        var envio = sub >= 999 ? 0 : 149;
        cajaCarrito.innerHTML =
          ls.map(function (l) {
            return `<div class="e-line">
              <span class="e-line-n">${l.p.n}</span>
              <span class="e-qty">
                <button class="d-btn sm" data-less="${l.p.id}" aria-label="Quitar uno">−</button>
                <b>${l.q}</b>
                <button class="d-btn sm" data-add="${l.p.id}" aria-label="Agregar uno">+</button>
              </span>
              <span class="e-line-p">${mxn(l.p.p * l.q)}</span>
            </div>`;
          }).join('') +
          `<div class="e-sum">
            <span>Subtotal</span><b>${mxn(sub)}</b>
            <span>Envío</span><b>${envio ? mxn(envio) : 'Gratis'}</b>
            <span class="tot">Total</span><b class="tot">${mxn(sub + envio)}</b>
          </div>
          <button class="d-btn primary" style="width:100%;margin-top:9px" data-pay>Pagar pedido</button>`;
      }

      on(root, '[data-add]', 'click', function (e, b) {
        var id = b.getAttribute('data-add');
        carrito[id] = (carrito[id] || 0) + 1;
        pinta();
      });
      on(root, '[data-less]', 'click', function (e, b) {
        var id = b.getAttribute('data-less');
        carrito[id] -= 1;
        if (carrito[id] <= 0) delete carrito[id];
        pinta();
      });
      on(root, '[data-pay]', 'click', function () {
        var folio = 'ALT-' + (1000 + Math.floor(Math.random() * 8999));
        cajaCarrito.innerHTML = `<div class="e-done">
            <span class="d-badge ok">Pedido confirmado</span>
            <p class="d-note" style="margin-top:8px">Folio <b>${folio}</b>. Enviamos el correo de confirmación y la guía en cuanto salga del almacén.</p>
            <button class="d-btn" style="margin-top:9px" data-reset>Seguir comprando</button>
          </div>`;
        carrito = {};
        $(root, '[data-count]').textContent = '0';
      });
      on(root, '[data-reset]', 'click', pinta);
      on(root, '[data-open-cart]', 'click', function () {
        $(root, '.e-cart').scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      });
      pinta();
    }
  };

  /* =====================================================================
     3. Dashboard empresarial — KPIs, serie y ranking por periodo/sucursal
     ===================================================================== */
  var SERIES = {
    '7': { lbl: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], v: [42, 55, 48, 61, 88, 120, 96], ventas: 510000, pedidos: 412, conv: 3.1, delta: 12 },
    '30': { lbl: ['S1', 'S2', 'S3', 'S4'], v: [420, 468, 512, 610], ventas: 2010000, pedidos: 1684, conv: 2.8, delta: 8 },
    '90': { lbl: ['Ene', 'Feb', 'Mar'], v: [1720, 1980, 2010], ventas: 5710000, pedidos: 4903, conv: 2.6, delta: -3 }
  };
  var SUCS = { todas: 1, centro: 0.46, norte: 0.33, sur: 0.21 };
  var dashboard = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Panel de operación</span>
          <div class="d-seg" role="group" aria-label="Periodo">
            <button class="d-chip" data-per="7" aria-pressed="true">7 días</button>
            <button class="d-chip" data-per="30" aria-pressed="false">30 días</button>
            <button class="d-chip" data-per="90" aria-pressed="false">90 días</button>
          </div>
          <div class="d-field" style="width:130px">
            <select data-suc aria-label="Sucursal">
              <option value="todas">Todas las sucursales</option>
              <option value="centro">Centro</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
            </select>
          </div>
        </div>
        <div class="d-main d-stack">
          <div class="d-kpis" data-kpis></div>
          <div class="d-card">
            <p class="d-h">Ventas del periodo</p>
            <svg class="k-chart" role="img" aria-label="Serie de ventas del periodo">
              <defs><linearGradient id="kFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="currentColor" stop-opacity=".28"/>
                <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
              </linearGradient></defs>
              <g data-grid></g>
              <path data-area fill="url(#kFill)"/>
              <path data-line fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
              <g data-dots></g>
            </svg>
            <div class="k-labels" data-labels></div>
          </div>
          <div class="d-card">
            <p class="d-h">Productos con más venta</p>
            <table class="d-table"><thead><tr><th>Producto</th><th class="num">Unidades</th><th class="num">Importe</th></tr></thead>
            <tbody data-top></tbody></table>
          </div>
        </div>
      </div>`,
    init: function (root) {
      var per = '7', suc = 'todas';
      var TOP = [
        { n: 'Café en grano 1 kg', u: 318 }, { n: 'Sudadera Altura', u: 194 },
        { n: 'Termo 500 ml', u: 156 }, { n: 'Prensa francesa', u: 88 }
      ];

      function pinta() {
        var s = SERIES[per], f = SUCS[suc];
        var v = s.v.map(function (x) { return x * f; });

        $(root, '[data-kpis]').innerHTML = [
          { l: 'Ventas', v: mxn(s.ventas * f), d: s.delta },
          { l: 'Pedidos', v: nf.format(Math.round(s.pedidos * f)), d: s.delta - 2 },
          { l: 'Ticket promedio', v: mxn(s.ventas / s.pedidos), d: 2 },
          { l: 'Conversión', v: s.conv.toFixed(1) + ' %', d: s.delta > 0 ? 1 : -1 }
        ].map(function (k) {
          return `<div class="d-kpi"><span class="lbl">${k.l}</span>
            <div class="val">${k.v}</div>
            <span class="delta${k.d < 0 ? ' down' : ''}">${k.d < 0 ? '▼' : '▲'} ${Math.abs(k.d)} % vs. periodo previo</span></div>`;
        }).join('');

        // el viewBox se ajusta al tamaño real en píxeles del <svg>: así el trazo se
        // dibuja 1:1 y no hace falta estirarlo (que ovalaba los puntos de la serie).
        var svg = $(root, '.k-chart');
        var W = Math.round(svg.clientWidth) || 320, H = Math.round(svg.clientHeight) || 120, P = 12;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        var max = Math.max.apply(null, v) * 1.18 || 1;
        var pts = v.map(function (n, i) {
          return {
            x: P + (W - P * 2) * (v.length === 1 ? .5 : i / (v.length - 1)),
            y: H - P - (H - P * 2) * (n / max)
          };
        });
        var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' ');
        $(root, '[data-line]').setAttribute('d', d);
        $(root, '[data-area]').setAttribute('d', d + ' L' + pts[pts.length - 1].x.toFixed(1) + ' ' + (H - P) + ' L' + pts[0].x.toFixed(1) + ' ' + (H - P) + ' Z');
        $(root, '[data-dots]').innerHTML = pts.map(function (p) {
          return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="currentColor"/>`;
        }).join('');
        $(root, '[data-grid]').innerHTML = [0, .5, 1].map(function (t) {
          var y = P + (H - P * 2) * t;
          return `<line x1="${P}" y1="${y}" x2="${W - P}" y2="${y}" stroke="currentColor" stroke-opacity=".12"/>`;
        }).join('');
        $(root, '[data-labels]').innerHTML = s.lbl.map(function (l) { return '<span>' + l + '</span>'; }).join('');

        $(root, '[data-top]').innerHTML = TOP.map(function (t) {
          var u = Math.round(t.u * f);
          return `<tr><td>${t.n}</td><td class="num">${nf.format(u)}</td><td class="num">${mxn(u * 340)}</td></tr>`;
        }).join('');
      }

      grupo(root, '[data-per]', function (b) { per = b.getAttribute('data-per'); pinta(); });
      $(root, '[data-suc]').addEventListener('change', function (e) { suc = e.target.value; pinta(); });
      // el viewBox depende del ancho medido, así que hay que rehacerlo al cambiar de tamaño
      window.addEventListener('resize', function () { if (vivo(root)) pinta(); });
      pinta();
    }
  };

  /* =====================================================================
     4. Chatbot — conversación con intenciones y escalamiento a humano
     ===================================================================== */
  var GUION = [
    { k: ['horario', 'abren', 'cierran', 'hora'], r: 'Abrimos de lunes a viernes de 7:00 a 21:00 y sábados de 8:00 a 14:00. El domingo descansamos.' },
    { k: ['precio', 'cuesta', 'costo', 'cuánto'], r: 'El espresso arranca en $45 y el café en grano de 1 kg en $390. ¿Quieres que te pase la lista completa?' },
    { k: ['envío', 'envio', 'entrega', 'llega'], r: 'Enviamos a todo México en 2 a 4 días hábiles. El envío es gratis en pedidos desde $999.' },
    { k: ['factura', 'cfdi', 'fiscal'], r: 'Sí facturamos. Necesito tu RFC y régimen fiscal y te mando el CFDI el mismo día.' },
    { k: ['humano', 'persona', 'asesor', 'agente'], r: 'Claro, te paso con una persona del equipo. Ya la etiqueté en la conversación y responde en unos minutos.', escala: true },
    { k: ['cita', 'reserva', 'mesa', 'apartar'], r: 'Puedo apartarte mesa. ¿Para qué día y cuántas personas?' }
  ];
  var chatbot = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="c-avatar" aria-hidden="true">◕</span>
          <span class="d-bar-title">Asistente de Altura <span class="d-badge ok" style="margin-left:6px">En línea</span></span>
          <span class="d-badge" data-canal>WhatsApp</span>
        </div>
        <div class="d-main c-scroll" data-msgs></div>
        <div class="c-sug" data-sug>
          <button class="d-chip" aria-pressed="false">¿Cuál es su horario?</button>
          <button class="d-chip" aria-pressed="false">¿Hacen envíos?</button>
          <button class="d-chip" aria-pressed="false">¿Me pueden facturar?</button>
          <button class="d-chip" aria-pressed="false">Quiero hablar con una persona</button>
        </div>
        <form class="c-form" data-form>
          <input type="text" data-inp placeholder="Escribe tu mensaje…" aria-label="Mensaje" autocomplete="off">
          <button class="d-btn accent" type="submit">Enviar</button>
        </form>
      </div>`,
    init: function (root) {
      var caja = $(root, '[data-msgs]');
      var escalado = false;

      function burbuja(quien, texto, clase) {
        var b = document.createElement('div');
        b.className = 'c-msg ' + quien + (clase ? ' ' + clase : '');
        b.textContent = texto;
        caja.appendChild(b);
        caja.scrollTop = caja.scrollHeight;
        return b;
      }
      function responde(texto) {
        var t = texto.toLowerCase();
        var hit = GUION.filter(function (g) {
          return g.k.some(function (k) { return t.indexOf(k) >= 0; });
        })[0];
        return hit || {
          r: 'Todavía no me enseñan esa. Puedo ayudarte con horarios, precios, envíos, facturación o pasarte con una persona del equipo.'
        };
      }
      async function manda(texto) {
        if (!texto.trim()) return;
        burbuja('yo', texto);
        var esc = burbuja('bot', '', 'typing');
        esc.innerHTML = '<i></i><i></i><i></i>';
        await wait(700);
        if (!vivo(root)) return;
        esc.remove();
        var r = responde(texto);
        burbuja('bot', r.r);
        if (r.escala && !escalado) {
          escalado = true;
          await wait(500);
          if (!vivo(root)) return;
          burbuja('sys', 'Conversación transferida a Daniela G. · equipo de atención');
          $(root, '[data-canal]').textContent = 'Atendido por una persona';
          $(root, '[data-canal]').className = 'd-badge warn';
        }
      }

      burbuja('bot', '¡Hola! Soy el asistente de Cafetería Altura. Pregúntame lo que necesites, respondo a cualquier hora.');
      on(root, '[data-sug] .d-chip', 'click', function (e, b) { manda(b.textContent); });
      $(root, '[data-form]').addEventListener('submit', function (e) {
        e.preventDefault();
        var i = $(root, '[data-inp]');
        manda(i.value);
        i.value = '';
      });
    }
  };

  /* =====================================================================
     5. CRM — embudo de oportunidades con avance de etapa y totales
     ===================================================================== */
  var ETAPAS = ['Prospecto', 'Contactado', 'Propuesta', 'Ganado'];
  var CANDIDATOS = [
    { n: 'Panadería Sol', c: 'Rocío Márquez', m: 48000 },
    { n: 'Ferretería El Norte', c: 'Iván Robles', m: 92000 },
    { n: 'Clínica Vida', c: 'Dra. Peña', m: 156000 },
    { n: 'Transportes Ruiz', c: 'Sergio Ruiz', m: 210000 }
  ];
  var crm = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Embudo de ventas</span>
          <span class="d-badge info" data-total></span>
          <button class="d-btn" data-nuevo>+ Nuevo prospecto</button>
        </div>
        <div class="d-main pad0 k-board" data-board></div>
      </div>`,
    init: function (root) {
      var pool = CANDIDATOS.slice();
      var deals = [
        { id: 1, n: 'Grupo Meridiano', c: 'Ana Lozano', m: 120000, e: 0 },
        { id: 2, n: 'Textiles Bravo', c: 'Luis Bravo', m: 75000, e: 1 },
        { id: 3, n: 'Refaccionaria GTO', c: 'Mari Trejo', m: 43000, e: 1 },
        { id: 4, n: 'Hotel Palma', c: 'Óscar Vidal', m: 260000, e: 2 },
        { id: 5, n: 'Distribuidora Yaqui', c: 'Nadia Cruz', m: 98000, e: 3 }
      ];
      var seq = 6;

      function pinta() {
        $(root, '[data-board]').innerHTML = ETAPAS.map(function (et, i) {
          var col = deals.filter(function (d) { return d.e === i; });
          var suma = col.reduce(function (a, d) { return a + d.m; }, 0);
          return `<section class="k-col">
            <header class="k-col-h">
              <b>${et}</b>
              <span class="d-badge">${col.length}</span>
              <span class="k-col-sum">${mxn(suma)}</span>
            </header>
            <div class="k-col-body">${
              col.map(function (d) {
                return `<article class="k-deal${i === 3 ? ' won' : ''}">
                  <b>${d.n}</b>
                  <span class="k-deal-c">${d.c}</span>
                  <span class="k-deal-m">${mxn(d.m)}</span>
                  <span class="k-deal-nav">
                    <button class="d-btn sm" data-mv="${d.id}" data-dir="-1" ${i === 0 ? 'disabled' : ''} aria-label="Regresar etapa">◂</button>
                    <button class="d-btn sm" data-mv="${d.id}" data-dir="1" ${i === 3 ? 'disabled' : ''} aria-label="Avanzar etapa">▸</button>
                  </span>
                </article>`;
              }).join('') || '<p class="d-empty">Sin oportunidades</p>'
            }</div>
          </section>`;
        }).join('');
        var ganado = deals.filter(function (d) { return d.e === 3; }).reduce(function (a, d) { return a + d.m; }, 0);
        $(root, '[data-total]').textContent = 'Ganado: ' + mxn(ganado);
      }

      on(root, '[data-mv]', 'click', function (e, b) {
        var id = +b.getAttribute('data-mv'), dir = +b.getAttribute('data-dir');
        deals.forEach(function (d) {
          if (d.id === id) d.e = Math.max(0, Math.min(3, d.e + dir));
        });
        pinta();
      });
      on(root, '[data-nuevo]', 'click', function () {
        if (!pool.length) return;
        var c = pool.shift();
        deals.push({ id: seq++, n: c.n, c: c.c, m: c.m, e: 0 });
        pinta();
        if (!pool.length) $(root, '[data-nuevo]').disabled = true;
      });
      pinta();
    }
  };

  /* =====================================================================
     6. Facturación automática — timbrado de ventas, individual o en lote
     ===================================================================== */
  var facturacion = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Ventas por facturar</span>
          <div class="d-seg" role="group" aria-label="Filtro">
            <button class="d-chip" data-f="todas" aria-pressed="true">Todas</button>
            <button class="d-chip" data-f="pend" aria-pressed="false">Pendientes</button>
            <button class="d-chip" data-f="timb" aria-pressed="false">Timbradas</button>
          </div>
          <button class="d-btn primary" data-todas>Timbrar pendientes</button>
        </div>
        <div class="d-main">
          <table class="d-table">
            <thead><tr><th>Venta</th><th>Cliente</th><th class="num">Importe</th><th>Estado</th><th></th></tr></thead>
            <tbody data-rows></tbody>
          </table>
        </div>
        <div class="d-bar" style="border-top:1px solid var(--d-line);border-bottom:none">
          <span class="d-note" data-resumen></span>
        </div>
      </div>`,
    init: function (root) {
      var filtro = 'todas';
      var ventas = [
        { id: 'V-2401', cli: 'Grupo Meridiano', rfc: 'GME010203AB1', m: 24800, ok: false },
        { id: 'V-2402', cli: 'Panadería Sol', rfc: 'PSO980411QT4', m: 3150, ok: true, folio: 'A-1180' },
        { id: 'V-2403', cli: 'Hotel Palma', rfc: 'HPA050612KL9', m: 91200, ok: false },
        { id: 'V-2404', cli: 'Textiles Bravo', rfc: 'TBR120830MN2', m: 15600, ok: false },
        { id: 'V-2405', cli: 'Clínica Vida', rfc: 'CVI170205RS7', m: 47300, ok: false }
      ];
      var folio = 1181;

      function uuid() {
        var s = 'ABCDEF0123456789', o = '';
        for (var i = 0; i < 8; i++) o += s[Math.floor(Math.random() * 16)];
        return o + '-4F2A-…';
      }
      function pinta() {
        var vis = ventas.filter(function (v) {
          return filtro === 'todas' || (filtro === 'pend' ? !v.ok : v.ok);
        });
        $(root, '[data-rows]').innerHTML = vis.map(function (v) {
          return `<tr>
            <td><b>${v.id}</b></td>
            <td>${v.cli}<br><span class="d-note" style="font-size:.6rem">${v.rfc}</span></td>
            <td class="num">${mxn(v.m)}</td>
            <td>${v.ok
              ? `<span class="d-badge ok">Timbrada</span><br><span class="d-note" style="font-size:.58rem">${v.folio} · ${v.uuid || 'B71C20A8-4F2A-…'}</span>`
              : '<span class="d-badge warn">Pendiente</span>'}</td>
            <td class="num">${v.ok ? '<button class="d-btn sm" disabled>Timbrada</button>'
              : `<button class="d-btn sm accent" data-timbrar="${v.id}">Timbrar</button>`}</td>
          </tr>`;
        }).join('') || '<tr><td colspan="5"><p class="d-empty">Nada que mostrar con este filtro.</p></td></tr>';

        var pend = ventas.filter(function (v) { return !v.ok; }).length;
        var timbrado = ventas.filter(function (v) { return v.ok; }).reduce(function (a, v) { return a + v.m; }, 0);
        $(root, '[data-resumen]').innerHTML = pend
          ? `<b>${pend}</b> venta(s) sin timbrar · ${mxn(timbrado)} ya facturado`
          : `Todo timbrado · ${mxn(timbrado)} facturado en el periodo`;
        $(root, '[data-todas]').disabled = !pend;
      }
      async function timbra(v, b) {
        if (b) { b.disabled = true; b.textContent = 'Timbrando…'; }
        await wait(600);
        if (!vivo(root)) return;
        v.ok = true;
        v.folio = 'A-' + (folio++);
        v.uuid = uuid();
        pinta();
      }

      on(root, '[data-timbrar]', 'click', function (e, b) {
        var id = b.getAttribute('data-timbrar');
        timbra(ventas.filter(function (v) { return v.id === id; })[0], b);
      });
      on(root, '[data-todas]', 'click', async function () {
        var pend = ventas.filter(function (v) { return !v.ok; });
        $(root, '[data-todas]').disabled = true;
        for (var i = 0; i < pend.length; i++) {
          await timbra(pend[i]);
          if (!vivo(root)) return;
        }
      });
      grupo(root, '[data-f]', function (b) { filtro = b.getAttribute('data-f'); pinta(); });
      pinta();
    }
  };

  /* =====================================================================
     7. Pasarela de pagos — cobro con validación, aprobación y rechazo
     ===================================================================== */
  var pasarela = {
    html: `
      <div class="d-app">
        <div class="d-bar"><span class="d-bar-title">Cobro seguro</span><span class="d-badge ok">Cifrado 🔒</span></div>
        <div class="d-main p-wrap">
          <form class="p-form d-stack" data-form novalidate>
            <div class="d-card d-stack">
              <div class="d-field">
                <label for="pNum">Número de tarjeta <span data-brand class="d-badge" style="margin-left:4px"></span></label>
                <input id="pNum" data-num inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" maxlength="19">
                <span class="msg" data-err-num></span>
              </div>
              <div class="d-row">
                <div class="d-field"><label for="pExp">Vence</label>
                  <input id="pExp" data-exp inputmode="numeric" placeholder="MM/AA" maxlength="5">
                  <span class="msg" data-err-exp></span></div>
                <div class="d-field"><label for="pCvv">CVV</label>
                  <input id="pCvv" data-cvv inputmode="numeric" placeholder="123" maxlength="4">
                  <span class="msg" data-err-cvv></span></div>
              </div>
              <div class="d-field"><label for="pNom">Nombre en la tarjeta</label>
                <input id="pNom" data-nom placeholder="Como aparece en la tarjeta">
                <span class="msg" data-err-nom></span></div>
            </div>
            <button class="d-btn primary" type="submit" style="padding:11px">Pagar <b>${mxn(1890)}</b></button>
            <p class="d-note">Para probar: cualquier número que termine en <b>0</b> se rechaza; el resto se aprueba.</p>
          </form>
          <aside class="p-side d-stack">
            <div class="d-card">
              <p class="d-h">Resumen</p>
              <div class="p-line"><span>Prensa francesa</span><b>${mxn(640)}</b></div>
              <div class="p-line"><span>Café en grano 1 kg × 3</span><b>${mxn(1170)}</b></div>
              <div class="p-line"><span>Envío</span><b>${mxn(80)}</b></div>
              <div class="p-line tot"><span>Total</span><b>${mxn(1890)}</b></div>
            </div>
            <div class="d-card" data-estado>
              <p class="d-h">Estado del cobro</p>
              <p class="d-note">Esperando los datos de la tarjeta.</p>
            </div>
          </aside>
        </div>
      </div>`,
    init: function (root) {
      var num = $(root, '[data-num]'), exp = $(root, '[data-exp]'), cvv = $(root, '[data-cvv]'), nom = $(root, '[data-nom]');

      function soloDigitos(s) { return s.replace(/\D/g, ''); }
      function marca(d) {
        if (/^4/.test(d)) return 'Visa';
        if (/^5[1-5]/.test(d)) return 'Mastercard';
        if (/^3[47]/.test(d)) return 'Amex';
        return '';
      }
      num.addEventListener('input', function () {
        var d = soloDigitos(num.value).slice(0, 16);
        num.value = (d.match(/.{1,4}/g) || []).join(' ');
        var m = marca(d);
        var b = $(root, '[data-brand]');
        b.textContent = m;
        b.className = 'd-badge' + (m ? ' info' : '');
      });
      exp.addEventListener('input', function () {
        var d = soloDigitos(exp.value).slice(0, 4);
        exp.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
      });
      cvv.addEventListener('input', function () { cvv.value = soloDigitos(cvv.value).slice(0, 4); });

      function valida() {
        var errs = {};
        var d = soloDigitos(num.value);
        if (d.length < 15) errs.num = 'Faltan dígitos: la tarjeta lleva 15 o 16.';
        var mm = +exp.value.slice(0, 2), aa = +exp.value.slice(3);
        if (!(mm >= 1 && mm <= 12) || exp.value.length < 5) errs.exp = 'Usa el formato MM/AA.';
        else if (aa < 26) errs.exp = 'La tarjeta está vencida.';
        if (cvv.value.length < 3) errs.cvv = 'El CVV lleva 3 o 4 dígitos.';
        if (nom.value.trim().length < 3) errs.nom = 'Escribe el nombre del titular.';
        ['num', 'exp', 'cvv', 'nom'].forEach(function (k) {
          $(root, '[data-err-' + k + ']').textContent = errs[k] || '';
          $(root, '[data-' + k + ']').closest('.d-field').classList.toggle('err', !!errs[k]);
        });
        return Object.keys(errs).length === 0;
      }

      $(root, '[data-form]').addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!valida()) return;
        var caja = $(root, '[data-estado]');
        var boton = $(root, 'button[type="submit"]');
        boton.disabled = true;
        caja.innerHTML = '<p class="d-h">Estado del cobro</p><p class="d-note">Contactando al banco…</p><div class="d-bar-meter"><i style="width:70%"></i></div>';
        await wait(1100);
        if (!vivo(root)) return;
        var d = soloDigitos(num.value);
        var rechaza = d.slice(-1) === '0';
        if (rechaza) {
          caja.innerHTML = `<p class="d-h">Estado del cobro</p>
            <span class="d-badge bad">Rechazada</span>
            <p class="d-note" style="margin-top:7px">El banco emisor declinó el cargo (fondos insuficientes). No se hizo ningún movimiento. Puedes intentar con otra tarjeta.</p>`;
          boton.disabled = false;
        } else {
          caja.innerHTML = `<p class="d-h">Estado del cobro</p>
            <span class="d-badge ok">Aprobada</span>
            <p class="d-note" style="margin-top:7px">Cargo de <b>${mxn(1890)}</b> a ${marca(d) || 'tarjeta'} ••••${d.slice(-4)}.<br>
            Autorización <b>${Math.floor(100000 + Math.random() * 899999)}</b> · el dinero se deposita en 48 h hábiles.</p>`;
        }
      });
    }
  };

  /* =====================================================================
     8. Módulos e integraciones — armado del alcance con dependencias
     ===================================================================== */
  var MODS = [
    { id: 'rep', n: 'Reportes avanzados', p: 6300, d: 'Exporta a Excel y programa envíos por correo.' },
    { id: 'perm', n: 'Permisos por rol', p: 4800, d: 'Cada puesto ve solo lo que le toca.' },
    { id: 'notif', n: 'Notificaciones', p: 3900, d: 'Avisos por correo y WhatsApp.', req: 'perm' },
    { id: 'multi', n: 'Multi-sucursal', p: 9200, d: 'Inventario y ventas separados por sucursal.' },
    { id: 'audit', n: 'Bitácora de auditoría', p: 5400, d: 'Quién cambió qué y cuándo.', req: 'perm' },
    { id: 'api', n: 'API pública', p: 11000, d: 'Para conectar sistemas de terceros.' }
  ];
  var modulos = {
    html: `
      <div class="d-app">
        <div class="d-bar"><span class="d-bar-title">Arma tu sistema</span>
          <span class="d-badge info">Base incluida: ${mxn(28000)}</span></div>
        <div class="d-split">
          <div class="d-main"><div class="m-list" data-list></div></div>
          <aside class="d-side">
            <p class="d-side-h">Cotización</p>
            <div data-cot></div>
          </aside>
        </div>
      </div>`,
    init: function (root) {
      var BASE = 28000;
      var sel = { rep: true };
      var aviso = '';

      function pinta() {
        $(root, '[data-list]').innerHTML = MODS.map(function (m) {
          var req = m.req ? MODS.filter(function (x) { return x.id === m.req; })[0] : null;
          return `<label class="m-item${sel[m.id] ? ' on' : ''}">
            <input type="checkbox" data-mod="${m.id}" ${sel[m.id] ? 'checked' : ''}>
            <span class="m-body"><b>${m.n}</b><span class="d-note">${m.d}</span>
              ${req ? `<span class="d-badge" style="margin-top:5px">Requiere: ${req.n}</span>` : ''}</span>
            <span class="m-price">${mxn(m.p)}</span>
          </label>`;
        }).join('');

        var elegidos = MODS.filter(function (m) { return sel[m.id]; });
        var total = BASE + elegidos.reduce(function (a, m) { return a + m.p; }, 0);
        $(root, '[data-cot]').innerHTML =
          `<div class="m-cot"><span>Sistema base</span><b>${mxn(BASE)}</b></div>` +
          elegidos.map(function (m) { return `<div class="m-cot"><span>${m.n}</span><b>${mxn(m.p)}</b></div>`; }).join('') +
          `<div class="m-cot tot"><span>Total</span><b>${mxn(total)}</b></div>
           <p class="d-note" style="margin-top:9px">${elegidos.length} módulo(s) sobre el sistema base. Se instalan sin rehacer lo que ya tienes.</p>` +
          (aviso ? `<p class="d-badge warn" style="margin-top:8px;display:block;white-space:normal;line-height:1.5">${aviso}</p>` : '');
      }

      on(root, '[data-mod]', 'change', function (e, inp) {
        var id = inp.getAttribute('data-mod');
        aviso = '';
        if (inp.checked) {
          sel[id] = true;
          var m = MODS.filter(function (x) { return x.id === id; })[0];
          if (m.req && !sel[m.req]) {
            sel[m.req] = true;
            aviso = '“' + m.n + '” necesita “' + MODS.filter(function (x) { return x.id === m.req; })[0].n + '”, así que se agregó también.';
          }
        } else {
          delete sel[id];
          // al quitar una dependencia se van los módulos que dependían de ella
          MODS.forEach(function (x) {
            if (x.req === id && sel[x.id]) {
              delete sel[x.id];
              aviso = 'Se quitó también “' + x.n + '”, que dependía de este módulo.';
            }
          });
        }
        pinta();
      });
      pinta();
    }
  };

  /* =====================================================================
     9. Scraper — corrida programada que va llenando una tabla
     ===================================================================== */
  var FUENTES = {
    comp: { n: 'Competencia — tienda en línea', filas: [
      ['Café 1 kg Tueste medio', '$355', 'En stock', '4.6'],
      ['Café 1 kg Tueste oscuro', '$369', 'En stock', '4.4'],
      ['Prensa francesa 600 ml', '$589', 'Agotado', '4.8'],
      ['Molino manual acero', '$1,190', 'En stock', '4.7'],
      ['Termo 500 ml', '$399', 'En stock', '4.2'],
      ['Filtros V60 (100)', '$145', 'En stock', '4.9']
    ]},
    mkt: { n: 'Marketplace — categoría café', filas: [
      ['Grano orgánico Chiapas', '$412', 'En stock', '4.5'],
      ['Cápsulas compatibles x50', '$268', 'En stock', '4.1'],
      ['Cafetera italiana 6 tazas', '$540', 'Pocas piezas', '4.6'],
      ['Báscula 0.1 g', '$690', 'En stock', '4.8']
    ]},
    dir: { n: 'Directorio de proveedores', filas: [
      ['Tostadores del Golfo', 'Veracruz', 'Activo', '—'],
      ['Beneficio La Sierra', 'Chiapas', 'Activo', '—'],
      ['Empaques Norte', 'N. León', 'Inactivo', '—']
    ]}
  };
  var scraper = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Extracción programada</span>
          <button class="d-btn primary" data-run>Ejecutar ahora</button>
        </div>
        <div class="d-split">
          <aside class="d-side">
            <p class="d-side-h">Fuente</p>
            <div class="d-field"><select data-src aria-label="Fuente">
              <option value="comp">Competencia — tienda</option>
              <option value="mkt">Marketplace — café</option>
              <option value="dir">Directorio proveedores</option>
            </select></div>
            <p class="d-side-h">Campos a extraer</p>
            <label class="d-switch"><input type="checkbox" data-col="0" checked>Nombre</label>
            <label class="d-switch"><input type="checkbox" data-col="1" checked>Precio</label>
            <label class="d-switch"><input type="checkbox" data-col="2" checked>Disponibilidad</label>
            <label class="d-switch"><input type="checkbox" data-col="3">Calificación</label>
            <p class="d-side-h">Frecuencia</p>
            <div class="d-field"><select data-freq aria-label="Frecuencia">
              <option>Cada hora</option><option selected>Diario 6:00</option><option>Semanal, lunes</option>
            </select></div>
          </aside>
          <div class="d-main d-stack">
            <div class="d-bar-meter"><i data-meter></i></div>
            <p class="d-note" data-status>Sin ejecutar. Elige la fuente y los campos, luego dale a “Ejecutar ahora”.</p>
            <table class="d-table"><thead><tr data-head></tr></thead><tbody data-rows></tbody></table>
            <div data-export></div>
          </div>
        </div>
      </div>`,
    init: function (root) {
      var COLS = ['Nombre', 'Precio', 'Disponibilidad', 'Calificación'];
      var corriendo = false;

      function activas() {
        return $$(root, '[data-col]').filter(function (c) { return c.checked; })
          .map(function (c) { return +c.getAttribute('data-col'); });
      }
      function cabecera() {
        $(root, '[data-head]').innerHTML = activas().map(function (i) { return '<th>' + COLS[i] + '</th>'; }).join('');
      }
      async function corre() {
        if (corriendo) return;
        var cols = activas();
        if (!cols.length) { $(root, '[data-status]').textContent = 'Elige al menos un campo para extraer.'; return; }
        corriendo = true;
        $(root, '[data-run]').disabled = true;
        $(root, '[data-export]').innerHTML = '';
        $(root, '[data-rows]').innerHTML = '';
        cabecera();

        var f = FUENTES[$(root, '[data-src]').value];
        var filas = f.filas;
        $(root, '[data-status]').textContent = 'Conectando con ' + f.n + '…';
        await wait(500);

        for (var i = 0; i < filas.length; i++) {
          if (!vivo(root)) return;
          var tr = document.createElement('tr');
          tr.innerHTML = cols.map(function (c) { return '<td>' + filas[i][c] + '</td>'; }).join('');
          $(root, '[data-rows]').appendChild(tr);
          $(root, '[data-meter]').style.width = Math.round(((i + 1) / filas.length) * 100) + '%';
          $(root, '[data-status]').textContent = 'Extrayendo… ' + (i + 1) + ' de ' + filas.length + ' registros.';
          await wait(260);
        }
        if (!vivo(root)) return;
        $(root, '[data-status]').innerHTML = `Listo: <b>${filas.length}</b> registros de ${f.n}. Próxima corrida: ${$(root, '[data-freq]').value.toLowerCase()}.`;
        $(root, '[data-export]').innerHTML = '<button class="d-btn" data-csv>Ver CSV de salida</button>';
        $(root, '[data-run]').disabled = false;
        corriendo = false;
      }

      on(root, '[data-run]', 'click', corre);
      on(root, '[data-col]', 'change', cabecera);
      on(root, '[data-csv]', 'click', function () {
        var cols = activas();
        var f = FUENTES[$(root, '[data-src]').value];
        var csv = cols.map(function (i) { return COLS[i]; }).join(',') + '\n' +
          f.filas.map(function (fila) {
            return cols.map(function (c) { return '"' + fila[c] + '"'; }).join(',');
          }).join('\n');
        $(root, '[data-export]').innerHTML = '<pre class="d-log" style="max-height:130px">' + csv + '</pre>';
      });
      cabecera();
    }
  };

  /* =====================================================================
     10. Conexión con sistemas externos — mapeo de campos y prueba
     ===================================================================== */
  var ORIGEN = [
    { c: 'sku', t: 'texto', req: true }, { c: 'nombre_articulo', t: 'texto', req: true },
    { c: 'precio_lista', t: 'decimal', req: true }, { c: 'existencia', t: 'entero', req: true },
    { c: 'linea', t: 'texto' }, { c: 'proveedor', t: 'texto' }
  ];
  var DESTINO = [
    { c: 'id_producto', t: 'texto', req: true }, { c: 'titulo', t: 'texto', req: true },
    { c: 'precio', t: 'decimal', req: true }, { c: 'stock', t: 'entero', req: true },
    { c: 'coleccion', t: 'texto' }
  ];
  var conexion = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">ERP <span style="color:var(--d-ink-faint)">→</span> Tienda en línea</span>
          <button class="d-btn" data-auto>Sugerir mapeo</button>
          <button class="d-btn primary" data-test>Probar conexión</button>
        </div>
        <div class="d-main x-wrap">
          <div class="x-cols">
            <div class="d-card">
              <p class="d-h">Campos del ERP</p>
              <div data-src-list class="x-list"></div>
            </div>
            <div class="d-card">
              <p class="d-h">Campos de la tienda</p>
              <div data-dst-list class="x-list"></div>
            </div>
          </div>
          <div class="x-cols x-bottom">
            <div class="d-card">
              <p class="d-h">Correspondencias</p>
              <div data-maps class="x-list"></div>
            </div>
            <div class="d-card">
              <p class="d-h">Prueba de conexión</p>
              <pre class="d-log" data-log>Selecciona un campo del ERP y luego su equivalente en la tienda.</pre>
            </div>
          </div>
        </div>
      </div>`,
    init: function (root) {
      var maps = [{ o: 'sku', d: 'id_producto' }];
      var pick = null;

      function usadoO(c) { return maps.some(function (m) { return m.o === c; }); }
      function usadoD(c) { return maps.some(function (m) { return m.d === c; }); }

      function pinta() {
        $(root, '[data-src-list]').innerHTML = ORIGEN.map(function (f) {
          return `<button class="x-f${usadoO(f.c) ? ' used' : ''}${pick === f.c ? ' pick' : ''}" data-o="${f.c}" ${usadoO(f.c) ? 'disabled' : ''}>
            <b>${f.c}</b><span>${f.t}${f.req ? ' · obligatorio' : ''}</span></button>`;
        }).join('');
        $(root, '[data-dst-list]').innerHTML = DESTINO.map(function (f) {
          return `<button class="x-f${usadoD(f.c) ? ' used' : ''}" data-d="${f.c}" ${usadoD(f.c) || !pick ? 'disabled' : ''}>
            <b>${f.c}</b><span>${f.t}${f.req ? ' · obligatorio' : ''}</span></button>`;
        }).join('');
        $(root, '[data-maps]').innerHTML = maps.length
          ? maps.map(function (m, i) {
              return `<div class="x-map"><b>${m.o}</b><span>→</span><b>${m.d}</b>
                <button class="d-btn sm" data-del="${i}" aria-label="Quitar">✕</button></div>`;
            }).join('')
          : '<p class="d-empty">Todavía no hay campos conectados.</p>';
      }
      function log(txt, cls) {
        var p = $(root, '[data-log]');
        p.innerHTML += '\n<span class="' + (cls || '') + '">' + txt + '</span>';
        p.scrollTop = p.scrollHeight;
      }

      on(root, '[data-o]', 'click', function (e, b) { pick = b.getAttribute('data-o'); pinta(); });
      on(root, '[data-d]', 'click', function (e, b) {
        if (!pick) return;
        maps.push({ o: pick, d: b.getAttribute('data-d') });
        log('Campo conectado: ' + pick + ' → ' + b.getAttribute('data-d'));
        pick = null;
        pinta();
      });
      on(root, '[data-del]', 'click', function (e, b) {
        maps.splice(+b.getAttribute('data-del'), 1);
        pinta();
      });
      on(root, '[data-auto]', 'click', function () {
        var sug = { sku: 'id_producto', nombre_articulo: 'titulo', precio_lista: 'precio', existencia: 'stock', linea: 'coleccion' };
        Object.keys(sug).forEach(function (o) {
          if (!usadoO(o) && !usadoD(sug[o])) maps.push({ o: o, d: sug[o] });
        });
        log('Mapeo sugerido por nombre y tipo de dato.');
        pick = null;
        pinta();
      });
      on(root, '[data-test]', 'click', async function () {
        $(root, '[data-log]').textContent = 'Probando conexión…';
        await wait(600);
        if (!vivo(root)) return;
        log('Autenticación con el ERP: correcta', 'ok');
        await wait(400);
        if (!vivo(root)) return;
        var faltan = DESTINO.filter(function (f) { return f.req && !usadoD(f.c); });
        if (faltan.length) {
          log('Faltan campos obligatorios de la tienda: ' + faltan.map(function (f) { return f.c; }).join(', '), 'bad');
          log('No se puede sincronizar hasta conectarlos.', 'bad');
          return;
        }
        log('Lectura de prueba: 248 artículos leídos', 'ok');
        await wait(400);
        if (!vivo(root)) return;
        log('Escritura de prueba: 3 artículos actualizados en la tienda', 'ok');
        log('Sincronización lista. Quedará programada cada 15 minutos.', 'ok');
      });
      pinta();
    }
  };

  /* =====================================================================
     11. Automatización de procesos — flujo que se ejecuta paso a paso
     ===================================================================== */
  var automatizacion = {
    html: `
      <div class="d-app">
        <div class="d-bar">
          <span class="d-bar-title">Flujo: venta cerrada → cliente atendido</span>
          <button class="d-btn primary" data-run>Ejecutar prueba</button>
        </div>
        <div class="d-split">
          <div class="d-main"><div class="f-flow" data-flow></div></div>
          <aside class="d-side">
            <p class="d-side-h">Corrida</p>
            <pre class="d-log" data-log style="max-height:100%">Sin ejecutar.</pre>
          </aside>
        </div>
      </div>`,
    init: function (root) {
      var pasos = [
        { n: 'Se cierra una venta', d: 'Disparador · desde el CRM', on: true, fijo: true, r: 'Venta V-2406 por $24,800' },
        { n: 'Generar y timbrar factura', d: 'Facturación', on: true, r: 'CFDI A-1186 timbrado' },
        { n: 'Enviar factura al cliente', d: 'Correo', on: true, r: 'Correo entregado a compras@meridiano.mx' },
        { n: 'Registrar el pago en contabilidad', d: 'Hoja de cálculo', on: true, r: 'Fila agregada en “Ingresos marzo”' },
        { n: 'Avisar al vendedor', d: 'WhatsApp', on: false, r: 'Mensaje enviado a Ana L.' }
      ];
      var corriendo = false;

      function pinta() {
        $(root, '[data-flow]').innerHTML = pasos.map(function (p, i) {
          return `<div class="f-step${p.on ? '' : ' off'}" data-step="${i}">
            <span class="f-dot" data-dot="${i}">${i + 1}</span>
            <span class="f-body"><b>${p.n}</b><span class="d-note">${p.d}</span>
              <span class="f-res" data-res="${i}"></span></span>
            ${p.fijo ? '<span class="d-badge info">Disparador</span>'
              : `<label class="d-switch"><input type="checkbox" data-on="${i}" ${p.on ? 'checked' : ''}><span class="meta">${p.on ? 'Activo' : 'Apagado'}</span></label>`}
          </div>` + (i < pasos.length - 1 ? '<span class="f-arrow" aria-hidden="true"></span>' : '');
        }).join('');
      }
      function log(t, cls) {
        var p = $(root, '[data-log]');
        p.innerHTML += '\n<span class="' + (cls || '') + '">' + t + '</span>';
        p.scrollTop = p.scrollHeight;
      }

      on(root, '[data-on]', 'change', function (e, inp) {
        pasos[+inp.getAttribute('data-on')].on = inp.checked;
        pinta();
      });
      on(root, '[data-run]', 'click', async function () {
        if (corriendo) return;
        corriendo = true;
        $(root, '[data-run]').disabled = true;
        pinta();
        $(root, '[data-log]').textContent = 'Corrida iniciada ' + new Date().toLocaleTimeString('es-MX');
        for (var i = 0; i < pasos.length; i++) {
          if (!vivo(root)) return;
          var p = pasos[i];
          var dot = $(root, '[data-dot="' + i + '"]');
          var res = $(root, '[data-res="' + i + '"]');
          if (!p.on) {
            dot.classList.add('skip');
            res.innerHTML = '<span class="d-badge">Omitido</span>';
            log('· ' + p.n + ': omitido (paso apagado)');
            continue;
          }
          dot.classList.add('run');
          res.innerHTML = '<span class="d-badge info">Ejecutando…</span>';
          await wait(700);
          if (!vivo(root)) return;
          dot.classList.remove('run');
          dot.classList.add('done');
          res.innerHTML = '<span class="d-badge ok">' + p.r + '</span>';
          log('✓ ' + p.n, 'ok');
        }
        if (!vivo(root)) return;
        log('Flujo terminado sin intervención humana.', 'ok');
        $(root, '[data-run]').disabled = false;
        corriendo = false;
      });
      pinta();
    }
  };

  return {
    web: web, ecommerce: ecommerce, dashboard: dashboard, chatbot: chatbot, crm: crm,
    facturacion: facturacion, pasarela: pasarela, modulos: modulos, scraper: scraper,
    conexion: conexion, automatizacion: automatizacion
  };
})();
