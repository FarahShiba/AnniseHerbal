import React from "react";
import logoAnnise from "../assets/logoAnniseherbal.png";
import {
  Leaf,
  Award,
  ShieldCheck,
  Heart,
  Droplets,
  ShoppingBag,
  Wind,
  CloudFog,
} from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import TestimonialsSection from "../components/TestimonialsSection";
import SEO from "../components/SEO";
import type { Product } from "../types";
import type { TranslationData } from "../data/data";

interface HomePageProps {
  navigateTo: (page: string) => void;
  setProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  t: TranslationData;
  lang: "id" | "en";
  products: Product[];
  loading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  navigateTo,
  setProduct,
  addToCart,
  t,
  products,
  loading,
}) => {
  // const products = getTranslatedProducts(lang);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Annise Herbal",
    image: "https://anniseherbal.com/logo.png",
    url: "https://anniseherbal.com/",
    telephone: "+628159118754",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tangerang",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    description:
      "Discover premium, 100% pure essential oils for aromatherapy, health, and wellness. Annise Herbal brings nature's best remedies to Indonesia.",
  };

  return (
    <div className="animate-fade-in">
      <SEO
        title="Annise Herbal | Premium Essential Oils in Indonesia"
        description={t.hero.s1_sub}
        canonical="https://anniseherbal.com/"
        schemaData={JSON.stringify(localBusinessSchema)}
      />
      <HeroSlider navigateTo={navigateTo} t={t.hero} />
      <section className="py-20 bg-linear-to-b from-white to-stone-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Leaf,
                title: t.trust.t1,
                desc: t.trust.t1_desc,
                color: "emerald",
              },
              {
                icon: Award,
                title: t.trust.t2,
                desc: t.trust.t2_desc,
                color: "teal",
              },
              {
                icon: ShieldCheck,
                title: t.trust.t3,
                desc: t.trust.t3_desc,
                color: "emerald",
              },
              {
                icon: Heart,
                title: t.trust.t4,
                desc: t.trust.t4_desc,
                color: "teal",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-stone-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-base md:text-lg text-emerald-950 mb-2 font-medium">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-stone-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Seller Collection - Premium Essential Oil Brand Style */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle={t.section.best_seller_sub}>
            {t.section.best_seller}
          </SectionTitle>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
              <p className="mt-4 text-stone-600">Loading best sellers...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {products
                .filter((p) => p.isBestSeller)
                .slice(0, 4)
                .map((product) => (
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
          )}
          <div className="text-center mt-12">
            <Button variant="secondary" onClick={() => navigateTo("shop")}>
              {t.section.view_all}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="text-emerald-300 tracking-widest text-sm uppercase mb-2 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              {t.section.story_title}
            </h2>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
              {t.section.story_desc}
            </p>
            <div className="flex flex-col gap-2 mb-8 border-l-4 border-emerald-500 pl-6">
              <p className="font-medium text-xl">Manistri Tambunan</p>
              <p className="text-emerald-400 text-sm">
                Founder & Certified Aromatherapist
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-emerald-900 hover:bg-emerald-950 hover:text-white border-2 border-white"
              onClick={() => navigateTo("story")}
            >
              {t.section.read_story}
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 bg-linear-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center border-8 border-white/20 relative shadow-2xl">
              <img
                src={logoAnnise}
                alt="Annise Herbal Logo"
                className="w-64 h-auto object-contain hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white text-emerald-900 p-6 rounded-xl shadow-xl max-w-xs">
                <p className="font-serif text-lg mb-1">20+ Years</p>
                <p className="text-xs text-stone-500">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-linear-to-b from-white to-stone-50">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle={t.section.how_to_sub}>
            {t.section.how_to}
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Oles / Topikal",
                desc: "Oleskan pada area yang bermasalah atau titik nadi. Aman untuk kulit.",
                icon: Droplets,
                gradient: "from-emerald-400 to-teal-500",
                bgColor: "bg-emerald-50",
              },
              {
                title: "Inhalasi Langsung",
                desc: "Teteskan pada tisu atau telapak tangan, hirup perlahan untuk efek instan.",
                icon: Wind,
                gradient: "from-cyan-400 to-blue-500",
                bgColor: "bg-cyan-50",
              },
              {
                title: "Diffuser",
                desc: "Gunakan diffuser untuk membersihkan udara dan relaksasi ruangan.",
                icon: CloudFog,
                gradient: "from-violet-400 to-purple-500",
                bgColor: "bg-violet-50",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Icon container with animation */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 ${item.bgColor} rounded-2xl mx-auto flex items-center justify-center text-emerald-700 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <item.icon size={32} className="relative z-10" />
                  </div>

                  {/* Decorative circles */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-linear-to-br ${item.gradient} rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 group-hover:scale-150`}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h4 className="font-serif text-2xl mb-3 text-emerald-950 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Premium Consultation Section - Essential Oil Brand Style */}
      <section className="py-20 bg-linear-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-800">
                  Expert Support Available
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-serif text-emerald-950 leading-tight">
                {t.section.help}
              </h3>

              <p className="text-lg text-stone-600 leading-relaxed">
                Konsultasikan keluhan Anda atau keluarga Anda dengan tim
                aromatherapist bersertifikat kami. Dapatkan rekomendasi produk
                yang tepat untuk kebutuhan kesehatan Anda.
              </p>

              {/* Feature list */}
              <div className="space-y-3 pt-4">
                {[
                  { icon: "✓", text: "Konsultasi gratis dengan praktisi ahli" },
                  { icon: "✓", text: "Respon cepat via WhatsApp" },
                  { icon: "✓", text: "Rekomendasi produk yang tepat" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.icon}
                    </div>
                    <span className="text-stone-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() =>
                  window.open("https://wa.me/628159118754", "_blank")
                }
                className="group mt-6 px-8 py-4 text-lg"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>{t.section.chat}</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Button>
            </div>

            {/* Right side - Visual Card */}
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative leaf pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <Leaf size={120} className="text-emerald-600 rotate-45" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-emerald-950">
                        Chat Langsung
                      </h4>
                      <p className="text-sm text-stone-500">
                        Dengan Aromatherapist
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-linear-to-r from-transparent via-stone-200 to-transparent"></div>

                  {/* Info boxes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-700">
                        20+
                      </div>
                      <div className="text-xs text-stone-600 mt-1">
                        Years Experience
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-teal-700">
                        100%
                      </div>
                      <div className="text-xs text-stone-600 mt-1">
                        Natural Products
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-linear-to-br from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-xs font-medium">Available Now</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
