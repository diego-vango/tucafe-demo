'use client';

import React from 'react';
import { Truck, PhoneCall, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#C85A32] text-white py-2 px-4 text-[11px] font-bold tracking-widest uppercase transition-all shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Truck className="w-4 h-4 shrink-0 animate-bounce" />
          <span>
            <strong className="font-extrabold underline decoration-white/50">¡REPARTO GRATIS!</strong> en La Serena y Coquimbo por compras sobre <strong>$20.000</strong>
          </span>
          <span className="hidden lg:inline-block text-white/80 text-[10px] lowercase font-normal">(pedidos hasta las 17:00 hrs)</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] shrink-0">
          <a
            href="https://wa.me/56945492046?text=Hola%20Tu%20Caf%C3%A9%20en%20La%20Serena!%20Quiero%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-200 transition-colors font-bold"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-200" />
            <span>WhatsApp: +56 9 4549 2046</span>
          </a>
          <div className="hidden md:flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-full text-white text-[10px]">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>Tueste Fresco La Serena</span>
          </div>
        </div>
      </div>
    </div>
  );
}
