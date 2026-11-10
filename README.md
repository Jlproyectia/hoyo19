# Hoyo 19

Web del restaurante Hoyo 19 en español, desarrollada con HTML, CSS y JavaScript sin dependencias de ejecución.

## Arrancar en local

Requiere Node.js. Desde la raíz del proyecto:

```sh
npm run dev
```

Abrir http://127.0.0.1:4173. La carta está en `/carta.html` y la galería en `/galeria-carta.html`. El servidor sirve la carpeta `dist`.

## Contenido

- Homepage con hero, secciones para compartir, desayunos, el local y contacto.
- Carta independiente en burdeos, adaptada a móvil, con 19 categorías, búsqueda, fichas ampliables y selector de categorías.
- 173 entradas de carta asociadas a 163 imágenes de productos, con originales y versiones WebP optimizadas.
- Animaciones de entrada y desplazamiento, controles de cristal y soporte para movimiento reducido.
- Diseños y capturas en `design/`; investigación, fuentes y licencias en `research/`.
- Utilidades de preparación en `tmp/`. La optimización de imágenes requiere Sharp; los archivos optimizados ya están incluidos.

Para publicar la web con un alojamiento estático, utilizar `dist/` como directorio público. Subir este repositorio no activa por sí solo un alojamiento web.

## Validación

```sh
npm run check
```

La interfaz se ha comprobado en móvil, incluyendo categorías, búsqueda y detalle de producto.

## Material visual y fuentes

Las imágenes de producto son propuestas generadas para el diseño. Sus originales tienen aproximadamente 1122 × 1402 píxeles, no 4K. El inventario y las dimensiones se conservan en los manifiestos de los recursos. Algunos productos sin composición documentada tienen propuestas pendientes de confirmar; consultar los datos de generación. Precios y contenido requieren la revisión del restaurante antes de la publicación comercial.

Cormorant Garamond y Manrope se alojan localmente bajo SIL Open Font License; licencias en `research/fonts/`. La investigación y sus limitaciones están en `research/INFORME.md`.
