# 🔑 Midtrans Account Setup - Step by Step

**Reading Time:** 20 minutes  
**Difficulty:** Beginner ⭐  
**Prerequisites:** KTP, NPWP ready

---

## 🎯 What You'll Learn

After completing this guide:
- ✅ Register Midtrans account
- ✅ Upload verification documents
- ✅ Setup bank account for settlement
- ✅ Get Sandbox API keys
- ✅ Wait for production approval
- ✅ Get Production API keys

---

## 📋 Before You Start

### **Documents Checklist**

**For Individual Business (Perorangan):**
```
[ ] KTP (Indonesian ID Card) - clear photo
[ ] NPWP (Tax ID) - clear scan/photo
[ ] Selfie with KTP - face and ID visible
[ ] Bank account statement - from mobile/internet banking
[ ] Email address - active, check regularly
[ ] Phone number - for OTP verification
```

**For Company (PT/CV):**
```
[ ] Akta Pendirian (Articles of Association)
[ ] NPWP Perusahaan (Company Tax ID)
[ ] NIB (Business Identification Number)
[ ] SIUP (if applicable)
[ ] TDP (Company Registration)
[ ] Company bank account statement
[ ] Director's KTP
[ ] Email & phone (company)
```

**Photo Requirements:**
```
✅ Good lighting (no shadows)
✅ Clear, readable text
✅ No blur or glare
✅ File format: JPG or PNG
✅ File size: < 2MB each
✅ High resolution (not pixelated)
```

---

## 🚀 Step-by-Step Registration

### **Step 1: Create Account**

1. **Open Midtrans website:**
   ```
   https://dashboard.midtrans.com/register
   ```

2. **Fill registration form:**
   ```
   Nama Lengkap: [Your full name as in KTP]
   Email: [your-email@domain.com]
   Password: [Strong password - min 8 chars]
   No. Telepon: [08xxxxxxxxxx]
   
   ✅ Check: "Saya setuju dengan syarat dan ketentuan"
   ```

3. **Click "Daftar" (Register)**

4. **Verify your email:**
   ```
   📧 Check inbox (and spam folder!)
   Click verification link
   Wait for redirect to dashboard
   ```

---

### **Step 2: Complete Business Profile**

**After login, you'll see dashboard:**

1. **Click "Settings" (Pengaturan) → "Business Profile"**

2. **Fill business information:**

   **Business Details:**
   ```
   Nama Bisnis: Annise Herbal
   Jenis Bisnis: Herbal Products / Essential Oils
   Kategori Bisnis: Health & Beauty
   Website: https://anniseherbal.com (or your domain)
   
   Deskripsi Bisnis:
   "Kami menjual minyak essential murni dan produk 
   herbal berkualitas tinggi untuk kesehatan dan 
   kecantikan keluarga Indonesia."
   ```

   **Business Address:**
   ```
   Alamat: [Your complete address]
   Kota: [Your city]
   Provinsi: [Your province]
   Kode Pos: [Your postal code]
   ```

   **Contact Details:**
   ```
   Email Bisnis: info@anniseherbal.com
   No. WhatsApp: 08xxxxxxxxxx
   Instagram: @anniseherbal (if any)
   ```

3. **Click "Simpan" (Save)**

---

### **Step 3: Upload Verification Documents**

**Navigate to: Settings → Document Verification**

#### **Document 1: KTP (Front)**
```
1. Click "Upload KTP (Depan)"
2. Select clear photo of KTP front
3. Make sure:
   ✅ All text readable
   ✅ Photo not blurry
   ✅ No glare from flash
   ✅ File size < 2MB
4. Click "Upload"
5. Wait for "Berhasil diupload" ✅
```

#### **Document 2: KTP (Back)**
```
1. Click "Upload KTP (Belakang)"
2. Select clear photo of KTP back
3. Verify quality
4. Upload
```

#### **Document 3: Selfie with KTP**
```
Requirements:
├─ Your face clearly visible
├─ KTP held next to face
├─ All text on KTP readable
├─ Good lighting
└─ No sunglasses/mask

Tips:
✅ Use rear camera (better quality)
✅ Take during daytime
✅ Plain background
✅ Hold KTP steady
```

