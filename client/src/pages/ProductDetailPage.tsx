import React from "react";
import { ArrowRight, Star, Leaf, Wind } from "lucide-react";
import Button from "../components/Button";
import type { Product } from "../types";
import type { TranslationData } from "../data/data";

interface ProductDetailPageProps {
  product: Product | null;
  navigateTo: (page: string) => void;
  addToCart: (product: Product) => void;
  t: TranslationData["product"];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  navigateTo,
  addToCart,
  t,
}) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [isZoomOpen, setIsZoomOpen] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);

  // Initialize active image index or reset when product changes
  React.useEffect(() => {
    setActiveImageIndex(0);
    setZoomLevel(1);
  }, [product?.id]);

  if (!product) return <div className="pt-32 text-center">Loading...</div>;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const activeImage = images[activeImageIndex];

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

  return (
    <div className="animate-fade-in pt-48 pb-24 bg-white min-h-screen">
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
          <div className="lg:w-1/2">
            {/* Main Image Container */}
            <div
              className={`aspect-square rounded-3xl ${product.imageColor} flex items-center justify-center relative overflow-hidden group cursor-zoom-in border border-stone-100`}
              onClick={() => setIsZoomOpen(true)}
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105"
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

              <div className="absolute top-8 right-8">
                <span className="bg-white/80 backdrop-blur text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 mt-6 justify-center overflow-x-auto py-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                      idx === activeImageIndex
                        ? "border-emerald-600 shadow-md scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-serif text-emerald-950 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-emerald-700 font-medium mb-6">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="flex gap-4 mb-10">
              <Button onClick={() => addToCart(product)}>{t.add_cart}</Button>
              <Button
                variant="secondary"
                onClick={() => window.open("https://wa.me/", "_blank")}
              >
                {t.ask_wa}
              </Button>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-serif text-emerald-950 mb-3 flex items-center">
                  <Star size={18} className="mr-2 text-emerald-500" />{" "}
                  {t.benefits}
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-stone-600">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-3 shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-serif text-emerald-950 mb-3 flex items-center">
                    <Leaf size={18} className="mr-2 text-emerald-500" />{" "}
                    {t.composition}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-serif text-emerald-950 mb-3 flex items-center">
                    <Wind size={18} className="mr-2 text-emerald-500" />{" "}
                    {t.usage}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in"
          onClick={() => {
            setIsZoomOpen(false);
            setZoomLevel(1);
          }}
        >
          <div
            className="absolute top-4 right-4 flex gap-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleZoomOut}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-colors"
              disabled={zoomLevel <= 1}
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
            <button
              onClick={handleZoomIn}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-colors"
              disabled={zoomLevel >= 3}
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-colors"
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

          {/* Zoom Modal Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 md:left-8 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-colors hidden md:block"
              >
                <ArrowRight className="rotate-180" size={32} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 md:right-8 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-colors hidden md:block"
              >
                <ArrowRight size={32} />
              </button>
            </>
          )}

          <div
            className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
            /* Removed stopPropagation to allow clicking image/bg to close */
          >
            <img
              src={activeImage}
              alt="Zoomed Product"
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              /* Removed stopPropagation here too */
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
