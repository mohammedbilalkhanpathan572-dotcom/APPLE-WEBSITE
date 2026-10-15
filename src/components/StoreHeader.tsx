import React from 'react';
import { MessageSquare, MapPin } from 'lucide-react';

interface StoreHeaderProps {
  onOpenSpecialist: () => void;
  onOpenStoreLocator: () => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  onOpenSpecialist,
  onOpenStoreLocator,
}) => {
  return (
    <section className="pt-10 pb-6 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left Heading */}
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-[#1d1d1f] leading-[1.08]">
            Store.{' '}
            <span className="text-[#6e6e73] font-normal">
              The best way to buy the products you love.
            </span>
          </h1>
        </div>

        {/* Right Consultation & Store Links */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-4 text-xs sm:text-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#1d1d1f] font-medium leading-tight">Need shopping help?</p>
              <button
                onClick={onOpenSpecialist}
                className="text-[#0071e3] hover:underline cursor-pointer font-normal text-left"
              >
                Ask a Specialist
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#1d1d1f] font-medium leading-tight">Visit an Apple Store</p>
              <button
                onClick={onOpenStoreLocator}
                className="text-[#0071e3] hover:underline cursor-pointer font-normal text-left"
              >
                Find one near you
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
