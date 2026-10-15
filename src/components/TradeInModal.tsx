import React, { useState } from 'react';
import { X, Check, Sparkles, Smartphone, Laptop, Watch, ArrowRight } from 'lucide-react';
import { TRADE_IN_DEVICES, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductToUpgrade: (product: Product) => void;
}

export const TradeInModal: React.FC<TradeInModalProps> = ({
  isOpen,
  onClose,
  onSelectProductToUpgrade,
}) => {
  if (!isOpen) return null;

  const [selectedCategory, setSelectedCategory] = useState<'iphone' | 'mac' | 'watch'>('iphone');
  const [selectedDevice, setSelectedDevice] = useState(TRADE_IN_DEVICES[0]);
  const [conditionGood, setConditionGood] = useState(true);

  const filteredDevices = TRADE_IN_DEVICES.filter((d) => d.category === selectedCategory);
  const calculatedCredit = conditionGood
    ? selectedDevice.estimatedCredit
    : Math.round(selectedDevice.estimatedCredit * 0.7);

  const upgradeTarget = PRODUCTS.find((p) => p.category === selectedCategory) || PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0071e3]" />
            <h2 className="text-lg font-semibold text-[#1d1d1f]">Apple Trade In Value Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Step 1: Select Category */}
          <div>
            <label className="font-semibold text-slate-900 block mb-2">
              1. What type of device are you trading in?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('iphone');
                  const first = TRADE_IN_DEVICES.find((d) => d.category === 'iphone');
                  if (first) setSelectedDevice(first);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedCategory === 'iphone'
                    ? 'border-[#0071e3] bg-blue-50/50 text-[#0071e3] font-semibold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1" />
                <span>iPhone</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('mac');
                  const first = TRADE_IN_DEVICES.find((d) => d.category === 'mac');
                  if (first) setSelectedDevice(first);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedCategory === 'mac'
                    ? 'border-[#0071e3] bg-blue-50/50 text-[#0071e3] font-semibold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <Laptop className="w-5 h-5 mx-auto mb-1" />
                <span>Mac</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('watch');
                  const first = TRADE_IN_DEVICES.find((d) => d.category === 'watch');
                  if (first) setSelectedDevice(first);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedCategory === 'watch'
                    ? 'border-[#0071e3] bg-blue-50/50 text-[#0071e3] font-semibold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <Watch className="w-5 h-5 mx-auto mb-1" />
                <span>Apple Watch</span>
              </button>
            </div>
          </div>

          {/* Step 2: Select Exact Model */}
          <div>
            <label className="font-semibold text-slate-900 block mb-2">
              2. Select your device model
            </label>
            <select
              value={selectedDevice.id}
              onChange={(e) => {
                const found = TRADE_IN_DEVICES.find((d) => d.id === e.target.value);
                if (found) setSelectedDevice(found);
              }}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none cursor-pointer"
            >
              {filteredDevices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.deviceName} (Up to ${d.estimatedCredit})
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Condition Check */}
          <div>
            <label className="font-semibold text-slate-900 block mb-2">
              3. Is the device in good working condition?
            </label>
            <p className="text-xs text-[#6e6e73] mb-3">
              Does it turn on, hold a charge, and have an intact screen without cracks?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConditionGood(true)}
                className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  conditionGood
                    ? 'border-[#0071e3] bg-blue-50 text-[#0071e3] font-semibold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                Yes, good condition
              </button>
              <button
                onClick={() => setConditionGood(false)}
                className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  !conditionGood
                    ? 'border-[#0071e3] bg-blue-50 text-[#0071e3] font-semibold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                Minor wear or cracked glass
              </button>
            </div>
          </div>

          {/* Valuation Result Callout */}
          <div className="p-5 bg-[#f5f5f7] rounded-2xl border border-black/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#86868b] uppercase font-semibold block">
                Estimated Trade-in Credit
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-700 tabular-nums">
                ${calculatedCredit}.00
              </span>
              <span className="text-xs text-[#6e6e73] block mt-0.5">
                Applied instantly to your new {upgradeTarget.name}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectProductToUpgrade(upgradeTarget);
              }}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Apply to {upgradeTarget.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
