import React from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  shortDesc: string;
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  imageColor: string;
  image: string;
  images?: string[];
  tags: string[];
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
