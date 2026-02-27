# 📨 Contact Form API

**Endpoint:** `POST /api/contact`  
**Purpose:** Submit customer contact form inquiries  
**Authentication:** None required

---

## 📋 Overview

Handles customer contact form submissions with validation and database storage. Used for:
- Customer inquiries
- Product questions
- Support requests
- General feedback
- Future: Email notifications via Brevo

---

## 🔗 Request

### **Method & URL**

```
POST http://localhost:3000/api/contact
```

### **Headers**

| Header | Value | Required |
|--------|-------|----------|
| `Content-Type` | `application/json` | ✅ Yes |

### **Request Body**

```json
{
  "name": "Budi Santoso",
  "email": "budi@email.com",
  "phone": "08123456789",
  "message": "Saya ingin bertanya tentang produk eucalyptus oil untuk anak-anak. Apakah aman digunakan?"
}
```

### **Body Fields**

| Field | Type | Required | Validation Rules | Example |
|-------|------|----------|------------------|---------|
| `name` | string | ✅ Yes | 2-100 characters | "Budi Santoso" |
| `email` | string | ✅ Yes | Valid email format | "budi@email.com" |
| `phone` | string | ✅ Yes | Min 10 digits | "08123456789" |
| `message` | string | ✅ Yes | 10-2000 characters | "Saya ingin bertanya..." |

---

## 🛡️ Validation Rules

### **Name Validation**

```typescript
✅ Required: Cannot be empty
✅ Minimum: 2 characters (after trim)
✅ Maximum: 100 characters (after trim)
✅ Trimmed: Leading/trailing spaces removed

Valid examples:
"Budi Santoso"       ✅
"Jo"                 ✅ (minimum 2)
"A very long name..."  ✅ (if < 100 chars)

Invalid examples:
""                   ❌ Empty
"J"                  ❌ Too short (< 2)
"   "                ❌ Only spaces
"A".repeat(101)      ❌ Too long
```

---

### **Email Validation**

```typescript
✅ Required: Cannot be empty
✅ Format: Must match email pattern
✅ Pattern: something@something.something

Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Valid examples:
"budi@email.com"           ✅
"customer@yahoo.co.id"     ✅
"test.user@domain.com"     ✅

Invalid examples:
""                         ❌ Empty
"notanemail"               ❌ No @
"test@"                    ❌ No domain
"@domain.com"              ❌ No user
"test @email.com"          ❌ Space in email
```

---

### **Phone Validation**

```typescript
✅ Required: Cannot be empty
✅ Format: Digits, spaces, +, -, (, ) allowed
✅ Minimum: 10 digits (after removing non-digits)
✅ Maximum: 15 digits (after removing non-digits)

Cleaning: All non-digits removed before storage
"+62-812-345-678" → 62812345678 (number)

Valid examples:
"08123456789"              ✅ (Indonesian mobile)
"+628123456789"            ✅ (International format)
"0812-3456-789"            ✅ (With hyphens)
"(021) 123-4567"           ✅ (With formatting)

Invalid examples:
""                         ❌ Empty
"0812"                     ❌ Too short (< 10 digits)
"abc123"                   ❌ Contains letters
"12345678901234567"        ❌ Too long (> 15 digits)
```

---

### **Message Validation**

```typescript
✅ Required: Cannot be empty
✅ Minimum: 10 characters (after trim)
✅ Maximum: 2000 characters (after trim)
✅ Trimmed: Leading/trailing spaces removed

Valid examples:
"Saya ingin bertanya tentang produk"   ✅ (> 10 chars)
"Question about eucalyptus oil usage"  ✅

Invalid examples:
""                         ❌ Empty
"Hi"                       ❌ Too short (< 10)
"   "                      ❌ Only spaces
"A".repeat(2001)           ❌ Too long
```

---

## ✅ Success Response

### **Status Code:** `201 Created`

### **Response Body:**

```json
{
  "success": true,
  "message": "Pesan Anda telah diterima. Kami akan membalas segera!",
  "contactId": "contact_1709116800000_a1b2c3"
}
```

