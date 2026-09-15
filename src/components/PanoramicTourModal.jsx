import React, { useState, useRef } from 'react';
import { X, MoveHorizontal, Sparkles, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function PanoramicTourModal({
  room,
  currency,
  onClose,
  onBookNow
}) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const containerRef = useRef(null);

  if (!room) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - dragOffset);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    // Bound the drag range between -800px and 0px
    if (newOffset <= 0 && newOffset >= -900) {
      setDragOffset(newOffset);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - dragOffset);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const newOffset = e.touches[0].clientX - startX;
    if (newOffset <= 0 && newOffset >= -900) {
      setDragOffset(newOffset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-nishat-darkNavy border-2 border-nishat-gold/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-nishat-navy border-b border-nishat-gold/40 px-4 py-3 sm:px-6 flex items-center justify-between z-20">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nishat-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-nishat-gold">
                Interactive 360° Panoramic Room Tour
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mt-0.5">
              {room.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-nishat-gold rounded-full transition-all"
            aria-label="Close Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 360 Panoramic Viewport */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className={`relative h-[50vh] sm:h-[60vh] w-full overflow-hidden select-none bg-black ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {/* Panoramic Image with Horizontal Drag Transform */}
          <div 
            className="absolute top-0 bottom-0 h-full w-[2400px] max-w-none transition-transform duration-75 ease-out"
            style={{ transform: `translateX(${dragOffset}px)` }}
          >
            <img
              src={room.panoramaImage || room.image}
              alt={`${room.title} 360 View`}
              className="w-full h-full object-cover filter brightness-105 contrast-105 pointer-events-none"
            />

            {/* Render Interactive Hotspots */}
            {room.hotspots && room.hotspots.map((spot, idx) => (
              <div
                key={idx}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === idx ? null : idx);
                  }}
                  className="w-8 h-8 rounded-full bg-nishat-gold/90 text-nishat-navy border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(180,140,72,0.8)] animate-pulse hover:scale-125 transition-transform"
                >
                  <Info className="w-4 h-4 font-bold" />
                </button>

                {/* Hotspot Tooltip Modal */}
                {activeHotspot === idx && (
                  <div className="absolute left-1/2 bottom-10 -translate-x-1/2 w-64 bg-nishat-darkNavy border-2 border-nishat-gold p-3 rounded-xl shadow-2xl z-40 text-left animate-in zoom-in-95">
                    <div className="flex justify-between items-center text-xs font-bold text-amber-300 border-b border-zinc-800 pb-1 mb-1">
                      <span>{spot.title}</span>
                      <button onClick={() => setActiveHotspot(null)} className="text-zinc-400 hover:text-white">✕</button>
                    </div>
                    <p className="text-xs text-zinc-200 mt-1 font-light">{spot.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Overlay Drag Indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 border border-nishat-gold/60 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-2 pointer-events-none animate-pulse">
            <MoveHorizontal className="w-4 h-4" />
            <span>↔ Drag left or right to rotate 360° panoramic view</span>
          </div>

          {/* Hotspot Instructions */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-zinc-300 text-[11px] px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none">
            Click pulsing gold icons to inspect room highlights
          </div>
        </div>

        {/* Footer Bar with Sticky CTA */}
        <div className="bg-nishat-navy border-t border-nishat-gold/40 px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Direct Rate</span>
              <span className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text">
                {formatCurrency(room.basePricePKR, currency)}
              </span>
              <span className="text-xs text-zinc-400"> / night</span>
            </div>
            <div className="hidden sm:block text-xs text-emerald-400 font-medium">
              ✓ Free Buffet Breakfast & 2 PM Checkout
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 px-4 py-3 rounded-xl text-xs font-semibold transition-colors"
            >
              Close Tour
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(room);
              }}
              className="w-1/2 sm:w-auto gold-gradient-bg text-nishat-navy font-bold px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Book This Room Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
