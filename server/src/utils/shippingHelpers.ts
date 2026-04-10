import { OrderItemRequest } from '../types/orders';

// Product weight by size name — includes bottle + packaging (grams)
const SIZE_WEIGHT_GRAMS: Record<string, number> = {
  '10ml':  100,
  '15ml':  100,
  '100ml': 300,
};
const DEFAULT_WEIGHT_GRAMS = 200;

/** Returns total cart weight in kg, rounded UP to whole kg (min 1 kg). */
export function calculateCartWeightKg(items: OrderItemRequest[]): number {
  let totalGrams = 0;
  for (const item of items) {
    const gramsPerUnit = SIZE_WEIGHT_GRAMS[item.sizeName] ?? DEFAULT_WEIGHT_GRAMS;
    totalGrams += gramsPerUnit * item.quantity;
  }
  return Math.max(1, Math.ceil(totalGrams / 1000));
}
