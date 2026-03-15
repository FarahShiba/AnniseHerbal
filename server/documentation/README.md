# 📚 Annise Herbal Backend API Documentation

**Last Updated:** February 28, 2026  
**Version:** 1.0.0  
**Maintainer:** Development Team

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
5. [Getting Started](#getting-started)
6. [Documentation Files](#documentation-files)

---

## 🎯 Overview

This is the backend API for **Annise Herbal E-Commerce Platform**, providing RESTful endpoints for:
- Product catalog management
- Customer contact form submissions
- Order processing (future)
- Newsletter subscriptions (future)

**Base URL (Development):** `http://localhost:3000`  
**Base URL (Production):** `https://api.anniseherbal.com` (TODO)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **TypeScript** | Type safety |
| **Firebase Firestore** | NoSQL database |
| **Brevo** | Email service (planned) |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   └── firebase.ts   # Firebase initialization
│   ├── controllers/      # Business logic
│   │   ├── productsController.ts
│   │   └── contactControllers.ts
│   ├── routes/           # API route definitions
│   │   ├── products.ts
│   │   └── contact.ts
│   ├── types/            # TypeScript interfaces
│   │   ├── product.ts
│   │   └── contacts.ts
│   ├── utils/            # Helper functions
│   │   ├── validation.ts
│   │   └── helpers.ts
│   └── index.ts          # Application entry point
├── documentation/        # API documentation (you are here!)
├── development-tracker/  # Progress tracking
└── package.json          # Dependencies
```

---

## 🚀 API Endpoints

### **Products API**

| Method | Endpoint | Description | Documentation |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | [View](./api-products.md) |
| GET | `/api/products/:category/:size/:id` | Get single product | [View](./api-product-by-id.md) |

### **Contact API**

| Method | Endpoint | Description | Documentation |
|--------|----------|-------------|---------------|
| POST | `/api/contact` | Submit contact form | [View](./api-contact.md) |

### **Future Endpoints**

- [ ] POST `/api/newsletter/subscribe` - Newsletter subscription
- [ ] POST `/api/orders` - Create order
- [ ] GET `/api/orders/:id` - Get order details

---

## 🏃 Getting Started

### **Prerequisites**

```bash
Node.js >= 18.x
npm >= 9.x
Firebase project setup
```

### **Installation**

```bash
# Clone repository
git clone [repository-url]

# Navigate to server
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Firebase credentials
```

### **Running Development Server**

```bash
npm run dev

# You should see:
# ✅ Server running at http://localhost:3000
# ✅ Firebase connected
```

### **Testing API**

Use Postman or any HTTP client:

```bash
# Health check
GET http://localhost:3000/api/health

# Get all products
GET http://localhost:3000/api/products
```

---

## 📚 Documentation Files

### **API Reference**
- [Products API](./api-products.md) - Get all products endpoint
- [Product By ID API](./api-product-by-id.md) - Get single product endpoint
- [Contact API](./api-contact.md) - Contact form submission endpoint

### **Architecture**
- [Validation System](./validation-system.md) - How validation works
- [Database Structure](./database-structure.md) - Firestore schema
- [Error Handling](./error-handling.md) - Error response patterns

### **Guides**
- [Adding New Endpoint](./guide-new-endpoint.md) - Step-by-step guide
- [Testing Guide](./guide-testing.md) - How to test APIs

---

## 🔐 Security

- ✅ Backend validation on all inputs
- ✅ TypeScript type safety
- ✅ Firebase security rules (configure in console)
- ⏳ Rate limiting (planned)
- ⏳ API authentication (planned)

---

## 📞 Support

For questions or issues:
- Check documentation files above
- Review code comments
- Contact: dev@anniseherbal.com

---

**Happy Coding! 🚀**
