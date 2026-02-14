import React, { useState, useEffect } from "react";
import { X, Globe, Search, ChevronRight, ShoppingBag } from "lucide-react";
import type { TranslationData } from "../data/data";
import { products } from "../data/data";
import type { Product } from "../types";
import logoAnnise from "../assets/logoAnniseherbal.png";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: string) => void;
  currentPage: string;
  t: TranslationData;
  lang: "id" | "en";
  toggleLang: () => void;
  setProduct?: (product: Product) => void; // Optional prop for search results
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigateTo,
  currentPage,
  t,
  lang,
  toggleLang,
  setProduct,
}) => {
  const [query, setQuery] = useState("");
  const [shouldRender, setShouldRender] = useState(isOpen);

  // If opening, set render immediately to avoid flash/effect warning
  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  // Handle side effects and unmount delay
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        setQuery(""); // Reset search after animation
      }, 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleNavigate = (page: string) => {
    navigateTo(page);
    onClose();
  };

  const handleProductClick = (product: Product) => {
    if (setProduct) {
      setProduct(product);
      onClose();
    }
  };

  const filteredProducts =
    query.length > 0
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Menu Panel */}
      <div
        className={`relative w-[85%] max-w-sm h-full bg-[#fafaf9] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-stone-200/60 bg-white/50">
          <div className="flex items-center gap-2">
            <img
              src={logoAnnise}
              alt="Annise Herbal"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-emerald-800 hover:bg-stone-100 rounded-full transition-all"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Search Section */}
        <div className="px-6 py-6">
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search?.placeholder || "Search products..."}
              className="w-full bg-white border border-stone-200 rounded-xl py-3.5 pl-11 pr-4 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-sm"
            />
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-600 transition-colors"
              size={20}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {query.length > 0 ? (
            /* Search Results */
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Products
              </h3>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-stone-100 group"
                  >
                    <div className="w-12 h-12 bg-stone-50 rounded-lg overflow-hidden shrink-0 border border-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        {product.category}
                      </p>
                    </div>
                    <ChevronRight
                      className="ml-auto text-stone-300 group-hover:text-emerald-400"
                      size={16}
                    />
                  </button>
                ))
              ) : (
                <p className="text-stone-400 text-center py-4 text-sm italic">
                  No products found.
                </p>
              )}
            </div>
          ) : (
            /* Navigation Links */
            <nav className="space-y-2">
              {[
                { page: "home", label: t.nav.home },
                { page: "shop", label: t.nav.shop },
                { page: "story", label: t.nav.story },
                { page: "resources", label: t.nav.resources },
                { page: "contact", label: t.nav.contact },
              ].map((item, idx) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`group w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    currentPage === item.page
                      ? "bg-emerald-50/80 text-emerald-900 border border-emerald-100"
                      : "text-stone-600 hover:bg-white hover:text-emerald-800 hover:shadow-sm hover:border-stone-100 border border-transparent"
                  }`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span
                    className={`text-lg ${currentPage === item.page ? "font-serif font-medium" : "font-sans font-normal"}`}
                  >
                    {item.label}
                  </span>
                  {currentPage === item.page && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  )}
                </button>
              ))}

              <div className="pt-6 mt-4 border-t border-stone-200/60">
                <button
                  onClick={() => handleNavigate("shop")}
                  className="w-full bg-emerald-900 text-white rounded-xl py-3.5 font-medium shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 hover:shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  {t.hero?.s1_btn || "Shop Now"}
                </button>
              </div>
            </nav>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-200 bg-stone-50/50">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-emerald-900 hover:bg-stone-200/50 transition-colors w-full justify-center"
          >
            <Globe size={16} />
            <span>
              Switch to{" "}
              <span className="font-bold">
                {lang === "id" ? "English" : "Bahasa Indonesia"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
