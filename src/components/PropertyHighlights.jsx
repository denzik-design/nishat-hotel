import React from 'react';
import { Award, Compass, Sparkles, Shield, Wifi, Utensils, Coffee, Waves } from 'lucide-react';

export default function PropertyHighlights({ activeProperty }) {
  return (
    <section className="bg-gradient-to-b from-nishat-navy to-nishat-darkNavy text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-nishat-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase text-amber-200">
            {activeProperty.name.replace('The Nishat Hotel — ', '')} Experience
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            {activeProperty.description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {activeProperty.highlights.map((item, idx) => (
            <div 
              key={idx}
              className="bg-zinc-900/80 border border-nishat-gold/30 rounded-xl p-4 sm:p-5 text-center shadow-lg hover:border-nishat-gold transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-nishat-gold/20 border border-nishat-gold/50 mx-auto flex items-center justify-center text-nishat-gold mb-3">
                {idx === 0 ? <Compass className="w-5 h-5" /> : idx === 1 ? <Waves className="w-5 h-5" /> : idx === 2 ? <Utensils className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">
                {item.label}
              </h3>
              <p className="text-xs text-zinc-300 mt-1 font-light">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
