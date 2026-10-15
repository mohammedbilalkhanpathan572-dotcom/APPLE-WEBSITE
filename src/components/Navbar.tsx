import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSpecialist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  activeCategory,
  onSelectCategory,
  onOpenSpecialist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'all', label: 'Store' },
    { id: 'mac', label: 'Mac' },
    { id: 'ipad', label: 'iPad' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'watch', label: 'Watch' },
    { id: 'vision', label: 'Vision' },
    { id: 'airpods', label: 'AirPods' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-black/5 transition-colors">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand / Apple Logo */}
        <button
          onClick={() => {
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-slate-900 hover:opacity-70 transition-opacity shrink-0 flex items-center gap-1.5 focus:outline-none"
          aria-label="Apple Store Home"
        >
          {/* Authentic Apple Icon SVG */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170" aria-hidden="true">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.71-11.64-14.01-6.19-9.67-11.06-20.73-14.61-33.19-3.56-12.45-5.34-24.11-5.34-34.98 0-14.44 3.73-26.65 11.19-36.63 7.46-9.98 16.9-15.08 28.32-15.3 4.89 0 10.1 1.25 15.62 3.74 5.52 2.5 9.17 3.8 10.96 3.91 1.57-.11 5.38-1.46 11.43-4.04 6.05-2.59 11.22-3.75 15.52-3.5 11.53.65 20.89 4.67 28.08 12.06-9.89 5.98-14.73 14.34-14.52 25.09.21 8.26 3.42 15.22 9.62 20.87 6.2 5.65 13.6 8.91 22.2 9.78-2.61 7.6-5.55 14.67-8.82 21.21zM119.22 31.84c0-7.39 2.66-14.34 7.98-20.85 5.32-6.52 11.95-10.49 19.89-11.91.54 1.74.82 3.48.82 5.22 0 7.39-2.82 14.45-8.47 21.19-5.65 6.74-12.4 10.74-20.22 12-0.22-1.74-.43-3.62-.64-5.65z"/>
          </svg>
          <span className="font-semibold text-sm tracking-tight hidden sm:inline">Store</span>
        </button>

        {/* Zone 2: Clean single-line desktop navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-[12px] font-normal text-[#1d1d1f]/80">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectCategory(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#0071e3] font-medium'
                    : 'hover:text-[#1d1d1f]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={onOpenSpecialist}
            className="whitespace-nowrap shrink-0 hover:text-[#1d1d1f] transition-colors cursor-pointer"
          >
            Specialist
          </button>
        </nav>

        {/* Zone 3: Search + Shopping Bag Action */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            onClick={onOpenSearch}
            className="text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors cursor-pointer p-1"
            aria-label="Search Apple Store"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors cursor-pointer p-1 flex items-center"
            aria-label={`Shopping Bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#0071e3] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-in fade-in duration-200">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1d1d1f]/80 hover:text-[#1d1d1f] p-1 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/10 px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectCategory(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base ${
                activeCategory === link.id
                  ? 'text-[#0071e3] font-medium'
                  : 'text-slate-800 hover:text-[#0071e3]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenSpecialist();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base text-slate-800 hover:text-[#0071e3]"
          >
            Ask a Specialist
          </button>
        </div>
      )}
    </header>
  );
};
