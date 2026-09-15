import React from 'react';
import { Award, Compass, Sparkles, Shield, Wifi, Utensils, Coffee, Waves } from 'lucide-react';

export default function PropertyHighlights({ activeProperty }) {
  return (
    <section className="bg-white text-zinc-900 py-14 px-4 sm:px-6 lg:px-8 border-b border-amber-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 block mb-1">
            Unrivaled Distinction
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-wider uppercase text-black">
            {activeProperty.name.replace('The Nishat Hotel — ', '')} Signature Experience
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-3" />
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-medium">
            {activeProperty.description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {activeProperty.highlights.map((item, idx) => (
            <div 
              key={idx}
              className="bg-zinc-50 border-2 border-amber-400/40 rounded-2xl p-5 text-center shadow-md hover:border-amber-500 hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-400/60 mx-auto flex items-center justify-center text-amber-700 mb-3 shadow-inner">
                {idx === 0 ? <Compass className="w-6 h-6" /> : idx === 1 ? <Waves className="w-6 h-6" /> : idx === 2 ? <Utensils className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-black uppercase tracking-wide">
                {item.label}
              </h3>
              <p className="text-xs text-zinc-600 mt-1 font-normal">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
