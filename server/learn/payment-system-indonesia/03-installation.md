# 🛠️ Installation & Setup

**Reading Time:** 15 minutes  
**Difficulty:** Beginner ⭐  
**Prerequisites:** Node.js, npm installed

---

## 🎯 What You'll Learn

After completing this guide:
- ✅ Install Midtrans SDK
- ✅ Setup environment variables
- ✅ Configure project structure
- ✅ Verify installation
- ✅ Ready to start coding!

---

## 📦 Step 1: Install Dependencies

### **Navigate to Server Directory**

```bash
cd server
```

### **Install Midtrans Client SDK**

```bash
npm install midtrans-client
```

**What is midtrans-client?**
- Official Midtrans SDK for Node.js
- Handles API communication with Midtrans
- Built-in helper functions
- TypeScript support included
- Maintained by Midtrans team

---

### **Install Additional Dependencies**

```bash
npm install dotenv
npm install crypto
```

**Why these packages?**
- `dotenv` - Load environment variables from .env file
- `crypto` - Built-in Node.js module for signature verification

---

### **Install Dev Dependencies (TypeScript types)**

```bash
npm install --save-dev @types/node
```

---

## 📁 Step 2: Create Project Structure

### **Create New Folders**

```bash
# From server directory
mkdir -p src/config
mkdir -p src/controllers
mkdir -p src/routes
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/middleware
```

### **Your Structure Should Look Like:**

```
server/
├── src/
│   ├── config/
│   │   ├── firebase.ts          # Existing
│   │   └── midtrans.ts          # NEW - We'll create this
│   ├── controllers/
│   │   ├── productsController.ts # Existing
│   │   ├── paymentController.ts  # NEW
│   │   └── ordersController.ts   # NEW
│   ├── routes/
│   │   ├── products.ts           # Existing
│   │   ├── payment.ts            # NEW
│   │   └── orders.ts             # NEW
│   ├── types/
│   │   ├── product.ts            # Existing
│   │   ├── order.ts              # NEW
│   │   └── payment.ts            # NEW
│   ├── utils/
│   │   └── midtransVerify.ts    # NEW
│   ├── middleware/
│   │   └── auth.ts              # Existing
│   └── index.ts                 # Existing - We'll update
├── .env                         # NEW - Create this
├── .env.example                 # NEW - Create this
├── .gitignore                   # Update this
├── package.json                 # Updated
└── tsconfig.json               # Existing
```

---

## 🔐 Step 3: Environment Variables

### **Create `.env` File**

```bash
# Create .env in server directory
touch .env
```

**Add this content:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Midtrans Sandbox Keys (for testing)
MIDTRANS_SERVER_KEY_SANDBOX=SB-Mid-server-YOUR_SANDBOX_KEY_HERE
MIDTRANS_CLIENT_KEY_SANDBOX=SB-Mid-client-YOUR_SANDBOX_CLIENT_KEY_HERE

# Midtrans Production Keys (will add later after approval)
MIDTRANS_SERVER_KEY_PROD=
MIDTRANS_CLIENT_KEY_PROD=

# Current Environment
MIDTRANS_IS_PRODUCTION=false

# Webhook Secret (optional - for extra security)
WEBHOOK_SECRET=your_random_secret_here_change_me
```

---

### **Create `.env.example` File**

**This is safe to commit to Git:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Midtrans Sandbox Keys
MIDTRANS_SERVER_KEY_SANDBOX=SB-Mid-server-your_key_here
MIDTRANS_CLIENT_KEY_SANDBOX=SB-Mid-client-your_key_here

# Midtrans Production Keys
MIDTRANS_SERVER_KEY_PROD=
MIDTRANS_CLIENT_KEY_PROD=

# Environment
MIDTRANS_IS_PRODUCTION=false

# Webhook Secret
WEBHOOK_SECRET=change_me_to_random_string
```

---

### **Update `.gitignore`**

**Add these lines to your `.gitignore`:**

```gitignore
# Environment variables
.env
.env.local
.env.production
.env.development

# Dependencies
node_modules/

# Build output
dist/
build/

# Logs
logs/
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Firebase
serviceAccountKey.json
```

---

