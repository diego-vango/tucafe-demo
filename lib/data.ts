import { Product, GrindType, WeightFormat, ProductCategory } from '@/types/coffee';

export const GRIND_OPTIONS: { id: GrindType; label: string; description: string; icon: string }[] = [
  { id: 'En Grano', label: 'En Grano', description: 'Conserva el aroma y frescura al máximo para moler en casa.', icon: '🫘' },
  { id: 'Molido Fino (Espresso)', label: 'Molido Fino (Espresso)', description: 'Ideal para máquinas espresso y cafetera Moka.', icon: '☕' },
  { id: 'Molido Medio (Filtro)', label: 'Molido Medio (Filtro)', description: 'Para cafetera de goteo, V60, Chemex y Melitta.', icon: '🧪' },
  { id: 'Molido Grueso (Prensa)', label: 'Molido Grueso (Prensa)', description: 'Molienda gruesa para Prensa Francesa y Cold Brew.', icon: '🫖' },
];

export const INITIAL_PRODUCTS: Product[] = [];

export function calculateFormatPrice(product: Product, format: WeightFormat): number {
  if (format === '250g' && product.price250g && product.price250g > 0) {
    return product.price250g;
  }
  if (format === '500g' && product.price500g && product.price500g > 0) {
    return product.price500g;
  }
  if (format === '1kg' && product.price1kg && product.price1kg > 0) {
    return product.price1kg;
  }
  // Fallbacks if specific variant price is not defined
  if (format === '250g') return product.price250g || product.price;
  if (format === '500g') return product.price500g || product.price250g || product.price;
  if (format === '1kg') return product.price1kg || product.price500g || product.price250g || product.price;
  return product.price;
}

// URL por defecto priorizando la Variable de Entorno de Cloudflare
export const DEFAULT_SHEET_CSV_URL = 
  process.env.NEXT_PUBLIC_PRODUCTS_CSV_URL || 
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-5wO1sN9iEcY3JWuvFfdj7QYcecFo_WggRXtONNGe0kJ0BqWn8l0A2ZVc4GKsyyUSqJ5tOAZzYfQi/pub?gid=0&single=true&output=csv';

/**
 * Robust CSV Line Parser that handles quotes and line breaks
 */
function parseCsvRows(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(current.trim());
      if (row.some(f => f.length > 0)) {
        result.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current || row.length > 0) {
    row.push(current.trim());
    if (row.some(f => f.length > 0)) {
      result.push(row);
    }
  }

  return result;
}

/**
 * Fetch catalog strictly from Google Sheets CSV URL. Returns empty array if failed or empty.
 */
export async function fetchCatalogFromCsv(csvUrl?: string): Promise<Product[]> {
  const targetUrl = (csvUrl && csvUrl.trim()) ? csvUrl.trim() : DEFAULT_SHEET_CSV_URL;

  try {
    const response = await fetch(targetUrl, { 
      cache: 'no-store',
      headers: { 'Pragma': 'no-cache' }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    
    const rows = parseCsvRows(text);
    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.toLowerCase().replace(/["']/g, '').trim());
    
    const products: Product[] = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (values.length < 2) continue;

      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });

      const rawId = row['id'] || row['codigo'] || `prod-${i}`;
      const name = row['nombre'] || row['title'] || row['producto'] || row['name'] || `Café ${i}`;
      if (!name || (name === `Café ${i}` && !row['nombre'])) {
        if (!values.some(v => v.trim().length > 0)) continue;
      }

      // Variant prices: precio_250g, precio_500g, precio_1kg
      const parsePrice = (rawStr?: string) => {
        if (!rawStr) return undefined;
        const num = parseInt(rawStr.replace(/[^0-9]/g, ''), 10);
        return (!isNaN(num) && num > 0) ? num : undefined;
      };

      const price250g = parsePrice(row['precio_250g'] || row['precio_250'] || row['precio']);
      const price500g = parsePrice(row['precio_500g'] || row['precio_500']);
      const price1kg = parsePrice(row['precio_1kg'] || row['precio_1000g'] || row['precio_1k']);

      // Base display price
      const basePrice = price250g || price500g || price1kg || 10000;

      const description = row['descripcion'] || row['description'] || 'Café de especialidad tostado artesanalmente en La Serena.';
      
      // Parse moliendas_disponibles
      const rawMoliendas = row['moliendas_disponibles'] || row['moliendas'] || row['molienda'] || '';
      const moliendasDisponibles = rawMoliendas
        ? rawMoliendas.split(',').map(s => s.trim()).filter(Boolean)
        : ['En Grano', 'Molido Fino (Espresso)', 'Molido Medio (Filtro)', 'Molido Grueso (Prensa)'];

      // Images handling: imagen_url, imagen_url_2, imagen_url_3, imagen_url_4
      const img1 = row['imagen_url'] || row['imagen'] || row['image'] || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800';
      const img2 = row['imagen_url_2'] || row['imagen2'] || row['image2'] || '';
      const img3 = row['imagen_url_3'] || row['imagen3'] || row['image3'] || '';
      const img4 = row['imagen_url_4'] || row['imagen4'] || row['image4'] || '';

      const rawImgList = [img1, img2, img3, img4].map(s => s.trim()).filter(Boolean);
      const images = Array.from(new Set(rawImgList));
      const mainImage = images[0] || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800';

      // Category handling tolerante a variantes ("cafe", "origen", "café de origen")
      const rawCategory = (row['categoria'] || row['category'] || 'cafe').toLowerCase();
      let category: ProductCategory = 'cafe';
      if (rawCategory.includes('pack')) {
        category = 'packs';
      } else if (rawCategory.includes('mayor') || rawCategory.includes('pormayor')) {
        category = 'pormayor';
      } else if (rawCategory.includes('origen') || rawCategory.includes('cafe') || rawCategory.includes('café')) {
        category = 'cafe';
      }

      // Stock handling
      const rawStock = row['stock'] !== undefined && row['stock'] !== '' ? row['stock'] : row['Stock'];
      let stock = 10;
      if (rawStock !== undefined && rawStock !== '') {
        const parsed = parseInt(rawStock.replace(/[^0-9-]/g, ''), 10);
        stock = isNaN(parsed) ? 0 : parsed;
      }

      let badge = row['badge'] || row['etiqueta'] || undefined;
      if (stock <= 0) {
        badge = 'AGOTADO';
      }

      const availableFormats: WeightFormat[] = [];
      if (price250g) availableFormats.push('250g');
      if (price500g) availableFormats.push('500g');
      if (price1kg) availableFormats.push('1kg');
      if (availableFormats.length === 0) {
        availableFormats.push('250g', '500g', '1kg');
      }

      const origin = row['origen'] || row['origin'] || row['country'] || 'La Serena';
      const flag = row['bandera'] || row['flag'] || '☕';
      const scaScore = row['puntaje'] ? parseFloat(row['puntaje']) : undefined;
      const notes = row['notas'] ? row['notas'].split(';').map(n => n.trim()) : undefined;

      products.push({
        id: rawId.startsWith('csv-') ? rawId : `csv-${i}-${rawId}`,
        name,
        category,
        price250g,
        price500g,
        price1kg,
        price: basePrice,
        origin,
        flag,
        scaScore,
        notes,
        badge,
        image: mainImage,
        images,
        description,
        moliendasDisponibles,
        availableFormats,
        stock,
      });
    }

    return products;
  } catch (error) {
    console.warn('Failed to parse Google Sheets CSV:', error);
    return [];
  }
}
