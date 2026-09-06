// app.js — arma las páginas del DOM, monta el efecto de pasar hoja con StPageFlip
// y abre la maqueta interactiva de cada servicio.
// depende de: PAGES, pageHtml, pad (render.js), ILLUS/PRODUCTS (data.js),
// DEMOS (demos.js) y el global St (page-flip)

(function(){
  "use strict";

  var bookEl = document.getElementById('book');
  var counter = document.getElementById('pageCounter');
  var btnPrev = document.getElementById('btnPrev');
  var btnNext = document.getElementById('btnNext');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // arma cada página como un <div class="page"> hijo de #book; StPageFlip los
  // recoge con loadFromHTML y los mueve dentro de su propia estructura interna.
  PAGES.forEach(function(page){
    var el = document.createElement('div');
    el.className = 'page';
    if(page.hard) el.setAttribute('data-density', 'hard');
    el.innerHTML = '<div class="page-inner">' + pageHtml(page) + '</div>';
    bookEl.appendChild(el);
  });

  var pageFlip = new St.PageFlip(bookEl, {
    width: 380,
    height: 540,
    size: 'stretch',
    minWidth: 300,
    maxWidth: 560,
    minHeight: 420,
    maxHeight: 760,
    showCover: true,
    usePortrait: true,
    maxShadowOpacity: 0.4,
    mobileScrollSupport: false,
    flippingTime: reduceMotion ? 1 : 420
  });
  pageFlip.loadFromHTML(bookEl.querySelectorAll('.page'));

  // enlaces dentro de las páginas (se arman una sola vez: el contenido no se
  // vuelve a renderizar, StPageFlip solo mueve/gira los elementos existentes)
  var coverBtn = bookEl.querySelector('[data-cover-open]');
  if(coverBtn) coverBtn.addEventListener('click', function(){ pageFlip.flip(1); });
  Array.prototype.forEach.call(bookEl.querySelectorAll('[data-goto]'), function(el){
    el.addEventListener('click', function(){ pageFlip.flip(parseInt(el.getAttribute('data-goto'), 10)); });
  });

  function updateUI(){
    var idx = pageFlip.getCurrentPageIndex();
    var total = pageFlip.getPageCount();
    counter.textContent = pad(idx + 1) + ' / ' + pad(total);
    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === total - 1;
  }

  function applyOrientation(){
    document.body.classList.toggle('is-portrait', pageFlip.getOrientation() === 'portrait');
  }

  pageFlip.on('flip', updateUI);
  pageFlip.on('changeOrientation', function(){
    applyOrientation();
    updateUI();
  });

  applyOrientation();
  updateUI();

  btnPrev.addEventListener('click', function(){ pageFlip.flipPrev(); });
  btnNext.addEventListener('click', function(){ pageFlip.flipNext(); });

  // ---------- maqueta interactiva por servicio ----------

  var dlg = document.createElement('dialog');
  dlg.className = 'demo-dialog';
  dlg.setAttribute('aria-labelledby', 'demoTitle');
  dlg.innerHTML = '' +
    '<div class="demo-head">' +
      '<div class="demo-thumb" data-thumb></div>' +
      '<div class="demo-titles">' +
        '<p class="demo-kicker">Maqueta interactiva</p>' +
        '<h2 id="demoTitle" data-title></h2>' +
      '</div>' +
      '<span class="demo-price" data-price></span>' +
      '<button type="button" class="demo-close" data-close aria-label="Cerrar la maqueta">✕</button>' +
    '</div>' +
    '<div class="demo-body" data-body></div>' +
    '<p class="demo-foot">Simulación con datos inventados: nada de lo que hagas aquí sale de esta pantalla. El producto final se conecta a tus sistemas reales.</p>';
  document.body.appendChild(dlg);

  var cuerpo = dlg.querySelector('[data-body]');

  function abrirDemo(key){
    var p = PRODUCTS.filter(function(x){ return x.icon === key; })[0];
    var demo = DEMOS[key];
    if(!p || !demo) return;

    dlg.querySelector('[data-title]').textContent = p.name;
    dlg.querySelector('[data-price]').textContent = p.price;

    // la misma ilustración ya está pintada en la tarjeta del catálogo, así que aquí hay
    // que renombrar los ids de sus <defs>: repetidos, las referencias url(#…) del thumb
    // apuntarían a las definiciones de la tarjeta.
    var il = ILLUS[key];
    var art = il.art
      .replace(/id="([\w-]+)"/g, 'id="th-$1"')
      .replace(/url\(#([\w-]+)\)/g, 'url(#th-$1)');
    var thumb = dlg.querySelector('[data-thumb]');
    thumb.style.background = il.bg;
    thumb.innerHTML = '<svg viewBox="' + il.vb + '" preserveAspectRatio="xMidYMid meet">' + art + '</svg>';

    cuerpo.innerHTML = demo.html;
    demo.init(cuerpo);
    dlg.showModal();
  }

  // al cerrar se vacía el cuerpo: así mueren los listeners y los temporizadores en curso
  // dejan de encontrar sus nodos (cada maqueta comprueba isConnected antes de seguir).
  dlg.addEventListener('close', function(){ cuerpo.innerHTML = ''; });
  dlg.querySelector('[data-close]').addEventListener('click', function(){ dlg.close(); });
  // clic fuera del panel (sobre el backdrop) también cierra
  dlg.addEventListener('click', function(e){ if(e.target === dlg) dlg.close(); });

  Array.prototype.forEach.call(bookEl.querySelectorAll('[data-demo]'), function(card){
    // StPageFlip escucha el arrastre en la hoja; sin esto, presionar una tarjeta
    // empieza a voltear la página en vez de abrir la maqueta.
    ['mousedown', 'touchstart', 'pointerdown'].forEach(function(ev){
      card.addEventListener(ev, function(e){ e.stopPropagation(); });
    });
    card.addEventListener('click', function(e){
      e.stopPropagation();
      abrirDemo(card.getAttribute('data-demo'));
    });
  });

  document.addEventListener('keydown', function(e){
    if(dlg.open) return;   // dentro de la maqueta las flechas son suyas
    if(e.key === 'ArrowRight') pageFlip.flipNext();
    if(e.key === 'ArrowLeft') pageFlip.flipPrev();
  });
})();
