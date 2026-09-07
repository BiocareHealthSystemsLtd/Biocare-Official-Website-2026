import { useState } from 'react';
import siteConfig from '../data/siteConfig';
import { WhatsAppIcon, CloseIcon } from './Icons';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    const cleanMessage = message.trim();
    const defaultText = "Hello Biocare Health Systems, I would like to inquire about medical equipment pricing and availability.";
    const textToSend = cleanMessage || defaultText;
    const whatsappUrl = `https://wa.me/254723835776?text=${encodeURIComponent(textToSend)}`;
    
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans flex flex-col items-end">
      {/* WhatsApp Quick Message Panel */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden flex flex-col mb-3">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">Biocare Sales & Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct WhatsApp Desk (Nairobi)</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 sm:p-4 bg-slate-50 space-y-3 text-xs text-slate-700">
            <p className="leading-relaxed">
              Have a question about equipment specs, delivery schedules, or formal price quotations? Send us a direct message on WhatsApp.
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div><strong>Direct Sales:</strong> 0723 835776</div>
              <div><strong>Office Line:</strong> 0110039450</div>
              <div><strong>Hours:</strong> Mon - Fri 8am - 5pm | Sat 9am - 1pm</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-slate-200 flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Type your inquiry (e.g. DH36 price)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-500"
            />
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2 rounded text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Start WhatsApp Conversation</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3 sm:px-3.5 py-2.5 rounded-md shadow-md transition-colors text-xs font-medium cursor-pointer"
        aria-label="Contact Biocare on WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">WhatsApp Sales Desk</span>
      </button>
    </div>
  );
}
