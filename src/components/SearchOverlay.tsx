import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    'iPhone 16 Pro',
    'MacBook Pro with M4',
    'Apple Watch Ultra 2',
    'Apple Vision Pro',
    'AirPods Max',
    'Trade In Calculator',
  ];

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-2xl pt-6 pb-10 px-4 sm:px-8 max-h-[85vh] overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Search bar input */}
          <div className="flex items-center gap-3 border-b-2 border-slate-300 pb-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apple.com/store, products, or specs"
              className="w-full text-lg sm:text-xl font-medium text-[#1d1d1f] placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="text-xs font-semibold text-[#0071e3] hover:underline cursor-pointer ml-2 whitespace-nowrap"
            >
              Cancel
            </button>
          </div>

          {/* If query is empty: Quick links */}
          {!query.trim() ? (
            <div className="mt-8 space-y-4">
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                Quick Links
              </span>
              <div className="space-y-2.5">
                {quickLinks.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="flex items-center gap-2 text-sm text-[#1d1d1f] hover:text-[#0071e3] transition-colors cursor-pointer w-full text-left py-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results list */
            <div className="mt-8 space-y-4">
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                {filteredProducts.length} Results for "{query}"
              </span>

              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No matching products found. Try searching for "iPhone", "MacBook", or "Watch".
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-black/5 flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#fbfbfd] rounded-xl flex items-center justify-center p-2 border border-black/5">
                          <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <span className="text-xs text-[#86868b] uppercase block font-semibold">
                            {p.category}
                          </span>
                          <span className="text-sm font-semibold text-[#1d1d1f] block">
                            {p.name}
                          </span>
                          <span className="text-xs text-[#6e6e73] line-clamp-1">
                            {p.tagline}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#1d1d1f] tabular-nums block">
                          From ${p.startingPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#0071e3] font-medium hover:underline inline-flex items-center">
                          Buy →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
