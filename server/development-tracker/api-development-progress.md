# 🚀 API Development Progress Tracker

**Project:** Annise Herbal E-Commerce Backend  
**Started:** February 25, 2026  
**Last Updated:** March 10, 2026

---

## 📊 Overview

This document tracks the development progress of all API endpoints for the Annise Herbal e-commerce platform.

**Current Status:**
- 🟢 Completed: 6/12 endpoints (Midtrans payment integration complete!)
- 🟡 In Progress: 0/12 endpoints
- ⚪ Not Started: 4/12 endpoints
- ❌ Skipped: 2/12 endpoints (not needed for current workflow)

---

## ✅ Phase 1: Core Product APIs (Priority: HIGH)

### 1. Get All Products
- **Status:** 🟢 COMPLETED
- **Endpoint:** `GET /api/products`
- **Controller:** `productsController.ts` → `getAllProducts()`
- **Features:**
  - ✅ Fetches all products from Firestore
  - ✅ Nested structure: `products/{category}/{size}/{productId}`
  - ✅ Returns array with category and size info
  - ✅ Error handling implemented
- **Tested:** ✅ Yes
- **Notes:** Working well for ~50 products. Frontend filtering recommended.

---

### 2. Get Single Product by ID
- **Status:** 🟢 COMPLETED
- **Endpoint:** `GET /api/products/:category/:size/:id`
- **Controller:** `productsController.ts` → `getProductById()`
- **Purpose:** Fetch individual product details for product detail page
- **Features:**
  - ✅ Fetches single product from Firestore path
  - ✅ URL parameters: category, sizeName, productId
  - ✅ Returns 404 if product not found
  - ✅ Helpful error messages
  - ✅ TypeScript type safety with ProductParams interface
  - ✅ Error handling implemented
- **Tested:** 🟢 COMPLETED
- **Completed:** February 26, 2026
- **Testing Guide:** See [postman-testing-guide.md](postman-testing-guide.md)
- **Response Example:**
  ```json
  {
    "success": true,
    "data": {
      "id": "prod-001",
      "name": "Max Pain Relief Oil",
      "price": 185000,
      "category": "pain-relief",
      "sizeName": "100ml",
      "description": "...",
      "benefits": [...],
      "composition": "...",
      "usage": "...",
      "images": [...]
    }
  }
  ```
- **Notes:** 
  - Best for direct product access (SEO-friendly URLs)
  - Faster than loading all products for single view
  - Use alongside getAllProducts() for optimal UX

---

### 3. Search Products dont need i guess for now comments by ANOOP
- **Status:** ⚪ NOT STARTED
- **Endpoint:** `GET /api/products/search?q=keyword`
- **Purpose:** Allow customers to search products by name/keyword
- **Query Parameters:**
  - `q` (string): Search keyword
- **Logic:**
  - Search in product name (case-insensitive)
  - Optional: Search in description/benefits too
  - Return matching products array
- **Response Example:**
  ```json
  {
    "query": "pain relief",
    "count": 3,
    "results": [...]
  }
  ```
- **Estimated Time:** 20 minutes
- **Notes:** Could use frontend filtering for now (50 products), implement backend search later if needed

---

### 4. Filter Products dont need i guess for now comments by ANOOP
- **Status:** ⚪ NOT STARTED
- **Endpoint:** `GET /api/products/filter?category=pain-relief&size=100ml&minPrice=50000&maxPrice=200000`
- **Purpose:** Filter products by category, size, price range
- **Query Parameters:**
  - `category` (string, optional): Filter by category
  - `size` (string, optional): Filter by size
  - `minPrice` (number, optional): Minimum price
  - `maxPrice` (number, optional): Maximum price
- **Logic:**
  - Apply filters to product list
  - Return filtered array
- **Estimated Time:** 25 minutes
- **Notes:** Frontend filtering is sufficient for current product count

---

## 📝 Phase 2: Customer Interaction APIs (Priority: HIGH)

### 5. Contact Form Submission

