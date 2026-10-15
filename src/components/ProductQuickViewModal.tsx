import React from 'react';
import { Product } from '../types';
import { X, CheckCircle2, Cpu, Smartphone, Battery, Shield, Camera, Wifi } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onConfigure: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onConfigure,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <span className="text-xs text-[#86868b] uppercase font-semibold">
              Product Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f]">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Visual & Tagline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-64 sm:h-72 bg-[#fbfbfd] rounded-2xl flex items-center justify-center p-6 border border-black/5">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain drop-shadow-md"
              />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-[#0071e3] tracking-wider mb-1">
                {product.category}
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                {product.tagline}
              </h3>
              <p className="text-sm text-[#6e6e73] mt-3 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-5 text-lg font-bold text-[#1d1d1f] tabular-nums">
                From ${product.startingPrice.toLocaleString()} or ${product.monthlyPrice.toFixed(2)}/mo. for 24 mo.*
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-base font-semibold text-[#1d1d1f] mb-3">
              Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3.5 bg-[#fbfbfd] rounded-xl border border-black/5 text-xs sm:text-[13px] text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h4 className="text-base font-semibold text-[#1d1d1f] mb-3">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-[13px]">
              {product.specs.chip && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Cpu className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Chip / Processor</span>
                    <span className="text-slate-600">{product.specs.chip}</span>
                  </div>
                </div>
              )}
              {product.specs.display && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Smartphone className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Display</span>
                    <span className="text-slate-600">{product.specs.display}</span>
                  </div>
                </div>
              )}
              {product.specs.camera && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Camera className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Camera System</span>
                    <span className="text-slate-600">{product.specs.camera}</span>
                  </div>
                </div>
              )}
              {product.specs.battery && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Battery className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Battery Life</span>
                    <span className="text-slate-600">{product.specs.battery}</span>
                  </div>
                </div>
              )}
              {product.specs.material && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Shield className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Build Material</span>
                    <span className="text-slate-600">{product.specs.material}</span>
                  </div>
                </div>
              )}
              {product.specs.connectivity && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Wifi className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Connectivity</span>
                    <span className="text-slate-600">{product.specs.connectivity}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Buy CTA */}
        <div className="px-6 py-4 bg-[#f5f5f7] border-t border-black/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close Overview
          </button>
          <button
            onClick={() => {
              onClose();
              onConfigure(product);
            }}
            className="px-6 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            Configure & Buy {product.name}
          </button>
        </div>
      </div>
    </div>
  );
};
