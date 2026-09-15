import React, { useState } from 'react';
import RoomCard from './RoomCard';

export default function RoomCatalog({
  activeProperty,
  currency,
  onOpen360Tour,
  onReserveDirect
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Suites', 'Executive', 'Deluxe'];

  const filteredRooms = activeProperty.rooms.filter(room => {
    if (selectedCategory === 'All') return true;
    return room.category === selectedCategory;
  });

  return (
    <div className="bg-[#faf9f6] py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-200/40">
      <section id="room-catalog" className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 block mb-1">
            Exclusive Inventory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-wide">
            {activeProperty.name.replace('The Nishat Hotel — ', '')} Room Collection
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-3" />
          <p className="text-sm text-zinc-600 mt-2 font-medium">
            Handcrafted luxury accommodation with bespoke Italian marble finishes, panoramic city vistas, and complimentary direct VIP amenities.
          </p>

          {/* Filter Category Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-black text-amber-300 border-2 border-amber-400 shadow-lg scale-105'
                    : 'bg-white text-zinc-700 border border-zinc-300 hover:border-amber-400 hover:text-black shadow-sm'
                }`}
              >
                {cat === 'All' ? 'All Accommodations' : cat}
              </button>
            ))}
          </div>
        </div>

      {/* Room Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            currency={currency}
            onOpen360Tour={onOpen360Tour}
            onReserveDirect={onReserveDirect}
          />
        ))}
      </div>
    </section>
    </div>
  );
}
