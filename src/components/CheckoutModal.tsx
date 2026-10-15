import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Lock, ArrowRight, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  isApplePay: boolean;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  isApplePay,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>(
    isApplePay ? 'processing' : 'details'
  );

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@icloud.com',
    phone: '(415) 890-2341',
    address: '100 Infinite Loop, Suite 4',
    city: 'Cupertino',
    state: 'CA',
    zip: '95014',
    cardNumber: '•••• •••• •••• 8821',
    expiry: '09/28',
    cvv: '921',
    deliverySpeed: 'express',
  });

  const [orderNumber] = useState(() => 'W' + Math.floor(100000000 + Math.random() * 900000000));

  // Calculations
  const totalGross = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTradeIn = items.reduce(
    (sum, item) => sum + (item.tradeInCredit || 0) * item.quantity,
    0
  );
  const tax = totalGross * 0.0825;
  const grandTotal = totalGross + tax;

  // Simulate Apple Pay trigger if isApplePay is active
  React.useEffect(() => {
    if (isApplePay && step === 'processing') {
      const timer = setTimeout(() => {
        setStep('confirmed');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isApplePay, step]);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('confirmed');
    }, 1200);
  };

  const handleFinish = () => {
    onOrderCompleted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-[#1d1d1f] tracking-tight">
              Apple Secure Checkout
            </span>
          </div>
          {step !== 'processing' && (
            <button
              onClick={step === 'confirmed' ? handleFinish : onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body content based on step */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#0071e3] border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-lg font-semibold text-[#1d1d1f]">
                {isApplePay ? 'Authorizing with Apple Pay...' : 'Processing your order...'}
              </h3>
              <p className="text-xs text-[#6e6e73]">
                Encrypting transaction details with secure enclave token.
              </p>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0071e3]" />
                  <span>1. Where should we deliver your order?</span>
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#6e6e73] mb-1">First Name</label>
                    <input
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6e6e73] mb-1">Last Name</label>
                    <input
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[#6e6e73] mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6e6e73] mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6e6e73] mb-1">Postal / ZIP Code</label>
                    <input
                      required
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6e6e73] mb-1">Email (for Order Tracking)</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6e6e73] mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="p-4 bg-[#fbfbfd] rounded-2xl border border-black/5 text-xs">
                <span className="font-semibold text-slate-900 block mb-2">Delivery Speed</span>
                <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked
                      className="text-[#0071e3] focus:ring-[#0071e3]"
                    />
                    <div>
                      <span className="font-medium text-slate-900 block">Free Express Delivery</span>
                      <span className="text-[11px] text-slate-500">Delivers tomorrow by 5:00 p.m.</span>
                    </div>
                  </div>
                  <span className="font-semibold text-emerald-700">FREE</span>
                </label>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#0071e3]" />
                  <span>2. Payment Method</span>
                </h3>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div>
                    <label className="block text-[#6e6e73] mb-1">Card Number</label>
                    <input
                      required
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#6e6e73] mb-1">Expiration (MM/YY)</label>
                      <input
                        required
                        type="text"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6e6e73] mb-1">CVV / Security Code</label>
                      <input
                        required
                        type="password"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order total strip */}
              <div className="flex items-center justify-between p-4 bg-[#f5f5f7] rounded-2xl text-sm font-semibold text-[#1d1d1f]">
                <span>Total Due Now</span>
                <span className="text-base tabular-nums">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Place Your Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                  Thank you for your order.
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73]">
                  We sent a confirmation receipt and tracking updates to <strong>{formData.email}</strong>.
                </p>
                <div className="inline-block bg-slate-100 px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-800 font-semibold tracking-wider">
                  Order #{orderNumber}
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="p-4 sm:p-5 bg-[#fbfbfd] rounded-2xl border border-black/5 text-xs space-y-3">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>Estimated Delivery</span>
                  <span className="text-[#0071e3]">Tomorrow by 5:00 p.m.</span>
                </div>
                {/* Visual Tracker Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-[#0071e3] h-full w-1/3 rounded-full" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-[#0071e3]">Order Placed</span>
                  <span>Preparing Shipment</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
              </div>

              {/* Purchased Items List */}
              <div className="space-y-3 border-t border-black/5 pt-4">
                <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                  Items Ordered
                </h4>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1.5">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-9 h-9 object-contain" />
                      <div>
                        <span className="font-medium text-slate-900 block">{item.name}</span>
                        <span className="text-slate-500 text-[11px]">
                          {item.finish.name} {item.storage ? `· ${item.storage.capacity}` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold tabular-nums text-slate-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Details Recap */}
              <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">Shipping to:</p>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-1/2 py-2.5 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-1/2 py-2.5 rounded-2xl bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
