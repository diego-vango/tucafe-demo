'use client';

import React from 'react';
import { HelpCircle, Coffee, CheckCircle2 } from 'lucide-react';

export default function GrindGuide() {
  const grinds = [
    {
      title: 'En Grano Entero',
      icon: '🫘',
      idealFor: 'Molinillo manual o automático en casa',
      desc: 'Mantiene el 100% de los aceites aromáticos intactos. Moler justo antes de extraer garantiza la máxima intensidad sensorial.',
      tag: 'Máxima Frescura'
    },
    {
      title: 'Molienda Fina (Espresso)',
      icon: '☕',
      idealFor: 'Máquinas de Espresso & Aeropress rápida',
      desc: 'Textura similar a la sal fina. Permite una extracción rápida bajo presión con crema densa e intensa.',
      tag: 'Alta Presión'
    },
    {
      title: 'Molienda Media (Filtro / Moka)',
      icon: '🧪',
      idealFor: 'V60, Chemex, Cafetera de Goteo & Cafetera Italiana (Moka)',
      desc: 'Textura como sal de mesa. Equilibrio perfecto para extracciones de goteo manual y cafeteras italianas.',
      tag: 'El Más Versátil'
    },
    {
      title: 'Molienda Gruesa (Prensa / Cold Brew)',
      icon: '🫖',
      idealFor: 'Prensa Francesa (French Press) & Maceración en Frío (Cold Brew)',
      desc: 'Textura como pimienta o sal gruesa. Evita residuos en la taza durante infusiones prolongadas.',
      tag: 'Infusión Lenta'
    }
  ];

  return (
    <section className="bg-stone-100 py-12 md:py-16 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#D4A373]/20 text-[#2C1A1D] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Guía Práctica del Barista</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A1D]">
            ¿Qué tipo de molienda necesitas?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Te lo molemos a medida sin costo adicional. Selecciona la molienda según tu cafetera favorita:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {grinds.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#C85A32] border border-[#C85A32]/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-[#2C1A1D] mb-1">
                  {item.title}
                </h3>

                <div className="flex items-start gap-1.5 text-xs text-amber-900 font-semibold mb-2 bg-amber-50 p-2 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{item.idealFor}</span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-[#D4A373] text-right">
                ✓ Selección disponible en cada producto
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
