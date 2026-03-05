import { OrderItem, PromoCodeUsageType } from '../types/orders';
import { ShippingMethod } from '../types/orders';
import { getShippingCost } from './shippingHelpers';
import { PricingBreakdownType } from '../types/orders';
import { Order, CreateOrderRequest, PaymentMethod } from '../types/orders';
import { validateOrderRequest } from './orderValidation';
import { fetchAndBuildOrderItems } from './productHelpers';

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
  shippingMethod: ShippingMethod,
  discount: number = 0
): number => {
  // Get shipping cost
  
  // Calculate: subtotal - discount + shipping
  const shippingCost = getShippingCost(shippingMethod);

  // Calculate: subtotal - discount + shipping
  const total = subtotal - discount + shippingCost;

  // Return total
  return total;
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
  shippingMethod: ShippingMethod,
  promoDiscount?: {
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxDiscount?: number;
  }
): PricingBreakdownType => {
  // Calculate subtotal
  const subtotal = calculateSubtotal(items);
  // Calculate discount (if promo provided)
  let discount = 0;
  if (promoDiscount) {
    discount = calculateDiscount(
      subtotal,
      promoDiscount.discountType,
      promoDiscount.discountValue,
      promoDiscount.maxDiscount
    );
  }

  // Get shipping cost
  const shippingCost = getShippingCost(shippingMethod);
  // Calculate total
  const total = calculateOrderTotal(subtotal, shippingMethod, discount);
  // Return pricing breakdown object
  return {
    subtotal,
    discount,
    shippingCost,
    total
  };
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
export const buildOrderDocument =  (
  validItems: validateOrderRequest, 
  fetchAndBuildOrderItems: fetchAndBuildOrderItems,
  promoCode?: PromoCodeUsageType,


  
)
   