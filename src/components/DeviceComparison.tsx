import React from 'react';
import { COMPARISON_MODELS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface DeviceComparisonProps {
  onConfigureProduct: (product: Product) => void;
}

export const DeviceComparison: React.FC<DeviceComparisonProps> = ({ onConfigureProduct }) => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-black/5">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
          Compare Models
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
          Which iPhone is right for you?
        </h2>
        <p className="text-sm text-[#6e6e73] mt-2">
          Compare features, camera hardware, and battery life side by side.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {COMPARISON_MODELS.map((model) => {
          const matchedProduct = PRODUCTS.find((p) => p.id === model.id) || PRODUCTS[0];

          return (
            <div
              key={model.id}
              className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-black/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="h-44 flex items-center justify-center mb-6">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#1d1d1f] text-center mb-1">
                  {model.name}
                </h3>
                <p className="text-xs text-center text-[#6e6e73] mb-6">
                  From {model.price}
                </p>

                {/* Specs breakdown rows */}
                <div className="space-y-5 text-center text-xs sm:text-[13px] border-t border-black/5 pt-6">
                  <div>
                    <span className="text-[#86868b] text-[11px] block uppercase font-medium">Display</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{model.display}</span>
                  </div>

                  <div>
                    <span className="text-[#86868b] text-[11px] block uppercase font-medium">Processor</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{model.chip}</span>
                  </div>

                  <div>
                    <span className="text-[#86868b] text-[11px] block uppercase font-medium">Camera System</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{model.camera}</span>
                  </div>

                  <div>
                    <span className="text-[#86868b] text-[11px] block uppercase font-medium">Camera Control</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{model.cameraControl}</span>
                  </div>

                  <div>
                    <span className="text-[#86868b] text-[11px] block uppercase font-medium">Battery</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{model.battery}</span>
                  </div>

                  <div>
                    <span className="text-[#86868b] text-[11px] block uppercase font-medium">Enclosure</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{model.material}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5 mt-8 text-center">
                <button
                  onClick={() => onConfigureProduct(matchedProduct)}
                  className="w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Buy {model.name}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
