import React, { useState } from 'react';
import { Sparkles, Utensils, Coffee, Clock, Users, Calendar, CheckCircle2, ChevronRight, MessageSquare, Download, X } from 'lucide-react';
import { DINING_EXPERIENCES } from '../data/diningData';
import { formatCurrency } from '../utils/currency';

export default function DiningPage({
  activeProperty,
  currency,
  onOpenWhatsApp
}) {
  const [selectedExperience, setSelectedExperience] = useState(DINING_EXPERIENCES[0]); // Buffet default
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Table Booking State
  const [resDate, setResDate] = useState(new Date().toISOString().split('T')[0]);
  const [resTime, setResTime] = useState(selectedExperience.timeSlots[0]);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [seatingPreference, setSeatingPreference] = useState('Indoor Luxury Dining');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tableBookingId, setTableBookingId] = useState('');

  const calculateSubtotal = () => {
    if (selectedExperience.id === 'high-tea') {
      // High-tea price is for 2 guests
      const sets = Math.ceil(adults / 2);
      return sets * selectedExperience.pricePKR;
    }
    // Buffets
    const adultTotal = adults * selectedExperience.pricePKR;
    const childTotal = childrenCount * (selectedExperience.pricePKR * 0.5);
    return adultTotal + childTotal;
  };

  const subtotalPKR = calculateSubtotal();
  const taxPKR = Math.round(subtotalPKR * 0.16);
  const totalPKR = subtotalPKR + taxPKR;

  const handleOpenBooking = (exp) => {
    setSelectedExperience(exp);
    setResTime(exp.timeSlots[0]);
    setIsConfirmed(false);
    setShowBookingModal(true);
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert("Please enter guest name and phone number to reserve table.");
      return;
    }
    const newId = `NH-TBL-${Math.floor(1000 + Math.random() * 9000)}`;
    setTableBookingId(newId);
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 pb-20">
      
      {/* Top Banner */}
      <div className="relative bg-black py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-400/40 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-amber-400/60 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest mb-4 shadow-md">
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
          <span>Award-Winning Haute Cuisine & Buffets</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Gastronomy at <span className="gold-gradient-text">{activeProperty.name.replace('The Nishat Hotel — ', '')}</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 mt-3 max-w-2xl mx-auto font-light">
          Indulge in Pakistan’s benchmark culinary traditions — from our legendary 120-item Royal Dinner Buffet to the refined 3-tier English High-Tea.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Dining Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DINING_EXPERIENCES.map((exp) => (
            <div 
              key={exp.id}
              className="bg-white border-2 border-amber-300/80 hover:border-amber-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-black">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute top-3 left-3 bg-black/90 border border-amber-400 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                    {exp.type}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/85 text-zinc-200 text-xs font-medium px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{exp.timing}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-black group-hover:text-amber-700 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  <div className="space-y-2 border-t border-zinc-100 pt-3">
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                      Signature Highlights:
                    </span>
                    {exp.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-6 pt-0 border-t border-amber-200/60 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Experience Price</span>
                  <div className="font-serif text-2xl font-black text-black">
                    {formatCurrency(exp.pricePKR, currency)}
                    <span className="text-xs font-normal text-zinc-500"> {exp.id === 'high-tea' ? 'per couple' : 'per guest'}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(exp)}
                  className="gold-gradient-bg text-black font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>Reserve Table</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* TABLE RESERVATION MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-nishat-darkNavy border-2 border-nishat-gold rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative my-auto">
            
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>

            {!isConfirmed ? (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center text-amber-300">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-nishat-gold block">
                      Direct Restaurant Reservation
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      {selectedExperience.title}
                    </h3>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-zinc-300 block mb-1 font-semibold">Reservation Date</label>
                    <input
                      type="date"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-nishat-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-300 block mb-1 font-semibold">Time Slot</label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-nishat-gold focus:outline-none cursor-pointer"
                    >
                      {selectedExperience.timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests & Seating */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-zinc-300 block mb-1 font-semibold">Adult Guests</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-nishat-gold focus:outline-none"
                    >
                      {[1,2,3,4,5,6,8,10,12].map(n => (
                        <option key={n} value={n}>{n} Adults</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-300 block mb-1 font-semibold">Seating Area</label>
                    <select
                      value={seatingPreference}
                      onChange={(e) => setSeatingPreference(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-nishat-gold focus:outline-none"
                    >
                      <option value="Indoor Luxury Dining">Indoor Luxury Dining</option>
                      <option value="Courtyard Garden (Outdoor)">Courtyard Garden (Outdoor)</option>
                      <option value="Private VIP Alcove">Private VIP Alcove</option>
                    </select>
                  </div>
                </div>

                {/* Guest Contact Details */}
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Guest Full Name (e.g. Director Hamza)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-nishat-gold focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number (+92 300 1234567)"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-nishat-gold focus:outline-none"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex justify-between text-zinc-300">
                    <span>{selectedExperience.type} ({adults} Guests)</span>
                    <span className="font-semibold text-white">{formatCurrency(subtotalPKR, currency)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Govt Sales Tax & Service (16%)</span>
                    <span>{formatCurrency(taxPKR, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-amber-300 pt-1 border-t border-zinc-800">
                    <span>Estimated Bill</span>
                    <span>{formatCurrency(totalPKR, currency)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-nishat-navy font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg"
                >
                  Confirm Instant Table Reservation
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs text-nishat-gold font-bold uppercase tracking-widest block">Table Reserved</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">Pass #{tableBookingId}</h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Your table for <strong>{adults} Guests</strong> at <strong>{selectedExperience.title}</strong> is confirmed for <strong>{resDate} at {resTime}</strong>.
                  </p>
                </div>
                <div className="bg-zinc-900 p-3 rounded-xl text-xs text-left text-zinc-300 space-y-1">
                  <div><strong className="text-white">Guest:</strong> {guestName} ({guestPhone})</div>
                  <div><strong className="text-white">Seating:</strong> {seatingPreference}</div>
                  <div><strong className="text-white">Amount:</strong> {formatCurrency(totalPKR, currency)} (Pay at Restaurant)</div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      const msg = `*THE NISHAT HOTEL - TABLE RESERVATION*%0A` +
                        `*Pass ID:* ${tableBookingId}%0A` +
                        `*Restaurant:* ${selectedExperience.title}%0A` +
                        `*Date & Time:* ${resDate} at ${resTime}%0A` +
                        `*Guest:* ${guestName}%0A` +
                        `*Guests:* ${adults} Adults%0A` +
                        `*Seating:* ${seatingPreference}`;
                      window.open(`https://wa.me/${activeProperty.whatsapp}?text=${msg}`, '_blank');
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>WhatsApp Voucher</span>
                  </button>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 gold-gradient-bg text-nishat-navy font-bold py-2.5 rounded-xl text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
