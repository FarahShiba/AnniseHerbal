import express, { Request, Response } from 'express';
import { getShippingRates } from '../services/biteshipService';

const router = express.Router();

/**
 * GET /api/shipping/rates?postalCode=XXXXX&items=[...]
 * Returns live Biteship rates for the given destination postal code and cart items.
 * items must be a JSON array: [{ productId, sizeName, quantity }]
 */
router.get('/rates', async (req: Request, res: Response) => {
  const { postalCode, items: itemsRaw } = req.query;

  if (!postalCode || typeof postalCode !== 'string' || !/^\d{5}$/.test(postalCode)) {
    return res.status(400).json({ success: false, error: 'Valid 5-digit postalCode is required' });
  }

  if (!itemsRaw || typeof itemsRaw !== 'string') {
    return res.status(400).json({ success: false, error: 'items query parameter is required' });
  }

  let items: { productId: string; sizeName: string; quantity: number }[];
  try {
    items = JSON.parse(decodeURIComponent(itemsRaw));
  } catch {
    return res.status(400).json({ success: false, error: 'items must be valid JSON' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'items must be a non-empty array' });
  }

  try {
    const rates = await getShippingRates(postalCode, items);
    return res.json({ success: true, rates });
  } catch (error) {
    console.error('Biteship error:', error);
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get shipping rates',
    });
  }
});

export default router;
