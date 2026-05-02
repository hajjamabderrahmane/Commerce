# NOIR — Minimal Fashion E-Commerce

A production-ready React e-commerce store for a premium clothing brand.  
Inspired by Zara, H&M, and ASOS with a dark, editorial aesthetic.

---

## 🚀 Quick Start

### Option A — Use this project directly

```bash
cd noir-store
npm install
npm run dev
```

### Option B — Fresh Vite setup

```bash
npm create vite@latest noir-store -- --template react
cd noir-store
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then replace the generated files with those from this project.

---

## 📁 Project Structure

```
noir-store/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive nav with search + cart icon
│   │   ├── CartDrawer.jsx      # Slide-in cart panel
│   │   ├── ProductCard.jsx     # Hover image swap + quick-add
│   │   └── Footer.jsx          # Newsletter + links
│   ├── context/
│   │   ├── CartContext.jsx     # Cart state (useReducer)
│   │   └── ToastContext.jsx    # Toast notification system
│   ├── data/
│   │   └── products.js         # 12 sample products
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero, featured, categories
│   │   ├── ProductsPage.jsx    # Grid + filter sidebar
│   │   ├── ProductDetailPage.jsx  # Full product view
│   │   ├── CheckoutPage.jsx    # 3-step checkout flow
│   │   └── OrderSuccessPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind + custom utilities
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## ✨ Features

- **Home**: Hero section, category strip, editor's picks, campaign banner, USPs
- **Products**: Filtering by category, size, price range, sale; sorting; search
- **Product Detail**: Image gallery, size/color selection, accordions, related products
- **Cart**: Slide-in drawer, quantity controls, persistent state via Context API
- **Checkout**: 3-step flow (Shipping → Payment → Review) with form validation
- **Toast Notifications**: Appears on add-to-cart
- **Search**: Via navbar, filters into products page
- **Responsive**: Mobile-first, works on all screen sizes

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Display font | Playfair Display (serif) |
| Body font | DM Sans |
| Mono font | DM Mono |
| Primary | `#1a1a1a` (Charcoal) |
| Background | `#f5f2ed` (Cream) |
| Accent | Noir scale (warm grays) |

---

## 🛠 Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router 6
- Context API (no external state library needed)

---

## 📦 Deploy

```bash
npm run build
# dist/ folder is ready for Netlify, Vercel, or any static host
```
