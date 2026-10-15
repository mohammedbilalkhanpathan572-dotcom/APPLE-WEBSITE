import React from 'react';
import { ChevronRight } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenTradeIn: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenTradeIn }) => {
  return (
    <div className="bg-[#f5f5f7] border-b border-black/5 py-3 px-4 text-center text-xs sm:text-sm text-[#1d1d1f]">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 flex-wrap">
        <span className="font-normal text-slate-700">
          Get $180–$650 in trade-in credit when you upgrade to iPhone 16 or iPhone 16 Pro.*
        </span>
        <button
          onClick={onOpenTradeIn}
          className="text-[#0071e3] hover:underline inline-flex items-center gap-0.5 font-medium cursor-pointer"
        >
          <span>See what your device is worth</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
