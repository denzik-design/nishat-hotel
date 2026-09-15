import React from 'react';
import { Coffee, Clock, Sparkles, Tag, ShieldCheck, Gift } from 'lucide-react';

export default function DirectPerksBar({ onOpenModal }) {
  return (
    <div className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black border-y-2 border-amber-300 py-6 px-4 sm:px-6 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-black text-amber-300 border-2 border-black flex items-center justify-center shadow-md shrink-0">
            <Gift className="w-6 h-6 animate-pulse text-amber-300" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-black uppercase tracking-widest flex items-center gap-2">
              ★ Direct Booking VIP Privileges
            </h3>
            <p className="text-xs text-zinc-900 font-medium max-w-xl">
              Skip third-party OTA commissions and unlock guaranteed executive perks when reserving directly with us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto text-xs">
          <div className="bg-black/90 text-white border border-black/40 rounded-xl p-2.5 flex items-center gap-2 shadow-sm font-semibold">
            <Coffee className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Daily Buffet Breakfast Included</span>
          </div>
          <div className="bg-black/90 text-white border border-black/40 rounded-xl p-2.5 flex items-center gap-2 shadow-sm font-semibold">
            <Clock className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Guaranteed 2:00 PM Late Checkout</span>
          </div>
          <div className="bg-black/90 text-white border border-black/40 rounded-xl p-2.5 flex items-center gap-2 shadow-sm font-semibold col-span-2 sm:col-span-1">
            <Tag className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Best Rate Direct Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
}
