import React, { useState } from 'react';
import { X, Key, Lock, Unlock, Smartphone, CheckCircle2, Clock, ShieldCheck, Wifi, Sparkles, AlertCircle } from 'lucide-react';
import logoImg from '../assets/nishat-logo.png';
import { getAssignedRoomNumber } from '../data/loyaltyData';

export default function DigitalRoomKeyModal({
  booking,
  activeProperty,
  onClose
}) {
  const [unlockStatus, setUnlockStatus] = useState('idle'); // 'idle' | 'unlocking' | 'unlocked'
  const [walletType, setWalletType] = useState(null); // 'apple' | 'google' | null

  // Resolve room information
  const roomTitle = booking?.room?.title || 'Presidential Emporium Suite';
  const propertyName = booking?.property?.name || activeProperty?.name || 'The Nishat Hotel — Johar Town';
  const assignedRoom = getAssignedRoomNumber(booking?.room?.id || 'presidential');
  
  const checkIn = booking?.checkInDate || '2026-09-15';
  const checkOut = booking?.checkOutDate || '2026-09-17';
  const guestName = booking?.guestName || 'Director Malik Hamza';

  const handleSimulateUnlock = () => {
    setUnlockStatus('unlocking');
    setTimeout(() => {
      setUnlockStatus('unlocked');
      setTimeout(() => {
        setUnlockStatus('idle');
      }, 4000);
    }, 1500);
  };

  const handleAddToWallet = (type) => {
    setWalletType(type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-nishat-darkNavy border-2 border-nishat-gold rounded-3xl overflow-hidden shadow-2xl my-auto text-white">
        
        {/* Header Bar */}
        <div className="bg-nishat-navy border-b border-nishat-gold/40 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center text-amber-300">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  Digital Smart Keycard
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold px-2 py-0.2 rounded-full">
                  Temporary Pass
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-none mt-0.5">
                {assignedRoom} • {propertyName.replace('The Nishat Hotel — ', '')}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-nishat-gold rounded-full transition-all"
            aria-label="Close Room Key"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* THE TEMPORARY DIGITAL ROOM KEYCARD */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#0a1122] via-[#0f1d38] to-[#1c2c4c] border-2 border-nishat-gold/80 shadow-[0_15px_35px_rgba(180,140,72,0.3)] overflow-hidden">
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Brand & Room Number */}
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-black/60 border border-nishat-gold/60 rounded-full p-1 flex items-center justify-center shadow-lg">
                  <img src={logoImg} alt="The Nishat Hotel" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                    THE NISHAT HOTEL
                  </h4>
                  <span className="text-[10px] text-nishat-gold font-medium block">
                    Contactless Room Key
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-serif text-2xl font-black text-amber-300 tracking-wider block">
                  {assignedRoom}
                </span>
                <span className="text-[10px] text-zinc-300 font-medium block">
                  {roomTitle}
                </span>
              </div>
            </div>

            {/* Middle Section: NFC Antenna Circle & Tap Status */}
            <div className="my-8 flex flex-col items-center justify-center relative z-10">
              
              {/* Tap to Unlock Sensor Button */}
              <div className="relative">
                {unlockStatus === 'unlocking' && (
                  <>
                    <div className="absolute -inset-4 rounded-full border-2 border-amber-400/80 animate-ping" />
                    <div className="absolute -inset-8 rounded-full border border-amber-300/40 animate-ping delay-150" />
                  </>
                )}

                {unlockStatus === 'unlocked' && (
                  <div className="absolute -inset-4 rounded-full border-2 border-emerald-400/90 shadow-[0_0_30px_rgba(52,211,153,0.8)]" />
                )}

                <button
                  onClick={handleSimulateUnlock}
                  disabled={unlockStatus === 'unlocking'}
                  className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl border-2 ${
                    unlockStatus === 'unlocked'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300 scale-105'
                      : unlockStatus === 'unlocking'
                      ? 'bg-amber-950/90 border-amber-400 text-amber-300 animate-pulse'
                      : 'bg-zinc-900/90 border-nishat-gold text-amber-300 hover:scale-105 active:scale-95'
                  }`}
                >
                  {unlockStatus === 'unlocked' ? (
                    <>
                      <Unlock className="w-8 h-8 text-emerald-400 stroke-[2.5]" />
                      <span className="text-[9px] font-bold uppercase mt-1">Unlocked</span>
                    </>
                  ) : unlockStatus === 'unlocking' ? (
                    <>
                      <Wifi className="w-8 h-8 text-amber-300 animate-pulse rotate-90" />
                      <span className="text-[9px] font-bold uppercase mt-1">Reading NFC</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-8 h-8 text-nishat-gold stroke-[2.5]" />
                      <span className="text-[9px] font-bold uppercase mt-1">Tap Door</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              <div className="mt-4 text-center">
                {unlockStatus === 'unlocked' ? (
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Door Released — Welcome to {assignedRoom}!</span>
                  </div>
                ) : unlockStatus === 'unlocking' ? (
                  <span className="text-xs text-amber-300 font-medium">Communicating with Assa Abloy door reader...</span>
                ) : (
                  <span className="text-xs text-zinc-300 font-medium">Hold phone within 4cm of room door lock reader</span>
                )}
              </div>

            </div>

            {/* Bottom Card Row: Time-bounded Validity Window */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center relative z-10 text-[11px]">
              <div>
                <span className="text-zinc-400 text-[9px] uppercase tracking-wider block font-semibold">Reserved Guest</span>
                <strong className="text-white">{guestName}</strong>
              </div>

              <div className="text-right">
                <span className="text-zinc-400 text-[9px] uppercase tracking-wider block font-semibold">Access Window</span>
                <span className="text-amber-300 font-mono font-bold">
                  {checkIn} 14:00 → {checkOut} 14:00
                </span>
              </div>
            </div>

          </div>

          {/* TEMPORARY TIME-BOUND NOTICE */}
          <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-200">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">Temporary Reservation Pass Window</strong>
              <span>
                This keycard is valid exclusively during your reserved stay from <strong>{checkIn} at 2:00 PM</strong> until check-out on <strong>{checkOut} at 2:00 PM</strong>. Digital encryption keys are automatically revoked upon check-out.
              </span>
            </div>
          </div>

          {/* ADD TEMPORARY KEY TO APPLE WALLET & GOOGLE WALLET */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-nishat-gold" />
                Add Temporary Room Key to Phone Wallet
              </span>
              <span className="text-[10px] text-amber-300 font-semibold bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded">
                Stay-Duration Only
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Add Room Key to Apple Wallet */}
              <button
                onClick={() => handleAddToWallet('apple')}
                className="group bg-black hover:bg-zinc-900 border border-zinc-700 hover:border-white text-white p-3 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.8-12-14.28-5.77-8.6-10.27-18.7-13.5-30.3-3.23-11.6-4.85-22.3-4.85-32.1 0-14.36 3.65-26.24 10.95-35.63 7.3-9.39 16.5-14.15 27.6-14.28 4.78 0 10.08 1.25 15.89 3.75 5.8 2.5 9.77 3.82 11.91 3.96 1.76-.14 5.86-1.49 12.31-4.04 6.45-2.55 11.92-3.75 16.4-3.6 12.63.55 22.75 5.16 30.35 13.84-11.02 6.69-16.43 15.93-16.23 27.72.2 9.53 3.82 17.51 10.86 23.94 7.04 6.43 15.42 10.09 25.14 10.98-2.12 6.55-4.7 13.12-7.76 19.71zM119.22 33.64c0-7.04 2.55-13.79 7.65-20.25 5.1-6.46 11.45-10.99 19.05-13.39-.23 1.34-.4 2.53-.51 3.57-1.12 7.04-4.04 13.7-8.76 19.98-4.72 6.28-10.74 10.59-18.06 12.93-.24-.95-.37-1.9-.37-2.84z"/>
                </svg>
                <div className="text-left">
                  <span className="text-[9px] text-zinc-400 block uppercase leading-none font-medium">Add Key to</span>
                  <span className="text-xs font-bold text-white tracking-wide">Apple Wallet</span>
                </div>
              </button>

              {/* Save Room Key to Google Wallet */}
              <button
                onClick={() => handleAddToWallet('google')}
                className="group bg-[#1f2937] hover:bg-zinc-800 border border-zinc-600 hover:border-white text-white p-3 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow shrink-0 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs text-blue-600">G</span>
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-zinc-400 block uppercase leading-none font-medium">Save Key to</span>
                  <span className="text-xs font-bold text-white tracking-wide">Google Wallet</span>
                </div>
              </button>

            </div>

            {/* Temporary Pass Alert Feedback */}
            {walletType && (
              <div className="bg-blue-950/80 border border-blue-400/50 rounded-xl p-3 text-xs text-blue-200 flex items-start gap-2.5 animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">
                    Temporary Key Pass Configured in {walletType === 'apple' ? 'Apple Wallet' : 'Google Wallet'}!
                  </strong>
                  <span className="text-[11px] text-blue-200/90">
                    Your {assignedRoom} NFC key is enabled on your device. Simply hold your iPhone, Apple Watch, or Android near the door handle to enter. This pass will automatically expire and delete itself upon check-out on {checkOut}.
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-nishat-navy border-t border-nishat-gold/40 p-4 text-center">
          <button
            onClick={onClose}
            className="gold-gradient-bg text-nishat-navy font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg"
          >
            Close Smart Key
          </button>
        </div>

      </div>
    </div>
  );
}
