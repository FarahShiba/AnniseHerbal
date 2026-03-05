import { validateOrderRequest } from "./orderValidation";
import { ShippingMethod, PaymentMethod } from "./../types/orders";
const validOrder = {
  customer: {
    name: "Budi Santoso",
    email: "budi@example.com",
    phoneNumber: "08123456789",
    address: "Jl. Merdeka No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
  },
  items: [
    { productId: "prod_123", quantity: 2 },
    { productId: "prod_456", quantity: 1 },
  ],
  shipping: {
    method: "standard" as ShippingMethod,
  },
  paymentMethod: "bank_transfer" as PaymentMethod,
  idempotencyKey: "checkout_1709028600000_abc123",
};

const result = validateOrderRequest(validOrder);
console.log(result);
// Should return: { isValid: true, normalizedPhone: "+628123456789" }
