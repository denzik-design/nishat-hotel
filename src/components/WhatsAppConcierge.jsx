import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, ShieldCheck } from 'lucide-react';

export default function WhatsAppConcierge({ activeProperty }) {
  const [isOpen, setIsOpen] = useState(false);

  const quickQueries = [
    "Inquire about Presidential Suite Availability",
    "Arrange VIP Airport Mercedes Chauffeur",
    "Reserve Table at Banu Chaudhry Fine Dining",
    "Special Corporate & Executive Delegation Booking"
  ];

  const handleSendWhatsApp = (queryText) => {
    const text = encodeURIComponent(
      `Hello Nishat Concierge at ${activeProperty.name}.\n${queryText}`
    );
    window.open(`https://wa.me/${activeProperty.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      
      {/* Floating Concierge Chat Drawer */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-nishat-darkNavy border-2 border-nishat-gold rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-nishat-navy via-amber-950 to-nishat-navy p-4 border-b border-nishat-gold/40 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-md">
                <MessageSquare className="w-5 h-5 fill-emerald-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1">
                  24/7 Digital Concierge
                </h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Online • {activeProperty.name.replace('The Nishat Hotel — ', '')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 bg-nishat-navy/90 text-xs text-zinc-200 max-h-80 overflow-y-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 space-y-1">
              <span className="text-[10px] text-nishat-gold font-bold uppercase tracking-wider block">Nishat Guest Services</span>
              <p>Welcome to The Nishat Hotel. How may our butler concierge assist your stay today?</p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Quick Inquiries:</span>
              {quickQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWhatsApp(query)}
                  className="w-full text-left bg-zinc-900/80 hover:bg-nishat-gold/20 hover:border-nishat-gold border border-zinc-800 p-2.5 rounded-lg text-xs text-zinc-200 transition-all flex items-center justify-between group"
                >
                  <span className="group-hover:text-amber-300">{query}</span>
                  <Send className="w-3.5 h-3.5 text-nishat-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-nishat-darkNavy border-t border-zinc-800 text-center text-[10px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Direct WhatsApp Line
            </span>
            <a 
              href={`https://wa.me/${activeProperty.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 font-bold hover:underline"
            >
              Open WhatsApp App →
            </a>
          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gold-gradient-bg text-nishat-navy font-bold p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_0_25px_rgba(180,140,72,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border-2 border-amber-300"
        aria-label="Open WhatsApp Concierge"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-inner">
          <MessageSquare className="w-4 h-4 fill-white" />
        </div>
        <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold text-nishat-navy">
          WhatsApp Concierge
        </span>
      </button>

    </div>
  );
}
