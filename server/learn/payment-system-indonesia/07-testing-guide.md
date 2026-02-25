# 🧪 Testing Guide - Complete Payment Testing

**Reading Time:** 45 minutes  
**Difficulty:** Intermediate ⭐⭐⭐  
**Prerequisites:** Frontend & webhook complete

---

## 🎯 What You'll Learn

In this guide, you'll learn to:
- ✅ Test all payment methods systematically
- ✅ Use Midtrans sandbox simulator
- ✅ Test webhook scenarios
- ✅ Handle edge cases
- ✅ Debug payment issues
- ✅ Prepare for production testing

---

## 📋 Complete Testing Checklist

### **Phase 1: Setup Testing (15 min)**
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Sandbox credentials configured
- [ ] Webhook URL configured (use ngrok)
- [ ] Browser dev tools open

### **Phase 2: Payment Method Tests (60 min)**
- [ ] GoPay payment
- [ ] ShopeePay payment
- [ ] QRIS payment
- [ ] Bank Transfer (BCA)
- [ ] Bank Transfer (Mandiri)
- [ ] Bank Transfer (BNI)
- [ ] Bank Transfer (BRI)
- [ ] Credit Card (success)
- [ ] Credit Card (denied)
- [ ] Indomaret
- [ ] Alfamart

### **Phase 3: Flow Tests (30 min)**
- [ ] Complete checkout flow
- [ ] Payment success flow
- [ ] Payment pending flow
- [ ] Payment failure flow
- [ ] Customer closes popup
- [ ] Customer reopens order

### **Phase 4: Webhook Tests (30 min)**
- [ ] Webhook receives notification
- [ ] Signature verification works
- [ ] Order status updates correctly
- [ ] Duplicate webhook handling
- [ ] Invalid signature rejection

### **Phase 5: Edge Cases (30 min)**
- [ ] Network timeout
- [ ] Invalid order data
- [ ] Duplicate order ID
- [ ] Amount mismatch
- [ ] Expired payment

---

## 🚀 Setup Testing Environment

### **Step 1: Start Backend with Logging**

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
🎣 Webhook URL: http://localhost:5000/api/webhooks/midtrans
```

---

### **Step 2: Setup ngrok for Webhook Testing**

```bash
# Install ngrok (if not installed)
npm install -g ngrok

# Create tunnel to your backend
ngrok http 5000
```

You'll get output like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5000
```

**Important:** Copy this URL!

---

### **Step 3: Configure Webhook in Midtrans**