## ⚙️ Step 4: Create Midtrans Configuration

### **Create `src/config/midtrans.ts`**

```typescript
import dotenv from 'dotenv';
import midtransClient from 'midtrans-client';

// Load environment variables
dotenv.config();

// Determine which keys to use (sandbox or production)
const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

const serverKey = isProduction
  ? process.env.MIDTRANS_SERVER_KEY_PROD
  : process.env.MIDTRANS_SERVER_KEY_SANDBOX;

const clientKey = isProduction
  ? process.env.MIDTRANS_CLIENT_KEY_PROD
  : process.env.MIDTRANS_CLIENT_KEY_SANDBOX;

// Validate that keys exist
if (!serverKey) {
  throw new Error(
    `Missing Midtrans Server Key for ${isProduction ? 'production' : 'sandbox'} environment`
  );
}

if (!clientKey) {
  throw new Error(
    `Missing Midtrans Client Key for ${isProduction ? 'production' : 'sandbox'} environment`
  );
}

// Create Snap API instance
export const snap = new midtransClient.Snap({
  isProduction: isProduction,
  serverKey: serverKey,
  clientKey: clientKey
});

// Create Core API instance (for advanced usage)
export const coreApi = new midtransClient.CoreApi({
  isProduction: isProduction,
  serverKey: serverKey,
  clientKey: clientKey
});

// Export configuration
export const midtransConfig = {
  serverKey: serverKey,
  clientKey: clientKey,
  isProduction: isProduction,
  merchantId: process.env.MIDTRANS_MERCHANT_ID || '',
  // API URLs
  snapUrl: isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions',
  apiUrl: isProduction
    ? 'https://api.midtrans.com/v2'
    : 'https://api.sandbox.midtrans.com/v2'
};

// Log configuration (hide sensitive parts)
console.log('✅ Midtrans Configuration:');
console.log(`   Environment: ${isProduction ? 'PRODUCTION 🔴' : 'SANDBOX 🟡'}`);
console.log(`   Server Key: ${serverKey.substring(0, 15)}...`);
console.log(`   Client Key: ${clientKey.substring(0, 15)}...`);

// Export for other modules
export default {
  snap,
  coreApi,
  config: midtransConfig
};
```

---

## 📝 Step 5: Create Type Definitions

### **Create `src/types/order.ts`**

```typescript
// Order status enum
export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

// Payment status enum
export enum PaymentStatus {
  PENDING = 'pending',
  SETTLEMENT = 'settlement',
  CAPTURE = 'capture',
  DENY = 'deny',
  CANCEL = 'cancel',
  EXPIRE = 'expire',
  FAILURE = 'failure',
  REFUND = 'refund'
}

// Order item interface
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  sizeName?: string;
}

// Customer details interface
export interface CustomerDetails {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}

// Shipping details interface
export interface ShippingDetails {
  courier: string;
  service: string;
  cost: number;
  estimatedDays: number;
  trackingNumber?: string;
}

// Order interface
export interface Order {
  id: string;
  orderId: string;
  userId?: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  snapToken?: string;
  snapRedirectUrl?: string;
  shipping?: ShippingDetails;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// Create order request
export interface CreateOrderRequest {
  customer: CustomerDetails;
  items: OrderItem[];
  shippingCost: number;
  notes?: string;
}
```

---

### **Create `src/types/payment.ts`**

```typescript
// Midtrans transaction request
export interface MidtransTransactionRequest {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
  };
  item_details: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  enabled_payments?: string[];
}

// Midtrans notification/webhook payload
export interface MidtransNotification {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status: string;
  currency: string;
  // Additional fields for specific payment methods
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  biller_code?: string;
  bill_key?: string;
  permata_va_number?: string;
  // E-wallet specific
  actions?: Array<{
    name: string;
    method: string;
    url: string;
  }>;
}

// Payment response to frontend
export interface PaymentResponse {
  success: boolean;
  orderId: string;
  snapToken: string;
  redirectUrl: string;
  message?: string;
}
```

---

## 🧪 Step 6: Verify Installation

### **Create Test File**

Create `src/test-midtrans.ts`:

