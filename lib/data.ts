import { Product, GrindType, WeightFormat, ProductCategory } from '@/types/coffee';

export const GRIND_OPTIONS: { id: GrindType; label: string; description: string; icon: string }[] = [
  { id: 'En Grano', label: 'En Grano', description: 'Conserva el aroma y frescura al máximo para moler en casa.', icon: '🫘' },
  { id: 'Espresso', label: 'Espresso (Fino)', description: 'Ideal para máquinas espresso y cafetera italiana/Moka.', icon: '☕' },
  { id: 'Filtro/Italiana', label: 'Filtro / V60 / Moka', description: 'Molienda media para cafetera de goteo, V60, Chemex y Moka.', icon: '🧪' },
  { id: 'Prensa Francesa', label: 'Prensa Francesa (Grueso)', description: 'Molienda gruesa para infusión lenta y Cold Brew.', icon: '🫖' },
];

export const WEIGHT_MULTIPLIERS: Record<WeightFormat, number> = {
  '250g': 1,
  '500g': 1.72, // Discounted per-gram price for 500g
  '1kg': 2.85,  // Bulk rate discount for 1kg
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'colombia-palo-rosa-decaf',
    name: 'Café Colombia Palo Rosa Decaf (Descafeinado Natural)',
    price: 12500,
    origin: 'Colombia',
    flag: '🇨🇴',
    scaScore: 84,
    notes: ['Caramelo', 'Caña de Azúcar', 'Cítrico Dulce'],
    category: 'cafe',
    badge: 'Descafeinado 100% Natural',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    description: 'Proceso de descafeinado 100% natural utilizando caña de azúcar (Ethyl Acetate natural). Conserva el cuerpo cremoso y una exquisita dulzura a caramelo sin cafeína.',
    availableFormats: ['250g', '500g', '1kg']
  },
  {
    id: 'ruanda-super-premium-86',
    name: 'Café Ruanda Super Premium 86 Pts',
    price: 12400,
    origin: 'Ruanda',
    flag: '🇷🇼',
    scaScore: 86,
    notes: ['Floral', 'Frutal', 'Acidez Media Elegante', 'Té Negro'],
    category: 'cafe',
    badge: '86 Pts SCA Top Grade',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    description: 'Cultivado en las colinas volcánicas de Ruanda a más de 1.800m sobre el nivel del mar. Taza excepcionalmente limpia y aromática con notas de bergamota y ciruela amarilla.',
    availableFormats: ['250g', '500g', '1kg']
  },
  {
    id: 'gran-cafe-jaguar-costa-rica',
    name: 'Gran Café Jaguar Costa Rica',
    price: 11400,
    origin: 'Costa Rica',
    flag: '🇨🇷',
    scaScore: 84.5,
    notes: ['Caña de Azúcar', 'Miel de Abeja', 'Manzana Verde', 'Avellanas'],
    category: 'cafe',
    badge: 'Tueste Medio Artesanal',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop',
    description: 'Proveniente de la famosa región de Tarrazú. Un café dulce y balanceado con acidez brillante y final prolongado a frutos secos acaramelados.',
    availableFormats: ['250g', '500g', '1kg']
  },
  {
    id: 'colombia-caldas-85',
    name: 'Colombia Caldas 85 Pts',
    price: 10900,
    origin: 'Colombia',
    flag: '🇨🇴',
    scaScore: 85,
    notes: ['Miel', 'Frutos Secos', 'Naranja Dulce', 'Cacao'],
    category: 'cafe',
    badge: 'Favorito Casa',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=800&auto=format&fit=crop',
    description: 'Grano Seleccionado de la región cafetera de Caldas. Presenta una taza redonda con notas intensas a chocolate de mesa y matices melosos.',
    availableFormats: ['250g', '500g', '1kg']
  },
  {
    id: 'brasil-boa-vista-natural',
    name: 'Brasil Boa Vista Natural',
    price: 10800,
    origin: 'Brasil',
    flag: '🇧🇷',
    scaScore: 84,
    notes: ['Chocolate Amargo', 'Cacao', 'Cuerpo Cremoso', 'Nuez'],
    category: 'cafe',
    badge: 'Crema Excelente',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
    description: 'Procesamiento natural directo desde Minas Gerais. Destaca por su bajísima acidez, gran cuerpo meloso y marcado aroma a chocolate y avellana tostada.',
    availableFormats: ['250g', '500g', '1kg']
  },
  {
    id: 'pack-3-origenes',
    name: 'PACK 3 Orígenes (3x500g)',
    price: 39700,
    originalPrice: 53500,
    origin: 'Varios Orígenes',
    flag: '🌎',
    notes: ['3 Bolsas de 500g', 'Colombia, Brasil y Costa Rica', 'Ahorro $13.800'],
    category: 'packs',
    badge: '¡OFERTA ESPECIAL!',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    description: 'El pack degustación definitivo para los amantes del buen café. Incluye 500g de Colombia Caldas, 500g de Brasil Boa Vista y 500g de Costa Rica Jaguar.',
    availableFormats: ['500g']
  },
  {
    id: 'pack-2kilos-brasil-boa-vista',
    name: 'PACK 2 Kilos Brasil Boa Vista',
    price: 48900,
    originalPrice: 57400,
    origin: 'Brasil',
    flag: '🇧🇷',
    notes: ['2 Bolsas de 1 Kg', 'Especial Oficina & Hogar', 'Cuerpo Cremoso'],
    category: 'packs',
    badge: 'MÁS VENDIDO',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=800&auto=format&fit=crop',
    description: 'Formato ahorro de 2 Kilogramos en bolsas selladas con válvula desgasificadora. Ideal para consumo diario con la mejor relación precio-calidad.',
    availableFormats: ['1kg']
  },
  {
    id: 'guatemala-huehuetenango-3k-granel',
    name: 'Café Guatemala Huehuetenango 3 Kilos Granel',
    price: 74600,
    origin: 'Guatemala',
    flag: '🇬🇹',
    scaScore: 85,
    notes: ['Chocolate con Leche', 'Almendras Tostadas', 'Ciruela'],
    category: 'pormayor',
    badge: 'POR MAYOR / CAFETERÍAS',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
    description: 'Formato especial a granel para cafeterías, restaurantes y empresas de La Serena / Coquimbo. Granos 100% de especialidad tostados a pedido.',
    availableFormats: ['1kg']
  }
];