1. Go to [Midtrans Dashboard](https://dashboard.sandbox.midtrans.com)
2. Click **Settings** → **Configuration**
3. Find **Notification URL** (Payment Notification URL)
4. Enter: `https://abc123.ngrok.io/api/webhooks/midtrans`
5. Click **Update**

✅ Now Midtrans can send webhooks to your local server!

---

### **Step 4: Start Frontend**

```bash
cd client
npm run dev
```

Open: http://localhost:5173

---

## 💳 Test Credit Card Payments

### **Test 1: Successful Payment**

**Steps:**
1. Add products to cart
2. Go to checkout
3. Fill customer info
4. Click "Bayar"
5. In Snap popup, choose **Credit Card**
6. Enter test card:
   ```
   Card Number: 4811 1111 1111 1114
   CVV: 123
   Exp Date: 01/25 (any future date)
   ```
7. Click **Pay**
8. Enter OTP: `112233`
9. Click **Submit**

**Expected Result:**
```
✅ onSuccess callback triggered
✅ Redirected to order confirmation
✅ Order status: "processing"
✅ Payment status: "settlement"
✅ Backend log shows webhook received
```

**Check Backend Logs:**
```
🔔 ========== WEBHOOK RECEIVED ==========
📊 Transaction Details:
   Order ID: ORD-1708857600000-123
   Status: settlement
   Payment Type: credit_card
   Amount: Rp 340000
   Transaction ID: test-12345
🔐 Verifying signature...
✅ Signature verified!
💰 Payment SUCCESSFUL!
✅ Order updated in database
========== WEBHOOK PROCESSED ==========
```

---

### **Test 2: Denied Payment**

**Steps:**
1. Repeat above but use denied card:
   ```
   Card Number: 4911 1111 1111 1113
   CVV: 123
   Exp Date: 01/25
   ```
2. Enter OTP: `112233`

**Expected Result:**
```
❌ onError callback triggered
❌ Error message displayed: "Pembayaran gagal"
❌ Order status remains "pending"
```

---

### **Test 3: 3DS Authentication Failure**

**Steps:**
1. Use card: `4911 1111 1111 1113`
2. Enter wrong OTP: `000000`

**Expected Result:**
```
❌ 3DS authentication failed
❌ Payment rejected
❌ Error callback triggered
```

---

## 📱 Test E-Wallet Payments

### **Test 4: GoPay Payment**

**Steps:**
1. In Snap popup, choose **GoPay**
2. Click **Continue**
3. Simulator shows QR code
4. Click **Bayar** button (simulates scanning + paying)

**Expected Result:**
```
✅ Payment immediately succeeds (in sandbox)
✅ onSuccess callback triggered
✅ Webhook received with payment_type: "gopay"
✅ Order status: "processing"
```

**GoPay Flow Diagram:**
```
Customer chooses GoPay
       ↓
QR code displayed (in production)
       ↓
Customer scans with GoPay app
       ↓
Confirm payment in app
       ↓
Webhook sent to your server
       ↓
Order status updated
```

---

### **Test 5: ShopeePay Payment**

**Steps:**
1. Choose **ShopeePay** in Snap
2. Click **Continue**
3. Click **Bayar** in simulator

**Expected Result:**
```
✅ Payment succeeds
✅ payment_type: "shopeepay"
✅ Webhook received
✅ Order updated
```

---

### **Test 6: QRIS Payment**

**Steps:**
1. Choose **QRIS**
2. Universal QR code displayed
3. Click **Bayar** in simulator

**Expected Result:**
```
✅ Works with any QRIS-enabled app
✅ GoPay, Dana, OVO, LinkAja, bank apps
✅ Same flow as above
```

---

## 🏦 Test Bank Transfer Payments

### **Test 7: BCA Virtual Account**

**Steps:**
1. Choose **Bank Transfer** → **BCA**
2. Virtual account number displayed
3. Copy VA number (e.g., 12345678901234)
4. In Midtrans dashboard, simulate payment:
   - Go to **Transactions**
   - Find your order
   - Click **Actions** → **Set Status** → **Settlement**

**Expected Result:**
```
⏳ Initially: payment_status = "pending"
⏳ Customer sees "Menunggu Pembayaran"
⏳ Instructions: "Transfer to VA: 12345678901234"

(After simulation)
✅ Webhook received: transaction_status = "settlement"
✅ Order status: "processing"
✅ Payment status: "settlement"
```

---

### **Test 8: Mandiri Bill Payment**

**Steps:**
1. Choose **Bank Transfer** → **Mandiri**
2. Bill payment code displayed (e.g., 123456789012)
3. Instructions shown: "Pay via ATM/M-Banking"
4. Simulate payment in dashboard

**Expected Result:**
```
⏳ Pending until customer pays
✅ After payment: webhook updates status
```

---

### **Test 9: Permata Virtual Account**

**Steps:**
1. Choose **Bank Transfer** → **Permata**
2. VA number displayed
3. Simulate payment

**Same flow as BCA test above.**

---

## 🏪 Test Convenience Store Payments

### **Test 10: Indomaret**

**Steps:**
1. Choose **Indomaret**
2. Payment code displayed
3. Customer brings code to Indomaret clerk
4. Simulate payment in dashboard

**Expected Result:**
```
⏳ Status: pending
📋 Payment code: ABC123456789
💰 Customer pays at store
✅ Webhook received after payment
```

---

### **Test 11: Alfamart**

**Same as Indomaret test.**

---

## 🔄 Test Payment Flows

### **Test 12: Complete Success Flow**

**Full End-to-End Test:**

```
1. Customer Journey:
   ├─ Browse products
   ├─ Add 3 items to cart
   ├─ View cart (verify items)
   ├─ Click "Checkout"
   ├─ Fill shipping info
   ├─ Verify order summary
   ├─ Click "Bayar"
   ├─ Snap popup opens
   ├─ Choose GoPay
   ├─ Complete payment
   ├─ Success callback
   └─ Redirected to confirmation

2. Backend Processing:
   ├─ POST /api/payment/create-transaction
   ├─ Order saved to Firestore
   ├─ Midtrans Snap token created
   ├─ Token returned to frontend
   ├─ Payment completed
   ├─ Webhook received
   ├─ Signature verified
   ├─ Order status updated
   └─ Confirmation displayed

3. Verify Database:
   ├─ Check Firestore orders collection
   ├─ Order exists with correct data
   ├─ Payment status: "settlement"
   ├─ Order status: "processing"
   ├─ Transaction ID saved
   └─ Webhook log saved
```

**Verification Checklist:**
- [ ] Order ID matches everywhere (frontend, backend, Midtrans)
- [ ] Amount correct (subtotal + shipping)
- [ ] Customer info saved correctly
- [ ] Items array complete
- [ ] Timestamps recorded
- [ ] No console errors

---

### **Test 13: Pending Payment Flow**

**Scenario:** Bank transfer pending

```
1. Choose Bank Transfer → BCA
2. VA number displayed
3. Click close on popup
4. onPending callback triggered
5. Redirected to confirmation
6. Status shows: "Menunggu Pembayaran"
7. Instructions displayed:
   "Silakan transfer ke VA: 12345678901234"
8. Customer can check status later
```

**Important UI Elements:**
- [ ] Clear payment instructions
- [ ] VA number easily copyable
- [ ] Deadline shown (usually 24 hours)
- [ ] "Check Status" button available

---

### **Test 14: Payment Failure Flow**

**Scenario:** Customer card declined

```
1. Use denied test card
2. Payment fails
3. onError callback triggered
4. Error message displayed
5. Customer remains on checkout page
6. Can retry with different payment method
```

**Error Handling Checklist:**
- [ ] User-friendly error message
- [ ] No technical error codes shown
- [ ] Suggests alternative payment methods
- [ ] Order not created in database (or marked as failed)
- [ ] Can retry without duplicating order

---

### **Test 15: Customer Closes Popup**

**Scenario:** Customer abandons payment

```
1. Click "Bayar"
2. Snap popup opens
3. Customer clicks X or ← back
4. onClose callback triggered
5. Alert: "Pembayaran dibatalkan"
6. Customer stays on checkout
7. Can click "Bayar" again
```

**Behavior Checklist:**
- [ ] No error shown (just info message)
- [ ] Order created but remains "pending"
- [ ] Can reopen payment with same order ID
- [ ] No duplicate orders created

---

## 🎣 Test Webhook Scenarios

### **Test 16: Webhook Signature Verification**

**Test Valid Signature:**

```bash
# Use Thunder Client or Postman
POST http://localhost:5000/api/webhooks/midtrans
Content-Type: application/json

{
  "transaction_time": "2024-02-25 10:30:00",
  "transaction_status": "settlement",
  "transaction_id": "test-123",
  "status_code": "200",
  "signature_key": "CALCULATE_VALID_SIGNATURE",
  "payment_type": "gopay",
  "order_id": "ORD-1708857600000-123",
  "gross_amount": "340000.00"
}
```

**Calculate signature:**
```javascript
const crypto = require('crypto');
const orderId = "ORD-1708857600000-123";
const statusCode = "200";
const grossAmount = "340000.00";
const serverKey = "YOUR_SERVER_KEY";

const hash = crypto
  .createHash('sha512')
  .update(orderId + statusCode + grossAmount + serverKey)
  .digest('hex');

console.log('Valid signature:', hash);
```

**Expected:**
```
✅ Signature verified
✅ Order updated
✅ 200 OK response
```

---

**Test Invalid Signature:**

```json
{
  "signature_key": "invalid_signature_12345",
  // ... other fields same
}
```

**Expected:**
```
❌ Signature verification FAILED
❌ 403 Forbidden response
❌ Order NOT updated
❌ Security log created
```

---

### **Test 17: Duplicate Webhook Handling**

**Scenario:** Midtrans sends same webhook twice

```
1. Process webhook for order ORD-123
2. Order status: pending → settlement
3. Receive same webhook again (retry)
4. Check: order already settlement
5. Skip processing (idempotent)
6. Return 200 OK (don't retry)
```

**Code check:**
```typescript
if (order.paymentStatus === 'settlement' && transaction_status === 'settlement') {
  console.log('⚠️ Already processed');
  return res.status(200).json({ message: 'Already processed' });
}
```

---

### **Test 18: All Transaction Statuses**

Test each status manually:

| Status | Scenario | Test Method |
|--------|----------|-------------|
| **pending** | Bank transfer not paid | Choose BCA, don't pay |
| **settlement** | Payment completed | Use GoPay, complete |
| **capture** | Card authorized | Credit card payment |
| **deny** | Payment rejected | Use denied test card |
| **cancel** | Customer cancelled | Choose bank transfer, let expire |
| **expire** | Payment deadline passed | Wait 24 hours (or simulate) |
| **refund** | Money returned | Manually create refund in dashboard |

---

## 🐛 Test Edge Cases

### **Test 19: Network Timeout**

**Simulate slow network:**

```typescript
// In backend controller, add delay
setTimeout(async () => {
  // ... create transaction logic
}, 5000); // 5 second delay
```

**Expected:**
- [ ] Loading indicator shows
- [ ] User can't click "Bayar" multiple times
- [ ] Eventually succeeds or shows timeout error
- [ ] Graceful error handling

---

### **Test 20: Invalid Order Amount**

**Test negative amount:**

```json
{
  "items": [{ "price": -100, "quantity": 1 }],
  "total": -100
}
```

**Expected:**
```
❌ 400 Bad Request
❌ Error: "Invalid order amount"
❌ Midtrans rejects (gross_amount must be positive)
```

---

### **Test 21: Duplicate Order ID**

**Test reusing order ID:**

```
1. Create order with ID: ORD-123
2. Try to create another order with ID: ORD-123
```

**Expected:**
```
❌ Midtrans error: "Duplicate order_id"
❌ Error message: "Pesanan sudah ada"
❌ Suggest refreshing page
```

---

### **Test 22: Amount Mismatch**

**Webhook has different amount:**

```json
{
  "order_id": "ORD-123",
  "gross_amount": "500000.00"
}
```

**But order total is 340000**

**Expected:**
```
⚠️ Amount mismatch warning logged
⚠️ Still process (but flag for review)
⚠️ Security alert sent to admin
```

---

## 📊 Monitoring & Debugging

### **Setup Debug Dashboard**

Create a simple admin page to view:

```typescript
// GET /api/admin/recent-orders
export const getRecentOrders = async (req: Request, res: Response) => {
  const orders = await db.collection('orders')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .get();
  
  const data = orders.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate()
  }));
  
  res.json(data);
};

// GET /api/admin/webhook-logs
export const getWebhookLogs = async (req: Request, res: Response) => {
  const logs = await db.collection('webhook_logs')
    .orderBy('processedAt', 'desc')
    .limit(50)
    .get();
  
  res.json(logs.docs.map(doc => doc.data()));
};
```

---

### **Check Logs Systematically**

**Backend Console Logs:**
```
✅ Green = Success
⏳ Yellow = Pending/Warning
❌ Red = Error
🔔 Bell = Webhook received
💰 Money = Payment event
```

**What to look for:**
- Order ID matches across all logs
- Timestamps are sequential
- Signature verification succeeds
- Database updates confirmed

---

### **Midtrans Dashboard Logs**

1. Go to **Transactions** tab
2. Click on transaction
3. Check:
   - Transaction status
   - Notification history (webhooks sent)
   - Payment details
   - Timeline of events

---

## ✅ Pre-Production Testing Checklist

Before switching to production:

**Technical Checks:**
- [ ] All payment methods tested
- [ ] Webhooks working reliably
- [ ] Error handling tested
- [ ] Edge cases handled
- [ ] Database transactions atomic
- [ ] Logs are comprehensive
- [ ] No sensitive data logged
- [ ] Performance tested (concurrent orders)

**Security Checks:**
- [ ] Signature verification never skipped
- [ ] API keys not exposed in frontend
- [ ] HTTPS only in production
- [ ] Input validation on all fields
- [ ] Amount tampering prevented
- [ ] SQL injection protected (N/A for Firestore)
- [ ] XSS protection enabled

**Business Logic Checks:**
- [ ] Correct amounts calculated
- [ ] Shipping costs accurate
- [ ] Product stock managed
- [ ] Order status flow correct
- [ ] Customer notifications sent
- [ ] Refund process works

**User Experience Checks:**
- [ ] Mobile responsive
- [ ] Clear error messages
- [ ] Loading states shown
- [ ] Payment instructions clear
- [ ] Confirmation page informative
- [ ] Email receipts sent

---

## 🚀 Load Testing

### **Test Concurrent Orders**

Use [Artillery](https://www.artillery.io/) or similar:

```yaml
# artillery-config.yml
config:
  target: "http://localhost:5000"
  phases:
    - duration: 60
      arrivalRate: 5 # 5 orders per second

scenarios:
  - name: "Create order"
    flow:
      - post:
          url: "/api/payment/create-transaction"
          json:
            items: [...]
            customer: [...]
            total: 340000
```

Run:
```bash
artillery run artillery-config.yml
```

**Check:**
- [ ] Server handles load (<1s response time)
- [ ] No duplicate order IDs
- [ ] All webhooks processed
- [ ] Database writes succeed

---

## 💡 Testing Pro Tips

### **Tip 1: Automate Common Tests**

```typescript
// test/payment.test.ts
describe('Payment Integration', () => {
  it('should create transaction successfully', async () => {
    const response = await fetch('/api/payment/create-transaction', {
      method: 'POST',
      body: JSON.stringify(testOrderData)
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
    expect(data.orderId).toMatch(/^ORD-/);
  });
  
  it('should verify webhook signature', () => {
    const isValid = verifySignature(
      'ORD-123', '200', '340000', validSignature
    );
    expect(isValid).toBe(true);
  });
});
```

---

### **Tip 2: Create Test Data Factory**

```typescript
// test/factories/orderFactory.ts
export const createTestOrder = (overrides = {}) => ({
  items: [
    {
      id: 'prod-1',
      name: 'Lavender Oil',
      price: 110000,
      quantity: 2
    }
  ],
  customer: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '08123456789'
  },
  shipping: {
    address: 'Test Address',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    method: 'JNE Regular',
    cost: 15000
  },
  total: 235000,
  ...overrides
});
```

---

### **Tip 3: Use Midtrans Postman Collection**

Midtrans provides official Postman collection:

1. Download from [midtrans.com/developers](https://midtrans.com/developers)
2. Import to Postman
3. Set environment variables (server key, etc.)
4. Test all API endpoints directly

---

## 🎯 What's Next?

Testing complete! Ready for production! 🚀

**Next steps:**
1. ✅ All tests passing
2. 📝 **Next guide:** `08-go-live-checklist.md`
3. 🔐 Switch to production credentials
4. 🌍 Deploy to real server
5. 💰 Accept real payments!

---

**Testing complete!** 🧪✅

**Next Guide:** [`08-go-live-checklist.md` →](08-go-live-checklist.md)
