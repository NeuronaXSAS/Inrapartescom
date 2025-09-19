// Quick check: build search index from catalogo-data.js and test queries
const path = require('path');
const fs = require('fs');

// Prepare window for the catalog data script
global.window = {};

// Load the catalog data (populates window.PRODUCTOS_GENERADOS)
require(path.resolve(__dirname, '..', 'catalogo-data.js'));

const PRODUCTS = global.window.PRODUCTOS_GENERADOS || [];

const SEARCH_INDEX = [
  { url: 'index.html', title: 'Inicio', snippet: 'Fabricación y comercialización de racores, acoples, mangueras y válvulas. Piezas a medida. Tradición de calidad y seguridad.' },
  { url: 'catalogo.html', title: 'Catálogo de Productos', snippet: 'Catálogo completo de racores, acoples hidráulicos, acoples plásticos, válvulas, mangueras y tubería flexible.' },
  { url: 'piezas-medida.html', title: 'Piezas a tu Medida', snippet: 'Fabricaciones especiales, tornos CNC, asesoría técnica, cotización personalizada.' },
  { url: 'nosotros.html', title: 'Nosotros', snippet: 'Historia, valores, equipo, compromiso de calidad, innovación, responsabilidad ambiental.' },
  { url: 'test_carousel.html', title: 'Test Carousel', snippet: 'Prueba de carrusel de categorías y tarjetas.' },
];

(function addCoreCategories(){
  ['RACORES','ACOPLES HIDRÁULICOS','ACOPLES PLÁSTICOS','VÁLVULAS Y CHEQUES','MANGUERAS ENSAMBLADAS Y JUEGOS DE PUNTAS PARA MANGUERAS','MANGUERAS IMPORTADAS X METRO Y TUBERÍA DE COBRE FLEXIBLE']
    .forEach(cat=>{
      SEARCH_INDEX.push({ url: `catalogo.html?categoria=${encodeURIComponent(cat)}`, title: cat, snippet: 'Categoría del catálogo' });
    });
})();

function normalize(txt){
  return (txt||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'');
}

function addCodesAndMeasures(){
  const skip=/^(n\/?a|segun|según|cotiza)/i;
  PRODUCTS.forEach(p=>{
    const name=(p.nombre||'').trim();
    const cat=(p.categoria||'').trim();
    const code=(p.codigo||'').trim();
    if (code && !skip.test(code)) {
      SEARCH_INDEX.push({ url:`catalogo.html?search=${encodeURIComponent(code)}`, title:`${code} — ${name}`, snippet:`${cat} | Código: ${code}` });
    }
    const medidasArr = Array.isArray(p.medidas_array) ? p.medidas_array : [];
    medidasArr.forEach(line=>{
      const stripped = String(line).replace(/^\(|\)$/g,'').trim();
      const parts = stripped.split(',');
      const mCode = parts[0]?.trim();
      const measure = parts.slice(1).join(',').trim() || mCode;
      const query = mCode || measure;
      SEARCH_INDEX.push({
        url: `catalogo.html?search=${encodeURIComponent(query)}`,
        title: `${mCode || measure} — ${name}`,
        snippet: `${cat} | Medida: ${measure}`
      });
    });
  });
}

function performSearch(qRaw){
  const q = (qRaw||'').trim().toLowerCase();
  const tokens = (qRaw.match(/[A-Za-z0-9]+/g) || []).map(t=>t.toLowerCase());
  const results = SEARCH_INDEX.filter(item => {
    const t = (item.title||'');
    const s = (item.snippet||'');
    const baseLower = `${t} ${s}`.toLowerCase();
    const baseNorm = normalize(`${t} ${s}`);
    if (!tokens.length) return false;
    return tokens.every(tok => baseLower.includes(tok) || baseNorm.includes(tok));
  });
  return results;
}

addCodesAndMeasures();

const queries = [
  'PG06-04', 'PUC04', 'PUC06', 'PUC08', 'PUC10', 'PUC12', 'PUC16',
  'PUC5/32', 'PUC3/16', 'PUC1/4', 'PUC5/16', 'PUC3/8', 'PUC1/2', 'PUC5/8',
  '6mm - 4mm', '8mm - 8mm', '10mm - 10mm', '12mm - 12mm',
  'JUEGO PTAS. ENTERIZAS FRENO AIRE 3/8 , 1/4',
  'MANGUERA SAE J1402 3/8" X METRO'
];

for (const q of queries) {
  const res = performSearch(q);
  console.log(`\nQuery: ${q} -> ${res.length} result(s)`);
  res.slice(0,5).forEach((r,i)=>{
    console.log(`  [${i+1}] ${r.title} | ${r.snippet}`);
  });
}

// Summary: ensure at least one result exists for key items
const mustHave = ['PG06-04','PUC06','PUC1/2','JUEGO PTAS. ENTERIZAS FRENO AIRE 3/8 , 1/4'];
let ok = true;
for (const q of mustHave){
  const res = performSearch(q);
  if (!res.length) { ok = false; console.error(`Missing expected results for: ${q}`); }
}
process.exit(ok ? 0 : 1);
