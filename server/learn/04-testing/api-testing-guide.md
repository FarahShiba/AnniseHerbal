# 🧪 API Testing Guide

## Prerequisites

1. ✅ Server running on `http://localhost:3000`
2. ✅ Thunder Client installed in VS Code
3. ✅ Products controller implemented
4. ✅ Routes set up in index.ts

---

## Testing GET /api/products

### Test 1: Get All Products

**Request:**
```
Method: GET
URL: http://localhost:3000/api/products
```

**Expected Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "abc123",
      "name": "Fluxent",
      "price": 89000,
      ...
    }
  ]
}
```

**What to Check:**
- [ ] Status code is 200
- [ ] Response has `success`, `count`, `data` fields
- [ ] `data` is an array
- [ ] Each product has required fields

---

## Testing GET /api/products/:id

### Test 2: Get Single Product (Exists)

**Request:**
```
Method: GET
URL: http://localhost:3000/api/products/REAL_PRODUCT_ID
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "name": "Fluxent",
    "price": 89000
  }
}
```

### Test 3: Get Single Product (Not Found)

**Request:**
```
Method: GET
URL: http://localhost:3000/api/products/nonexistent123
```

**Expected Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

---

## Testing POST /api/products

### Test 4: Create Product (Valid Data)

**Request:**
```
Method: POST
URL: http://localhost:3000/api/products
Headers: Content-Type: application/json
Body:
{
  "name": "Test Product",
  "name_en": "Test Product",
  "category": "test",
  "price": 50000,
  "shortDesc": "Test description",
  "shortDesc_en": "Test description",
  "description": "Full description",
  "description_en": "Full description",
  "benefits": ["Benefit 1"],
  "benefits_en": ["Benefit 1"],
  "ingredients": "Ingredients",
  "ingredients_en": "Ingredients",
  "howToUse": ["Step 1"],
  "howToUse_en": ["Step 1"],
  "imageColor": "#000000",
  "image": "test.jpg",
  "tags": ["test"]
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "newId123",
    "name": "Test Product",
    "price": 50000,
    ...
  }
}
```

### Test 5: Create Product (Missing Fields)

**Request:**
```
Method: POST
URL: http://localhost:3000/api/products
Body:
{
  "name": "Test Product"
  // Missing required fields
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Name and price are required"
}
```

---

## Testing PUT /api/products/:id

### Test 6: Update Product

**Request:**
```
Method: PUT
URL: http://localhost:3000/api/products/REAL_PRODUCT_ID
Body:
{
  "price": 95000
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "price": 95000,
    ...
  }
}
```

---

## Testing DELETE /api/products/:id

### Test 7: Delete Product

**Request:**
```
Method: DELETE
URL: http://localhost:3000/api/products/PRODUCT_TO_DELETE
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Common Issues & Solutions

### Issue: Can't connect to server
**Solution:** Make sure server is running (`npm run dev`)

### Issue: 404 Not Found
**Solution:** Check route is mounted in index.ts

### Issue: 500 Internal Server Error
**Solution:** Check server terminal for error logs

### Issue: CORS Error
**Solution:** Make sure CORS is configured in index.ts

---

## Testing Checklist

- [ ] GET all products returns array
- [ ] GET single product by valid ID works
- [ ] GET single product by invalid ID returns 404
- [ ] POST creates new product
- [ ] POST with missing data returns 400
- [ ] PUT updates existing product
- [ ] DELETE removes product
- [ ] Server handles errors gracefully

---

## 🔗 Learn More

**Google:**
- "HTTP status codes meaning"
- "REST API testing best practices"
- "Thunder Client tutorial"
- "Postman API testing"

---

**Congratulations! If all tests pass, your Products API is working! 🎉**