```typescript
import { snap, midtransConfig } from './config/midtrans';

async function testMidtransConnection() {
  console.log('\n🧪 Testing Midtrans Connection...\n');
  
  try {
    // Log configuration
    console.log('Configuration:');
    console.log(`- Environment: ${midtransConfig.isProduction ? 'Production' : 'Sandbox'}`);
    console.log(`- Server Key: ${midtransConfig.serverKey.substring(0, 15)}...`);
    console.log(`- API URL: ${midtransConfig.snapUrl}\n`);

    // Test transaction (this won't create real charge)
    const testTransaction = {
      transaction_details: {
        order_id: 'TEST-' + Math.round(new Date().getTime() / 1000),
        gross_amount: 100000
      },
      customer_details: {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone: '081234567890'
      },
      item_details: [
        {
          id: 'ITEM1',
          price: 100000,
          quantity: 1,
          name: 'Test Product'
        }
      ]
    };

    console.log('Creating test transaction...');
    const transaction = await snap.createTransaction(testTransaction);
    
    console.log('\n✅ SUCCESS! Midtrans is configured correctly!\n');
    console.log('Transaction Token:', transaction.token);
    console.log('Redirect URL:', transaction.redirect_url);
    console.log('\nYou can now proceed with integration!\n');

    return true;
  } catch (error: any) {
    console.error('\n❌ ERROR! Connection failed!\n');
    console.error('Message:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\n💡 Tip: Check your Server Key in .env file');
    } else if (error.message.includes('400')) {
      console.error('\n💡 Tip: Transaction format might be incorrect');
    }
    
    return false;
  }
}

// Run test
testMidtransConnection();
```

---

### **Run the Test**

```bash
# Compile TypeScript (if needed)
npm run build

# Or use ts-node to run directly
npx ts-node src/test-midtrans.ts
```

**Expected Output (Success):**

```
🧪 Testing Midtrans Connection...

Configuration:
- Environment: Sandbox
- Server Key: SB-Mid-server...
- API URL: https://app.sandbox.midtrans.com/snap/v1/transactions

Creating test transaction...

✅ SUCCESS! Midtrans is configured correctly!

Transaction Token: 66e4fa55-fdac-4ef9-91b5-733b97d1b862
Redirect URL: https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55...

You can now proceed with integration!
```

**If you see errors:**

```
❌ ERROR 401: Unauthorized
💡 Check your MIDTRANS_SERVER_KEY in .env

❌ ERROR 400: Bad Request
💡 Check transaction format

❌ Cannot find module 'midtrans-client'
💡 Run: npm install midtrans-client
```

---

## 📦 Step 7: Update package.json

### **Add Scripts**

Update your `package.json`:

```json
{
  "name": "annise-herbal-server",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:midtrans": "ts-node src/test-midtrans.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "firebase-admin": "^11.10.1",
    "midtrans-client": "^1.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.5.0",
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "typescript": "^5.1.6",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1"
  }
}
```

---

## ✅ Installation Checklist

Before proceeding to the next guide:

- [ ] ✅ `midtrans-client` installed
- [ ] ✅ `dotenv` installed
- [ ] ✅ `.env` file created with API keys
- [ ] ✅ `.env` added to `.gitignore`
- [ ] ✅ Folder structure created
- [ ] ✅ `src/config/midtrans.ts` created
- [ ] ✅ Type definitions created
- [ ] ✅ Test connection successful
- [ ] ✅ No errors in console

---

## 🎯 What's Next?

You're now ready to start coding!

**Next steps:**
1. ✅ Installation complete
2. 📝 **Next guide:** `04-backend-integration.md`
3. 🛠️ Build payment endpoints
4. 🎨 Create checkout flow

---

## 💡 Troubleshooting

### **Problem: Module not found**

```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules
npm install
```

---

### **Problem: TypeScript errors**

```bash
# Solution: Make sure tsconfig.json is correct
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

### **Problem: dotenv not loading**

```typescript
// Make sure this is at the TOP of your file
import dotenv from 'dotenv';
dotenv.config();

// Then import other modules
import express from 'express';
```

---

**Installation complete! Ready to build?** 🎉

**Next Guide:** [`04-backend-integration.md` →](04-backend-integration.md)
