'use client';

import React from 'react';
import { ShoppingCart, MessageCircle, Flame, ShieldCheck, MapPin, Award, Coffee } from 'lucide-react';
import { Product } from '@/types/coffee';

interface HeroProps {
  onExploreClick: () => void;
  featuredProduct?: Product | null;
  onOpenDetail?: (product: Product) => void;
}

export default function Hero({ onExploreClick, featuredProduct, onOpenDetail }: HeroProps) {
  const displayPrice = featuredProduct ? (featuredProduct.price250g || featuredProduct.price) : 0;

  return (
    <section className="relative bg-[#2C1A1D] text-[#FAF8F5] overflow-hidden py-16 md:py-24 shadow-xl">
      {/* Background Image & Dot Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920&auto=format&fit=crop"
          alt="Granos de Café de Especialidad Tostado"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A1D] via-[#2C1A1D]/90 to-transparent"></div>
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-coffee-dots z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 bg-[#D4A373]/20 border border-[#D4A373]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#D4A373] uppercase tracking-[0.25em] backdrop-blur-xs">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Premium Specialty Coffee • La Serena & Coquimbo</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAF8F5] leading-tight tracking-tight">
              Café de Especialidad <br className="hidden sm:inline" />
              <span className="text-[#D4A373]">Tostado Localmente</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#FAF8F5]/80 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Disfruta granos <strong className="font-semibold text-white">100% Arábica</strong> seleccionados de los mejores orígenes del mundo (Colombia, Ruanda, Costa Rica, Brasil). Tueste fresco directo a tu puerta.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#D4A373] hover:bg-[#c49363] text-white font-bold uppercase tracking-widest text-xs rounded-sm shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Ver Catálogo Completo</span>
              </button>

              <a
                href="https://wa.me/56945492046?text=¡Hola!%20Quiero%20hacer%20un%20pedido%20de%20caf%C3%A9%20fresco."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#D4A373]" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

            {/* Micro Features */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left border-t border-white/10 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Tueste Semanal Fresco</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>Calidad 84+ Pts SCA</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Envío $0 sobre $20k</span>
              </div>
            </div>

          </div>

          {/* Hero Feature Card Showcase */}
          <div className="lg:col-span-5 relative">
            {featuredProduct ? (
              <div
                onClick={() => onOpenDetail && onOpenDetail(featuredProduct)}
                className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-2 border-[#D4A373]/30 bg-[#2C1A1D]/80 backdrop-blur-md p-5 shadow-2xl group cursor-pointer hover:border-[#D4A373]/60 transition-all"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-stone-800">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#D4A373] text-[#2C1A1D] px-3 py-1 rounded-full text-[11px] font-black tracking-wide shadow-md">
                    ★ DESTACADO DE LA SEMANA
                  </div>
                  {featuredProduct.scaScore && (
                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-300/20">
                      {featuredProduct.scaScore} Pts SCA
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider flex items-center gap-1">
                      {featuredProduct.flag && <span>{featuredProduct.flag}</span>}
                      <span>{featuredProduct.origin || 'Origen Selección'}</span>
                    </span>
                    <span className="text-lg font-black text-white">
                      ${displayPrice.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white leading-tight line-clamp-1">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {featuredProduct.notes && featuredProduct.notes.length > 0
                      ? `Notas: ${featuredProduct.notes.join(', ')}`
                      : featuredProduct.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenDetail) {
                        onOpenDetail(featuredProduct);
                      } else {
                        onExploreClick();
                      }
                    }}
                    className="w-full mt-2 py-2.5 bg-white/10 hover:bg-[#D4A373] hover:text-[#2C1A1D] text-[#D4A373] border border-[#D4A373]/40 text-xs font-bold rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Personalizar Molienda & Comprar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-5 animate-pulse space-y-4">
                <div className="h-64 rounded-2xl bg-white/10"></div>
                <div className="h-4 bg-white/10 rounded-sm w-3/4"></div>
                <div className="h-3 bg-white/10 rounded-sm w-1/2"></div>
                <div className="h-10 bg-white/10 rounded-xl w-full"></div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
