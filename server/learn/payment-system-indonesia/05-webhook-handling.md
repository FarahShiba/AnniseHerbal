# 🎣 Webhook Handling - Processing Payment Notifications

**Reading Time:** 40 minutes  
**Difficulty:** Intermediate ⭐⭐⭐  
**Prerequisites:** Backend integration complete

---

## 🎯 What You'll Learn

In this guide, you'll learn to:
- ✅ Understand webhooks and why they're critical
- ✅ Verify webhook signatures (security!)
- ✅ Handle all payment statuses
- ✅ Update order status automatically
- ✅ Test webhooks locally
- ✅ Handle edge cases

---

## 🤔 What are Webhooks?

### **The Problem:**

```
Without webhooks:
├─ Customer pays with Bank Transfer
├─ You wait... how do you know when they pay?
├─ Check Midtrans dashboard manually? 😰
└─ Very slow, manual process!
```

### **The Solution: Webhooks!**

```
With webhooks:
├─ Customer pays with Bank Transfer
├─ Bank confirms to Midtrans
├─ Midtrans sends notification to YOUR server
├─ Your server updates order status AUTOMATICALLY
└─ Customer receives confirmation! ✅
```

**Webhook = Automatic notification from Midtrans to your server**

---

## 📊 Webhook Flow

```
Customer pays with GoPay
       ↓
GoPay confirms payment
       ↓
Midtrans receives confirmation
       ↓
Midtrans sends POST request to your webhook URL
POST https://your-server.com/api/webhooks/midtrans
{
  "order_id": "ORD-123",
  "transaction_status": "settlement",
  "gross_amount": "340000",
  "signature_key": "abc123..."
}
       ↓
Your server verifies signature
       ↓
Your server updates order status
       ↓
Your server sends email/WhatsApp to customer
       ↓
Done! Automatic! ⚡
```

---

## 🔐 Step 1: Create Signature Verification Utility

### **Why Verification is Critical:**

```
❌ Without verification:
- Hackers can send fake "payment success" webhooks
- You ship products without receiving payment
- You lose money!

✅ With verification:
- Only Midtrans can send valid webhooks
- Signature proves the webhook is genuine
- Your business is secure!
```

---

### **Create `src/utils/midtransVerify.ts`**

```typescript
import crypto from 'crypto';
import { midtransConfig } from '../config/midtrans';

/**
 * Verify Midtrans webhook signature
 * This ensures the webhook is genuine and not from a hacker
 */
export function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  try {
    const serverKey = midtransConfig.serverKey;
    
    // Create the hash string
    const input = orderId + statusCode + grossAmount + serverKey;
    
    // Generate SHA512 hash
    const hash = crypto
      .createHash('sha512')
      .update(input)
      .digest('hex');
    
    // Compare with signature from Midtrans
    const isValid = hash === signatureKey;
    
    if (!isValid) {
      console.error('⚠️ Signature verification FAILED!');
      console.error('Expected:', hash);
      console.error('Received:', signatureKey);
    }
    
    return isValid;
  } catch (error) {
    console.error('❌ Error verifying signature:', error);
    return false;
  }
}

/**
 * Map Midtrans transaction status to our order status
 */
export function mapTransactionStatus(transactionStatus: string): {
  orderStatus: string;
  paymentStatus: string;
} {
  switch (transactionStatus) {
    case 'capture':
    case 'settlement':
      return {
        orderStatus: 'processing',
        paymentStatus: 'settlement'
      };
    
    case 'pending':
      return {
        orderStatus: 'pending',
        paymentStatus: 'pending'
      };
    
    case 'deny':
    case 'cancel':
    case 'expire':
      return {
        orderStatus: 'cancelled',
        paymentStatus: transactionStatus
      };
    
    case 'failure':
      return {
        orderStatus: 'failed',
        paymentStatus: 'failure'
      };
    
    default:
      return {
        orderStatus: 'pending',
        paymentStatus: transactionStatus
      };
  }
}
```

---

## 🎣 Step 2: Create Webhook Controller

### **Create `src/controllers/webhookController.ts`**

