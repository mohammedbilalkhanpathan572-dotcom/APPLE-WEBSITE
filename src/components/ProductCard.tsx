import React, { useState } from 'react';
import { Product } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
}) => {
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const activeFinish = product.finishes[selectedFinishIndex] || product.finishes[0];

  return (
    <div className="group bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative border border-black/[0.04]">
      {/* Top Header & Metadata */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#86868b] uppercase tracking-wider mb-1 font-semibold">
          <span>{product.category}</span>
          {product.isNew && (
            <span className="text-[#b64400] font-medium tracking-normal text-[11px] normal-case">
              New
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
          {product.name}
        </h3>

        <p className="text-xs sm:text-[13px] text-[#6e6e73] mt-1 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* Pricing Info */}
        <div className="mt-3 text-sm text-[#1d1d1f]">
          <span className="font-semibold tabular-nums">From ${product.startingPrice.toLocaleString()}</span>
          <span className="text-[#86868b] text-xs ml-1.5 tabular-nums">
            or ${product.monthlyPrice.toFixed(2)}/mo. for 24 mo.*
          </span>
        </div>
      </div>

      {/* Center Studio Image Slot */}
      <div
        className="my-6 relative h-56 sm:h-64 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full rounded-2xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            <Sparkles className="w-8 h-8 mb-2 text-slate-300" />
            <p className="text-xs font-medium text-slate-600">{product.name}</p>
            <p className="text-[11px] text-slate-400">Apple Studio Showcase</p>
          </div>
        )}
      </div>

      {/* Bottom Controls: Color Finish Swatches + Buy CTA */}
      <div>
        {/* Finish Swatches */}
        {product.finishes && product.finishes.length > 1 && (
          <div className="flex items-center justify-center gap-2 mb-5">
            {product.finishes.map((finish, idx) => (
              <button
                key={finish.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFinishIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-transform duration-150 cursor-pointer ${
                  selectedFinishIndex === idx ? 'ring-2 ring-offset-2 ring-[#0071e3] scale-110' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: finish.hex }}
                title={finish.name}
                aria-label={`Select ${finish.name}`}
              />
            ))}
            <span className="text-[11px] text-[#86868b] ml-1 truncate max-w-[100px]">
              {activeFinish?.name}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-black/5 gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-[13px] text-[#0071e3] hover:underline cursor-pointer flex items-center font-medium"
          >
            <span>Learn more</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            className="px-4 py-1.5 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] active:scale-95 text-xs sm:text-[13px] font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
