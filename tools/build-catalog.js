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
  const str = String(medidas).trim();
  // Usar regex para extraer todos los grupos entre paréntesis como una sola opción
  const out = [];
  const regex = /\(([^)]*)\)/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    out.push(`(${match[1].trim()})`);
  }
  if (out.length) return out;
  // Si no hay paréntesis, separar por comas simples
  return str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
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

function normalizeFilenameForMatch(name) {
  const withoutDoubleExt = name.replace(/\.(jpg|jpeg)\.(png)$/i, '.$2');
  const forcePng = withoutDoubleExt.replace(/\.(jpg|jpeg)$/i, '.png');
  return forcePng
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9()_.\- ]/g, '')
    .trim();
}

function resolveImagePath(category, imageName) {
  if (!imageName || /N\/A/i.test(imageName)) return '';
  const catDir = path.join(IMG_ROOT, category);
  // Try exact and minor cleanup
  const cleanImage = imageName.replace(/\s+/g, ' ').trim()
    .replace(/\.(jpg|jpeg)\.(png)$/i, '.png')
    .replace(/\.(jpg|jpeg)$/i, '.png');
  const exactPath = path.join(catDir, cleanImage);
  if (fs.existsSync(exactPath)) return exactPath.replace(/\\/g, '/');

  // Flexible match over directory listing
  if (!fs.existsSync(catDir)) return path.join(IMG_ROOT, category, cleanImage).replace(/\\/g, '/');
  const target = normalizeFilenameForMatch(cleanImage);
  const files = fs.readdirSync(catDir);
  let best = '';
  for (const f of files) {
    const cand = normalizeFilenameForMatch(f);
    if (cand === target) { best = f; break; }
  }
  if (!best) {
    // Try relaxed: compare without spaces and punctuation except alnum
    const relax = (s) => s.replace(/[^a-z0-9]/g, '');
    const t2 = relax(target);
    for (const f of files) {
      if (relax(normalizeFilenameForMatch(f)) === t2) { best = f; break; }
    }
  }
  if (best) {
    const p = path.join(catDir, best).replace(/\\/g, '/');
    return p;
  }
  // Fallback to constructed even if not exists (helps detect issues)
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

  const imagenPath = resolveImagePath(categoria, b.imagen);
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
