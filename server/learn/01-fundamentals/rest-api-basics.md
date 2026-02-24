# 🌐 REST API Basics

## What is REST?

**REST** = **RE**presentational **S**tate **T**ransfer

It's a set of rules for building APIs that are:
- Simple to understand
- Consistent across applications
- Scalable

Think of it like a restaurant menu - you know what to expect when you order!

---

## The 5 Key HTTP Methods

| Method | Purpose | Example | Like Saying... |
|--------|---------|---------|----------------|
| **GET** | Read/Fetch data | Get all products | "Show me the menu" |
| **POST** | Create new data | Add new product | "I want to order this" |
| **PUT** | Update existing | Update product details | "Change my order" |
| **PATCH** | Partial update | Update only price | "Just change the sauce" |
| **DELETE** | Remove data | Delete product | "Cancel that order" |

---

## URL Structure (Anatomy of an Endpoint)

```
https://api.example.com/api/products/123?category=herbal
│                       │   │        │   │
│                       │   │        │   └─ Query Parameter (filter)
│                       │   │        └───── Resource ID
│                       │   └────────────── Resource (collection)
│                       └────────────────── Base path
└────────────────────────────────────────── Domain
```

---

## REST Conventions for Products

### ✅ Good REST URLs

```
GET    /api/products           → Get all products
GET    /api/products/123       → Get product #123
POST   /api/products           → Create new product
PUT    /api/products/123       → Update product #123
DELETE /api/products/123       → Delete product #123
```

### ❌ Bad REST URLs (Don't do this!)

```
GET    /api/getProducts        ← Redundant verb
POST   /api/createProduct      ← Not following convention
GET    /api/products/delete/123 ← Wrong method
```

**Rule:** Let the HTTP method do the talking!

---

## HTTP Status Codes You'll Use

| Code | Meaning | When to Use |
|------|---------|-------------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST (new item) |
| **400** | Bad Request | Client sent invalid data |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Something broke on your end |

---

## Request & Response Structure

### Request (What client sends)

```javascript
// GET /api/products/123
Headers: {
  "Content-Type": "application/json"
}
```

### Response (What server sends back)

```javascript
// Status: 200
{
  "id": "123",
  "name": "Fluxent Essential Oil",
  "price": 89000,
  "category": "respiratory"
}
```

---

## Real-World Example: Your Annise Herbal API

```javascript
// Client wants all herbal products
GET /api/products?category=herbal

// Server responds
{
  "success": true,
  "count": 5,
  "data": [
    { "id": "1", "name": "Fluxent", ... },
    { "id": "2", "name": "HemoClear", ... }
  ]
}
```

---

## 🎯 Practice Exercise

**Before moving on, answer these:**

1. What HTTP method would you use to:
   - Get a single product? ________
   - Create a new product? ________
   - Delete a product? ________

2. What status code should you return when:
   - Product created successfully? ________
   - Product not found? ________
   - Server crashed? ________

3. Which is the correct REST endpoint?
   - `/api/getAllProducts` ❌
   - `/api/products` ✅

---

## 🔗 Learn More

**Google these terms:**
- "REST API explained in simple terms"
- "HTTP methods GET POST PUT DELETE"
- "HTTP status codes cheat sheet"
- "RESTful API best practices"

---

**Next:** [Express Routing →](express-routing.md)
