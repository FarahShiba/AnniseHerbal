import React, { useEffect } from "react";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { educationData } from "../data/educationData";
import { Droplets } from "lucide-react";

interface EducationDetailPageProps {
  type: "safety" | "science";
  navigateTo: (page: string) => void;
  lang: "id" | "en";
}

const EducationDetailPage: React.FC<EducationDetailPageProps> = ({
  type,
  navigateTo,
  lang,
}) => {
  const data = educationData[lang][type];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in pt-24 pb-24 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumb / Back Button */}
        <button
          onClick={() => navigateTo("resources")}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-800 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          {lang === "id" ? "Kembali ke Edukasi" : "Back to Resources"}
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 mb-12 relative overflow-hidden">
          {/* Decorative Background Icon */}
          <div className="absolute -right-10 -top-10 text-emerald-50 opacity-50">
            {type === "safety" ? (
              <ShieldCheck size={300} strokeWidth={0.5} />
            ) : (
              <Droplets size={300} strokeWidth={0.5} />
            )}
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              {type === "safety"
                ? lang === "id"
                  ? "Panduan"
                  : "Guide"
                : lang === "id"
                  ? "Sains"
                  : "Science"}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-emerald-950 mb-6 leading-tight">
              {data.title}
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-emerald-500 pl-6">
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-12">
          {data.content.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-2xl font-serif text-emerald-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-sm font-bold font-sans">
                  {idx + 1}
                </span>
                {section.heading}
              </h2>
              <p className="text-stone-600 leading-relaxed text-lg mb-6">
                {section.text}
              </p>
              {section.list && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.list.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-stone-50 p-4 rounded-xl"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-emerald-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-serif mb-4">
              {lang === "id"
                ? "Siap untuk memulai perjalanan aromatherapy Anda?"
                : "Ready to start your aromatherapy journey?"}
            </h3>
            <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
              {lang === "id"
                ? "Temukan essential oil murni berkualitas tinggi untuk kesehatan keluarga Anda."
                : "Discover high-quality pure essential oils for your family's health."}
            </p>
            <button
              onClick={() => navigateTo("shop")}
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {lang === "id" ? "Belanja Sekarang" : "Shop Now"}
            </button>
          </div>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        </div>
      </div>
    </div>
  );
};

export default EducationDetailPage;