#### **Document 4: NPWP**
```
1. Scan or photo of NPWP card
2. Or screenshot from website DJP
3. Make sure:
   ✅ 15-digit NPWP number visible
   ✅ Name matches KTP
   ✅ Not expired
```

#### **Document 5: Bank Account Proof**
```
Options:
1. Screenshot from mobile banking
   ├─ Show account number
   ├─ Show account name
   └─ Date visible

2. Screenshot from internet banking
   └─ Account details page

3. Bank statement (last month)
   └─ With bank letterhead

Note: Account name MUST match KTP name!
```

---

### **Step 4: Bank Account Setup**

**Navigate to: Settings → Settlement**

1. **Select your bank:**
   ```
   Popular banks in dropdown:
   ├─ BCA (Bank Central Asia)
   ├─ Mandiri
   ├─ BNI
   ├─ BRI
   ├─ CIMB Niaga
   ├─ Permata
   └─ 30+ other banks
   ```

2. **Fill account details:**
   ```
   Nama Bank: [Select from dropdown]
   Nomor Rekening: [Your account number]
   Nama Pemilik: [Must match KTP name!]
   
   Example:
   Nama Bank: BCA
   Nomor Rekening: 4580187647
   Nama Pemilik: BUDI SANTOSO
   ```

3. **Choose settlement schedule:**
   ```
   Options:
   ├─ T+1 (Next business day) - Faster ✅
   ├─ T+2 (2 business days) - Standard
   └─ T+7 (Weekly) - For high volume
   
   Recommended: T+1 or T+2
   ```

4. **Click "Simpan" (Save)**

---

### **Step 5: Get Sandbox API Keys**

**You can start testing immediately!**

1. **Navigate to: Settings → Access Keys**

2. **Switch to "Sandbox" tab:**
   ```
   Environment: [ Sandbox ] [ Production ]
                   ↑ Click this first
   ```

3. **You'll see your keys:**
   ```javascript
   {
     "Merchant ID": "M123456",
     "Client Key": "SB-Mid-client-xxxxxxxxxxxxxxxxxx",
     "Server Key": "SB-Mid-server-yyyyyyyyyyyyyyyyyyyy"
   }
   ```

4. **Copy and save securely:**
   ```bash
   # Create .env file
   MIDTRANS_SERVER_KEY=SB-Mid-server-yyyyyyyyyyyyyyyyyyyy
   MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxxxxxx
   MIDTRANS_IS_PRODUCTION=false
   ```

5. **Test immediately:**
   ```
   ✅ You can integrate now
   ✅ Test all payment methods
   ✅ Use test cards/accounts
   ✅ No real money charged
   ```

---

## ⏳ Waiting for Approval

### **Timeline:**

```
Day 0: Submit documents ✅
       ↓
Day 1: Initial review by Midtrans
       ├─ Check document quality
       ├─ Verify KTP & NPWP
       └─ Check bank account

Day 1-2: May request additional documents
         └─ Check email regularly!

Day 2-5: Final verification
         ├─ Business legitimacy check
         ├─ Phone verification (may call you)
         └─ Final approval

Day 3-7: Approval! 🎉
         └─ Email notification sent
         └─ Production keys activated
```

---

## ✅ Approval Received!

### **Congratulations Email:**

```
Subject: 🎉 Akun Midtrans Anda Telah Disetujui!

Selamat! Akun Midtrans Anda telah disetujui.

Anda sekarang dapat:
✅ Menerima pembayaran nyata
✅ Menggunakan Production API keys
✅ Transaksi akan masuk ke rekening Anda

Login untuk mendapatkan Production API keys:
https://dashboard.midtrans.com/settings/access-keys

Salam,
Tim Midtrans
```

---

### **Get Production API Keys:**

1. **Login to dashboard**

2. **Navigate to: Settings → Access Keys**

3. **Switch to "Production" tab:**
   ```
   Environment: [ Sandbox ] [Production]
                               ↑ Click here
   ```

4. **Copy your production keys:**
   ```javascript
   {
     "Merchant ID": "M123456",
     "Client Key": "Mid-client-xxxxxxxxxxxxxxxxxxxx",
     "Server Key": "Mid-server-yyyyyyyyyyyyyyyyyyyy"
   }
   ```

