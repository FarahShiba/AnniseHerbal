import type { Product } from "../types";
import { products as baseProducts } from "../data/data";
import { productTranslations } from "../data/productTranslations";

/**
 * Get products with translations applied for the current language
 */
export function getTranslatedProducts(lang: "id" | "en"): Product[] {
  const translations = productTranslations[lang];

  return baseProducts.map((product) => {
    const translation = translations[product.id as keyof typeof translations];

    if (!translation) {
      return product; // Fallback to original if translation not found
    }

    return {
      ...product,
      name: translation.name,
      category: translation.category,
      shortDesc: translation.shortDesc,
      description: translation.description,
      benefits: translation.benefits,
      usage: translation.usage,
    };
  });
}