- **Status:** � COMPLETED
- **Endpoint:** `POST /api/contact`
- **Controller:** `contactControllers.ts` → `submitContactForm()`
- **Purpose:** Handle customer inquiries from contact page
- **Completed:** February 28, 2026
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "08123456789",
    "message": "Inquiry about products..."
  }
  ```

- **Features:**
  - ✅ Validate input (name 2-100 chars, email format, phone 10-15 digits, message 10-2000 chars)
  - ✅ Save to Firestore `contacts/{contactId}` collection
  - ✅ Phone number cleaning (removes non-digits)
  - ✅ Email format validation with regex
  - ✅ Comprehensive error messages
  - ⏳ Send email notification to admin (Phase 4)
  - ⏳ Send auto-reply to customer (Phase 4)
- **Response:**

  ```json
  {
    "success": true,
    "message": "Thank you for contacting us! We'll respond within 24 hours.",
    "contactId": "contact_1709145600000_abc123"
  }
  ```

- **Tested:** ✅ Yes (Postman - all validation working)
- **Database Structure:**

  ```
  contacts/
  └── {contactId}/
      ├── name: string
      ├── email: string
      ├── phone: number (cleaned digits only)
      ├── message: string
      ├── status: "new" (default)
      ├── replied: boolean (default: false)
      └── createdAt: timestamp
  ```

- **Documentation:** See [api-contact.md](../documentation/api-contact.md)
- **Next:** Email integration with Brevo (Phase 4)

---

### 6. Newsletter Subscription

- **Status:** � COMPLETED
- **Endpoint:** `POST /api/newsletter/subscribe`
- **Controller:** `newsletterController.ts` → `subscribeToNewsletter()`
- **Purpose:** Collect email subscribers (simplified email-only approach)
- **Completed:** February 28, 2026
- **Request Body:**

  ```json
  {
    "email": "customer@email.com"
  }
  ```

- **Features:**
  - ✅ Validate email format (regex pattern)
  - ✅ Email normalization (lowercase for consistency)
  - ✅ Duplicate prevention (checks existing emails)
  - ✅ Privacy-focused (friendly duplicate response)
  - ✅ Save to Firestore `newsletter_subscribers/{subscriberId}`
  - ✅ Generated unique subscriber IDs
  - ⏳ Send welcome email (Phase 4 with Brevo)
- **Response:**

  ```json
  {
    "success": true,
    "message": "Thank you for subscribing to our newsletter!"
  }
  ```

- **Tested:** ⏳ Ready for testing (implementation complete)
- **Database Structure:**

  ```
  newsletter_subscribers/
  └── {subscriberId}/
      ├── id: string (sub_{timestamp}_{random})
      ├── email: string (normalized lowercase)
      ├── subscribedAt: timestamp
      ├── isActive: boolean (default: true)
      └── source: string (optional, e.g., "homepage")
  ```

- **Design Decision:** Email-only subscription for better conversion and simpler MVP
- **Next:** Test in Postman, then email integration with Brevo (Phase 4)

---

## 📦 Phase 3: Order Management & Payment Integration

**Workflow:**
1. User completes checkout → Creates order in Firestore
2. Midtrans processes payment → Sends email confirmation
3. Admin receives payment notification → Manually books courier
4. Courier company provides tracking → Customer tracks via courier system

**Note:** No user dashboard needed - Midtrans email + courier tracking is sufficient

### 7. Create Order + Midtrans Payment Integration
- **Status:** 🟢 COMPLETED (Full payment integration with Midtrans Snap)
- **Endpoint:** `POST /api/orders`
- **Controller:** `orderControllers.ts` → `createOrder()`
- **Completed:** March 10, 2026
- **Features Completed:**
  - ✅ Complete order validation (13 validators)
  - ✅ Product fetching from Firestore (security: prices from database)
  - ✅ Price calculation (subtotal, shipping, discount, total)
  - ✅ Order document building with unique IDs
  - ✅ Save to Firestore `orders/{orderId}`
  - ✅ Idempotency key for duplicate prevention
  - ✅ Phone number normalization (08xxx → +628xxx)
  - ✅ **Midtrans Snap API integration** (payment token generation)
  - ✅ **Midtrans transaction builder** (formats order data for payment gateway)
  - ✅ **Webhook handler** for payment confirmation (`handleMidtransNotification`)
  - ✅ **Automatic order status update** (pending → paid after successful payment)
  - ✅ Dual status tracking (top-level `status` + `payment.status`)
- **Midtrans Configuration:**
  - Config: `server/src/config/midtrans.ts`
  - Helpers: `server/src/utils/midtransHelpers.ts`
  - Webhook Controller: `server/src/controllers/webhookController.ts`
  - Webhook Route: `POST /api/webhook/midtrans`
  - Environment: Sandbox (testing mode)
- **Request Body:**
  ```json
  {
    "customer": {
      "name": "John Doe",
      "email": "john@email.com",
      "phone": "08123456789"
    },
    "items": [
      {
        "productPath": "products/pain-relief/sizes/100ml/products/{id}",
        "quantity": 2
      }
    ],
    "shippingDetails": {
      "address": "Jl. Example 123",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "postalCode": "12345",
      "shippingMethod": "standard"
    },
    "paymentMethod": "gopay",
    "idempotencyKey": "unique-key-123"
  }
  ```
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Order created successfully!",
    "data": {
      "orderId": "order_1710061234567_abc123",
      "orderNumber": "ORD-2026-0002",
      "midtransToken": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
      "redirectUrl": "https://app.sandbox.midtrans.com/snap/v3/...",
      "total": 3145000,
      "status": "pending"
    }
  }
  ```
