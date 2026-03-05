import {ShippingMethod} from '../types/orders';

/**
 * Shipping cost configuration
 * These are fixed prices shown to customers
 * Behind the scenes, you can optimize courier selection
 */

const SHIPPING_COSTS = {
  standard: 25000, // 2-4 days delivery
  express: 40000,  // 1-2 days delivery
} as const;


const SHIPPING_ESTIMATES = {
  standard: "2-4 Days",
  express: "1-2 Days",
} as const;


/**
 * Get shipping cost for a method
 */
export const getShippingCost = (method: ShippingMethod): number => {
  return SHIPPING_COSTS[method];
};

/**
 * Get shipping estimate for a method
 */
export const getShippingEstimate = (method: ShippingMethod): string => {
  return SHIPPING_ESTIMATES[method];
};


