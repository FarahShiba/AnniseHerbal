# 🎨 Frontend Integration - React Checkout Flow

**Reading Time:** 50 minutes  
**Difficulty:** Intermediate ⭐⭐⭐  
**Prerequisites:** Backend & webhook complete

---

## 🎯 What You'll Learn

In this guide, you'll learn to:
- ✅ Create checkout page UI
- ✅ Call payment API from React
- ✅ Integrate Midtrans Snap popup
- ✅ Handle payment callbacks
- ✅ Show order confirmation
- ✅ Handle errors gracefully

---

## 🏗️ Frontend Architecture

```
Customer clicks "Checkout"
       ↓
CheckoutPage collects shipping info
       ↓
User clicks "Pay Now"
       ↓
Call your backend: POST /api/payment/create-transaction
       ↓
Backend returns Snap token
       ↓
Open Midtrans Snap popup with token
       ↓
Customer completes payment in popup
       ↓
Popup closes → onSuccess/onPending/onError callback
       ↓
Redirect to Order Confirmation page
```

---

## 📦 Step 1: Install Midtrans Snap Script

### **Update `client/index.html`**

Add Midtrans Snap script in the `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Annise Herbal - Essential Oils</title>
    
    <!-- Midtrans Snap Script -->
    <!-- Use sandbox for testing -->
    <script 
      type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="YOUR_CLIENT_KEY_HERE"
    ></script>
    
    <!-- For production, use: -->
    <!-- <script 
      type="text/javascript"
      src="https://app.midtrans.com/snap/snap.js"
      data-client-key="YOUR_PRODUCTION_CLIENT_KEY"
    ></script> -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Important:** Replace `YOUR_CLIENT_KEY_HERE` with your actual client key from Midtrans dashboard.

---

## 🔒 Step 2: Create Environment Variables

### **Create `client/.env`**

```env
# API Base URL
VITE_API_URL=http://localhost:5000/api

# Midtrans Client Key
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-your-key-here

# Environment (sandbox or production)
VITE_ENVIRONMENT=sandbox
```

**For production (`client/.env.production`):**
```env
VITE_API_URL=https://your-api.com/api
VITE_MIDTRANS_CLIENT_KEY=Mid-client-production-key-here
VITE_ENVIRONMENT=production
```

---

## 🎨 Step 3: Update CheckoutPage

### **Update `client/src/pages/CheckoutPage.tsx`**

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TypeScript interface for the global snap object
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: any) => void;
          onPending: (result: any) => void;
          onError: (result: any) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  category: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get cart from localStorage (you already have this logic)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Customer form state
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });

  // Loading & error states
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 15000; // JNE Regular
  const total = subtotal + shippingCost;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!customer.firstName || !customer.lastName) {
      setError('Nama lengkap harus diisi');
      return false;
    }
    if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email)) {
      setError('Email tidak valid');
      return false;
    }
    if (!customer.phone || customer.phone.length < 10) {
      setError('Nomor telepon tidak valid (min. 10 digit)');
      return false;
    }
    if (!customer.address || !customer.city || !customer.province) {
      setError('Alamat lengkap harus diisi');
      return false;
    }
    return true;
  };

  // Main payment function
  const handlePayment = async () => {
    try {
      setError(null);

      // 1. Validate form
      if (!validateForm()) {
        return;
      }

      // 2. Check if Snap is loaded
      if (!window.snap) {
        setError('Midtrans Snap belum dimuat. Silakan refresh halaman.');
        return;
      }

      setIsProcessing(true);

      // 3. Prepare order data
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          size: item.size
        })),
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone
        },
        shipping: {
          address: customer.address,
          city: customer.city,
          province: customer.province,
          postalCode: customer.postalCode,
          method: 'JNE Regular',
          cost: shippingCost
        },
        total: total
      };

      console.log('📦 Creating transaction...', orderData);

      // 4. Call your backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal membuat transaksi');
      }

      console.log('✅ Transaction created:', data);

      const { token, orderId } = data;

      // 5. Save orderId for later (confirmation page)
      sessionStorage.setItem('lastOrderId', orderId);

      // 6. Open Midtrans Snap popup
      window.snap.pay(token, {
        onSuccess: function(result) {
          console.log('✅ Payment success!', result);
          
          // Clear cart
          localStorage.removeItem('cart');
          
          // Redirect to success page
          navigate(`/order-confirmation?orderId=${orderId}&status=success`);
        },
        
        onPending: function(result) {
          console.log('⏳ Payment pending...', result);
          
          // For bank transfer, e-wallet pending status
          navigate(`/order-confirmation?orderId=${orderId}&status=pending`);
        },
        
        onError: function(result) {
          console.error('❌ Payment error:', result);
          setError('Pembayaran gagal. Silakan coba lagi.');
          setIsProcessing(false);
        },
        
        onClose: function() {
          console.log('⚠️ Customer closed the popup');
          setIsProcessing(false);
          setError('Pembayaran dibatalkan. Silakan coba lagi jika Anda ingin melanjutkan.');
        }
      });

    } catch (error: any) {
      console.error('❌ Error:', error);
      setError(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Customer Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Data Pembeli</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Depan *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customer.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Belakang *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customer.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="08123456789"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Jalan, Nomor Rumah, RT/RW, Kelurahan, Kecamatan"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota/Kabupaten *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Contoh: Jakarta Selatan"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provinsi *
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={customer.province}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Contoh: DKI Jakarta"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={customer.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.size} × {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ongkir (JNE Regular)</span>
                  <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Payment Methods Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Metode Pembayaran:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✅ GoPay / ShopeePay / QRIS</li>
                  <li>✅ Transfer Bank (BCA, Mandiri, BNI, dll)</li>
                  <li>✅ Kartu Kredit / Debit</li>
                  <li>✅ Indomaret / Alfamart</li>
                </ul>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || cart.length === 0}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  `Bayar Rp ${total.toLocaleString('id-ID')}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Pembayaran aman melalui Midtrans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