- **Payment Flow:**
  1. Order created → Returns `midtransToken` and `redirectUrl`
  2. Frontend opens Snap popup with token
  3. User completes payment
  4. Midtrans sends notification to webhook
  5. Webhook updates order status to "paid"
- **Tested:** ✅ Yes (Postman - order creation, payment token, webhook all working)
- **Notes:** 
  - 850+ lines of code, 10+ bugs fixed during development
  - Shipping cost properly added to Midtrans item_details for validation
  - Sandbox test cards: 4811 1111 1111 1114 (success), 4911 1111 1111 1113 (deny)

---

### 7.1. Midtrans Payment Webhook
- **Status:** 🟢 COMPLETED
- **Endpoint:** `POST /api/webhook/midtrans`
- **Controller:** `webhookController.ts` → `handleMidtransNotification()`
- **Purpose:** Receive payment notifications from Midtrans and update order status
- **Completed:** March 10, 2026
- **Features:**
  - ✅ Receives payment notification from Midtrans servers
  - ✅ Extracts transaction data (order_id, transaction_status, transaction_id, payment_type)
  - ✅ Updates order status to "paid" when transaction_status is "settlement"
  - ✅ Updates both `status` and `payment.status` fields (dual tracking)
  - ✅ Returns 200 OK to Midtrans (prevents retry loop)
  - ✅ Error handling with try-catch
  - ✅ Console logging for debugging
- **Request Body (from Midtrans):**
  ```json
  {
    "order_id": "order_1710061234567_abc123",
    "transaction_status": "settlement",
    "transaction_id": "test-trans-123",
    "payment_type": "bank_transfer"
  }
  ```
- **Logic:**
  - If `transaction_status === "settlement"` → Update order to "paid"
  - Otherwise → Return 200 OK without updating (order stays "pending")
- **Tested:** ✅ Yes (Postman simulation successful, status updated in Firestore)
- **Security Note:** Webhook should be secured with signature verification in production
- **Next Steps:** 
  - Configure webhook URL in Midtrans dashboard (use ngrok for local testing)
  - Add signature verification for production security

---

