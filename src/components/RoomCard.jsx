import React from 'react';
import { Eye, CheckCircle2, Zap, Maximize2, Users, Sparkles, ArrowRight, Bath, BedDouble, Layers } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function RoomCard({
  room,
  currency,
  onOpen360Tour,
  onReserveDirect
}) {
  return (
    <div className="bg-nishat-darkNavy border border-nishat-gold/40 rounded-2xl overflow-hidden shadow-2xl hover:border-nishat-gold transition-all duration-300 flex flex-col group hover:shadow-[0_10px_30px_rgba(180,140,72,0.15)]">
      
      {/* Room Image Container with Hover Zoom */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nishat-darkNavy via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="bg-nishat-navy/90 border border-nishat-gold/50 text-amber-300 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            {room.category}
          </span>
          {room.availableCount <= 2 && (
            <span className="bg-amber-600/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md shadow-lg animate-pulse">
              <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
              Only {room.availableCount} Left!
            </span>
          )}
        </div>

        {/* 360° Virtual Tour Quick Floating Badge */}
        <button
          onClick={() => onOpen360Tour(room)}
          className="absolute bottom-3 right-3 bg-black/80 hover:bg-nishat-gold text-white hover:text-nishat-navy border border-nishat-gold/60 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-md transition-all duration-200 shadow-xl"
        >
          <Eye className="w-4 h-4 text-amber-300 group-hover:text-nishat-navy" />
          <span>360° Virtual Tour</span>
        </button>
      </div>

      {/* Room Details & Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Room Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
            {room.title}
          </h3>

          {/* Verified Specs Pill Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg">
              <Maximize2 className="w-3.5 h-3.5 text-nishat-gold shrink-0" />
              <span className="truncate">{room.sqm} sq. meters</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg">
              <Layers className="w-3.5 h-3.5 text-nishat-gold shrink-0" />
              <span className="truncate">{room.view}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg">
              <Bath className="w-3.5 h-3.5 text-nishat-gold shrink-0" />
              <span className="truncate">{room.bathroom}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg">
              <Users className="w-3.5 h-3.5 text-nishat-gold shrink-0" />
              <span>Max: {room.maxGuests} Guests</span>
            </div>
          </div>

          {/* Direct Booking Incentive Badges */}
          <div className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3">
            {room.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-amber-200/90 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-6 pt-4 border-t border-nishat-gold/20 flex flex-col gap-3">
          
          {/* Price Tag */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Direct Rate / Night</span>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold gold-gradient-text">
                {formatCurrency(room.basePricePKR, currency)}
              </span>
              <span className="text-xs text-zinc-400 font-normal"> + taxes</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded">
              Breakfast Included
            </span>
          </div>

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => onOpen360Tour(room)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-nishat-gold/40 font-semibold py-2.5 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <Eye className="w-4 h-4 text-nishat-gold" />
              <span>360° Tour</span>
            </button>

            <button
              onClick={() => onReserveDirect(room)}
              className="w-full gold-gradient-bg text-nishat-navy font-extrabold py-2.5 px-3 rounded-xl text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <span>Reserve Direct</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
