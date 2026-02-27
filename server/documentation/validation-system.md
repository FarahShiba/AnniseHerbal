# 🛡️ Validation System Documentation

**Last Updated:** February 28, 2026  
**Purpose:** Understand how validation works in Annise Herbal Backend

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Why Validate](#why-validate)
3. [Validation Architecture](#validation-architecture)
4. [Validation Patterns](#validation-patterns)
5. [Creating Validators](#creating-validators)
6. [Testing Validation](#testing-validation)

---

## 🎯 Overview

Validation is the process of checking if user input meets our requirements BEFORE processing it. This system ensures:

- ✅ Data integrity
- ✅ Security (prevents malicious input)
- ✅ Consistent error messages
- ✅ Better user experience

---

## 🔒 Why Validate on Backend?

### **Security Principle: Never Trust Client Input**

```
Frontend validation = User convenience (optional)
Backend validation = Security (MANDATORY)
```

### **Why Frontend Validation Can Be Bypassed:**

```javascript
// Attacker can bypass your React validation by:

// Method 1: Direct API call with Postman/cURL
curl -X POST /api/contact -d '{"name":"","email":"spam"}'

// Method 2: Browser DevTools Console
fetch('/api/contact', { 
  method: 'POST', 
  body: JSON.stringify({name:"",email:"spam"}) 
});

// Method 3: Modify JavaScript in browser
// Open DevTools → Disable validation code → Submit

// YOUR BACKEND IS THE ONLY DEFENSE! ✅
```

### **Real-World Scenario:**

```
Without backend validation:
Hacker → Sends malicious data → Bypasses frontend → Database corrupted ❌

With backend validation:
Hacker → Sends malicious data → Bypasses frontend → Backend rejects → Database safe ✅
```

---

## 🏗️ Validation Architecture

### **File Structure:**

```
src/
├── types/
│   └── contacts.ts              # Type definitions
├── utils/
│   └── validations.ts           # Validation logic ← Centralized!
├── controllers/
│   └── contactControllers.ts    # Uses validation
└── ...
```

### **Separation of Concerns:**

```typescript
❌ BAD: Validation mixed in controller
export const submitContact = async (req, res) => {
  // 50 lines of validation code...
  if (!name) return error;
  if (name.length < 2) return error;
  // ... messy controller
  
  await db.save(...);
};

✅ GOOD: Validation separated
// utils/validations.ts
export const ValidateContactForm = (data) => {
  // All validation logic here
  return errors || null;
};

// controllers/contactControllers.ts
export const submitContact = async (req, res) => {
  const errors = ValidateContactForm(req.body);  // One line!
  if (errors) return res.status(400).json({ errors });
  
  await db.save(...);  // Clean, focused logic
};
```

### **Benefits:**

- ✅ **Reusable:** Same validation for multiple endpoints
- ✅ **Testable:** Test validation separately
- ✅ **Maintainable:** One place to update rules
- ✅ **Readable:** Controller stays clean

---

## 📚 Validation Patterns

### **Pattern 1: Error Accumulation**

```typescript
const validateData = (data) => {
  const errors = {};  // Start empty
  
  // Check field 1
  if (data.name is invalid) {
    errors.name = "Error message";
  }
  
  // Check field 2 (even if field 1 failed!)
  if (data.email is invalid) {
    errors.email = "Error message";
  }
  
  // Check field 3
  if (data.message is invalid) {
    errors.message = "Error message";
  }
  
  // Return null if no errors, otherwise errors object
  return Object.keys(errors).length === 0 ? null : errors;
};
```

**Why accumulate errors?**

```
❌ BAD: Stop at first error
User submits: name="" email="invalid" message="x"
Response: "Name is required"
User fixes name, submits again
Response: "Invalid email"  ← Could have told them both!
User fixes email, submits again
Response: "Message too short"  ← Frustrating!

✅ GOOD: Show all errors at once
User submits: name="" email="invalid" message="x"
Response: {
  name: "Name is required",
  email: "Invalid email",
  message: "Message too short"
}
User fixes ALL issues, submits once ← Much better UX!
```

---

### **Pattern 2: Early Return**

```typescript
const validateField = (value) => {
  if (!value) {
    return "Field is required";  // Stop here
  } else if (value.length < 2) {
    return "Too short";  // Only check if exists
  } else if (value.length > 100) {
    return "Too long";  // Only check if long enough
  }
  
  return null;  // Valid!
};
```

**Why use else-if chain?**

```
if (!value) → Return error
→ Stops function
→ Rest of code doesn't run
→ No need to check length if value doesn't exist!

Order matters:
1. Check existence first
2. Then check format
3. Then check length
4. Then check content
```

---

### **Pattern 3: Trim Before Validate**

```typescript
// ❌ WRONG: Validate raw input
if (data.name.length < 2) { ... }

// Input: "   " (3 spaces)
// Length: 3
// Passes! ❌ (but it's empty!)

// ✅ CORRECT: Trim first
if (data.name.trim().length < 2) { ... }

// Input: "   " (3 spaces)
// After trim: ""
// Length: 0
// Fails! ✅ (correctly detected)
```

**Always trim for:**
- Name fields
- Email addresses
- Messages/text content
- Any user-typed input

**Don't trim for:**
- Passwords (spaces might be intentional)
- Codes/tokens (exact match required)

---

### **Pattern 4: Regex Validation**

```typescript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValid = emailRegex.test(email);

// Phone validation (digits, spaces, +, -, (, ) allowed)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;
const isValid = phoneRegex.test(phone);
```

**Regex Explained:**

```javascript
Email regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

^           Start of string
[^\s@]+     One or more chars (NOT space, NOT @)
@           Literal @ symbol
[^\s@]+     One or more chars (NOT space, NOT @)
\.          Literal . (dot)
[^\s@]+     One or more chars (NOT space, NOT @)
$           End of string

Matches:
"user@domain.com"     ✅
"test@example.co.id"  ✅

Doesn't match:
"notanemail"          ❌ (no @)
"@domain.com"         ❌ (no user)
"test@"               ❌ (no domain)
```

**Testing Regex:**
- Use https://regex101.com
- Test multiple examples
- Test edge cases

---

## 🔨 Creating New Validators

### **Step 1: Define Types**

```typescript
// src/types/yourfeature.ts

export interface YourRequestBody {
  field1: string;
  field2: number;
  field3: string;
}

export interface ValidationErrors {
  field1?: string;
  field2?: string;
  field3?: string;
}
```

---

### **Step 2: Create Validation Function**

```typescript
// src/utils/validations.ts

export const ValidateYourFeature = (
  data: YourRequestBody
): ValidationErrors | null => {
  
  const errors: ValidationErrors = {};
  
  // Validate field1
  if (!data.field1 || data.field1.trim().length === 0) {
    errors.field1 = "Field 1 is required";
  } else if (data.field1.trim().length < 3) {
    errors.field1 = "Field 1 must be at least 3 characters";
  }
  
  // Validate field2
  if (data.field2 === undefined || data.field2 === null) {
    errors.field2 = "Field 2 is required";
  } else if (data.field2 < 0) {
    errors.field2 = "Field 2 must be positive";
  }
  
  // Validate field3
  if (!data.field3 || data.field3.trim().length === 0) {
    errors.field3 = "Field 3 is required";
  }
  
  // Return null if no errors
  return Object.keys(errors).length === 0 ? null : errors;
};
```

---

### **Step 3: Use in Controller**

```typescript
// src/controllers/yourController.ts

import { ValidateYourFeature } from "../utils/validations";

export const yourHandler = async (req: Request, res: Response) => {
  try {
    // Extract data
    const { field1, field2, field3 } = req.body;
    
    // Validate
    const validationErrors = ValidateYourFeature({ field1, field2, field3 });
    
    // If errors, return 400
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        error: "Validation Failed",
        details: validationErrors
      });
    }
    
    // Process valid data...
    
    res.status(201).json({ success: true });
    
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
```

---

## 🧪 Testing Validation

### **Unit Testing Validation Functions**

```typescript
// test/validation.test.ts

import { ValidateContactForm } from "../src/utils/validations";

describe("Contact Form Validation", () => {
  
  test("Valid data passes", () => {
    const result = ValidateContactForm({
      name: "John Doe",
      email: "john@email.com",
      phone: "08123456789",
      message: "This is a valid message"
    });
    
    expect(result).toBeNull();  // No errors!
  });
  
  test("Empty name fails", () => {
    const result = ValidateContactForm({
      name: "",
      email: "john@email.com",
      phone: "08123456789",
      message: "Valid message"
    });
    
    expect(result).not.toBeNull();
    expect(result.name).toBe("Name is required");
  });
  
  test("Invalid email fails", () => {
    const result = ValidateContactForm({
      name: "John Doe",
      email: "notanemail",
      phone: "08123456789",
      message: "Valid message"
    });
    
    expect(result).not.toBeNull();
    expect(result.email).toBe("Please provide a valid email address");
  });
  
  test("Multiple errors accumulate", () => {
    const result = ValidateContactForm({
      name: "",
      email: "invalid",
      phone: "123",
      message: "Hi"
    });
    
    expect(result).not.toBeNull();
    expect(Object.keys(result).length).toBe(4);  // All 4 fields failed
  });
});
```

---

### **Integration Testing with Postman**

**Test Suite:** Contact Form Validation

```
Test 1: Valid Submission
POST /api/contact
Body: {valid data}
Expected: 201 Created

Test 2: Empty Name
Body: {name: ""}
Expected: 400 Bad Request
Expected: errors.name present

Test 3: Invalid Email
Body: {email: "notanemail"}
Expected: 400 Bad Request
Expected: errors.email present

Test 4: Multiple Errors
Body: {all invalid}
Expected: 400 Bad Request
Expected: All error fields present
```

---

## 🎯 Validation Best Practices

### **1. Validate Everything**

```typescript
✅ DO validate:
- All user input
- URL parameters
- Query strings
- Request bodies
- File uploads

❌ DON'T trust:
- Frontend validation
- User claims
- Previous validations
```

---

### **2. Keep Validation Pure**

```typescript
✅ GOOD: Pure function
const validate = (data) => {
  // No side effects
  // No database calls
  // No API calls
  // Just validation logic
  return errors || null;
};

❌ BAD: Side effects
const validate = async (data) => {
  // Checking database ❌
  const existingUser = await db.users.find(data.email);
  
  // Making API call ❌
  const isValid = await externalAPI.validate(data);
  
  return errors;
};

// Validation should be FAST and SYNCHRONOUS!
// Database checks belong in controller, not validator
```

---

### **3. Clear Error Messages**

```typescript
❌ BAD: Vague
"Invalid input"
"Error"
"Bad data"

✅ GOOD: Specific
"Name must be at least 2 characters"
"Email format is invalid"
"Phone number must contain at least 10 digits"

✅ EVEN BETTER: Actionable
"Name must be at least 2 characters. Currently: 1"
"Email must include @ and domain (e.g., user@email.com)"
"Phone number needs 10-15 digits. Currently: 5"
```

---

### **4. Separate Validation from Business Logic**

```
Validation = "Is this data structurally correct?"
- Is email format valid?
- Is phone long enough?
- Is message not too short?

Business Logic = "Does this make sense for our business?"
- Does user with this email already exist?
- Is product in stock?
- Is user allowed to perform this action?

Keep them separate!
Validation → utils/validations.ts
Business Logic → controllers/*.ts
```

---

## 📊 Validation Response Format

### **Standard Structure:**

```json
{
  "success": false,
  "error": "Validation Failed",
  "details": {
    "field1": "Specific error message for field1",
    "field2": "Specific error message for field2"
  }
}
```

### **Why This Format?**

```typescript
Frontend can easily:
1. Check if validation failed: if (!response.success)
2. Get general message: response.error
3. Get specific errors: response.details.field1
4. Display errors next to fields:

<input name="email" />
{errors.email && <span>{errors.email}</span>}
```

---

## 🔗 Related Documentation

- [Contact API](./api-contact.md)
- [Error Handling](./error-handling.md)
- [Security Best Practices](./security.md) (future)

---

## 🚀 Future Enhancements

- [ ] Input sanitization (remove XSS attempts)
- [ ] Rate limiting validation (prevent abuse)
- [ ] Custom validation decorators
- [ ] Validation middleware
- [ ] Automated validation testing

---

**Last Updated:** February 28, 2026  
**Maintainer:** Development Team
