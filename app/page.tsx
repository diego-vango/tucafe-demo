'use client';

import React, { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Product, CartItem, ProductCategory, GrindType, WeightFormat, CustomerDetails } from '@/types/coffee';
import { INITIAL_PRODUCTS, fetchCatalogFromCsv, DEFAULT_SHEET_CSV_URL } from '@/lib/data';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import GrindGuide from '@/components/GrindGuide';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ConfigModal from '@/components/ConfigModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import FloatingWhatsapp from '@/components/FloatingWhatsapp';

function subscribeLocalStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('tucafe-storage-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('tucafe-storage-update', callback);
  };
}

function getCartSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  return localStorage.getItem('tucafe_cart') || '[]';
}

function getCsvUrlSnapshot(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('tucafe_csv_url') || '';
}

function getEmptyCartSnapshot(): string {
  return '[]';
}

function getEmptyCsvSnapshot(): string {
  return '';
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'todos' | 'contacto'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // LocalStorage synced states using useSyncExternalStore
  const cartJson = useSyncExternalStore(subscribeLocalStorage, getCartSnapshot, getEmptyCartSnapshot);
  const csvUrl = useSyncExternalStore(subscribeLocalStorage, getCsvUrlSnapshot, getEmptyCsvSnapshot);

  const cartItems: CartItem[] = useMemo(() => {
    try {
      return JSON.parse(cartJson);
    } catch {
      return [];
    }
  }, [cartJson]);

  const updateCartItems = useCallback((updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    try {
      const current = JSON.parse(localStorage.getItem('tucafe_cart') || '[]');
      const next = typeof updater === 'function' ? updater(current) : updater;
      localStorage.setItem('tucafe_cart', JSON.stringify(next));
      window.dispatchEvent(new Event('tucafe-storage-update'));
    } catch (e) {
      console.error('Error updating cart:', e);
    }
  }, []);

  const updateCsvUrl = useCallback((url: string) => {
    try {
      if (url) {
        localStorage.setItem('tucafe_csv_url', url);
      } else {
        localStorage.removeItem('tucafe_csv_url');
      }
      window.dispatchEvent(new Event('tucafe-storage-update'));
    } catch (e) {
      console.error('Error updating csv url:', e);
    }
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync CSV catalog from Google Sheets or custom URL on mount and updates
  useEffect(() => {
    const targetUrl = csvUrl || DEFAULT_SHEET_CSV_URL;
    fetchCatalogFromCsv(targetUrl).then((fetched) => setProducts(fetched));
  }, [csvUrl]);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add item to cart
  const handleAddToCart = (product: Product, grind: string, format: WeightFormat, unitPrice: number) => {
    const cartItemId = `${product.id}-${grind}-${format}`;
    
    updateCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            selectedGrind: grind,
            selectedFormat: format,
            unitPrice,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`¡Añadido! ${product.name} (${format}, ${grind})`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    updateCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    updateCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    updateCartItems([]);
  };

  // CSV Sheet Save
  const handleSaveCsvUrl = async (newUrl: string) => {
    updateCsvUrl(newUrl);
    if (newUrl) {
      const updated = await fetchCatalogFromCsv(newUrl);
      setProducts(updated);
      showToast('Catálogo sincronizado desde Google Sheets');
    } else {
      setProducts(INITIAL_PRODUCTS);
      showToast('Restaurado a catálogo base de la tostaduría');
    }
  };

  const handleResetCatalog = () => {
    updateCsvUrl('');
    setProducts(INITIAL_PRODUCTS);
    showToast('Restaurado a catálogo base de la tostaduría');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Header Nav */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        featuredProduct={products[0] || null}
        onOpenDetail={(product) => setSelectedDetailProduct(product)}
        onExploreClick={() => {
          setActiveCategory('todos');
          const catalogEl = document.getElementById('catalog-section');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Catalog Section */}
      <main className="flex-1">
        <Catalog
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onOpenDetail={(product) => setSelectedDetailProduct(product)}
        />

        {/* Coffee Grind Guide */}
        <GrindGuide />

        {/* Contact and Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={!!selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Google Sheets Config Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentCsvUrl={csvUrl}
        onSaveCsvUrl={handleSaveCsvUrl}
        onResetToDefault={handleResetCatalog}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsapp />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#2C1A1D] text-[#D4A373] px-5 py-3 rounded-2xl shadow-2xl border border-[#D4A373]/30 text-xs font-extrabold flex items-center gap-2 animate-bounce">
          <span>☕</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
