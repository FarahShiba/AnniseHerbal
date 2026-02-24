# 📁 Project Structure Explained

## Your Current Structure

```
server/
├── node_modules/          # Dependencies (installed via npm)
├── src/                   # Source code (your code goes here)
│   ├── config/           # Configuration files
│   │   └── firebase.ts   # Firebase initialization
│   ├── controllers/      # Business logic
│   │   ├── productsController.ts
│   │   └── ordersController.ts
│   ├── routes/           # URL routing
│   │   ├── products.ts
│   │   └── orders.ts
│   ├── types/            # TypeScript type definitions
│   │   └── product.ts
│   ├── middleware/       # Custom middleware
│   │   └── auth.ts
│   └── index.ts          # Main entry point
├── package.json          # Project metadata & dependencies
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables (SECRET!)
└── serviceAccountKey.json # Firebase credentials (SECRET!)
```

---

## Folder Purposes

### `src/config/`
**Purpose:** Configuration files for external services

**Examples:**
- `firebase.ts` - Firebase Admin SDK initialization
- `database.ts` - Database connection settings
- `server.ts` - Server configuration

**Why separate?**
- Easy to find and update settings
- Can switch between dev/production configs
- Keep secrets in one place

---

### `src/controllers/`
**Purpose:** Business logic and data processing

**What goes here:**
- Functions that process requests
- Database queries
- Data validation
- Response formatting

**Example:**
```typescript
// productsController.ts
export const getAllProducts = async (req, res) => {
  // 1. Query database
  // 2. Process data
  // 3. Send response
};
```

**Why separate?**
- Keeps logic organized
- Easy to test
- Reusable across routes

---

### `src/routes/`
**Purpose:** Define URL endpoints and map to controllers

**What goes here:**
- Route definitions (GET, POST, etc.)
- Middleware attachment
- Route grouping

**Example:**
```typescript
// products.ts
router.get('/', getAllProducts);
router.post('/', createProduct);
```

**Why separate?**
- Clear API structure
- Easy to see all endpoints
- Simplified route management

---

### `src/types/`
**Purpose:** TypeScript type definitions

**What goes here:**
- Interface definitions
- Type aliases
- Shared types

**Example:**
```typescript
// product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}
```

**Why separate?**
- Type safety
- Code completion in IDE
- Catch errors before runtime

---

### `src/middleware/`
**Purpose:** Code that runs between request and response

**What goes here:**
- Authentication checks
- Request logging
- Data validation
- Error handling

**Example:**
```typescript
// auth.ts
export const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next(); // Continue to route handler
};
```

**Why separate?**
- Reusable across routes
- Cleaner route definitions
- Easy to test

---

### `src/index.ts`
**Purpose:** Main application entry point

**What it does:**
- Initialize Express app
- Load middleware
- Mount routes
- Start server
- Handle global errors

**Analogy:** Think of it as the "main control panel"

---

## File Naming Conventions

### ✅ Good Names
```
productsController.ts    # Descriptive & camelCase
userRoutes.ts           # Clear purpose
authMiddleware.ts       # Obvious function
```

### ❌ Bad Names
```
controller.ts           # Too generic
products_controller.ts  # Use camelCase, not snake_case
Product.ts             # Controllers not capitalized
```

---

## Why This Structure?

### 1. **Separation of Concerns**
Each folder has ONE job:
- Routes = URL mapping
- Controllers = Business logic
- Config = Settings
- Types = Type definitions

### 2. **Scalability**
Easy to add new features:
- New product? Add to productsController.ts
- New endpoint? Add to routes/products.ts
- New service? Add to config/

### 3. **Maintainability**
Know exactly where to find things:
- Bug in product fetching? Check controller
- Wrong URL? Check routes
- Firebase issue? Check config

### 4. **Testability**
Each piece can be tested independently

---

## Adding New Features

### Example: Adding Orders API

1. Create controller:
   ```
   src/controllers/ordersController.ts
   ```

2. Create routes:
   ```
   src/routes/orders.ts
   ```

3. Create types:
   ```
   src/types/order.ts
   ```

4. Mount in index.ts:
   ```typescript
   import ordersRouter from './routes/orders';
   app.use('/api/orders', ordersRouter);
   ```

---

## Environment Files

### `.env` (Never commit to Git!)
```bash
PORT=3000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
```

### `serviceAccountKey.json` (Never commit!)
Contains Firebase credentials

**Add to `.gitignore`:**
```
.env
serviceAccountKey.json
node_modules/
```

---

## Flow of a Request

```
1. Client sends request → http://localhost:3000/api/products

2. index.ts receives it
   ↓
3. Middleware runs (CORS, JSON parsing)
   ↓
4. Routes match (/api/products)
   ↓
5. Controller executes (getAllProducts)
   ↓
6. Database query (Firestore)
   ↓
7. Response sent back to client
```

---

## 🎯 Your Task

**Review your project structure:**
1. Open `server/src/` in VS Code
2. Look at each folder
3. Understand what goes where
4. Keep this structure as you build

---

## 🔗 Learn More

**Google:**
- "Node.js project structure best practices"
- "Express MVC pattern"
- "Separation of concerns programming"

---

**Next:** [TypeScript Setup →](typescript-setup.md)
