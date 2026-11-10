const categories=window.menuData;
const pictures=window.cartaImages;
const $=s=>document.querySelector(s);
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const imageFor=(category,name)=>pictures.find(p=>p.category===category&&p.name===name)||pictures.find(p=>p.name===name);
const photo=(p,size)=>'assets/carta-burdeos/web/'+p.id+'-'+size+'.webp';
let selected=new URLSearchParams(location.search).get('categoria')||'Entrantes';
if(!categories.some(c=>c.name===selected))selected='Entrantes';
let query='',currentItems=[];
const price=item=>item[1]?item[1]+' €':'Consultar';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){if(!reduced.matches)e.target.classList.add('reveal');observer.unobserve(e.target);}});},{threshold:.08}):null;
function closeSheet(){ $('#category-sheet').close(); }
function selectCategory(name,scroll=true){selected=name;query='';$('#dish-search').value='';closeSheet();const url=new URL(location.href);url.searchParams.set('categoria',name);history.replaceState(null,'',url);render();if(scroll)window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}
let lastGroup='';
for(const category of categories){
 const button=document.createElement('button');button.textContent=category.name;button.dataset.category=category.name;button.addEventListener('click',()=>selectCategory(category.name));$('#category-rail').append(button);
 if(category.group!==lastGroup){const p=document.createElement('p');p.className='sheet-group';p.textContent=category.group;$('#sheet-categories').append(p);lastGroup=category.group;}
 const row=document.createElement('button');row.className='sheet-category';row.innerHTML=escape(category.name)+'<span>'+category.items.length+' ↗</span>';row.addEventListener('click',()=>selectCategory(category.name));$('#sheet-categories').append(row);
}
function openDetail(index){const {item,category,picture}=currentItems[index];$('#detail-name').textContent=item[0];$('#detail-category').textContent=category;$('#detail-description').textContent=item[2]||'';$('#detail-description').hidden=!item[2];$('#detail-price').textContent=price(item);$('#detail-image').src=photo(picture,960);$('#detail-image').alt=item[0];$('#dish-detail').showModal();}
function render(){
 observer?.disconnect();
 const category=categories.find(c=>c.name===selected);
 currentItems=(query?categories.flatMap(c=>c.items.filter(item=>normalize(item.join(' ')).includes(normalize(query))).map(item=>({item,category:c.name}))):category.items.map(item=>({item,category:category.name}))).map(x=>({...x,picture:imageFor(x.category,x.item[0])}));
 if(!query&&selected==='Entrantes'){const index=currentItems.findIndex(x=>x.item[0]==='Gambas al pilpil');currentItems.unshift(...currentItems.splice(index,1));}
 $('#category-heading').textContent=query?'Tus antojos':selected;
 $('#result-count').textContent=currentItems.length+' '+(currentItems.length===1?'plato':'opciones');
 document.querySelectorAll('#category-rail button').forEach(b=>b.setAttribute('aria-pressed',String(!query&&b.dataset.category===selected)));
 const note=$('#category-note');note.textContent=query?'':category.note||'';note.hidden=!note.textContent;
 $('#empty').hidden=!!currentItems.length;
 const lead=currentItems[0];
 $('#featured').innerHTML=lead?'<article class="feature"><button class="feature-visual" data-dish="0" aria-label="Ver '+escape(lead.item[0])+'"><img src="'+photo(lead.picture,960)+'" width="960" height="1200" fetchpriority="high" alt="'+escape(lead.item[0])+'"></button><div class="feature-copy"><p class="feature-count">01 / '+String(currentItems.length).padStart(2,'0')+'</p><div class="feature-title-line"><h2>'+escape(lead.item[0])+'</h2><p class="feature-price">'+escape(price(lead.item))+'</p></div><p class="feature-description">'+escape(lead.item[2]||'El sabor de siempre.')+'</p><p class="feature-category">'+escape(lead.category)+'</p></div></article>':'';
 $('#dish-list').innerHTML=currentItems.slice(1).map(({item,picture},i)=>'<button class="dish-row" data-dish="'+(i+1)+'" aria-label="Ver '+escape(item[0])+', '+escape(price(item))+'"><img src="'+photo(picture,320)+'" alt="" width="320" height="400" loading="lazy" decoding="async"><span><span class="dish-name">'+escape(item[0])+'</span>'+(item[2]?'<span class="dish-description">'+escape(item[2])+'</span>':'')+'</span><span class="dish-price">'+escape(price(item))+'</span></button>').join('');
 document.querySelectorAll('[data-dish]').forEach(b=>b.addEventListener('click',()=>openDetail(Number(b.dataset.dish))));
 document.querySelectorAll('.dish-row').forEach(el=>observer?.observe(el));
}
$('#open-categories').addEventListener('click',()=>{$('#category-sheet').showModal();$('#category-sheet .close').focus();});
function search(){query=$('#dish-search').value.trim();closeSheet();render();window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}
$('#search-go').addEventListener('click',search);$('#dish-search').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();search();}});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});});
render();
