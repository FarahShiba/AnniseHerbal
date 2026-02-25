# 🚀 Go-Live Checklist - Production Deployment

**Reading Time:** 60 minutes  
**Difficulty:** Advanced ⭐⭐⭐⭐  
**Prerequisites:** All testing complete

---

## 🎯 Overview

This is the **final step** before accepting real payments! This guide will walk you through:

- ✅ Midtrans account activation
- ✅ Production credentials setup
- ✅ Security hardening
- ✅ Server deployment
- ✅ Domain & SSL configuration
- ✅ Final testing with real money
- ✅ Monitoring setup
- ✅ Launch day checklist

---

## ⚠️ IMPORTANT: Before You Start

```
❌ DO NOT skip any step in this checklist
❌ DO NOT rush production deployment
❌ DO NOT test production with large amounts first

✅ Test everything in sandbox first
✅ Start with small test transactions in production
✅ Monitor closely for first 48 hours
✅ Have rollback plan ready
```

---

## 📋 Pre-Launch Checklist

### **Stage 1: Midtrans Production Account**

- [ ] Business documents submitted to Midtrans
  - [ ] KTP (ID card)
  - [ ] NPWP (tax number)
  - [ ] Business registration (CV/PT or individual)
  - [ ] Bank account verification
  
- [ ] Midtrans account approved (3-7 business days)
  - [ ] Received approval email
  - [ ] Can access production dashboard
  - [ ] Production API keys available

- [ ] Payment methods activated
  - [ ] GoPay / QRIS enabled
  - [ ] Bank Transfer enabled
  - [ ] Credit Card enabled (if needed)
  - [ ] E-wallets enabled (ShopeePay, etc.)
  - [ ] Convenience stores (Indomaret/Alfamart)

---

### **Stage 2: Backend Security**

- [ ] Environment variables secure
  - [ ] `.env` not committed to Git
  - [ ] `.env.example` created for reference
  - [ ] `.gitignore` includes `.env`
  - [ ] Production keys stored securely

- [ ] API security implemented
  - [ ] CORS configured properly
  - [ ] Rate limiting enabled
  - [ ] Input validation on all endpoints
  - [ ] SQL injection protection (N/A for Firestore)
  - [ ] XSS protection enabled

- [ ] Error handling production-ready
  - [ ] No sensitive data in error messages
  - [ ] Stack traces hidden from client
  - [ ] Errors logged to monitoring service
  - [ ] User-friendly error pages

---

### **Stage 3: Database Security**

- [ ] Firestore security rules configured
  - [ ] Read/write permissions restricted
  - [ ] Authenticated access only for sensitive data
  - [ ] Field-level validation
  - [ ] No public write access

- [ ] Data backup strategy
  - [ ] Automated daily backups
  - [ ] Backup retention policy (30 days)
  - [ ] Test restore process

---

### **Stage 4: Code Quality**

- [ ] Code reviewed
  - [ ] No TODO comments left
  - [ ] No console.log in production (or use logger)
  - [ ] No hardcoded credentials
  - [ ] TypeScript strict mode enabled

- [ ] Testing complete
  - [ ] All payment methods tested
  - [ ] Edge cases handled
  - [ ] Error scenarios tested
  - [ ] Load testing performed

---

## 🔐 Step 1: Get Production Credentials

### **Access Midtrans Production Dashboard**

1. **Log in to Production Account:**
   ```
   https://dashboard.midtrans.com
   (NOT sandbox.midtrans.com!)
   ```

2. **Navigate to API Keys:**
   - Settings → Access Keys → Production

3. **Copy Your Keys:**
   ```
   Server Key: Mid-server-YOUR_PRODUCTION_KEY
   Client Key: Mid-client-YOUR_PRODUCTION_KEY

   ⚠️ NEVER share or commit these keys!
   ```

---

### **Update Backend `.env.production`**

Create `server/.env.production`:

