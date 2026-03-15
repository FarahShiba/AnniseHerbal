import React, { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import heros3 from "../assets/heros3.jpg"; // Using an aesthetic background

interface WelcomePopupProps {
  navigateTo: (page: string) => void;
  lang: "id" | "en";
  t: {
    tag: string;
    title: string;
    desc: string;
    btn: string;
  };
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ navigateTo, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");

    if (!hasSeenPopup) {
      // Delay entrance by 2 seconds to not overwhelm the user immediately
      const timer = setTimeout(() => {
        setShouldRender(true);
        // Small delay for entrance animation
        setTimeout(() => setIsOpen(true), 50);
        // Mark as seen
        localStorage.setItem("hasSeenWelcomePopup", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setShouldRender(false), 500); // Wait for exit animation
  };

  const handleExplore = () => {
    handleClose();
    navigateTo("shop");
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl bg-stone-900 rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all duration-700 ease-out border border-white/10 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 relative h-48 md:h-auto overflow-hidden">
          <img
            src={heros3}
            alt="Annise Herbal Essential Oils"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/40 to-transparent md:bg-linear-to-r md:from-transparent md:via-stone-900/40 md:to-stone-900" />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-emerald-950/20">
          {/* Subtle glowing orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
              <Sparkles size={12} />
              {t.tag}
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4">
              {t.title}
            </h2>
            
            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-8">
              {t.desc}
            </p>

            <button
              onClick={handleExplore}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] transform hover:-translate-y-0.5"
            >
              <span>{t.btn}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full border border-emerald-400 opacity-50 animate-ping" style={{ animationDuration: '3s' }} />
            </button>
            
            <button
              onClick={handleClose}
              className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-6 py-4 text-stone-400 hover:text-white text-sm font-medium transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
