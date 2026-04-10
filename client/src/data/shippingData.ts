/**
 * Frontend shipping data — fetches live rates from backend (Biteship).
 * No hardcoded zone tables; pricing is always real-time.
 */
import { apiRequest } from "../utils/api";
import type { ShippingOption } from "../types";

/**
 * Fetches live shipping options from backend for the given destination
 * postal code and cart items.  Returns [] if postalCode is incomplete.
 */
export async function getShippingOptions(
  postalCode: string,
  items: { id: string | number; sizeName?: string; qty: number }[],
): Promise<ShippingOption[]> {
  if (!postalCode || !/^\d{5}$/.test(postalCode)) return [];

  const itemsParam = encodeURIComponent(
    JSON.stringify(
      items.map((i) => ({
        productId: String(i.id),
        sizeName:  i.sizeName ?? "100ml",
        quantity:  i.qty,
      })),
    ),
  );

  const result = await apiRequest<{ rates: ShippingOption[] }>(
    `/shipping/rates?postalCode=${postalCode}&items=${itemsParam}`,
  );

  // apiRequest returns raw JSON — backend sends { success, rates } directly
  const raw = result as unknown as { success: boolean; rates: ShippingOption[] };
  return raw.rates ?? [];
}
