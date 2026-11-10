const fs=require('fs');
const file='dist/index.html';let s=fs.readFileSync(file,'utf8');
s=s.replace('<link rel="stylesheet" href="styles.css">','<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="home.css?v=3">');
s=s.replace(/<header class="site-header">[\s\S]*?<\/header>/,`<header class="site-header"><a class="new-logo" href="#inicio" aria-label="Hoyo 19, inicio"><small>RESTAURANTE</small><span>Hoyo 19</span><i aria-hidden="true">⌁</i><small>MIJAS</small></a><nav aria-label="Principal"><a href="#carta">La carta</a><a href="#espacio">El lugar</a><a href="#celebrar">Celebraciones</a></nav><a class="header-book" href="tel:+34622797207">Reservar mesa</a><button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">Menú <span>＋</span></button></header>`);
const start=s.indexOf('<section class="hero"');const end=s.indexOf('<section class="menu-section',start);
s=s.slice(0,start)+`<section class="collage-hero" id="inicio" aria-labelledby="home-title">
<div class="salon-window"><img src="assets/salon.png" alt="Recreación del salón de Hoyo 19" fetchpriority="high"></div>
<div class="steak-window"><img src="assets/chuleton.png" alt="Chuletón con patatas y pimientos, recreación IA"></div>
<h1 id="home-title"><span class="title-mask"><span>Aquí se viene a</span></span><span class="title-mask title-second"><span>compartir<i>.</i></span></span></h1>
<div class="hero-note"><span aria-hidden="true">❧</span><p>COCINA ANDALUZA<br>DE SIEMPRE,<br>PARA DISFRUTAR<br>SIN PRISAS.</p></div>
<div class="paella-layer"><img src="assets/paella-cutout.png" alt="Paella de marisco para compartir, recreación IA"></div>
<a class="glass-reserve" href="tel:+34622797207">Reservar mesa <span aria-hidden="true">⟶</span></a>
<a class="hero-scroll" href="#cocina">A LA MESA <span>↓</span></a>
</section>
<section class="shared-table" id="cocina" aria-labelledby="table-title">
<img class="table-backdrop" src="assets/mesa-limpia.png" alt="Mesa con ensalada de queso de cabra, croquetas y berenjenas a la miel, recreación IA" loading="lazy">
<div class="table-copy"><p class="eyebrow">PARA COMPARTIR</p><span class="olive-mark" aria-hidden="true">— ❧ —</span><h2 id="table-title">Un poco de todo.<br>Un rato juntos.</h2><p class="table-subtitle">Empieza por el centro de la mesa.</p><div class="glass-dishes"><span>Croquetas de pollo</span><i>/</i><span>Berenjenas a la miel</span><i>/</i><span>Ensalada de cabra</span></div><a class="table-menu-link" href="#carta">Ver carta <span aria-hidden="true">↗</span></a></div>
</section>
`+s.slice(end);
s=s.replace('content="#142e29"','content="#641712"');fs.writeFileSync(file,s);
let js=fs.readFileSync('dist/app.js','utf8');js=js.replace("if(!reducedMotion.matches&&innerWidth>760&&y<1100){heroPhoto.style", "if(heroPhoto&&!reducedMotion.matches&&innerWidth>760&&y<1100){heroPhoto.style");
js+=`\nconst tableSection=document.querySelector('.shared-table');
if(tableSection && !reducedMotion.matches){const tableObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('arrived');tableObserver.unobserve(e.target);}},{threshold:.2});tableSection.classList.add('motion-ready');tableObserver.observe(tableSection);}
`;fs.writeFileSync('dist/app.js',js);
