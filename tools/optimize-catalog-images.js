// Optimiza todas las imágenes del catálogo bajo 'fotos_organizadas' generando versiones -600.jpg y -600.webp
// Uso: node tools/optimize-catalog-images.js

const fs = require('fs');
const path = require('path');
let sharp;

(async () => {
  try { sharp = require('sharp'); } catch (e) {
    console.error('\n[optimize-catalog] Falta la dependencia sharp. Instala con: npm i -D sharp\n');
    process.exit(1);
  }

  const SRC_ROOT = path.join(__dirname, '..', 'fotos_organizadas');
  const OUT_ROOT = path.join(__dirname, '..', 'fotos_organizadas_optim');

  if (!fs.existsSync(SRC_ROOT)) {
    console.error('[optimize-catalog] Carpeta de origen no encontrada:', SRC_ROOT);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_ROOT)) fs.mkdirSync(OUT_ROOT, { recursive: true });

  /** Recorre recursivamente y devuelve rutas absolutas de imágenes */
  function listImages(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...listImages(abs));
      else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(abs);
    }
    return out;
  }

  const files = listImages(SRC_ROOT);
  if (!files.length) {
    console.log('[optimize-catalog] No se encontraron imágenes');
    return;
  }
  console.log(`[optimize-catalog] Procesando ${files.length} imágenes...`);

  for (const srcPath of files) {
    const rel = path.relative(SRC_ROOT, srcPath); // ej: 'fotos racores/B1.JPG'
    const relDir = path.dirname(rel);
    const base = path.basename(rel).replace(/\.[^.]+$/, '');
    const outDir = path.join(OUT_ROOT, relDir);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const jpgOut = path.join(outDir, `${base}-600.jpg`);
    const webpOut = path.join(outDir, `${base}-600.webp`);
    try {
      const image = sharp(srcPath).rotate();
      const metadata = await image.metadata();
      const width = metadata.width || 0;
      const target = width > 600 ? 600 : width;

      await image.resize(target, null, { withoutEnlargement: true })
        .jpeg({ quality: 72, mozjpeg: true })
        .toFile(jpgOut);
      await sharp(srcPath).resize(target, null, { withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(webpOut);
      console.log('✔', rel);
    } catch (err) {
      console.error('✖ Error con', rel, err.message);
    }
  }

  console.log('\n[optimize-catalog] Listo. Actualiza el render para usar la carpeta fotos_organizadas_optim.');
})();
