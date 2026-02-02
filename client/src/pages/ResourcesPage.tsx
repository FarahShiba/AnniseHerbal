import React from "react";

import Button from "../components/Button";
import type { TranslationData } from "../data/data";

interface ResourcesPageProps {
  t: TranslationData;
  navigateTo: (page: string) => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ t, navigateTo }) => (
  <div className="animate-fade-in pt-48 pb-24 bg-white min-h-screen">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-4">
          {t.resources.title}
        </h1>
        <p className="text-stone-600">{t.resources.sub}</p>
      </div>

      <div className="space-y-8">
        <div className="border border-stone-200 rounded-2xl p-8 hover:border-emerald-500 transition-colors">
          <h3 className="text-2xl font-serif text-emerald-950 mb-3">
            {t.resources.safety_title}
          </h3>
          <p className="text-stone-600 mb-4">{t.resources.safety_desc}</p>
          <button
            onClick={() => navigateTo("resources-safety")}
            className="text-emerald-700 font-medium hover:underline"
          >
            {t.resources.btn_read} →
          </button>
        </div>

        <div className="border border-stone-200 rounded-2xl p-8 hover:border-emerald-500 transition-colors">
          <h3 className="text-2xl font-serif text-emerald-950 mb-3">
            {t.resources.science_title}
          </h3>
          <p className="text-stone-600 mb-4">{t.resources.science_desc}</p>
          <button
            onClick={() => navigateTo("resources-science")}
            className="text-emerald-700 font-medium hover:underline"
          >
            {t.resources.btn_read} →
          </button>
        </div>

        <div className="bg-emerald-900 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-2">
              {t.resources.download_title}
            </h3>
            <p className="text-emerald-200">{t.resources.download_desc}</p>
          </div>
          <Button variant="secondary">{t.resources.btn_download}</Button>
        </div>
      </div>
    </div>
  </div>
);

export default ResourcesPage;
