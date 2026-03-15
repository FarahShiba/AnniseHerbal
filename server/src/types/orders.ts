// file structure for order-related types in the server application
// Section 1: ShippingAddressType
// Section 2: OrderItemRequest + OrderItem (secure!)
// Section 3: ShippingMethod + ShippingDetailsType
// Section 4: PaymentMethod, PaymentStatus, PaymentDetailsType (complete!)
// Section 5: PricingBreakdownType (no tax, has discount)
// Section 6: PromoCodeUsageType (complete with discountAmount)
// Section 7: OrderStatus (lowercase)
// Section 8: Order (MAIN interface) ⭐
// Section 9: CreateOrderRequest + CreateOrderResponse
// Section 10: SUPPORTED_PROVINCES constant
// Section 11: OrderValidationErrors

// Section 1: Customer & Shipping Address types for orders
// structure for the shipping address in an order
export interface ShippingAddressType {
    name: string; // name of the customer
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    specialInstructions?: string;
}


// Section 2: Order Items(products in the order)
// What frontend SENDS (minimal data for security)
export interface OrderItemRequest {
    productId: string; 
    category: string;    
    sizeName: string;    
    quantity: number;
}

// What we SAVE in database (complete product details)
export interface OrderItem {
    productId: string; // Reference to original product
    category: string; // from our database
    sizeName: string; // e.g., "100ml", "60ml"
    name: string; // Product name from our database
    imageUrl: string; // Save for order history
    quantity: number; // From customer
    pricePerUnit: number; // Price from OUR database (security!)
    subtotal: number; // Calculated: pricePerUnit × quantity
}


// Section 3: Shipping Method & Details
export type ShippingMethod = "standard" | "express";

export interface ShippingDetailsType {
    method: ShippingMethod;
    cost: number; // Shipping cost in IDR
    estimation: string; // e.g., "2-3 Days", "1-2 Hours"
}




// Section 4: Payment Details
export type PaymentMethod = "bank_transfer" | "gopay" | "qris" | "shopeepay";
export type PaymentStatus = "pending" | "paid" | "failed" | "expired";

export interface PaymentDetailsType {
    method: PaymentMethod; // Selected payment method
    status: PaymentStatus; // Current payment status
    amount: number; // Total amount to pay (in IDR)
    
    // Filled AFTER payment (from Midtrans webhook)
    transactionId?: string; // Midtrans transaction ID
    midtransOrderId?: string; // Midtrans order reference
    paymentType?: string; // Detailed type from Midtrans
    bankName?: string; // If bank transfer (BCA, Mandiri, etc.)
    vaNumber?: string; // Virtual account number for bank transfer
    paidAt?: Date; // Timestamp when payment confirmed
    expiredAt?: Date; // Payment expiry time (usually 24 hours)
}




// Section 5: Pricing Breakdown
export interface PricingBreakdownType {
    subtotal: number; // Sum of all items (before shipping and discount)
    shippingCost: number; // Shipping cost in IDR
    discount: number; // Discount amount (if promo code used)
    total: number; // Final total: subtotal + shippingCost - discount
    // Note: Tax (PPN 11%) is already included in product prices
}


// Section 6: Promo Code (Optional)
export interface PromoCodeUsageType {
    code: string; // e.g., "NEWYEAR2026"
    discountType: "percentage" | "fixed"; // Type of discount
    discountValue: number; // 10 (for 10%) or 50000 (for Rp 50,000)
    discountAmount: number; // Actual rupiah amount saved
}


// Section 7: Order Status
export type OrderStatus = "pending" | "paid" | "confirmed" | "completed" | "cancelled" | "expired";


// ============================================
// Section 8: Main Order Document
// ============================================

export interface Order {
    // Order metadata
    id: string; // e.g., "order_1709028600000_abc123"
    orderNumber: string; // Human-readable: "ORD-2026-0001"
    status: OrderStatus;
    idempotencyKey: string; // For duplicate prevention
    
    // Customer information
    customer: ShippingAddressType;
    
    // Order items (shopping cart)
    items: OrderItem[];
    
    // Shipping details
    shipping: ShippingDetailsType;
    
    // Payment details
    payment: PaymentDetailsType;
    
    // Pricing breakdown
    pricing: PricingBreakdownType;
    
    // Promo code (optional)
    promoCode?: PromoCodeUsageType;
    
    // Timestamps
    createdAt: Date;
    updatedAt: Date;
    paidAt?: Date; // When payment confirmed
    confirmedAt?: Date; // When admin confirmed order
}


// ============================================
// Section 9: API Request/Response Types
// ============================================

// What frontend SENDS to create order
export interface CreateOrderRequest {
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
    items: OrderItemRequest[]; // Only productId + quantity
    shipping: {
        method: ShippingMethod;
    };
    paymentMethod: PaymentMethod;
    promoCode?: string; // Optional promo code
    idempotencyKey: string; // For duplicate prevention
}

// What backend SENDS back after creating order
export interface CreateOrderResponse {
    success: boolean;
    orderId: string;
    orderNumber: string;
    total: number;
    midtransToken: string; // For Midtrans Snap popup
    redirectUrl: string; // Midtrans payment page URL
}


// ============================================
// Section 10: Constants
// ============================================

export const SUPPORTED_PROVINCES = [
    "Bali",
    "Banten",
    "DI Yogyakarta",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Timur",
    "Riau",
    "Sulawesi Selatan",
    "Sumatera Utara",
    "Sumatera Barat"
] as const;

export type SupportedProvince = typeof SUPPORTED_PROVINCES[number];


// ============================================
// Section 11: Validation Error Types
// ============================================

export interface OrderValidationErrors {
    customer?: {
        name?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        city?: string;
        province?: string;
        postalCode?: string;
    };
    items?: string;
    shipping?: string;
    paymentMethod?: string;
    promoCode?: string;
    idempotencyKey?: string;
}