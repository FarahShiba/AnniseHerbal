# 🚀 Frontend Integration Quick Start Guide

Step-by-step guide to start integrating backend APIs into the React frontend.

---

## ✅ Prerequisites

Before starting, make sure:
- [x] Backend server is running on `http://localhost:3000`
- [x] All backend endpoints are working (test with Postman)
- [x] Brevo email account is activated
- [x] Midtrans sandbox account is set up
- [x] You understand the API endpoints (see `api-endpoints-reference.md`)

---

## 📋 Step-by-Step Integration

### Step 1: API Configuration (20 min)

#### 1.1 Create Environment Variables File

Create `client/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-your-sandbox-key
```

#### 1.2 Create API Config File

Create `client/src/config/api.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '';
```

#### 1.3 Create API Utility Helper

Create `client/src/utils/api.ts`:
```typescript
import { API_BASE_URL } from '../config/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'Request failed',
        response.status,
        data.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Network error. Please check your connection.',
      0
    );
  }
}
```

---

### Step 2: Product Service (30 min)

#### 2.1 Create Product Service

Create `client/src/services/productService.ts`:
```typescript
import { apiRequest } from '../utils/api';
import { Product } from '../types';

export async function getAllProducts(): Promise<Product[]> {
  const response = await apiRequest<Product[]>('/products');
  return response.data || [];
}

export async function getProductById(
  category: string,
  size: string,
  id: string
): Promise<Product | null> {
  try {
    const response = await apiRequest<Product>(
      `/products/${category}/${size}/${id}`
    );
    return response.data || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
```

#### 2.2 Update ShopPage Component

In `client/src/pages/ShopPage.tsx`, replace static data:

**Before:**
```typescript
import { products } from '../data/data';
```

**After:**
```typescript
import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';

// Inside component:
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string>('');

useEffect(() => {
  loadProducts();
}, []);

async function loadProducts() {
  try {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
  } catch (err) {
    setError('Failed to load products');
    console.error(err);
  } finally {
    setLoading(false);
  }
}

// Add loading/error UI
if (loading) return <div>Loading products...</div>;
if (error) return <div>Error: {error}</div>;
```

---

### Step 3: Contact Form Integration (30 min)

#### 3.1 Create Contact Service

Create `client/src/services/contactService.ts`:
```typescript
import { apiRequest } from '../utils/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  return await apiRequest<{ contactId: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

#### 3.2 Update ContactPage Component

In `client/src/pages/ContactPage.tsx`:

```typescript
import { submitContactForm } from '../services/contactService';

