# 💳 Midtrans Payment Integration - Development Plan

**Project:** Annise Herbal E-Commerce Backend  
**Feature:** Midtrans Snap Payment Gateway  
**Created:** March 9, 2026  
**Status:** 🟡 IN PROGRESS

---

## 🎯 Integration Goal

Add Midtrans payment gateway to existing order system:
- ✅ Already have: Order creation, validation, product fetching, pricing
- 🎯 Need to add: Payment token generation, webhook handler, order status updates

---

## 📋 Development Phases

### **Phase 1: Setup & Configuration** ⏱️ 30 minutes

**Goal:** Get Midtrans credentials and install SDK

#### Tasks:
- [ ] Register Midtrans account at https://dashboard.midtrans.com/register
- [ ] Complete business verification (KTP/NPWP)
- [ ] Get Sandbox Server Key
- [ ] Get Sandbox Client Key
- [ ] Install `midtrans-client` package
- [ ] Add environment variables to `.env`

#### Environment Variables:
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false
```

#### Installation Command:
```bash
npm install midtrans-client
npm install --save-dev @types/midtrans-client
```

---

### **Phase 2: Backend Integration** ⏱️ 2-3 hours

**Goal:** Integrate Midtrans into existing order creation system

#### 2.1 Create Midtrans Config (15 min)
**File:** `server/src/config/midtrans.ts`

**Purpose:** Initialize Midtrans Snap client with credentials

**What to code:**
- Import midtrans-client
- Export configured Snap instance
- Add TypeScript types

---

#### 2.2 Create Midtrans Helpers (30 min)
**File:** `server/src/utils/midtransHelpers.ts`

**Functions to create:**
1. `buildMidtransTransaction(order, customer, items)`
   - Format order data for Midtrans API
   - Structure: transaction_details, customer_details, item_details
   
2. `generatePaymentToken(transactionData)`
   - Call Midtrans Snap API
   - Return token and redirect URL

**Purpose:** Helper functions for payment token generation

---

#### 2.3 Modify Order Controller (45 min)
**File:** `server/src/controllers/orderControllers.ts`

**Changes to `createOrder()` function:**

**Current flow:**
1. Validate request ✅
2. Fetch products ✅
3. Build order document ✅
4. Save to Firestore ✅
5. Return success response ✅

**New flow (add steps 5-7):**
1. Validate request ✅
2. Fetch products ✅
3. Build order document ✅
4. Save to Firestore ✅
5. **Build Midtrans transaction** 🆕
6. **Generate payment token** 🆕
7. **Return token + order data** 🆕

**Response format:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "ord_1234567890_abc",
  "orderNumber": "ORD-2026-0001",
  "midtransToken": "xxxxx-xxxxx-xxxxx",
  "redirectUrl": "https://app.sandbox.midtrans.com/snap/v2/...",
  "amount": 210000
}
```

---

#### 2.4 Create Webhook Controller (60 min)
**File:** `server/src/controllers/webhookController.ts`

**Function:** `handleMidtransNotification(req, res)`

**Purpose:** Receive payment confirmation from Midtrans

**Flow:**
1. Receive notification from Midtrans
2. Verify signature (security check)
3. Extract order_id and transaction_status
4. Update order in Firestore:
   - Set status: "paid" or "failed"
   - Add transaction_id
   - Add payment_time
   - Add payment_type
5. Return 200 OK to Midtrans

**Transaction Status Mapping:**
- `settlement` → Order status: "paid"
- `pending` → Order status: "pending_payment"
- `deny` / `cancel` / `expire` → Order status: "failed"

---

#### 2.5 Create Webhook Route (15 min)
**File:** `server/src/routes/webhook.ts`

**Route:** `POST /api/webhook/midtrans`

**Code:**
```typescript
import express from 'express';
import { handleMidtransNotification } from '../controllers/webhookController';

const router = express.Router();

router.post('/midtrans', handleMidtransNotification);

export default router;
```

---

#### 2.6 Register Webhook Route (5 min)
**File:** `server/src/index.ts`

**Add:**
```typescript
import webhookRoutes from './routes/webhook';
app.use('/api/webhook', webhookRoutes);
```

---

### **Phase 3: Frontend Integration** ⏱️ 1-2 hours

**Goal:** Add Midtrans Snap popup to checkout page

#### 3.1 Add Snap Script (10 min)
**File:** `client/index.html`

**Add before `</head>`:**
```html
<script 
  src="https://app.sandbox.midtrans.com/snap/snap.js" 
  data-client-key="YOUR_CLIENT_KEY_HERE">
</script>
```

---

#### 3.2 Modify Checkout Page (60 min)
**File:** `client/src/pages/CheckoutPage.tsx`

**Changes:**

1. **Update order submission function:**
   - Call `POST /api/orders` with order data
   - Receive `midtransToken` in response
   - Open Snap popup with token

2. **Add Snap popup handler:**
   ```typescript
   window.snap.pay(midtransToken, {
     onSuccess: (result) => {
       // Show success message
       // Redirect to confirmation page
     },
     onPending: (result) => {
       // Show pending message
     },
     onError: (result) => {
       // Show error message
     },
     onClose: () => {
       // User closed popup
     }
   });
   ```

3. **Handle payment results:**
   - Success → Show confirmation
   - Pending → Show waiting message
   - Error → Show error and allow retry

---

### **Phase 4: Testing** ⏱️ 1 hour

**Goal:** Test complete payment flow in sandbox mode

#### Test Cases:

