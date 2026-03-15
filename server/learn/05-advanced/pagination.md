# 📄 Pagination Guide

## Why Pagination?

**Problem:** Fetching 1000+ products at once:
- ❌ Slow response time
- ❌ High memory usage
- ❌ Poor user experience
- ❌ Expensive database reads

**Solution:** Load data in chunks (pages)

---

## Pagination Strategies

### 1. Offset-Based (Simple)
- Uses `limit` and `offset`
- Easy to implement
- Can skip to any page
- ⚠️ Performance degrades with large offsets

### 2. Cursor-Based (Recommended for Firestore)
- Uses `startAfter` with document snapshot
- Better performance
- Works well with real-time updates
- Can't skip to arbitrary page

---

## Offset-Based Pagination

### Implementation

```typescript
export const getPaginatedProducts = async (req: Request, res: Response) => {
  try {
    // Get pagination params from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Query with limit and offset
    const snapshot = await db
      .collection('products')
      .orderBy('name')
      .limit(limit)
      .offset(offset)
      .get();
    
    // Get total count (for pagination info)
    const totalSnapshot = await db.collection('products').get();
    const totalProducts = totalSnapshot.size;
    const totalPages = Math.ceil(totalProducts / limit);
    
    // Transform data
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalProducts,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

### Usage
```
GET /api/products?page=1&limit=10  → First 10 products
GET /api/products?page=2&limit=10  → Next 10 products
GET /api/products?page=3&limit=20  → Products 41-60
```

---

## Cursor-Based Pagination (Better for Firestore)

### Implementation

```typescript
export const getCursorPaginatedProducts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string; // Document ID to start after
    
    let query = db
      .collection('products')
      .orderBy('createdAt', 'desc')
      .limit(limit + 1); // Get one extra to check if there's more
    
    // If cursor provided, start after that document
    if (cursor) {
      const cursorDoc = await db.collection('products').doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }
    
    const snapshot = await query.get();
    
    // Check if there are more results
    const hasMore = snapshot.docs.length > limit;
    
    // Remove extra document if it exists
    const products = snapshot.docs
      .slice(0, limit)
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    
    // Next cursor is the last document's ID
    const nextCursor = hasMore ? products[products.length - 1].id : null;
    
    res.json({
      success: true,
      data: products,
      pagination: {
        nextCursor: nextCursor,
        hasMore: hasMore,
        limit: limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

### Usage
```
GET /api/products?limit=10           → First 10 products
GET /api/products?limit=10&cursor=abc123  → Next 10 after product abc123
```

---

## Frontend Integration

### Offset-Based (Page Numbers)

```typescript
// React example
function ProductList() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    fetch(`/api/products?page=${page}&limit=12`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      });
  }, [page]);
  
  return (
    <div>
      {/* Products */}
      {products.map(p => <ProductCard key={p.id} {...p} />)}
      
      {/* Pagination */}
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}
```

### Cursor-Based (Infinite Scroll)

```typescript
// React example
function ProductList() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMore = async () => {
    const url = cursor 
      ? `/api/products?limit=12&cursor=${cursor}`
      : `/api/products?limit=12`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    setProducts(prev => [...prev, ...data.data]);
    setCursor(data.pagination.nextCursor);
    setHasMore(data.pagination.hasMore);
  };
  
  useEffect(() => {
    loadMore();
  }, []);
  
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} {...p} />)}
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
}
```

---

## Performance Optimization

### 1. Cache Total Count
```typescript
// Don't count on every request
// Store in Redis or update on product creation/deletion
const totalProducts = await redis.get('products:count');
```

### 2. Index Your Orders
```typescript
// Make sure Firestore has index on orderBy field
.orderBy('createdAt', 'desc')
// Create index in Firebase Console
```

### 3. Limit Maximum Page Size
```typescript
const MAX_LIMIT = 100;
const limit = Math.min(
  parseInt(req.query.limit as string) || 10,
  MAX_LIMIT
);
```

---

## Combining Pagination with Filters

```typescript
export const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    
    let query = db.collection('products');
    
    // Apply filter
    if (category) {
      query = query.where('category', '==', category);
    }
    
    // Apply pagination
    const snapshot = await query
      .orderBy('name')
      .limit(limit)
      .offset(offset)
      .get();
    
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

---

## 🎯 Practice Exercise

**Implement pagination for your products API:**

1. Add `page` and `limit` query parameters
2. Return pagination metadata
3. Test with Thunder Client:
   - `/api/products?page=1&limit=5`
   - `/api/products?page=2&limit=5`
4. Verify different pages return different products

---

## 🔗 Learn More

**Google:**
- "API pagination best practices"
- "Offset vs cursor pagination"
- "Firestore pagination tutorial"
- "Infinite scroll implementation"

---

**Next:** [Filtering →](filtering.md)
