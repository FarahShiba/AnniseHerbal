# 📦 Get All Products API

**Endpoint:** `GET /api/products`  
**Purpose:** Fetch all products from database  
**Authentication:** None required

---

## 📋 Overview

Returns a complete list of all products from all categories and sizes. Ideal for:
- Homepage product listings
- Search/filter pages
- Catalog browsing
- Building frontend product cache

---

## 🔗 Request

### **Method & URL**

```
GET http://localhost:3000/api/products
```

### **Headers**

No special headers required.

### **Query Parameters**

None. This endpoint returns all products.

### **Request Body**

Not applicable (GET request).

---

## ✅ Success Response

### **Status Code:** `200 OK`

### **Response Body:**

```json
[
  {
    "id": "5G5XUIqAz0Kh5iEpMxhn",
    "name": "Eucalyptus Relief Oil",
    "name_en": "Eucalyptus Relief Oil",
    "category": "respiratory",
    "sizeName": "15ml",
    "price": 85000,
    "shortDesc": "Minyak Eucalyptus untuk pernapasan",
    "shortDesc_en": "Eucalyptus oil for respiratory health",
    "description": "Formulasi khusus untuk...",
    "benefits": [
      "Melancarkan pernapasan",
      "Meredakan hidung tersumbat"
    ],
    "ingredients": "Eucalyptus oil, Menthol, ...",
    "howToUse": [
      "Teteskan 2-3 tetes ke air panas",
      "Hirup uapnya selama 5-10 menit"
    ],
    "image": "https://storage.googleapis.com/...",
    "images": ["url1", "url2"],
    "tags": ["respiratory", "eucalyptus"],
    "createdAt": "2026-01-15T10:00:00Z"
  },
  {
    "id": "JQ03ZDUeFUAr6bHNEROM",
    "name": "Max Pain Relief Oil",
    "category": "pain-relief",
    "sizeName": "100ml",
    "price": 185000,
    ...
  }
  // ... more products
]
```

---

## 📊 Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique product document ID |
| `name` | string | Product name (Indonesian) |
| `name_en` | string | Product name (English) |
| `category` | string | Product category (e.g., "pain-relief", "respiratory") |
| `sizeName` | string | Product size (e.g., "100ml", "15ml") |
| `price` | number | Price in Indonesian Rupiah |
| `shortDesc` | string | Short description (Indonesian) |
| `shortDesc_en` | string | Short description (English) |
| `description` | string | Full description (optional) |
| `benefits` | string[] | Array of product benefits |
| `ingredients` | string | List of ingredients |
| `howToUse` | string[] | Usage instructions |
| `image` | string | Main product image URL |
| `images` | string[] | Additional images (optional) |
| `tags` | string[] | Search tags (optional) |
| `createdAt` | Date | Product creation date (optional) |

---

## ❌ Error Responses

### **500 Internal Server Error**

**When:** Database connection failed or server error

**Response:**
```json
{
  "error": "Failed to fetch products"
}
```

**Common Causes:**
- Firebase connection issue
- Firestore credentials invalid
- Server crashed
- Network timeout

**How to debug:**
1. Check server console logs
2. Verify Firebase configuration
3. Check `.env` file has correct credentials
4. Test Firebase connection with health check endpoint

---

## 💡 Usage Examples

### **JavaScript/TypeScript (Frontend)**

```typescript
// Using fetch
const getAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    console.log(`Fetched ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

### **cURL (Terminal)**

```bash
curl -X GET http://localhost:3000/api/products
```

### **Postman**

1. Method: `GET`
2. URL: `http://localhost:3000/api/products`
3. Click **Send**
4. View response in Body tab

---

## 🏗️ Database Structure

### **Firestore Path:**

```
products/
├── {category}/              (e.g., "pain-relief", "respiratory")
│   └── {size}/              (e.g., "100ml", "15ml")
│       └── {productId}/     (e.g., "JQ03ZDUeFUAr6bHNEROM")
│           ├── name: string
│           ├── price: number
│           └── ...other fields
```

### **How Data is Fetched:**

1. Loop through all category documents
2. For each category, get all size sub-collections
3. For each size, get all product documents
4. Flatten into single array with `category` and `sizeName` added
5. Return complete array

---

## 🎯 Implementation Details

### **Controller:** `src/controllers/productsController.ts`

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts: ProductTypes[] = [];
    const productsCollection = db.collection("products");
    const categoriesSnapshot = await productsCollection.get();

    // Loop through categories
    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryName = categoryDoc.id;
      const sizesSnapshot = await categoryDoc.ref.listCollections();
      
      // Loop through sizes
      for (const sizeCollection of sizesSnapshot) {
        const sizeName = sizeCollection.id;
        const productsSnapshot = await sizeCollection.get();
        
        // Add each product to array
        productsSnapshot.docs.forEach(doc => {
          const data = doc.data() as ProductTypes;
          allProducts.push({
            ...data,
            id: doc.id,
            category: categoryName,
            sizeName: sizeName
          });
        });
      }
    }

    res.status(200).json(allProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
```

### **Route:** `src/routes/products.ts`

```typescript
router.get('/', getAllProducts);
```

### **Registration:** `src/index.ts`

```typescript
app.use('/api/products', productsRouter);
```

---

## 🧪 Testing

### **Test Case 1: Success (200)**

**Request:**
```
GET http://localhost:3000/api/products
```

**Expected:**
- Status: 200 OK
- Body: Array of products
- Response time: < 500ms

**Verify:**
- Array is returned (not object)
- Each item has `id`, `name`, `category`, `sizeName`, `price`
- Product count matches database (~50 products)

---

### **Test Case 2: Server Error (500)**

**Simulate:**
- Stop Firebase
- Or use invalid credentials

**Expected:**
- Status: 500 Internal Server Error
- Body: `{ "error": "Failed to fetch products" }`

---

## 🔍 Troubleshooting

### **Issue: Empty array `[]` returned**

**Cause:** No products in database

**Solution:**
- Add products to Firestore
- Check collection name is exactly "products"
- Verify nested structure matches expected format

---

### **Issue: Some products missing**

**Cause:** Incomplete nested structure

**Solution:**
- Verify all categories have size sub-collections
- Check product documents exist within size collections
- Review Firestore data structure

---

### **Issue: Slow response (> 1 second)**

**Cause:** Multiple nested queries

**Solution:**
- Normal for first request (cold start)
- Implement caching on frontend
- Consider pagination for > 100 products
- Add database indexing

---

## 📈 Performance Considerations

**Current approach:**
- ✅ Good for ~50-100 products
- ✅ Simple implementation
- ❌ Slower for > 500 products

**Future optimizations:**
- Implement pagination
- Add search/filter endpoints
- Cache responses
- Use Firebase composite indexes

---

## 🔗 Related Documentation

- [Product By ID API](./api-product-by-id.md)
- [Database Structure](./database-structure.md)
- [TypeScript Types](../src/types/product.ts)

---

**Last Updated:** February 28, 2026
