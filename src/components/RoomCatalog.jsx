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
    <section id="room-catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-nishat-gold">
          Exclusive Inventory
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide mt-2">
          {activeProperty.name.replace('The Nishat Hotel — ', '')} Room Collection
        </h2>
        <p className="text-sm text-zinc-300 mt-2">
          Handcrafted luxury accommodation with bespoke Italian marble finishes, panoramic city vistas, and complimentary direct VIP amenities.
        </p>

        {/* Filter Category Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'gold-gradient-bg text-nishat-navy shadow-lg scale-105'
                  : 'bg-nishat-darkNavy text-zinc-300 border border-nishat-gold/30 hover:border-nishat-gold hover:text-white'
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
  );
}
