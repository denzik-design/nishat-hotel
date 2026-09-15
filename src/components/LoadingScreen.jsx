import React from 'react';
import logoImg from '../assets/nishat-logo.png';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen({ message = "Curating 5-Star Luxury Experience..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl text-white transition-opacity duration-500 animate-in fade-in">
      
      {/* Background Radial Gold Glow */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-sm w-full">
        
        {/* Animated Logo Container with Dual Golden Spinning Orbits */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          
          {/* Outer Golden Spinner Orbit */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-500 animate-spin" style={{ animationDuration: '2.5s' }} />
          
          {/* Inner Counter-Rotating Orbit */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-yellow-200 border-l-amber-300 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />

          {/* Glowing Radial Halo */}
          <div className="absolute inset-4 rounded-full bg-black/80 border border-amber-400/40 shadow-[0_0_30px_rgba(212,175,55,0.4)]" />

          {/* The Nishat Key Monogram Logo with Breathing Scale Animation */}
          <div className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-full overflow-hidden flex items-center justify-center animate-pulse" style={{ animationDuration: '2s' }}>
            <img 
              src={logoImg} 
              alt="The Nishat Hotel Loading Monogram" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            />
          </div>
        </div>

        {/* Brand Name Typography */}
        <h2 className="font-serif text-lg sm:text-xl font-bold tracking-[0.3em] text-white uppercase mb-2">
          THE NISHAT HOTEL
        </h2>
        
        <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-2" />

        {/* Dynamic Status Loading Message */}
        <p className="text-xs text-amber-200/90 font-medium tracking-wider flex items-center gap-1.5 mt-2 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{message}</span>
        </p>

        {/* Slim Gold Shimmer Bar */}
        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden mt-6 border border-zinc-800">
          <div className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-full animate-pulse w-full" />
        </div>

      </div>
    </div>
  );
}
