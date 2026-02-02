import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import heros1 from "../assets/heros1.jpg";
import heros2 from "../assets/heros2.jpg";
import heros3 from "../assets/heros3.jpg";

interface HeroSliderProps {
  navigateTo: (page: string) => void;
  t: {
    s1_title: string;
    s1_sub: string;
    s1_desc: string;
    s1_btn: string;
    s2_title: string;
    s2_sub: string;
    s2_desc: string;
    s2_btn: string;
    s3_title: string;
    s3_sub: string;
    s3_desc: string;
    s3_btn: string;
  };
}

const HeroSlider: React.FC<HeroSliderProps> = ({ navigateTo, t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: t.s1_title,
      subtitle: t.s1_sub,
      desc: t.s1_desc,
      bgClass: "bg-emerald-50",
      accentColor: "text-emerald-700",
      buttonText: t.s1_btn,
      target: "shop",
      image: heros1,
      patternColor: "text-emerald-100",
    },
    {
      id: 2,
      title: t.s2_title,
      subtitle: t.s2_sub,
      desc: t.s2_desc,
      bgClass: "bg-orange-50",
      accentColor: "text-orange-700",
      buttonText: t.s2_btn,
      target: "shop",
      image: heros2,
      patternColor: "text-orange-100",
    },
    {
      id: 3,
      title: t.s3_title,
      subtitle: t.s3_sub,
      desc: t.s3_desc,
      bgClass: "bg-purple-50",
      accentColor: "text-purple-700",
      buttonText: t.s3_btn,
      target: "shop",
      image: heros3,
      patternColor: "text-purple-100",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[85vh] overflow-hidden bg-white">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"} ${slide.bgClass} flex items-center`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute top-0 right-0 w-2/3 h-full rounded-l-[15rem] opacity-60 translate-x-20 ${slide.bgClass === "bg-emerald-50" ? "bg-emerald-100/50" : slide.bgClass === "bg-orange-50" ? "bg-orange-100/50" : "bg-purple-100/50"}`}
            ></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white opacity-40 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center pt-32">
            <div className="md:w-1/2 pt-12 md:pt-0">
              <div
                className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-white/80 backdrop-blur-sm shadow-sm ${slide.accentColor}`}
              >
                {slide.subtitle}
              </div>
              <h1
                className={`text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-6 animate-fade-in-up`}
              >
                {slide.title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      i === 1 || i === 2 ? `italic ${slide.accentColor}` : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-stone-700 font-medium mb-10 leading-relaxed max-w-lg animate-fade-in-up delay-100">
                {slide.desc}
              </p>
              <div className="flex gap-4 animate-fade-in-up delay-200">
                <button
                  onClick={() => navigateTo(slide.target)}
                  className="px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 text-sm tracking-wide flex items-center justify-center gap-2 bg-emerald-900 text-white hover:bg-emerald-800 shadow-lg hover:shadow-xl"
                >
                  {slide.buttonText} <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 h-[400px] md:h-[600px] relative hidden md:flex items-center justify-center">
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div
                  className={`relative w-[350px] h-[450px] md:w-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl -rotate-6 transform hover:rotate-0 transition-transform duration-700 border-8 border-white/40`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${slide.bgClass === "bg-emerald-50" ? "from-emerald-900/20" : slide.bgClass === "bg-orange-50" ? "from-orange-900/20" : "from-purple-900/20"} to-transparent`}
                  ></div>
                </div>

                {/* Decorative floating elements */}
                <div
                  className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full ${slide.bgClass === "bg-emerald-50" ? "bg-emerald-200" : slide.bgClass === "bg-orange-50" ? "bg-orange-200" : "bg-purple-200"} blur-2xl opacity-60 animate-blob`}
                ></div>
                <div
                  className={`absolute -top-8 -left-8 w-32 h-32 rounded-full ${slide.bgClass === "bg-emerald-50" ? "bg-teal-200" : slide.bgClass === "bg-orange-50" ? "bg-amber-200" : "bg-violet-200"} blur-3xl opacity-60 animate-blob animation-delay-2000`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-0 w-full z-30">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-emerald-900" : "w-2 bg-emerald-900/20 hover:bg-emerald-900/40"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-emerald-900/10 hover:bg-white hover:shadow-lg transition-all text-emerald-900"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-emerald-900/10 hover:bg-white hover:shadow-lg transition-all text-emerald-900"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
