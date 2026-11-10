const mapsUrl='https://www.google.com/maps/place/Restaurante+Hoyo+19/@36.5438292,-4.6576466,17z/data=!4m6!3m5!1s0xd72e12d3b2b78cd:0xd530636affbddd50!8m2!3d36.5438292!4d-4.6550717!16s%2Fg%2F1td1wsxg';
document.querySelectorAll('.maps-link').forEach(a=>{a.href=mapsUrl;a.target='_blank';a.rel='noopener';});
const categoryContainer=document.querySelector('#menu-categories');
if(categoryContainer){
let selected=new URLSearchParams(location.search).get('categoria')||'Entrantes';
if(!window.menuData.some(c=>c.name===selected))selected='Entrantes';
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lastGroup='';
window.menuData.forEach(category=>{
 if(category.group!==lastGroup){let label=document.createElement('p');label.className='category-group';label.textContent=category.group;categoryContainer.append(label);lastGroup=category.group;}
 const button=document.createElement('button');button.className='category-button';button.setAttribute('aria-pressed',String(category.name===selected));button.innerHTML=escapeHtml(category.name)+'<span aria-hidden="true">↗</span>';button.addEventListener('click',()=>{selected=category.name;document.querySelector('#dish-search').value='';renderMenu();});button.dataset.name=category.name;categoryContainer.append(button);
});
function renderMenu(){
 const query=normalize(document.querySelector('#dish-search').value.trim());
 const current=window.menuData.find(c=>c.name===selected);
 let items=query?window.menuData.flatMap(c=>c.items.filter(item=>normalize(item.join(' ')).includes(query)).map(item=>({item,category:c.name}))):current.items.map(item=>({item,category:current.name}));
 document.querySelector('#category-title').textContent=query?'En la carta':current.name;
 document.querySelector('#menu-count').textContent=items.length+' '+(items.length===1?'propuesta':'propuestas');
 const note=document.querySelector('#category-note');note.hidden=query||!current.note;note.textContent=current.note||'';
 document.querySelectorAll('.category-button').forEach(b=>b.setAttribute('aria-pressed',String(!query&&b.dataset.name===selected)));
 document.querySelector('#menu-items').innerHTML=items.map(({item,category})=>'<article class="menu-item"><div><h4>'+escapeHtml(item[0])+'</h4>'+(item[2]?'<p>'+escapeHtml(item[2])+'</p>':'')+(query?'<p>'+escapeHtml(category)+'</p>':'')+'</div><span class="price">'+(item[1]?escapeHtml(item[1])+' €':'Consultar')+'</span></article>').join('');
 document.querySelector('#no-results').hidden=items.length>0;
}
document.querySelector('#dish-search').addEventListener('input',renderMenu);renderMenu();
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.category;document.querySelector('#dish-search').value='';renderMenu();document.querySelector('#carta').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
}
const navToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('header nav');
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Abrir menú');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Abrir menú');}});
const openDialog=dialog=>{dialog.showModal();document.body.classList.add('modal-open');};
document.querySelectorAll('[data-dialog]').forEach(b=>b.addEventListener('click',()=>openDialog(document.getElementById(b.dataset.dialog))));
document.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{const dialog=document.querySelector('#photo-dialog');dialog.querySelector('img').src=b.dataset.image;dialog.querySelector('img').alt=b.dataset.caption;dialog.querySelector('p').textContent=b.dataset.caption;openDialog(dialog);}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.intro-grid,.section-heading,.dish,.breakfast-copy,.space-bottom,.service-list>div').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const header=document.querySelector('.site-header'),dock=document.querySelector('.reservation-dock'),progress=document.querySelector('.reading-progress span'),heroPhoto=document.querySelector('.hero-photo');
let scrollFrame=0;
function updateScroll(){const y=window.scrollY,max=document.documentElement.scrollHeight-innerHeight;header.classList.toggle('scrolled',y>70);dock.classList.toggle('shown',y>600);progress.style.transform='scaleX('+(max>0?Math.min(y/max,1):0)+')';if(heroPhoto&&!reducedMotion.matches&&innerWidth>760&&y<1100){heroPhoto.style.setProperty('--photo-y',Math.min(y*.08,45)+'px');}scrollFrame=0;}
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});addEventListener('resize',updateScroll);updateScroll();
if(matchMedia('(hover:hover)').matches&&!reducedMotion.matches){document.querySelectorAll('.image-button').forEach(el=>{let frame=0;el.addEventListener('pointermove',event=>{if(frame)return;frame=requestAnimationFrame(()=>{const rect=el.getBoundingClientRect();el.style.setProperty('--pointer-x',(event.clientX-rect.left)+'px');el.style.setProperty('--pointer-y',(event.clientY-rect.top)+'px');frame=0;});},{passive:true});});}

const tableSection=document.querySelector('.shared-table');
if(tableSection && !reducedMotion.matches){const tableObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('arrived');tableObserver.unobserve(e.target);}},{threshold:.2});tableSection.classList.add('motion-ready');tableObserver.observe(tableSection);}

if(!reducedMotion.matches && 'IntersectionObserver' in window){
 document.documentElement.classList.add('motion-enabled');
 document.querySelectorAll('#table-title,#morning-title,#venue-title').forEach(title=>{
  title.setAttribute('aria-label',title.innerText.replace(/\s+/g,' ').trim());
  let wordIndex=0;
  const fragment=document.createDocumentFragment();
  for(const node of [...title.childNodes]){
   if(node.nodeName==='BR'){fragment.append(document.createElement('br'));continue;}
   for(const part of node.textContent.split(/(\s+)/)){
    if(!part.trim()){fragment.append(document.createTextNode(part));continue;}
    const mask=document.createElement('span'),word=document.createElement('span');
    mask.className='kinetic-mask';mask.setAttribute('aria-hidden','true');word.className='kinetic-word';word.textContent=part;word.style.setProperty('--word-delay',(wordIndex++*.075)+'s');mask.append(word);fragment.append(mask);
   }
  }
  title.replaceChildren(fragment);
 });
 const morningObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('motion-visible');morningObserver.unobserve(e.target);}}},{threshold:.01});
 document.querySelectorAll('.morning-eyebrow,.morning h2,.morning-photo,.morning-caption,.morning-cta,.morning-footer,.venue-enter').forEach(el=>morningObserver.observe(el));
 const collage=document.querySelector('.collage-hero');let motionFrame=0;
 const moveHero=()=>{motionFrame=0;if(!collage||reducedMotion.matches)return;const rect=collage.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const amount=Math.max(0,-rect.top);collage.style.setProperty('--hero-drift',Math.min(amount*.045,24)+'px');collage.style.setProperty('--plate-drift',-Math.min(amount*.025,14)+'px');};
 addEventListener('scroll',()=>{if(!motionFrame)motionFrame=requestAnimationFrame(moveHero);},{passive:true});
 reducedMotion.addEventListener('change',event=>{if(event.matches){document.documentElement.classList.remove('motion-enabled');document.querySelectorAll('.motion-ready').forEach(el=>el.classList.remove('motion-ready'));}});
}

// Keep the floating reservation bar clear of the main section actions.
if('IntersectionObserver' in window){
 const visibleActions=new Set();
 const actionObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visibleActions.add(entry.target);else visibleActions.delete(entry.target);}dock.classList.toggle('clear-action',visibleActions.size>0);},{threshold:.25});
 document.querySelectorAll('.venue-cta,.morning-cta,.table-menu-link').forEach(action=>actionObserver.observe(action));
}
