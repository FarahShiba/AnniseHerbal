import React from "react";
import { ShieldCheck } from "lucide-react";
import type { TranslationData } from "../data/data";
import PhotoBunda from "../assets/PhotoBunda.jpg";

interface StoryPageProps {
  t: TranslationData;
}

const StoryPage: React.FC<StoryPageProps> = ({ t }) => (
  <div className="animate-fade-in pt-48 pb-24 bg-stone-50 min-h-screen">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-4">
          {t.story.title}
        </h1>
        <p className="text-stone-600">{t.story.sub}</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm mb-12">
        <h2 className="text-3xl font-serif text-emerald-950 mb-6">
          {t.story.about_title}
        </h2>
        <p className="text-stone-600 mb-6 leading-relaxed">
          {t.story.about_text1}
        </p>
        <p className="text-stone-600 mb-6 leading-relaxed">
          {t.story.about_text2}
        </p>

        <div className="my-12 border-t border-b border-stone-100 py-8">
          <h3 className="text-2xl font-serif text-emerald-950 mb-6 text-center">
            {t.story.commitment_title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.story.commitments.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <ShieldCheck
                  className="text-emerald-500 mr-3 shrink-0"
                  size={20}
                />
                <span className="text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-serif text-emerald-950 mb-6">
          {t.story.founder_title}
        </h3>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 shrink-0">
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-md">
              <img
                src={PhotoBunda}
                alt="Manistri Tambunan - Founder Annise Herbal"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-900/40 to-transparent"></div>
            </div>
          </div>
          <div>
            <p className="font-bold text-lg text-emerald-900 mb-2">
              Manistri Tambunan
            </p>
            <p className="text-stone-500 text-sm mb-4">
              CEO Annise Herbal & Certified Practitioner
            </p>
            <p className="text-stone-600 mb-4">
              Memiliki latar belakang pendidikan dan sertifikasi resmi di bidang
              aromatherapy, pengobatan tradisional, dan terapi komplementer,
              baik di Indonesia maupun internasional.
            </p>

            <div className="bg-stone-50 p-6 rounded-xl">
              <h4 className="font-bold text-sm uppercase tracking-wider text-emerald-800 mb-4">
                {t.story.cert_title}
              </h4>
              <ul className="space-y-3 text-sm text-stone-600">
                <li>
                  • Cert. IV Remedial Therapies (Aromatherapy) - Melbourne
                  College of Natural Medicine
                </li>
                <li>• Cert. Masterclass of Safety Essential Oil - UK</li>
                <li>• Cert. Chemistry of Essential Oil - UK</li>
                <li>
                  • Cert. of Chinese Herbal Medicine - Cathay Herbal, Australia
                </li>
                <li>
                  • Dan berbagai sertifikasi akupuntur & pijat tradisional.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StoryPage;
