'use client';

import React from 'react';
import { ShoppingCart, MessageCircle, Flame, ShieldCheck, MapPin, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
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
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-2 border-[#D4A373]/30 bg-[#2C1A1D]/80 backdrop-blur-md p-5 shadow-2xl">
              
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                  alt="Café Ruanda Super Premium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#D4A373] text-[#2C1A1D] px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-md">
                  ★ DESTACADO DE LA SEMANA
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold">
                  86 Pts SCA
                </div>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">🇷🇼 Ruanda • Finca Huye</span>
                  <span className="text-lg font-black text-white">$12.400 CLP</span>
                </div>
                <h3 className="text-lg font-extrabold text-white">Café Ruanda Super Premium</h3>
                <p className="text-xs text-gray-300">Notas a flores blancas, ciruela fresca y té negro. Ideal para V60 y Chemex.</p>
                <button
                  onClick={onExploreClick}
                  className="w-full mt-2 py-2.5 bg-white/10 hover:bg-white/20 text-[#D4A373] border border-[#D4A373]/30 text-xs font-bold rounded-xl transition-all text-center"
                >
                  Personalizar Molienda & Comprar
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
