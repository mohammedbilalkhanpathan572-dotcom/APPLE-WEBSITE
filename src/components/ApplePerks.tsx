import React from 'react';
import { Truck, Sparkles, Smile, CreditCard, Users, RefreshCw } from 'lucide-react';

interface ApplePerksProps {
  onOpenTradeIn: () => void;
  onOpenSpecialist: () => void;
}

export const ApplePerks: React.FC<ApplePerksProps> = ({ onOpenTradeIn, onOpenSpecialist }) => {
  const perks = [
    {
      icon: <Truck className="w-6 h-6 text-[#0071e3]" />,
      title: 'Fast, free delivery',
      description: 'Enjoy free next-day delivery on in-stock items, or pick up at your local Apple Store.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#0071e3]" />,
      title: 'Apple Trade In',
      description: 'Exchange your current smartphone, Mac, or Watch for instant credit towards your purchase.',
      actionLabel: 'Calculate trade-in value',
      action: onOpenTradeIn,
    },
    {
      icon: <Smile className="w-6 h-6 text-[#0071e3]" />,
      title: 'Make them yours',
      description: 'Engrave a mix of emoji, names, and numbers for free. Available on AirPods, AirTag, and iPad.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#0071e3]" />,
      title: 'Pay over time, interest-free',
      description: 'Choose Apple Card Monthly Installments at 0% APR and receive 3% Daily Cash back up front.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#0071e3]" />,
      title: 'Shop live with a Specialist',
      description: 'Let our specialists answer your questions and guide you to the perfect device.',
      actionLabel: 'Ask a Specialist',
      action: onOpenSpecialist,
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#0071e3]" />,
      title: 'Customized to your needs',
      description: 'Customize memory, storage, and graphics configuration on any Mac during checkout.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-black/5">
      <div className="mb-10 max-w-xl">
        <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block mb-1">
          Why Apple is the best place to buy
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
          The Apple difference.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perks.map((perk, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-black/5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-5">
                {perk.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{perk.title}</h3>
              <p className="text-xs sm:text-[13px] text-[#6e6e73] leading-relaxed">
                {perk.description}
              </p>
            </div>

            {perk.action && perk.actionLabel && (
              <div className="mt-6 pt-4 border-t border-black/5">
                <button
                  onClick={perk.action}
                  className="text-xs font-semibold text-[#0071e3] hover:underline cursor-pointer inline-flex items-center"
                >
                  {perk.actionLabel} →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
