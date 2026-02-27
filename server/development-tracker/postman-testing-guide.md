# 🧪 Postman API Testing Guide

**Project:** Annise Herbal E-Commerce Backend  
**Created:** February 26, 2026  
**Purpose:** Step-by-step guide to test your APIs with Postman

---

## 📥 Step 1: Download & Install Postman

### **Option A: Desktop App (Recommended)**
1. Go to: https://www.postman.com/downloads/
2. Click **"Download for Windows"**
3. Install the downloaded file
4. Open Postman
5. Skip sign-up (click "Skip and go to the app")

### **Option B: Web Version**
1. Go to: https://web.postman.co/
2. Sign up with Google account (free)
3. Use in browser

---

## 🚀 Step 2: Start Your Server

Before testing, your backend server MUST be running!

### **Open Terminal (in VS Code):**
```bash
# Navigate to server folder
cd server

# Start server
npm run dev
```

### **Check if running:**
```
You should see:
✅ Server running at http://localhost:5000
✅ Firebase connected
✅ No error messages
```

### **If you see errors:**
- Check if port 5000 is already in use
- Check Firebase credentials in `.env`
- Check Node.js is installed: `node --version`

---

## 🎯 Step 3: Test Health Check Endpoint (Easy First Test)

### **Why start here?**
- Simplest endpoint to test
- Verifies server is actually running
- No database query needed
- Good practice for beginners

### **Steps in Postman:**

**3.1 Create New Request:**
- Click **"+"** tab or **"New" → "HTTP Request"**

**3.2 Set Method:**
- Click dropdown (says "GET" by default)
- Select: **GET**

**3.3 Enter URL:**
```
http://localhost:5000/api/health
```

**3.4 Click "Send" Button**

### **Expected Response:**

**Status Code:**
```
200 OK (green)
```

**Response Body:**
```json
{
  "status": "ok",
  "message": "Server is running and connected to Firebase",
  "timeStamp": "2026-02-26T10:30:00.000Z",
  "firebase": "connected"
}
```

### **What Each Part Means:**

```json
"status": "ok"           ← Server is healthy
"message": "..."         ← Human-readable status
"timeStamp": "..."       ← When response was sent
"firebase": "connected"  ← Database connection works
```

### **✅ Success Checklist:**
- [ ] Status is 200 OK (not 404, not 500)
- [ ] Response has "status": "ok"
- [ ] Response has "firebase": "connected"
- [ ] Response time < 1 second

### **❌ If It Fails:**

**Error: "Could not get any response"**
```
Problem: Server not running
Solution: Go back to Step 2, start server
```

**Error: "connect ECONNREFUSED"**
```
Problem: Wrong port or server crashed
Solution: Check terminal for errors, restart server
```

---

## 📦 Step 4: Test Get All Products

### **Purpose:**
- Verify you can fetch all products from database
- Check if Firestore connection works
- See your actual product data

### **Steps in Postman:**

**4.1 Create New Request:**
- Click **"+"** to open new tab

**4.2 Set Method:**
- Select: **GET**

**4.3 Enter URL:**
```
http://localhost:5000/api/products
```

**4.4 Click "Send"**

### **Expected Response:**

**Status Code:**
```
200 OK
```

**Response Body (example):**
```json
[
  {
    "id": "prod-001",
    "name": "Max Pain Relief Oil",
    "name_en": "Max Pain Relief Oil",
    "category": "pain-relief",
    "sizeName": "100ml",
    "price": 185000,
    "shortDesc": "Minyak Pijat Herbal",
    "description": "...",
    "benefits": [...],
    "composition": "...",
    "usage": "...",
    "image": "..."
  },
  {
    "id": "prod-002",
    "name": "HemoClear Oil",
    ...
  },
  ...more products...
]
```

### **What to Check:**

**✅ Response Structure:**
- [ ] It's an array `[...]` not an object `{...}`
- [ ] Each product has `id`, `name`, `price`
- [ ] Each product has `category` and `sizeName`
- [ ] Images URLs are present

**✅ Data Validation:**
- [ ] Prices are numbers (not strings)
- [ ] Names are in correct language
- [ ] Categories match your database

**✅ Performance:**
- [ ] Response time < 500ms
- [ ] All ~50 products returned

### **❌ Common Issues:**

**Response is empty array `[]`**
```
Problem: No products in database
Solution: Add products to Firestore first
```

**Error: "Failed to fetch products"**
```
Problem: Firestore connection issue
Solution: Check Firebase credentials in .env
```

---

## 🔍 Step 5: Test Get Single Product by ID

### **Purpose:**
- Test fetching specific product
- Verify URL parameters work
- Test error handling (404 for invalid ID)

---

### **Test 5A: Valid Product (Should Work)**

**5A.1 Create New Request:**
- Click **"+"** for new tab

**5A.2 Set Method:**
- Select: **GET**

**5A.3 Enter URL:**

**⚠️ IMPORTANT: Replace with YOUR actual product data!**

```
http://localhost:5000/api/products/pain-relief/100ml/prod-001
                                    └────┬────┘  └─┬─┘ └──┬───┘
                                   category    size    productId
```