### 8. Get Order by ID ❌ NOT NEEDED
- **Status:** ⚪ SKIPPED (Not implementing)
- **Endpoint:** `GET /api/orders/:orderId` (not implemented)
- **Original Purpose:** Display order tracking page
- **Why Skipped:** 
  - ✅ Midtrans sends order confirmation emails directly to customers
  - ✅ Courier company provides tracking via their system
  - ✅ No user dashboard or "My Orders" page planned
  - ✅ Orders processed manually after payment confirmation
- **Notes:** Simpler workflow - email confirmation + courier tracking is sufficient

---

### 9. Get Customer Orders ❌ NOT NEEDED
- **Status:** ⚪ SKIPPED (Not implementing)
- **Endpoint:** `GET /api/orders?email=customer@email.com` (not implemented)
- **Original Purpose:** Display customer order history
- **Why Skipped:**
  - ✅ No user account/dashboard system
  - ✅ Customers receive order details via Midtrans email
  - ✅ Order tracking handled by courier company
- **Notes:** May add later if user accounts are implemented

---

## 📧 Phase 4: Email Integration with Brevo (Priority: HIGH)

**Status:** ⏳ STARTING TOMORROW (February 29, 2026)

**Overview:** Integrate Brevo (formerly Sendinblue) email service for automated emails

**Tasks:**
1. **Contact Form Emails**
   - Admin notification when form submitted
   - Customer confirmation email (auto-reply)

2. **Newsletter Welcome Email**
   - Automated welcome email on subscription
   - Branded template

3. **Unsubscribe Functionality**
   - DELETE endpoint or update `isActive: false`
   - Unsubscribe link in emails

4. **Email Templates**
   - Professional HTML email templates
   - Consistent branding

**Estimated Time:** 2-3 hours

**Environment Variables Needed:**
```env
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=noreply@anniseherbal.com
BREVO_SENDER_NAME=Annise Herbal
ADMIN_EMAIL=anisherbal@gmail.com
```

---

## 🎨 Phase 5: Content Management (Priority: MEDIUM)

### 10. Education/Blog Articles API
- **Status:** ⚪ NOT STARTED
- **Endpoints:**
  - `GET /api/articles` - List all articles
  - `GET /api/articles/:slug` - Get single article
  - `POST /api/articles` - Create article (admin only)
  - `PUT /api/articles/:slug` - Update article (admin only)
  - `DELETE /api/articles/:slug` - Delete article (admin only)
- **Purpose:** Manage educational content for Resources page
- **Estimated Time:** 45 minutes
- **Database Structure:**

  ```
  articles/
  └── {articleId}/
      ├── slug: string (url-friendly)
      ├── title: string
      ├── excerpt: string
      ├── content: string (markdown)
      ├── category: string
      ├── author: string
      ├── images: array
      ├── publishedAt: timestamp
      ├── updatedAt: timestamp
      └── isPublished: boolean
  ```

---

## 🔐 Phase 6: Admin & Analytics (Priority: LOW)

### 11. Admin Dashboard Stats
- **Status:** ⚪ NOT STARTED
- **Endpoint:** `GET /api/admin/stats`
- **Features:**
  - Total products
  - Total orders (today, this week, this month)
  - Revenue stats
  - Popular products
  - Recent orders
- **Estimated Time:** 30 minutes

---

### 12. Product Views Tracking
- **Status:** ⚪ NOT STARTED
- **Endpoint:** `POST /api/analytics/view`
- **Purpose:** Track which products are viewed most
- **Notes:** Could use Google Analytics instead

---

## 📝 Next Steps

**✅ Completed (Phase 1-3):**
1. ✅ Get All Products API
2. ✅ Get Single Product API (for product detail page)
3. ✅ Contact Form API (customer inquiries)
4. ✅ Newsletter Subscription API (email-only, simplified)
5. ✅ Create Order API (full order processing)
6. ✅ **Midtrans Payment Integration** (Snap API + Webhook)
7. ✅ Comprehensive API Documentation
8. ✅ Validation System Architecture

**🔥 Next Priority (Frontend Integration):**
1. Implement Midtrans Snap popup on checkout page
2. Handle payment success/failure callbacks
3. Display payment confirmation to users
4. Test end-to-end payment flow

