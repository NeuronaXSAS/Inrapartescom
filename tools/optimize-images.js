// Script de optimización de imágenes del collage de 'nosotros'
// Genera versiones webp y jpg comprimidas (quality 70) con ancho máximo 800 px.
// Uso: npx cross-env NODE_ENV=production node tools/optimize-images.js

const fs = require('fs');
const path = require('path');
let sharp; // Carga diferida para permitir aviso si no instalado

(async () => {
  try { sharp = require('sharp'); } catch (e) {
    console.error('\n[optimize-images] Falta la dependencia sharp. Instala con: npm i -D sharp\n');
    process.exit(1);
  }

  const SRC_DIR = path.join(__dirname, '..', 'Recursos_finales', 'nosotros_collage');
  const OUT_DIR = path.join(__dirname, '..', 'Recursos_finales', 'nosotros_collage_optim');

  if (!fs.existsSync(SRC_DIR)) {
    console.error('[optimize-images] Carpeta de origen no encontrada:', SRC_DIR);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(SRC_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
  if (!files.length) {
    console.log('[optimize-images] No se encontraron imágenes para optimizar.');
    return;
  }

  console.log(`[optimize-images] Procesando ${files.length} imágenes...`);

  for (const file of files) {
    const srcPath = path.join(SRC_DIR, file);
    const base = file.replace(/\.[^.]+$/, '');
    const outBase = path.join(OUT_DIR, base);

    try {
      const image = sharp(srcPath).rotate();
      const metadata = await image.metadata();
      const width = metadata.width || 0;
      const target = width > 800 ? 800 : width; // Si es menor a 800 mantiene tamaño

      // JPG optimizado
      await image
        .resize(target, null, { withoutEnlargement: true })
        .jpeg({ quality: 70, mozjpeg: true })
        .toFile(outBase + '-800.jpg');

      // WEBP optimizado
      await sharp(srcPath)
        .resize(target, null, { withoutEnlargement: true })
        .webp({ quality: 65 })
        .toFile(outBase + '-800.webp');

      console.log('✔ Optimizada:', file);
    } catch (err) {
      console.error('✖ Error con', file, err.message);
    }
  }

  console.log('\n[optimize-images] Listo. Actualiza las rutas si decides usar la carpeta _optim.');
})();
