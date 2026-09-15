import React from 'react';
import { Calendar, Users, MapPin, Search, Star, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { PROPERTIES } from '../data/propertiesData';

export default function HeroSection({
  activeProperty,
  setActiveProperty,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  onCheckAvailability
}) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-nishat-navy text-white">
      {/* Background Image with Dynamic Fade & Luxury Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          key={activeProperty.id}
          src={activeProperty.heroImage}
          alt={activeProperty.name}
          className="w-full h-full object-cover transition-opacity duration-1000 scale-105 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nishat-navy via-nishat-navy/70 to-nishat-navy/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-nishat-navy/50 to-nishat-navy" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center flex-1 flex flex-col justify-center items-center">
        
        {/* Dynamic Location Tag Badge */}
        <div className="inline-flex items-center gap-2 bg-nishat-darkNavy/85 border border-nishat-gold/60 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-300 tracking-widest uppercase shadow-xl mb-6 backdrop-blur-md animate-in fade-in zoom-in duration-500">
          <Star className="w-3.5 h-3.5 text-nishat-gold fill-nishat-gold" />
          <span>{activeProperty.name}</span>
          <span className="text-nishat-gold">•</span>
          <span className="text-zinc-300 font-normal">{activeProperty.city}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-lg max-w-4xl">
          Where 5-Star Luxury Meets <span className="gold-gradient-text italic">Timeless Hospitality</span>
        </h1>

        {/* Dynamic Subtitle per Selected Location */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-zinc-200 max-w-2xl font-light tracking-wide leading-relaxed">
          {activeProperty.tagline}
        </p>

        {/* Quick Location Specs */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-zinc-300">
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/10">
            <MapPin className="w-4 h-4 text-nishat-gold" /> {activeProperty.address}
          </span>
          <span className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-md border border-white/10 text-amber-300 font-semibold">
            {activeProperty.rating} Verified Guest Rating
          </span>
        </div>
      </div>

      {/* Sticky Quick-Search Booking Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full pb-8 -mt-6">
        <div className="bg-nishat-darkNavy/95 border border-nishat-gold/50 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl gold-border-glow">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 items-center">
            
            {/* 1. Destination Dropdown */}
            <div className="flex flex-col text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-nishat-gold flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5" /> Destination Hotel
              </label>
              <div className="relative">
                <select
                  value={activeProperty.id}
                  onChange={(e) => {
                    const selected = PROPERTIES.find(p => p.id === e.target.value);
                    if (selected) setActiveProperty(selected);
                  }}
                  className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-nishat-gold text-white text-sm rounded-xl px-3.5 py-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-nishat-gold/50 font-medium cursor-pointer"
                >
                  {PROPERTIES.map(p => (
                    <option key={p.id} value={p.id} className="bg-nishat-darkNavy text-white py-2">
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-nishat-gold absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Check-In & Check-Out Date Range */}
            <div className="flex flex-col text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-nishat-gold flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5" /> Stay Dates (2 Nights Default)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-nishat-gold text-white text-xs sm:text-sm rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-nishat-gold font-medium"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-nishat-gold text-white text-xs sm:text-sm rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-nishat-gold font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 3. Guests Selector */}
            <div className="flex flex-col text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-nishat-gold flex items-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5" /> Guests & Occupancy
              </label>
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700 rounded-xl px-3 py-2.5">
                <div className="flex-1 flex items-center justify-between text-xs text-zinc-200 font-medium">
                  <span>Adults:</span>
                  <select 
                    value={adults} 
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="bg-zinc-800 text-amber-300 font-bold px-2 py-1 rounded border border-zinc-600 focus:outline-none"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
                <span className="text-zinc-600">|</span>
                <div className="flex-1 flex items-center justify-between text-xs text-zinc-200 font-medium">
                  <span>Children:</span>
                  <select 
                    value={childrenCount} 
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="bg-zinc-800 text-amber-300 font-bold px-2 py-1 rounded border border-zinc-600 focus:outline-none"
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. CTA Button */}
            <div className="flex flex-col justify-end pt-1">
              <button
                onClick={onCheckAvailability}
                className="w-full gold-gradient-bg text-nishat-navy font-bold py-3.5 px-6 rounded-xl text-sm sm:text-base tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 group"
              >
                <Search className="w-4 h-4 stroke-[2.5] group-hover:scale-110 transition-transform" />
                <span>Check Availability</span>
              </button>
            </div>

          </div>

          {/* Quick Direct Privileges Bar Below Search */}
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap justify-between items-center text-[11px] text-zinc-300 px-1 gap-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Free Cancellation up to 24h prior
            </span>
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Check className="w-3.5 h-3.5 text-amber-300" /> Direct VIP Breakfast & Late Checkout Included
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-nishat-gold" /> No Hidden Fees & Instant Confirmation
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
