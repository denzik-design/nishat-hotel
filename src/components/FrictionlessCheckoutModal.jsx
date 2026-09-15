import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Car, Coffee, HeartHandshake, User, Phone, Mail, ArrowRight, Lock, Calendar, Building, CreditCard, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { UPSELL_ADDONS } from '../data/propertiesData';
import ConfirmationFolio from './ConfirmationFolio';

export default function FrictionlessCheckoutModal({
  room,
  activeProperty,
  currency,
  checkInDate,
  checkOutDate,
  adults,
  childrenCount,
  onClose,
  onOpenDigitalKey,
  onOpenLoyalty,
  onBookingConfirmed
}) {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  if (!room) return null;

  // Calculate night count (default to 2 if not parsed)
  const calcNights = () => {
    if (!checkInDate || !checkOutDate) return 2;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 2;
  };

  const nights = calcNights();
  const roomSubtotal = room.basePricePKR * nights;

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = UPSELL_ADDONS.find(a => a.id === addonId);
    return sum + (item ? item.pricePKR : 0);
  }, 0);

  const taxesAndFees = Math.round((roomSubtotal + addonsTotal) * 0.16); // 16% Govt tax
  const grandTotalPKR = roomSubtotal + addonsTotal + taxesAndFees;

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !guestEmail) {
      alert("Please provide your Name, Phone/WhatsApp number, and Email to confirm your direct reservation.");
      return;
    }

    const confId = `NH-${Math.floor(10000 + Math.random() * 90000)}`;
    const resultData = {
      confId,
      room,
      property: activeProperty,
      nights,
      checkInDate,
      checkOutDate,
      adults,
      childrenCount,
      guestName,
      guestPhone,
      guestEmail,
      specialRequest,
      selectedAddons: selectedAddons.map(id => UPSELL_ADDONS.find(a => a.id === id)),
      roomSubtotal,
      addonsTotal,
      taxesAndFees,
      grandTotalPKR,
      currency
    };

    setConfirmationData(resultData);
    setIsConfirmed(true);
    if (onBookingConfirmed) {
      onBookingConfirmed(resultData);
    }
  };

  if (isConfirmed && confirmationData) {
    return (
      <ConfirmationFolio 
        booking={confirmationData} 
        onClose={onClose} 
        onOpenDigitalKey={() => onOpenDigitalKey && onOpenDigitalKey(confirmationData)}
        onOpenLoyalty={onOpenLoyalty}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-nishat-darkNavy border-2 border-nishat-gold/60 rounded-2xl overflow-hidden shadow-2xl my-auto">
        
        {/* Header Bar */}
        <div className="bg-nishat-navy border-b border-nishat-gold/40 px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-nishat-gold/20 border border-nishat-gold flex items-center justify-center text-nishat-gold font-bold">
              ★
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-nishat-gold block">
                Frictionless Direct Checkout
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Reserve {room.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-nishat-gold rounded-full transition-all"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[80vh] overflow-y-auto">
          
          {/* Left Main Form Column (8 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-zinc-800">
            
            {/* Step 1: Booking Summary Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-2">
                <div>
                  <span className="text-xs text-nishat-gold font-bold uppercase tracking-wider block">Selected Property</span>
                  <h4 className="font-serif text-sm font-bold text-white">{activeProperty.name}</h4>
                  <p className="text-xs text-zinc-400">{activeProperty.tagline}</p>
                </div>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded">
                  VIP Direct Rate
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-300 pt-1">
                <div>
                  <span className="text-zinc-500 block">Check-in / Check-out</span>
                  <span className="font-semibold text-white">{checkInDate} to {checkOutDate} ({nights} Nights)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Guests</span>
                  <span className="font-semibold text-white">{adults} Adults, {childrenCount} Children</span>
                </div>
              </div>
            </div>

            {/* Step 2: High-Margin Upsell Add-ons */}
            <div>
              <h4 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-nishat-gold" />
                Elevate Your Stay with Executive Add-ons
              </h4>

              <div className="space-y-3">
                {UPSELL_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked 
                          ? 'bg-nishat-gold/15 border-nishat-gold text-white shadow-md' 
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-nishat-gold border-nishat-gold text-nishat-navy' : 'border-zinc-600 bg-zinc-800'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">{addon.title}</span>
                          <span className="text-[11px] text-zinc-400 font-light block">{addon.subtitle}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-amber-300">
                          +{formatCurrency(addon.pricePKR, currency)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Express Guest Details */}
            <form onSubmit={handleConfirmReservation} className="space-y-3 pt-2 border-t border-zinc-800">
              <h4 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-nishat-gold" />
                Express Guest Registration
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1">Full Guest Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Director Hamza Farooq"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-nishat-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-300 block mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-nishat-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-300 block mb-1">Email Address (For Voucher) *</label>
                    <input
                      type="email"
                      required
                      placeholder="guest@executive.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-nishat-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1">Special Requests (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Quiet floor, early check-in preference"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-nishat-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>
            </form>

          </div>

          {/* Right Live Order Total Column (5 cols) */}
          <div className="lg:col-span-5 bg-nishat-navy/80 p-4 sm:p-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider border-b border-zinc-800 pb-2">
                Live Order Summary
              </h4>

              {/* Item Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>{room.title} ({nights} Nights)</span>
                  <span className="font-semibold text-white">{formatCurrency(roomSubtotal, currency)}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="border-t border-zinc-800/80 pt-2 space-y-1.5">
                    <span className="text-[11px] font-semibold text-nishat-gold block">Selected Add-ons:</span>
                    {selectedAddons.map(id => {
                      const item = UPSELL_ADDONS.find(a => a.id === id);
                      return (
                        <div key={id} className="flex justify-between text-zinc-400 pl-2 text-[11px]">
                          <span>• {item.title}</span>
                          <span className="text-zinc-200">{formatCurrency(item.pricePKR, currency)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
                  <span>Govt Taxes & Service (16%)</span>
                  <span>{formatCurrency(taxesAndFees, currency)}</span>
                </div>
              </div>

              {/* Total Price Box */}
              <div className="bg-zinc-900/90 border-2 border-nishat-gold/60 rounded-xl p-4 space-y-1 text-center gold-border-glow">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Total Instant Amount</span>
                <div className="font-serif text-2xl sm:text-3xl font-black gold-gradient-text">
                  {formatCurrency(grandTotalPKR, currency)}
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  ✓ Pay at Hotel or Instant Guarantee
                </div>
              </div>

              {/* Included VIP Direct Badges */}
              <div className="bg-black/40 border border-zinc-800 rounded-lg p-3 space-y-1.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Complimentary Executive Buffet Breakfast
                </div>
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Guaranteed Late Checkout (2:00 PM)
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-nishat-gold" /> Best Price Guarantee & Free Cancellation
                </div>
              </div>
            </div>

            {/* Bottom Submit CTA */}
            <div className="space-y-3">
              <button
                onClick={handleConfirmReservation}
                className="w-full gold-gradient-bg text-nishat-navy font-black py-4 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Lock className="w-4 h-4 text-nishat-navy" />
                <span>Confirm Instant Direct Reservation</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-zinc-400">
                🔒 256-Bit SSL Encrypted Direct Reservation Engine
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
