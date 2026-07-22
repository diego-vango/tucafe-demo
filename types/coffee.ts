export type GrindType = string;

export type WeightFormat = '250g' | '500g' | '1kg';

export type ProductCategory = 'cafe' | 'packs' | 'pormayor' | string;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price250g?: number;
  price500g?: number;
  price1kg?: number;
  price: number; // Base display price (precio_250g or lowest available variant price)
  originalPrice?: number;
  origin?: string;
  flag?: string;
  scaScore?: number;
  notes?: string[];
  badge?: string;
  image: string;
  images: string[]; // [imagen_url, imagen_url_2, imagen_url_3, imagen_url_4]
  description: string;
  moliendasDisponibles: string[]; // Options for grind dropdown from moliendas_disponibles
  availableFormats: WeightFormat[];
  stock: number; // Stock level from Stock column
  discountOffer?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedGrind: string;
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