```env
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=5000

# Firebase Admin (Production)
FIREBASE_PROJECT_ID=your-production-project
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Midtrans Production Credentials ⚠️ KEEP SECRET!
MIDTRANS_SERVER_KEY=Mid-server-YOUR_REAL_PRODUCTION_KEY
MIDTRANS_CLIENT_KEY=Mid-client-YOUR_REAL_PRODUCTION_KEY
MIDTRANS_IS_PRODUCTION=true

# Frontend URL (your actual domain)
FRONTEND_URL=https://anniseherbal.com

# Webhook Secret (generate random string)
WEBHOOK_SECRET=your-super-secret-webhook-key-here
```

**Generate secure webhook secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### **Update Frontend `.env.production`**

Create `client/.env.production`:

```env
# API URL (your actual backend)
VITE_API_URL=https://api.anniseherbal.com/api

# Midtrans Client Key (Production)
VITE_MIDTRANS_CLIENT_KEY=Mid-client-YOUR_PRODUCTION_KEY

# Environment
VITE_ENVIRONMENT=production

# Analytics (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 🏗️ Step 2: Update Code for Production

### **Update Frontend `index.html`**

Change Snap script URL:

```html
<!-- Remove sandbox script -->
<!-- OLD: -->
<!-- <script src="https://app.sandbox.midtrans.com/snap/snap.js"></script> -->

<!-- Use production script -->
<script 
  type="text/javascript"
  src="https://app.midtrans.com/snap/snap.js"
  data-client-key="Mid-client-YOUR_PRODUCTION_KEY"
></script>
```

---

### **Update Backend Midtrans Config**

**Update `server/src/config/midtrans.ts`:**

```typescript
import { Snap } from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

export const snap = new Snap({
  isProduction: isProduction, // TRUE for production!
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!
});

export const midtransConfig = {
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!
};

console.log(`🔐 Midtrans configured for: ${isProduction ? 'PRODUCTION' : 'SANDBOX'}`);
```

---

### **Add Environment Check**

**Create `server/src/middleware/environmentCheck.ts`:**

```typescript
import { Request, Response, NextFunction } from 'express';

export const requireProduction = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(403).json({
      error: 'This endpoint is only available in production'
    });
  }
  next();
};

export const requireSandbox = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      error: 'This endpoint is only available in sandbox/development'
    });
  }
  next();
};
```

---

## 🌐 Step 3: Deploy Backend

### **Option A: Deploy to Railway.app (Recommended)**

**Why Railway?**
- ✅ Free tier available
- ✅ Easy Node.js deployment
- ✅ Automatic HTTPS
- ✅ Environment variables support
- ✅ Git-based deployment

**Steps:**

1. **Create Railway Account:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository

3. **Configure Environment Variables:**
   - In Railway dashboard, go to "Variables"
   - Add all production variables from `.env.production`
   - ⚠️ Double-check each key!

4. **Deploy:**
   - Railway automatically builds and deploys
   - Wait for deployment (2-5 minutes)
   - Get your URL: `https://your-app.railway.app`

5. **Custom Domain (Optional):**
   - Settings → Domains
   - Add custom domain: `api.anniseherbal.com`
   - Update DNS records as instructed

---

### **Option B: Deploy to Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create anniseherbal-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MIDTRANS_SERVER_KEY=Mid-server-...
heroku config:set MIDTRANS_CLIENT_KEY=Mid-client-...
# ... set all other variables

# Deploy
git push heroku main

