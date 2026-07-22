'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/56945492046?text=¡Hola!%20Quiero%20hacer%20un%20pedido%20de%20caf%C3%A9%20de%20especialidad."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
      title="Contactar por WhatsApp Directo"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs whitespace-nowrap pr-1">
        ¿Dudas? Chat WhatsApp
      </span>
    </a>
  );
}
