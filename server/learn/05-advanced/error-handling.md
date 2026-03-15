# ⚠️ Error Handling Best Practices

## Why Error Handling Matters

Good error handling:
- ✅ Prevents app crashes
- ✅ Gives users helpful feedback
- ✅ Helps debug issues
- ✅ Improves security (don't leak sensitive info)

---

## Types of Errors

### 1. Client Errors (4xx)
**User made a mistake**

- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Not logged in
- `403 Forbidden` - No permission
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Validation failed

### 2. Server Errors (5xx)
**Something broke on your end**

- `500 Internal Server Error` - Generic error
- `503 Service Unavailable` - Server overloaded

---

## Basic Error Handling

### Try-Catch in Controller

```typescript
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};
```

---

## Validation Errors

```typescript
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    
    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'price', 'category']
      });
    }
    
    // Validate data types
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Price must be a positive number'
      });
    }
    
    // Create product
    const docRef = await db.collection('products').add({
      name,
      price,
      category,
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      data: { id: docRef.id, name, price, category }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
};
```

---

## Not Found Errors

```typescript
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('products').doc(id).get();
    
    // Check if exists
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
        productId: id
      });
    }
    
    res.json({
      success: true,
      data: { id: doc.id, ...doc.data() }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
};
```

---

## Custom Error Classes

```typescript
// utils/errors.ts
export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Use in controller
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('products').doc(id).get();
    
    if (!doc.exists) {
      throw new NotFoundError('Product', id);
    }
    
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
};
```

---

## Global Error Handler

```typescript
// index.ts

// ... all your routes

// 404 handler (must be after all routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Global error handler (must be last)
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Global error handler:', err);
  
  // Don't leak error details in production
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
```

---

## Async Error Wrapper

Avoid repeating try-catch in every controller:

```typescript
// utils/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Use it
import { asyncHandler } from '../utils/asyncHandler';

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, data: products });
    // No try-catch needed! Errors go to global handler
  }
);
```

---

## Logging Errors

### Console Logging (Development)

```typescript
try {
  // code
} catch (error) {
  console.error('Error details:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
}
```

### Production Logging

Use a logging service:
- **Winston** - Popular Node.js logger
- **Sentry** - Error tracking
- **LogRocket** - Session replay

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

try {
  // code
} catch (error) {
  logger.error('Failed to fetch products', {
    error: error.message,
    stack: error.stack,
    userId: req.user?.id
  });
}
```

---

## Error Response Format

### Consistent Structure

```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Human-readable message",
  "code": "PRODUCT_NOT_FOUND",  // Optional: machine-readable code
  "details": { ... }             // Optional: additional context
}
```

---

## Validation Libraries

Instead of manual validation, use a library:

### Joi

```typescript
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  price: Joi.number().required().positive(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Validate
    const { error, value } = productSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }
    
    // Create product with validated data
    const docRef = await db.collection('products').add(value);
    
    res.status(201).json({ success: true, data: { id: docRef.id, ...value } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
```

---

## Security: Don't Leak Information

### ❌ Bad (Leaks internal details)

```typescript
catch (error) {
  res.status(500).json({
    error: error.message,  // Might contain database paths, etc.
    stack: error.stack      // Shows your code structure
  });
}
```

### ✅ Good (Safe for production)

```typescript
catch (error) {
  console.error('Internal error:', error); // Log for debugging
  
  res.status(500).json({
    error: 'An error occurred. Please try again later.',
    requestId: generateRequestId() // Help support team debug
  });
}
```

---

## 🎯 Practice Exercise

1. Add validation to `createProduct`
2. Add proper 404 handling to `getProductById`
3. Create a global error handler in index.ts
4. Test error cases:
   - Missing fields
   - Invalid ID
   - Non-existent product

---

## 🔗 Learn More

**Google:**
- "Express error handling best practices"
- "Node.js error handling patterns"
- "API error response format"
- "Joi validation library"

---

**Congratulations! You've completed the learning guide! 🎉**

Now go build your Products API! Remember:
- Start simple
- Test as you go
- Google when stuck
- Ask for help when needed

Happy coding! 🚀