export function calculateFormatPrice(product: Product, format: WeightFormat): number {
  if (product.category === 'packs' || product.category === 'pormayor') {
    return product.price;
  }
  const multiplier = WEIGHT_MULTIPLIERS[format] || 1;
  return Math.round(product.price * multiplier);
}

export const DEFAULT_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-5wO1sN9iEcY3JWuvFfdj7QYcecFo_WggRXtONNGe0kJ0BqWn8l0A2ZVc4GKsyyUSqJ5tOAZzYfQi/pub?gid=0&single=true&output=csv';

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
 * Fetch catalog from a Google Sheets exported CSV URL or return initial mock data
 */
export async function fetchCatalogFromCsv(csvUrl?: string): Promise<Product[]> {
  const targetUrl = (csvUrl && csvUrl.trim()) ? csvUrl.trim() : DEFAULT_SHEET_CSV_URL;

  try {
    const response = await fetch(targetUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    
    const rows = parseCsvRows(text);
    if (rows.length < 2) return INITIAL_PRODUCTS;

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
      
      let price = parseInt((row['precio'] || row['price'] || '10000').replace(/[^0-9]/g, ''), 10);
      if (isNaN(price)) price = 10000;

      const description = row['descripcion'] || row['description'] || 'Café de especialidad tostado artesanalmente en La Serena.';
      
      // Images handling: imagen_url, imagen_url_2, imagen_url_3, imagen_url_4
      const img1 = row['imagen_url'] || row['imagen'] || row['image'] || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800';
      const img2 = row['imagen_url_2'] || row['imagen2'] || row['image2'] || '';
      const img3 = row['imagen_url_3'] || row['imagen3'] || row['image3'] || '';
      const img4 = row['imagen_url_4'] || row['imagen4'] || row['image4'] || '';

      const rawImgList = [img1, img2, img3, img4].map(s => s.trim()).filter(Boolean);
      const images = Array.from(new Set(rawImgList));
      const mainImage = images[0] || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800';

      // Category handling
      const rawCategory = (row['categoria'] || row['category'] || 'cafe').toLowerCase();
      let category: ProductCategory = 'cafe';
      if (rawCategory.includes('pack')) {
        category = 'packs';
      } else if (rawCategory.includes('mayor') || rawCategory.includes('pormayor')) {
        category = 'pormayor';
      }

      // Stock handling
      const rawStock = row['stock'];
      const stock = (rawStock !== undefined && rawStock !== '') ? parseInt(rawStock, 10) : undefined;

      // Discount / offer handling
      const descuentoOferta = row['descuento_oferta'] || row['descuento'] || row['oferta'] || '';
      let originalPrice: number | undefined = undefined;
      if (row['precio_anterior']) {
        const pAnt = parseInt(row['precio_anterior'].replace(/[^0-9]/g, ''), 10);
        if (!isNaN(pAnt) && pAnt > price) originalPrice = pAnt;
      }

      let badge = row['badge'] || row['etiqueta'] || undefined;
      if (descuentoOferta) {
        const descNum = parseInt(descuentoOferta.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(descNum) && descNum > price) {
          originalPrice = descNum;
        } else if (!badge) {
          badge = descuentoOferta;
        }
      }

      if (stock === 0) {
        badge = 'AGOTADO';
      }

      const origin = row['origen'] || row['origin'] || row['country'] || 'La Serena';
      const flag = row['bandera'] || row['flag'] || '☕';
      const scaScore = row['puntaje'] ? parseFloat(row['puntaje']) : undefined;
      const notes = row['notas'] ? row['notas'].split(';').map(n => n.trim()) : ['Tueste Local', 'Especialidad'];

      let availableFormats: WeightFormat[] = ['250g', '500g', '1kg'];
      if (category === 'packs') {
        availableFormats = ['500g'];
      } else if (category === 'pormayor') {
        availableFormats = ['1kg'];
      }

      products.push({
        id: rawId.startsWith('csv-') ? rawId : `csv-${i}-${rawId}`,
        name,
        price,
        originalPrice,
        origin,
        flag,
        scaScore,
        notes,
        category,
        badge,
        image: mainImage,
        images,
        description,
        availableFormats,
        stock,
        discountOffer: descuentoOferta || undefined,
      });
    }

    return products.length > 0 ? products : INITIAL_PRODUCTS;
  } catch (error) {
    console.warn('Failed to parse Google Sheets CSV, using fallback data:', error);
    return INITIAL_PRODUCTS;
  }
}
