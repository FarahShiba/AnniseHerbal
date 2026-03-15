# 💳 Midtrans Overview - Understanding Payment Gateways

**Reading Time:** 15 minutes  
**Difficulty:** Beginner ⭐

---

## 🎯 What You'll Learn

After reading this guide, you'll understand:
- What a payment gateway is and why you need one
- How online payments work behind the scenes
- Why Midtrans is perfect for Indonesian businesses
- Different payment methods available
- Cost comparison with other gateways

---

## 🤔 What is a Payment Gateway?

### **Real-World Analogy**

Think of a payment gateway like a **cashier at a store**:

```
Physical Store:
Customer → Hands cash/card → Cashier → Verifies → Gives receipt
                              ↓
                         Records sale

Online Store:
Customer → Enters payment → Gateway → Verifies → Confirms order
                              ↓
                    Transfers money to you
```

---

### **Without Payment Gateway**

❌ **Problems you'd face:**

```
1. Customer: "How do I pay you?"
   You: "Transfer to my bank account..."
   Customer: "What's your account number?"
   You: "Let me send it via WhatsApp..."
   └─ Messy, unprofessional, time-consuming

2. Security Issues:
   ├─ Customers hesitant to share card details
   ├─ You're responsible for storing sensitive data
   └─ Legal compliance headaches (PCI-DSS)

3. Manual Verification:
   ├─ Customer transfers money
   ├─ You check bank app manually
   ├─ Customer sends screenshot via WhatsApp
   ├─ You verify (is it real? is it yours?)
   └─ Process order manually
   
   Result: Takes hours, prone to errors!

4. Limited Payment Options:
   └─ Only bank transfer? Lose customers who prefer GoPay/cards!
```

---

### **With Payment Gateway (Midtrans)**

✅ **What you get:**

```
1. Professional Checkout:
   Customer clicks "Pay" → Beautiful payment page
   ├─ Choose GoPay/Bank/Card
   ├─ Pay securely
   └─ Instant confirmation
   
2. Automatic Processing:
   Payment received → Webhook to your server
   ├─ Order created automatically
   ├─ Stock reduced
   ├─ Customer notified
   └─ You just pack & ship!

3. Multiple Payment Methods:
   ├─ E-wallets (GoPay, ShopeePay, OVO)
   ├─ Bank transfers (BCA, Mandiri, BRI)
   ├─ Credit/Debit cards
   ├─ QRIS (universal QR)
   └─ Cash (Indomaret, Alfamart)

4. Security Handled:
   ├─ PCI-DSS compliant
   ├─ Encrypted transactions
   ├─ Fraud detection
   └─ You don't touch sensitive data!

5. Trust & Credibility:
   ├─ "Secured by Midtrans" badge
   ├─ Recognized brand (owned by Gojek)
   └─ Customers feel safe
```

---

## 🔄 How Online Payments Work

### **The Complete Flow**

```
┌─────────────┐
│  CUSTOMER   │ "I want to buy Lavender Oil (Rp 125,000)"
└──────┬──────┘
       │ 1. Clicks "Checkout"
       ↓
┌─────────────────┐
│  YOUR WEBSITE   │ Checkout page
└────────┬────────┘
         │ 2. POST /api/create-payment
         ↓
┌────────────────┐
│  YOUR BACKEND  │ Creates order, calls Midtrans API
└────────┬───────┘
         │ 3. Request payment token
         ↓
┌────────────────┐
│    MIDTRANS    │ Generates secure payment link
└────────┬───────┘
         │ 4. Returns payment token
         ↓
┌────────────────┐
│  YOUR BACKEND  │ Sends token to frontend
└────────┬───────┘
         │ 5. Frontend opens Midtrans page
         ↓
┌────────────────┐
│  CUSTOMER PAYS │ Chooses GoPay, enters PIN, confirms
└────────┬───────┘
         │ 6. Payment processed
         ↓
┌────────────────┐
│    GOPAY API   │ Deducts money from customer's GoPay
└────────┬───────┘
         │ 7. Confirms to Midtrans
         ↓
┌────────────────┐
│    MIDTRANS    │ Receives confirmation
└────────┬───────┘
         │ 8. Sends webhook to your server
         ↓
┌────────────────┐
│  YOUR BACKEND  │ Verifies signature, updates order
└────────┬───────┘
         │ 9. Marks order as "paid"
         ↓
┌────────────────┐
│   FIRESTORE    │ Order status: "pending" → "paid"
└────────┬───────┘
         │ 10. Trigger confirmation
         ↓
┌────────────────┐
│    WHATSAPP    │ "Pesanan Anda dikonfirmasi! 🎉"
└────────────────┘

Time elapsed: 5-10 seconds! ⚡
```

