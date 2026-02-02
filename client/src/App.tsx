import React, { useState, useEffect } from "react";
import logoAnnise from "./assets/logoAnniseherbal.png";
import {
  Globe,
  Search,
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";

// Import Types (Wajib pakai "type")
import type { Product, CartItem } from "./types";

// Import Data
import { translations } from "./data/data";

// Import Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import StoryPage from "./pages/StoryPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import EducationDetailPage from "./pages/EducationDetailPage";
import ShippingPage from "./pages/ShippingPage";
import AdminPage from "./pages/AdminPage";
import FAQPage from "./pages/FAQPage";

// Import Components
import SearchOverlay from "./components/SearchOverlay";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import MobileMenu from "./components/MobileMenu";

// Import Utils
import { getTranslatedProducts } from "./utils/productHelpers";

// NavLink component defined outside App
const NavLink: React.FC<{
  page: string;
  label: string;
  currentPage: string;
  navigateTo: (page: string) => void;
}> = ({ page, label, currentPage, navigateTo }) => (
  <button
    onClick={() => navigateTo(page)}
    className={`text-sm font-medium tracking-wide transition-colors ${
      currentPage === page
        ? "text-emerald-800"
        : "text-stone-700 hover:text-emerald-800"
    }`}
  >
    {label}
  </button>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  ); // Store ID only
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // --- LANGUAGE STATE ---
  const [lang, setLang] = useState<"id" | "en">("id");
  const t = translations[lang];

  // Derived State for Products
  const products = React.useMemo(() => getTranslatedProducts(lang), [lang]);
  const selectedProduct = React.useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId],
  );

  // Wrapper for setting product to maintain API compatibility with children
  const handleSetProduct = (product: Product | null) => {
    setSelectedProductId(product?.id || null);
  };

  // --- CART STATE ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setCartOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  // --- CART FUNCTIONS ---
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item)),
    );
  };

  return (
    <div className="font-sans text-stone-800 bg-[#fafaf9] selection:bg-emerald-200 selection:text-emerald-900 min-h-screen flex flex-col">
      {/* OVERLAYS */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        navigateTo={navigateTo}
        setProduct={handleSetProduct}
        t={t.search}
      />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQty}
        onCheckout={() => navigateTo("checkout")}
        onStartShopping={() => navigateTo("shop")}
        t={t.cart}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigateTo={navigateTo}
        currentPage={currentPage}
        t={t}
        lang={lang}
        toggleLang={toggleLang}
        setProduct={handleSetProduct}
      />

      {/* WHATSAPP FLOAT BUTTON */}
      <WhatsAppFloat />

      {/* HEADER */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo("home")}
          >
            <img
              src={logoAnnise}
              alt="Annise Herbal"
              className="h-20 md:h-28 w-auto object-contain transition-all hover:scale-105"
            />
          </div>

          {/* NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink
              page="home"
              label={t.nav.home}
              currentPage={currentPage}
              navigateTo={navigateTo}
            />
            <NavLink
              page="shop"
              label={t.nav.shop}
              currentPage={currentPage}
              navigateTo={navigateTo}
            />
            <NavLink
              page="story"
              label={t.nav.story}
              currentPage={currentPage}
              navigateTo={navigateTo}
            />
            <NavLink
              page="resources"
              label={t.nav.resources}
              currentPage={currentPage}
              navigateTo={navigateTo}
            />
            <NavLink
              page="contact"
              label={t.nav.contact}
              currentPage={currentPage}
              navigateTo={navigateTo}
            />
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-emerald-900 transition-colors"
            >
              <Globe size={18} />
              <span>{lang === "id" ? "ID" : "EN"}</span>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:block text-stone-700 hover:text-emerald-900 transition-colors"
            >
              <Search size={20} />
            </button>

            <div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag
                size={20}
                className="text-stone-700 hover:text-emerald-900 transition-colors"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cart.length}
                </span>
              )}
            </div>

            <button
              className="lg:hidden text-stone-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="grow">
        {currentPage === "home" && (
          <HomePage
            navigateTo={navigateTo}
            setProduct={handleSetProduct}
            addToCart={addToCart}
            t={t}
            lang={lang}
          />
        )}
        {currentPage === "shipping" && <ShippingPage />}
        {currentPage === "shop" && (
          <ShopPage
            navigateTo={navigateTo}
            setProduct={handleSetProduct}
            addToCart={addToCart}
            t={t}
            lang={lang}
          />
        )}
        {currentPage === "product" && (
          <ProductDetailPage
            product={selectedProduct}
            navigateTo={navigateTo}
            addToCart={addToCart}
            t={t.product}
          />
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            cartItems={cart}
            navigateTo={navigateTo}
            clearCart={() => setCart([])}
            t={t.checkout}
          />
        )}
        {currentPage === "story" && <StoryPage t={t} />}
        {currentPage === "resources" && (
          <ResourcesPage t={t} navigateTo={navigateTo} />
        )}
        {currentPage === "resources-safety" && (
          <EducationDetailPage
            type="safety"
            navigateTo={navigateTo}
            lang={lang}
          />
        )}
        {currentPage === "resources-science" && (
          <EducationDetailPage
            type="science"
            navigateTo={navigateTo}
            lang={lang}
          />
        )}
        {currentPage === "contact" && <ContactPage t={t} />}
        {currentPage === "faq" && <FAQPage t={t} />}
        {currentPage === "admin" && <AdminPage />}
      </main>

      <footer className="bg-[#e6dbc9] text-[#1c1209] pt-24 pb-12 border-t border-[#d4c5b0]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
            {/* Brand Section - 4 Columns */}
            <div className="md:col-span-4">
              <div className="mb-8">
                <img
                  src={logoAnnise}
                  alt="Annise Herbal"
                  className="h-24 w-auto object-contain mix-blend-multiply"
                />
              </div>
              <p className="text-[#1c1209] leading-relaxed mb-8 max-w-sm text-sm font-medium">
                {t.footer?.text ||
                  "Solusi perawatan alami terpercaya untuk keluarga Indonesia sejak 2005."}
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1c1209]/5 flex items-center justify-center text-[#1c1209] hover:bg-[#1c1209] hover:text-[#e6dbc9] transition-all duration-300 border border-[#1c1209]/10 hover:border-[#1c1209]"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1c1209]/5 flex items-center justify-center text-[#1c1209] hover:bg-[#1c1209] hover:text-[#e6dbc9] transition-all duration-300 border border-[#1c1209]/10 hover:border-[#1c1209]"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Links Sections - 2 Columns Each */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-serif text-lg text-[#1c1209] mb-8 font-bold tracking-wide">
                Shop
              </h4>
              <ul className="space-y-4 text-sm text-[#1c1209] font-medium">
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("shop");
                    window.scrollTo(0, 0);
                  }}
                >
                  Best Sellers
                </li>
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("shop");
                    window.scrollTo(0, 0);
                  }}
                >
                  Pain Relief
                </li>
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("shop");
                    window.scrollTo(0, 0);
                  }}
                >
                  Kids Series
                </li>
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("shop");
                    window.scrollTo(0, 0);
                  }}
                >
                  All Products
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-serif text-lg text-[#1c1209] mb-8 font-bold tracking-wide">
                Support
              </h4>
              <ul className="space-y-4 text-sm text-[#1c1209] font-medium">
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("contact");
                    window.scrollTo(0, 0);
                  }}
                >
                  {t.nav.contact}
                </li>
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("resources");
                    window.scrollTo(0, 0);
                  }}
                >
                  Safety Guide
                </li>
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("shipping");
                    window.scrollTo(0, 0);
                  }}
                >
                  Shipping & Returns
                </li>
                <li
                  className="hover:text-[#8c6b4a] cursor-pointer transition-colors"
                  onClick={() => {
                    navigateTo("faq");
                    window.scrollTo(0, 0);
                  }}
                >
                  FAQ
                </li>
              </ul>
            </div>

            {/* Newsletter - 3 Columns */}
            <div className="md:col-span-3">
              <h4 className="font-serif text-lg text-[#1c1209] mb-8 font-bold tracking-wide">
                Stay Updated
              </h4>
              <p className="text-sm text-[#1c1209] mb-6 leading-relaxed font-medium">
                Dapatkan tips kesehatan alami dan penawaran spesial langsung ke
                email Anda.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-[#fbf8f5] border border-[#d4c5b0] rounded-lg px-4 py-3 text-sm text-[#1c1209] placeholder:text-[#1c1209]/40 focus:outline-none focus:border-[#8c6b4a] transition-colors shadow-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#8c6b4a] rounded-md text-[#f5efe6] hover:bg-[#6b523a] transition-colors shadow-sm">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#d4c5b0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#1c1209]/60">
            <p>&copy; 2024 Annise Herbal. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-[#8c6b4a] cursor-pointer transition-colors hover:underline">
                {t.footer?.privacy || "Privacy Policy"}
              </span>
              <span className="hover:text-[#8c6b4a] cursor-pointer transition-colors hover:underline">
                {t.footer?.terms || "Terms of Service"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
