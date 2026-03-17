import React, { useState, useRef, useLayoutEffect } from "react";
import {
  ArrowRight,
  Star,
  Leaf,
  Wind,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import Button from "../components/Button";
import SEO from "../components/SEO";
import type { Product } from "../types";
import type { TranslationData } from "../data/data";

interface ProductDetailPageProps {
  product: Product | null;
  navigateTo: (page: string) => void;
  addToCart: (product: Product) => void;
  t: TranslationData["product"];
  lang: "id" | "en";
}

const AccordionItem: React.FC<{
  title: string;
  isOpen: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, isOpen, onClick, icon, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      wrapperRef.current.style.height = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen, children]);

  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group transition-all"
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-emerald-600 transition-colors duration-300 ${
              isOpen
                ? "text-emerald-700"
                : "text-stone-400 group-hover:text-emerald-600"
            }`}
          >
            {icon}
          </span>
          <span
            className={`font-serif text-lg font-medium transition-colors duration-300 ${
              isOpen
                ? "text-emerald-900"
                : "text-stone-600 group-hover:text-emerald-900"
            }`}
          >
            {title}
          </span>
        </div>
        <ChevronDown
          className={`text-stone-400 transition-transform duration-300 ${
            isOpen
              ? "rotate-180 text-emerald-600"
              : "group-hover:text-emerald-600"
          }`}
          size={20}
        />
      </button>
      <div
        ref={wrapperRef}
        className="overflow-hidden transition-[height] duration-300 ease-in-out h-0"
      >
        <div
          ref={contentRef}
          className="pb-6 pt-1 text-stone-600 leading-relaxed"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  navigateTo,
  addToCart,
  t,
  lang,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("benefits");

  // Initialize active image index or reset when product changes
  // Using key on component in App.tsx is preferred, but keeping this logic simple here for now
  // or relying on parent key. (Parent has key, so this mount is fresh).

  if (!product) return <div className="pt-32 text-center">Loading...</div>;

  // Helper function to get localized content
  const getLocalizedField = (
    field: keyof Product,
    fallbackField: keyof Product,
  ) => {
    if (lang === "en") {
      return product[field] || product[fallbackField];
    }
    return product[fallbackField];
  };

  // Get localized values
  const productName = getLocalizedField("name_en", "name") as string;
  const productDescription = getLocalizedField(
    "description_en",
    "description",
  ) as string;
  const productBenefits = getLocalizedField(
    "benefits_en",
    "benefits",
  ) as string[];
  const productIngredients = getLocalizedField(
    "ingredients_en",
    "ingredients",
  ) as string | string[];
  const productHowToUse = getLocalizedField("howToUse_en", "howToUse") as
    | string
    | string[];
  const productCaution = getLocalizedField("caution_en", "caution") as
    | string
    | string[];

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const activeImage = images[activeImageIndex];

  // Parse Name and Volume
  const nameParts = productName.split(" - ");
  const displayName = nameParts[0];
  const productVolume = nameParts.length > 1 ? nameParts[1] : null;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: displayName,
    image: images,
    description: product.shortDesc,
    brand: {
      "@type": "Brand",
      name: "Annise Herbal",
    },
    offers: {
      "@type": "Offer",
      url: `https://anniseherbal.com/product/${product.id}`,
      priceCurrency: "IDR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Annise Herbal",
      },
    },
  };

  return (
    <div className="animate-fade-in pt-28 md:pt-48 pb-24 bg-white min-h-screen">
      <SEO
        title={`${displayName} | Annise Herbal`}
        description={product.shortDesc}
        canonical={`https://anniseherbal.com/product/${product.id}`}
        image={images[0]}
        schemaData={JSON.stringify(productSchema)}
      />
      <div className="container mx-auto px-6 relative">
        <button
          onClick={() => navigateTo("shop")}
          className="relative z-10 flex items-center text-stone-600 hover:text-emerald-900 mb-8 text-sm group"
        >
          <ArrowRight
            className="rotate-180 mr-2 group-hover:-translate-x-1 transition-transform"
            size={16}
          />{" "}
          {t.back}
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT COLUMN: Gallery */}
          <div className="lg:w-1/2">
            <div>
              {/* Main Image Container - ORIGINAL DESIGN RESTORED */}
              <div
                className={`aspect-square rounded-3xl ${product.imageColor} flex items-center justify-center relative overflow-hidden group cursor-zoom-in border border-stone-100`}
                onClick={() => setIsZoomOpen(true)}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className={`w-full h-full object-contain transition-transform duration-500 ${
                    activeImageIndex === 0
                      ? "p-2 md:p-4 scale-[1.3] md:scale-[1.5] hover:scale-[1.4] md:hover:scale-[1.6]"
                      : "p-4 md:p-8 hover:scale-105"
                  }`}
                />

                {/* Carousel Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="rotate-180" size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}

                <div className="absolute top-6 left-6">
                  <span className="bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 mt-6 justify-center overflow-x-auto py-2 px-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                        idx === activeImageIndex
                          ? "ring-2 ring-emerald-600 ring-offset-2 scale-105 shadow-md"
                          : "opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        className="w-full h-full object-contain bg-white p-1 scale-110"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Info & Accordion */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-2">
              <h1 className="text-4xl lg:text-5xl font-serif text-emerald-950 leading-tight">
                {displayName}
              </h1>
              {productVolume && (
                <p className="text-stone-500 text-lg font-medium mt-2">
                  {productVolume}
                </p>
              )}
            </div>

            <p className="text-2xl text-emerald-700 font-medium mt-4 mb-6">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <div className="prose prose-stone prose-lg max-w-none text-stone-600 mb-10 leading-relaxed font-light">
              {productDescription}
            </div>

            <div className="flex gap-4 mb-12">
              <Button
                onClick={() => addToCart(product)}
                className="px-8 shadow-emerald-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                {t.add_cart}
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  window.open("https://wa.me/628159118754", "_blank")
                }
              >
                {t.ask_wa}
              </Button>
            </div>

            {/* Accordion Section */}
            <div className="border-t border-stone-200">
              <AccordionItem
                title={t.benefits}
                isOpen={openSection === "benefits"}
                onClick={() => toggleSection("benefits")}
                icon={<Star size={20} />}
              >
                <ul className="grid gap-3 pl-2">
                  {productBenefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-stone-600 group/item"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2.5 mr-4 shrink-0 group-hover/item:scale-150 transition-transform"></span>
                      <span className="group-hover/item:text-emerald-800 transition-colors">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem
                title={t.composition}
                isOpen={openSection === "ingredients"}
                onClick={() => toggleSection("ingredients")}
                icon={<Leaf size={20} />}
              >
                {(() => {
                  // Parse ingredients: handle both array and numbered string format
                  let ingredientList: string[] = [];

                  if (Array.isArray(productIngredients)) {
                    ingredientList = productIngredients;
                  } else if (typeof productIngredients === "string") {
                    // Split by number pattern (e.g., "1. Item 2. Item" -> ["Item", "Item"])
                    ingredientList = productIngredients
                      .split(/\d+\.\s*/)
                      .map((item) => item.trim())
                      .filter((item) => item.length > 0);
                  }

                  return ingredientList.length > 0 ? (
                    <ul className="grid gap-2 pl-2">
                      {ingredientList.map((ing, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-stone-600 text-sm  font-medium"
                        >
                          <span className="w-1 h-1 bg-emerald-300 rounded-full mr-3 shrink-0"></span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-stone-600">
                      {String(productIngredients)}
                    </p>
                  );
                })()}
              </AccordionItem>

              <AccordionItem
                title={t.usage}
                isOpen={openSection === "usage"}
                onClick={() => toggleSection("usage")}
                icon={<Wind size={20} />}
              >
                {(() => {
                  // Parse how to use: handle both array and numbered string format
                  let usageList: string[] = [];

                  if (Array.isArray(productHowToUse)) {
                    usageList = productHowToUse;
                  } else if (typeof productHowToUse === "string") {
                    // Split by number pattern (e.g., "1. Step 2. Step" -> ["Step", "Step"])
                    usageList = productHowToUse
                      .split(/\d+\.\s*/)
                      .map((item) => item.trim())
                      .filter((item) => item.length > 0);
                  }

                  return usageList.length > 0 ? (
                    <ul className="grid gap-2 pl-2">
                      {usageList.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-stone-600 text-sm  font-medium"
                        >
                          <span className="w-1 h-1 bg-emerald-300 rounded-full mr-3 shrink-0"></span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-stone-600">{String(productHowToUse)}</p>
                  );
                })()}
              </AccordionItem>

              {productCaution && (
                <AccordionItem
                  title={t.caution || "Caution"}
                  isOpen={openSection === "caution"}
                  onClick={() => toggleSection("caution")}
                  icon={<AlertCircle size={20} />}
                >
                  {(() => {
                    // Parse caution: handle both array and numbered string format
                    let cautionList: string[] = [];

                    if (Array.isArray(productCaution)) {
                      cautionList = productCaution;
                    } else if (typeof productCaution === "string") {
                      // Split by number pattern (e.g., "1. Item 2. Item" -> ["Item", "Item"])
                      cautionList = productCaution
                        .split(/\d+\.\s*/)
                        .map((item) => item.trim())
                        .filter((item) => item.length > 0);
                    }

                    return cautionList.length > 0 ? (
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <ul className="grid gap-2 pl-2">
                          {cautionList.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-amber-900/80 text-sm  font-medium"
                            >
                              <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-900/80 text-sm leading-relaxed">
                        <p>{String(productCaution)}</p>
                      </div>
                    );
                  })()}
                </AccordionItem>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={() => {
            setIsZoomOpen(false);
            setZoomLevel(1);
          }}
        >
          {/* Controls Container */}
          <div
            className="absolute top-6 right-6 flex gap-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10">
              <button
                onClick={handleZoomOut}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-30"
                disabled={zoomLevel <= 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button
                onClick={handleZoomIn}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-30"
                disabled={zoomLevel >= 3}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setIsZoomOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-colors border border-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Modal Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 md:left-8 z-50 bg-white/10 hover:bg-white/20 text-white p-2 md:p-4 rounded-full backdrop-blur transition-all hover:scale-110"
              >
                <ArrowRight className="rotate-180" size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 md:right-8 z-50 bg-white/10 hover:bg-white/20 text-white p-2 md:p-4 rounded-full backdrop-blur transition-all hover:scale-110"
              >
                <ArrowRight size={24} />
              </button>
            </>
          )}

          <div
            className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Zoomed Product"
              className="max-w-full max-h-full object-contain transition-transform duration-300 drop-shadow-2xl"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
