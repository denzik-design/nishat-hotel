import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Sparkles, Star } from 'lucide-react';
import logoImg from '../assets/nishat-logo.png';
import { PROPERTIES } from '../data/propertiesData';

export default function Footer({ activeProperty, setActiveProperty }) {
  return (
    <footer className="bg-nishat-darkNavy border-t border-nishat-gold/30 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand & Logo */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-nishat-navy border border-nishat-gold/50 rounded-full p-1 flex items-center justify-center">
              <img src={logoImg} alt="The Nishat Hotel" className="w-full h-full object-contain rounded-full drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-widest uppercase">
                THE NISHAT HOTEL
              </h3>
              <p className="text-[10px] text-nishat-gold tracking-widest uppercase">
                Johar Town • Gulberg • Islamabad
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Pakistan’s premier 5-star international luxury hospitality chain, offering unmatched elegance, high-fashion suites, and VIP direct privileges.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold pt-1">
            <Star className="w-4 h-4 text-nishat-gold fill-nishat-gold" />
            <span>5-Star Luxury Certified</span>
          </div>
        </div>

        {/* Col 2: Flagship Locations */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider border-b border-zinc-800 pb-2">
            Flagship Properties
          </h4>
          <ul className="space-y-2 text-xs text-zinc-300">
            {PROPERTIES.map(p => (
              <li key={p.id}>
                <button
                  onClick={() => {
                    setActiveProperty(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left hover:text-amber-300 transition-colors ${
                    activeProperty.id === p.id ? 'font-bold text-amber-300' : ''
                  }`}
                >
                  • {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Direct VIP Privileges */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider border-b border-zinc-800 pb-2">
            Direct Booking Advantages
          </h4>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Best Price Guarantee
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nishat-gold shrink-0" /> Free Daily Buffet Breakfast Included
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nishat-gold shrink-0" /> Guaranteed 2:00 PM Late Checkout
            </li>
            <li className="flex items-center gap-2 text-zinc-400">
              • Zero Hidden OTA Service Fees
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Concierge */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider border-b border-zinc-800 pb-2">
            Executive Desk Contact
          </h4>
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-nishat-gold shrink-0" />
              <span>UAN: +92 42 111 647 428</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-nishat-gold shrink-0" />
              <span>reservations@nishathotel.com</span>
            </p>
            <p className="flex items-start gap-2 text-zinc-400">
              <MapPin className="w-4 h-4 text-nishat-gold shrink-0 mt-0.5" />
              <span>{activeProperty.address}</span>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-400 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>© {new Date().getFullYear()} The Nishat Hotel & Properties. All Rights Reserved.</p>
        <p className="text-amber-200/80 font-serif">Where 5-Star Luxury Meets Timeless Hospitality</p>
      </div>
    </footer>
  );
}
