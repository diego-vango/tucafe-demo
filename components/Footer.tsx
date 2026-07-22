'use client';

import React from 'react';
import { Coffee, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C1A1D] text-[#FAF8F5] pt-12 pb-8 border-t border-[#D4A373]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#D4A373] text-[#2C1A1D] flex items-center justify-center font-black">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Tu Café <span className="text-[#D4A373]">en La Serena</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Tostaduría de café de especialidad local. Seleccionamos cuidadosamente granos 100% Arábica de origen ético para entregar frescura e intensidad en cada taza.
            </p>
            <div className="flex items-center gap-2 text-[#D4A373] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de Tueste Fresco Semanal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-[#D4A373] uppercase tracking-wider">
              Nuestros Productos
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Café Colombia Palo Rosa Decaf</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Ruanda Super Premium 86 Pts</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Gran Café Jaguar Costa Rica</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Brasil Boa Vista Natural</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Packs Degustación & Granel</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-[#D4A373] uppercase tracking-wider">
              Contacto & Despacho
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Av. Gabriela Mistral 3184-A, La Serena</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +56 9 4549 2046</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>ventas@tucafeenlaserena.cl</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods & Hours */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#D4A373] uppercase tracking-wider">
              Medios de Pago Seguros
            </h4>
            <p className="text-gray-300">
              Aceptamos Webpay, Tarjetas de Débito/Crédito, Mercado Pago y Transferencia Bancaria Directa.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="bg-white/10 px-2 py-1 rounded-md text-amber-200">💳 Webpay Plus</span>
              <span className="bg-white/10 px-2 py-1 rounded-md text-sky-200">🏦 Transferencia</span>
              <span className="bg-white/10 px-2 py-1 rounded-md text-emerald-200">📱 WhatsApp Pay</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} Tu Café en La Serena (tucafeenlaserena.cl). Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>en La Serena, Chile</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
