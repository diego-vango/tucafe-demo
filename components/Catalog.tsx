'use client';

import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, GrindType, WeightFormat } from '@/types/coffee';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Coffee, Sparkles } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  activeCategory: ProductCategory | 'todos' | 'contacto';
  onSelectCategory: (category: ProductCategory | 'todos' | 'contacto') => void;
  searchQuery: string;
  onAddToCart: (product: Product, grind: GrindType, format: WeightFormat, price: number) => void;
}

export default function Catalog({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
}: CatalogProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'sca'>('featured');

  const categories: { id: ProductCategory | 'todos'; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos los Productos', count: products.length },
    { id: 'cafe', label: '☕ Café de Origen', count: products.filter(p => p.category === 'cafe').length },
    { id: 'packs', label: '🏷️ Packs en Oferta', count: products.filter(p => p.category === 'packs').length },
    { id: 'pormayor', label: '📦 Por Mayor / Granel', count: products.filter(p => p.category === 'pormayor').length },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'todos' && activeCategory !== 'contacto') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.notes.some(n => n.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sca') {
      result.sort((a, b) => (b.scaScore || 0) - (a.scaScore || 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#2C1A1D]/10 pb-6">
        <div>
          <span className="text-xs font-bold text-[#C85A32] uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Café de Especialidad Tostado Localmente</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1A1D]">
            Nuestra Selección
          </h2>
          <p className="text-xs sm:text-sm text-[#2C1A1D]/70 mt-1 max-w-xl">
            Selecciona tu café de origen favorito o pack degustación. Te lo molemos a medida sin costo adicional.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label className="text-xs font-bold text-[#2C1A1D]/60 uppercase flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Ordenar:</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#2C1A1D]/15 rounded-full text-xs font-semibold px-3 py-2 text-[#2C1A1D] focus:outline-hidden focus:ring-2 focus:ring-[#D4A373] shadow-2xs"
          >
            <option value="featured">Destacados Tostaduría</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="sca">Mayor Puntaje SCA (86+ Pts)</option>
          </select>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-1.5 text-[11px] sm:text-xs rounded-full uppercase tracking-tight font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#2C1A1D] text-white border-[#2C1A1D] shadow-sm'
                  : 'bg-white/70 text-[#2C1A1D]/70 border-[#2C1A1D]/10 hover:border-[#2C1A1D]/30 hover:text-[#2C1A1D]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-[#D4A373] text-white' : 'bg-[#2C1A1D]/5 text-[#2C1A1D]/60'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Search Result Indicator */}
      {searchQuery && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between">
          <span>
            Mostrando resultados para: <strong>&quot;{searchQuery}&quot;</strong> ({filteredProducts.length} encontrados)
          </span>
          <button
            onClick={() => onSelectCategory('todos')}
            className="text-amber-800 font-bold underline hover:text-amber-950"
          >
            Limpiar Filtro
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 max-w-md mx-auto">
          <Coffee className="w-12 h-12 text-[#D4A373] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#2C1A1D]">No encontramos productos</h3>
          <p className="text-xs text-gray-500 mt-1">
            Intenta buscando otro término o selecciona la categoría &quot;Todos los Productos&quot;.
          </p>
          <button
            onClick={() => onSelectCategory('todos')}
            className="mt-4 px-5 py-2 bg-[#2C1A1D] text-[#D4A373] text-xs font-bold rounded-xl"
          >
            Ver Todo el Catálogo
          </button>
        </div>
      )}

    </section>
  );
}
