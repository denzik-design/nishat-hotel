import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyHighlights from './components/PropertyHighlights';
import DirectPerksBar from './components/DirectPerksBar';
import RoomCatalog from './components/RoomCatalog';
import BanquetBookingPage from './components/BanquetBookingPage';
import DiningPage from './components/DiningPage';
import WellnessPage from './components/WellnessPage';
import PanoramicTourModal from './components/PanoramicTourModal';
import FrictionlessCheckoutModal from './components/FrictionlessCheckoutModal';
import LoyaltyPassModal from './components/LoyaltyPassModal';
import DigitalRoomKeyModal from './components/DigitalRoomKeyModal';
import WhatsAppConcierge from './components/WhatsAppConcierge';
import Footer from './components/Footer';
import { PROPERTIES } from './data/propertiesData';
import { ShieldCheck, Coffee, Clock, Award, X } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('stay'); // 'stay' | 'banquets' | 'dining' | 'wellness'
  const [activeProperty, setActiveProperty] = useState(PROPERTIES[0]);
  const [currency, setCurrency] = useState('PKR');

  // Stay Dates default: check-in today, check-out +2 days
  const todayStr = new Date().toISOString().split('T')[0];
  const inTwoDays = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [checkOutDate, setCheckOutDate] = useState(inTwoDays);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Modals state
  const [active360Room, setActive360Room] = useState(null);
  const [checkoutRoom, setCheckoutRoom] = useState(null);
  const [showPerksModal, setShowPerksModal] = useState(false);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [showDigitalKeyModal, setShowDigitalKeyModal] = useState(false);
  const [activeBookingForKey, setActiveBookingForKey] = useState(null);

  const handleCheckAvailability = () => {
    setActivePage('stay');
    setTimeout(() => {
      const catalogEl = document.getElementById('room-catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenDigitalKey = (bookingData = null) => {
    if (bookingData) {
      setActiveBookingForKey(bookingData);
    } else if (!activeBookingForKey) {
      // Default demo room key if not yet booked
      setActiveBookingForKey({
        room: activeProperty.rooms[0],
        property: activeProperty,
        checkInDate,
        checkOutDate,
        guestName: 'Director Malik Hamza'
      });
    }
    setShowDigitalKeyModal(true);
  };

  return (
    <div className="min-h-screen bg-nishat-navy text-white flex flex-col font-sans selection:bg-nishat-gold selection:text-nishat-navy">
      
      {/* 1. Executive Navbar with Multi-Page Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        activeProperty={activeProperty}
        setActiveProperty={setActiveProperty}
        currency={currency}
        setCurrency={setCurrency}
        onOpenDirectPerks={() => setShowPerksModal(true)}
        onOpenLoyalty={() => setShowLoyaltyModal(true)}
        onOpenDigitalKey={() => handleOpenDigitalKey()}
      />

      {/* 2. Main Dynamic Page Router */}
      <main className="flex-1">
        {activePage === 'stay' && (
          <>
            <HeroSection
              activeProperty={activeProperty}
              setActiveProperty={setActiveProperty}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              adults={adults}
              setAdults={setAdults}
              childrenCount={childrenCount}
              setChildrenCount={setChildrenCount}
              onCheckAvailability={handleCheckAvailability}
            />
            <PropertyHighlights activeProperty={activeProperty} />
            <DirectPerksBar onOpenModal={() => setShowPerksModal(true)} />
            <RoomCatalog
              activeProperty={activeProperty}
              currency={currency}
              onOpen360Tour={(room) => setActive360Room(room)}
              onReserveDirect={(room) => setCheckoutRoom(room)}
            />
          </>
        )}

        {activePage === 'banquets' && (
          <BanquetBookingPage
            activeProperty={activeProperty}
            currency={currency}
          />
        )}

        {activePage === 'dining' && (
          <DiningPage
            activeProperty={activeProperty}
            currency={currency}
          />
        )}

        {activePage === 'wellness' && (
          <WellnessPage
            activeProperty={activeProperty}
            currency={currency}
          />
        )}
      </main>

      {/* 3. Modals: 360° Virtual Tour */}
      {active360Room && (
        <PanoramicTourModal
          room={active360Room}
          currency={currency}
          onClose={() => setActive360Room(null)}
          onBookNow={(room) => setCheckoutRoom(room)}
        />
      )}

      {/* 4. Modals: Single-Page Room Checkout */}
      {checkoutRoom && (
        <FrictionlessCheckoutModal
          room={checkoutRoom}
          activeProperty={activeProperty}
          currency={currency}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adults={adults}
          childrenCount={childrenCount}
          onClose={() => setCheckoutRoom(null)}
          onOpenDigitalKey={(booking) => {
            setActiveBookingForKey(booking);
            setShowDigitalKeyModal(true);
          }}
          onOpenLoyalty={() => setShowLoyaltyModal(true)}
          onBookingConfirmed={(booking) => {
            setActiveBookingForKey(booking);
          }}
        />
      )}

      {/* 5. Modals: Permanent VIP Loyalty Card */}
      {showLoyaltyModal && (
        <LoyaltyPassModal onClose={() => setShowLoyaltyModal(false)} />
      )}

      {/* 6. Modals: Temporary Digital Room Keycard */}
      {showDigitalKeyModal && (
        <DigitalRoomKeyModal
          booking={activeBookingForKey}
          activeProperty={activeProperty}
          onClose={() => setShowDigitalKeyModal(false)}
        />
      )}

      {/* 7. Modals: Direct Perks Guarantee */}
      {showPerksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-nishat-darkNavy border-2 border-nishat-gold rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setShowPerksModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-nishat-gold/20 border border-nishat-gold flex items-center justify-center text-nishat-gold font-bold text-xl">
                ★
              </div>
              <div>
                <span className="text-xs text-nishat-gold font-bold uppercase tracking-wider block">Official Guarantee</span>
                <h3 className="font-serif text-xl font-bold text-white">Direct VIP Booking Privileges</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-start gap-3">
                <Coffee className="w-5 h-5 text-nishat-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Complimentary Executive Buffet Breakfast</strong>
                  <span>Included daily for all registered guests at Banu Chaudhry / La Palma dining rooms.</span>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-start gap-3">
                <Clock className="w-5 h-5 text-nishat-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Guaranteed 2:00 PM Late Checkout</strong>
                  <span>Relax and enjoy an extended stay without early checkout stress.</span>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Best Rate Guarantee & Zero OTA Fees</strong>
                  <span>We guarantee the absolute lowest available rate compared to third-party travel sites.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPerksModal(false)}
              className="w-full gold-gradient-bg text-nishat-navy font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg"
            >
              Understood — Reserve Direct
            </button>
          </div>
        </div>
      )}

      {/* 8. Floating WhatsApp Concierge Drawer */}
      <WhatsAppConcierge activeProperty={activeProperty} />

      {/* 9. Executive Footer */}
      <Footer activeProperty={activeProperty} setActiveProperty={setActiveProperty} />

    </div>
  );
}
