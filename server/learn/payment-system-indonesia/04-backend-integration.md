# 🔧 Backend Integration - Building Payment API

**Reading Time:** 45 minutes  
**Difficulty:** Intermediate ⭐⭐  
**Prerequisites:** Installation complete, basic Express.js knowledge

---

## 🎯 What You'll Build

In this guide, you'll create:
- ✅ Payment controller with transaction creation
- ✅ Order creation logic
- ✅ Payment routes (REST API endpoints)
- ✅ Error handling
- ✅ Request validation

---

## 📐 Architecture Overview

### **The Flow:**

```
Frontend Request
     ↓
POST /api/payment/create-transaction
     ↓
paymentController.createTransaction()
     ├─ Validate request
     ├─ Create order in Firebase
     ├─ Call Midtrans Snap API
     └─ Return payment token
     ↓
Frontend receives token → Opens Midtrans page
```

---

## 🛠️ Step 1: Create Payment Controller

### **Create `src/controllers/paymentController.ts`**

```typescript
import { Request, Response } from 'express';
import { snap } from '../config/midtrans';
import { db } from '../config/firebase';
import { 
  MidtransTransactionRequest,
  PaymentResponse 
} from '../types/payment';
import {
  Order,
  OrderStatus,
  PaymentStatus,
  CreateOrderRequest
} from '../types/order';

/**
 * Create payment transaction
 * This endpoint creates an order and gets payment token from Midtrans
 */
export const createTransaction = async (req: Request, res: Response) => {
  try {
    console.log('📥 Received payment request:', req.body);

    // 1. Extract and validate request data
    const { customer, items, shippingCost, notes }: CreateOrderRequest = req.body;

    // Validation
    if (!customer || !customer.firstName || !customer.email || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer details are required'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart items are required'
      });
    }

    if (typeof shippingCost !== 'number' || shippingCost < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid shipping cost is required'
      });
    }

    // 2. Calculate totals
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const total = subtotal + shippingCost;

    console.log('💰 Order totals:', { subtotal, shippingCost, total });

    // 3. Generate unique order ID
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    const orderId = `ORD-${timestamp}-${randomSuffix}`;

    console.log('🆔 Generated Order ID:', orderId);

    // 4. Create order in Firestore (status: pending)
    const orderData: Order = {
      id: orderId,
      orderId: orderId,
      customer: customer,
      items: items,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: total,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      notes: notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to Firestore
    await db.collection('orders').doc(orderId).set(orderData);
    console.log('✅ Order created in Firestore');

    // 5. Prepare Midtrans transaction request
    const transactionDetails: MidtransTransactionRequest = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total
      },
      customer_details: {
        first_name: customer.firstName,
        last_name: customer.lastName || '',
        email: customer.email,
        phone: customer.phone
      },
      item_details: [
        // Add products
        ...items.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.name
        })),
        // Add shipping as item
        {
          id: 'SHIPPING',
          price: shippingCost,
          quantity: 1,
          name: 'Shipping Cost'
        }
      ],
      // Enable specific payment methods (optional)
      enabled_payments: [
        'gopay',
        'shopeepay',
        'other_qris',
        'bca_va',
        'bni_va',
        'bri_va',
        'permata_va',
        'other_va',
        'credit_card'
      ]
    };

    console.log('📤 Calling Midtrans Snap API...');

    // 6. Call Midtrans Snap API
    const transaction = await snap.createTransaction(transactionDetails);

    console.log('✅ Midtrans transaction created:', {
      token: transaction.token.substring(0, 20) + '...',
      redirectUrl: transaction.redirect_url
    });

    // 7. Update order with snap token
    await db.collection('orders').doc(orderId).update({
      snapToken: transaction.token,
      snapRedirectUrl: transaction.redirect_url,
      updatedAt: new Date()
    });

    // 8. Send response to frontend
    const response: PaymentResponse = {
      success: true,
      orderId: orderId,
      snapToken: transaction.token,
      redirectUrl: transaction.redirect_url,
      message: 'Payment transaction created successfully'
    };

    console.log('🎉 Payment creation successful!');

    res.status(200).json(response);

  } catch (error: any) {
    console.error('❌ Error creating payment:', error);

    // Handle specific Midtrans errors
    if (error.httpStatusCode) {
      return res.status(error.httpStatusCode).json({
        success: false,
        message: error.message || 'Midtrans API error',
        details: error.ApiResponse || {}
      });
    }

    // General error
    res.status(500).json({
      success: false,
      message: 'Failed to create payment transaction',
      error: error.message
    });
  }
};

/**
 * Get order by ID
 */
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    console.log('🔍 Fetching order:', orderId);

    const orderDoc = await db.collection('orders').doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderDoc.data();

    res.status(200).json({
      success: true,
      order: order
    });

  } catch (error: any) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

/**
 * Get customer orders
 */
export const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log('🔍 Fetching orders for:', email);

    const ordersSnapshot = await db.collection('orders')
      .where('customer.email', '==', email)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const orders = ordersSnapshot.docs.map(doc => doc.data());

    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders
    });

  } catch (error: any) {
    console.error('❌ Error fetching customer orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};
```

