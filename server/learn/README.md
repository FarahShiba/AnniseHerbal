# 📚 Learning Guide: Building Products API

Welcome to your learning journey! This folder contains structured guides to help you build the Products API from scratch.

## 📂 Folder Structure

```
learn/
├── README.md (you are here)
├── 01-fundamentals/
│   ├── rest-api-basics.md
│   ├── express-routing.md
│   └── async-await.md
├── 02-setup/
│   ├── project-structure.md
│   └── typescript-setup.md
├── 03-implementation/
│   ├── controllers.md
│   ├── routes.md
│   └── firestore-queries.md
├── 04-testing/
│   ├── testing-tools.md
│   └── api-testing-guide.md
├── 05-advanced/
│   ├── pagination.md
│   ├── filtering.md
│   └── error-handling.md
└── 07-payment-system-indonesia/    ← NEW! 💳
    ├── README.md
    ├── 01-overview.md
    ├── 02-setup-account.md
    ├── 03-installation.md (coming soon)
    ├── 04-backend-integration.md (coming soon)
    ├── 05-webhook-handling.md (coming soon)
    ├── 06-frontend-integration.md (coming soon)
    ├── 07-testing-guide.md (coming soon)
    └── 08-go-live-checklist.md (coming soon)
```

## 🎯 Learning Path

### **Phase 1: Foundation (Start Here)**
1. Read `01-fundamentals/rest-api-basics.md`
2. Read `01-fundamentals/express-routing.md`
3. Read `01-fundamentals/async-await.md`

### **Phase 2: Setup**
4. Review `02-setup/project-structure.md`
5. Understand `02-setup/typescript-setup.md`

### **Phase 3: Build (The Fun Part!)**
6. Follow `03-implementation/controllers.md` - START WITH `getAllProducts`
7. Then `03-implementation/routes.md`
8. Learn `03-implementation/firestore-queries.md`

### **Phase 4: Testing**
9. Setup tools from `04-testing/testing-tools.md`
10. Practice with `04-testing/api-testing-guide.md`

### **Phase 5: Level Up**
11. Add features from `05-advanced/` folder

### **Phase 6: Payment Integration** 💰
12. Start with `07-payment-system-indonesia/README.md`
13. Follow guides 01-08 to integrate Midtrans payment gateway
14. Accept GoPay, Bank Transfer, QRIS, and more!

---

## ✅ Checkpoints

Before moving forward, make sure you can answer:

- [ ] What is REST and why do we use it?
- [ ] What's the difference between GET, POST, PUT, DELETE?
- [ ] What is async/await?
- [ ] What is the role of a controller vs a route?
- [ ] How do I query Firestore?
- [ ] How do I test my API endpoints?

---

## 🚀 Quick Start

1. Start with `getAllProducts` function (easiest)
2. Test it with Thunder Client
3. Once working, move to next endpoint
4. Don't rush - understanding > speed

---

## 📖 External Resources

**Must-Read Documentation:**
- [Express.js Routing](https://expressjs.com/en/guide/routing.html)
- [Firestore Get Data](https://firebase.google.com/docs/firestore/query-data/get-data)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

**Recommended Tutorials:**
- "REST API Tutorial" on YouTube by Traversy Media
- "Node.js Crash Course" by Net Ninja
- "TypeScript for Beginners" by freeCodeCamp

---

## 💡 Learning Tips

1. **Google First** - When stuck, try searching: "how to [what you want] in express.js"
2. **Read Error Messages** - They usually tell you exactly what's wrong
3. **Console.log Everything** - See what your data looks like
4. **One Thing at a Time** - Don't try to build everything at once
5. **Ask Questions** - When truly stuck, ask me to review your code

---

## 🎓 By the End, You'll Understand:

✅ How to structure a Node.js/Express API  
✅ How to query Firestore database  
✅ How to handle async operations  
✅ How to test APIs with tools  
✅ How to handle errors properly  
✅ How to add pagination and filtering  
✅ How to integrate payment gateway (Midtrans) 💳  
✅ How to process online payments securely  

---

## 💳 Payment Integration (Indonesia)

Once you've mastered the basics, head to **`07-payment-system-indonesia/`** to learn:

- 🇮🇩 Accept payments from Indonesian customers
- 💰 Support GoPay, ShopeePay, Bank Transfer, QRIS
- 🔐 Secure payment processing with Midtrans
- 📱 Handle webhooks and order confirmations
- ✅ Only **0.7% fee** for e-wallets!

**Why Midtrans?**
- Lowest fees in Indonesia (0.7% for e-wallets)
- Owned by Gojek (trusted brand)
- Supports all Indonesian payment methods
- Easy integration with your API

---

**Ready to start? Head to `01-fundamentals/rest-api-basics.md`!**

**After mastering APIs? Head to `07-payment-system-indonesia/README.md` for payments!**
