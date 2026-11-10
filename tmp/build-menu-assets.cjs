const fs=require('node:fs');
const sharp=require('sharp');
const root='dist/assets/carta-burdeos';
const {tasks}=JSON.parse(fs.readFileSync(root+'/manifest.json','utf8'));
fs.mkdirSync(root+'/web',{recursive:true});
(async()=>{for(const t of tasks){for(const width of [320,960]){const out=root+'/web/'+t.id+'-'+width+'.webp';if(!fs.existsSync(out))await sharp(root+'/'+t.id+'.png').resize({width,withoutEnlargement:true}).webp({quality:width===320?76:85}).toFile(out);}}fs.writeFileSync('dist/carta-images.js','window.cartaImages='+JSON.stringify(tasks.map(({category,name,id})=>({category,name,id})))+';');console.log('163 productos optimizados para móvil.');})();