// Inside form submit handler:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await submitContactForm({
      name,
      email,
      phone,
      message
    });
    
    // Show success message
    alert(response.message || 'Thank you for contacting us!');
    
    // Clear form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  } catch (err) {
    if (err instanceof ApiError) {
      setError(err.message);
    } else {
      setError('Failed to submit form. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};
```

---

### Step 4: Newsletter Integration (20 min)

#### 4.1 Create Newsletter Service

Create `client/src/services/newsletterService.ts`:
```typescript
import { apiRequest } from '../utils/api';

export async function subscribeToNewsletter(email: string) {
  return await apiRequest('/newsLetterSubscriber', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
```

#### 4.2 Update Newsletter Component

Find your newsletter subscription component and integrate:

```typescript
import { subscribeToNewsletter } from '../services/newsletterService';

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await subscribeToNewsletter(email);
    alert(response.message || 'Successfully subscribed!');
    setEmail('');
  } catch (err) {
    alert('Subscription failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

---

### Step 5: Cart State Management (1.5 hours)

#### 5.1 Create Cart Context

Create `client/src/contexts/CartContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

#### 5.2 Wrap App with CartProvider

In `client/src/main.tsx` or `App.tsx`:
```typescript
import { CartProvider } from './contexts/CartContext';

<CartProvider>
  <App />
</CartProvider>
```

---

### Step 6: Checkout & Midtrans (2 hours)

#### 6.1 Add Midtrans Snap Script

In `client/index.html`, add before closing `</body>`:
```html
<!-- Midtrans Snap (Sandbox) -->
<script 
  src="https://app.sandbox.midtrans.com/snap/snap.js" 
  data-client-key="SB-Mid-client-YOUR_KEY_HERE"
></script>
```

#### 6.2 Create Order Service

Create `client/src/services/orderService.ts`:
```typescript
import { apiRequest } from '../utils/api';

export interface CreateOrderRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    productPath: string;
    quantity: number;
  }[];
  shippingDetails: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    shippingMethod: string;
  };
  paymentMethod: string;
  idempotencyKey: string;
}

export interface CreateOrderResponse {
  orderId: string;
  orderNumber: string;
  midtransToken: string;
  redirectUrl: string;
  total: number;
  status: string;
}

export async function createOrder(data: CreateOrderRequest) {
  return await apiRequest<CreateOrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

#### 6.3 Create Midtrans Helper

Create `client/src/utils/midtransHelper.ts`:
```typescript
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

export function openMidtransPayment(
  token: string,
  callbacks: {
    onSuccess?: (result: any) => void;
    onPending?: (result: any) => void;
    onError?: (result: any) => void;
    onClose?: () => void;
  }
) {
  if (!window.snap) {
    console.error('Midtrans Snap not loaded');
    return;
  }

  window.snap.pay(token, {
    onSuccess: (result) => {
      console.log('Payment success:', result);
      callbacks.onSuccess?.(result);
    },
    onPending: (result) => {
      console.log('Payment pending:', result);
      callbacks.onPending?.(result);
    },
    onError: (result) => {
      console.error('Payment error:', result);
      callbacks.onError?.(result);
    },
    onClose: () => {
      console.log('Payment popup closed');
      callbacks.onClose?.();
    },
  });
}
```

#### 6.4 Implement Checkout Flow

In `client/src/pages/CheckoutPage.tsx`:
```typescript
import { createOrder } from '../services/orderService';
import { openMidtransPayment } from '../utils/midtransHelper';
import { useCart } from '../contexts/CartContext';

const handleCheckout = async () => {
  try {
    setLoading(true);

    // Create order
    const response = await createOrder({
      customer: { name, email, phone },
      items: cartItems.map(item => ({
        productPath: `products/${item.product.category}/sizes/${item.product.sizeName}/products/${item.product.id}`,
        quantity: item.quantity
      })),
      shippingDetails: { address, city, province, postalCode, shippingMethod },
      paymentMethod: selectedPaymentMethod,
      idempotencyKey: `checkout-${Date.now()}-${Math.random()}`
    });

    // Open Midtrans payment
    openMidtransPayment(response.data.midtransToken, {
      onSuccess: (result) => {
        clearCart();
        navigate('/order-success');
      },
      onPending: (result) => {
        navigate('/order-pending');
      },
      onError: (result) => {
        alert('Payment failed. Please try again.');
      },
      onClose: () => {
        console.log('Payment cancelled');
      }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Failed to create order');
  } finally {
    setLoading(false);
  }
};
```

---

## ✅ Testing Checklist

After integration, test everything:

- [ ] Products load from API on ShopPage
- [ ] Single product loads on ProductDetailPage
- [ ] Contact form submits successfully
- [ ] Email received (admin + customer confirmation)
- [ ] Newsletter subscription works
- [ ] Welcome email received
- [ ] Add to cart works
- [ ] Cart persists in localStorage
- [ ] Checkout form validation works
- [ ] Order creation successful
- [ ] Midtrans popup opens
- [ ] Test payment with sandbox card: `4811111111111114`
- [ ] Payment success redirects properly
- [ ] Order status updates in Firestore

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Make sure backend server is running with CORS enabled

### Issue: Midtrans Snap not loading
**Solution:** Check script is in `index.html` and client key is correct

### Issue: Network error
**Solution:** Verify API_BASE_URL in `.env.local` is correct

### Issue: Products not loading
**Solution:** Check backend is running on port 3000

---

## 📚 Next Steps

After basic integration:
1. Add toast notifications (react-hot-toast)
2. Add loading skeletons
3. Improve error handling
4. Add form validation feedback
5. Optimize performance
6. Prepare for production deployment

---

## 🔗 Resources

- [Frontend Integration Tracker](./frontend-integration-progress.md)
- [API Endpoints Reference](./api-endpoints-reference.md)
- [Backend Documentation](../../server/documentation/)
- [Midtrans Snap Docs](https://docs.midtrans.com/docs/snap-integration-guide)