---

## 🛣️ Step 2: Create Payment Routes

### **Create `src/routes/payment.ts`**

```typescript
import { Router } from 'express';
import {
  createTransaction,
  getOrder,
  getCustomerOrders
} from '../controllers/paymentController';

const router = Router();

/**
 * POST /api/payment/create-transaction
 * Create payment transaction and get Snap token
 * 
 * Body:
 * {
 *   customer: { firstName, lastName, email, phone },
 *   items: [{ id, name, price, quantity }],
 *   shippingCost: number,
 *   notes: string (optional)
 * }
 */
router.post('/create-transaction', createTransaction);

/**
 * GET /api/payment/order/:orderId
 * Get order details by ID
 */
router.get('/order/:orderId', getOrder);

/**
 * GET /api/payment/orders?email=customer@email.com
 * Get customer's orders by email
 */
router.get('/orders', getCustomerOrders);

export default router;
```

---

## 🔗 Step 3: Register Routes in Main Server

### **Update `src/index.ts`**

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import productsRoutes from './routes/products';
import paymentRoutes from './routes/payment';  // NEW!

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/payment', paymentRoutes);  // NEW!

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`💳 Midtrans: ${process.env.MIDTRANS_IS_PRODUCTION === 'true' ? 'PRODUCTION 🔴' : 'SANDBOX 🟡'}`);
});

export default app;
```

---

## 🧪 Step 4: Test Your API

### **Using Thunder Client / Postman**

#### **Test 1: Create Transaction**

**Request:**
```
POST http://localhost:5000/api/payment/create-transaction
Content-Type: application/json

{
  "customer": {
    "firstName": "Budi",
    "lastName": "Santoso",
    "email": "budi@example.com",
    "phone": "081234567890"
  },
  "items": [
    {
      "id": "lavender-oil",
      "name": "Lavender Essential Oil 10ml",
      "price": 125000,
      "quantity": 1,
      "category": "essential-oils",
      "sizeName": "10ml"
    },
    {
      "id": "eucalyptus-oil",
      "name": "Eucalyptus Essential Oil 10ml",
      "price": 100000,
      "quantity": 2,
      "category": "essential-oils",
      "sizeName": "10ml"
    }
  ],
  "shippingCost": 15000,
  "notes": "Please pack carefully"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "orderId": "ORD-1708857600000-123",
  "snapToken": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirectUrl": "https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55...",
  "message": "Payment transaction created successfully"
}
```

---

#### **Test 2: Get Order by ID**

**Request:**
```
GET http://localhost:5000/api/payment/order/ORD-1708857600000-123
```

**Expected Response (200):**
```json
{
  "success": true,
  "order": {
    "id": "ORD-1708857600000-123",
    "orderId": "ORD-1708857600000-123",
    "customer": {
      "firstName": "Budi",
      "lastName": "Santoso",
      "email": "budi@example.com",
      "phone": "081234567890"
    },
    "items": [...],
    "subtotal": 325000,
    "shippingCost": 15000,
    "total": 340000,
    "status": "pending",
    "paymentStatus": "pending",
    "snapToken": "66e4fa55...",
    "createdAt": "2024-02-25T10:00:00.000Z"
  }
}
```

---

#### **Test 3: Get Customer Orders**

**Request:**
```
GET http://localhost:5000/api/payment/orders?email=budi@example.com
```

**Expected Response (200):**
```json
{
  "success": true,
  "count": 3,
  "orders": [
    {
      "orderId": "ORD-1708857600000-123",
      "total": 340000,
      "status": "pending",
      "createdAt": "2024-02-25T10:00:00.000Z"
    },
    // ... more orders
  ]
}
```

---

## 🔍 Understanding the Code

### **Key Concepts:**

#### **1. Order ID Generation**

```typescript
const timestamp = Date.now();
const randomSuffix = Math.floor(Math.random() * 1000);
const orderId = `ORD-${timestamp}-${randomSuffix}`;

