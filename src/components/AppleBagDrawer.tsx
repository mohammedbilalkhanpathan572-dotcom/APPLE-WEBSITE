import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

interface AppleBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: (isApplePay: boolean) => void;
}

export const AppleBagDrawer: React.FC<AppleBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const totalGross = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTradeInSavings = items.reduce(
    (sum, item) => sum + (item.tradeInCredit || 0) * item.quantity,
    0
  );
  const estimatedTax = totalGross * 0.0825;
  const grandTotal = totalGross + estimatedTax;
  const monthlyTotal = grandTotal / 24;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between bg-white">
            <h2 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
              Review your Bag
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Alert */}
          <div className="bg-[#f5f5f7] px-6 py-2.5 border-b border-black/5 flex items-center gap-2 text-xs text-[#1d1d1f]">
            <Truck className="w-4 h-4 text-[#0071e3] shrink-0" />
            <span>Eligible for <strong>Free Express Shipping</strong> and returns</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-[#1d1d1f]">Your Bag is empty.</h3>
                <p className="text-xs text-[#6e6e73] max-w-xs mx-auto">
                  Sign in or browse our store to explore the latest Apple devices and accessories.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-[#0071e3] text-white text-xs font-semibold hover:bg-[#0077ed] transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-black/5 pb-6 space-y-3 last:border-b-0"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[#fbfbfd] rounded-xl p-2 shrink-0 flex items-center justify-center border border-black/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-sm text-[#1d1d1f] truncate">
                          {item.name}
                        </h4>
                        <span className="font-semibold text-sm text-[#1d1d1f] tabular-nums shrink-0">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Configurations */}
                      <div className="text-[11px] text-[#6e6e73] mt-1 space-y-0.5">
                        {item.size && <p>{item.size.name}</p>}
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: item.finish.hex }}
                          />
                          <span>{item.finish.name}</span>
                          {item.storage && <span>· {item.storage.capacity}</span>}
                        </div>
                        {item.appleCare && (
                          <p className="text-[#0071e3] font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> AppleCare+ Protection included
                          </p>
                        )}
                        {item.engravingText && (
                          <p className="text-slate-700 italic">
                            Laser Engraving: "{item.engravingText}"
                          </p>
                        )}
                        {item.tradeInCredit > 0 && (
                          <p className="text-emerald-700 font-medium">
                            Trade-in: {item.tradeInDeviceName} (-${item.tradeInCredit * item.quantity})
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-slate-200 text-slate-700 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-slate-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-slate-200 text-slate-700 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout CTAs */}
          {items.length > 0 && (
            <div className="p-6 bg-[#f5f5f7] border-t border-black/5 space-y-4">
              <div className="space-y-1.5 text-xs text-[#6e6e73]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1d1d1f] font-medium tabular-nums">
                    ${totalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {totalTradeInSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Trade-in Credit Total</span>
                    <span className="tabular-nums">-${totalTradeInSavings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-[#1d1d1f] font-medium tabular-nums">
                    ${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1d1d1f] pt-2 border-t border-black/10">
                  <span>Total Due</span>
                  <span className="tabular-nums">
                    ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#86868b] tabular-nums">
                  or ${monthlyTotal.toFixed(2)}/mo. for 24 mo. with Apple Card
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                {/* Simulated Apple Pay Button */}
                <button
                  onClick={() => onProceedCheckout(true)}
                  className="w-full py-3 rounded-2xl bg-black text-white hover:bg-neutral-800 transition-all font-semibold flex items-center justify-center gap-1.5 text-sm cursor-pointer shadow-md active:scale-98"
                >
                  <span className="text-base font-normal tracking-tight">Buy with</span>
                  {/* Apple logo svg */}
                  <svg className="w-4 h-4 fill-white inline-block mb-0.5" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.71-11.64-14.01-6.19-9.67-11.06-20.73-14.61-33.19-3.56-12.45-5.34-24.11-5.34-34.98 0-14.44 3.73-26.65 11.19-36.63 7.46-9.98 16.9-15.08 28.32-15.3 4.89 0 10.1 1.25 15.62 3.74 5.52 2.5 9.17 3.8 10.96 3.91 1.57-.11 5.38-1.46 11.43-4.04 6.05-2.59 11.22-3.75 15.52-3.5 11.53.65 20.89 4.67 28.08 12.06-9.89 5.98-14.73 14.34-14.52 25.09.21 8.26 3.42 15.22 9.62 20.87 6.2 5.65 13.6 8.91 22.2 9.78-2.61 7.6-5.55 14.67-8.82 21.21zM119.22 31.84c0-7.39 2.66-14.34 7.98-20.85 5.32-6.52 11.95-10.49 19.89-11.91.54 1.74.82 3.48.82 5.22 0 7.39-2.82 14.45-8.47 21.19-5.65 6.74-12.4 10.74-20.22 12-0.22-1.74-.43-3.62-.64-5.65z"/>
                  </svg>
                  <span className="tracking-tight text-base">Pay</span>
                </button>

                {/* Standard Check Out Button */}
                <button
                  onClick={() => onProceedCheckout(false)}
                  className="w-full py-3 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all font-semibold flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer shadow-md active:scale-98"
                >
                  <span>Check Out</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
