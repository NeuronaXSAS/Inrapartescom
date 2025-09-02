/*
  Build Catalog Data
  - Parses files under `catalog/*.txt` with blocks separated by `---`
  - Expected keys: IMAGEN, CÓDIGO, NOMBRE, MATERIAL, MEDIDAS, CATEGORIA
  - Emits `catalogo-data.js` defining window.PRODUCTOS_GENERADOS = [...]
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_DIR = path.join(ROOT, 'catalog');
const IMG_ROOT = path.join('Recursos_finales', 'catalogo_m_agua');
const OUTPUT = path.join(ROOT, 'catalogo-data.js');

// Categories expected (folder names)
const EXPECTED_CATEGORIES = new Set([
  'ACOPLES HIDRÁULICOS',
  'ACOPLES PLÁSTICOS',
  'MANGUERAS IMPORTADAS X METRO Y TUBERÍA DE COBRE FLEXIBLE',
  'MANGUERAS Y TUBERÍA FLEXIBLE',
  'RACORES',
  'VÁLVULAS Y CHEQUES'
]);

function readTxtFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.txt'))
    .map((d) => path.join(dir, d.name));
}

function normalizeValue(v) {
  return (v || '').toString().trim();
}

function parseBlocks(content) {
  // Split by lines containing only ---
  const rawBlocks = content
    .split(/\n\s*---\s*\n/g)
    .map((b) => b.trim())
    .filter(Boolean);
  return rawBlocks.map((block) => parseBlock(block));
}

function parseBlock(block) {
  const lines = block.split(/\r?\n/);
  const obj = { imagen: '', codigo: '', nombre: '', material: '', medidas: '', categoria: '' };
  lines.forEach((line) => {
    const m = line.match(/^\s*([^:]+):\s*(.*)$/);
    if (!m) return;
    const key = m[1].trim().toUpperCase();
    const val = normalizeValue(m[2]);
    switch (key) {
      case 'IMAGEN':
        obj.imagen = val;
        break;
      case 'CÓDIGO':
      case 'CODIGO':
        obj.codigo = val;
        break;
      case 'NOMBRE':
        obj.nombre = val;
        break;
      case 'MATERIAL':
        obj.material = val;
        break;
      case 'MEDIDAS':
        obj.medidas = val;
        break;
      case 'CATEGORIA':
      case 'CATEGORÍA':
        obj.categoria = val;
        break;
      default:
        break;
    }
  });
  return obj;
}

function medidasToArray(medidas) {
  if (!medidas || /N\/A/i.test(medidas)) return [];
  // Remove enclosing parentheses and split on '),'
  const cleaned = medidas
    .replace(/^\(/g, '')
    .replace(/\)$/g, '')
    .replace(/\)\s*,/g, '),');
  const parts = cleaned
    .split(',')
    .map((s) => s.replace(/^\(/, '').replace(/\)$/, '').trim())
    .filter(Boolean);
  return parts;
}

function ensureCategory(fileCategory, dataCategory) {
  // Prefer explicit category from data if valid; else derive from file name
  const candidate = normalizeValue(dataCategory) || normalizeValue(fileCategory);
  if (!candidate) return '';
  // If candidate is one of expected, return as-is; else try to map common alternatives
  if (EXPECTED_CATEGORIES.has(candidate)) return candidate;
  // Map simple aliases
  const alias = candidate.toUpperCase();
  if (alias.includes('RACOR')) return 'RACORES';
  if (alias.includes('HIDRÁUL') || alias.includes('HIDRAUL')) return 'ACOPLES HIDRÁULICOS';
  if (alias.includes('PLÁST') || alias.includes('PLAST')) return 'ACOPLES PLÁSTICOS';
  if (alias.includes('VÁLV') || alias.includes('VALV') || alias.includes('CHEQUE')) return 'VÁLVULAS Y CHEQUES';
  if (alias.includes('MANGUERA') && alias.includes('IMPORT')) return 'MANGUERAS IMPORTADAS X METRO Y TUBERÍA DE COBRE FLEXIBLE';
  if (alias.includes('MANGUERA') || alias.includes('TUBERÍA') || alias.includes('TUBERIA')) return 'MANGUERAS Y TUBERÍA FLEXIBLE';
  return candidate; // fallback
}

function toImagePath(category, imageName) {
  if (!imageName || /N\/A/i.test(imageName)) return '';
  // Some image names may include quotes or extra spaces
  const cleanImage = imageName.replace(/\s+/g, ' ').trim();
  return path.join(IMG_ROOT, category, cleanImage).replace(/\\/g, '/');
}

function build() {
  const files = readTxtFiles(CATALOG_DIR);
  let idCounter = 1;
  const items = [];

  files.forEach((filePath) => {
    const fileName = path.basename(filePath, '.txt');
    const fileCategory = fileName; // Use file name as commercial category
    const text = fs.readFileSync(filePath, 'utf8');
    const blocks = parseBlocks(text);

    blocks.forEach((b) => {
      // Skip empty or placeholder blocks
      const hasName = b.nombre && !/^N\/A$/i.test(b.nombre);
      const hasCode = b.codigo && !/^N\/A$/i.test(b.codigo);
      const hasImage = b.imagen && !/^N\/A$/i.test(b.imagen);
      const categoria = ensureCategory(fileCategory, b.categoria);

      const imagenPath = toImagePath(categoria, b.imagen);
      const medidas_array = medidasToArray(b.medidas);

      items.push({
        id: idCounter++,
        codigo: normalizeValue(b.codigo) || '',
        nombre: hasName ? normalizeValue(b.nombre) : (hasCode ? normalizeValue(b.codigo) : ''),
        material: normalizeValue(b.material) || '',
        categoria,
        medidas: normalizeValue(b.medidas) || '',
        medidas_array,
        imagen: imagenPath
      });
    });
  });

  const out = `// Generado automáticamente por tools/build-catalog.js\n` +
    `window.PRODUCTOS_GENERADOS = ${JSON.stringify(items, null, 2)};\n`;
  fs.writeFileSync(OUTPUT, out, 'utf8');
  console.log(`✅ Generado ${OUTPUT} con ${items.length} productos.`);
}

build();