**Phase 4 - Email Integration (Following Priority):**
1. Test Newsletter API in Postman
2. Setup Brevo email service
3. Contact form email notifications
4. Newsletter welcome emails
5. Unsubscribe functionality

**Short Term (Next 2 Weeks):**
6. Search & Filter APIs (better UX)
7. Admin dashboard basics
8. Product recommendations

**Long Term (After Payment System):**
9. Configure production Midtrans credentials
10. Deploy to production environment
11. Reviews/ratings system
12. Analytics dashboard

---

## 🛠️ Technical Notes

### Current Tech Stack:
- **Backend:** Express.js + TypeScript
- **Database:** Firebase Firestore
- **Authentication:** Firebase Admin SDK
- **Email:** Need to setup (Nodemailer or SendGrid)

### Firestore Structure:
```
annise-herbal/
├── products/
│   ├── {category}/
│   │   └── {size}/
│   │       └── {productId}/
│   │           └── (product fields)
├── contacts/
│   └── {contactId}/
├── subscribers/
│   └── {subscriberId}/
├── orders/ (future)
│   └── {orderId}/
└── articles/ (future)
    └── {articleId}/
```

### Environment Variables Needed:
```env
# Current
PORT=5000
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# Midtrans Payment Gateway (✅ Configured)
MIDTRANS_SERVER_KEY=Mid-server-...
MIDTRANS_CLIENT_KEY=Mid-client-...
MERCHANT_ID=M...
MIDTRANS_IS_PRODUCTION=false

# To Add (Email Integration)
EMAIL_SERVICE=gmail
EMAIL_USER=anisherbal@gmail.com
EMAIL_PASSWORD=app_specific_password
ADMIN_EMAIL=anisherbal@gmail.com
```

---

## 📊 Time Estimates

| Phase | Estimated Time | Actual Time |
|-------|---------------|-------------|
| Phase 1: Products | 60 min | ___ |
| Phase 2: Customer | 50 min | ___ |
| Phase 3: Orders | 90 min | (After payment) |
| Phase 4: Content | 45 min | ___ |
| Phase 5: Admin | 30 min | ___ |
| **Total** | **4.5 hours** | ___ |

---

## 🐛 Known Issues & TODOs

- [ ] Add rate limiting to prevent spam on contact form
- [ ] Add input sanitization for XSS prevention
- [ ] Setup email service (Nodemailer/Brevo)
- [ ] Add request validation middleware
- [ ] Add API documentation (Swagger/Postman)
- [ ] Add unit tests for controllers
- [ ] Setup error logging (Winston or Sentry)
- [x] **Midtrans payment integration** ✅ COMPLETED
- [ ] Frontend Snap popup integration
- [ ] Midtrans webhook signature verification (production security)
- [ ] Production Midtrans credentials configuration

---

## 📖 Learning Resources Used

- [Express.js Documentation](https://expressjs.com/)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Server learning guides: `server/learn/`
- **API Testing Guide:** [postman-testing-guide.md](postman-testing-guide.md) ⭐ NEW!

---

**Last Reviewed:** February 28, 2026  
**Next Review:** After Phase 4 (Email Integration) - March 1, 2026

---

## 🎯 Session Summary (February 28, 2026)

**What We Completed Today:**
- ✅ Contact Form API - Fully tested and working
- ✅ Newsletter Subscription API - Email-only implementation (ready for testing)
- ✅ Comprehensive API documentation (5 files)
- ✅ Code review and improvements (duplicate prevention, email normalization)
- ✅ Database design decisions (email as ID vs generated ID)
- ✅ Validation system architecture

**Key Technical Decisions:**
- Used generated IDs for newsletter subscribers (flexibility for future features)
- Email normalization (lowercase) to prevent duplicate subscriptions
- Backend validation only (security-first approach)
- Email-only newsletter for better conversion

**Tomorrow's Focus:**
- Phase 4: Brevo email integration
- Test newsletter API
- Setup automated emails
