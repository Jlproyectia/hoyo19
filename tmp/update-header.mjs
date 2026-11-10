import fs from 'node:fs';
const file='dist/index.html';let html=fs.readFileSync(file,'utf8');
const arrow='<span class="action-arrow" aria-hidden="true">↗</span>';
html=html.replace('<script src="app.js" defer>','<link rel="stylesheet" href="header-hero.css?v=1"><script src="app.js?v=6" defer>');
html=html.replace(/<header class="site-header">[\s\S]*?<\/header>/,`<header class="site-header corte-header">
<div class="header-left"><button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-navigation"><span class="hamburger" aria-hidden="true"></span><span class="menu-label">Menú</span></button><a class="header-call" href="tel:+34622797207" aria-label="Llamar a Hoyo 19"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2Z"/></svg></a></div>
<a class="header-brand" href="#inicio" aria-label="Hoyo 19, inicio"><span>Hoyo 19</span><small>RESTAURANTE · MIJAS</small></a>
<button class="header-reserve" data-dialog="reserve-dialog">Reservar <span aria-hidden="true">↗</span></button>
<nav id="main-navigation" aria-label="Principal" hidden><p>HOYO 19 · A TU GUSTO</p><a href="carta.html">La carta <span>↗</span></a><a href="#cocina">Para compartir <span>↗</span></a><a href="#espacio">El lugar <span>↗</span></a><a href="#celebrar">Celebraciones <span>↗</span></a><a href="#visitanos">Encuéntranos <span>↗</span></a><a class="nav-phone" href="tel:+34622797207">+34 622 79 72 07</a></nav>
</header>`);
html=html.replace(/<section class="collage-hero"[\s\S]*?<\/section>/,`<section class="welcome-hero" id="inicio" aria-labelledby="home-title">
<img class="welcome-photo" src="assets/salon.png" alt="El salón de Hoyo 19, con sus mesas preparadas" fetchpriority="high">
<div class="welcome-meta"><span><i aria-hidden="true"></i> COCINA ANDALUZA</span><span>MIJAS · COSTA DEL SOL</span></div>
<div class="welcome-content"><p class="welcome-eyebrow">LA BUENA MESA. LA MEJOR COMPAÑÍA.</p><h1 id="home-title"><span>Aquí se viene a</span><em>compartir.</em></h1><div class="welcome-actions"><a class="pill-action pill-light" href="carta.html">Descubrir la carta ${arrow}</a><button class="pill-action pill-wine" data-dialog="reserve-dialog">Reservar mesa ${arrow}</button></div></div>
<span class="welcome-side">EL SUR. LA MESA. EL MOMENTO.</span>
</section><div class="welcome-ribbon" aria-label="Cocina de siempre, momentos para compartir"><div class="ribbon-track">${Array.from({length:4},()=>'<span aria-hidden="true">COCINA DE SIEMPRE <i>✳</i> MOMENTOS PARA COMPARTIR <i>✳</i> SABOR A MIJAS <i>✳</i></span>').join('')}</div></div>`);
html=html.replace('<dialog id="photo-dialog"',`<dialog id="reserve-dialog" class="reserve-dialog" aria-labelledby="reserve-title"><button class="dialog-close" aria-label="Cerrar reservas">×</button><p class="eyebrow">UN SITIO PARA TI</p><h2 id="reserve-title">Nos vemos<br><em>a la mesa.</em></h2><p>Llama al equipo para consultar disponibilidad y reservar tu mesa.</p><a class="pill-action pill-wine" href="tel:+34622797207">+34 622 79 72 07 ${arrow}</a><p class="reserve-note">La reserva se confirma directamente con el restaurante.</p></dialog>\n<dialog id="photo-dialog"`);
fs.writeFileSync(file,html);
let js=fs.readFileSync('dist/app.js','utf8');
const start=js.indexOf("navToggle.addEventListener('click'");const end=js.indexOf('const openDialog=',start);
js=js.slice(0,start)+`function setNavigation(open){
 nav.hidden=!open;nav.classList.toggle('open',open);
 navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
}
navToggle.addEventListener('click',()=>setNavigation(navToggle.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setNavigation(false)));
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))setNavigation(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){setNavigation(false);navToggle.focus();}});
`+js.slice(end);
js=js.replace('const openDialog=dialog=>{dialog.showModal();','const openDialog=dialog=>{setNavigation(false);dialog.showModal();');
fs.writeFileSync('dist/app.js',js);
