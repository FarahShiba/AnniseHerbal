# 🎮 Building Controllers

## What is a Controller?

A controller is a function that:
1. Receives a request
2. Processes business logic
3. Queries the database
4. Sends a response

Think of it as the "brain" of your API endpoint.

---

## Controller Structure

```typescript
// controllers/productsController.ts
import { Request, Response } from 'express';
import { db } from '../config/firebase';

export const controllerName = async (req: Request, res: Response) => {
  try {
    // 1. Get data from request
    // 2. Query database
    // 3. Process data
    // 4. Send response
  } catch (error) {
    // 5. Handle errors
  }
};
```

---

## Your First Controller: getAllProducts

### Step-by-Step Build

#### Step 1: Create the file

```typescript
// controllers/productsController.ts
import { Request, Response } from 'express';
import { db } from '../config/firebase';

// Export so routes can import it
export const getAllProducts = async (req: Request, res: Response) => {
  // Code goes here
};
```

#### Step 2: Add try/catch

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Success code here
  } catch (error) {
    // Error handling here
  }
};
```

#### Step 3: Query Firestore

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Get reference to products collection
    const productsRef = db.collection('products');
    
    // Fetch all documents
    const snapshot = await productsRef.get();
    
    // Log for debugging
    console.log(`Found ${snapshot.size} products`);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

#### Step 4: Transform data

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    
    // Transform Firestore docs to plain objects
    const products = snapshot.docs.map(doc => ({
      id: doc.id,              // Document ID
      ...doc.data()            // Spread all fields
    }));
    
    console.log('Products:', products);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

#### Step 5: Send response

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Send JSON response
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};
```

---

## Complete Controller: getProductById

```typescript
export const getProductById = async (req: Request, res: Response) => {
  try {
    // 1. Get ID from URL parameter
    const { id } = req.params;
    
    // 2. Fetch single document
    const doc = await db.collection('products').doc(id).get();
    
    // 3. Check if exists
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // 4. Return product data
    res.status(200).json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
};
```

---

## Complete Controller: createProduct

```typescript
export const createProduct = async (req: Request, res: Response) => {
  try {
    // 1. Get data from request body
    const productData = req.body;
    
    // 2. Validate required fields
    if (!productData.name || !productData.price) {
      return res.status(400).json({
        success: false,
        error: 'Name and price are required'
      });
    }
    
    // 3. Add timestamps
    const newProduct = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // 4. Create in Firestore
    const docRef = await db.collection('products').add(newProduct);
    
    // 5. Return created product
    res.status(201).json({
      success: true,
      data: {
        id: docRef.id,
        ...newProduct
      }
    });
    
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
};
```

---

## Status Codes Reference

| Code | Use When | Example |
|------|----------|---------|
| 200 | Success (GET, PUT, DELETE) | Product retrieved |
| 201 | Created (POST) | Product created |
| 400 | Client error (bad data) | Missing required field |
| 404 | Not found | Product doesn't exist |
| 500 | Server error | Database crashed |

---

## 🎯 Your Task

**Implement these controllers in order:**

1. ✅ `getAllProducts` - Fetch all products
2. ✅ `getProductById` - Fetch single product
3. ⬜ `createProduct` - Create new product
4. ⬜ `updateProduct` - Update existing product
5. ⬜ `deleteProduct` - Delete product

**Test each one before moving to the next!**

---

## Common Mistakes to Avoid

### ❌ Forgetting async

```typescript
export const getAllProducts = (req, res) => { // Missing async!
  const products = await db.collection('products').get(); // Error!
};
```

### ❌ Not checking if document exists

```typescript
const doc = await db.collection('products').doc(id).get();
return doc.data(); // Might be undefined!
```

### ❌ Forgetting to return in error cases

```typescript
if (!doc.exists) {
  res.status(404).json({ error: 'Not found' });
  // Missing return! Code continues...
}
```

---

## 🔗 Learn More

**Google:**
- "Express controller pattern"
- "Firestore add document Node.js"
- "Firestore update document"
- "Express request validation"

---

**Next:** [Routes →](routes.md)