### **Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Always `true` on success |
| `message` | string | User-friendly confirmation message (Indonesian) |
| `contactId` | string | Unique submission ID for tracking |

---

## ❌ Error Responses

### **400 Bad Request - Validation Failed**

**When:** One or more fields fail validation

**Response:**
```json
{
  "success": false,
  "error": "Validation Failed",
  "details": {
    "name": "Name must be at least 2 characters",
    "email": "Please provide a valid email address",
    "message": "Message must be at least 10 characters"
  }
}
```

**Common Causes:**
- Empty required fields
- Invalid email format
- Phone too short/long
- Message too short/long

---

### **500 Internal Server Error**

**When:** Server or database error

**Response:**
```json
{
  "success": false,
  "error": "Failed to submit contact form",
  "message": "Terjadi kesalahan. Silakan coba lagi nanti."
}
```

**Common Causes:**
- Firebase connection failed
- Database permissions issue
- Server crashed
- Network timeout

---

## 💡 Usage Examples

### **JavaScript/TypeScript (Frontend)**

```typescript
const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle validation errors
      if (response.status === 400 && result.details) {
        console.error('Validation errors:', result.details);
        // Show errors to user
        return { success: false, errors: result.details };
      }
      throw new Error(result.message || 'Submission failed');
    }

    console.log('Success! Contact ID:', result.contactId);
    return { success: true, contactId: result.contactId };

  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

// Usage
const result = await submitContactForm({
  name: 'Budi Santoso',
  email: 'budi@email.com',
  phone: '08123456789',
  message: 'Saya ingin bertanya tentang produk eucalyptus oil'
});
```

---

### **React Component Example**

```typescript
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.status === 400) {
        // Validation errors
        setErrors(result.details);
        return;
      }

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Success!
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      alert('Pesan terkirim! ID: ' + result.contactId);

    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div>
        <label>Message:</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Submit'}
      </button>

      {success && <p className="success">Pesan terkirim!</p>}
    </form>
  );
}
```

---

### **cURL (Terminal)**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Budi Santoso",
    "email": "budi@email.com",
    "phone": "08123456789",
    "message": "Saya ingin bertanya tentang produk eucalyptus oil untuk anak-anak"
  }'
```

---

### **Postman**

1. Method: `POST`
2. URL: `http://localhost:3000/api/contact`
3. Headers tab:
   - Key: `Content-Type`
   - Value: `application/json`
4. Body tab:
   - Select `raw`
   - Select `JSON` from dropdown
   - Paste JSON data
5. Click **Send**

---

## 🏗️ Database Structure

### **Firestore Collection:** `contacts`

```
contacts/
├── contact_1709116800000_a1b2c3/
│   ├── id: "contact_1709116800000_a1b2c3"
│   ├── name: "Budi Santoso"
│   ├── email: "budi@email.com"
│   ├── phone: 628123456789 (number, cleaned)
│   ├── message: "Saya ingin bertanya..."
│   ├── createdAt: Timestamp(2026-02-28 10:30:00)
│   ├── status: "new"
│   └── replied: false
│
├── contact_1709117000000_d4e5f6/
│   └── ...
│
└── contact_1709117200000_g7h8i9/
    └── ...
```

### **Document ID Format:**

```
contact_{timestamp}_{random}

Example: contact_1709116800000_a1b2c3
         └──┬───┘ └────┬─────┘ └──┬──┘
        prefix   milliseconds  random
```

**Why this format?**
- **Prefix** (`contact_`): Identifies document type
- **Timestamp** (`1709116800000`): Natural chronological sorting
- **Random** (`a1b2c3`): Prevents collisions if simultaneous submissions

---

### **Field Storage:**

| Field | Database Type | Storage Format | Example |
|-------|---------------|----------------|---------|
| `id` | string | Same as document ID | "contact_1709116800000_a1b2c3" |
| `name` | string | Trimmed | "Budi Santoso" |
| `email` | string | Trimmed, lowercase recommended | "budi@email.com" |
| `phone` | **number** | Cleaned (digits only) | 628123456789 |
| `message` | string | Trimmed | "Saya ingin..." |
| `createdAt` | Timestamp | Server timestamp | Feb 28, 2026 10:30 |
| `status` | string | Default "new" | "new", "in-progress", "resolved" |
| `replied` | boolean | Default false | true/false |

