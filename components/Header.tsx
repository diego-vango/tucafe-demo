'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Coffee, Menu, X, Phone } from 'lucide-react';
import { ProductCategory } from '@/types/coffee';

interface HeaderProps {
  activeCategory: ProductCategory | 'todos' | 'contacto';
  onSelectCategory: (category: ProductCategory | 'todos' | 'contacto') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenConfig?: () => void;
}

export default function Header({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: ProductCategory | 'todos' | 'contacto'; label: string; icon: string }[] = [
    { id: 'todos', label: '🏠 Inicio', icon: '🏠' },
    { id: 'cafe', label: '☕ Café de Origen', icon: '☕' },
    { id: 'packs', label: '🏷️ Packs en Oferta', icon: '🏷️' },
    { id: 'pormayor', label: '📦 Por Mayor / Granel', icon: '📦' },
    { id: 'contacto', label: '📞 Contacto & Ubicación', icon: '📞' },
  ];

  const handleNavClick = (id: ProductCategory | 'todos' | 'contacto') => {
    onSelectCategory(id);
    setIsMobileMenuOpen(false);
    if (id === 'contacto') {
      const el = document.getElementById('contacto-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'todos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#2C1A1D]/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => handleNavClick('todos')}>
            <div className="w-11 h-11 rounded-full bg-[#2C1A1D] text-[#D4A373] flex items-center justify-center shadow-md transform hover:scale-105 transition-transform border border-[#D4A373]/30">
              <Coffee className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold tracking-tight text-[#2C1A1D] leading-none">
                Tu Café <span className="text-[#D4A373]">en La Serena</span>
              </span>
              <span className="block text-[10px] font-bold text-[#C85A32] uppercase tracking-widest mt-1">
                Tostaduría de Especialidad
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar origen (Colombia, Ruanda, Brasil...), nota o pack..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#2C1A1D]/15 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#D4A373] transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp Call */}
            <a
              href="https://wa.me/56945492046"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="relative p-2.5 bg-[#2C1A1D] text-[#FAF8F5] rounded-xl hover:bg-[#2C1A1D]/90 transition-all shadow-md flex items-center gap-2 group transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-[#D4A373] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm hidden sm:inline">Carrito</span>
              {cartCount > 0 ? (
                <span className="bg-[#C85A32] text-white text-xs font-black px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-gray-300 hidden sm:inline">(0)</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#2C1A1D] md:hidden rounded-lg hover:bg-black/5"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar café de origen, pack o molienda..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#2C1A1D]/15 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D4A373]"
            />
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 border-t border-[#2C1A1D]/5 py-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#2C1A1D] border-b-2 border-[#D4A373] bg-[#2C1A1D]/5'
                    : 'text-[#2C1A1D]/70 hover:text-[#D4A373] hover:bg-[#2C1A1D]/5'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#2C1A1D]/10 px-4 py-3 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#2C1A1D] text-[#D4A373]'
                    : 'text-[#2C1A1D] hover:bg-gray-100'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
