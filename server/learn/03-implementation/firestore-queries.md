# 🔥 Firestore Queries Guide

## Basic Operations

### Get All Documents

```typescript
const snapshot = await db.collection('products').get();

// snapshot.docs is an array of document references
const products = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Get Single Document

```typescript
const doc = await db.collection('products').doc('productId').get();

if (!doc.exists) {
  console.log('No such document!');
  return null;
}

const product = {
  id: doc.id,
  ...doc.data()
};
```

---

## Filtering Data

### Where Clause (Single Filter)

```typescript
const snapshot = await db
  .collection('products')
  .where('category', '==', 'herbal')
  .get();

const herbalProducts = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Multiple Filters

```typescript
const snapshot = await db
  .collection('products')
  .where('category', '==', 'herbal')
  .where('price', '<', 100000)
  .get();
```

### Supported Operators

- `==` equal to
- `!=` not equal to
- `<` less than
- `<=` less than or equal
- `>` greater than
- `>=` greater than or equal
- `array-contains` array contains value
- `in` value in array
- `not-in` value not in array

---

## Sorting & Limiting

### Order By

```typescript
const snapshot = await db
  .collection('products')
  .orderBy('price', 'asc')  // or 'desc'
  .get();
```

### Limit Results

```typescript
const snapshot = await db
  .collection('products')
  .limit(10)
  .get();
```

### Combining Order & Limit

```typescript
// Get top 5 most expensive products
const snapshot = await db
  .collection('products')
  .orderBy('price', 'desc')
  .limit(5)
  .get();
```

---

## Pagination

### Basic Pagination

```typescript
// Page 1: First 10 products
const firstPage = await db
  .collection('products')
  .orderBy('name')
  .limit(10)
  .get();

// Get last document for next page
const lastDoc = firstPage.docs[firstPage.docs.length - 1];

// Page 2: Next 10 products
const secondPage = await db
  .collection('products')
  .orderBy('name')
  .startAfter(lastDoc)
  .limit(10)
  .get();
```

---

## Creating Documents

### Add (Auto-generated ID)

```typescript
const docRef = await db.collection('products').add({
  name: 'New Product',
  price: 50000,
  createdAt: new Date()
});

console.log('Created with ID:', docRef.id);
```

### Set (Custom ID)

```typescript
await db.collection('products').doc('custom-id').set({
  name: 'Custom Product',
  price: 60000
});
```

---

## Updating Documents

### Update Specific Fields

```typescript
await db.collection('products').doc('productId').update({
  price: 55000,
  updatedAt: new Date()
});
```

### Set with Merge (Create or Update)

```typescript
await db.collection('products').doc('productId').set({
  price: 55000
}, { merge: true });
```

---

## Deleting Documents

```typescript
await db.collection('products').doc('productId').delete();
```

---

## Real-World Examples

### Search by Category

```typescript
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    let query = db.collection('products');
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    const snapshot = await query.get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

### Paginated Products

```typescript
export const getPaginatedProducts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;
    
    const snapshot = await db
      .collection('products')
      .orderBy('name')
      .limit(limit)
      .offset(skip)
      .get();
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({
      success: true,
      page,
      limit,
      data: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

---

## 🔗 Learn More

**Google:**
- "Firestore query data Node.js"
- "Firestore compound queries"
- "Firestore pagination best practices"
- "Firestore array-contains query"

**Official Docs:**
- https://firebase.google.com/docs/firestore/query-data/queries
- https://firebase.google.com/docs/firestore/query-data/order-limit-data

---

**Next:** [Testing Tools →](../04-testing/testing-tools.md)
