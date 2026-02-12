import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "628159118754"; // Annise Herbal WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl w-80 sm:w-96 overflow-hidden animate-fade-in-up border border-stone-200">
          {/* Header */}
          <div className="bg-[#25D366] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <MessageCircle size={24} />
              <div>
                <h3 className="font-bold text-sm">Annise Herbal Support</h3>
                <p className="text-xs opacity-90">
                  Biasanya membalas dalam 1 jam
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white_80 hover:text-white hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-50 h-72 overflow-y-auto flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
            <div className="bg-white p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm self-start max-w-[85%] border border-stone-100">
              <p className="text-stone-700 text-sm">
                Halo! 👋 <br />
                Ada yang bisa kami bantu? Silakan pilih topik di bawah ini atau
                tulis pesan Anda.
              </p>
              <span className="text-[10px] text-stone-400 block text-right mt-1">
                Admin
              </span>
            </div>

            {/* Quick Options */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  setMessage("Halo, saya ingin membeli produk Annise Herbal.");
                  setTimeout(
                    () => document.getElementById("wa-submit")?.click(),
                    100,
                  );
                }}
                className="bg-white p-3 rounded-xl shadow-sm text-left text-sm text-emerald-800 hover:bg-emerald-50 border border-emerald-100 transition-colors flex items-center justify-between group"
              >
                <span>🛍️ Saya ingin membeli produk</span>
                <span className="opacity-0 group-hover:opacity-100 text-emerald-600">
                  →
                </span>
              </button>
              <button
                onClick={() => {
                  setMessage(
                    "Halo, saya ingin konsultasi tentang penggunaan produk.",
                  );
                  setTimeout(
                    () => document.getElementById("wa-submit")?.click(),
                    100,
                  );
                }}
                className="bg-white p-3 rounded-xl shadow-sm text-left text-sm text-emerald-800 hover:bg-emerald-50 border border-emerald-100 transition-colors flex items-center justify-between group"
              >
                <span>💬 Ingin konsultasi / tanya-tanya</span>
                <span className="opacity-0 group-hover:opacity-100 text-emerald-600">
                  →
                </span>
              </button>
              <button
                onClick={() => {
                  setMessage("Halo, saya ada keperluan lain.");
                  // user might want to type more details for 'other', so just fill input
                }}
                className="bg-white p-3 rounded-xl shadow-sm text-left text-sm text-emerald-800 hover:bg-emerald-50 border border-emerald-100 transition-colors flex items-center justify-between group"
              >
                <span>✨ Lainnya</span>
                <span className="opacity-0 group-hover:opacity-100 text-emerald-600">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Footer / Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-stone-100 flex gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 bg-stone-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#25D366] focus:outline-none"
              autoFocus
            />
            <button
              id="wa-submit"
              type="submit"
              disabled={!message.trim()}
              className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#20bd5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group ${
          isOpen ? "bg-stone-700 text-white" : "bg-[#25D366] text-white"
        }`}
        aria-label={isOpen ? "Close chat" : "Chat on WhatsApp"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}

        {/* Tooltip (only when closed) */}
        {!isOpen && (
          <span className="absolute bottom-full right-0 mb-2 bg-stone-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat dengan kami
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppFloat;