# Open app
heroku open
```

---

### **Option C: Deploy to VPS (DigitalOcean/AWS)**

**For advanced users who want full control:**

1. **Setup VPS:**
   - Create Ubuntu 22.04 server
   - Configure firewall (allow 80, 443, 22)
   - Install Node.js 18+

2. **Install Dependencies:**
   ```bash
   ssh root@your-server-ip
   apt update
   apt install nodejs npm nginx certbot
   ```

3. **Clone Repository:**
   ```bash
   git clone https://github.com/yourusername/anniseherbal.git
   cd anniseherbal/server
   npm install
   ```

4. **Setup Environment:**
   ```bash
   nano .env.production
   # Paste all production variables
   ```

5. **Setup PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   pm2 start npm --name "anniseherbal-api" -- run start:prod
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx:**
   ```nginx
   # /etc/nginx/sites-available/anniseherbal-api
   server {
       listen 80;
       server_name api.anniseherbal.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

7. **Enable SSL with Let's Encrypt:**
   ```bash
   certbot --nginx -d api.anniseherbal.com
   ```

---

## 🎨 Step 4: Deploy Frontend

### **Option A: Deploy to Netlify (Recommended)**

**Why Netlify?**
- ✅ Free tier with HTTPS
- ✅ Git-based deployment
- ✅ Automatic builds
- ✅ Custom domain support
- ✅ Perfect for React apps

**Steps:**

1. **Build Frontend:**
   ```bash
   cd client
   npm run build
   # Creates dist/ folder
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import existing project"
   - Choose your repository
   - Build settings:
     ```
     Base directory: client
     Build command: npm run build
     Publish directory: client/dist
     ```
   - Add environment variables (VITE_API_URL, etc.)

3. **Custom Domain:**
   - Site settings → Domain management
   - Add custom domain: `anniseherbal.com`
   - Update DNS (Netlify provides nameservers)

4. **Configure `client/netlify.toml`:**
   ```toml
   [build]
     base = "client"
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [build.environment]
     NODE_VERSION = "18"
   ```

---

### **Option B: Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel --prod

# Follow prompts
# Set environment variables in dashboard
```

---

## 🔔 Step 5: Configure Production Webhook

### **Update Midtrans Notification URL**

1. **Go to Production Dashboard:**
   ```
   https://dashboard.midtrans.com
   ```

2. **Settings → Configuration**

3. **Set Notification URL:**
   ```
   https://api.anniseherbal.com/api/webhooks/midtrans
   
   ⚠️ Must be HTTPS
   ⚠️ Must be publicly accessible
   ⚠️ Must return 200 OK
   ```

4. **Test Webhook:**
   - Make a small test transaction
   - Check backend logs
   - Verify webhook received

---

## 🧪 Step 6: Production Testing

### **⚠️ IMPORTANT: Start Small!**

```
Day 1: Test with Rp 1,000 transactions
Day 2-3: Test with Rp 10,000 transactions
Day 4-7: Test with real small orders
Week 2+: Full launch
```

---

### **Test Transaction Flow**

**Test 1: Real GoPay Payment (Rp 1,000)**

1. Create test product for Rp 1,000
2. Go through checkout
3. Pay with YOUR OWN GoPay
4. Verify:
   - [ ] Payment deducted from your account
   - [ ] Money appears in Midtrans dashboard
   - [ ] Webhook received
   - [ ] Order status updated
   - [ ] Confirmation email sent

**⚠️ This is REAL MONEY! Start small!**

---

**Test 2: Bank Transfer (BCA)**

1. Create order for Rp 5,000
2. Choose Bank Transfer → BCA
3. Get VA number
4. Transfer from YOUR bank account
5. Wait for confirmation (usually < 5 minutes)
6. Verify order status updated

---

**Test 3: Full Customer Journey**

Ask a friend/family to:
1. Browse your site
2. Add items to cart
3. Complete checkout
4. Pay with GoPay/ShopeePay
5. Receive confirmation
6. Give feedback on UX

Fix any issues before public launch!

---

## 📊 Step 7: Setup Monitoring

### **Option A: Use Sentry for Error Tracking**

```bash
npm install @sentry/node @sentry/tracing
```

**Setup in `server/src/index.ts`:**

```typescript
import * as Sentry from '@sentry/node';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'your-sentry-dsn',
    environment: 'production',
    tracesSampleRate: 1.0,
  });
}

// Error handler
app.use(Sentry.Handlers.errorHandler());
```

---

### **Option B: Setup Logging with Winston**

```bash
npm install winston
```

**Create `server/src/utils/logger.ts`:**

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
```

**Use in code:**

```typescript
import logger from './utils/logger';

logger.info('Payment created', { orderId, amount });
logger.error('Webhook failed', { error: error.message });
```

---

### **Setup Uptime Monitoring**

Use [UptimeRobot](https://uptimerobot.com) (free):

1. Create account
2. Add monitor:
   - Type: HTTP(s)
   - URL: https://api.anniseherbal.com/health
   - Interval: 5 minutes
3. Get alerts via email/SMS if server goes down

---

## 🔒 Step 8: Security Final Check

### **Security Checklist:**

- [ ] **HTTPS Only**
  - [ ] Frontend uses HTTPS
  - [ ] Backend uses HTTPS
  - [ ] No mixed content warnings

- [ ] **API Keys Secure**
  - [ ] Not in Git repository
  - [ ] Not in client-side code
  - [ ] Environment variables only
  - [ ] Rotated regularly (every 6 months)

- [ ] **CORS Configured**
  ```typescript
  app.use(cors({
    origin: ['https://anniseherbal.com'],
    credentials: true
  }));
  ```

- [ ] **Rate Limiting**
  ```typescript
  import rateLimit from 'express-rate-limit';
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  app.use('/api/payment', limiter);
  ```

- [ ] **Helmet.js for Security Headers**
  ```typescript
  import helmet from 'helmet';
  app.use(helmet());
  ```

- [ ] **Input Validation**
  ```typescript
  import { body, validationResult } from 'express-validator';
  
  app.post('/api/payment/create-transaction', [
    body('customer.email').isEmail(),
    body('customer.phone').isMobilePhone('id-ID'),
    body('total').isNumeric().custom(val => val > 0),
  ], handler);
  ```

---

## 📝 Step 9: Business Operations

### **Setup Financial Tracking**

Create spreadsheet to track:

| Date | Order ID | Customer | Amount | Fee | Net | Status |
|------|----------|----------|--------|-----|-----|--------|
| 2024-02-25 | ORD-123 | John | 340,000 | 2,380 | 337,620 | Settled |

**Automated tracking:**
- Export from Midtrans dashboard daily
- Or build admin panel to generate reports

---

### **Settlement Schedule**

Midtrans transfers money to your bank:

| Payment Method | Settlement Time |
|----------------|-----------------|
| GoPay/E-wallets | T+1 (next day) |
| Bank Transfer | T+1 |
| QRIS | T+1 |
| Credit Card | T+14 (14 days) |

Plan your cash flow accordingly!

---

### **Refund Process**

When customer requests refund:

1. **Check Order:**
   - Verify order exists
   - Check payment status (must be settled)

2. **Process Refund in Midtrans:**
   - Dashboard → Transactions
   - Find order
   - Click "Refund"
   - Enter amount (full or partial)

3. **Update Order in Database:**
   ```typescript
   await db.collection('orders').doc(orderId).update({
     status: 'refunded',
     refundedAt: new Date(),
     refundAmount: amount
   });
   ```

4. **Notify Customer:**
   - Send email: "Refund processed"
   - Money returns in 3-5 business days

---

## 🚀 Step 10: Launch Day!

### **Morning Checklist (Launch Day):**

**8:00 AM - Final Checks:**
- [ ] All servers running
- [ ] SSL certificates valid
- [ ] Webhook URL responding
- [ ] Test transaction successful
- [ ] Monitoring alerts working
- [ ] Team ready for support

**9:00 AM - Soft Launch:**
- [ ] Announce to small group (friends/family)
- [ ] Monitor first 10 orders closely
- [ ] Fix any issues immediately

**12:00 PM - Status Check:**
- [ ] Review morning transactions
- [ ] Check error logs
- [ ] Verify all payments settled
- [ ] Customer feedback positive

**3:00 PM - Public Launch:**
- [ ] Post on social media
- [ ] Send email to mailing list
- [ ] Monitor traffic spike
- [ ] Stay available for support

**6:00 PM - Day 1 Review:**
- [ ] Total orders processed
- [ ] Success rate (should be >98%)
- [ ] Average checkout time
- [ ] Any issues logged

---

### **Week 1 Daily Monitoring:**

**Daily tasks:**
- [ ] Check Midtrans dashboard for settlements
- [ ] Review webhook logs
- [ ] Monitor error rates
- [ ] Respond to customer issues within 2 hours
- [ ] Test one random order flow

---

## 📈 Step 11: Optimization & Growth

### **Week 2: Analyze Performance**

**Key Metrics:**

| Metric | Target | Actual | Action |
|--------|--------|--------|--------|
| Checkout conversion | >60% | ___ | Optimize if low |
| Payment success rate | >98% | ___ | Investigate fails |
| Average order value | Rp 300k | ___ | Upsell strategies |
| Cart abandonment | <40% | ___ | Add reminders |

---

### **Add Advanced Features:**

**Feature 1: Order Tracking**
- Build "Track Order" page
- Show real-time status updates
- Integrate shipping provider API

**Feature 2: Email Marketing**
- Send abandoned cart emails
- Post-purchase thank you emails
- Product recommendations

**Feature 3: Analytics**
- Google Analytics 4
- Facebook Pixel
- Conversion tracking

**Feature 4: Subscriptions** (if applicable)
- Use Midtrans recurring payments
- Auto-charge monthly
- Manage subscription status

---

## ⚠️ Troubleshooting Production Issues

### **Issue: Webhook Not Received**

**Quick Fix:**
```bash
# Check webhook endpoint
curl -X POST https://api.anniseherbal.com/api/webhooks/midtrans \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Should return 200 OK
```

**If fails:**
1. Check server logs
2. Verify firewall not blocking Midtrans IPs
3. Test with Postman
4. Contact Midtrans support

---

### **Issue: High Failed Payment Rate**

**Causes:**
- Bank downtime (BCA maintenance, etc.)
- Credit card expired
- Insufficient funds
- Fraud detection triggered

**Actions:**
- Analyze failed payments by method
- Offer alternative payment methods
- Add retry mechanism
- Contact Midtrans for patterns

---

### **Issue: Server Downtime**

**Emergency Response:**
1. Check server status (Railway/Heroku dashboard)
2. Check error logs (Sentry/Loggly)
3. Restart server if needed
4. Enable maintenance mode page
5. Notify customers via social media

**Prevention:**
- Use load balancer
- Setup auto-scaling
- Have backup server ready
- Monitor 24/7

---

## ✅ Final Checklist Before Launch

**Technical:**
- [ ] ✅ Sandbox testing 100% complete
- [ ] ✅ Production credentials configured
- [ ] ✅ Backend deployed with HTTPS
- [ ] ✅ Frontend deployed with HTTPS
- [ ] ✅ Webhook URL configured in Midtrans
- [ ] ✅ Real money test transaction successful
- [ ] ✅ SSL certificates valid
- [ ] ✅ Monitoring and alerts setup
- [ ] ✅ Error tracking configured
- [ ] ✅ Logs working correctly

**Security:**
- [ ] ✅ API keys not exposed
- [ ] ✅ CORS configured properly
- [ ] ✅ Rate limiting enabled
- [ ] ✅ Input validation on all fields
- [ ] ✅ Signature verification never skipped
- [ ] ✅ HTTPS enforced

**Business:**
- [ ] ✅ Terms of Service page
- [ ] ✅ Privacy Policy page
- [ ] ✅ Refund Policy page
- [ ] ✅ Contact information visible
- [ ] ✅ Customer support ready (email/WhatsApp)
- [ ] ✅ Banking/settlement understood

**Legal (Indonesia-specific):**
- [ ] ✅ Business registered (CV/PT or NPWP for individual)
- [ ] ✅ Bank account verified
- [ ] ✅ Tax compliance (pajak)
- [ ] ✅ Consumer protection understood (UU PK)

---

## 🎉 Congratulations!

You're now **LIVE** and accepting real payments! 🚀💰

### **Next Steps:**

1. **Monitor closely for first week**
2. **Respond quickly to customer issues**
3. **Iterate based on feedback**
4. **Scale confidently**

### **Resources:**

- 📚 [Midtrans Documentation](https://docs.midtrans.com)
- 💬 [Midtrans Support](https://midtrans.com/contact-us)
- 🎓 [Backend Learning Path](../README.md)
- 🔧 [Troubleshooting Guide](05-webhook-handling.md#common-issues)

---

## 📞 Support

**Issues? Questions?**

- Email: support@anniseherbal.com (yours)
- Midtrans: support@midtrans.com
- Technical: telegram.me/midtrans

---

**You did it! Now go make some sales! 💪**

**Previous Guide:** [← `07-testing-guide.md`](07-testing-guide.md)  
**Back to Overview:** [← Payment System README](README.md)
