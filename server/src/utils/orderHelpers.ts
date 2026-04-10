import { OrderItem, PromoCodeUsageType, PricingBreakdownType, Order, CreateOrderRequest, PaymentMethod } from '../types/orders';
import { validateOrderRequest } from './orderValidation';
import { fetchAndBuildOrderItems } from './productHelpers';
import { calculateCartWeightKg } from './shippingHelpers';

/**
 * Generate unique order ID for database
 * Format: order_TIMESTAMP_RANDOM
 * Example: order_1709461234567_a8f3k2
 */
export const generateUniqueOrderId = (): string => {
    const timestamp = Date.now();

    // generate random string (similar to base-36 but only letters and numbers)
    const randomString = Math.random().toString(36).substring(2, 8);

    return `order_${timestamp}_${randomString}`;

}

/**
 * Generate human-readable order number
 * Format: ORD-YYYY-NNNN
 * Example: ORD-2026-0001
 * 
 * @param orderCount - Total orders created this year (from counter)
 */
export const generateOrderNumber = (orderCount: number): string => {
    const year = new Date().getFullYear(); // get a current year

    // Increment order count and pad with zeros to 4 digits
    const orderSequence = (orderCount + 1).toString().padStart(4, '0');

    return `ORD-${year}-${orderSequence}`;
}


/** 
 * 
 * calculate subtotal from order items 
 * @param items - Array of order items with price and quantity
 * @return subtotal in IDR
 */
export const calculateSubtotal = (items: OrderItem[]): number => {
    let total = 0;
    for (const item of items) {
        total += item.pricePerUnit * item.quantity;
    }
    return total;
}


/**
 * Calculate discount amount based on promo code
 * @param subtotal - Order subtotal
 * @param discountType - "percentage" or "fixed"
 * @param discountValue - The discount value (10 for 10%, or 50000 for Rp 50,000)
 * @param maxDiscount - Maximum discount amount (for percentage discounts)
 * @returns Discount amount in IDR
 */
export const calculateDiscount = (
    subtotal: number,
    discountType: 'percentage' | 'fixed',
    discountValue: number,
    maxDiscount?: number
): number => {
    let discount = 0;

    if (discountType === 'percentage') {
        discount = (subtotal * discountValue) / 100;
        if (maxDiscount !== undefined) {
            discount = Math.min(discount, maxDiscount);
        }
    } else if (discountType === 'fixed') {
        discount = discountValue;
    }

    return discount;
}



/**
 * Calculate final order total
 * @param subtotal - Order subtotal
 * @param shippingMethod - Shipping method chosen
 * @param discount - Discount amount (optional)
 * @returns Final total in IDR
 */
export const calculateOrderTotal = (
  subtotal: number,
  shippingCost: number,
  discount: number = 0
): number => {
  return subtotal - discount + shippingCost;
};




/**
 * Build complete pricing breakdown for order
 * @param items - Order items with prices
 * @param shippingMethod - Shipping method
 * @param promoDiscount - Optional promo discount info
 * @returns Complete pricing breakdown
 */
export const buildPricingBreakdown = (
  items: OrderItem[],
  shippingCost: number,
  promoDiscount?: {
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxDiscount?: number;
  }
): PricingBreakdownType => {
  const subtotal = calculateSubtotal(items);
  let discount = 0;
  if (promoDiscount) {
    discount = calculateDiscount(
      subtotal,
      promoDiscount.discountType,
      promoDiscount.discountValue,
      promoDiscount.maxDiscount
    );
  }
  const total = calculateOrderTotal(subtotal, shippingCost, discount);
  return { subtotal, discount, shippingCost, total };
};


/**
 * Build complete Order document ready to save to Firestore
 * Combines all validated data, fetched products, and calculated pricing
 * 
 * @param orderData - Validated order request
 * @param items - Fetched order items with real prices
 * @param normalizedPhone - Phone number normalized to +628xxx format
 * @param promoCodeData - Optional promo code data (if applied)
 * @returns Complete Order document
 */
export const buildOrderDocument = async (
  orderData: CreateOrderRequest,
  items: OrderItem[],
  normalizedPhone: string,
  promoCodeData?: {
    code: string;
    discountType:"percentage" | "fixed"; 
    discountValue: number;
    maxDiscount: number;
  }
) => {
  const shippingCost = orderData.shipping.shippingPrice;

  // Step 1: Calculate pricing breakdown
  const pricingBreakdown = buildPricingBreakdown(
    items,
    shippingCost,
    promoCodeData ? {
      discountType: promoCodeData.discountType,
      discountValue: promoCodeData.discountValue,
      maxDiscount: promoCodeData.maxDiscount
    } : undefined,
  );

  // Step 2: Build customer object
  const customer = {
    name: orderData.customer.name, 
    email: orderData.customer.email,
    phoneNumber: normalizedPhone,
    address: orderData.customer.address,
    city: orderData.customer.city,
    province: orderData.customer.province,
    postalCode: orderData.customer.postalCode,
    specialInstructions: orderData.customer.specialInstructions || null
  }

  // Step 3: Build shipping object from frontend data (live Biteship rates)
  const shipping = {
    tier: orderData.shipping.tier,
    courierUsed: orderData.shipping.courierUsed,
    courierServiceCode: orderData.shipping.courierServiceCode,
    weightKg: calculateCartWeightKg(orderData.items),
    cost: shippingCost,
    estimation: "Estimated arrival within 1-5 business days",
  };


  // Step 4: Build payment object
    const payment = {
      method: orderData.paymentMethod,
      status: "pending" as const,
      amount: pricingBreakdown.total,
      // optional fields 
    }
  
    let promoCode;
  // Step 5: Build promo code object (if exists)
    if(promoCodeData != null){
        promoCode = {
          code: promoCodeData.code,
          discountType: promoCodeData.discountType,
          discountValue: promoCodeData.discountValue,
          discountAmount: pricingBreakdown.discount
        };
    }else{
       promoCode = undefined
    }
  // Step 6: Set payment initial status values & Return complete order document
    return {
    customer,
    items,
    shipping,
    payment,
    pricing: pricingBreakdown,
    promoCode,
    status: "pending" as const,
    idempotencyKey: orderData.idempotencyKey
  };
};
   