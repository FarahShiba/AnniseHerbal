import React from "react";

export interface Product {
  id: string | number;
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
  ingredients: string | string[];
  ingredients_en?: string | string[];
  usage?: string | string[];
  howToUse?: string | string[];
  howToUse_en?: string | string[];
  caution?: string | string[];
  caution_en?: string | string[];
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
  tier:        'economy' | 'standard' | 'express';
  label:       string;
  price:       number;
  duration:    string;
  notes?:      string;
  courier:     string;   // e.g. "JNE - Yakin Esok Sampai (YES)"
  courierCode: string;
  serviceCode: string;
}

export interface PaymentOption {
  id: string;
  name: string;
  icon: React.ElementType;
}
