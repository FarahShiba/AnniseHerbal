# 📘 TypeScript Setup & Basics

## Why TypeScript?

**TypeScript = JavaScript + Types**

### Benefits:
- ✅ Catch errors before running code
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Better collaboration

---

## TypeScript vs JavaScript

### JavaScript (No types)
```javascript
function addProduct(product) {
  return product.price + 100;
}

addProduct({ name: 'Test' }); // Runtime error! No price property
```

### TypeScript (With types)
```typescript
interface Product {
  name: string;
  price: number;
}

function addProduct(product: Product): number {
  return product.price + 100;
}

addProduct({ name: 'Test' }); // ❌ Error at compile time!
// Property 'price' is missing
```

---

## Your tsconfig.json

Located at: `server/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",           // JavaScript version to compile to
    "module": "commonjs",          // Module system
    "outDir": "./dist",            // Compiled code goes here
    "rootDir": "./src",            // Source code location
    "strict": true,                // Enable strict type checking
    "esModuleInterop": true,       // Better import compatibility
    "skipLibCheck": true           // Skip type checking of libraries
  },
  "include": ["src/**/*"],         // Files to compile
  "exclude": ["node_modules"]      // Files to ignore
}
```

**Key Settings:**
- `strict: true` - Catches more errors (recommended!)
- `outDir: ./dist` - Where compiled JS goes
- `rootDir: ./src` - Where your TS code lives

---

## Basic TypeScript Concepts

### 1. Type Annotations

```typescript
// Variables
let name: string = "Fluent";
let price: number = 89000;
let available: boolean = true;

// Arrays
let tags: string[] = ["herbal", "organic"];
let prices: number[] = [50000, 60000];

// Objects
let product: {
  name: string;
  price: number;
} = {
  name: "Fluxent",
  price: 89000
};
```

---

### 2. Interfaces (Reusable Types)

```typescript
// Define shape of an object
interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;  // ? means optional
}

// Use it
const product: Product = {
  id: "123",
  name: "Fluxent",
  price: 89000
  // category is optional
};
```

---

### 3. Function Types

```typescript
// Function with typed parameters and return
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Arrow function
const getDiscount = (price: number): number => {
  return price * 0.1;
};

// Async function
async function fetchProduct(id: string): Promise<Product> {
  const doc = await db.collection('products').doc(id).get();
  return doc.data() as Product;
}
```

---

### 4. Express Types

```typescript
import { Request, Response } from 'express';

// Controller with typed req/res
export const getAllProducts = async (req: Request, res: Response) => {
  // req is typed - autocomplete works!
  const query = req.query;
  const params = req.params;
  
  // res is typed too
  res.status(200).json({ data: [] });
};
```

---

### 5. Custom Types for Routes

```typescript
import { Request, Response } from 'express';

// Extend Request with custom types
interface ProductParams {
  id: string;
}

interface ProductQuery {
  category?: string;
  limit?: string;
}

// Use in controller
export const getProductById = async (
  req: Request<ProductParams>,  // URL params
  res: Response
) => {
  const { id } = req.params;  // Typed!
  // ...
};

export const getAllProducts = async (
  req: Request<{}, {}, {}, ProductQuery>,  // Query params
  res: Response
) => {
  const { category, limit } = req.query;  // Typed!
  // ...
};
```

---

## Working with Your Product Type

Located at: `server/src/types/product.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  name_en: string;
  price: number;
  category: string;
  // ... more fields
}
```

### Using in Controller

```typescript
import { Product } from '../types/product';

export const getAllProducts = async (req: Request, res: Response) => {
  const snapshot = await db.collection('products').get();
  
  // Type the array
  const products: Product[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
  
  res.json({ data: products });
};
```

---

## Common TypeScript Patterns in Your Project

### Type Assertion
```typescript
// Tell TypeScript what type something is
const data = doc.data() as Product;
```

### Optional Chaining
```typescript
// Safely access nested properties
const image = product?.images?.[0];
```

### Nullish Coalescing
```typescript
// Default value if null/undefined
const limit = req.query.limit ?? 10;
```

---

## TypeScript Errors You'll See

### Error: Property doesn't exist
```typescript
interface Product {
  name: string;
}

const product: Product = {
  name: "Test",
  price: 5000  // ❌ Error: 'price' doesn't exist on type 'Product'
};
```

**Fix:** Add property to interface

### Error: Type 'string' is not assignable to type 'number'
```typescript
let price: number = "5000";  // ❌ Error
```

**Fix:** Use correct type or convert

### Error: Cannot find name 'req'
```typescript
export const handler = (req, res) => {  // ❌ Implicit any
  // ...
};
```

**Fix:** Import and use types
```typescript
import { Request, Response } from 'express';

export const handler = (req: Request, res: Response) => {
  // ✅ Typed
};
```

---

## Compiling TypeScript

### Development (with auto-reload)
```bash
npm run dev
```
Uses `ts-node-dev` to run TypeScript directly

### Production (compile to JavaScript)
```bash
npm run build
```
Creates `dist/` folder with compiled JavaScript

---

## IDE Benefits

With TypeScript, your IDE (VS Code) gives you:

1. **Autocomplete**
   - Type `req.` and see all available properties

2. **Error Detection**
   - Red squiggly lines show errors before running

3. **Go to Definition**
   - Ctrl+Click on a function to see where it's defined

4. **Rename Symbol**
   - Rename a variable everywhere safely

---

## 🎯 Practice Exercise

**Add typing to this code:**

```typescript
// Before (no types)
export const createProduct = async (req, res) => {
  const product = req.body;
  const docRef = await db.collection('products').add(product);
  res.json({ id: docRef.id, product });
};

// After (with types) - You do this!
import { Request, Response } from 'express';
import { Product } from '../types/product';

export const createProduct = async (req: Request, res: Response) => {
  // Add type annotations here
};
```

---

## 🔗 Learn More

**Google:**
- "TypeScript basics tutorial"
- "TypeScript interfaces vs types"
- "Express TypeScript setup"
- "TypeScript with Firebase"

**Documentation:**
- https://www.typescriptlang.org/docs/handbook/intro.html
- https://expressjs.com/en/guide/using-typescript.html

---

**Next:** [Building Controllers →](../03-implementation/controllers.md)
