# 🧪 Testing Tools Setup

## Option 1: Thunder Client (Recommended for Beginners)

### Installation
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "Thunder Client"
4. Click Install

### Usage
1. Click Thunder Client icon in sidebar
2. Click "New Request"
3. Select method (GET, POST, etc.)
4. Enter URL: `http://localhost:3000/api/products`
5. For POST/PUT: Go to "Body" tab, select "JSON"
6. Click "Send"

### Pros
- Built into VS Code
- Simple interface
- Save requests for reuse

---

## Option 2: Postman

### Installation
1. Download from getpostman.com
2. Install desktop app
3. Create free account (optional)

### Usage
Similar to Thunder Client but more features

---

## Option 3: curl (Command Line)

### Basic Commands

```bash
# GET request
curl http://localhost:3000/api/products

# GET with pretty JSON
curl http://localhost:3000/api/products | json_pp

# POST request
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":50000}'

# PUT request
curl -X PUT http://localhost:3000/api/products/123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","price":60000}'

# DELETE request
curl -X DELETE http://localhost:3000/api/products/123
```

---

## Testing Checklist

For each endpoint, test:

### ✅ Happy Path (Should work)
- Valid data
- Correct format
- Expected response

### ⚠️ Error Cases (Should fail gracefully)
- Missing required fields
- Invalid ID
- Non-existent resource
- Wrong data type

---

## Example Test Cases

### GET /api/products
- [ ] Returns 200 status
- [ ] Returns array of products
- [ ] Each product has required fields
- [ ] Response time < 1 second

### GET /api/products/:id
- [ ] Returns 200 for valid ID
- [ ] Returns 404 for invalid ID
- [ ] Product has all fields

### POST /api/products
- [ ] Returns 201 with valid data
- [ ] Returns 400 with missing fields
- [ ] Created product appears in GET request

---

**Next:** [API Testing Guide →](api-testing-guide.md)
