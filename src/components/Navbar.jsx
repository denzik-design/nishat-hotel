import React, { useState } from 'react';
import { Building2, Globe, ShieldCheck, ChevronDown, PhoneCall, Sparkles, CheckCircle, Menu, X, Award, Key, Utensils, Calendar, Waves } from 'lucide-react';
import logoImg from '../assets/nishat-logo.png';
import { PROPERTIES } from '../data/propertiesData';

export default function Navbar({
  activePage,
  setActivePage,
  activeProperty,
  setActiveProperty,
  currency,
  setCurrency,
  onOpenDirectPerks,
  onOpenLoyalty,
  onOpenDigitalKey
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'stay', label: 'Stay & Suites' },
    { id: 'banquets', label: 'Banquets & Events' },
    { id: 'dining', label: 'Dining, Buffet & High-Tea' },
    { id: 'wellness', label: 'Oasis Spa & Pool' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-nishat-navy/95 backdrop-blur-md border-b border-nishat-gold/30 text-white shadow-2xl">
      {/* Top Direct VIP Banner (Desktop & Mobile) */}
      <div className="bg-gradient-to-r from-nishat-darkNavy via-nishat-navy to-nishat-darkNavy border-b border-nishat-gold/20 py-1.5 px-4 text-xs font-medium text-amber-200/90 flex justify-between items-center">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-nishat-gold animate-pulse" />
          <span className="tracking-wide">Direct VIP Privileges: Free Breakfast & 2 PM Late Checkout</span>
          <button 
            onClick={onOpenDirectPerks}
            className="underline text-nishat-goldLight hover:text-white font-semibold ml-1 transition-colors"
          >
            View Perks →
          </button>
        </div>
        
        {/* Top Right Quick Access: Loyalty & Digital Key */}
        <div className="hidden sm:flex items-center gap-4 text-zinc-300">
          <button
            onClick={onOpenLoyalty}
            className="text-amber-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors group"
          >
            <Award className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Nishat Privilege Club</span>
          </button>
          <span className="text-zinc-600">|</span>
          <button
            onClick={onOpenDigitalKey}
            className="text-zinc-200 hover:text-amber-300 font-medium flex items-center gap-1.5 transition-colors group"
          >
            <Key className="w-3.5 h-3.5 text-nishat-gold group-hover:scale-110 transition-transform" />
            <span>Digital Key (Room 704)</span>
          </button>
          <span className="text-zinc-600">|</span>
          <a href="tel:+9242111647428" className="hover:text-nishat-gold transition-colors flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-nishat-gold" /> +92 42 111 647 428
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Master Monogram */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => {
              setActivePage('stay');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-12 h-12 bg-nishat-darkNavy/80 border border-nishat-gold/50 rounded-full p-1 flex items-center justify-center shadow-lg group hover:border-nishat-gold transition-all duration-300">
              <img 
                src={logoImg} 
                alt="The Nishat Hotel Monogram" 
                className="w-full h-full object-contain rounded-full drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] group-hover:scale-105 transition-transform" 
              />
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-[0.22em] text-white uppercase leading-none">
                THE NISHAT HOTEL
              </h1>
              <div className="text-[10px] sm:text-xs tracking-widest text-nishat-gold font-medium mt-1 uppercase flex items-center gap-1">
                {PROPERTIES.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <span className={activeProperty.id === p.id ? "text-amber-300 font-bold border-b border-amber-400 pb-0.5" : "text-zinc-400 opacity-80"}>
                      {p.city === 'Lahore' ? p.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : p.city}
                    </span>
                    {idx < PROPERTIES.length - 1 && <span className="text-nishat-gold/40">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Center Page Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 text-xs font-serif uppercase tracking-wider transition-all rounded-lg ${
                  activePage === item.id
                    ? 'text-amber-300 font-bold border-b-2 border-nishat-gold bg-nishat-gold/10'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Property Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-nishat-darkNavy/90 border border-nishat-gold/40 hover:border-nishat-gold px-3 py-2 rounded-lg text-xs text-zinc-100 font-medium transition-all shadow-md"
              >
                <Building2 className="w-3.5 h-3.5 text-nishat-gold" />
                <span>{activeProperty.name.replace('The Nishat Hotel — ', '')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-nishat-gold transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-nishat-darkNavy border border-nishat-gold/40 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-nishat-gold uppercase tracking-wider border-b border-zinc-800">
                    Select Hotel Property
                  </div>
                  {PROPERTIES.map((prop) => (
                    <button
                      key={prop.id}
                      onClick={() => {
                        setActiveProperty(prop);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex flex-col transition-colors ${
                        activeProperty.id === prop.id 
                          ? 'bg-nishat-gold/20 text-white font-semibold border-l-4 border-nishat-gold' 
                          : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {prop.name}
                        {activeProperty.id === prop.id && <CheckCircle className="w-4 h-4 text-nishat-gold" />}
                      </span>
                      <span className="text-xs text-zinc-400 mt-0.5">{prop.tagline}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Global Currency Switcher */}
            <div className="bg-nishat-darkNavy/90 border border-nishat-gold/40 rounded-lg p-0.5 flex items-center shadow-md">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'PKR' 
                    ? 'bg-nishat-gold text-nishat-navy shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                PKR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'USD' 
                    ? 'bg-nishat-gold text-nishat-navy shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Quick Primary CTA */}
            <button 
              onClick={() => {
                setActivePage('stay');
                setTimeout(() => {
                  const catalogEl = document.getElementById('room-catalog');
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="gold-gradient-bg text-nishat-navy font-bold px-4 py-2 rounded-lg text-xs tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Book Direct
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenLoyalty}
              className="bg-zinc-900 border border-amber-400/60 p-2 rounded-md text-amber-300"
              title="Loyalty Pass"
            >
              <Award className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDigitalKey}
              className="bg-zinc-900 border border-blue-400/60 p-2 rounded-md text-blue-200"
              title="Digital Key"
            >
              <Key className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
              className="bg-nishat-darkNavy border border-nishat-gold/40 px-2.5 py-1.5 rounded-md text-xs font-bold text-nishat-gold"
            >
              {currency}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-lg bg-nishat-darkNavy border border-nishat-gold/30"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-nishat-gold" /> : <Menu className="w-6 h-6 text-nishat-gold" />}
            </button>
          </div>
        </div>

        {/* Secondary Subnav for Tablet & Mobile Quick Page Selection */}
        <div className="flex xl:hidden overflow-x-auto py-2 border-t border-zinc-800/80 gap-2 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs whitespace-nowrap rounded-lg font-medium transition-all ${
                activePage === item.id
                  ? 'gold-gradient-bg text-nishat-navy font-bold shadow'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-nishat-darkNavy border-b border-nishat-gold/40 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          
          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-nishat-gold uppercase tracking-widest mb-1.5">
              Portal Sections
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left p-3 rounded-lg text-sm flex items-center justify-between border transition-all ${
                  activePage === item.id
                    ? 'bg-nishat-gold/20 border-nishat-gold text-white font-bold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                }`}
              >
                <span>{item.label}</span>
                {activePage === item.id && <span className="text-nishat-gold font-bold">●</span>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLoyalty();
              }}
              className="bg-zinc-900 border border-amber-400/60 p-3 rounded-xl flex items-center gap-2 text-xs font-bold text-amber-300"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Loyalty Pass</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDigitalKey();
              }}
              className="bg-zinc-900 border border-blue-400/60 p-3 rounded-xl flex items-center gap-2 text-xs font-bold text-blue-200"
            >
              <Key className="w-4 h-4 text-amber-300" />
              <span>Digital Key</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-nishat-gold uppercase tracking-widest mb-1">
              Select Flagship Property
            </div>
            {PROPERTIES.map((prop) => (
              <button
                key={prop.id}
                onClick={() => {
                  setActiveProperty(prop);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg text-sm flex flex-col border transition-all ${
                  activeProperty.id === prop.id 
                    ? 'bg-nishat-gold/20 border-nishat-gold text-white font-semibold' 
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                }`}
              >
                <span className="flex items-center justify-between font-serif">
                  {prop.name}
                  {activeProperty.id === prop.id && <CheckCircle className="w-4 h-4 text-nishat-gold" />}
                </span>
                <span className="text-xs text-zinc-400 mt-1">{prop.tagline}</span>
              </button>
            ))}
          </div>

        </div>
      )}
    </header>
  );
}
