# 🎨 Frontend Integration Progress Tracker

**Project:** Annise Herbal E-Commerce Frontend  
**Started:** March 12, 2026  
**Last Updated:** March 12, 2026

---

## 📊 Overview

This document tracks the integration of backend APIs with the React frontend for the Annise Herbal e-commerce platform.

**Backend API Status:** ✅ Ready (7/12 endpoints completed)
**Backend URL (Development):** `http://localhost:3000/api`

**Current Status:**
- 🟢 Completed: 0/8 integrations
- 🟡 In Progress: 0/8 integrations
- ⚪ Not Started: 8/8 integrations

---

## 🔧 Phase 1: Setup & Configuration (Priority: HIGH)

### 1. API Configuration
- **Status:** ⚪ NOT STARTED
- **Purpose:** Set up centralized API configuration and base URL management
- **Tasks:**
  - [ ] Create `.env.local` file for environment variables
  - [ ] Add `VITE_API_BASE_URL=http://localhost:3000/api`
  - [ ] Create `src/config/api.ts` for API base URL export
  - [ ] Create `src/utils/api.ts` for reusable fetch wrapper functions
  - [ ] Add error handling utilities
- **Estimated Time:** 20 minutes
- **Files to Create:**
  - `client/.env.local`
  - `client/src/config/api.ts`
  - `client/src/utils/api.ts`

---

### 2. TypeScript Types
- **Status:** ⚪ NOT STARTED
- **Purpose:** Define TypeScript interfaces matching backend response structures
- **Tasks:**
  - [ ] Review existing `src/types/index.ts`
  - [ ] Add API response types (generic wrapper types)
  - [ ] Add Product types (match backend structure)
  - [ ] Add Order types
  - [ ] Add Contact types
  - [ ] Add Newsletter types
- **Estimated Time:** 25 minutes
- **File to Update:** `client/src/types/index.ts`

---

## 🛍️ Phase 2: Product Integration (Priority: HIGH)

### 3. Products API Integration
- **Status:** ⚪ NOT STARTED
- **Backend Endpoints:**
  - `GET /api/products` - Get all products
  - `GET /api/products/:category/:size/:id` - Get single product
- **Tasks:**
  - [ ] Create `src/services/productService.ts`
  - [ ] Implement `getAllProducts()` function
  - [ ] Implement `getProductById(category, size, id)` function
  - [ ] Replace static data imports with API calls
  - [ ] Update `ShopPage.tsx` to fetch from API
  - [ ] Update `ProductDetailPage.tsx` to fetch from API
  - [ ] Add loading states
  - [ ] Add error handling
  - [ ] Add retry logic for failed requests
- **Estimated Time:** 1 hour
- **Files to Create/Update:**
  - NEW: `client/src/services/productService.ts`
  - UPDATE: `client/src/pages/ShopPage.tsx`
  - UPDATE: `client/src/pages/ProductDetailPage.tsx`

---

## 📝 Phase 3: Contact & Newsletter (Priority: HIGH)

### 4. Contact Form Integration
- **Status:** 🟢 Completed
- **Backend Endpoint:** `POST /api/contact`
- **Tasks:**
  - [ ] Create `src/services/contactService.ts`
  - [ ] Implement `submitContactForm(data)` function
  - [ ] Update `ContactPage.tsx` form submission
  - [ ] Add form validation (client-side)
  - [ ] Add loading state during submission
  - [ ] Add success message display
  - [ ] Add error handling with user-friendly messages
  - [ ] Clear form after successful submission
- **Estimated Time:** 45 minutes
- **Files to Create/Update:**
  - NEW: `client/src/services/contactService.ts`
  - UPDATE: `client/src/pages/ContactPage.tsx`
- **Backend Features:**
  - ✅ Validation (name, email, phone, message)
  - ✅ Saves to Firestore
  - ✅ Sends admin notification email
  - ✅ Sends customer confirmation email

---

### 5. Newsletter Subscription Integration
- **Status:** 🟢 Completed
- **Backend Endpoint:** `POST /api/newsLetterSubscriber`
- **Tasks:**
  - [ ] Create `src/services/newsletterService.ts`
  - [ ] Implement `subscribeToNewsletter(email)` function
  - [ ] Find newsletter subscription components (footer, homepage, etc.)
  - [ ] Update newsletter form submission
  - [ ] Add email validation (client-side)
  - [ ] Add loading state during submission
  - [ ] Add success message display
  - [ ] Add error handling (duplicate email, invalid email, etc.)
  - [ ] Prevent multiple submissions
