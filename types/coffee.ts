export type GrindType = 'En Grano' | 'Espresso' | 'Prensa Francesa' | 'Filtro/Italiana';

export type WeightFormat = '250g' | '500g' | '1kg';

export type ProductCategory = 'cafe' | 'packs' | 'pormayor';

export interface Product {
  id: string;
  name: string;
  price: number; // Base price for 250g or unit
  originalPrice?: number;
  origin: string;
  flag: string;
  scaScore?: number;
  notes: string[];
  category: ProductCategory;
  badge?: string;
  image: string;
  images?: string[]; // Array of primary + additional images (imagen_url, imagen_url_2, imagen_url_3, imagen_url_4)
  description: string;
  availableFormats?: WeightFormat[];
  stock?: number;
  discountOffer?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedGrind: GrindType;
  selectedFormat: WeightFormat;
  unitPrice: number;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  comuna: 'La Serena' | 'Coquimbo' | 'Otra Región';
  deliveryType: 'Despacho a Domicilio' | 'Retiro en Local';
  paymentMethod: 'Transferencia / WhatsApp' | 'Tarjeta Débito/Crédito (Webpay)';
  notes?: string;
}
