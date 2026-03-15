# 🛣️ Building Routes

## Your Task: Connect Controllers to URLs

Routes are simple - they just connect a URL to a controller function.

---

## Step-by-Step: Create Products Router

### Step 1: Create the file

```typescript
// routes/products.ts
import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController';

const router = Router();

// Routes go here

export default router;
```

### Step 2: Define routes

```typescript
// routes/products.ts
import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById 
} from '../controllers/productsController';

const router = Router();

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get single product
router.get('/:id', getProductById);

export default router;
```

### Step 3: Mount in index.ts

```typescript
// index.ts
import productsRouter from './routes/products';

// ... other middleware

// Mount products routes
app.use('/api/products', productsRouter);

// ... rest of code
```

---

## Complete Routes File

```typescript
// routes/products.ts
import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController';

const router = Router();

// Public routes
router.get('/', getAllProducts);           // GET /api/products
router.get('/:id', getProductById);        // GET /api/products/123

// Admin routes (add auth middleware later)
router.post('/', createProduct);           // POST /api/products
router.put('/:id', updateProduct);         // PUT /api/products/123
router.delete('/:id', deleteProduct);      // DELETE /api/products/123

export default router;
```

---

## Folder Structure

```
server/
├── src/
│   ├── controllers/
│   │   └── productsController.ts  ← Business logic
│   ├── routes/
│   │   └── products.ts             ← URL mapping
│   └── index.ts                     ← Mount routes here
```

---

## Testing Your Routes

### Using Thunder Client in VS Code:

1. Install Thunder Client extension
2. Create new request
3. Set method (GET, POST, etc.)
4. Enter URL: `http://localhost:3000/api/products`
5. Click Send

### Using curl:

```bash
# Get all products
curl http://localhost:3000/api/products

# Get single product
curl http://localhost:3000/api/products/123

# Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":50000}'
```

---

## 🎯 Checkpoint

Your API should now respond to:

- ✅ GET `/api/products` - Returns all products
- ✅ GET `/api/products/:id` - Returns single product
- ⬜ POST `/api/products` - Creates new product
- ⬜ PUT `/api/products/:id` - Updates product
- ⬜ DELETE `/api/products/:id` - Deletes product

---

**Next:** [Firestore Queries →](firestore-queries.md)
