import { apiRequest } from "../utils/api";

export type ShippingTier = "economy" | "standard" | "express";

export interface CreateOrderPayload {
  customer: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    specialInstructions?: string;
  };
  items: { productId: string; category: string; quantity: number; sizeName: string }[];
  shipping: {
    tier: ShippingTier;
    courierUsed: string;
    courierServiceCode: string;
    shippingPrice: number;
  };
  paymentMethod: string;
  idempotencyKey: string;
  promoCode?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message?: string;
  data: {
    orderId: string;
    orderNumber: string;
    total: number;
    midtransToken: string;
    redirectUrl: string;
    status?: string;
  };
}

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<{ 
  orderId: string; 
  orderNumber: string; 
  total: number; 
  midtransToken: string;
  redirectUrl: string;
}> => {
  const response = await apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  
  // The backend returns data nested under 'data' property
  const typedResponse = response as CreateOrderResponse;
  if (!typedResponse.success || !typedResponse.data) {
    throw new Error(typedResponse.message || "Failed to create order");
  }
  
  return typedResponse.data;
};
