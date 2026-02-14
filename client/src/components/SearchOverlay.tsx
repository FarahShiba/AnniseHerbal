import React, { useState } from "react";
import { X, Search } from "lucide-react";
import type { Product } from "../types";
import { products } from "../data/data";

import type { TranslationData } from "../data/data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  setProduct: (product: Product) => void;
  t: TranslationData["search"];
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  setProduct,
  t,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredProducts = products.filter((product) => {
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.shortDesc.toLowerCase().includes(q) ||
      product.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const handleProductClick = (product: Product) => {
    setProduct(product);
    onClose();
    setQuery("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-100 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[70vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center gap-4">
            <Search className="text-stone-400" size={24} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder || "Cari produk..."}
              className="flex-1 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="text-stone-600 hover:text-stone-900"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(70vh-100px)]">
          {query === "" ? (
            <p className="text-center text-stone-400 py-8">{t.placeholder}</p>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 rounded-lg transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-500">
                      Rp {product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-400 py-8">
              {t.no_result || "Produk tidak ditemukan"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
