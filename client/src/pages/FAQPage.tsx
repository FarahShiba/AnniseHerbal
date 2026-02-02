import React, { useState, useMemo } from "react";
import { Search, Plus, Minus, MessageCircle, HelpCircle } from "lucide-react";
import type { TranslationData } from "../data/data";

interface FAQPageProps {
  t: TranslationData;
}

const FAQPage: React.FC<FAQPageProps> = ({ t }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = useMemo(() => {
    return [
      { id: "all", label: t.faq.categories.all },
      { id: "products", label: t.faq.categories.products },
      { id: "orders", label: t.faq.categories.orders },
      { id: "shipping", label: t.faq.categories.shipping },
      { id: "safety", label: t.faq.categories.safety },
    ];
  }, [t]);

  const filteredFAQs = useMemo(() => {
    let filtered = t.faq.items;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
      );
    }

    return filtered;
  }, [t.faq.items, activeCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-[#fafaf9]">
      {/* Hero Section */}
      <section className="relative px-6 mb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6 border border-emerald-200/50">
            <HelpCircle size={14} />
            {t.faq.ui.support_badge || "Support Center"}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-6 tracking-tight">
            {t.faq.title}
          </h1>
          <p className="text-stone-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.faq.sub}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faq.search_placeholder}
              className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl shadow-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-600 transition-colors"
              size={20}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar / Categories */}
          <div className="md:col-span-3">
            <div className="sticky top-32 space-y-1">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 px-3">
                {t.faq.ui.categories_title || "Categories"}
              </h3>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null); // Close accordions when changing category
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-900 text-white shadow-md shadow-emerald-900/10"
                      : "text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="md:col-span-9">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      openIndex === index
                        ? "border-emerald-500/30 shadow-lg shadow-emerald-900/5"
                        : "border-stone-200 hover:border-emerald-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span
                        className={`font-medium text-lg pr-8 transition-colors ${
                          openIndex === index
                            ? "text-emerald-900"
                            : "text-stone-700"
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          openIndex === index
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-stone-100 text-stone-500 group-hover:bg-emerald-50"
                        }`}
                      >
                        {openIndex === index ? (
                          <Minus size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </span>
                    </button>
                    <div
                      className={`transition-[max-height,opacity] duration-300 ease-in-out ${
                        openIndex === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6 text-stone-600 leading-relaxed border-t border-stone-100 pt-4 mt-2">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 border-dashed">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
                  <Search size={24} />
                </div>
                <p className="text-stone-500 font-medium">
                  {t.faq.ui.no_result || "No questions found matching"} "
                  {searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-bold underline"
                >
                  {t.faq.ui.clear_search || "Clear Search"}
                </button>
              </div>
            )}

            {/* Support CTA */}
            <div className="mt-16 bg-linear-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-4">
                  {t.faq.ui.cta_title || "Still have questions?"}
                </h3>
                <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
                  {t.faq.ui.cta_desc ||
                    "Can't find the answer you're looking for? Please chat with our friendly team."}
                </p>
                <a
                  href="https://wa.me/6281234567890" // Replace with actual number
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg shadow-black/10"
                >
                  <MessageCircle size={20} />
                  {t.faq.ui.cta_btn || "Chat on WhatsApp"}
                </a>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
