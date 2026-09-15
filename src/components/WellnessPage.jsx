import React, { useState } from 'react';
import { Sparkles, Heart, Clock, CheckCircle2, ChevronRight, X, MessageSquare } from 'lucide-react';
import { WELLNESS_SERVICES } from '../data/wellnessData';
import { formatCurrency } from '../utils/currency';

export default function WellnessPage({
  activeProperty,
  currency
}) {
  const [selectedService, setSelectedService] = useState(WELLNESS_SERVICES[0]);
  const [showModal, setShowModal] = useState(false);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTime, setSessionTime] = useState('11:00 AM');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [spaPassId, setSpaPassId] = useState('');

  const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];

  const handleOpenBooking = (srv) => {
    setSelectedService(srv);
    setIsBooked(false);
    setShowModal(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert("Please enter your name and contact phone.");
      return;
    }
    setSpaPassId(`NH-SPA-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsBooked(true);
  };

  return (
    <div className="min-h-screen bg-nishat-navy text-white pb-20">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-nishat-darkNavy via-slate-900 to-nishat-navy py-16 px-4 sm:px-6 lg:px-8 border-b border-nishat-gold/30 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-nishat-gold/50 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-nishat-gold" />
          <span>The Oasis Wellness & Hydrotherapy Spa</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Holistic Rejuvenation at <span className="gold-gradient-text">{activeProperty.name.replace('The Nishat Hotel — ', '')}</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 mt-3 max-w-2xl mx-auto font-light">
          Immerse in ancient thermal water traditions, heated Turkish hammams, and therapeutic organic botanicals.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WELLNESS_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-nishat-darkNavy border border-nishat-gold/40 hover:border-nishat-gold rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-black">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95" />
                  <div className="absolute bottom-3 right-3 bg-black/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {service.description}
                  </p>
                  <div className="space-y-1.5 border-t border-zinc-800 pt-3">
                    {service.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-amber-200/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-zinc-800/80 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Session Fee</span>
                  <span className="font-serif text-xl font-bold gold-gradient-text">
                    {formatCurrency(service.pricePKR, currency)}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenBooking(service)}
                  className="gold-gradient-bg text-nishat-navy font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-nishat-darkNavy border-2 border-nishat-gold rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative my-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>

            {!isBooked ? (
              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <span className="text-[10px] uppercase font-bold text-nishat-gold block">Oasis Spa Appointment</span>
                  <h4 className="font-serif text-lg font-bold text-white">{selectedService.title}</h4>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-zinc-300 block mb-1">Appointment Date</label>
                    <input
                      type="date"
                      value={sessionDate}
                      onChange={(e) => setSessionDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-nishat-gold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-300 block mb-1">Preferred Time</label>
                    <select
                      value={sessionTime}
                      onChange={(e) => setSessionTime(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-nishat-gold"
                    >
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Guest Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-nishat-gold"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp (+92 300 1234567)"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-nishat-gold"
                  />
                </div>

                <div className="bg-zinc-900 p-3 rounded-xl text-xs flex justify-between items-center">
                  <span className="text-zinc-300">Total Treatment Charge:</span>
                  <span className="font-serif text-base font-bold text-amber-300">
                    {formatCurrency(selectedService.pricePKR, currency)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-nishat-navy font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg"
                >
                  Confirm Spa Appointment
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs text-nishat-gold font-bold uppercase tracking-widest block">Appointment Reserved</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">Pass #{spaPassId}</h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Your session for <strong>{selectedService.title}</strong> is reserved for <strong>{sessionDate} at {sessionTime}</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full gold-gradient-bg text-nishat-navy font-bold py-2.5 rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
