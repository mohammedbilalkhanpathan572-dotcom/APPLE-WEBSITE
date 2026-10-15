import React, { useState, useMemo } from 'react';
import { Product, ProductFinish, ProductSizeOption, StorageOption, CartItem } from '../types';
import { TRADE_IN_DEVICES } from '../data/products';
import { X, Check, ShieldCheck, Truck, Store, Sparkles, RefreshCw } from 'lucide-react';

interface ConfiguratorModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ConfiguratorModal: React.FC<ConfiguratorModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  // Selected state
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | undefined>(
    product.storageOptions ? product.storageOptions[0] : undefined
  );
  const [paymentType, setPaymentType] = useState<'full' | 'installments'>('full');
  const [selectedTradeInId, setSelectedTradeInId] = useState<string>('none');
  const [includeAppleCare, setIncludeAppleCare] = useState<boolean>(false);
  const [enableEngraving, setEnableEngraving] = useState<boolean>(false);
  const [engravingText, setEngravingText] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Price calculation
  const tradeInOption = TRADE_IN_DEVICES.find((d) => d.id === selectedTradeInId);
  const tradeInCredit = tradeInOption ? tradeInOption.estimatedCredit : 0;

  const basePrice = product.startingPrice;
  const sizeDelta = selectedSize ? selectedSize.priceDelta : 0;
  const storageDelta = selectedStorage ? selectedStorage.priceDelta : 0;
  const appleCarePrice = includeAppleCare ? 199 : 0;

  const grossPrice = basePrice + sizeDelta + storageDelta + appleCarePrice;
  const finalPrice = Math.max(0, grossPrice - tradeInCredit);
  const finalMonthlyPrice = (finalPrice / 24);

  const handleAdd = () => {
    setAddedAnimation(true);
    const cartItemId = `${product.id}-${selectedFinish.name}-${selectedSize?.name || 'default'}-${selectedStorage?.capacity || 'default'}-${includeAppleCare ? 'ac' : 'no'}-${tradeInCredit > 0 ? tradeInOption?.id : 'notrade'}`;

    const newItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      name: product.name,
      finish: selectedFinish,
      size: selectedSize,
      storage: selectedStorage,
      price: finalPrice,
      monthlyPrice: finalMonthlyPrice,
      image: product.image,
      engravingText: enableEngraving && engravingText.trim() ? engravingText.trim() : undefined,
      appleCare: includeAppleCare,
      tradeInCredit: tradeInCredit,
      tradeInDeviceName: tradeInOption?.deviceName,
      quantity: 1,
    };

    setTimeout(() => {
      onAddToCart(newItem);
      setAddedAnimation(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Top bar with close button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-black/5 flex items-center justify-between z-20">
          <div>
            <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
              Configure Your Device
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
              Buy {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close configuration"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Two Columns */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1">
          {/* Left Column: Visual Showcase & Specs */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-6 w-full flex flex-col items-center">
              <div className="w-full h-64 sm:h-80 bg-[#fbfbfd] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden border border-black/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-300"
                />

                {/* Selected finish badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-700 flex items-center gap-1.5 shadow-sm border border-black/5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: selectedFinish.hex }}
                  />
                  <span>{selectedFinish.name}</span>
                </div>
              </div>

              {/* Free Engraving Preview if enabled */}
              {enableEngraving && engravingText.trim() && (
                <div className="mt-3 w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold block mb-0.5">
                    Laser Engraving Preview
                  </span>
                  <span className="text-xs font-mono text-slate-800 tracking-widest font-medium">
                    "{engravingText}"
                  </span>
                </div>
              )}

              {/* Delivery perks info box */}
              <div className="w-full mt-6 space-y-3 text-xs text-[#6e6e73] bg-[#fbfbfd] p-4 rounded-2xl border border-black/5">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1d1d1f]">Free Delivery</p>
                    <p>Order today. Delivers tomorrow with standard express shipping.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Store className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1d1d1f]">Free In-Store Pickup</p>
                    <p>Available today at Apple Fifth Avenue and nearby stores.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1d1d1f]">Free Returns</p>
                    <p>Hassle-free 14-day return policy online or in store.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Pick Size/Model if available */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-3">
                  1. Select your model
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize?.name === size.name;
                    return (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0071e3] bg-white ring-2 ring-[#0071e3]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-sm text-[#1d1d1f]">{size.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#0071e3]" />}
                        </div>
                        <p className="text-xs text-[#6e6e73] mt-1">{size.displaySpec}</p>
                        <p className="text-xs text-[#1d1d1f] font-medium mt-2 tabular-nums">
                          {size.priceDelta > 0 ? `+$${size.priceDelta}` : 'Included'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Pick Finish */}
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">
                2. Select your finish.{' '}
                <span className="text-[#6e6e73] font-normal">{selectedFinish.name}</span>
              </h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {product.finishes.map((finish) => {
                  const isSelected = selectedFinish.name === finish.name;
                  return (
                    <button
                      key={finish.name}
                      onClick={() => setSelectedFinish(finish)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20 bg-slate-50 text-slate-900 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 bg-white text-slate-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: finish.hex }}
                      />
                      <span>{finish.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Pick Storage */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-3">
                  3. Select your storage
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.storageOptions.map((opt) => {
                    const isSelected = selectedStorage?.capacity === opt.capacity;
                    return (
                      <button
                        key={opt.capacity}
                        onClick={() => setSelectedStorage(opt)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0071e3] bg-white ring-2 ring-[#0071e3]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <span className="font-semibold text-sm text-[#1d1d1f] block">
                          {opt.capacity}
                        </span>
                        <span className="text-[11px] text-[#6e6e73] block mt-1 tabular-nums">
                          {opt.priceDelta > 0 ? `+$${opt.priceDelta}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Apple Trade In */}
            <div className="bg-[#fbfbfd] p-5 rounded-2xl border border-black/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0071e3]" />
                  <h3 className="text-sm font-semibold text-[#1d1d1f]">Apple Trade In</h3>
                </div>
                <span className="text-xs text-[#0071e3] font-medium">Save up to $650</span>
              </div>
              <p className="text-xs text-[#6e6e73] mb-3 leading-relaxed">
                Get credit toward your new device or recycle it for free. Select a model to calculate instant savings:
              </p>

              <select
                value={selectedTradeInId}
                onChange={(e) => setSelectedTradeInId(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0071e3] cursor-pointer"
              >
                <option value="none">No trade-in (Keep current device)</option>
                {TRADE_IN_DEVICES.map((d) => (
                  <option key={d.id} value={d.id}>
                    Trade in {d.deviceName} — Save ${d.estimatedCredit}
                  </option>
                ))}
              </select>

              {tradeInCredit > 0 && (
                <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                  <span>Trade-in Credit Applied:</span>
                  <span className="font-semibold tabular-nums">-${tradeInCredit}.00</span>
                </div>
              )}
            </div>

            {/* 5. Payment Options */}
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-3">
                4. Select payment option
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentType('full')}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    paymentType === 'full'
                      ? 'border-[#0071e3] bg-white ring-2 ring-[#0071e3]/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-400 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-[#1d1d1f]">Pay in full</span>
                    <span className="font-bold text-sm text-[#1d1d1f] tabular-nums">
                      ${finalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#6e6e73] mt-1">One-time payment with any major card.</p>
                </button>

                <button
                  onClick={() => setPaymentType('installments')}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    paymentType === 'installments'
                      ? 'border-[#0071e3] bg-white ring-2 ring-[#0071e3]/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-400 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-[#1d1d1f]">Apple Card Monthly</span>
                    <span className="font-bold text-sm text-[#1d1d1f] tabular-nums">
                      ${finalMonthlyPrice.toFixed(2)}/mo.
                    </span>
                  </div>
                  <p className="text-xs text-[#6e6e73] mt-1">24 mo. at 0% APR* + 3% Daily Cash</p>
                </button>
              </div>
            </div>

            {/* 6. AppleCare+ Coverage */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0071e3] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1d1d1f]">AppleCare+ Coverage</h4>
                  <p className="text-xs text-[#6e6e73] mt-0.5 leading-relaxed">
                    Unlimited accidental damage protection, priority Apple technical support, and express replacement service.
                  </p>
                  <span className="text-xs text-[#1d1d1f] font-medium block mt-1">
                    $199.00 for 2 years or $9.99/mo.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIncludeAppleCare(!includeAppleCare)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors shrink-0 ${
                  includeAppleCare
                    ? 'bg-[#0071e3] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {includeAppleCare ? 'Added ✓' : 'Add'}
              </button>
            </div>

            {/* 7. Free Laser Engraving */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#1d1d1f]">Personalize with Free Engraving</h4>
                  <p className="text-xs text-[#6e6e73]">Engrave your name, initials, or lucky number for free.</p>
                </div>
                <button
                  onClick={() => setEnableEngraving(!enableEngraving)}
                  className="text-xs text-[#0071e3] font-medium hover:underline cursor-pointer"
                >
                  {enableEngraving ? 'Remove' : 'Add Engraving'}
                </button>
              </div>

              {enableEngraving && (
                <div className="mt-3">
                  <input
                    type="text"
                    maxLength={20}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="Enter your custom message (max 20 chars)"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="sticky bottom-0 bg-[#f5f5f7]/95 backdrop-blur-md px-6 py-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1d1d1f] tabular-nums">
                ${finalPrice.toLocaleString()}
              </span>
              <span className="text-xs text-[#6e6e73] tabular-nums">
                or ${finalMonthlyPrice.toFixed(2)}/mo. for 24 mo.*
              </span>
            </div>
            {tradeInCredit > 0 && (
              <span className="text-xs text-emerald-700 font-medium">
                Includes ${tradeInCredit} Trade-in credit
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`px-8 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-2 ${
                addedAnimation ? 'scale-95 bg-emerald-600' : ''
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <span>Add to Bag</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
