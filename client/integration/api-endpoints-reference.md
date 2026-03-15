# 📚 API Endpoints Reference

Quick reference guide for all available backend API endpoints.

**Base URL (Development):** `http://localhost:3000/api`  
**Base URL (Production):** TBD (after backend deployment)

---

## 🛍️ Products

### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-001",
      "name": "Max Pain Relief Oil",
      "price": 185000,
      "category": "pain-relief",
      "sizeName": "100ml",
      "description": "...",
      "benefits": ["..."],
      "composition": "...",
      "usage": "...",
      "images": ["..."]
    }
  ]
}
```

---

### Get Single Product
```http
GET /api/products/:category/:size/:id
```

**Example:**
```http
GET /api/products/pain-relief/100ml/prod-001
```

**Response:**
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
    "benefits": ["..."],
    "composition": "...",
    "usage": "...",
    "images": ["..."]
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Product not found in category..."
}
```

---

## 📝 Contact Form

### Submit Contact Form
```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08123456789",
  "message": "I have a question about..."
}
```

**Validation Rules:**
- `name`: 2-100 characters
- `email`: Valid email format
- `phone`: 10-13 digits (Indonesian format)
- `message`: 10-2000 characters

**Success Response:**
```json
{
  "success": true,
  "message": "Pesan Anda telah diterima. Kami akan membalas segera!",
  "contactId": "contact_1710061234567_abc123"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "validation Failed",
  "details": {
    "name": "Name must be between 2 and 100 characters",
    "email": "Invalid email format"
  }
}
```

**Backend Actions:**
- ✅ Saves to Firestore
- ✅ Sends email to admin
- ✅ Sends confirmation email to customer

---

## 📧 Newsletter

### Subscribe to Newsletter
```http
POST /api/newsLetterSubscriber
```

**Request Body:**
```json
{
  "email": "customer@example.com"
}
```

**Validation Rules:**
- `email`: Valid email format, lowercase normalized

**Success Response:**
```json
{
  "success": true,
  "message": "Newsletter subscription successful"
}
```

**Duplicate Email Response:**
```json
{
  "success": true,
  "message": "Congrats, u are already subsciber."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "validation Failed",
  "details": {
    "email": "Invalid email address"
  }
}
```

**Backend Actions:**
- ✅ Saves to Firestore
- ✅ Sends welcome email to subscriber
- ✅ Sends notification to admin

---

## 🛒 Orders & Payment

### Create Order (with Midtrans Payment)
```http
POST /api/orders
```

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "08123456789"
  },
  "items": [
    {
      "productPath": "products/pain-relief/sizes/100ml/products/prod-001",
      "quantity": 2
    }
  ],
  "shippingDetails": {
    "address": "Jl. Contoh No. 123",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "postalCode": "12345",
    "shippingMethod": "standard"
  },
  "paymentMethod": "gopay",
  "idempotencyKey": "unique-key-123"
}
```

**Required Fields:**
- `customer.name`: 2-100 characters
- `customer.email`: Valid email
- `customer.phone`: 10-15 digits
- `items`: Array, at least 1 item
- `items[].productPath`: Valid Firestore path
- `items[].quantity`: Integer, min 1, max 99
- `shippingDetails.address`: 10-200 characters
- `shippingDetails.city`: 2-50 characters
- `shippingDetails.province`: 2-50 characters
- `shippingDetails.postalCode`: 5 digits
- `shippingDetails.shippingMethod`: "standard", "express", or "same-day"
- `paymentMethod`: Valid Midtrans payment channel
- `idempotencyKey`: Unique string to prevent duplicates

**Success Response:**
```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": {
    "orderId": "order_1710061234567_abc123",
    "orderNumber": "ORD-2026-0002",
    "midtransToken": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
    "redirectUrl": "https://app.sandbox.midtrans.com/snap/v3/...",
    "total": 395000,
    "status": "pending"
  }
}
```

**What to do with response:**
1. Store `orderId` for tracking
2. Use `midtransToken` to open Snap payment popup
3. Handle payment callbacks

**Backend Actions:**
- ✅ Validates all fields (13 validators)
- ✅ Fetches product prices from Firestore (security)
- ✅ Calculates totals (subtotal + shipping - discount)
- ✅ Creates Midtrans payment token
- ✅ Saves order to Firestore
- ✅ Returns payment token for frontend

---

## 🔔 Webhook (Backend Only)

### Midtrans Payment Notification
```http
POST /api/webhook/midtrans
```

**Note:** This endpoint is called by Midtrans servers, not by frontend.

**Purpose:** Updates order status when payment is completed

---

## 🏥 Health Check

### Server Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-12T10:30:00.000Z"
}
```

---

## 🔍 Error Response Format

All endpoints follow consistent error format:

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "User-friendly message in Indonesian"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "error": "validation Failed",
  "details": {
    "field1": "Error message",
    "field2": "Error message"
  }
}
```

---

## 📝 Notes

### Authentication
- No authentication required for current endpoints
- All endpoints are public
- Order creation uses idempotency keys for security

### CORS
- Backend configured with CORS enabled
- Accepts requests from any origin (development)
- Should be restricted to domain in production

### Rate Limiting
- No rate limiting implemented yet
- Should be added before production

### Idempotency
- Order creation uses idempotency keys
- Prevents duplicate orders if user clicks multiple times
- Generate unique key per checkout session

---

## 🧪 Testing with Postman/Thunder Client

### Base URL Setup
```
{{baseURL}} = http://localhost:3000/api
```

### Test Sequence
1. ✅ Health check: `GET {{baseURL}}/health`
2. ✅ Get products: `GET {{baseURL}}/products`
3. ✅ Get single product: `GET {{baseURL}}/products/pain-relief/100ml/prod-001`
4. ✅ Submit contact: `POST {{baseURL}}/contact`
5. ✅ Subscribe newsletter: `POST {{baseURL}}/newsLetterSubscriber`
6. ✅ Create order: `POST {{baseURL}}/orders`

---

## 🔗 Related Documentation

- Backend API Docs: `server/documentation/`
- Midtrans Integration: `server/learn/payment-system-indonesia/`
- Postman Testing Guide: `server/development-tracker/postman-testing-guide.md`
