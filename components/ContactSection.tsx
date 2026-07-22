'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle, Store } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = `Hola Tostaduría, soy ${formData.name} (${formData.email}${formData.phone ? `, Tel: ${formData.phone}` : ''}). Mi consulta: ${formData.message}`;
    const whatsappUrl = `https://wa.me/56945492046?text=${encodeURIComponent(messageText)}`;
    
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contacto-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#C85A32] uppercase tracking-widest bg-[#C85A32]/10 px-3 py-1 rounded-full">
          Ubicación & Atención Local
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A1D] mt-2">
          Visítanos o Contáctanos Directamente
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Estamos ubicados en La Serena. Atendemos consultas de clientes particulares, cafeterías, oficinas y despacho a domicilio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[#2C1A1D] flex items-center gap-2 border-b border-stone-100 pb-3">
              <Store className="w-5 h-5 text-[#D4A373]" />
              <span>Información Oficial de la Tostaduría</span>
            </h3>

            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-100 text-[#2C1A1D] rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C85A32]" />
                </div>
                <div>
                  <strong className="block text-[#2C1A1D] font-bold">Dirección del Local / Tostaduría:</strong>
                  <span>Av. Gabriela Mistral 3184-A, La Serena, Región de Coquimbo</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-100 text-[#2C1A1D] rounded-xl shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <strong className="block text-[#2C1A1D] font-bold">Teléfono & WhatsApp Directo:</strong>
                  <a
                    href="https://wa.me/56945492046"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    +56 9 4549 2046
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-100 text-[#2C1A1D] rounded-xl shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#D4A373]" />
                </div>
                <div>
                  <strong className="block text-[#2C1A1D] font-bold">Correo Electrónico:</strong>
                  <a href="mailto:ventas@tucafeenlaserena.cl" className="text-amber-900 font-semibold hover:underline">
                    ventas@tucafeenlaserena.cl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-100 text-[#2C1A1D] rounded-xl shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#2C1A1D]" />
                </div>
                <div>
                  <strong className="block text-[#2C1A1D] font-bold">Horarios de Reparto & Atención:</strong>
                  <span>Lunes a Viernes: 09:00 - 18:00 hrs <br />(Corte pedidos 17:00 hrs para entrega al día siguiente)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/56945492046?text=¡Hola!%20Quisiera%20consultar%20por%20ventas%20al%20por%20mayor%20o%20cafeter%C3%ADa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Escribir por WhatsApp al Barista</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Mock */}
          <div className="bg-[#2C1A1D] text-[#FAF8F5] p-5 rounded-3xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#D4A373]">
              <span>📍 Zona de Cobertura Reparto Gratis</span>
              <span className="bg-[#C85A32] text-white px-2 py-0.5 rounded-full text-[10px]">
                La Serena & Coquimbo
              </span>
            </div>
            <p className="text-xs text-gray-300">
              Despachamos directamente a los sectores de Avenida del Mar, San Joaquín, El Milagro, Cisternas, Sindempart, Peñuelas y centro de Coquimbo.
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
          <h3 className="font-extrabold text-lg text-[#2C1A1D] mb-2">
            Envíanos un Mensaje Directo
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            ¿Tienes dudas sobre el tipo de tostado, pedidos por mayor para tu cafetería u oficina? Escríbenos y un especialista se pondrá en contacto contigo.
          </p>

          {sentSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-center space-y-2 animate-fadeIn">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base">¡Mensaje enviado con éxito!</h4>
              <p className="text-xs text-emerald-800">
                Gracias por contactarte con Tu Café en La Serena. Te responderemos a la brevedad.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Camilo Henríquez"
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Teléfono o WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+56 9 9876 5432"
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejemplo@correo.cl"
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mensaje o Consulta *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe tu consulta sobre variedades, pedidos por mayor o despacho..."
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2C1A1D] hover:bg-[#3d2529] text-[#D4A373] font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#D4A373]" />
                <span>Enviar Mensaje a la Tostaduría</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