```typescript
import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { MidtransNotification } from '../types/payment';
import { verifySignature, mapTransactionStatus } from '../utils/midtransVerify';

/**
 * Handle Midtrans webhook notifications
 * This is called by Midtrans when payment status changes
 */
export const handleMidtransNotification = async (req: Request, res: Response) => {
  try {
    console.log('\n🔔 ========== WEBHOOK RECEIVED ==========');
    console.log('📥 Notification body:', JSON.stringify(req.body, null, 2));

    // 1. Extract notification data
    const notification: MidtransNotification = req.body;

    const {
      order_id,
      transaction_status,
      fraud_status,
      transaction_id,
      status_code,
      gross_amount,
      signature_key,
      payment_type
    } = notification;

    console.log('\n📊 Transaction Details:');
    console.log(`   Order ID: ${order_id}`);
    console.log(`   Status: ${transaction_status}`);
    console.log(`   Payment Type: ${payment_type}`);
    console.log(`   Amount: Rp ${gross_amount}`);
    console.log(`   Transaction ID: ${transaction_id}`);

    // 2. Verify signature (CRITICAL FOR SECURITY!)
    console.log('\n🔐 Verifying signature...');
    const isValidSignature = verifySignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    );

    if (!isValidSignature) {
      console.error('❌ INVALID SIGNATURE! Rejecting webhook.');
      return res.status(403).json({
        success: false,
        message: 'Invalid signature'
      });
    }

    console.log('✅ Signature verified!');

    // 3. Get order from database
    console.log('\n🔍 Fetching order from database...');
    const orderRef = db.collection('orders').doc(order_id);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      console.error(`❌ Order ${order_id} not found in database`);
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = orderDoc.data();
    console.log(`✅ Order found: ${order?.customer?.firstName}`);

    // 4. Map transaction status to our status
    const { orderStatus, paymentStatus } = mapTransactionStatus(transaction_status);

    console.log('\n📝 Updating order status:');
    console.log(`   Order Status: ${order?.status} → ${orderStatus}`);
    console.log(`   Payment Status: ${order?.paymentStatus} → ${paymentStatus}`);

    // 5. Prepare update data
    const updateData: any = {
      paymentStatus: paymentStatus,
      status: orderStatus,
      transactionId: transaction_id,
      paymentMethod: payment_type,
      updatedAt: new Date()
    };

    // 6. Handle different statuses
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      // Payment successful!
      console.log('💰 Payment SUCCESSFUL!');
      
      updateData.paidAt = new Date();
      
      // Check fraud status for credit card payments
      if (payment_type === 'credit_card' && fraud_status === 'accept') {
        console.log('✅ Fraud check passed');
      }

      // TODO: Send email/WhatsApp notification
      console.log('📧 TODO: Send confirmation to customer');
      
      // TODO: Reduce product stock
      console.log('📦 TODO: Reduce product stock');

    } else if (transaction_status === 'pending') {
      // Payment pending (e.g., waiting for bank transfer)
      console.log('⏳ Payment PENDING (waiting for customer)');

      // TODO: Send payment instructions via email/WhatsApp
      console.log('📧 TODO: Send payment instructions');

    } else if (transaction_status === 'deny') {
      // Payment denied
      console.log('❌ Payment DENIED');

    } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
      // Payment cancelled or expired
      console.log('⛔ Payment CANCELLED/EXPIRED');

      // TODO: Restore product stock if it was reserved
      console.log('📦 TODO: Restore reserved stock');

    } else if (transaction_status === 'refund') {
      // Payment refunded
      console.log('💸 Payment REFUNDED');
      updateData.refundedAt = new Date();
    }

    // 7. Update order in database
    await orderRef.update(updateData);
    console.log('✅ Order updated in database');

    // 8. Log webhook to separate collection (for debugging)
    await db.collection('webhook_logs').add({
      orderId: order_id,
      transactionStatus: transaction_status,
      paymentType: payment_type,
      notification: notification,
      processedAt: new Date()
    });

    console.log('📝 Webhook logged');
    console.log('========== WEBHOOK PROCESSED ==========\n');

    // 9. ALWAYS return 200 OK to Midtrans
    // If you don't, Midtrans will retry sending the webhook
    res.status(200).json({
      success: true,
      message: 'Notification processed successfully'
    });

  } catch (error: any) {
    console.error('\n❌ ========== WEBHOOK ERROR ==========');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('=====================================\n');

    // Still return 200 to prevent retries
    // But log the error for investigation
    res.status(200).json({
      success: false,
      message: 'Error processing notification',
      error: error.message
    });
  }
};

/**
 * Test webhook endpoint (for manual testing)
 */
export const testWebhook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Webhook endpoint is working!',
      timestamp: new Date().toISOString(),
      body: req.body
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

---

## 🛣️ Step 3: Create Webhook Routes

### **Create `src/routes/webhook.ts`**

```typescript
import { Router } from 'express';
import { 
  handleMidtransNotification,
  testWebhook 
} from '../controllers/webhookController';

const router = Router();

