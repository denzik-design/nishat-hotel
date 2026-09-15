import React from 'react';
import { Coffee, Clock, Sparkles, Tag, ShieldCheck, Gift } from 'lucide-react';

export default function DirectPerksBar({ onOpenModal }) {
  return (
    <div className="bg-gradient-to-r from-amber-950/90 via-nishat-darkNavy to-amber-950/90 border-y border-nishat-gold/40 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-nishat-gold/20 border-2 border-nishat-gold flex items-center justify-center text-nishat-gold shrink-0">
            <Gift className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-amber-200 uppercase tracking-widest flex items-center gap-2">
              ★ Direct Booking VIP Privileges
            </h3>
            <p className="text-xs text-zinc-300">
              Skip third-party OTA commissions and unlock guaranteed executive perks when reserving directly with us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto text-xs">
          <div className="bg-black/50 border border-nishat-gold/30 rounded-lg p-2.5 flex items-center gap-2 text-zinc-200">
            <Coffee className="w-4 h-4 text-nishat-gold shrink-0" />
            <span>Daily Buffet Breakfast Included</span>
          </div>
          <div className="bg-black/50 border border-nishat-gold/30 rounded-lg p-2.5 flex items-center gap-2 text-zinc-200">
            <Clock className="w-4 h-4 text-nishat-gold shrink-0" />
            <span>Guaranteed 2:00 PM Late Checkout</span>
          </div>
          <div className="bg-black/50 border border-nishat-gold/30 rounded-lg p-2.5 flex items-center gap-2 text-zinc-200 col-span-2 sm:col-span-1">
            <Tag className="w-4 h-4 text-nishat-gold shrink-0" />
            <span>Best Rate Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
}
