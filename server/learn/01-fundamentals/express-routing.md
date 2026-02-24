# 🛣️ Express Routing

## What is Routing?

Routing determines **how your app responds to client requests** at specific endpoints (URLs).

```
Client Request → Route → Controller → Database → Response
```

---

## Basic Route Structure

```typescript
app.METHOD(PATH, HANDLER)
```

- **METHOD**: HTTP method (get, post, put, delete)
- **PATH**: The URL endpoint
- **HANDLER**: Function that runs when route is hit

---

## Simple Example

```typescript
// In index.ts
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});
```

**What happens:**
1. Client visits `http://localhost:3000/api/hello`
2. Express matches the route
3. Handler function runs
4. Client receives JSON response

---

## Route Parameters (Dynamic URLs)

```typescript
// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id; // Access the ID
  res.json({ message: `You requested product ${productId}` });
});
```

**Examples:**
- `/api/products/123` → `req.params.id` = "123"
- `/api/products/abc` → `req.params.id` = "abc"

---

## Query Parameters (Filters & Options)

```typescript
// Get products with filters
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  const limit = req.query.limit;
  
  console.log(category); // "herbal"
  console.log(limit);    // "10"
});
```

**URL:** `/api/products?category=herbal&limit=10`

---

## Request Body (POST/PUT data)

```typescript
// Create new product
app.post('/api/products', (req, res) => {
  const productData = req.body; // Client sends JSON
  
  console.log(productData.name);  // "New Product"
  console.log(productData.price); // 50000
});
```

**Client sends:**
```json
{
  "name": "New Product",
  "price": 50000
}
```

---

## The Problem: Routes Get Messy!

```typescript
// ❌ This gets ugly fast in index.ts
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.get('/api/orders', getOrders);
app.post('/api/orders', createOrder);
// ... 50 more routes
```

---

## The Solution: Express Router

### Step 1: Create Route File

```typescript
// routes/products.ts
import express from 'express';

const router = express.Router();

// Now use router instead of app
router.get('/', getAllProducts);        // /api/products
router.get('/:id', getProductById);     // /api/products/:id
router.post('/', createProduct);        // /api/products
router.put('/:id', updateProduct);      // /api/products/:id
router.delete('/:id', deleteProduct);   // /api/products/:id

export default router;
```

### Step 2: Mount Router in index.ts

```typescript
// index.ts
import productsRouter from './routes/products';

// Mount all product routes
app.use('/api/products', productsRouter);
```

**Magic:** All routes in `products.ts` now start with `/api/products`!

---

## Middleware in Routes

Middleware = Code that runs **before** your route handler

```typescript
// Custom middleware
const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next(); // Continue to next handler
};

// Use middleware on specific route
router.post('/', checkAuth, createProduct);
```

---

## Your Task: Understand This Pattern

```typescript
// routes/products.ts
import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById 
} from '../controllers/productsController';

const router = Router();

router.get('/', getAllProducts);      // GET /api/products
router.get('/:id', getProductById);   // GET /api/products/123

export default router;
```

```typescript
// index.ts
import productsRouter from './routes/products';

app.use('/api/products', productsRouter); // Mount router
```

---

## 🎯 Practice Questions

1. What does `app.use('/api/products', router)` do?
2. If you have `router.get('/:id', handler)` and mount at `/api/products`, what's the full URL?
3. How do you access the `id` from `/api/products/123`?
4. How do you access `?category=herbal` in your handler?

---

## 🔗 Learn More

**Google:**
- "Express.js routing guide"
- "Express Router explained"
- "Express request params vs query"
- "Express middleware tutorial"

---

**Next:** [Async/Await →](async-await.md)