**How to find YOUR product IDs:**
1. Look at response from Step 4 (Get All Products)
2. Find a product from the array
3. Note its `category`, `sizeName`, and `id`
4. Use those values in the URL

**Example from your data:**
```
Product: Max Pain Relief Oil
Category: pain-relief
Size: 100ml
ID: prod-001

URL: http://localhost:5000/api/products/pain-relief/100ml/prod-001
```

**5A.4 Click "Send"**

### **Expected Response:**

**Status Code:**
```
200 OK
```

**Response Body:**
```json
{
  "success": true,
  "data": {
    "id": "prod-001",
    "name": "Max Pain Relief Oil",
    "category": "pain-relief",
    "sizeName": "100ml",
    "price": 185000,
    "shortDesc": "Minyak Pijat Herbal Pegal Linu",
    "description": "Full description here...",
    "benefits": ["Benefit 1", "Benefit 2"],
    "composition": "List of ingredients...",
    "usage": "How to use...",
    "image": "url to image..."
  }
}
```

### **What to Check:**

**✅ Response Structure:**
- [ ] Has `success: true`
- [ ] Has `data` object containing product
- [ ] Product has all fields (name, price, etc.)
- [ ] `category` and `sizeName` match URL

**✅ Data Accuracy:**
- [ ] Product details match what's in database
- [ ] Price is correct
- [ ] Images load properly

---

### **Test 5B: Invalid Product (Should Return 404)**

**5B.1 Use Same Request Tab**

**5B.2 Change URL to Invalid ID:**
```
http://localhost:5000/api/products/pain-relief/100ml/INVALID-ID-999
                                                        └─────┬─────┘
                                                    This doesn't exist!
```

**5B.3 Click "Send"**

### **Expected Response:**

**Status Code:**
```
404 Not Found (orange/yellow)
```

**Response Body:**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Product with ID 'INVALID-ID-999' not found in category 'pain-relief' and size '100ml'"
}
```

### **What to Check:**

**✅ Error Handling:**
- [ ] Status is 404 (NOT 500, NOT 200)
- [ ] Has `success: false`
- [ ] Error message is helpful and clear
- [ ] Message includes the ID that was requested

**Why This Test Matters:**
```
When customer clicks broken/old product link:
❌ Without 404 handling: Server crashes or shows confusing error
✅ With 404 handling: Shows "Product no longer available" message
```

---

### **Test 5C: Invalid Category (Should Also Return 404)**

**5C.1 Change URL:**
```
http://localhost:5000/api/products/FAKE-CATEGORY/100ml/prod-001
                                    └─────┬──────┘
                                   Category doesn't exist
```

**5C.2 Click "Send"**

### **Expected Response:**

**Status Code:**
```
404 Not Found
```

**Response Body:**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Product with ID 'prod-001' not found in category 'FAKE-CATEGORY' and size '100ml'"
}
```

---

## 💾 Step 6: Save Your Tests (Important!)

### **Why Save Tests?**
- Don't retype URLs every time
- Organize tests by feature
- Share with team members
- Quick re-testing after code changes

### **How to Save:**

**6.1 Create Collection:**
- Click **"Collections"** in left sidebar
- Click **"+"** or **"Create Collection"**
- Name it: **"Annise Herbal API"**
- Click **"Create"**

**6.2 Save Request to Collection:**
- In your request tab, click **"Save"** button
- Request Name: **"Get Single Product by ID"**
- Select Collection: **"Annise Herbal API"**
- Click **"Save"**

**6.3 Repeat for All Tests:**
```
Collection: Annise Herbal API
├── Health Check
├── Get All Products
├── Get Product by ID (Valid)
├── Get Product by ID (404 Error)
└── Get Product by ID (Invalid Category)
```

---

## 📊 Step 7: Understanding the Response

### **Postman Response Tabs:**

```
┌─────────────────────────────────────┐
│ Body | Cookies | Headers | Test Results│
└─────────────────────────────────────┘
```

### **Body Tab:**
- Shows the actual data returned
- Can view as: Pretty, Raw, Preview
- **Pretty**: Formatted JSON (easiest to read)
- **Raw**: Unformatted text
- **Preview**: Rendered HTML (not useful for JSON APIs)

### **Headers Tab:**
```
What your server sends back:

Content-Type: application/json  ← Data format
Content-Length: 1234            ← Response size
Date: Wed, 26 Feb 2026 10:30:00 GMT
Connection: keep-alive
```

### **Test Results Tab:**
- Shows automated test results (advanced)
- We'll use this later for automated testing

---

## 🎯 Step 8: Testing Checklist Template

**Use this for EVERY endpoint you build:**

