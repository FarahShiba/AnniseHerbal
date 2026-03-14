# 📦 Frontend Integration Documentation

Welcome to the frontend integration documentation for Annise Herbal e-commerce platform.

---

## 📚 Documentation Index

### 🚀 [Quick Start Guide](./quick-start-guide.md)
**Start here!** Step-by-step guide to integrate backend APIs into the React frontend with code examples for each step.

**What's inside:**
- Environment setup
- API configuration
- Product service integration
- Contact form integration
- Newsletter integration
- Cart state management
- Checkout & Midtrans payment
- Testing checklist
- Common issues & solutions

**Estimated time:** Follow along and complete in 10-12 hours

---

### 📊 [Frontend Integration Progress Tracker](./frontend-integration-progress.md)
Comprehensive tracker for monitoring integration progress across all frontend features.

**What's inside:**
- Overview of 8 integration phases
- Task checklists for each phase
- Time estimates per task
- Status tracking (Not Started / In Progress / Completed)
- Priority assignments
- Notes and decisions
- Timeline estimate

**Use this to:**
- Track your progress
- Plan your work
- Estimate remaining time
- Document decisions

---

### 📖 [API Endpoints Reference](./api-endpoints-reference.md)
Quick reference for all available backend API endpoints with request/response examples.

**What's inside:**
- Products endpoints (GET all, GET by ID)
- Contact form endpoint (POST)
- Newsletter subscription endpoint (POST)
- Order creation endpoint (POST)
- Webhook endpoint (POST - backend only)
- Health check endpoint (GET)
- Request/response examples for each
- Validation rules
- Error response formats

**Use this for:**
- Quick API lookup while coding
- Understanding request/response structure
- Validation requirements
- Error handling patterns

---

## 🎯 Recommended Workflow

### For First-Time Integration:

1. **Read:** [Quick Start Guide](./quick-start-guide.md) - Get overview
2. **Setup:** Follow Step 1 (API Configuration)
3. **Reference:** Keep [API Endpoints Reference](./api-endpoints-reference.md) open
4. **Track:** Update [Frontend Integration Progress Tracker](./frontend-integration-progress.md) as you complete tasks
5. **Integrate:** Follow steps 2-6 in Quick Start Guide
6. **Test:** Use testing checklist in Quick Start Guide

### For Specific Features:

**Looking up an API?**
→ [API Endpoints Reference](./api-endpoints-reference.md)

**Need integration code?**
→ [Quick Start Guide](./quick-start-guide.md)

**Checking progress?**
→ [Frontend Integration Progress Tracker](./frontend-integration-progress.md)

---

## 🏗️ Architecture Overview

```
Frontend (React + TypeScript)
    ↓
API Utility Layer (src/utils/api.ts)
    ↓
Service Layer (src/services/*.ts)
    ↓
HTTP Requests (fetch)
    ↓
Backend API (Express + Node.js)
    ↓
Firestore Database
```

**Key Concepts:**
- **API Utility:** Centralized fetch wrapper with error handling
- **Services:** Feature-specific API calls (products, orders, contact)
- **Context/State:** Cart management with React Context
- **Environment Variables:** API URLs and keys in `.env.local`

---

## 📦 Backend Status

**✅ Backend APIs Ready:**
- Products (GET all, GET by ID)
- Contact Form (POST)
- Newsletter (POST)
- Order Creation (POST)
- Midtrans Payment Integration
- Email Notifications (Brevo)

**⚠️ Pending:**
- Brevo account activation (for live emails)

**Backend Documentation:**
- API Docs: `../../server/documentation/`
- Dev Tracker: `../../server/development-tracker/api-development-progress.md`
- Midtrans Guide: `../../server/learn/payment-system-indonesia/`

---

## 🔧 Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **State Management:** React Context API (for cart)
- **Routing:** React Router
- **HTTP Client:** Native Fetch API

### Backend (Integration Points)
- **Server:** Express + Node.js
- **Database:** Firebase Firestore
- **Payments:** Midtrans Snap API
- **Emails:** Brevo (formerly Sendinblue)

---

## 📝 Key Files to Create

During integration, you'll create these new files:

### Configuration
- `client/.env.local` - Environment variables
- `client/src/config/api.ts` - API configuration

### Utilities
- `client/src/utils/api.ts` - API request wrapper
- `client/src/utils/midtransHelper.ts` - Midtrans Snap helper

### Services
- `client/src/services/productService.ts` - Product API calls
- `client/src/services/contactService.ts` - Contact form API
- `client/src/services/newsletterService.ts` - Newsletter API
- `client/src/services/orderService.ts` - Order creation API

