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
    <div className="bg-white border-2 border-amber-300/80 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500 hover:shadow-2xl transition-all duration-300 flex flex-col group">
      
      {/* Room Image Container with Hover Zoom */}
      <div className="relative h-56 sm:h-72 overflow-hidden bg-black">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="bg-black/90 border border-amber-400 text-amber-300 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
            {room.category}
          </span>
          {room.availableCount <= 2 && (
            <span className="bg-amber-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 backdrop-blur-md shadow-lg animate-pulse">
              <Zap className="w-3 h-3 text-yellow-200 fill-yellow-200" />
              Only {room.availableCount} Left!
            </span>
          )}
        </div>

        {/* 360° Virtual Tour Quick Floating Badge */}
        <button
          onClick={() => onOpen360Tour(room)}
          className="absolute bottom-3 right-3 bg-black/85 hover:bg-amber-400 text-white hover:text-black border border-amber-400/80 text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-md transition-all duration-200 shadow-xl"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:text-black" />
          <span>360° Tour</span>
        </button>
      </div>

      {/* Room Details & Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Room Title */}
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-black tracking-wide group-hover:text-amber-700 transition-colors">
            {room.title}
          </h3>

          {/* Verified Specs Pill Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-700">
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 p-2 rounded-lg">
              <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate font-medium">{room.sqm} sq. meters</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 p-2 rounded-lg">
              <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate font-medium">{room.view}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 p-2 rounded-lg">
              <Bath className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate font-medium">{room.bathroom}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 p-2 rounded-lg">
              <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-medium">Max: {room.maxGuests} Guests</span>
            </div>
          </div>

          {/* Direct Booking Incentive Badges */}
          <div className="mt-4 space-y-1.5 border-t border-zinc-100 pt-3">
            {room.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-6 pt-4 border-t border-amber-200/60 flex flex-col gap-3">
          
          {/* Price Tag */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Direct Rate / Night</span>
              <span className="font-serif text-2xl sm:text-3xl font-black text-black">
                {formatCurrency(room.basePricePKR, currency)}
              </span>
              <span className="text-xs text-zinc-500 font-normal"> + taxes</span>
            </div>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shadow-sm">
              Breakfast Included
            </span>
          </div>

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => onOpen360Tour(room)}
              className="w-full bg-black hover:bg-zinc-800 text-white border border-black font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>360° Tour</span>
            </button>

            <button
              onClick={() => onReserveDirect(room)}
              className="w-full gold-gradient-bg text-black font-black py-2.5 px-3 rounded-xl text-xs sm:text-sm tracking-wide uppercase shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1"
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