5. **Update your `.env` file:**
   ```bash
   # Production keys
   MIDTRANS_SERVER_KEY_PROD=Mid-server-yyyyyyyyyyyyyyyyyyyy
   MIDTRANS_CLIENT_KEY_PROD=Mid-client-xxxxxxxxxxxxxxxxxxxx
   MIDTRANS_IS_PRODUCTION=true
   
   # Keep sandbox keys for testing
   MIDTRANS_SERVER_KEY_SANDBOX=SB-Mid-server-xxxxx
   MIDTRANS_CLIENT_KEY_SANDBOX=SB-Mid-client-xxxxx
   ```

---

## 🔐 Security Best Practices

### **Protecting Your API Keys**

#### **❌ NEVER Do This:**

```javascript
// Hardcoding in code
const serverKey = "Mid-server-yyyyyyyy"; // WRONG!

// Committing to Git
git add .env // WRONG!

// Sharing in chat/email
"Hi, my server key is Mid-server-xyz" // WRONG!

// Exposing in frontend
const config = {
  serverKey: "Mid-server-xyz" // WRONG! Client can see this!
};
```

---

#### **✅ ALWAYS Do This:**

```bash
# 1. Use environment variables
# .env file (add to .gitignore!)
MIDTRANS_SERVER_KEY=Mid-server-yyyyyyyy

# 2. Load in backend only
// server/src/config/midtrans.ts
import dotenv from 'dotenv';
dotenv.config();

export const serverKey = process.env.MIDTRANS_SERVER_KEY;

# 3. Add to .gitignore
// .gitignore
.env
.env.local
.env.production
```

---

## 🧪 Testing in Sandbox

### **Sandbox Test Accounts**

**Test Credit Cards:**
```
✅ Success:
Card: 4811 1111 1111 1114
Expiry: 01/25
CVV: 123
3D Secure OTP: 112233

❌ Failure:
Card: 4911 1111 1111 1113

⏳ Pending:
Card: 4011 1111 1111 1112
```

**Test GoPay:**
```
1. Choose GoPay in payment page
2. Click "Pay"
3. In simulator, click "Success"
4. Payment confirmed! ✅
```

**Test Bank Transfer:**
```
1. Choose BCA Virtual Account
2. Get VA number: 70012345678
3. Use Midtrans simulator
4. Pay to VA
5. Auto-confirm ✅
```

---

## ❓ Troubleshooting

### **Problem 1: Email Not Received**

```
Solution:
1. Check spam/junk folder
2. Wait 5-10 minutes
3. Add no-reply@midtrans.com to contacts
4. Request resend in dashboard
5. Try different email address
```

---

### **Problem 2: Documents Rejected**

```
Common reasons:
├─ Blurry photos ❌
│  └─ Solution: Take new photos in daylight
│
├─ Missing information ❌
│  └─ Solution: Ensure all fields filled
│
├─ Name mismatch ❌
│  └─ Solution: Use matching bank account
│
└─ Expired documents ❌
   └─ Solution: Update KTP/NPWP first
```

---

## ✅ Setup Checklist

Before moving to integration:

- [ ] Midtrans account created ✅
- [ ] Email verified ✅
- [ ] Business profile completed ✅
- [ ] All documents uploaded ✅
- [ ] Bank account configured ✅
- [ ] Sandbox API keys obtained ✅
- [ ] Keys saved in `.env` file ✅
- [ ] `.env` added to `.gitignore` ✅
- [ ] Waiting for production approval (or approved!) ✅

---

## 🎯 What's Next?

While waiting for approval:

1. ✅ **Use Sandbox keys** to start building
2. ✅ **Read next guide:** `03-installation.md`
3. ✅ **Install dependencies** and setup project
4. ✅ **Test integration** with sandbox
5. ✅ **Build your checkout flow**

When approved:
1. ✅ **Switch to production keys**
2. ✅ **Test with small real transactions**
3. ✅ **Go live!** 🚀

---

## 📞 Need Help?

### **Midtrans Support:**
```
📧 Email: support@midtrans.com
💬 Live Chat: https://dashboard.midtrans.com (bottom right)
📱 WhatsApp: Available in dashboard
📚 Docs: https://docs.midtrans.com
```

---

**Account setup complete! Ready to install the SDK?** 🚀

**Next Guide:** [`03-installation.md` →](03-installation.md)
