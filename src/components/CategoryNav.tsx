import React from 'react';
import { STORE_CATEGORIES } from '../data/products';
import {
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Glasses,
  Headphones,
  Layers,
  Sparkles,
} from 'lucide-react';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-8 h-8" />;
      case 'Smartphone':
        return <Smartphone className="w-8 h-8" />;
      case 'Tablet':
        return <Tablet className="w-8 h-8" />;
      case 'Watch':
        return <Watch className="w-8 h-8" />;
      case 'Glasses':
        return <Glasses className="w-8 h-8" />;
      case 'Headphones':
        return <Headphones className="w-8 h-8" />;
      case 'Layers':
        return <Layers className="w-8 h-8" />;
      default:
        return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <div className="py-4 border-b border-black/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar py-2">
          {STORE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-200 shrink-0 ${
                  isSelected ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-white shadow-md text-[#0071e3] ring-2 ring-[#0071e3]/20'
                      : 'bg-white/60 group-hover:bg-white text-slate-700 group-hover:shadow-sm'
                  }`}
                >
                  {getIcon(cat.icon)}
                </div>
                <span
                  className={`text-xs sm:text-[13px] tracking-tight whitespace-nowrap ${
                    isSelected ? 'font-semibold text-[#0071e3]' : 'font-medium text-slate-700'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
