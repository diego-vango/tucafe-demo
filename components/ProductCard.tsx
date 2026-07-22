'use client';

import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Award, Check, Images, Eye } from 'lucide-react';
import { Product, WeightFormat } from '@/types/coffee';
import { calculateFormatPrice } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, grind: string, format: WeightFormat, price: number) => void;
  onOpenDetail?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onOpenDetail }: ProductCardProps) {
  const initialFormat = product.availableFormats && product.availableFormats.length > 0
    ? product.availableFormats[0]
    : '250g';
  const [selectedFormat, setSelectedFormat] = useState<WeightFormat>(initialFormat);

  const initialGrind = product.moliendasDisponibles && product.moliendasDisponibles.length > 0
    ? product.moliendasDisponibles[0]
    : 'En Grano';
  const [selectedGrind, setSelectedGrind] = useState<string>(initialGrind);

  const [addedAnimation, setAddedAnimation] = useState(false);
  
  // Multi-photo gallery state
  const productImages = (product.images && product.images.length > 0) ? product.images : [product.image];
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const isAgotado = product.stock <= 0;
  const currentPrice = calculateFormatPrice(product, selectedFormat);
  const displayLowestPrice = product.price250g || product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAgotado) return;
    onAddToCart(product, selectedGrind, selectedFormat, currentPrice);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const buildWhatsappQueryUrl = () => {
    const text = `¡Hola Tu Café en La Serena! Quisiera hacer una consulta sobre: *${product.name}* (Formato: ${selectedFormat}, Molienda: ${selectedGrind}, Precio: $${currentPrice.toLocaleString('es-CL')}). ¿Tienen disponibilidad inmediata?`;
    return `https://wa.me/56945492046?text=${encodeURIComponent(text)}`;
  };

  const currentImage = productImages[activeImageIdx] || product.image;

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(product)}
      className="bg-white rounded-2xl overflow-hidden border border-[#2C1A1D]/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      
      {/* Top Image Section */}
      <div className="relative h-60 overflow-hidden bg-stone-100">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {isAgotado ? (
            <span className="bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
              Agotado
            </span>
          ) : product.badge ? (
            <span className="bg-[#C85A32] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
              {product.badge}
            </span>
          ) : null}

          {(product.flag || product.origin) && (
            <span className="bg-[#2C1A1D]/90 text-[#FAF8F5] text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
              {product.flag && <span>{product.flag}</span>}
              {product.origin && <span>{product.origin}</span>}
            </span>
          )}
        </div>

        {/* SCA Score Badge */}
        {product.scaScore && (
          <div className="absolute top-3 right-3 bg-[#D4A373] text-[#2C1A1D] px-2.5 py-1 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1 border border-amber-200 z-10">
            <Award className="w-3.5 h-3.5" />
            <span>{product.scaScore} Pts SCA</span>
          </div>
        )}

        {/* Multi-photo Thumbnails Selector Bar */}
        {productImages.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 px-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 bg-[#2C1A1D]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md">
              <Images className="w-3.5 h-3.5 text-[#D4A373]" />
              <div className="flex gap-1">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all border ${
                      activeImageIdx === idx
                        ? 'bg-[#D4A373] border-white scale-110'
                        : 'bg-white/40 border-transparent hover:bg-white/80'
                    }`}
                    title={`Ver imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <span className="bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
              {activeImageIdx + 1}/{productImages.length}
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Title */}
          <h3 className="font-bold text-lg text-[#2C1A1D] mb-1 group-hover:text-[#C85A32] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Cupping Notes Line */}
          {product.notes && product.notes.length > 0 && (
            <p className="text-xs text-[#2C1A1D]/60 italic mb-3">
              Notas: {product.notes.join(', ')}
            </p>
          )}

          {/* Price Header with "Desde" Prefix */}
          <div className="mt-1 flex items-baseline gap-2 justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-semibold text-[#2C1A1D]/60 uppercase tracking-tight">
                Desde
              </span>
              <span className="text-xl font-serif font-bold text-[#2C1A1D]">
                ${displayLowestPrice.toLocaleString('es-CL')}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#2C1A1D]/50 bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#2C1A1D]/5">
              {selectedFormat}
            </span>
          </div>

          {/* Description */}
          <p className="mt-2.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Selectors Section */}
        <div className="space-y-3 pt-2 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          
          {/* Format / Weight Selector */}
          {product.availableFormats && product.availableFormats.length > 1 && (
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Formato / Peso:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {product.availableFormats.map((fmt) => {
                  const isSelected = selectedFormat === fmt;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                        isSelected
                          ? 'bg-[#2C1A1D] text-[#D4A373] border-[#2C1A1D] shadow-xs'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Grind Dropdown Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
              Tipo de Molienda:
            </label>
            <select
              value={selectedGrind}
              onChange={(e) => setSelectedGrind(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#2C1A1D] focus:outline-hidden focus:ring-2 focus:ring-[#D4A373]"
            >
              {product.moliendasDisponibles && product.moliendasDisponibles.length > 0 ? (
                product.moliendasDisponibles.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))
              ) : (
                <option value="En Grano">En Grano</option>
              )}
            </select>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-5 gap-1.5">
            <button
              type="button"
              disabled={isAgotado}
              onClick={handleAddToCart}
              className={`col-span-4 py-3 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                isAgotado
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                  : addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2C1A1D] hover:bg-[#3d2529] text-[#FAF8F5]'
              }`}
            >
              {isAgotado ? (
                <span>Agotado</span>
              ) : addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-[#D4A373]" />
                  <span>Añadir (${currentPrice.toLocaleString('es-CL')})</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenDetail && onOpenDetail(product)}
              className="col-span-1 bg-stone-100 hover:bg-stone-200 text-[#2C1A1D] border border-stone-200 rounded-xl flex items-center justify-center transition-colors"
              title="Ver detalle del producto"
            >
              <Eye className="w-4 h-4 text-[#2C1A1D]" />
            </button>
          </div>

          <a
            href={buildWhatsappQueryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-2 bg-stone-50 hover:bg-emerald-50 text-emerald-800 border border-stone-200 hover:border-emerald-300 rounded-xl font-semibold text-[11px] transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consulta WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}

