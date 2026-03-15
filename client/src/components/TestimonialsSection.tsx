import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// 10 Real-style Testimonials (Tokopedia Vibe)
const testimonials = [
  {
    name: "Indriani",
    initial: "I",
    text: "Respon cepat, packing rapih, aman, dan fluxent sudah jadi bagian dari persediaan aromatherapy yg harus ada di rumah",
    product: "Fluxent Essential Oil",
    rating: 5,
    date: "2 hari lalu",
  },
  {
    name: "Bharana",
    initial: "B",
    text: "Penyelamat pasca operasi! Bekas luka memudar dan jaringan parut lebih halus. Sangat recommended untuk recovery.",
    product: "HemoClear Essential Oil",
    rating: 5,
    date: "1 minggu lalu",
  },
  {
    name: "Farida",
    initial: "F",
    text: "Pengiriman mantap, effect nya sangat bermanfaat 👍 Wanginya juga menenangkan, tidak menyengat.",
    product: "HiRooF Essential Oil",
    rating: 5,
    date: "2 minggu lalu",
  },
  {
    name: "Gunawan",
    initial: "G",
    text: "Paling nyari essential oil yang responnya cepat, seller ramah, dan pastinya bermanfaat. Sesuai dengan deskripsi, mantab!",
    product: "Max Pain Relief Oil",
    rating: 5,
    date: "3 minggu lalu",
  },
  {
    name: "Maya P.",
    initial: "M",
    text: "Produk Kids Series aman untuk anak-anak. Sangat membantu saat anak batuk pilek, tidurnya jadi lebih nyenyak.",
    product: "Fluxent Kids Oil",
    rating: 5,
    date: "1 bulan lalu",
  },
  {
    name: "Dewi S.",
    initial: "D",
    text: "Pelayanan ramah dan produk berkualitas. Pengiriman cepat dan kemasan rapi. Akan repeat order lagi.",
    product: "Skincare Oil",
    rating: 5,
    date: "1 bulan lalu",
  },
  {
    name: "Rina A.",
    initial: "R",
    text: "Suka banget sama wanginya! Bikin rileks seharian. Botolnya juga travel friendly, gampang dibawa kemana-mana.",
    product: "Stress Relief Oil",
    rating: 5,
    date: "2 bulan lalu",
  },
  {
    name: "Budi Santoso",
    initial: "B",
    text: "Kualitas bintang lima harga kaki lima. Efektif banget buat pegal-pegal habis olahraga.",
    product: "Muscle Ease Oil",
    rating: 5,
    date: "2 bulan lalu",
  },
  {
    name: "Siti Nurhaliza",
    initial: "S",
    text: "Cocok banget buat kulit sensitif aku. Ga bikin iritasi sama sekali. Thank you Annise Herbal!",
    product: "Calming Skin Oil",
    rating: 5,
    date: "3 bulan lalu",
  },
  {
    name: "Aditya P.",
    initial: "A",
    text: "Barang original, segel utuh. Expired date masih lama. Seller fast respon banget. Top markotop!",
    product: "Digestion Support",
    rating: 5,
    date: "3 bulan lalu",
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextTestimonials = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= testimonials.length ? 0 : prev + 1,
    );
  }, [itemsPerPage]);

  const prevTestimonials = React.useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - itemsPerPage : prev - 1,
    );
  }, [itemsPerPage]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonials();
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [nextTestimonials]);

  const visibleTestimonials = [];
  for (let i = 0; i < itemsPerPage; i++) {
    visibleTestimonials.push(
      testimonials[(currentIndex + i) % testimonials.length],
    );
  }

  return (
    <section className="py-16 bg-[#fafaf9] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-left mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-50 rounded-full mb-3">
            <Star
              size={16}
              className="text-emerald-600 fill-emerald-600 mr-2"
            />
            <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
              Trusted by Thousands
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-emerald-950 mb-4">
            Kata Mereka Tentang Kami
          </h2>
          <p className="text-stone-500 max-w-2xl">
            Ulasan asli dari pelanggan setia kami di berbagai marketplace
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons - Absolute positioning nicely integrated */}
          <button
            onClick={prevTestimonials}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-400 hover:text-emerald-700 hover:scale-110 transition-all border border-stone-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonials}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-400 hover:text-emerald-700 hover:scale-110 transition-all border border-stone-100"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Grid/Flex */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="bg-white p-8 rounded-3xl border border-stone-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-emerald-100 transition-all duration-300 flex flex-col h-full relative group animate-fade-in"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute top-6 right-6 text-emerald-50 group-hover:text-emerald-100 transition-colors">
                  <Quote size={40} className="fill-current" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-stone-200 text-stone-200"}`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-stone-600 mb-8 leading-relaxed text-[15px] grow font-medium relative z-10">
                  "{testimonial.text}"
                </p>

                {/* User Info & Product */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-stone-50">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 font-serif font-bold">
                    {testimonial.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-stone-900 text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 truncate">
                      {testimonial.product}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex % testimonials.length
                    ? "w-8 bg-emerald-600"
                    : "w-2 bg-stone-200 hover:bg-stone-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Marketplace Links - Responsive & Modern */}
        <div className="mt-14 flex justify-center px-4 w-full">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5 bg-white p-4 md:p-2.5 md:pr-7 rounded-3xl md:rounded-full border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 w-full sm:w-auto">
            <span className="md:pl-5 text-sm font-bold text-stone-500 uppercase tracking-widest whitespace-nowrap text-center">
              Available on:
            </span>
            <div className="w-16 h-px md:w-px md:h-6 bg-stone-200"></div>
            <div className="flex flex-row justify-center gap-2 sm:gap-4 w-full sm:w-auto">
              <a
                href="https://www.tokopedia.com/anniseherbal1?entrance_name=search_suggestion_store&source=universe&st=product"
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full bg-[#42B549]/10 text-[#42B549] hover:bg-[#42B549] hover:text-white transition-all duration-300 text-xs sm:text-sm font-bold group hover:-translate-y-0.5"
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-current shrink-0"></div>
                Tokopedia
              </a>
              <a
                href="https://shopee.co.id/anniseherbal"
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full bg-[#EE4D2D]/10 text-[#EE4D2D] hover:bg-[#EE4D2D] hover:text-white transition-all duration-300 text-xs sm:text-sm font-bold group hover:-translate-y-0.5"
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-current shrink-0"></div>
                Shopee
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
