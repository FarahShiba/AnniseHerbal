# 🔍 Get Product By ID API

**Endpoint:** `GET /api/products/:category/:size/:id`  
**Purpose:** Fetch a single product by its unique identifier  
**Authentication:** None required

---

## 📋 Overview

Returns detailed information about a specific product. Used for:
- Product detail pages
- Direct product links (from Google, social media)
- Shopping cart item lookup
- Single product refresh

---

## 🔗 Request

### **Method & URL**

```
GET http://localhost:3000/api/products/{category}/{size}/{id}
```

### **URL Parameters**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `category` | string | ✅ Yes | Product category | `respiratory`, `pain-relief`, `skincare` |
| `size` | string | ✅ Yes | Product size | `15ml`, `100ml`, `200ml` |
| `id` | string | ✅ Yes | Unique product document ID | `5G5XUIqAz0Kh5iEpMxhn` |

### **Example URLs**

```
GET /api/products/respiratory/15ml/5G5XUIqAz0Kh5iEpMxhn
GET /api/products/pain-relief/100ml/JQ03ZDUeFUAr6bHNEROM
GET /api/products/skincare/200ml/abc123def456
```

### **Headers**

No special headers required.

### **Request Body**

Not applicable (GET request).

---

## ⚠️ Important: How to Get Correct Parameters

**❌ DON'T guess or type manually:**
```
GET /api/products/respiratory/size 15ml/5G5XUIqAz0Kh5iEpMxhn  // Wrong!
GET /api/products/Respiratory/15ml/5G5XUIqAz0Kh5iEpMxhn      // Wrong case!
```

**✅ DO use values from getAllProducts first:**

```typescript
// Step 1: Get all products
const products = await fetch('/api/products').then(r => r.json());

// Step 2: Find your product
const myProduct = products.find(p => p.name.includes('Eucalyptus'));

// Step 3: Use EXACT values
const category = myProduct.category;  // "respiratory" (exact from DB)
const size = myProduct.sizeName;      // "15ml" (exact from DB)
const id = myProduct.id;              // "5G5XUIqAz0Kh5iEpMxhn" (exact)

// Step 4: Build URL
const url = `/api/products/${category}/${size}/${id}`;
```

---

## ✅ Success Response

### **Status Code:** `200 OK`

### **Response Body:**

```json
{
  "success": true,
  "data": {
    "id": "5G5XUIqAz0Kh5iEpMxhn",
    "name": "Eucalyptus Relief Oil",
    "name_en": "Eucalyptus Relief Oil",
    "category": "respiratory",
    "sizeName": "15ml",
    "price": 85000,
    "shortDesc": "Minyak Eucalyptus untuk pernapasan",
    "shortDesc_en": "Eucalyptus oil for respiratory health",
    "description": "Formulasi khusus untuk meredakan gangguan pernapasan...",
    "benefits": [
      "Melancarkan pernapasan",
      "Meredakan hidung tersumbat",
      "Membantu mengurangi batuk"
    ],
    "ingredients": "Eucalyptus oil, Menthol, Essential oils blend",
    "howToUse": [
      "Teteskan 2-3 tetes ke air panas",
      "Hirup uapnya selama 5-10 menit",
      "Gunakan 2-3 kali sehari"
    ],
    "image": "https://storage.googleapis.com/...",
    "images": [
      "https://storage.googleapis.com/.../front.jpg",
      "https://storage.googleapis.com/.../back.jpg"
    ],
    "tags": ["respiratory", "eucalyptus", "breathing"],
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

---

## ❌ Error Responses

### **404 Not Found**

**When:** Product doesn't exist with given category/size/id

**Response:**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Product with ID '5G5XUIqAz0Kh5iEpMxhn' not found in category 'respiratory' and size '15ml'"
}
```

**Common Causes:**
- Product ID doesn't exist
- Wrong category (typo or wrong value)
- Wrong size (typo or wrong value)
- Product was deleted from database
- Case sensitivity issue ("Respiratory" vs "respiratory")

---

### **500 Internal Server Error**

**When:** Database connection failed or server error

**Response:**
```json
{
  "success": false,
  "error": "Failed to fetch product",
  "message": "An error occurred while fetching the product. Please try again."
}
```

**Common Causes:**
- Firebase connection issue
- Server crashed
- Network timeout

---

## 💡 Usage Examples

### **JavaScript/TypeScript (Frontend)**

