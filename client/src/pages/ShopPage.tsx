import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import SEO from "../components/SEO";
import type { Product } from "../types";
import type { TranslationData } from "../data/data";


interface ShopPageProps {
  products: Product[];
  loading: boolean;
  error: string;
  setProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  t: TranslationData;
  lang: "id" | "en";
}

const ShopPage: React.FC<ShopPageProps> = ({
  products,
  loading,
  error,
  setProduct,
  addToCart,
  t,
}) => {
  // const products = getTranslatedProducts(lang);

  const [filter, setFilter] = useState("All");
  // Get unique categories from products (after they load)
  const apiCategories = Array.from(new Set(products.map((p) => p.category)));
  const categories = ["All", ...apiCategories];

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="animate-fade-in pt-28 md:pt-48 pb-24 min-h-screen bg-stone-50">
      <SEO
        title="Shop Annise Herbal | Buy Pure Essential Oils Online"
        description="Browse our collection of premium essential oils including Nozze Oil, Fluxent, and more. Nature's best remedies for your health and wellness."
        canonical="https://anniseherbal.com/shop"
      />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-4">
            {t.shop.title}
          </h1>
          <p className="text-stone-600">{t.shop.sub}</p>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
            <p className="mt-4 text-stone-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-emerald-800 text-white rounded-full hover:bg-emerald-900"
            >
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === cat
                      ? "bg-emerald-800 text-white shadow-lg scale-105"
                      : "bg-white text-stone-500 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200 hover:border-emerald-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setProduct(product)}
                  className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 hover:border-emerald-300 flex flex-col hover:shadow-2xl transition-all duration-500 cursor-pointer h-full"
                >
                  {/* Product Image Container */}
                  <div className="relative h-48 md:h-64 lg:h-72 bg-linear-to-br from-stone-50 to-stone-100 overflow-hidden shrink-0">
                    {/* Actual Product Image - Reduced padding for larger, more visible product */}
                    <div className="absolute inset-0 flex items-center justify-center p-0 lg:p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain scale-[1.7] md:scale-[2.0] lg:scale-[1.4] group-hover:scale-[1.9] md:group-hover:scale-[2.2] lg:group-hover:scale-[1.6] transition-transform duration-700"
                      />
                    </div>

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-white/40 via-transparent to-transparent"></div>

                    {/* Category badge */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 py-1 md:px-3 md:py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-[10px] md:text-xs font-medium text-emerald-700 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>

                    {/* View Detail Button - appears on hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setProduct(product);
                      }}
                      className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-[10px] md:text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-emerald-800 whitespace-nowrap"
                    >
                      {t.shop.detail}
                    </button>
                  </div>
                  {/* Product Info */}
                  <div className="p-3 md:p-4 lg:p-6 flex flex-col grow">
                    <h3 className="font-serif text-sm md:text-lg lg:text-xl text-emerald-950 mb-1 lg:mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-stone-500 text-[10px] md:text-xs lg:text-sm mb-2 md:mb-4 line-clamp-2 leading-relaxed grow">
                      {product.shortDesc}
                    </p>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-stone-100 mt-auto">
                      <div>
                        <div className="text-[9px] md:text-xs text-stone-400 mb-0.5">
                          Price
                        </div>
                        <span className="font-bold text-xs md:text-base lg:text-lg text-emerald-900">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="p-1.5 md:p-2 lg:p-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 hover:scale-110 transition-all shadow-lg hover:shadow-xl"
                      >
                        <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