- **Estimated Time:** 40 minutes
- **Files to Create/Update:**
  - NEW: `client/src/services/newsletterService.ts`
  - UPDATE: (Find newsletter components in HomePage/Footer)
- **Backend Features:**
  - ✅ Email validation
  - ✅ Duplicate prevention
  - ✅ Saves to Firestore
  - ✅ Sends welcome email to subscriber
  - ✅ Sends admin notification

---

## 🛒 Phase 4: Checkout & Payment Integration (Priority: CRITICAL)

### 6. Shopping Cart State Management
- **Status:** ⚪ NOT STARTED
- **Purpose:** Implement cart functionality with React Context or state management
- **Tasks:**
  - [ ] Choose state management (Context API or Zustand)
  - [ ] Create cart context/store
  - [ ] Implement `addToCart(product, quantity)`
  - [ ] Implement `removeFromCart(productId)`
  - [ ] Implement `updateQuantity(productId, quantity)`
  - [ ] Implement `clearCart()`
  - [ ] Persist cart to localStorage
  - [ ] Calculate cart totals
  - [ ] Update `CartDrawer.tsx` component
- **Estimated Time:** 1.5 hours
- **Files to Create/Update:**
  - NEW: `client/src/contexts/CartContext.tsx` (or `src/stores/cartStore.ts`)
  - UPDATE: `client/src/components/CartDrawer.tsx`
  - UPDATE: `client/src/pages/ProductDetailPage.tsx` (Add to cart button)

---

### 7. Checkout & Order Creation
- **Status:** ⚪ NOT STARTED
- **Backend Endpoint:** `POST /api/orders`
- **Tasks:**
  - [ ] Create `src/services/orderService.ts`
  - [ ] Implement `createOrder(orderData)` function
  - [ ] Update `CheckoutPage.tsx` with form
  - [ ] Add form validation (customer, shipping, payment method)
  - [ ] Add shipping cost calculation
  - [ ] Add order summary display
  - [ ] Integrate Indonesian provinces/cities data
  - [ ] Add idempotency key generation
  - [ ] Handle order creation response
  - [ ] Store order ID for tracking
- **Estimated Time:** 2 hours
- **Files to Create/Update:**
  - NEW: `client/src/services/orderService.ts`
  - UPDATE: `client/src/pages/CheckoutPage.tsx`
- **Backend Features:**
  - ✅ Complete validation
  - ✅ Product fetching from Firestore
  - ✅ Price calculation
  - ✅ Midtrans payment token generation

---

### 8. Midtrans Payment Integration (Snap)
- **Status:** ⚪ NOT STARTED
- **Purpose:** Integrate Midtrans Snap payment popup
- **Tasks:**
  - [ ] Add Midtrans Snap script to `index.html`
  - [ ] Install Midtrans types: `npm install --save-dev @types/midtrans-client`
  - [ ] Create payment handler function
  - [ ] Initialize Snap with token from order creation
  - [ ] Handle payment success callback
  - [ ] Handle payment pending callback
  - [ ] Handle payment error callback
  - [ ] Redirect after payment completion
  - [ ] Display payment status to user
- **Estimated Time:** 1.5 hours
- **Files to Update:**
  - UPDATE: `client/index.html` (Add Snap script)
  - UPDATE: `client/src/pages/CheckoutPage.tsx`
  - NEW: `client/src/utils/midtransHelper.ts`
- **Midtrans Script:**
  ```html
  <!-- Sandbox -->
  <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="YOUR_CLIENT_KEY"></script>
  <!-- Production -->
  <script src="https://app.midtrans.com/snap/snap.js" data-client-key="YOUR_CLIENT_KEY"></script>
  ```
- **Backend Integration:**
  - ✅ Midtrans Snap token generation
  - ✅ Webhook for payment notification
  - ✅ Order status update

---

## 🎨 Phase 5: UI/UX Enhancements (Priority: MEDIUM)