```typescript
const getProductById = async (category: string, size: string, id: string) => {
  try {
    const url = `http://localhost:3000/api/products/${category}/${size}/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Product not found`);
    }
    
    const result = await response.json();
    return result.data; // The product object
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Usage
const product = await getProductById('respiratory', '15ml', '5G5XUIqAz0Kh5iEpMxhn');
console.log(product.name); // "Eucalyptus Relief Oil"
```

### **React Component Example**

```typescript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { category, size, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${category}/${size}/${id}`
        );
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const result = await response.json();
        setProduct(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, size, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: Rp {product.price.toLocaleString()}</p>
      <p>{product.description}</p>
    </div>
  );
}
```

### **cURL (Terminal)**

```bash
curl -X GET "http://localhost:3000/api/products/respiratory/15ml/5G5XUIqAz0Kh5iEpMxhn"
```

### **Postman**

1. Method: `GET`
2. URL: `http://localhost:3000/api/products/respiratory/15ml/5G5XUIqAz0Kh5iEpMxhn`
3. Click **Send**
4. View response in Body tab

---

## 🏗️ Database Structure

### **Firestore Path:**

```
products/
└── {category}/                    ← First parameter
    └── {size}/                    ← Second parameter
        └── {productId}/           ← Third parameter
            ├── name: "..."
            ├── price: 85000
            └── ...other fields
```

### **Example:**

```
products/
└── respiratory/
    └── 15ml/
        └── 5G5XUIqAz0Kh5iEpMxhn/
            ├── name: "Eucalyptus Relief Oil"
            ├── price: 85000
            └── ...
```

### **How Data is Fetched:**

```typescript
db.collection("products")           // Root collection
  .doc(category)                    // "respiratory"
  .collection(sizeName)             // "15ml"
  .doc(id)                          // "5G5XUIqAz0Kh5iEpMxhn"
  .get()                            // Fetch document
```

---

## 🎯 Implementation Details

### **Controller:** `src/controllers/productsController.ts`

```typescript
interface ProductParams {
  category: string;
  sizeName: string;
  id: string;
}

export const getProductById = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    // Extract URL parameters
    const { category, sizeName, id } = req.params;

    console.log(`🔍 Fetching product: ${category}/${sizeName}/${id}`);

    // Build Firestore path
    const productRef = db
      .collection("products")
      .doc(category)
      .collection(sizeName)
      .doc(id);

    // Fetch document
    const productDoc = await productRef.get();

    // Check if exists
    if (!productDoc.exists) {
      console.log(`❌ Product not found: ${category}/${sizeName}/${id}`);
      return res.status(404).json({
        success: false,
        error: "Product not found",
        message: `Product with ID '${id}' not found in category '${category}' and size '${sizeName}'`
      });
    }

    // Get data and add metadata
    const productData = productDoc.data() as ProductTypes;
    const product: ProductTypes = {
      ...productData,
      id: productDoc.id,
      category: category,
      sizeName: sizeName
    };

    console.log(`✅ Product found: ${product.name}`);

    // Return success
    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch product",
      message: "An error occurred while fetching the product. Please try again."
    });
  }
};
```

### **Route:** `src/routes/products.ts`

```typescript
router.get('/:category/:sizeName/:id', getProductById);
```

### **TypeScript Type Safety:**

```typescript
// Define parameter interface
interface ProductParams {
  category: string;
  sizeName: string;
  id: string;
}

// Use in controller
req: Request<ProductParams>

// TypeScript ensures:
req.params.category   // ✅ Type: string
req.params.sizeName   // ✅ Type: string
req.params.id         // ✅ Type: string
req.params.invalid    // ❌ TypeScript error!
```

---

## 🧪 Testing

### **Test Case 1: Valid Product (200)**

**Request:**
```
GET /api/products/respiratory/15ml/5G5XUIqAz0Kh5iEpMxhn
```

**Expected:**
- Status: 200 OK
- Body: `{ success: true, data: { ...product } }`
- Response has `id`, `category`, `sizeName` fields
- Response time: < 200ms

---

### **Test Case 2: Invalid Product ID (404)**

**Request:**
```
GET /api/products/respiratory/15ml/INVALID-ID-999
```

**Expected:**
- Status: 404 Not Found
- Body: `{ success: false, error: "Product not found", message: "..." }`
- Error message includes the ID attempted

---

### **Test Case 3: Invalid Category (404)**

**Request:**
```
GET /api/products/FAKE-CATEGORY/15ml/5G5XUIqAz0Kh5iEpMxhn
```

**Expected:**
- Status: 404 Not Found
- Body: `{ success: false, error: "Product not found", ... }`

---

### **Test Case 4: Missing Parameters (404)**

**Request:**
```
GET /api/products/respiratory/15ml
```

**Expected:**
- Status: 404 Not Found
- Route doesn't match (missing ID parameter)

---

## 🔍 Troubleshooting

### **Issue: Always getting 404**

**Checklist:**
1. ✅ Get category/size/id from `getAllProducts` first
2. ✅ Copy values EXACTLY (case-sensitive)
3. ✅ No extra spaces or special characters
4. ✅ URL structure: `/category/size/id` (no "size" word prefix)
5. ✅ Check product exists in Firebase Console

**Example debugging:**
```typescript
// Get all products first
const products = await fetch('/api/products').then(r => r.json());

// Find your product
const product = products.find(p => p.name.includes('Eucalyptus'));

// Log exact values
console.log('Category:', product.category);    // "respiratory"
console.log('Size:', product.sizeName);        // "15ml"
console.log('ID:', product.id);                // "5G5XUIqAz0Kh5iEpMxhn"

// Build URL
const url = `/api/products/${product.category}/${product.sizeName}/${product.id}`;
console.log('URL:', url);  // Verify format
```

---

### **Issue: URL encoding problems**

**Problem:** Spaces or special characters in URL

**Solution:**
```typescript
// ❌ Wrong
const url = `/api/products/pain relief/100ml/abc`;  // Space!

// ✅ Correct
const url = `/api/products/pain-relief/100ml/abc`;  // Hyphen, no space

// If needed, encode:
const category = encodeURIComponent(categoryValue);
const url = `/api/products/${category}/${size}/${id}`;
```

---

### **Issue: TypeScript error `string | string[]`**

**Problem:** Express params can be array or string

**Solution:** Already handled with `ProductParams` interface
```typescript
interface ProductParams {
  category: string;  // TypeScript knows it's string
  sizeName: string;
  id: string;
}

export const getProductById = async (
  req: Request<ProductParams>,  // Type parameter
  res: Response
) => {
  // No TypeScript errors!
  const { category, sizeName, id } = req.params;
};
```

---

## 📈 Performance

**Response time:** ~100-200ms (single document lookup)

**Optimization:**
- Already optimized (direct document access)
- No need for pagination (single result)
- Consider caching on frontend

---

## 🔗 Related Documentation

- [Get All Products API](./api-products.md)
- [Database Structure](./database-structure.md)
- [Error Handling](./error-handling.md)

---

**Last Updated:** February 28, 2026
