const fs = require('node:fs');
for (const file of ['dist/index.html', 'dist/carta.html']) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/<dialog id="credits-dialog">[\s\S]*?<\/dialog>\r?\n?/, '');
  text = text.replace('<button data-dialog="credits-dialog">Imágenes y fuentes</button>', '');
  text = text.replaceAll(', recreación IA', '').replaceAll('Recreación del salón', 'Salón').replaceAll('Recreación de una mesa', 'Mesa').replaceAll('Detalle recreado de la cerámica', 'Detalle de la cerámica');
  fs.writeFileSync(file, text);
}
let gallery = fs.readFileSync('dist/galeria-carta.html', 'utf8');
gallery = gallery.replaceAll('Imágenes de la carta', 'Se come con los ojos.');
gallery = gallery.replace('HOYO 19 · COLECCIÓN BURDEOS', 'HOYO 19 · ABRE EL APETITO');
gallery = gallery.replace('Recreaciones con IA para la nueva carta. Pulsa una imagen para abrir el original.', 'Date un paseo por nuestros sabores. Mira de cerca, elige tu antojo y ven con hambre.');
gallery = gallery.replace("selected.length+' imágenes · Colección completa · Resolución nativa aproximada: 1122 × 1402 px.'", "category==='Todas' ? 'Para compartir, para saborear, para volver.' : category+' · ¿Por cuál empezamos?' ");
fs.writeFileSync('dist/galeria-carta.html', gallery);