```

---

## 🎉 Step 4: Create Order Confirmation Page

### **Create `client/src/pages/OrderConfirmationPage.tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface Order {
  orderId: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: any[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  shipping: {
    address: string;
    city: string;
    province: string;
  };
  createdAt: Date;
}

const OrderConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status'); // success, pending, error

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/order/${orderId}`
      );

      if (!response.ok) {
        throw new Error('Order tidak ditemukan');
      }

      const data = await response.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">{error || 'Terjadi kesalahan'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Status icon and message
  const StatusDisplay = () => {
    if (status === 'success' || order.paymentStatus === 'settlement') {
      return (
        <>
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran Berhasil! 🎉
          </h1>
          <p className="text-gray-600 mb-8">
            Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses.
          </p>
        </>
      );
    } else if (status === 'pending' || order.paymentStatus === 'pending') {
      return (
        <>
          <ClockIcon className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Menunggu Pembayaran ⏳
          </h1>
          <p className="text-gray-600 mb-8">
            Silakan selesaikan pembayaran Anda. Kami akan mengirim konfirmasi setelah pembayaran diterima.
          </p>
        </>
      );
    } else {
      return (
        <>
          <XCircleIcon className="h-20 w-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran Gagal
          </h1>
          <p className="text-gray-600 mb-8">
            Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi.
          </p>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <StatusDisplay />

          {/* Order ID */}
          <div className="bg-gray-50 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Nomor Pesanan</p>
            <p className="text-xl font-mono font-bold text-gray-900">{order.orderId}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Detail Pesanan</h2>
          
          {/* Items */}
          <div className="space-y-3 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Pembayaran</span>
              <span>Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Informasi Pengiriman</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Nama:</strong> {order.customer.firstName} {order.customer.lastName}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Alamat:</strong> {order.shipping.address}</p>
            <p><strong>Kota:</strong> {order.shipping.city}</p>
            <p><strong>Provinsi:</strong> {order.shipping.province}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Kembali Berbelanja
          </button>
          
          {order.paymentStatus === 'pending' && (
            <button
              onClick={() => {
                // Reload to check status
                fetchOrder();
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Cek Status Pembayaran
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📧 Konfirmasi Email</h3>
          <p className="text-sm text-blue-800">
            Kami telah mengirimkan detail pesanan ke <strong>{order.customer.email}</strong>.
            Silakan cek inbox atau folder spam Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
```

---

## 🛣️ Step 5: Add Routes

### **Update `client/src/App.tsx`**

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 🧪 Step 6: Test the Integration

### **Testing Checklist:**

1. **Start backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Test checkout flow:**
   - [ ] Add products to cart
   - [ ] Go to checkout page
   - [ ] Fill in customer details
   - [ ] Click "Bayar" button
   - [ ] Snap popup appears
   - [ ] Choose payment method (e.g., GoPay)
   - [ ] Complete payment in simulator
   - [ ] Redirected to confirmation page
   - [ ] Order status shows "success"

---

## 💳 Sandbox Payment Testing

### **Test Cards (Credit Card):**

```
Card Number: 4811 1111 1111 1114
CVV: 123
Exp Date: 01/25
OTP: 112233

Result: Success
```

```
Card Number: 4911 1111 1111 1113
CVV: 123
Exp Date: 01/25
OTP: 112233

Result: Denied by bank
```

---

### **Test GoPay/QRIS:**

```
Status: automatic success after simulation
```

When testing GoPay:
1. Choose GoPay in Snap popup
2. Click "Continue"
3. In simulator, click "Bayar" button
4. Payment automatically succeeds!

---

## 🐛 Common Issues & Solutions

### **Issue 1: Snap popup doesn't open**

**Symptoms:**
- Click "Bayar" button, nothing happens
- Console shows "window.snap is not defined"

**Solutions:**
```
1. Check index.html has Snap script:
   <script src="https://app.sandbox.midtrans.com/snap/snap.js"></script>

2. Check data-client-key is correct:
   data-client-key="SB-Mid-client-..."

3. Hard refresh browser (Ctrl + Shift + R)

4. Check browser console for errors
```

---

### **Issue 2: "Invalid Client Key" error**

**Solutions:**
```
1. Verify client key in index.html matches Midtrans dashboard

2. Make sure using sandbox client key for sandbox transactions

3. Check no extra spaces or quotes in the key
```

---

### **Issue 3: Payment succeeds but order status not updated**

**Solutions:**
```
1. Check webhook is configured in Midtrans dashboard

2. Use ngrok for local testing:
   ngrok http 5000

3. Check webhook logs in backend console

4. Verify webhook signature verification passes
```

---

## 🎨 UI Customization

### **Customize Snap Popup Colors:**

```typescript
window.snap.pay(token, {
  onSuccess: ...,
  onPending: ...,
  onError: ...,
  onClose: ...,
  
  // Optional customization
  gopayMode: 'deeplink', // or 'qr'
  uiMode: 'deeplink', // for e-wallets
  language: 'id', // Indonesian
  
  // Custom colors (not available in Snap popup)
  // But you can customize your checkout page!
});
```

---

### **Add Loading State:**

```typescript
<button disabled={isProcessing}>
  {isProcessing ? (
    <div className="flex items-center justify-center">
      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" 
                stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Memproses...
    </div>
  ) : (
    'Bayar Sekarang'
  )}
</button>
```

---

## 📱 Mobile Optimization

### **Responsive Design Tips:**

```css
/* Make Snap popup mobile-friendly */
@media (max-width: 640px) {
  .snap-payment-page {
    padding: 16px !important;
  }
}
```

The Snap popup is already mobile-optimized by Midtrans! It will:
- ✅ Deep link to GoPay/ShopeePay apps
- ✅ Responsive layout
- ✅ Touch-friendly buttons

---

## 🔔 Add Email Notifications (Optional)

You can use services like SendGrid or Nodemailer to send emails:

```typescript
// In your webhook controller after payment success:
if (transaction_status === 'settlement') {
  await sendEmail(order.customer.email, {
    subject: 'Pembayaran Dikonfirmasi - Annise Herbal',
    html: `
      <h1>Terima kasih, ${order.customer.firstName}!</h1>
      <p>Pembayaran Anda telah kami terima.</p>
      <p><strong>Nomor Pesanan:</strong> ${order_id}</p>
      <p>Pesanan Anda akan segera kami proses.</p>
    `
  });
}
```

---

## ✅ Final Checklist

Before going live:

- [ ] ✅ Snap script loads correctly
- [ ] ✅ Client key is correct
- [ ] ✅ API calls work (create transaction)
- [ ] ✅ Snap popup opens
- [ ] ✅ All callbacks work (success, pending, error, close)
- [ ] ✅ Order confirmation page displays correctly
- [ ] ✅ Webhook updates order status
- [ ] ✅ Cart clears after successful payment
- [ ] ✅ Error messages are user-friendly
- [ ] ✅ Mobile responsive
- [ ] ✅ Tested all payment methods

---

## 🎯 What's Next?

Your checkout is complete! 🎉

**Next steps:**
1. ✅ Frontend integrated with Midtrans
2. 📝 **Next guide:** `07-testing-guide.md`
3. 🧪 Test all payment scenarios
4. 🚀 Prepare for production launch

---

## 💡 Pro Tips

### **Tip 1: Add Payment Instructions**

```typescript
// Show payment-specific instructions
if (paymentType === 'bank_transfer') {
  return (
    <div className="bg-blue-50 p-4 rounded">
      <h3>Cara Transfer Bank:</h3>
      <ol>
        <li>Pilih bank Anda</li>
        <li>Transfer ke nomor virtual account</li>
        <li>Konfirmasi otomatis dalam 5 menit</li>
      </ol>
    </div>
  );
}
```

---

### **Tip 2: Save Cart for Later**

```typescript
// Before payment, save cart to database
// So customer can resume if they close popup
await db.collection('saved_carts').doc(userEmail).set({
  items: cart,
  savedAt: new Date()
});
```

---

### **Tip 3: Add Order Tracking**

```typescript
// Create order tracking page
<button onClick={() => navigate(`/track-order?id=${orderId}`)}>
  Lacak Pesanan
</button>
```

---

**Frontend integration complete!** 🎨✨

**Next Guide:** [`07-testing-guide.md` →](07-testing-guide.md)
