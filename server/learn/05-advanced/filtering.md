# 🔍 Filtering & Search Guide

## Why Filtering?

Let users find exactly what they want:
- Filter by category
- Filter by price range
- Search by name
- Filter by tags

---

## Basic Filtering

### Single Filter (Category)

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

**Usage:**
```
GET /api/products?category=herbal
GET /api/products?category=respiratory
```

---

## Multiple Filters

```typescript
export const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    
    let query = db.collection('products');
    
    // Category filter
    if (category) {
      query = query.where('category', '==', category as string);
    }
    
    // Price range filter
    if (minPrice) {
      query = query.where('price', '>=', parseInt(minPrice as string));
    }
    
    if (maxPrice) {
      query = query.where('price', '<=', parseInt(maxPrice as string));
    }
    
    const snapshot = await query.get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({
      success: true,
      count: products.length,
      filters: { category, minPrice, maxPrice },
      data: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

**Usage:**
```
GET /api/products?category=herbal&minPrice=50000&maxPrice=100000
```

---

## Array Filtering (Tags)

### Contains Any Tag

```typescript
export const getProductsByTag = async (req: Request, res: Response) => {
  try {
    const { tag } = req.query;
    
    if (!tag) {
      return res.status(400).json({ error: 'Tag parameter required' });
    }
    
    // Firestore: where array contains value
    const snapshot = await db
      .collection('products')
      .where('tags', 'array-contains', tag as string)
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

**Usage:**
```
GET /api/products?tag=organic
```

---

## Sorting

```typescript
export const getSortedProducts = async (req: Request, res: Response) => {
  try {
    const { sortBy, order } = req.query;
    
    // Default sorting
    let orderByField = sortBy as string || 'name';
    let orderByDirection: 'asc' | 'desc' = (order as string === 'desc') ? 'desc' : 'asc';
    
    const snapshot = await db
      .collection('products')
      .orderBy(orderByField, orderByDirection)
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

**Usage:**
```
GET /api/products?sortBy=price&order=asc    → Cheapest first
GET /api/products?sortBy=price&order=desc   → Most expensive first
GET /api/products?sortBy=name&order=asc     → A-Z
```

---

## Search by Name

### Simple Search (Client-Side)

```typescript
// Fetch all, filter in code (OK for small datasets)
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query; // Search query
    
    const snapshot = await db.collection('products').get();
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filter by search query
    if (q) {
      const searchTerm = (q as string).toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.name_en.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};
```

**Usage:**
```
GET /api/products?q=flux     → Finds "Fluxent"
GET /api/products?q=oil      → Finds all products with "oil"
```

### Advanced Search (Firestore Limitation)

⚠️ **Firestore doesn't have built-in full-text search!**

**Options:**
1. **Algolia** - Third-party search service (recommended)
2. **Array-contains** - Store searchable terms in array
3. **ElasticSearch** - Self-hosted search engine

---

## Complete Filter Example

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { 
      category,
      tag,
      minPrice,
      maxPrice,
      sortBy,
      order,
      page,
      limit,
      q
    } = req.query;
    
    // Start query
    let query = db.collection('products');
    
    // Category filter
    if (category) {
      query = query.where('category', '==', category as string);
    }
    
    // Tag filter
    if (tag) {
      query = query.where('tags', 'array-contains', tag as string);
    }
    
    // Price range (need compound index in Firestore)
    if (minPrice) {
      query = query.where('price', '>=', parseInt(minPrice as string));
    }
    
    // Sorting
    const sortField = sortBy as string || 'name';
    const sortOrder: 'asc' | 'desc' = (order as string === 'desc') ? 'desc' : 'asc';
    query = query.orderBy(sortField, sortOrder);
    
    // Pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const offset = (pageNum - 1) * limitNum;
    
    query = query.limit(limitNum).offset(offset);
    
    // Execute query
    const snapshot = await query.get();
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Search filter (client-side)
    if (q) {
      const searchTerm = (q as string).toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      count: products.length,
      data: products,
      filters: { category, tag, minPrice, maxPrice, q },
      sort: { sortBy: sortField, order: sortOrder },
      pagination: { page: pageNum, limit: limitNum }
    });
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
```

**Usage:**
```
GET /api/products?category=herbal&sortBy=price&order=asc&page=1&limit=10
```

---

## Frontend Integration

```typescript
// Build query string dynamically
function buildQueryString(filters) {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.tag) params.append('tag', filters.tag);
  if (filters.search) params.append('q', filters.search);
  
  return params.toString();
}

// Usage
const filters = {
  category: 'herbal',
  minPrice: 50000,
  maxPrice: 100000
};

const queryString = buildQueryString(filters);
fetch(`/api/products?${queryString}`)
  .then(res => res.json())
  .then(data => setProducts(data.data));
```

---

## Firestore Composite Indexes

When combining filters, you may need to create indexes in Firebase Console.

**Example error:**
```
The query requires an index. You can create it here: [link]
```

**Click the link** and Firebase will create the index automatically.

---

## 🎯 Practice Exercise

1. Add category filter to your API
2. Add sorting by price
3. Test combinations:
   ```
   GET /api/products?category=herbal
   GET /api/products?sortBy=price&order=desc
   GET /api/products?category=herbal&sortBy=price&order=asc
   ```

---

## 🔗 Learn More

**Google:**
- "Firestore compound queries"
- "Firestore composite indexes"
- "API filtering best practices"
- "Algolia Firestore integration"

---

**Next:** [Error Handling →](error-handling.md)