1. **Successful Payment Flow**
   - [ ] Create order → Receive token
   - [ ] Open Snap popup
   - [ ] Use test card: `4811 1111 1111 1114`
   - [ ] Complete payment
   - [ ] Verify webhook receives notification
   - [ ] Check order status = "paid" in Firestore

2. **Failed Payment**
   - [ ] Use test card: `4911 1111 1111 1113` (deny)
   - [ ] Verify order status = "failed"

3. **Different Payment Methods**
   - [ ] Test GoPay
   - [ ] Test QRIS
   - [ ] Test ShopeePay
   - [ ] Test Bank Transfer

4. **Error Scenarios**
   - [ ] User closes popup → Nothing breaks
   - [ ] Network error → Show friendly message
   - [ ] Invalid token → Handle gracefully

---

### **Phase 5: Production Deployment** ⏱️ 30 minutes

**Goal:** Switch to production and go live

#### Checklist:

1. **Get Production Credentials**
   - [ ] Complete Midtrans verification
   - [ ] Get Production Server Key
   - [ ] Get Production Client Key

2. **Update Environment Variables**
   ```env
   MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxxxxxxx
   MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxxxxxxx
   MIDTRANS_IS_PRODUCTION=true
   ```

3. **Update Frontend Script**
   ```html
   <script src="https://app.midtrans.com/snap/snap.js"></script>
   ```

4. **Configure Webhook URL in Midtrans Dashboard**
   - URL: `https://yourdomain.com/api/webhook/midtrans`

5. **Test Small Transaction**
   - [ ] Create real order with minimum amount
   - [ ] Complete real payment
   - [ ] Verify everything works

6. **Monitor First Orders**
   - [ ] Watch Firestore for order updates
   - [ ] Check Midtrans dashboard
   - [ ] Verify emails are sent

---

## 📁 File Structure

Files to create/modify:

```
server/
├── src/
│   ├── config/
│   │   └── midtrans.ts              🆕 CREATE
│   ├── controllers/
│   │   ├── orderControllers.ts      ✏️ MODIFY
│   │   └── webhookController.ts     🆕 CREATE
│   ├── routes/
│   │   └── webhook.ts               🆕 CREATE
│   ├── utils/
│   │   └── midtransHelpers.ts       🆕 CREATE
│   └── index.ts                     ✏️ MODIFY (register webhook route)
│
client/
├── index.html                        ✏️ MODIFY (add Snap script)
└── src/
    └── pages/
        └── CheckoutPage.tsx          ✏️ MODIFY (add payment popup)
```

---

## 🔄 Updated Order Flow

### Before (Current):
```
User fills checkout form
   ↓
Frontend: POST /api/orders
   ↓
Backend: Validate → Fetch products → Save to Firestore
   ↓
Frontend: Show success message
   ↓
END (No payment yet!)
```

### After (With Midtrans):
```
User fills checkout form
   ↓
Frontend: POST /api/orders
   ↓
Backend: Validate → Fetch products → Save to Firestore → Generate payment token
   ↓
Frontend: Receives token → Opens Snap popup
   ↓
User: Completes payment in popup
   ↓
Midtrans: Sends webhook to backend
   ↓
Backend: Updates order status to "paid"
   ↓
Midtrans: Sends confirmation email to customer
   ↓
Admin: Receives notification → Books courier
   ↓
END
```

---

## 🎯 Learning Approach

Following your preferred style: **Step-by-step with guidance**

1. I'll show you ONE file at a time
2. You implement it yourself
3. We test together
4. Move to next file
5. Fix bugs as we go

**Not showing full code** - giving you:
- Function names
- What each part does
- TypeScript types
- Comments/guidance

---

## 📊 Progress Tracking

### Phase 1: Setup
- [ ] Midtrans account created
- [ ] Credentials obtained
- [ ] Package installed
- [ ] Environment variables added

### Phase 2: Backend
- [ ] Config file created
- [ ] Helpers created
- [ ] Order controller modified
- [ ] Webhook controller created
- [ ] Webhook route created
- [ ] Route registered
- [ ] Tested in Postman

### Phase 3: Frontend
- [ ] Snap script added
- [ ] CheckoutPage modified
- [ ] Payment popup working
- [ ] Success handler working
- [ ] Error handler working

### Phase 4: Testing
- [ ] Successful payment tested
- [ ] Failed payment tested
- [ ] Webhook verified
- [ ] Order status updates confirmed
- [ ] Different payment methods tested

### Phase 5: Production
- [ ] Production credentials
- [ ] Environment updated
- [ ] Webhook URL configured
- [ ] First test transaction
- [ ] Monitoring setup

---

## 🐛 Common Issues to Watch For

1. **CORS errors on webhook** → Add webhook route before CORS middleware
2. **Signature verification fails** → Check Server Key is correct
3. **Popup doesn't open** → Check Client Key in HTML script
4. **Order status not updating** → Check webhook URL is publicly accessible
5. **TypeScript errors** → Install type definitions: `@types/midtrans-client`

---

## 📚 Resources

- **Midtrans Docs:** https://docs.midtrans.com/
- **Snap API:** https://snap-docs.midtrans.com/
- **Test Cards:** https://docs.midtrans.com/en/technical-reference/sandbox-test
- **Your payment guides:** `server/learn/payment-system-indonesia/`

---

## 👨‍💻 Next Session Tasks

**When ready to start:**
1. Tell me your Midtrans account status
2. We'll begin with Phase 1 (Setup)
3. Then move to Phase 2 (Backend code)
4. Step-by-step implementation

**Remember:** Learning by doing, not copying!

---

**Created:** March 9, 2026  
**Last Updated:** March 9, 2026  
**Status:** Planning complete, ready to implement