---

## 🇮🇩 Why Midtrans for Indonesia?

### **Comparison with Global Gateways**

| Feature | Midtrans | Stripe | PayPal |
|---------|----------|--------|--------|
| **E-wallet Support** | ✅ GoPay, OVO, Dana, ShopeePay | ❌ None | ❌ None |
| **QRIS** | ✅ Yes | ❌ No | ❌ No |
| **Bank Transfer** | ✅ All major banks | ❌ No | ❌ No |
| **Indonesian Language** | ✅ Full support | ❌ English only | ❌ English only |
| **Local Customer Service** | ✅ Jakarta-based | ❌ USA | ❌ Singapore |
| **Fee for E-wallets** | ✅ 0.7% | N/A | N/A |
| **Fee for Cards** | ✅ 2% | ❌ 2.9% + $0.30 | ❌ 3.9% + $0.49 |
| **Indonesian Business License** | ✅ Supports | ⚠️ Difficult | ⚠️ Difficult |
| **Settlement** | ✅ IDR to IDR bank | ❌ USD conversion | ❌ USD conversion |

---

### **Customer Preference in Indonesia**

**What Indonesians actually use to pay online:**

```
📱 E-wallets: 60%
├─ GoPay: 25%
├─ ShopeePay: 20%
├─ OVO: 10%
└─ Dana: 5%

🏦 Bank Transfer: 25%
├─ BCA Virtual Account: 15%
├─ Mandiri: 5%
└─ Others: 5%

📲 QRIS: 10%

💳 Credit/Debit Cards: 5%

💵 Cash (convenience store): < 1%
```

**If you only support credit cards:**
- ❌ Lose 95% of potential customers!
- ❌ Indonesians don't commonly use cards for online shopping

**With Midtrans:**
- ✅ Support all popular payment methods
- ✅ Reach 99% of Indonesian online shoppers
- ✅ Higher conversion rate

---

## 💰 Pricing Breakdown

### **Midtrans Fees**

| Payment Method | Fee | Example (Rp 250,000) | When Customer Pays |
|----------------|-----|----------------------|--------------------|
| **GoPay** | 0.7% | Rp 1,750 | Instant |
| **ShopeePay** | 0.7% | Rp 1,750 | Instant |
| **OVO** | 0.7% | Rp 1,750 | Instant |
| **QRIS** | 0.7% | Rp 1,750 | Instant |
| **Bank Transfer BCA** | Rp 4,000 flat | Rp 4,000 | 2-15 min |
| **Bank Transfer Mandiri** | Rp 4,000 flat | Rp 4,000 | 2-15 min |
| **Credit Card** | 2% | Rp 5,000 | Instant |
| **Debit Card** | 2% | Rp 5,000 | Instant |
| **Indomaret** | Rp 5,000 flat | Rp 5,000 | Walk-in |
| **Kredivo (BNPL)** | 2.5% | Rp 6,250 | Instant |

**No hidden fees:**
- ✅ No setup fee
- ✅ No monthly fee
- ✅ No integration fee
- ✅ No refund fee
- ✅ Only pay per successful transaction

---

### **Real-World Cost Calculation**

**Your essential oil shop example:**

```
Monthly sales: 100 orders
Average order value: Rp 250,000
Total revenue: Rp 25,000,000

Payment method distribution:
├─ 45 orders via GoPay (Rp 1,750 each = Rp 78,750)
├─ 30 orders via Bank Transfer (Rp 4,000 each = Rp 120,000)
├─ 15 orders via QRIS (Rp 1,750 each = Rp 26,250)
└─ 10 orders via Credit Card (Rp 5,000 each = Rp 50,000)

Total monthly fees: Rp 275,000
Percentage: 1.1% of revenue ✅

You keep: Rp 24,725,000 (98.9%)
```

---

## 📱 Payment Methods Explained

### **1. E-wallets (Most Popular!)**

**GoPay:**
```
How it works:
├─ Customer has GoPay app installed
├─ Clicks "Pay with GoPay"
├─ Redirected to GoPay app
├─ Enters PIN
└─ Payment confirmed instantly! ⚡

Fee: 0.7% (cheapest!)
Settlement: T+2 (2 business days)
Popular among: Everyone! Gojek users
```

**ShopeePay:**
```
How it works:
├─ Customer has Shopee app
├─ Uses ShopeePay balance or linked card
├─ One-tap payment
└─ Instant confirmation

Fee: 0.7%
Settlement: T+2
Popular among: Shopee buyers (huge market!)
```

