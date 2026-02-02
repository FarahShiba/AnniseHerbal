import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import type { CartItem } from "../types";
import type { TranslationData } from "../data/data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, newQty: number) => void;
  onCheckout: () => void;
  onStartShopping?: () => void;
  t: TranslationData["cart"];
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onUpdateQty,
  onCheckout,
  onStartShopping,
  t,
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-60 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-white z-70 shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-medium text-emerald-950">
                {t?.title || "Keranjang Belanja"}
              </h2>
              <p className="text-xs text-stone-500">{cartItems.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#fafaf9]">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-300">
                <ShoppingBag size={48} />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-2">
                {t?.empty || "Keranjang Anda kosong"}
              </h3>
              <p className="text-stone-500 max-w-xs mx-auto mb-8">
                Sepertinya Anda belum menambahkan produk apapun. Yuk mulai
                belanja!
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onStartShopping) onStartShopping();
                }}
                className="px-8 py-3 bg-white border border-stone-200 text-emerald-800 rounded-full font-medium hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 hover:border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-medium text-stone-900 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-stone-300 hover:text-red-500 p-1 -mr-2 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-emerald-700">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1 border border-stone-100">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-stone-600 hover:text-emerald-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          disabled={item.qty <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm font-medium text-stone-700">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-stone-600 hover:text-emerald-700 shadow-sm transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-sm font-medium text-stone-900">
                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Subtotal</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xl font-serif font-bold text-emerald-950">
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className="group w-full bg-emerald-800 text-white py-4 rounded-xl font-medium hover:bg-emerald-900 transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-2"
            >
              <span>{t.checkout || "Checkout Securely"}</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Guaranteed Safe & Secure Checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
