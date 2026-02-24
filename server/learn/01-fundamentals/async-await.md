# ⏳ Async/Await in Node.js

## Why Async?

**Problem:** Fetching data from Firestore takes time (network request)

```typescript
// ❌ This won't work
const products = db.collection('products').get();
console.log(products); // undefined or Promise object
```

**Solution:** Use `async`/`await` to wait for the operation to finish

---

## The Promise Problem

```typescript
// Old way (callback hell)
db.collection('products').get()
  .then(snapshot => {
    console.log(snapshot);
  })
  .catch(error => {
    console.error(error);
  });
```

**Ugly and hard to read!**

---

## Async/Await to the Rescue

```typescript
// Modern way
async function getProducts() {
  try {
    const snapshot = await db.collection('products').get();
    console.log(snapshot); // It's there!
  } catch (error) {
    console.error(error);
  }
}
```

**Clean and readable!**

---

## Key Rules

### 1. Use `async` on functions that use `await`

```typescript
// ✅ Correct
async function getData() {
  const result = await someAsyncOperation();
}

// ❌ Wrong (await without async)
function getData() {
  const result = await someAsyncOperation(); // Error!
}
```

### 2. Always use try/catch

```typescript
async function getProduct(id: string) {
  try {
    const doc = await db.collection('products').doc(id).get();
    return doc.data();
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw or handle
  }
}
```

---

## In Express Routes

### ❌ Wrong (No async)

```typescript
app.get('/api/products', (req, res) => {
  const snapshot = await db.collection('products').get(); // Error!
  res.json(snapshot);
});
```

### ✅ Correct (With async)

```typescript
app.get('/api/products', async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    res.json({ data: snapshot.docs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});
```

---

## Multiple Async Operations

### Sequential (One after another)

```typescript
async function processOrder() {
  const user = await getUser();        // Wait
  const product = await getProduct();  // Then wait again
  const order = await createOrder();   // Then wait again
  return order;
}
```

### Parallel (All at once - faster!)

```typescript
async function fetchData() {
  const [users, products, orders] = await Promise.all([
    getUsers(),
    getProducts(),
    getOrders()
  ]);
  
  return { users, products, orders };
}
```

---

## Common Firestore Patterns

### Get all documents

```typescript
const snapshot = await db.collection('products').get();

const products = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Get single document

```typescript
const doc = await db.collection('products').doc('123').get();

if (!doc.exists) {
  throw new Error('Product not found');
}

const product = { id: doc.id, ...doc.data() };
```

### Create document

```typescript
const newDoc = await db.collection('products').add({
  name: 'New Product',
  price: 50000
});

console.log('Created with ID:', newDoc.id);
```

---

## Error Handling Best Practices

```typescript
async function getProduct(id: string) {
  try {
    const doc = await db.collection('products').doc(id).get();
    
    if (!doc.exists) {
      return null; // Not an error, just not found
    }
    
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    // Log for debugging
    console.error('Firestore error:', error);
    
    // Re-throw with friendly message
    throw new Error('Failed to fetch product');
  }
}
```

---

## In Your Controller

```typescript
// controllers/productsController.ts
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // 1. Async Firestore query
    const snapshot = await db.collection('products').get();
    
    // 2. Transform data
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 3. Send response
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    // 4. Handle errors
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};
```

---

## 🎯 Practice Exercise

**What's wrong with this code?**

```typescript
app.get('/api/products/:id', (req, res) => {
  const doc = await db.collection('products').doc(req.params.id).get();
  res.json(doc.data());
});
```

**Fixes:**
1. Missing `async` keyword
2. Missing try/catch
3. No check if doc exists
4. No error handling

---

## 🔗 Learn More

**Google:**
- "JavaScript async await explained"
- "async await vs promises"
- "try catch in async functions"
- "Firestore async queries Node.js"

---

**Next:** [Project Structure →](../02-setup/project-structure.md)
