'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, MessageCircle, CreditCard, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { CartItem, CustomerDetails } from '@/types/coffee';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onTriggerWebpay?: (summary: {
    items: CartItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
    customer: CustomerDetails;
  }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    comuna: 'La Serena',
    deliveryType: 'Despacho a Domicilio',
    paymentMethod: 'Transferencia / WhatsApp',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  // Financial calculations
  const FREE_SHIPPING_THRESHOLD = 20000;
  const STANDARD_SHIPPING_COST = 2500;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || customer.deliveryType === 'Retiro en Local';
  const shippingCost = cartItems.length === 0 || customer.deliveryType === 'Retiro en Local' ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_COST);
  const total = subtotal + shippingCost;

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Validate form
  const validateForm = (): boolean => {
    if (!customer.fullName.trim()) {
      setFormError('Por favor ingresa tu Nombre Completo.');
      return false;
    }
    if (!customer.phone.trim()) {
      setFormError('Por favor ingresa tu Teléfono de WhatsApp.');
      return false;
    }
    if (customer.deliveryType === 'Despacho a Domicilio' && !customer.address.trim()) {
      setFormError('Por favor ingresa tu Dirección de Envío.');
      return false;
    }
    setFormError(null);
    return true;
  };

  // Async webhook order registration to Google Apps Script
  const registrarPedidoEnSheet = async (metodoPago: string) => {
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbw2x2MLI8PaZ_eHhnF0HcSZX-2m12IIaEDNczuZpE0eNzV9JFcKC28b02O9bQgRMwj2/exec';

    const detalleProductos = cartItems
      .map((item) => `${item.quantity}x ${item.product.name} ${item.selectedFormat} (${item.selectedGrind})`)
      .join(', ');

    const payload = {
      cliente_nombre: customer.fullName,
      whatsapp: customer.phone,
      comuna: customer.comuna,
      detalle_productos: detalleProductos,
      total_pagado: total,
      metodo_pago: metodoPago,
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error al registrar pedido en Google Apps Script webhook:', error);
    }
  };

  // Build WhatsApp Order Link as explicitly specified in prompt
  const handleCheckoutWhatsapp = async () => {
    if (!validateForm()) return;

    // 1. Register order in Google Sheets webhook
    await registrarPedidoEnSheet('WhatsApp');

    const formattedShipping = customer.deliveryType === 'Retiro en Local'
      ? 'Retiro en Local (Gratis)'
      : (isFreeShipping ? 'GRATIS' : `$${STANDARD_SHIPPING_COST.toLocaleString('es-CL')}`);

    let itemsText = '';
    cartItems.forEach((item) => {
      const itemTotal = item.unitPrice * item.quantity;
      itemsText += `- ${item.quantity}x ${item.product.name} (${item.selectedFormat}) - Molienda: ${item.selectedGrind} ($${itemTotal.toLocaleString('es-CL')})\n`;
    });

    const rawMessage = 
`¡Hola Tu Café en La Serena! Quiero confirmar mi pedido:
---------------------------
${itemsText.trim()}
---------------------------
Subtotal: $${subtotal.toLocaleString('es-CL')}
Envío La Serena/Coquimbo: ${formattedShipping}
TOTAL A PAGAR: $${total.toLocaleString('es-CL')}
---------------------------
Cliente: ${customer.fullName}
Teléfono: ${customer.phone}
Dirección: ${customer.deliveryType === 'Retiro en Local' ? 'Retiro en Tienda (Av. Gabriela Mistral 3184-A)' : customer.address} (${customer.comuna})
Tipo de Entrega: ${customer.deliveryType}
Método de Pago: ${customer.paymentMethod}`;

    const whatsappUrl = `https://wa.me/56945492046?text=${encodeURIComponent(rawMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCheckoutMercadoPago = async () => {
    if (!validateForm()) return;

    setIsProcessingPayment(true);
    setFormError(null);

    try {
      // 1. Register order in Google Sheets webhook
      await registrarPedidoEnSheet('Mercado Pago');

      // 2. Build items array mapping cart products
      const items = cartItems.map((item) => ({
        title: `${item.product.name} (${item.selectedFormat}) - Molienda: ${item.selectedGrind}`,
        quantity: Number(item.quantity),
        unit_price: Number(item.unitPrice),
        currency_id: "CLP",
      }));

      // 2. Shipping logic
      if (customer.deliveryType === 'Despacho a Domicilio' && subtotal < 20000) {
        items.push({
          title: "Costo de Envío (La Serena / Coquimbo)",
          quantity: 1,
          unit_price: 2500,
          currency_id: "CLP",
        });
      }

      // 3. Mercado Pago Preferences POST request
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Authorization": "Bearer APP_USR-7266161047893576-072121-ab932d78ab44538bd8dcf39ff385b04f-3556989679",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data && data.init_point) {
        window.location.href = data.init_point;
      } else {
        setFormError('No se pudo generar la preferencia de pago en Mercado Pago. Por favor reintenta o escríbenos por WhatsApp.');
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error('Error al conectar con Mercado Pago:', error);
      setFormError('Ocurrió un error al conectar con Mercado Pago. Por favor reintenta en unos momentos.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#2C1A1D]/10">
          
          {/* Header */}
          <div className="p-5 bg-[#2C1A1D] text-[#FAF8F5] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4A373]" />
              <h2 className="text-lg font-extrabold tracking-tight">Tu Carrito de Compras</h2>
              <span className="bg-[#C85A32] text-white text-xs font-black px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} ítems
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Shipping Progress Banner */}
          {cartItems.length > 0 && customer.deliveryType === 'Despacho a Domicilio' && (
            <div className="bg-amber-50 border-b border-amber-200 p-3 px-5 text-xs">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>¡Felicitaciones! Tienes Envío GRATIS en La Serena y Coquimbo 🎉</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center font-bold text-amber-900">
                    <span>
                      Te faltan <strong>${amountNeededForFreeShipping.toLocaleString('es-CL')}</strong> para Envío GRATIS
                    </span>
                    <span>{Math.round(freeShippingProgress)}%</span>
                  </div>
                  <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C85A32] h-full transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-stone-200 text-stone-500 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2C1A1D]">Tu carrito está vacío</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Añade un café de especialidad recién tostado o un pack en oferta.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#2C1A1D] text-[#D4A373] text-xs font-bold rounded-xl"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs flex gap-3 relative group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl shrink-0"
                      />

                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-bold text-xs text-[#2C1A1D] truncate">
                          {item.product.name}
                        </h4>
                        
                        <div className="text-[11px] text-gray-500 space-y-0.5 mt-0.5">
                          <p className="font-medium text-amber-900">
                            ⚙️ Molienda: <strong>{item.selectedGrind}</strong>
                          </p>
                          <p className="font-medium">
                            ⚖️ Formato: <strong>{item.selectedFormat}</strong>
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-extrabold text-sm text-[#2C1A1D]">
                            ${(item.unitPrice * item.quantity).toLocaleString('es-CL')} CLP
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1 border border-stone-200">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                              className="p-1 text-gray-600 hover:text-black rounded-md hover:bg-stone-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-1 text-gray-600 hover:text-black rounded-md hover:bg-stone-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 mt-6">
                  <h3 className="font-extrabold text-xs text-[#2C1A1D] uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Datos de Envío & Confirmación</span>
                  </h3>

                  {formError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        value={customer.fullName}
                        onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                        placeholder="Ej: María González"
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Teléfono WhatsApp *</label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="Ej: +56 9 1234 5678"
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Tipo de Entrega</label>
                        <select
                          value={customer.deliveryType}
                          onChange={(e) => setCustomer({ ...customer, deliveryType: e.target.value as any })}
                          className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                        >
                          <option value="Despacho a Domicilio">Despacho a Domicilio</option>
                          <option value="Retiro en Local">Retiro en Local (Gratis)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Comuna</label>
                        <select
                          value={customer.comuna}
                          onChange={(e) => setCustomer({ ...customer, comuna: e.target.value as any })}
                          className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                        >
                          <option value="La Serena">La Serena</option>
                          <option value="Coquimbo">Coquimbo</option>
                          <option value="Otra Región">Otra Región (Starken/Chilexpress)</option>
                        </select>
                      </div>
                    </div>

                    {customer.deliveryType === 'Despacho a Domicilio' && (
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Dirección de Envío *</label>
                        <input
                          type="text"
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          placeholder="Calle, número, depto / villa..."
                          className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:outline-hidden"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Método de Pago Preferido</label>
                      <select
                        value={customer.paymentMethod}
                        onChange={(e) => setCustomer({ ...customer, paymentMethod: e.target.value as any })}
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-hidden"
                      >
                        <option value="Transferencia / WhatsApp">Transferencia Bancaria (Vía WhatsApp)</option>
                        <option value="Tarjeta Débito/Crédito (Webpay)">Tarjeta Débito/Crédito (Webpay / Mercado Pago)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary & Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-3 shadow-lg">
              
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span className="font-bold text-[#2C1A1D]">${subtotal.toLocaleString('es-CL')} CLP</span>
                </div>

                <div className="flex justify-between">
                  <span>Costo de envío ({customer.comuna}):</span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-emerald-700">GRATIS</span>
                  ) : (
                    <span className="font-bold text-[#2C1A1D]">${shippingCost.toLocaleString('es-CL')} CLP</span>
                  )}
                </div>

                <div className="flex justify-between text-base font-extrabold text-[#2C1A1D] pt-2 border-t border-stone-100">
                  <span>Total a Pagar:</span>
                  <span className="text-[#C85A32] text-lg">${total.toLocaleString('es-CL')} CLP</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Primary WhatsApp Button */}
                <button
                  onClick={handleCheckoutWhatsapp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Finalizar Pedido por WhatsApp</span>
                </button>

                {/* 2. Secondary Webpay/Card Button (Mercado Pago Checkout Pro) */}
                <button
                  type="button"
                  onClick={handleCheckoutMercadoPago}
                  disabled={isProcessingPayment}
                  className="w-full py-3 px-4 bg-[#2C1A1D] hover:bg-[#3d2529] disabled:opacity-60 disabled:cursor-not-allowed text-[#D4A373] border border-[#D4A373]/30 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#D4A373] animate-spin" />
                      <span>Procesando pago...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-[#D4A373]" />
                      <span>Pagar con Tarjeta (Webpay / Mercado Pago)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
