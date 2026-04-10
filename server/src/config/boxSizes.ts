interface ShippingBox {
    id: string;
    dimension: {
        length: number;
        width: number;
        height: number; 
    };
    weightgram:number;
    capacityDescription: String;
}

const box1: ShippingBox = {
    id: "Box 1",
    dimension:{length:10, width:10, height:8},
    weightgram: 35,
    capacityDescription:"1*small (10/15ml)"
};

const box2: ShippingBox = {
    id: "Box 2",
    dimension:{length:17, width:9, height:6},
    weightgram: 40,
    capacityDescription:"1*large (100ml)"
};

const box3: ShippingBox = {
    id: "Box 3",
    dimension:{length:15, width:10, height:10},
    weightgram: 48,
    capacityDescription:"3* mixed (1 large)"
};

const box4: ShippingBox = {
    id: "Box 4",
    dimension:{length:20, width:10, height:10},
    weightgram: 63,
    capacityDescription:"For mixed bottles (3 pcs)"
};

const box5: ShippingBox = {
    id: "Box 5",
    dimension:{length:20, width:11, height:11},
    weightgram: 62,
    capacityDescription:"For mixed bottles (4 pcs)"
};

const box6: ShippingBox = {
    id: "Box 6",
    dimension:{length:20, width:13, height:12},
    weightgram: 66,
    capacityDescription:"For mixed bottles (5 pcs)"
};

const box7: ShippingBox = {
    id: "Box 7",
    dimension:{length:20, width:15, height:10},
    weightgram: 93,
    capacityDescription:"For mixed bottles (6 pcs)"
};

const box8: ShippingBox = {
    id: "Box 8",
    dimension:{length:25, width:20, height:10},
    weightgram: 117,
    capacityDescription:"For mixed bottles (7 pcs)"
};

const box9: ShippingBox = {
    id: "Box 9",
    dimension:{length:27, width:20, height:15},
    weightgram: 146,
    capacityDescription:"For mixed bottles (10 pcs)"
};

// weight of bottes the grams
const PRODUCT_WEIGHT : Record<string, number> = {
    '10ml':50,
    '15ml':75,
    '100ml':200
}

/**
 * Calculate total product weight from items (sum all quantities × their weight)
*/
export function calculateProductWeight(items:{sizeName:string, quantity:number}[]):number{
    let total = 0;
    for(const item of items){
        const weight = PRODUCT_WEIGHT[item.sizeName] ?? 0;
        total += weight * item.quantity;
    }
    return total;
    return total;
}


export function selectBoxesForCart(items: { sizeName: string; quantity: number }[]): ShippingBox[] {
  // Calculate total bottles (sum quantities, not array length)
  const totalBottles = items.reduce((sum, item) => sum + item.quantity, 0);

  // Detect which sizes are present
  const has10ml = items.some(item => item.sizeName === '10ml');
  const has15ml = items.some(item => item.sizeName === '15ml');
  const has100ml = items.some(item => item.sizeName === '100ml');

  // Single item
  if (totalBottles === 1) {
    if (has100ml) return [box2]; // Single 100ml → Box 2
    return [box1]; // Single small (10ml or 15ml) → Box 1
  }

  // 2-3 items
  if (totalBottles >= 2 && totalBottles <= 3) {
    if (has100ml && has10ml && has15ml) return [box3]; // Mixed trio
    if (has100ml) return [box4]; // 100ml + others
    return [box3]; // Only small items
  }

  // 4 items
  if (totalBottles === 4) return [box5];

  // 5 items
  if (totalBottles === 5) return [box6];

  // 6 items
  if (totalBottles === 6) return [box7];

  // 7 items
  if (totalBottles === 7) return [box8];

  // 8+ items → split into 2 Box 9s (Biteship will calculate each, then sum)
  return [box9, box9];
}