### State Management
- `client/src/contexts/CartContext.tsx` - Shopping cart state

### Updates to Existing Files
- `client/src/pages/ShopPage.tsx` - Load products from API
- `client/src/pages/ProductDetailPage.tsx` - Load single product
- `client/src/pages/ContactPage.tsx` - Submit form to API
- `client/src/pages/CheckoutPage.tsx` - Create order + payment
- `client/index.html` - Add Midtrans Snap script

---

## 🚀 Getting Started

**Prerequisites:**
- Backend server running on `http://localhost:3000`
- Node.js and npm installed
- Basic understanding of React hooks
- Familiarity with async/await

**Start Here:**
1. Open [Quick Start Guide](./quick-start-guide.md)
2. Follow Step 1: API Configuration
3. Test each integration as you go
4. Update progress tracker

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Products display from API
- [ ] Product detail page works
- [ ] Contact form submits
- [ ] Newsletter subscribes
- [ ] Cart add/remove works
- [ ] Cart persists on refresh
- [ ] Checkout form validates
- [ ] Order creates successfully
- [ ] Midtrans payment opens
- [ ] Payment success flow works

### Test Data
**Midtrans Sandbox Cards:**
- Success: `4811111111111114`
- Failure: `4911111111111113`
- 3DS: `4666666666666666`

---

## 🐛 Troubleshooting

### Backend not responding?
```bash
cd server
npm run dev
# Check http://localhost:3000/api/health
```

### CORS errors?
- Verify backend CORS is enabled
- Check API_BASE_URL is correct
- Ensure backend is running

### Midtrans not opening?
- Verify script in `index.html`
- Check client key in `.env.local`
- Inspect browser console for errors

### Environment variables not loading?
- Restart dev server after creating `.env.local`
- Verify variable names start with `VITE_`
- Check file is in `client/` folder, not root

---

## 📚 Additional Resources

### External Documentation
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Context API](https://react.dev/reference/react/useContext)
- [Midtrans Snap Docs](https://docs.midtrans.com/docs/snap-integration-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Internal Documentation
- Backend API: `../../server/documentation/`
- Midtrans Guide: `../../server/learn/payment-system-indonesia/`
- Postman Tests: `../../server/development-tracker/postman-testing-guide.md`

---

## 📅 Timeline

Estimated total time: **10-12 hours**

**Phase 1:** Setup & Config - 45 min  
**Phase 2:** Products - 1 hour  
**Phase 3:** Contact & Newsletter - 1.5 hours  
**Phase 4:** Cart & Checkout - 5 hours  
**Phase 5:** Testing - 2 hours  
**Phase 6:** Polish & Optimization - 1.5 hours

---

## 🎯 Success Criteria

Integration is complete when:
- ✅ All products load from backend API
- ✅ Contact form submits successfully
- ✅ Newsletter subscription works
- ✅ Shopping cart functions properly
- ✅ Checkout creates order in Firestore
- ✅ Midtrans payment popup opens
- ✅ Test payment completes successfully
- ✅ No console errors
- ✅ All features tested end-to-end

---

## 💡 Tips

1. **Start small:** Get products working first before tackling checkout
2. **Test frequently:** Test each integration immediately after implementing
3. **Use console.log:** Debug API responses during development
4. **Check backend logs:** Backend console shows request/response details
5. **Keep Postman handy:** Test backend endpoints independently
6. **Update tracker:** Mark tasks complete as you finish them
7. **Ask questions:** Refer to documentation when stuck

---

## 🔄 Next Steps After Integration

Once basic integration is complete:

1. **Add toast notifications** (react-hot-toast or sonner)
2. **Implement loading skeletons** for better UX
3. **Add error boundary** for error handling
4. **Optimize images** and bundle size
5. **Add analytics** (Google Analytics or similar)
6. **Prepare for production** deployment
7. **Set up monitoring** and error tracking

---

## 📞 Support

**Having issues?**
- Review [Quick Start Guide](./quick-start-guide.md) troubleshooting section
- Check backend logs for errors
- Verify all environment variables are set
- Test backend endpoints in Postman first
- Review [API Endpoints Reference](./api-endpoints-reference.md)

**Still stuck?**
- Check backend documentation: `../../server/documentation/`
- Review similar examples in Quick Start Guide
- Verify backend is running and healthy

---

**Ready to start?** → [Quick Start Guide](./quick-start-guide.md)

**Last Updated:** March 12, 2026