---

## 🎯 Implementation Details

### **File Structure:**

```
src/
├── types/
│   └── contacts.ts               # TypeScript interfaces
├── utils/
│   ├── validations.ts            # Validation logic
│   └── helpers.ts                # ID generation
├── controllers/
│   └── contactControllers.ts     # Main business logic
├── routes/
│   └── contact.ts                # Route definition
└── index.ts                      # Route registration
```

---

### **1. Types** (`src/types/contacts.ts`)

```typescript
export interface ContactTypes {
  id: string;
  name: string;
  email: string;
  phone: number;           // Stored as number
  message: string;
  createdAt: Date;
  status?: string;
  replied?: boolean;
}

export interface ContactRequestBody {
  name: string;
  email: string;
  phone: string;          // Received as string
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}
```

---

### **2. Validation** (`src/utils/validations.ts`)

```typescript
export const ValidateContactForm = (
  data: ContactRequestBody
): ValidationErrors | null => {
  
  const errors: ValidationErrors = {};
  
  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must not exceed 100 characters";
  }
  
  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = "Please provide a valid email address";
    }
  }
  
  // Phone validation
  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone = "Phone number is required";
  } else {
    const phoneStr = data.phone.trim();
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (!phoneRegex.test(phoneStr)) {
      errors.phone = "Phone number can only contain digits and +()-";
    } else if (phoneStr.replace(/\D/g, '').length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    } else if (phoneStr.replace(/\D/g, '').length > 15) {
      errors.phone = "Phone number must not exceed 15 digits";
    }
  }
  
  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Message must not exceed 2000 characters";
  }
  
  // Return null if no errors, otherwise return errors
  return Object.keys(errors).length === 0 ? null : errors;
};
```

---

### **3. Helper** (`src/utils/helpers.ts`)

```typescript
export const generateUniqueContactId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `contact_${timestamp}_${random}`;
};
```

---

### **4. Controller** (`src/controllers/contactControllers.ts`)

```typescript
export const submitContactForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📨 Contact form submission received");

    // Step 1: Extract data
    const { name, email, phone, message } = req.body as ContactRequestBody;

    // Step 2: Validate
    const validationErrors = ValidateContactForm({
      name,
      email,
      phone,
      message
    });

    // Step 3: If validation fails, return 400
    if (validationErrors) {
      console.log("❌ Validation failed:", validationErrors);
      res.status(400).json({
        success: false,
        error: "Validation Failed",
        details: validationErrors
      });
      return;
    }

    // Step 4: Generate ID
    const contactId = generateUniqueContactId();
    console.log(`✅ Validation passed. ID: ${contactId}`);

    // Step 5: Prepare data
    const contactData: ContactTypes = {
      id: contactId,
      name: name.trim(),
      email: email.trim(),
      phone: parseInt(phone.replace(/\D/g, '')),  // Clean & convert
      message: message.trim(),
      createdAt: new Date(),
      status: "new",
      replied: false
    };

    // Step 6: Save to Firestore
    console.log(`💾 Saving to Firestore: contacts/${contactId}`);
    await db.collection("contacts").doc(contactId).set(contactData);
    console.log(`✅ Contact saved successfully`);

    // Step 7: TODO - Send email (tomorrow with Brevo)
    // await sendEmailNotification(contactData);

    // Step 8: Return success
    res.status(201).json({
      success: true,
      message: "Pesan Anda telah diterima. Kami akan membalas segera!",
      contactId: contactId
    });

  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit contact form",
      message: "Terjadi kesalahan. Silakan coba lagi nanti."
    });
  }
};
```

---

### **5. Route** (`src/routes/contact.ts`)

```typescript
import { Router } from "express";
import { submitContactForm } from "../controllers/contactControllers";

const router = Router();

router.post("/contact", submitContactForm);

export default router;
```

---

### **6. Registration** (`src/index.ts`)

