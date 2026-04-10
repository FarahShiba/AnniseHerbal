/**
 * Biteship API service — real-time shipping rates.
 * Origin: Tangerang, Banten (postal code from ORIGIN_POSTAL_CODE env var).
 * Endpoint: POST https://api.biteship.com/v1/rates/couriers
 */
import { selectBoxesForCart, calculateProductWeight } from '../config/boxSizes';


const BITESHIP_BASE = 'https://api.biteship.com';

// Couriers to query (major Indonesian parcel services)
const COURIERS = 'jne,sicepat,anteraja,jnt,tiki';

export interface ShippingRateOption {
  tier:        'economy' | 'standard' | 'express';
  label:       string;
  price:       number;
  duration:    string;
  notes?:      string;
  courier:     string;   // e.g. "JNE - Regular"
  courierCode: string;
  serviceCode: string;
}

interface BiteshipPricing {
  courier_name:         string;
  courier_code:         string;
  courier_service_name: string;
  courier_service_code: string;
  service_type:         string;
  notes:                string;
  price:                number;
  duration:             string;
}

function mapToTier(serviceType: string): 'economy' | 'standard' | 'express' | null {
  switch (serviceType.toLowerCase()) {
    case 'economy':  return 'economy';
    case 'standard': return 'standard';
    case 'express':
    case 'overnight': return 'express';
    default:          return null; // skip instant, same_day, etc.
  }
}

const TIER_LABEL: Record<string, string> = {
  economy:  'Ekonomi',
  standard: 'Standar',
  express:  'Ekspres',
};

/**
 * Fetch live shipping rates from Biteship for a given destination postal code
 * and list of items. Returns the cheapest option per tier (economy/standard/express).
 */
export async function getShippingRates(
  destinationPostalCode: string,
  items: { productId: string; sizeName: string; quantity: number }[],
): Promise<ShippingRateOption[]> {
  const originPostalCode = process.env.ORIGIN_POSTAL_CODE;
  if (!originPostalCode) throw new Error('ORIGIN_POSTAL_CODE not configured');

  const apiKey = process.env.BITESHIP_API;
  if (!apiKey) throw new Error('BITESHIP_API not configured');


  const selectedBoxes = selectBoxesForCart(items);
  const productWeight = calculateProductWeight(items);
  const allResponses: BiteshipPricing[] = [];

  // Call Biteship for each box separately
  for (const box of selectedBoxes) {
    const totalWeight = box.weightgram + productWeight;
    
    console.log(`📦 Box: ${box.id} | Dimensions: ${box.dimension.length}×${box.dimension.width}×${box.dimension.height}cm | Box weight: ${box.weightgram}g | Product weight: ${productWeight}g | Total: ${totalWeight}g`);
    
    const biteshipItems = [{
      name: box.id,
      description: 'Herbal product box',
      value: 10_000,
      weight: totalWeight,
      length: box.dimension.length,
      width: box.dimension.width,
      height: box.dimension.height,
      quantity: 1,
    }];

    console.log(`📨 Sending to Biteship:`, JSON.stringify({
      origin_postal_code: Number(originPostalCode),
      destination_postal_code: Number(destinationPostalCode),
      couriers: COURIERS,
      items: biteshipItems,
    }, null, 2));

    const response = await fetch(`${BITESHIP_BASE}/v1/rates/couriers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        origin_postal_code: Number(originPostalCode),
        destination_postal_code: Number(destinationPostalCode),
        couriers: COURIERS,
        items: biteshipItems,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Biteship error ${response.status}: ${text}`);
    }

    const data = await response.json() as {
      success: boolean;
      pricing?: BiteshipPricing[];
      message?: string;
    };

    if (!data.success || !data.pricing) {
      throw new Error(data.message ?? 'Biteship returned no pricing data');
    }

    allResponses.push(...data.pricing);
    console.log(`📊 Raw Biteship response (${data.pricing.length} services):`, data.pricing.map(p => ({ 
      courier: p.courier_name,
      service: p.courier_service_name,
      notes: p.notes,
      serviceType: p.service_type,
      price: p.price
    })));
  }

  // Merge results: accept all services, apply markup once
  const allServices: ShippingRateOption[] = [];

  for (const rate of allResponses) {
    const markupPrice = Math.ceil((rate.price * 1.10) / 500) * 500;

    allServices.push({
      tier: 'standard' as const, // Use standard as default tier
      label: rate.courier_service_name,
      price: markupPrice,
      duration: rate.duration,
      notes: rate.notes,
      courier: `${rate.courier_name} - ${rate.courier_service_name}`,
      courierCode: rate.courier_code,
      serviceCode: rate.courier_service_code,
    });

    console.log(`✅ ${rate.courier_name} - ${rate.courier_service_name}: Base Rp${rate.price} → With markup Rp${markupPrice} | Notes: ${rate.notes}`);
  }

  // Sort by price (cheapest first) and return top 10
  return allServices.sort((a, b) => a.price - b.price).slice(0, 10);
}
