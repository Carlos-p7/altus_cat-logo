// render.js — construye el marcado de cada página del catálogo a partir de data.js
// depende de: EMBLEM, ICONS, CATS, PRODUCTS, productsFor, pad (definidos en data.js)

// número de página mostrado en el pie / índice (solo referencia visual)
var PAGE_NO = { index: 1, digital: 2, relacion: 3, finanzas: 3, datos: 4 };

// a qué página del libro salta cada categoría al hacer clic en su pestaña o en el índice
var CAT_PAGE = { digital: 2, relacion: 3, finanzas: 3, datos: 4 };

// páginas del cuadernillo, en orden de lectura.
// relación y finanzas comparten una sola hoja para que el total de páginas
// deje la portada sola a la derecha y la contraportada sola a la izquierda.
var PAGES = [
  { type: 'cover', hard: true },
  { type: 'index' },
  { type: 'cat', cat: CATS[0] },
  { type: 'catcombo', cats: [CATS[1], CATS[2]] },
  { type: 'cat', cat: CATS[3] },
  { type: 'back', hard: true }
];

function cardsClassFor(n){
  if(n === 2) return 'cards n2';
  if(n === 3) return 'cards n3';
  return 'cards n4';
}

function renderCard(p){
  var cat = CATS.filter(function(c){ return c.key === p.cat; })[0];
  // ilustración en dos capas: el degradado va a sangre como fondo CSS (llena la tarjeta
  // en cualquier proporción) y la escena SVG se escala entera y centrada encima.
  var il = ILLUS[p.icon];
  // la tarjeta es un <button> porque abre la maqueta interactiva del servicio
  return '' +
    '<button type="button" class="card" data-demo="'+p.icon+'" style="--cat:var(--'+cat.tab+')">' +
      '<span class="card-icon" style="background:'+il.bg+'">' +
        '<svg viewBox="'+il.vb+'" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">'+il.art+'</svg>' +
        '<span class="card-cue">Ver maqueta ▸</span>' +
      '</span>' +
      '<span class="card-body">' +
        '<span class="card-name">'+p.name+'</span>' +
        '<span class="card-desc">'+p.desc+'</span>' +
        '<span class="card-price">'+p.price+'</span>' +
      '</span>' +
    '</button>';
}

function pageHtml(page){
  if(page.type === 'cover'){
    return '' +
      '<div class="cover-wrap">' +
        '<div class="emblem">'+EMBLEM+'</div>' +
        '<div class="kicker">Software a la medida</div>' +
        '<h2>Altus</h2>' +
        '<p class="sub">Catálogo de servicios: productos, módulos e integraciones para digitalizar tu negocio.</p>' +
        '<div class="cover-rule"></div>' +
        '<button class="cover-cta" data-cover-open type="button">Abrir catálogo</button>' +
      '</div>' +
      '<div class="cover-foot">Edición 2026 &middot; 11 servicios</div>';
  }
  if(page.type === 'index'){
    var html = '<div class="idx-eyebrow">Contenido</div><h2 class="idx-title">Índice</h2><ul class="idx-list">';
    CATS.forEach(function(c){
      var n = productsFor(c.key).length;
      html += '' +
        '<li>' +
          '<button class="idx-row" data-goto="'+CAT_PAGE[c.key]+'" type="button">' +
            '<span class="idx-dot '+c.tab+'"></span>' +
            '<span class="idx-name">'+c.label+'</span>' +
            '<span class="idx-leader"></span>' +
            '<span class="idx-count">'+n+' servicio'+(n === 1 ? '' : 's')+'</span>' +
            '<span class="idx-ref">'+pad(PAGE_NO[c.key])+'</span>' +
          '</button>' +
        '</li>';
    });
    html += '</ul><div class="idx-note">Precios en pesos mexicanos, de referencia. La cotización final se ajusta al alcance de cada proyecto.</div>';
    return html;
  }
  if(page.type === 'cat'){
    var c = page.cat;
    var items = productsFor(c.key);
    return '' +
      '<div class="cat-eyebrow"><span class="cat-dot '+c.tab+'"></span><span class="cat-label">Categoría '+(CATS.indexOf(c)+1)+'</span></div>' +
      '<h2 class="cat-title">'+c.label+'</h2>' +
      '<div class="'+cardsClassFor(items.length)+'">' + items.map(renderCard).join('') + '</div>' +
      '<div class="foot-bar"><span class="foot-ref">'+pad(PAGE_NO[c.key])+'</span></div>';
  }
  if(page.type === 'catcombo'){
    var html2 = '<div class="combo-wrap">';
    page.cats.forEach(function(c2){
      var items2 = productsFor(c2.key);
      html2 += '' +
        '<div class="combo-section">' +
          '<div class="cat-eyebrow"><span class="cat-dot '+c2.tab+'"></span><span class="cat-label">Categoría '+(CATS.indexOf(c2)+1)+'</span></div>' +
          '<h3 class="combo-title">'+c2.label+'</h3>' +
          '<div class="cards n2">' + items2.map(renderCard).join('') + '</div>' +
        '</div>';
    });
    html2 += '</div><div class="foot-bar"><span class="foot-ref">'+pad(PAGE_NO[page.cats[0].key])+'</span></div>';
    return html2;
  }
  if(page.type === 'back'){
    return '' +
      '<div class="back-wrap">' +
        '<div class="emblem">'+EMBLEM+'</div>' +
        '<h2>Gracias por hojear nuestro catálogo</h2>' +
        '<p>Cada servicio se adapta al tamaño y las necesidades de tu negocio. Conversemos sobre tu proyecto.</p>' +
      '</div>';
  }
  return '';
}