### 9. Loading States & Skeletons
- **Status:** ⚪ NOT STARTED
- **Tasks:**
  - [ ] Create loading skeleton components
  - [ ] Add to ShopPage (product grid)
  - [ ] Add to ProductDetailPage
  - [ ] Add to CheckoutPage
  - [ ] Create global loading overlay component
- **Estimated Time:** 45 minutes

---

### 10. Error Handling & Toast Notifications
- **Status:** ⚪ NOT STARTED
- **Tasks:**
  - [ ] Install toast library (`react-hot-toast` or `sonner`)
  - [ ] Create toast configuration
  - [ ] Add success toasts for forms
  - [ ] Add error toasts for failed requests
  - [ ] Add network error handling
  - [ ] Create error boundary component
- **Estimated Time:** 30 minutes

---

## 🧪 Phase 6: Testing & Validation (Priority: HIGH)

### 11. End-to-End Testing
- **Status:** ⚪ NOT STARTED
- **Tasks:**
  - [ ] Test product browsing flow
  - [ ] Test product detail page with real data
  - [ ] Test contact form submission
  - [ ] Test newsletter subscription
  - [ ] Test add to cart functionality
  - [ ] Test checkout flow with real data
  - [ ] Test Midtrans payment (sandbox)
  - [ ] Test payment success flow
  - [ ] Test payment failure flow
  - [ ] Test error scenarios
- **Estimated Time:** 2 hours

---

## 📦 Phase 7: Production Preparation (Priority: MEDIUM)

### 12. Environment Configuration
- **Status:** ⚪ NOT STARTED
- **Tasks:**
  - [ ] Create `.env.production` file
  - [ ] Set production API URL
  - [ ] Set production Midtrans client key
  - [ ] Update build scripts
  - [ ] Test production build locally
- **Estimated Time:** 20 minutes

---

### 13. Performance Optimization
- **Status:** ⚪ NOT STARTED
- **Tasks:**
  - [ ] Implement code splitting
  - [ ] Add lazy loading for routes
  - [ ] Optimize images
  - [ ] Add caching strategies
  - [ ] Minimize bundle size
- **Estimated Time:** 1 hour

---

## 🚀 Deployment Checklist

### Backend Deployment
- [ ] Choose hosting service (Railway/Render/Cloud Run)
- [ ] Configure environment variables
- [ ] Deploy backend server
- [ ] Get production API URL
- [ ] Configure Midtrans webhook URL
- [ ] Test production endpoints

### Frontend Deployment
- [ ] Update API base URL to production
- [ ] Update Midtrans to production mode
- [ ] Build production bundle
- [ ] Deploy to Netlify/Vercel
- [ ] Test live website
- [ ] Configure custom domain

---

## 📝 Notes & Decisions

### API Communication
- Using native `fetch` API (no axios dependency)
- Centralized error handling
- Request/response interceptors in api utility

### State Management
- **Decision Needed:** Context API vs Zustand for cart
- Recommendation: Context API (lighter, built-in)

### Form Validation
- Client-side validation mirrors backend rules
- User-friendly error messages in Indonesian
- Real-time validation feedback

### Payment Flow
1. User completes checkout form
2. Frontend creates order via API
3. Backend returns Midtrans token
4. Frontend opens Snap payment popup
5. User completes payment
6. Midtrans webhook notifies backend
7. Backend updates order status
8. Frontend shows success message

---

## 🔗 Quick Links

- Backend API Documentation: `server/documentation/`
- Backend Dev Tracker: `server/development-tracker/api-development-progress.md`
- Midtrans Documentation: `server/learn/payment-system-indonesia/`
- TypeScript Types: `client/src/types/index.ts`
- Static Data (to be replaced): `client/src/data/`

---

## 📅 Timeline Estimate

**Total Estimated Time:** 10-12 hours

**Priority Order:**
1. Setup & Configuration (Phase 1) - 45 min
2. Product Integration (Phase 2) - 1 hour
3. Contact & Newsletter (Phase 3) - 1.5 hours
4. Cart State Management (Phase 4.1) - 1.5 hours
5. Checkout & Payment (Phase 4.2-4.3) - 3.5 hours
6. Testing (Phase 6) - 2 hours
7. UI Enhancements (Phase 5) - 1.5 hours
8. Production Prep (Phase 7) - 1.5 hours

---

**Next Action:** Start with Phase 1 - API Configuration
