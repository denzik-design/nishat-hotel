import React, { useState } from 'react';
import { X, Award, Sparkles, QrCode, CheckCircle2, ShieldCheck, CreditCard, ChevronRight, Gift, Smartphone } from 'lucide-react';
import logoImg from '../assets/nishat-logo.png';
import { MOCK_LOYALTY_MEMBER } from '../data/loyaltyData';

export default function LoyaltyPassModal({ onClose }) {
  const [walletAddedType, setWalletAddedType] = useState(null); // 'apple' | 'google' | null
  const [showQrEnlarge, setShowQrEnlarge] = useState(false);

  const handleAddToWallet = (type) => {
    setWalletAddedType(type);
    setTimeout(() => {
      // Keep alert visible
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-nishat-darkNavy border-2 border-nishat-gold/60 rounded-3xl overflow-hidden shadow-2xl my-auto text-white">
        
        {/* Header Bar */}
        <div className="bg-nishat-navy border-b border-nishat-gold/40 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-nishat-gold/20 border border-nishat-gold flex items-center justify-center text-nishat-gold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-nishat-gold block">
                Nishat Privilege Club
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-none mt-0.5">
                Digital VIP Loyalty Pass
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-nishat-gold rounded-full transition-all"
            aria-label="Close Loyalty Pass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* THE DIGITAL LOYALTY CARD (Metallic Black & Gold Design) */}
          <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/80 border-2 border-nishat-gold/80 shadow-[0_15px_35px_rgba(180,140,72,0.25)] overflow-hidden">
            
            {/* Background Texture Accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-nishat-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Card Row */}
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black/60 border border-nishat-gold/60 rounded-full p-1 flex items-center justify-center shadow-lg">
                  <img src={logoImg} alt="The Nishat Hotel" className="w-full h-full object-contain filter invert drop-shadow-[0_0_8px_rgba(180,140,72,0.8)]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold tracking-[0.2em] text-white uppercase leading-tight">
                    THE NISHAT
                  </h4>
                  <span className="text-[10px] tracking-widest text-amber-300 font-semibold uppercase block">
                    Privilege Club
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-nishat-navy font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                  {MOCK_LOYALTY_MEMBER.tier}
                </span>
                <span className="text-[9px] text-zinc-400 block mt-1 tracking-wider">Permanent VIP</span>
              </div>
            </div>

            {/* Middle Card Row: Chip & Contactless NFC */}
            <div className="my-6 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                {/* Simulated EMV Chip */}
                <div className="w-10 h-7 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded border border-amber-600/60 shadow-inner flex items-center justify-center">
                  <div className="w-7 h-4 border border-amber-800/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                    <div className="border-r border-amber-800/40"></div>
                    <div></div>
                  </div>
                </div>
                {/* Contactless Signal */}
                <div className="text-nishat-gold opacity-80 text-sm font-mono tracking-tighter">
                  <svg className="w-5 h-5 text-amber-300 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                    <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                    <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                  </svg>
                </div>
              </div>

              {/* QR Code Barcode */}
              <button 
                onClick={() => setShowQrEnlarge(!showQrEnlarge)}
                className="bg-white p-1.5 rounded-lg border border-amber-400 shadow-md hover:scale-105 transition-transform"
                title="Click to expand QR Pass"
              >
                <QrCode className="w-7 h-7 text-zinc-950" />
              </button>
            </div>

            {/* Bottom Card Row */}
            <div className="flex justify-between items-end relative z-10 pt-2 border-t border-white/10">
              <div>
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-medium">Cardholder</span>
                <h5 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  {MOCK_LOYALTY_MEMBER.fullName}
                </h5>
                <span className="text-[10px] text-amber-300 font-mono tracking-wider">
                  {MOCK_LOYALTY_MEMBER.memberId}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-medium">Rewards Balance</span>
                <span className="font-serif text-base sm:text-lg font-extrabold gold-gradient-text">
                  {MOCK_LOYALTY_MEMBER.points.toLocaleString()} PTS
                </span>
              </div>
            </div>

          </div>

          {/* PERMANENT WALLET BUTTONS (Apple Wallet & Google Wallet) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-nishat-gold" />
                Save Permanently to Mobile Wallet
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                Lifetime NFC Pass
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Add to Apple Wallet Button */}
              <button
                onClick={() => handleAddToWallet('apple')}
                className="group relative bg-black hover:bg-zinc-900 border border-zinc-700 hover:border-white text-white p-3 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98"
              >
                {/* Apple Logo Icon */}
                <svg className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.8-12-14.28-5.77-8.6-10.27-18.7-13.5-30.3-3.23-11.6-4.85-22.3-4.85-32.1 0-14.36 3.65-26.24 10.95-35.63 7.3-9.39 16.5-14.15 27.6-14.28 4.78 0 10.08 1.25 15.89 3.75 5.8 2.5 9.77 3.82 11.91 3.96 1.76-.14 5.86-1.49 12.31-4.04 6.45-2.55 11.92-3.75 16.4-3.6 12.63.55 22.75 5.16 30.35 13.84-11.02 6.69-16.43 15.93-16.23 27.72.2 9.53 3.82 17.51 10.86 23.94 7.04 6.43 15.42 10.09 25.14 10.98-2.12 6.55-4.7 13.12-7.76 19.71zM119.22 33.64c0-7.04 2.55-13.79 7.65-20.25 5.1-6.46 11.45-10.99 19.05-13.39-.23 1.34-.4 2.53-.51 3.57-1.12 7.04-4.04 13.7-8.76 19.98-4.72 6.28-10.74 10.59-18.06 12.93-.24-.95-.37-1.9-.37-2.84z"/>
                </svg>
                <div className="text-left">
                  <span className="text-[9px] text-zinc-400 block uppercase leading-none font-medium">Add to</span>
                  <span className="text-xs font-bold text-white tracking-wide">Apple Wallet</span>
                </div>
              </button>

              {/* Save to Google Wallet Button */}
              <button
                onClick={() => handleAddToWallet('google')}
                className="group relative bg-[#1f2937] hover:bg-zinc-800 border border-zinc-600 hover:border-white text-white p-3 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98"
              >
                {/* Google Wallet Icon */}
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow shrink-0 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs text-blue-600">G</span>
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-zinc-400 block uppercase leading-none font-medium">Save to</span>
                  <span className="text-xs font-bold text-white tracking-wide">Google Wallet</span>
                </div>
              </button>

            </div>

            {/* Wallet Success Feedback Banner */}
            {walletAddedType && (
              <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-3 text-xs text-emerald-200 flex items-start gap-2.5 animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">
                    Added to {walletAddedType === 'apple' ? 'Apple Wallet' : 'Google Wallet'} Permanently!
                  </strong>
                  <span className="text-[11px] text-emerald-200/90">
                    Your Nishat Black Elite pass is permanently stored. Present it via NFC or barcode at Johar Town, Gulberg, and Islamabad for 15% dining discounts and VIP upgrades.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Member Privileges Breakdown */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-3">
            <h5 className="font-serif text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-800 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-nishat-gold" />
              Nishat Black Elite Privileges
            </h5>

            <div className="space-y-2 text-xs text-zinc-300">
              {MOCK_LOYALTY_MEMBER.perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-nishat-gold shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="bg-nishat-navy border-t border-nishat-gold/40 p-4 text-center">
          <button
            onClick={onClose}
            className="gold-gradient-bg text-nishat-navy font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg"
          >
            Close Loyalty Pass
          </button>
        </div>

      </div>
    </div>
  );
}