// Example: ORD-1708857600000-456
```

**Why this format?**
- ✅ Unique (timestamp + random)
- ✅ Sortable (timestamp first)
- ✅ Human-readable
- ✅ Easy to search

---

#### **2. Item Details Format**

```typescript
item_details: [
  {
    id: 'lavender-oil',      // Product ID
    price: 125000,           // Price in IDR
    quantity: 1,             // Quantity
    name: 'Lavender Oil'     // Product name
  },
  {
    id: 'SHIPPING',          // Special ID for shipping
    price: 15000,
    quantity: 1,
    name: 'Shipping Cost'
  }
]
```

**Important:**
- Sum of (price × quantity) MUST equal gross_amount
- Midtrans validates this strictly
- Include shipping as separate item

---

#### **3. Error Handling**

```typescript
try {
  // Create transaction
} catch (error: any) {
  if (error.httpStatusCode === 401) {
    // Unauthorized - wrong API key
  } else if (error.httpStatusCode === 400) {
    // Bad request - invalid data
  } else {
    // Other errors
  }
}
```

---

## 📊 Firestore Data Structure

### **Orders Collection:**

```
orders/
├── ORD-1708857600000-123/
│   ├── id: "ORD-1708857600000-123"
│   ├── orderId: "ORD-1708857600000-123"
│   ├── customer: {
│   │     firstName: "Budi",
│   │     email: "budi@example.com",
│   │     phone: "081234567890"
│   │   }
│   ├── items: [...]
│   ├── subtotal: 325000
│   ├── shippingCost: 15000
│   ├── total: 340000
│   ├── status: "pending"
│   ├── paymentStatus: "pending"
│   ├── snapToken: "66e4fa55..."
│   ├── snapRedirectUrl: "https://..."
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp
│
└── ORD-1708857700000-789/
    └── ...
```

---

## ⚙️ Advanced Features (Optional)

### **1. Add Payment Method Filtering**

```typescript
// Only allow GoPay and Bank Transfer
enabled_payments: ['gopay', 'bca_va', 'bni_va', 'bri_va']

// Or allow all except certain methods
enabled_payments: snap.PAYMENT_TYPES.filter(
  type => type !== 'credit_card' // Exclude credit cards
)
```

---

### **2. Add Custom Expiry**

```typescript
transaction_details: {
  order_id: orderId,
  gross_amount: total
},
custom_expiry: {
  expiry_duration: 60,      // 60 minutes
  unit: "minute"
}
```

---

### **3. Add Callbacks**

```typescript
callbacks: {
  finish: `${process.env.FRONTEND_URL}/order/success`,
  error: `${process.env.FRONTEND_URL}/order/failed`,
  pending: `${process.env.FRONTEND_URL}/order/pending`
}
```

These URLs are shown after payment in Midtrans page.

---

## 🐛 Common Errors & Solutions

### **Error 1: Gross Amount Mismatch**

```
Error 400: Transaction gross_amount doesn't match the sum of item_details
```

**Solution:**
```typescript
// Make sure:
const itemsTotal = items.reduce((sum, item) => 
  sum + (item.price * item.quantity), 0
);
const gross_amount = itemsTotal + shippingCost;

// gross_amount MUST equal sum of all item_details
```

---

### **Error 2: Unauthorized (401)**

```
Error 401: Access denied due to unauthorized transaction
```

**Solution:**
```bash
# Check your .env file
MIDTRANS_SERVER_KEY_SANDBOX=SB-Mid-server-YOUR_KEY_HERE

# Make sure it starts with SB-Mid-server for sandbox
```

---

### **Error 3: Duplicate Order ID**

```
Error 400: Order ID already exists
```

**Solution:**
```typescript
// Add more randomness to order ID
const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
```

---

## ✅ Testing Checklist

Before moving to next guide:

- [ ] ✅ POST /api/payment/create-transaction works
- [ ] ✅ Returns snapToken and redirectUrl
- [ ] ✅ Order created in Firestore
- [ ] ✅ GET /api/payment/order/:orderId works
- [ ] ✅ GET /api/payment/orders?email=... works
- [ ] ✅ Error handling works (test with invalid data)
- [ ] ✅ Console logs are clear and helpful

---

## 🎯 What's Next?

You now have a working payment API!

**Next steps:**
1. ✅ Payment creation endpoint works
2. 📝 **Next guide:** `05-webhook-handling.md`
3. 🎣 Handle payment notifications from Midtrans
4. ✅ Update order status automatically

---

## 💡 Pro Tips

### **Tip 1: Use Transaction Logging**

```typescript
// Create a transactions log collection
await db.collection('transaction_logs').add({
  orderId: orderId,
  action: 'create_transaction',
  request: transactionDetails,
  response: transaction,
  timestamp: new Date()
});
```

### **Tip 2: Add Request Validation Middleware**

```typescript
// src/middleware/validatePayment.ts
export const validateCreateTransaction = (req, res, next) => {
  const { customer, items, shippingCost } = req.body;
  
  if (!customer || !items || typeof shippingCost !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'Invalid request format'
    });
  }
  
  next();
};

// Use in route:
router.post('/create-transaction', validateCreateTransaction, createTransaction);
```

---

**Payment API complete! Ready for webhooks?** 🎣

**Next Guide:** [`05-webhook-handling.md` →](05-webhook-handling.md)
