# 🚀 API Development Progress Tracker

**Project:** Annise Herbal E-Commerce Backend  
**Started:** February 25, 2026  
**Last Updated:** February 26, 2026

---

## 📊 Overview

This document tracks the development progress of all API endpoints for the Annise Herbal e-commerce platform.

**Current Status:**
- 🟢 Completed: 2/10 endpoints
- 🟡 In Progress: 0/10 endpoints
- ⚪ Not Started: 8/10 endpoints

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

- **Status:** 🟡  working in progress just waiting on bravo to get this done
- **Endpoint:** `POST /api/contact`
- **Purpose:** Handle customer inquiries from contact page
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "contact": "john@email.com or 08123456789",
    "message": "Inquiry about products..."
  }
  ```

- **Features Needed:**
  - ✅ Validate input (name, contact, message required)
  - ✅ Save to Firestore `contacts` collection
  - ✅ Send email notification to admin
  - ✅ Send auto-reply to customer
  - ✅ Return success/error response
- **Response:**

  ```json
  {
    "success": true,
    "message": "Pesan Anda telah diterima. Kami akan menghubungi Anda segera.",
    "contactId": "contact-xyz"
  }
  ```

- **Estimated Time:** 30 minutes (including email setup)
- **Database Structure:**

  ```contacts/
  └── {contactId}/
      ├── name: string
      ├── contact: string (email or phone)
      ├── message: string
      ├── status: "new" | "replied" | "closed"
      ├── createdAt: timestamp
      └── repliedAt: timestamp (optional)
  ```

- **Notes:** Need to setup email service (Nodemailer with Gmail or SendGrid)

---

### 6. Newsletter Subscription

- **Status:** 🟡  working in progress just waiting on bravo to get this done
- **Endpoint:** `POST /api/newsletter/subscribe`
- **Purpose:** Collect email subscribers
- **Request Body:**

  ```json
  {
    "email": "customer@email.com",
    "name": "John Doe" (optional)
  }
  ```

- **Features:**
  - ✅ Validate email format
  - ✅ Check if email already subscribed (prevent duplicates)
  - ✅ Save to Firestore `subscribers` collection
  - ✅ Send welcome email
- **Response:**

  ```json
  {
    "success": true,
    "message": "Terima kasih telah berlangganan!"
  }
  ```

- **Estimated Time:** 20 minutes
- **Database Structure:**

  ```
  subscribers/
  └── {subscriberId}/
      ├── email: string (unique)
      ├── name: string (optional)
      ├── subscribedAt: timestamp
      └── isActive: boolean
  ```

---

## 📦 Phase 3: Order Management (After Payment Integration)

### 7. Create Order (Draft)
- **Status:** ⚪ NOT STARTED (Will be part of payment system)
- **Endpoint:** `POST /api/orders`
- **Notes:** This will be implemented when doing payment integration with Midtrans

---

### 8. Get Order by ID
- **Status:** ⚪ NOT STARTED
- **Endpoint:** `GET /api/orders/:orderId`
- **Notes:** For order confirmation and tracking pages

---

### 9. Get Customer Orders
- **Status:** ⚪ NOT STARTED
- **Endpoint:** `GET /api/orders?email=customer@email.com`
- **Notes:** Customer order history

---

## 🎨 Phase 4: Content Management (Priority: MEDIUM)

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

## 🔐 Phase 5: Admin & Analytics (Priority: LOW)

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

**Immediate Priority (This Week):**
1. ✅ Get Single Product API (for product detail page)
2. ✅ Contact Form API (customer inquiries)
3. ✅ Newsletter API (build email list)

**Short Term (Next 2 Weeks):**
4. Search & Filter APIs (better UX)
5. Email notifications setup
6. Admin dashboard basics

**Long Term (After Payment System):**
7. Order management APIs
8. Reviews/ratings system
9. Product recommendations
10. Analytics dashboard

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

# To Add
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
- [ ] Setup email service (Nodemailer)
- [ ] Add request validation middleware
- [ ] Add API documentation (Swagger/Postman)
- [ ] Add unit tests for controllers
- [ ] Setup error logging (Winston or Sentry)

---

## 📖 Learning Resources Used

- [Express.js Documentation](https://expressjs.com/)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Server learning guides: `server/learn/`
- **API Testing Guide:** [postman-testing-guide.md](postman-testing-guide.md) ⭐ NEW!

---

**Last Reviewed:** February 26, 2026  
**Next Review:** Check after completing Phase 1 & 2
