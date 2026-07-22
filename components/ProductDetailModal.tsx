'use client';

import React, { useState } from 'react';
import { X, ShoppingCart, Check, ChevronLeft, ChevronRight, MessageCircle, AlertCircle, Award } from 'lucide-react';
import { Product, WeightFormat } from '@/types/coffee';
import { calculateFormatPrice } from '@/lib/data';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, grind: string, format: WeightFormat, price: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [prevProductId, setPrevProductId] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<WeightFormat>('250g');
  const [selectedGrind, setSelectedGrind] = useState<string>('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync state when product changes during render
  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedFormat(
      product.availableFormats && product.availableFormats.length > 0
        ? product.availableFormats[0]
        : '250g'
    );
    setSelectedGrind(
      product.moliendasDisponibles && product.moliendasDisponibles.length > 0
        ? product.moliendasDisponibles[0]
        : 'En Grano'
    );
    setActiveImageIdx(0);
    setAddedSuccess(false);
  }

  if (!isOpen || !product) return null;

  const isAgotado = product.stock <= 0;
  const currentPrice = calculateFormatPrice(product, selectedFormat);
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAdd = () => {
    if (isAgotado) return;
    onAddToCart(product, selectedGrind, selectedFormat, currentPrice);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const buildWhatsappQueryUrl = () => {
    const text = `¡Hola Tu Café en La Serena! Tengo una pregunta sobre: *${product.name}* (Formato: ${selectedFormat}, Molienda: ${selectedGrind || 'En Grano'}, Precio: $${currentPrice.toLocaleString('es-CL')}).`;
    return `https://wa.me/56945492046?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#2C1A1D]/15 flex flex-col md:flex-row relative max-h-[90vh] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-[#2C1A1D] p-2 rounded-full backdrop-blur-xs border border-[#2C1A1D]/10 shadow-md transition-all"
          aria-label="Cerrar vista detalle"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Carousel Column */}
        <div className="md:w-1/2 bg-stone-100 flex flex-col justify-between p-4 relative">
          
          {/* Main Image */}
          <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden bg-stone-200 shadow-inner group">
            <img
              src={images[activeImageIdx]}
              alt={`${product.name} imagen ${activeImageIdx + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Carousel Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-xs transition-all shadow-md"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-xs transition-all shadow-md"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
              {isAgotado && (
                <span className="bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                  Agotado
                </span>
              )}
              {product.badge && !isAgotado && (
                <span className="bg-[#C85A32] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {product.scaScore && (
              <div className="absolute top-3 right-3 bg-[#D4A373] text-[#2C1A1D] px-2.5 py-1 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1 border border-amber-200 z-10">
                <Award className="w-3.5 h-3.5" />
                <span>{product.scaScore} Pts SCA</span>
              </div>
            )}
          </div>

          {/* Thumbnails list */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx
                      ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Product Details & Selection Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C85A32] font-bold uppercase tracking-wider mb-1">
              {product.flag && <span>{product.flag}</span>}
              {product.origin && <span>{product.origin}</span>}
              {product.category && <span className="text-[#2C1A1D]/40">• {product.category}</span>}
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#2C1A1D] mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Dynamic Price Display */}
            <div className="flex items-baseline gap-3 my-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#2C1A1D]/10">
              <span className="text-3xl font-serif font-extrabold text-[#2C1A1D]">
                ${currentPrice.toLocaleString('es-CL')}
              </span>
              <span className="text-xs font-bold text-[#2C1A1D]/60 uppercase bg-white px-2.5 py-1 rounded-lg border border-[#2C1A1D]/10">
                Variante {selectedFormat}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Option b: Selector de Formato (Radio/Buttons) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#2C1A1D] uppercase tracking-wider mb-2">
                Selecciona Formato (Peso):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['250g', '500g', '1kg'] as WeightFormat[]).map((fmt) => {
                  const isAvailable = product.availableFormats.includes(fmt);
                  const isSelected = selectedFormat === fmt;
                  const priceForFmt = calculateFormatPrice(product, fmt);

                  return (
                    <button
                      key={fmt}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? 'bg-[#2C1A1D] text-[#D4A373] border-[#2C1A1D] shadow-md ring-2 ring-[#D4A373]/50'
                          : isAvailable
                          ? 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                      }`}
                    >
                      <span>{fmt}</span>
                      <span className="text-[10px] font-normal opacity-90">
                        ${priceForFmt.toLocaleString('es-CL')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option c: Selector de Molienda (Dropdown) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#2C1A1D] uppercase tracking-wider mb-2">
                Tipo de Molienda:
              </label>
              <select
                value={selectedGrind}
                onChange={(e) => setSelectedGrind(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2C1A1D] focus:outline-hidden focus:ring-2 focus:ring-[#D4A373] shadow-2xs"
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

            {/* Stock status indicator */}
            <div className="flex flex-col gap-1 mb-2">
              {isAgotado ? (
                <span className="text-xs text-red-600 font-bold flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 w-fit">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Sin stock disponible temporalmente</span>
                </span>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                    <span>Disponible para tostado y envío inmediato</span>
                  </span>
                  {product.stock > 0 && (
                    <span className="text-xs text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300">
                      Stock: {product.stock} unidades
                    </span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <button
              onClick={handleAdd}
              disabled={isAgotado}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                isAgotado
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                  : addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2C1A1D] hover:bg-[#3d2529] text-[#FAF8F5]'
              }`}
            >
              {isAgotado ? (
                <span>Agotado</span>
              ) : addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Agregado al Carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-[#D4A373]" />
                  <span>Añadir al Carrito - ${currentPrice.toLocaleString('es-CL')}</span>
                </>
              )}
            </button>

            <a
              href={buildWhatsappQueryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-stone-100 hover:bg-emerald-50 text-emerald-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Consultar disponibilidad por WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