---

### **2. Bank Transfer**

**BCA Virtual Account:**
```
How it works:
├─ Customer chooses BCA
├─ Gets unique VA number: 70012345678
├─ Opens BCA Mobile/ATM
├─ Transfers to that VA number
├─ Payment auto-confirmed (2-15 minutes)
└─ Order processed

Fee: Rp 4,000 flat
Settlement: T+2
Popular among: BCA account holders (very common)
```

---

### **3. QRIS (Universal QR)**

```
How it works:
├─ Customer sees QR code
├─ Opens ANY e-wallet app (GoPay, OVO, Dana, LinkAja, bank apps)
├─ Scans QR code
├─ Confirms payment
└─ Works with all apps! 🎉

Fee: 0.7%
Settlement: T+2
Popular among: Everyone with any Indonesian bank/e-wallet app
```

---

## 🔐 Security Features

### **What Midtrans Provides:**

**1. PCI-DSS Level 1 Certified**
```
- Highest security standard for payment processing
- Same level as banks
- You don't need to handle sensitive card data
```

**2. 3D Secure**
```
- Extra verification for credit cards
- OTP sent to customer's phone
- Reduces fraud significantly
```

**3. Fraud Detection**
```
- AI-powered fraud analysis
- Blacklist management
- Velocity checking
- Device fingerprinting
```

**4. Webhook Signature Verification**
```
- Every webhook is signed
- You verify the signature
- Prevents fake payment notifications
```

**5. Encryption**
```
- All data transmitted via HTTPS
- End-to-end encryption
- No plain text sensitive data
```

---

## 🎯 Midtrans Products: Snap vs Core API

### **Snap (Recommended for You!)**

**What is it:**
- Pre-built payment page
- Hosted by Midtrans
- All payment methods included
- Mobile responsive

**Pros:**
```
✅ Quick integration (1-2 hours)
✅ No UI design needed
✅ Automatic updates
✅ PCI compliance handled by Midtrans
✅ Perfect for beginners
```

**Cons:**
```
⚠️ Limited customization
⚠️ Redirects to Midtrans domain
⚠️ Can't fully match your brand
```

**When to use:**
- 🎯 **Your essential oil shop!**
- 🎯 Small to medium businesses
- 🎯 Want to launch quickly
- 🎯 Don't have designer

---

### **Core API (Advanced)**

**What is it:**
- Build your own payment UI
- Host on your domain
- Full design control

**Pros:**
```
✅ Complete design freedom
✅ Stay on your domain
✅ Perfect brand match
```

**Cons:**
```
❌ More complex integration
❌ Need to design UI for each payment method
❌ Handle PCI compliance
❌ More testing required
❌ Takes 2-3 weeks to build
```

**When to use:**
- Large enterprises
- Unique UX requirements
- Already have design team
- **NOT for beginners!**

---

## ✅ Should You Use Midtrans?

**Use Midtrans if:**

✅ Your customers are in Indonesia  
✅ You want to accept GoPay, ShopeePay, etc.  
✅ You want low fees (0.7% for e-wallets!)  
✅ You need Indonesian language support  
✅ You want quick integration  
✅ You're a small/medium business  
✅ You care about customer trust (Gojek brand)  

---

## 📊 Quick Reference

### **Midtrans Key Facts**

```
Owner: Gojek (Indonesia's tech unicorn)
Founded: 2012
Users: 100,000+ merchants
Transactions: Billions of IDR daily
Countries: Indonesia, Philippines (via Xendit)

Cheapest fee: 0.7% (e-wallets, QRIS)
Most expensive: 2.5% (BNPL)
Setup fee: Rp 0
Monthly fee: Rp 0
Settlement: T+2 to T+3
```

---

## 🎓 What You've Learned

After reading this guide, you now know:

- [x] What a payment gateway does
- [x] How online payments work end-to-end
- [x] Why Midtrans is best for Indonesia
- [x] Payment methods your customers actually use
- [x] How much fees you'll pay (very reasonable!)
- [x] Security features that protect you and customers
- [x] Difference between Snap and Core API
- [x] When to use Midtrans vs alternatives

---

## 🚀 Next Steps

Now that you understand the basics:

1. ✅ **Read this guide** (you just did!)
2. 📝 **Next:** Go to `02-setup-account.md`
3. 🔑 Register Midtrans account
4. 💻 Get API keys
5. 🛠️ Start building!

---

**Ready to set up your account? Let's go!** 🎉

**Next Guide:** [`02-setup-account.md` →](02-setup-account.md)
