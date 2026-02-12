import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat: React.FC = () => {
  const handleClick = () => {
    window.open("https://wa.me/628159118754", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="absolute bottom-full right-0 mb-2 bg-stone-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat dengan kami
      </span>
    </button>
  );
};

export default WhatsAppFloat;
