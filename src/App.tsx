import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { StoreHeader } from './components/StoreHeader';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ConfiguratorModal } from './components/ConfiguratorModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { AppleBagDrawer } from './components/AppleBagDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchOverlay } from './components/SearchOverlay';
import { SpecialistModal } from './components/SpecialistModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { TradeInModal } from './components/TradeInModal';
import { DeviceComparison } from './components/DeviceComparison';
import { ApplePerks } from './components/ApplePerks';
import { Footer } from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('apple_store_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Modal visibility states
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpecialistOpen, setIsSpecialistOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [configuringProduct, setConfiguringProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutIsApplePay, setCheckoutIsApplePay] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apple_store_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const mainHardware = filteredProducts.filter((p) => p.category !== 'accessories');
  const accessories = PRODUCTS.filter((p) => p.category === 'accessories');

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === newItem.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [newItem, ...prev];
    });
    // Open bag drawer for visual confirmation
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedCheckout = (isApplePay: boolean) => {
    setIsBagOpen(false);
    setCheckoutIsApplePay(isApplePay);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#0071e3] selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsBagOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('store-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSpecialist={() => setIsSpecialistOpen(true)}
      />

      {/* 2. Apple Promotional Ribbon */}
      <AnnouncementBar onOpenTradeIn={() => setIsTradeInOpen(true)} />

      {/* 3. Apple Store Hero & Specialist Concierge Header */}
      <StoreHeader
        onOpenSpecialist={() => setIsSpecialistOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
      />

      {/* 4. Horizontal Category Quick-Nav */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Main Store Content Area */}
      <main className="flex-1" id="store-catalog">
        {/* Section: The Latest Products */}
        <section className="py-12 px-4 sm:px-6 max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
                {activeCategory === 'all' ? 'The Latest' : `${activeCategory.toUpperCase()} Lineup`}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                {activeCategory === 'all' ? "Take a look at what's new, right now." : `Explore all ${activeCategory} devices.`}
              </h2>
            </div>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs sm:text-sm font-semibold text-[#0071e3] hover:underline cursor-pointer"
              >
                View all categories
              </button>
            )}
          </div>

          {/* Product Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mainHardware.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setConfiguringProduct(p)}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {mainHardware.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              <p>No products in this specific category.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#0071e3] text-white text-xs font-medium"
              >
                Reset to All
              </button>
            </div>
          )}
        </section>

        {/* Section: Accessories Showcase (When in all or accessories) */}
        {(activeCategory === 'all' || activeCategory === 'accessories') && (
          <section className="py-12 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-black/5">
            <div className="mb-8">
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
                Accessories & Audio
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                Essentials designed to pair seamlessly.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {accessories.map((acc) => (
                <ProductCard
                  key={acc.id}
                  product={acc}
                  onSelectProduct={(p) => setConfiguringProduct(p)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section: Device Comparison */}
        <DeviceComparison
          onConfigureProduct={(product) => setConfiguringProduct(product)}
        />

        {/* Section: The Apple Difference (Perks & Services) */}
        <ApplePerks
          onOpenTradeIn={() => setIsTradeInOpen(true)}
          onOpenSpecialist={() => setIsSpecialistOpen(true)}
        />
      </main>

      {/* 5. Modals & Drawers */}
      {/* Product Configurator (The signature Apple Store purchase flow) */}
      <ConfiguratorModal
        product={configuringProduct}
        onClose={() => setConfiguringProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Product Quick View / Deep Spec modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onConfigure={(product) => setConfiguringProduct(product)}
      />

      {/* Apple Bag Slide-Over Drawer */}
      <AppleBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Simulated Apple Pay / Standard Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        isApplePay={checkoutIsApplePay}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setConfiguringProduct(p)}
      />

      {/* Specialist Concierge Modal */}
      <SpecialistModal
        isOpen={isSpecialistOpen}
        onClose={() => setIsSpecialistOpen(false)}
        onSelectProduct={(p) => setConfiguringProduct(p)}
      />

      {/* Retail Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      {/* Trade In Calculator Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        onSelectProductToUpgrade={(p) => setConfiguringProduct(p)}
      />

      {/* 6. Apple Store Footer */}
      <Footer />
    </div>
  );
}
