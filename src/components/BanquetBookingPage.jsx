import React, { useState } from 'react';
import { Sparkles, Users, Calendar, Clock, CheckCircle2, ChevronRight, Award, FileText, Send, PhoneCall, Check, X, Building } from 'lucide-react';
import { BANQUET_VENUES, BANQUET_PACKAGES, BANQUET_ADDONS } from '../data/banquetData';
import { formatCurrency } from '../utils/currency';

export default function BanquetBookingPage({
  activeProperty,
  currency,
  onOpenWhatsApp
}) {
  const venues = BANQUET_VENUES[activeProperty.id] || BANQUET_VENUES['johar-town'];
  
  // Banquet Calculator State
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);
  const [eventType, setEventType] = useState('Royal Wedding / Barat');
  const [eventDate, setEventDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [eventSession, setEventSession] = useState('Evening (7:30 PM – 12:00 AM)');
  const [guestCount, setGuestCount] = useState(350);
  const [selectedPackage, setSelectedPackage] = useState(BANQUET_PACKAGES[1]); // Gold default
  const [selectedAddons, setSelectedAddons] = useState(['floral', 'valet']);

  // Inquiry/Booking Modal State
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [organizerName, setOrganizerName] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [proposalId, setProposalId] = useState('');

  // Financial Calculations
  const foodTotalPKR = selectedPackage.pricePKR * guestCount;
  const addonsTotalPKR = selectedAddons.reduce((sum, addonId) => {
    const item = BANQUET_ADDONS.find(a => a.id === addonId);
    return sum + (item ? item.pricePKR : 0);
  }, 0);
  const hallRentalPKR = guestCount > 500 ? 0 : 75000; // Waived for large gatherings
  const taxesPKR = Math.round((foodTotalPKR + addonsTotalPKR + hallRentalPKR) * 0.16);
  const estimatedGrandTotalPKR = foodTotalPKR + addonsTotalPKR + hallRentalPKR + taxesPKR;

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleRequestProposal = (e) => {
    e.preventDefault();
    if (!organizerName || !organizerPhone) {
      alert("Please enter organizer name and phone number to generate event proposal.");
      return;
    }
    const newId = `NH-EVT-${Math.floor(10000 + Math.random() * 90000)}`;
    setProposalId(newId);
    setIsBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 pb-20">
      
      {/* Top Banner */}
      <div className="relative bg-black py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-400/40 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-amber-400/60 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest mb-4 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Banquets, Royal Weddings & Conventions</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Grand Celebrations at <span className="gold-gradient-text">{activeProperty.name.replace('The Nishat Hotel — ', '')}</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 mt-3 max-w-2xl mx-auto font-light">
          Host iconic royal weddings, diplomatic banquets, and international corporate summits in Pakistan’s most opulent pillar-less ballrooms.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* SECTION 1: VENUES SHOWCASE */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
              Premier Event Spaces
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-black">
              Available Grand Halls & Ballrooms
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {venues.map((venue) => (
              <div 
                key={venue.id}
                className={`bg-white border-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between ${
                  selectedVenue.id === venue.id ? 'border-amber-500 shadow-[0_10px_30px_rgba(212,175,55,0.25)]' : 'border-amber-300/60'
                }`}
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img src={venue.image} alt={venue.name} className="w-full h-full object-cover filter brightness-95" />
                    <div className="absolute top-3 right-3 bg-black/90 border border-amber-400 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                      {venue.capacity}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-black">
                      {venue.name}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {venue.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-800 pt-2 border-t border-zinc-200">
                      <div>• Area: <strong className="text-amber-700">{venue.area}</strong></div>
                      <div>• Ceilings: <strong className="text-amber-700">{venue.ceiling}</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setSelectedVenue(venue);
                      const calcEl = document.getElementById('banquet-calculator');
                      if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      selectedVenue.id === venue.id
                        ? 'gold-gradient-bg text-black font-black shadow-md'
                        : 'bg-black text-white hover:bg-zinc-800 border border-black'
                    }`}
                  >
                    <span>{selectedVenue.id === venue.id ? '✓ Selected for Estimation' : 'Select Venue for Booking'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: LIVE BANQUET COST CALCULATOR & BOOKING */}
        <div id="banquet-calculator" className="bg-gradient-to-br from-nishat-darkNavy to-slate-950 border-2 border-nishat-gold/60 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-nishat-gold">
              Instant Event Estimator & Reservation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Customize Your Event at {selectedVenue.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Options Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Event Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-200 block mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-nishat-gold text-white text-xs rounded-xl p-3 focus:outline-none"
                  >
                    <option value="Royal Wedding / Barat">Royal Wedding / Barat</option>
                    <option value="Walima Reception">Walima Reception</option>
                    <option value="Mehndi / Sangeet Festival">Mehndi / Sangeet Festival</option>
                    <option value="International Corporate Summit">International Corporate Summit</option>
                    <option value="Annual Corporate Gala & Awards">Annual Corporate Gala & Awards</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-200 block mb-1.5">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-nishat-gold text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>
              </div>

              {/* Guest Count Slider */}
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-nishat-gold" />
                    Guest Count (Pax)
                  </label>
                  <span className="font-serif text-xl font-bold gold-gradient-text">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={selectedVenue.maxGuests}
                  step={25}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>50 Min</span>
                  <span>Max: {selectedVenue.maxGuests}</span>
                </div>
              </div>

              {/* Menu Package Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-200 block">
                  Select Curated Royal Banquet Menu Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BANQUET_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedPackage.id === pkg.id
                          ? 'bg-amber-950/40 border-nishat-gold shadow-md'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="font-serif text-sm font-bold text-white block">{pkg.name}</span>
                        <span className="text-[11px] text-zinc-400 font-light block mt-1">{pkg.tagline}</span>
                      </div>
                      <div className="mt-4 pt-2 border-t border-zinc-800">
                        <span className="font-serif text-base font-extrabold gold-gradient-text">
                          {formatCurrency(pkg.pricePKR, currency)}
                        </span>
                        <span className="text-[10px] text-zinc-400"> / head</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Courses breakdown for selected menu */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-nishat-gold block">
                    Included in {selectedPackage.name}:
                  </span>
                  {selectedPackage.courses.map((course, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-on Services */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-200 block">
                  VIP Event Production & Add-ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BANQUET_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked ? 'bg-amber-950/30 border-amber-400' : 'bg-zinc-900/50 border-zinc-800'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-nishat-gold border-nishat-gold text-nishat-navy' : 'border-zinc-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-white block">{addon.name}</span>
                          <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
                            +{formatCurrency(addon.pricePKR, currency)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary Column (5 Cols) */}
            <div className="lg:col-span-5 bg-nishat-navy border border-nishat-gold/40 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-nishat-gold block font-semibold">Live Proposal Summary</span>
                  <h3 className="font-serif text-lg font-bold text-white">{eventType}</h3>
                  <p className="text-xs text-zinc-400">{selectedVenue.name} • {guestCount} Guests</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Catering ({guestCount} x {formatCurrency(selectedPackage.pricePKR, currency)})</span>
                    <span className="font-semibold text-white">{formatCurrency(foodTotalPKR, currency)}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="border-t border-zinc-800/80 pt-2 space-y-1">
                      <span className="text-[11px] font-semibold text-amber-300 block">Production Add-ons:</span>
                      {selectedAddons.map(id => {
                        const itm = BANQUET_ADDONS.find(a => a.id === id);
                        return (
                          <div key={id} className="flex justify-between text-zinc-400 pl-2 text-[11px]">
                            <span>• {itm.name}</span>
                            <span className="text-zinc-200">{formatCurrency(itm.pricePKR, currency)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
                    <span>Venue Setup & Hall Rental</span>
                    <span>{hallRentalPKR === 0 ? 'COMPLIMENTARY (500+ Pax)' : formatCurrency(hallRentalPKR, currency)}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Govt Sales Tax & Service (16%)</span>
                    <span>{formatCurrency(taxesPKR, currency)}</span>
                  </div>
                </div>

                {/* Total Box */}
                <div className="bg-zinc-900 border-2 border-nishat-gold rounded-xl p-4 text-center">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Total Estimated Investment</span>
                  <div className="font-serif text-2xl sm:text-3xl font-black gold-gradient-text mt-0.5">
                    {formatCurrency(estimatedGrandTotalPKR, currency)}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium mt-1 block">
                    ✓ Price Lock Guarantee for 14 Days
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowProposalModal(true)}
                  className="w-full gold-gradient-bg text-nishat-navy font-black py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-95 transition-all"
                >
                  Generate Official Event Proposal & Hold Date
                </button>
                <p className="text-[10px] text-zinc-400 text-center">
                  Dedicated Nishat Event Specialist will contact you within 2 business hours.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* PROPOSAL INQUIRY MODAL */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-nishat-darkNavy border-2 border-nishat-gold rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative my-auto">
            
            <button
              onClick={() => setShowProposalModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>

            {!isBooked ? (
              <form onSubmit={handleRequestProposal} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center text-amber-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-nishat-gold block">
                      VIP Banquet Reservation
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      Confirm Proposal for {selectedVenue.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-zinc-300 block mb-1 font-semibold">Organizer / Host Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sardar Tariq Khan"
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:border-nishat-gold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-300 block mb-1 font-semibold">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={organizerPhone}
                        onChange={(e) => setOrganizerPhone(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:border-nishat-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-300 block mb-1 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="host@domain.com"
                        value={organizerEmail}
                        onChange={(e) => setOrganizerEmail(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:border-nishat-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Estimated Total:</span>
                    <strong className="text-amber-300">{formatCurrency(estimatedGrandTotalPKR, currency)}</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Guests & Date:</span>
                    <span>{guestCount} Pax on {eventDate}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-nishat-navy font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-xl"
                >
                  Submit & Hold Event Date
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs text-nishat-gold font-bold uppercase tracking-widest block">Date Temporarily Held</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">Proposal #{proposalId}</h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Thank you, <strong>{organizerName}</strong>. Your event inquiry for {selectedVenue.name} on {eventDate} has been registered with our Executive Events Directorate.
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      const msg = `Hello Nishat Events Director. I have requested Proposal %23${proposalId} for ${eventType} at ${selectedVenue.name} for ${guestCount} guests on ${eventDate}.`;
                      window.open(`https://wa.me/${activeProperty.whatsapp}?text=${msg}`, '_blank');
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <span>Connect on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setShowProposalModal(false)}
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
