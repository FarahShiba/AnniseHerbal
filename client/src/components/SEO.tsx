import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  name?: string;
  type?: string;
  canonical?: string;
  image?: string;
  schemaData?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Discover premium, 100% pure essential oils for aromatherapy, health, and wellness. Annise Herbal brings nature's best remedies to Indonesia.", 
  name = "Annise Herbal", 
  type = "website",
  canonical,
  image = "https://anniseherbal.com/logo.png",
  schemaData
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data / JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {schemaData}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