```typescript
import contactRoutes from "./routes/contact";

app.use("/api", contactRoutes);
```

---

## 🧪 Testing

### **Test Checklist:**

```
□ Valid submission (201 success)
□ Empty name (400 validation error)
□ Short name "J" (400 validation error)
□ Long name (101+ chars) (400 validation error)
□ Invalid email "notanemail" (400 validation error)
□ Empty email (400 validation error)
□ Short phone "0812" (400 validation error)
□ Invalid phone "abc123" (400 validation error)
□ Empty message (400 validation error)
□ Short message "Hi" (400 validation error)
□ Phone with formatting "+62-812-345-678" (201 success, cleaned)
□ Multiple errors at once (400 with all errors)
□ Check Firebase Console (document saved)
□ Check server logs (proper logging)
```

---

### **Test Case Examples:**

**Test 1: Valid Submission**
```json
POST /api/contact
{
  "name": "Budi Santoso",
  "email": "budi@email.com",
  "phone": "08123456789",
  "message": "Saya ingin bertanya tentang produk"
}

Expected: 201 Created
{
  "success": true,
  "contactId": "contact_..."
}
```

**Test 2: Multiple Validation Errors**
```json
POST /api/contact
{
  "name": "",
  "email": "invalid",
  "phone": "123",
  "message": "Hi"
}

Expected: 400 Bad Request
{
  "success": false,
  "error": "Validation Failed",
  "details": {
    "name": "Name is required",
    "email": "Please provide a valid email address",
    "phone": "Phone number must be at least 10 digits",
    "message": "Message must be at least 10 characters"
  }
}
```

---

## 🔍 Troubleshooting

### **Issue: "Cannot POST /api/contact"**

**Cause:** Route not registered or wrong HTTP method

**Solution:**
1. Check `src/routes/contact.ts` exists
2. Check `src/index.ts` has `app.use("/api", contactRoutes)`
3. Use POST method in Postman (not GET)
4. Restart server: `npm run dev`

---

### **Issue: Validation passes but shouldn't**

**Cause:** Validation logic too lenient

**Solution:**
- Check `src/utils/validations.ts`
- Verify regex patterns
- Test each validation rule independently

---

### **Issue: Phone number in database is NaN**

**Cause:** `parseInt()` failed on formatted phone

**Solution:** Already handled! 
```typescript
phone: parseInt(phone.replace(/\D/g, ''))
//                     └─────┬─────┘
//                   Removes non-digits first
```

---

### **Issue: Server crashes on submission**

**Cause:** Missing fields or imports

**Solution:**
1. Check all imports at top of controller
2. Verify `db` is imported from Firebase config
3. Check TypeScript compilation errors
4. Review server console for stack trace

---

## 🔐 Security Considerations

### **Backend Validation (✅ Implemented)**

- All inputs validated before database save
- Cannot be bypassed (runs on server)
- Protects against malicious data

### **Frontend Validation (⏳ To Be Added)**

- Improves user experience
- Instant feedback
- Reduces failed API calls
- **Note:** Never rely on frontend validation alone!

### **Future Enhancements:**

- Rate limiting (prevent spam)
- CAPTCHA integration
- IP blacklisting
- Honeypot fields (invisible to humans, visible to bots)

---

## 📈 Performance

**Response Time:** ~200-300ms
- Validation: ~5ms
- Database write: ~100-200ms
- Total: ~200-300ms

**Optimization:**
- Already optimized (single document write)
- Consider rate limiting for spam prevention
- Monitor Firestore usage/costs

---

## 🔗 Related Documentation

- [Validation System](./validation-system.md)
- [Database Structure](./database-structure.md)
- [Error Handling](./error-handling.md)
- [Adding Brevo Email](./guide-brevo-email.md) (future)

---

## 🚀 Future Enhancements

- [ ] Email notification to admin via Brevo
- [ ] Confirmation email to customer
- [ ] Auto-reply with FAQ
- [ ] Admin dashboard to view submissions
- [ ] Mark as "replied" functionality
- [ ] Export contacts to CSV

---

**Last Updated:** February 28, 2026  
**Status:** ✅ Fully functional (email pending)