/**
 * POST /api/webhooks/midtrans
 * Receive payment notifications from Midtrans
 * 
 * This URL must be registered in Midtrans dashboard:
 * Settings → Configuration → Notification URL
 */
router.post('/midtrans', handleMidtransNotification);

/**
 * GET /api/webhooks/test
 * Test endpoint to verify webhook is accessible
 */
router.get('/test', testWebhook);

/**
 * POST /api/webhooks/test
 * Test endpoint for manual webhook testing
 */
router.post('/test', testWebhook);

export default router;
```

---

## 🔗 Step 4: Register Webhook Routes

### **Update `src/index.ts`**

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import routes
import productsRoutes from './routes/products';
import paymentRoutes from './routes/payment';
import webhookRoutes from './routes/webhook';  // NEW!

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);  // NEW!

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🎣 Webhook URL: http://localhost:${PORT}/api/webhooks/midtrans`);
});

export default app;
```

---

## 🧪 Step 5: Test Webhooks Locally

### **Method 1: Manual Test with Thunder Client**

**Request:**
```
POST http://localhost:5000/api/webhooks/midtrans
Content-Type: application/json

{
  "transaction_time": "2024-02-25 10:30:00",
  "transaction_status": "settlement",
  "transaction_id": "test-123456",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "CALCULATE_THIS",
  "payment_type": "gopay",
  "order_id": "ORD-1708857600000-123",
  "merchant_id": "M123456",
  "gross_amount": "340000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

**How to calculate signature_key:**
```javascript
// Use Node.js crypto
const crypto = require('crypto');

const orderId = "ORD-1708857600000-123";
const statusCode = "200";
const grossAmount = "340000.00";
const serverKey = "YOUR_SERVER_KEY";

const string = orderId + statusCode + grossAmount + serverKey;
const signature = crypto.createHash('sha512').update(string).digest('hex');

console.log('Signature:', signature);
```

---

### **Method 2: Use Midtrans Simulator**

1. **Go to Midtrans Dashboard**
   ```
   https://dashboard.sandbox.midtrans.com
   ```

2. **Find your transaction**
   - Go to "Transactions"
   - Click on your order

3. **Simulate payment**
   - Click "Actions"
   - Select "Set Status"
   - Choose: "settlement"
   - Midtrans will send real webhook to your server!

---

### **Method 3: Use ngrok for Localhost Testing**

**Problem:** Midtrans can't reach http://localhost:5000

**Solution:** Use ngrok to create public URL

```bash
# Install ngrok
npm install -g ngrok

# Start your server
npm run dev

# In another terminal, create tunnel
ngrok http 5000

# You'll get a public URL like:
# https://abc123.ngrok.io
```

**Then in Midtrans Dashboard:**
```
Settings → Configuration → Notification URL
https://abc123.ngrok.io/api/webhooks/midtrans
```

Now Midtrans can send webhooks to your local server!

---

## 📊 Understanding Transaction Statuses

### **Status Flow:**

```
pending → settlement ✅ (Success!)
    ↓ (or)
pending → expire ❌ (Customer didn't pay)
    ↓ (or)
pending → cancel ⛔ (Customer cancelled)
    ↓ (or)
pending → deny ❌ (Payment rejected)
```

### **Status Meanings:**

| Status | Meaning | Action Required |
|--------|---------|-----------------|
| **pending** | Waiting for customer to pay | Send payment instructions |
| **settlement** | Payment successful! | Ship order, send confirmation |
| **capture** | Card authorized (will settle) | Wait for settlement |
| **deny** | Payment rejected by bank | Notify customer, suggest retry |
| **cancel** | Customer cancelled | No action needed |
| **expire** | Payment time limit expired | Notify customer to reorder |
| **refund** | Money returned to customer | Record refund |
| **failure** | Technical failure | Investigate, contact support |

---

## 🔒 Security Best Practices

### **1. Always Verify Signature**

```typescript
❌ NEVER SKIP THIS:
const isValid = verifySignature(...);
if (!isValid) {
  return res.status(403).json({ error: 'Invalid signature' });
}
```

---

### **2. Validate Order Exists**

```typescript
❌ DON'T DO THIS:
// Blindly updating without checking
await db.collection('orders').doc(order_id).update({ status: 'paid' });

✅ DO THIS:
const orderDoc = await db.collection('orders').doc(order_id).get();
if (!orderDoc.exists) {
  return res.status(404).json({ error: 'Order not found' });
}
```

---

### **3. Check Amount Match**

```typescript
const order = orderDoc.data();
const expectedAmount = order.total.toString();

if (gross_amount !== expectedAmount) {
  console.error('⚠️ Amount mismatch!');
  console.error(`Expected: ${expectedAmount}, Received: ${gross_amount}`);
  // Log this for investigation
}
```

---

### **4. Always Return 200 OK**

```typescript
// Even if there's an error, return 200
// Otherwise Midtrans will keep retrying
res.status(200).json({
  success: false,
  message: 'Error processed (logged for investigation)'
});
```

---

## 🐛 Common Issues & Solutions

### **Issue 1: Webhook Not Received**

**Symptoms:**
- Order status doesn't update after payment
- No webhook logs in console

**Solutions:**
```
1. Check Midtrans Dashboard:
   Settings → Configuration → Notification URL
   Should be: https://your-domain.com/api/webhooks/midtrans

2. Check server is running:
   curl http://localhost:5000/api/webhooks/test

3. Use ngrok for local testing:
   ngrok http 5000

4. Check firewall/security groups:
   Allow POST requests to webhook endpoint
```

---

### **Issue 2: Invalid Signature**

**Symptoms:**
- Webhook received but rejected
- "Invalid signature" error in logs

**Solutions:**
```
1. Check server key in .env:
   MIDTRANS_SERVER_KEY_SANDBOX=SB-Mid-server-...

2. Make sure using correct environment:
   - Sandbox transaction → Use sandbox key
   - Production transaction → Use production key

3. Check signature calculation:
   orderId + statusCode + grossAmount + serverKey
   All values must be EXACT (including decimals)
```

---

### **Issue 3: Duplicate Webhooks**

**Symptoms:**
- Same webhook received multiple times
- Order updated multiple times

**Solutions:**
```typescript
// Check if payment already processed
const order = orderDoc.data();

if (order.paymentStatus === 'settlement' && transaction_status === 'settlement') {
  console.log('⚠️ Payment already processed, skipping');
  return res.status(200).json({ message: 'Already processed' });
}
```

---

## 📝 Webhook Logs Collection

### **Why Log Webhooks?**

```
Benefits:
✅ Debug payment issues
✅ Track webhook history
✅ Investigate discrepancies
✅ Compliance & audit trail
```

### **Firestore Structure:**

```
webhook_logs/
├── doc_id_1/
│   ├── orderId: "ORD-123"
│   ├── transactionStatus: "settlement"
│   ├── paymentType: "gopay"
│   ├── notification: { full webhook data }
│   └── processedAt: Timestamp
│
└── doc_id_2/
    └── ...
```

---

## ✅ Testing Checklist

Before moving to frontend:

- [ ] ✅ Webhook endpoint responds to POST
- [ ] ✅ Signature verification works
- [ ] ✅ Order status updates correctly
- [ ] ✅ All statuses handled (settlement, pending, deny, etc.)
- [ ] ✅ Webhook logs saved to Firestore
- [ ] ✅ Returns 200 OK to Midtrans
- [ ] ✅ Tested with Midtrans simulator
- [ ] ✅ Console logs are clear and helpful

---

## 🎯 What's Next?

Your payment processing is complete!

**Next steps:**
1. ✅ Webhook handler working
2. 📝 **Next guide:** `06-frontend-integration.md`
3. 🎨 Build checkout UI in React
4. 🔗 Connect frontend to your API

---

## 💡 Pro Tips

### **Tip 1: Monitor Webhooks**

```typescript
// Create dashboard to view recent webhooks
router.get('/admin/webhooks/recent', async (req, res) => {
  const logs = await db.collection('webhook_logs')
    .orderBy('processedAt', 'desc')
    .limit(50)
    .get();
  
  res.json(logs.docs.map(doc => doc.data()));
});
```

---

### **Tip 2: Retry Failed Updates**

```typescript
// If database update fails, add to retry queue
if (updateError) {
  await db.collection('webhook_retry_queue').add({
    orderId: order_id,
    notification: notification,
    error: updateError.message,
    retryCount: 0,
    createdAt: new Date()
  });
}
```

---

### **Tip 3: Send Customer Notifications**

```typescript
if (transaction_status === 'settlement') {
  // Send email
  await sendEmail(order.customer.email, {
    subject: 'Payment Confirmed!',
    body: `Hi ${order.customer.firstName}, your payment has been confirmed...`
  });
  
  // Send WhatsApp (using WABA API)
  await sendWhatsApp(order.customer.phone, 
    `Terima kasih! Pembayaran Anda telah dikonfirmasi. Pesanan Anda sedang diproses.`
  );
}
```

---

**Webhooks complete! Ready for frontend?** 🎨

**Next Guide:** [`06-frontend-integration.md` →](06-frontend-integration.md)