```markdown
### Testing: [Endpoint Name]

**Endpoint:** GET /api/products/:category/:size/:id
**Date Tested:** 2026-02-26
**Tested By:** [Your Name]

#### Test Cases:

- [ ] **Happy Path (Valid Data)**
  - URL: http://localhost:5000/api/products/pain-relief/100ml/prod-001
  - Expected: 200 OK
  - Result: ✅ PASS / ❌ FAIL
  - Notes: ___

- [ ] **Error Case (Invalid ID)**
  - URL: http://localhost:5000/api/products/pain-relief/100ml/INVALID
  - Expected: 404 Not Found
  - Result: ✅ PASS / ❌ FAIL
  - Notes: ___

- [ ] **Error Case (Missing Parameters)**
  - URL: http://localhost:5000/api/products/pain-relief
  - Expected: 404 Not Found
  - Result: ✅ PASS / ❌ FAIL
  - Notes: ___

- [ ] **Performance Check**
  - Response time: ___ ms
  - Expected: < 500ms
  - Result: ✅ PASS / ❌ FAIL

- [ ] **Data Validation**
  - [ ] All required fields present
  - [ ] Data types correct (string/number/array)
  - [ ] No sensitive data exposed
  - [ ] Matches database structure

#### Issues Found:
1. ___
2. ___

#### Fix Applied:
1. ___
2. ___

#### Retested: ✅ YES / ⏳ PENDING
```

---

## 🔧 Step 9: Common Postman Features

### **Environment Variables (For Different Servers)**

**Use Case:**
```
Development: http://localhost:5000
Production: https://api.anniseherbal.com

Instead of changing URL every time, use:
{{baseURL}}/api/products
```

**Setup:**
1. Click gear icon (⚙️) top right
2. Click **"Manage Environments"**
3. Click **"Add"**
4. Name: **"Development"**
5. Add variable:
   - Variable: `baseURL`
   - Initial Value: `http://localhost:5000`
   - Current Value: `http://localhost:5000`
6. Click **"Add"**

**Usage:**
```
Instead of: http://localhost:5000/api/products
Use: {{baseURL}}/api/products
```

Now you can switch between dev/production easily!

---

### **Copy as cURL (Share with Others)**

**Use Case:** Share request with team who don't use Postman

**Steps:**
1. Right-click on request
2. Select **"Copy as cURL"**
3. Paste in terminal or share via chat

**Example cURL:**
```bash
curl --location 'http://localhost:5000/api/products/pain-relief/100ml/prod-001'
```

---

## 📚 Step 10: Testing Your Next APIs

### **When You Build Contact Form API:**

```
Endpoint: POST /api/contact
Method: POST
URL: http://localhost:5000/api/contact

Headers:
├─ Content-Type: application/json

Body (JSON):
{
  "name": "John Doe",
  "contact": "john@email.com",
  "message": "I want to buy eucalyptus oil"
}

Expected Response: 200 OK
{
  "success": true,
  "message": "Pesan Anda telah diterima",
  "contactId": "contact-abc123"
}
```

**Steps:**
1. Create new request
2. Set method to **POST**
3. Enter URL
4. Click **"Body"** tab
5. Select **"raw"**
6. Select **"JSON"** from dropdown
7. Paste JSON in text area
8. Click **"Send"**

---

## 🎓 Pro Tips

### **Tip 1: Use Collections for Organization**
```
Annise Herbal API/
├── 📁 Products/
│   ├── Get All Products
│   ├── Get Single Product
│   └── Search Products
├── 📁 Contact/
│   └── Submit Contact Form
└── 📁 Newsletter/
    └── Subscribe
```

### **Tip 2: Add Descriptions**
- Click request name
- Add description in right panel
- Document expected behavior
- Add example responses

### **Tip 3: Use Tests (Automated)**
```javascript
// In "Tests" tab of request:
pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Has product name", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.name).to.exist;
});
```

### **Tip 4: Keyboard Shortcuts**
- `Ctrl + Enter` = Send request
- `Ctrl + N` = New request
- `Ctrl + S` = Save request

---

## ✅ Quick Reference: HTTP Methods

```
GET    = Read/Fetch data (no body needed)
POST   = Create new data (body required)
PUT    = Update entire resource (body required)
PATCH  = Update partial resource (body required)
DELETE = Remove resource (no body needed)
```

---

## 🎯 Your Action Plan

**Today:**
- [ ] Download Postman
- [ ] Start your server
- [ ] Test health check endpoint
- [ ] Test get all products
- [ ] Test get single product (valid)
- [ ] Test get single product (404 error)
- [ ] Save all tests to collection

**This Week:**
- [ ] Build next API (Contact Form)
- [ ] Test with Postman
- [ ] Document results
- [ ] Fix any issues found

**Ongoing:**
- [ ] Test EVERY endpoint you build
- [ ] Test both success and error cases
- [ ] Document in this tracker
- [ ] Share collection with team (export as JSON)

---

## 📞 Need Help?

**Server won't start:**
- Check `npm run dev` output for errors
- Verify Firebase credentials
- Check port 5000 not in use: `netstat -ano | findstr :5000`

**Postman shows error:**
- Check server is actually running
- Check URL is correct (http://localhost:5000)
- Check method is correct (GET/POST)
- Check no typos in endpoint

**404 on all requests:**
- Server running on different port?
- Routes not registered in index.ts?
- Check terminal logs

---

**Testing Date:** _______________  
**Tested By:** _______________  
**All Tests Passed:** ✅ YES / ❌ NO / ⏳ PENDING

---

**Now go test your API! Start with Step 1!** 🚀
