import { useState, useEffect } from 'react';
import siteConfig from '../data/siteConfig';
import { WhatsAppIcon } from './Icons';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show a pulsing notification badge after 4 seconds to prompt the user
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const cleanMessage = message.trim();
    const defaultText = "Hi Biocare Health Systems, I have a question about your medical equipment.";
    const textToSend = cleanMessage ? cleanMessage : defaultText;
    const whatsappUrl = `https://wa.me/254723835776?text=${encodeURIComponent(textToSend)}`;
    
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {/* WhatsApp Chat Box Window */}
      {isOpen && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4 animate-fade-in-up origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#128C7E] to-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Online avatar badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shadow-inner">
                  <img 
                    src="/images/biocare-logo-wide.png" 
                    alt="Biocare Logo" 
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              
              <div>
                <h4 className="text-sm font-bold leading-tight">Biocare Support</h4>
                <p className="text-[10px] text-emerald-200 flex items-center font-normal">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-1.5 animate-pulse"></span>
                  Replies in minutes
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors focus:outline-none"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body (Classic WhatsApp Styled Background) */}
          <div 
            className="p-4 bg-[#e5ddd5] flex-grow overflow-y-auto max-h-64 space-y-4"
            style={{
              backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(229, 221, 213, 0.95)'
            }}
          >
            {/* Agent Bubble */}
            <div className="bg-white text-slate-800 text-xs p-3.5 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-md max-w-[85%] border-l-4 border-emerald-500 animate-fade-in-up">
              <p className="font-semibold text-emerald-800 mb-1 text-[10px] uppercase">Biocare Health Systems</p>
              <p className="leading-relaxed font-normal">
                Hi there! 👋 Welcome to Biocare. 
                <br /><br />
                How can we assist you with our medical, diagnostics, or lab equipment today? Ask us anything!
              </p>
              <span className="text-[9px] text-gray-400 text-right block mt-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Footer Input Area */}
          <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-gray-100 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-slate-50 border border-slate-200 focus:border-[#128C7E] rounded-full px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-normal"
            />
            <button
              type="submit"
              className="bg-[#128C7E] hover:bg-[#075E54] text-white p-2.5 rounded-full shadow-lg shadow-[#128C7E]/20 transition-all flex items-center justify-center focus:outline-none shrink-0"
              aria-label="Send WhatsApp message"
            >
              <svg className="w-4 h-4 fill-current transform rotate-45 translate-x-px -translate-y-px" viewBox="0 0 24 24">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Circle Button */}
      <button
        onClick={handleOpenChat}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none relative group"
        aria-label="Open WhatsApp Chat Widget"
      >
        {/* Pulsing visual glow */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 animate-ping opacity-75"></span>
        
        {/* Actual icon */}
        <WhatsAppIcon className="w-7 h-7 relative z-10" />

        {/* Pulsing Notification Badge */}
        {showNotification && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white font-bold items-center justify-center">1</span>
          </span>
        )}
      </button>
    </div>
  );
}
