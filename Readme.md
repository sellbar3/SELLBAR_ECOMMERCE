# SELLBAR — Multi-Vendor Refurbished E-Commerce & Recommerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SELLBAR** is a modern, high-performance multi-vendor e-commerce and recommerce platform built for refurbished electronic gadgets. Users can buy certified refurbished devices with warranty, sell old devices with doorstep pickup, and vendors can manage their inventory through a dedicated portal.

---

## 🌟 Key Features

### 🛒 1. Customer Experience
- **Buy Refurbished Tech**: Browse certified pre-owned smartphones, laptops, tablets, smartwatches, and accessories with detailed condition grades and warranty.
- **Sell Old Gadgets (Recommerce)**: Instant valuation wizard and doorstep pickup booking for selling used devices.
- **Cart & Fast Checkout**: Persistent local + server-synced cart with address management and payment options.
- **Order Tracking**: Order lifecycle updates, cancellation support, and invoice status.
- **Authentication**: Phone OTP and email/password login, registration, and persistent user profile management.

### 🏪 2. Vendor Partner Portal (`/vendor`)
- Dedicated Vendor Login (`/vendor/login`) and registration with admin approval workflow.
- Inventory & Product Catalog management (Add, Edit, Stock control, Image upload via Cloudinary).
- Order fulfillment and dispatch management.
- Vendor profile and store configuration.

### 🛡️ 3. Admin Control Center (`/admin`)
- Master Admin Login (`/admin/login`) with role-based access control.
- Vendor verification and approval/rejection pipeline.
- User status management (activate/suspend).
- Category and product management across the marketplace.

---

## 🏗️ Architecture & Tech Stack

```
sellbar-ecommerce/
├── backend/                  # Node.js + Express REST API (Port 5000)
│   ├── src/
│   │   ├── config/           # DB (Mongoose), CORS, Cloudinary, Razorpay
│   │   ├── controllers/      # Admin, Auth, Cart, Customer, Order, Payment, Product, Vendor
│   │   ├── middlewares/      # Auth, Role, Error, Rate Limiting, Upload
│   │   ├── models/           # User, Vendor, Product, Order, Category, Cart, etc.
│   │   ├── routes/           # REST endpoints
│   │   ├── services/         # Cloudinary, Email, Payment logic
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Server bootstrap with resilient DB retry
│   ├── .env.example
│   └── package.json
│
├── sellbar-frontend/         # Next.js 16 App Router (Port 3000)
│   ├── src/
│   │   ├── app/              # Routes: /, /buy-refurbished, /sell, /cart, /vendor, /admin, etc.
│   │   ├── components/       # UI Components (Navbar, Footer, Modals, Wizards, Panels)
│   │   ├── css/              # Consolidated styles
│   │   └── lib/              # API clients, local cart, sessions, checkout helpers
│   ├── next.config.mjs       # Turbopack, Compiler & API Rewrites (Reverse Proxy)
│   ├── .env.example
│   └── package.json
│
├── package.json              # Root project orchestration scripts
└── Readme.md                 # Project documentation
```

### Stack Highlights:
- **Frontend**: Next.js 16 (App Router & Turbopack), React 19, Tailwind CSS, GSAP, Lucide React
- **Backend**: Express 5, Mongoose 9, JWT Authentication, bcryptjs, Helmet, CORS
- **Database**: MongoDB (Local or MongoDB Atlas)
- **Third-Party Services**: Razorpay (Payment gateway), Cloudinary (Image storage)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `>= 20.x`
- **npm** or **pnpm**
- **MongoDB** (Local instance at `mongodb://127.0.0.1:27017` or MongoDB Atlas cloud URI)

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sellbar3/SELLBAR_ECOMMERCE.git
   cd SELLBAR_ECOMMERCE
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd sellbar-frontend
   npm install
   cd ..
   ```

---

### Environment Setup

#### 1. Backend (`backend/.env`)
Create `backend/.env` (or copy from `backend/.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/sellbar
JWT_ACCESS_SECRET=your_jwt_secret_key_minimum_32_characters_long_12345
JWT_ACCESS_EXPIRES=1d
BCRYPT_ROUNDS=10
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Initial Admin Bootstrap Credentials
ADMIN_EMAIL=admin@sellbar.com
ADMIN_PASSWORD=admin1234
ADMIN_NAME=SELLBAR Admin

# Cloudinary (Optional for uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Razorpay (Optional for payments)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

#### 2. Frontend (`sellbar-frontend/.env.local`)
Create `sellbar-frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 💻 Running the Application

You can start both services from the project root:

### Start Backend (Port 5000):
```bash
npm run dev:backend
```

### Start Frontend (Port 3000):
```bash
npm run dev:frontend
```

Once running:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Vendor Portal**: [http://localhost:3000/vendor/login](http://localhost:3000/vendor/login)
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Backend API Health**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 API Endpoints Overview

| Scope | Method | Route | Description |
|---|---|---|---|
| **Health** | `GET` | `/api/health` | Service health status |
| **Auth** | `POST` | `/api/auth/login` | Login (Role: customer, vendor, admin) |
| **Auth** | `POST` | `/api/auth/register/customer` | Customer account registration |
| **Auth** | `POST` | `/api/auth/register/vendor` | Vendor partner registration |
| **Auth** | `GET` | `/api/auth/me` | Current session verification |
| **Auth** | `POST` | `/api/auth/logout` | Session invalidation |
| **Public** | `GET` | `/api/public/products` | Browse refurbished catalog |
| **Public** | `GET` | `/api/public/categories` | Browse device categories |
| **Cart** | `GET/POST` | `/api/cart`, `/api/cart/items` | Customer cart management |
| **Orders** | `POST/GET`| `/api/orders` | Place & view customer orders |
| **Vendor** | `GET` | `/api/vendor/dashboard` | Vendor sales & order stats |
| **Admin** | `GET/PATCH`| `/api/admin/vendors/:id/approval`| Vendor approval management |

---

## 📦 Production Build

To test and compile production build for Next.js:
```bash
npm run build:frontend
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

© 2026 **Sellbar**. Created by [Maajanki Web Tech](https://maajankiwebtech.com). All rights reserved.
