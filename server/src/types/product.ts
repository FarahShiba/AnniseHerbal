export interface Product {
  id: string;
  name: string;
  name_en: string;
  category: string;
  price: number;
  shortDesc: string;
  shortDesc_en: string;
  description: string;
  description_en: string;
  benefits: string[];
  benefits_en: string[];
  ingredients: string;
  ingredients_en: string;
  howToUse: string[];
  howToUse_en: string[];
  imageColor: string;
  image: string;
  images?: string[];
  tags: string[];
  promotionalTag?: string;
  promotionalTag_en?: string;
  createdAt?: Date;
  updatedAt?: Date;
}