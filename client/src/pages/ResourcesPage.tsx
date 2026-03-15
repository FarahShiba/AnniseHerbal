import React from "react";

import Button from "../components/Button";
import SEO from "../components/SEO";
import type { TranslationData } from "../data/data";

import Brosure1 from "../assets/Brosure1.jpeg";
import Brosure2 from "../assets/Brosure2.jpeg";

interface ResourcesPageProps {
  t: TranslationData;
  navigateTo: (page: string) => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ t, navigateTo }) => {
  const handleDownloadBrochures = () => {
    // Helper to trigger download
    const downloadFile = (url: string, filename: string) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Download first brochure
    downloadFile(Brosure1, "AnniseHerbal_Brosure1.jpeg");

    // Download second brochure after a slight delay to prevent browser blocking
    setTimeout(() => {
      downloadFile(Brosure2, "AnniseHerbal_Brosure2.jpeg");
    }, 500);
  };

  return (
    <div className="animate-fade-in pt-28 md:pt-48 pb-24 bg-white min-h-screen">
      <SEO 
        title="Resources & Education | Annise Herbal"
        description="Learn about the safety, science, and correct usage of essential oils with Annise Herbal's educational resources and brochures."
        canonical="https://anniseherbal.com/resources"
      />
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
            <Button variant="secondary" onClick={handleDownloadBrochures}>
              {t.resources.btn_download}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
