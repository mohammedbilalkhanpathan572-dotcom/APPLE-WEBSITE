import React, { useState } from 'react';
import { X, MapPin, Clock, Calendar, Check, Phone } from 'lucide-react';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [bookedStore, setBookedStore] = useState<string | null>(null);

  const STORES = [
    {
      name: 'Apple Fifth Avenue',
      address: '767 Fifth Avenue, New York, NY 10153',
      distance: '0.8 miles away',
      hours: 'Open 24 hours a day, 365 days a year',
      phone: '(212) 336-1440',
      iconic: 'Iconic Glass Cube',
    },
    {
      name: 'Apple SoHo',
      address: '103 Prince Street, New York, NY 10012',
      distance: '2.4 miles away',
      hours: 'Mon - Sat: 10:00 a.m. - 8:00 p.m. · Sun: 11:00 a.m. - 7:00 p.m.',
      phone: '(212) 226-3126',
    },
    {
      name: 'Apple Grand Central',
      address: '45 Grand Central Terminal, New York, NY 10017',
      distance: '1.2 miles away',
      hours: 'Mon - Fri: 8:00 a.m. - 8:00 p.m. · Sat - Sun: 10:00 a.m. - 7:00 p.m.',
      phone: '(212) 284-1800',
    },
    {
      name: 'Apple Regent Street',
      address: '235 Regent Street, London, W1B 2EL',
      distance: 'Flagship International',
      hours: 'Mon - Fri: 10:00 a.m. - 9:00 p.m.',
      phone: '+44 (0) 20 7153 9000',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <span className="text-xs text-[#86868b] uppercase font-semibold">
              Apple Retail Stores
            </span>
            <h2 className="text-xl font-semibold text-[#1d1d1f]">Find a Store Near You</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {bookedStore && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Shopping Session Reserved!</p>
                <p>We've reserved a personal Specialist appointment for you at {bookedStore} for tomorrow at 2:00 p.m.</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {STORES.map((s) => (
              <div
                key={s.name}
                className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/5 hover:border-[#0071e3]/30 transition-all space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-[#1d1d1f]">{s.name}</h3>
                    <p className="text-slate-600 mt-0.5">{s.address}</p>
                  </div>
                  <span className="text-[11px] font-medium text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded-full">
                    {s.distance}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{s.hours}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{s.phone}</span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setBookedStore(s.name)}
                    className="text-[#0071e3] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve a Shopping Session</span>
                  </button>
                  <button
                    onClick={() => {
                      alert(`Selected ${s.name} as your preferred in-store pickup location.`);
                      onClose();
                    }}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                  >
                    Set as My Store
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f5f5f7] border-t border-black/5 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
