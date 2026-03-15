import React from "react";

export interface Product {
  id: string;
  name: string;
  name_en?: string;
  category: string;
  price: number;
  shortDesc: string;
  shortDesc_en?: string;
  description: string;
  description_en?: string;
  benefits: string[];
  benefits_en?: string[];
  ingredients: string;
  ingredients_en?: string;
  howToUse?: string[];
  howToUse_en?: string[];
  caution?: string;
  caution_en?: string;
  imageColor: string;
  image: string;
  images?: string[];
  tags: string[];
  sizeName?: string;
  isBestSeller?: boolean;        
  isBestSeller_en?: boolean;     
  createdAt?: unknown;
  updatedAt?: unknown;
}
export interface CartItem extends Product {
  qty: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  eta: string;
  icon: React.ElementType;
}

export interface PaymentOption {
  id: string;
  name: string;
  icon: React.ElementType;
}
