import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "../types";
import type { TranslationData } from "../data/data";
import { getTranslatedProducts } from "../utils/productHelpers";

interface ShopPageProps {
  navigateTo: (page: string) => void;
  setProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  t: TranslationData;
  lang: "id" | "en";
}

const ShopPage: React.FC<ShopPageProps> = ({
  navigateTo,
  setProduct,
  addToCart,
  t,
  lang,
}) => {
  const products = getTranslatedProducts(lang);
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "Pain Relief",
    "Respiratory",
    "Digestion",
    "Kids",
    "Skincare",
  ];
  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="animate-fade-in pt-48 pb-24 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-4">
            {t.shop.title}
          </h1>
          <p className="text-stone-600">{t.shop.sub}</p>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setProduct(product);
                navigateTo("product");
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="relative h-72 bg-linear-to-br from-stone-50 to-stone-100 overflow-hidden">
                {/* Actual Product Image - Reduced padding for larger, more visible product */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-white/40 via-transparent to-transparent"></div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                {/* View Detail Button - appears on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProduct(product);
                    navigateTo("product");
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-emerald-800"
                >
                  {t.shop.detail}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-serif text-lg md:text-xl text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div>
                    <div className="text-xs text-stone-400 mb-0.5">Price</div>
                    <span className="font-bold text-lg text-emerald-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 hover:scale-110 transition-all shadow-lg hover:shadow-xl"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
