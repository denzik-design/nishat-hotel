import React, { useState } from 'react';
import { CheckCircle2, Download, MessageSquare, Building, Calendar, User, Phone, Mail, Printer, ShieldCheck, Sparkles, X, Key, Award, Smartphone } from 'lucide-react';
import logoImg from '../assets/nishat-logo.png';
import { formatCurrency } from '../utils/currency';
import { getAssignedRoomNumber } from '../data/loyaltyData';

export default function ConfirmationFolio({
  booking,
  onClose,
  onOpenDigitalKey,
  onOpenLoyalty
}) {
  const [walletNotice, setWalletNotice] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const assignedRoom = getAssignedRoomNumber(booking?.room?.id);

  const handleWhatsAppVoucher = () => {
    const text = `*THE NISHAT HOTEL - DIRECT RESERVATION VOUCHER*%0A` +
      `*Reservation ID:* ${booking.confId}%0A` +
      `*Hotel Property:* ${booking.property.name}%0A` +
      `*Room Category:* ${booking.room.title} (${assignedRoom})%0A` +
      `*Dates:* ${booking.checkInDate} to ${booking.checkOutDate} (${booking.nights} Nights)%0A` +
      `*Guest Name:* ${booking.guestName}%0A` +
      `*Total Amount:* ${formatCurrency(booking.grandTotalPKR, booking.currency)}%0A%0A` +
      `*Digital Keycard:* Valid from 14:00 check-in to 14:00 check-out.%0A` +
      `*VIP Privileges Included:* Complimentary Daily Buffet Breakfast & Guaranteed 2:00 PM Late Checkout.%0A` +
      `Thank you for reserving direct with The Nishat Hotel!`;
    
    window.open(`https://wa.me/${booking.property.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-3xl bg-nishat-navy border-2 border-nishat-gold rounded-2xl overflow-hidden shadow-2xl my-auto text-white">
        
        {/* Top Gold Header */}
        <div className="bg-gradient-to-r from-nishat-darkNavy via-amber-950/60 to-nishat-darkNavy border-b border-nishat-gold/40 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 rounded-full transition-all print:hidden"
            aria-label="Close Confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-400 rounded-full mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-nishat-gold">
            Direct Reservation Confirmed
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Confirmation #{booking.confId}
          </h2>

          <p className="text-xs text-zinc-300 mt-1">
            Your 5-star reservation at <span className="font-semibold text-amber-200">{booking.property.name}</span> is guaranteed.
          </p>
        </div>

        {/* Folio Printable Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto print:max-h-none">
          
          {/* Header Monogram & Hotel Details */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-nishat-darkNavy border border-nishat-gold/50 rounded-full p-1 flex items-center justify-center">
                <img src={logoImg} alt="The Nishat Hotel" className="w-full h-full object-contain filter invert" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold tracking-widest text-white uppercase">
                  THE NISHAT HOTEL
                </h3>
                <p className="text-xs text-nishat-gold font-medium">{booking.property.shortLocation}</p>
              </div>
            </div>

            <div className="text-right text-xs text-zinc-400">
              <p className="font-semibold text-white">Status: GUARANTEED DIRECT</p>
              <p>Booking Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* SMART MOBILE PASSES & DIGITAL ROOM KEY ACTIONS BANNER */}
          <div className="bg-gradient-to-r from-zinc-950 via-slate-900 to-amber-950 border-2 border-nishat-gold/70 rounded-xl p-4 space-y-3 print:hidden shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-serif text-sm font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4 text-nishat-gold" />
                <span>Instant Mobile Passes & Digital Room Key</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Ready for Activation
              </span>
            </div>

            <p className="text-xs text-zinc-300">
              Your temporary digital room key has been generated for <strong>{assignedRoom}</strong> ({booking.room.title}). Add it to your phone wallet for contactless room door unlock during your stay.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Button to open Temporary Room Key */}
              <button
                onClick={onOpenDigitalKey}
                className="bg-blue-950/80 hover:bg-blue-900 border border-blue-400/60 text-blue-100 p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="block font-serif text-white">Temporary Key ({assignedRoom})</span>
                    <span className="text-[10px] text-blue-300 font-normal">Active {booking.checkInDate} → {booking.checkOutDate}</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-300 underline font-semibold">Open Key →</span>
              </button>

              {/* Button to open Permanent Loyalty Pass */}
              <button
                onClick={onOpenLoyalty}
                className="bg-zinc-900/90 hover:bg-zinc-800 border border-amber-400/60 text-amber-200 p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="block font-serif text-white">Nishat Black Elite Pass</span>
                    <span className="text-[10px] text-amber-300/80 font-normal">Permanent Apple & Google Wallet Pass</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-300 underline font-semibold">View Pass →</span>
              </button>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Stay Details */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-2">
              <h4 className="font-serif text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-nishat-gold" /> Stay Information
              </h4>
              <p className="text-zinc-300"><span className="text-zinc-500">Accommodation:</span> <strong className="text-white">{booking.room.title} ({assignedRoom})</strong></p>
              <p className="text-zinc-300"><span className="text-zinc-500">Check-in:</span> {booking.checkInDate} (From 2:00 PM)</p>
              <p className="text-zinc-300"><span className="text-zinc-500">Check-out:</span> {booking.checkOutDate} (Guaranteed 2:00 PM Late Checkout)</p>
              <p className="text-zinc-300"><span className="text-zinc-500">Duration:</span> {booking.nights} Night(s) Stay</p>
              <p className="text-zinc-300"><span className="text-zinc-500">Occupancy:</span> {booking.adults} Adults, {booking.childrenCount} Children</p>
            </div>

            {/* Guest Details */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-2">
              <h4 className="font-serif text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-nishat-gold" /> Guest Registration
              </h4>
              <p className="text-zinc-300"><span className="text-zinc-500">Guest Name:</span> <strong className="text-white">{booking.guestName}</strong></p>
              <p className="text-zinc-300"><span className="text-zinc-500">WhatsApp/Phone:</span> {booking.guestPhone}</p>
              <p className="text-zinc-300"><span className="text-zinc-500">Email:</span> {booking.guestEmail}</p>
              {booking.specialRequest && (
                <p className="text-zinc-300"><span className="text-zinc-500">Special Request:</span> {booking.specialRequest}</p>
              )}
            </div>

          </div>

          {/* Billing Breakdown Table */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-800/80 px-4 py-2 text-xs font-bold text-nishat-gold uppercase tracking-wider">
              Itemized Financial Charges
            </div>
            <div className="p-4 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>{booking.room.title} ({booking.nights} Nights @ {formatCurrency(booking.room.basePricePKR, booking.currency)}/night)</span>
                <span className="font-semibold text-white">{formatCurrency(booking.roomSubtotal, booking.currency)}</span>
              </div>

              {booking.selectedAddons.length > 0 && booking.selectedAddons.map(addon => (
                <div key={addon.id} className="flex justify-between text-zinc-400 pl-3">
                  <span>+ {addon.title}</span>
                  <span className="text-zinc-200">{formatCurrency(addon.pricePKR, booking.currency)}</span>
                </div>
              ))}

              <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
                <span>Govt Taxes & Service Charges (16%)</span>
                <span>{formatCurrency(booking.taxesAndFees, booking.currency)}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-amber-300 pt-3 border-t-2 border-nishat-gold/40">
                <span>Total Folio Amount ({booking.currency})</span>
                <span className="font-serif text-lg text-white">{formatCurrency(booking.grandTotalPKR, booking.currency)}</span>
              </div>
            </div>
          </div>

          {/* Direct VIP Privileges Guarantee Badge */}
          <div className="bg-nishat-darkNavy border border-nishat-gold/40 rounded-xl p-3 flex items-center gap-3 text-xs text-amber-200">
            <ShieldCheck className="w-6 h-6 text-nishat-gold shrink-0" />
            <div>
              <span className="font-bold block text-white">Direct VIP Perks Confirmed:</span>
              <span>Complimentary Daily Gourmet Buffet Breakfast for all guests & Guaranteed 2:00 PM Late Checkout at {booking.property.name}.</span>
            </div>
          </div>

        </div>

        {/* Action Buttons Footer */}
        <div className="bg-nishat-darkNavy border-t border-nishat-gold/40 p-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white underline font-medium"
          >
            Back to Hotel Website
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppVoucher}
              className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Voucher to WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none gold-gradient-bg text-nishat-navy font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Folio</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
