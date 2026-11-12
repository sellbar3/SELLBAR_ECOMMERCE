# SELLBAR — Backend REST API Gateway

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%7C%20Mongoose%209-green?logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN%20Integrated-blue?logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SELLBAR Backend** is an enterprise-grade, high-concurrency RESTful API service engineered specifically for the **SELLBAR** multi-vendor certified refurbished electronics and recommerce platform.

- **Production API Gateway**: [https://app.sellbar.in/api](https://app.sellbar.in/api)
- **Health Check Endpoint**: [https://app.sellbar.in/api/health](https://app.sellbar.in/api/health)
- **Frontend Storefront**: [https://sellbar.in](https://sellbar.in)

---

## 📑 Table of Contents
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Folder Structure](#-folder-structure)
- [Database Schemas & Models](#-database-schemas--models)
- [REST API Endpoints Reference](#-rest-api-endpoints-reference)
  - [Public Storefront APIs](#1-public-storefront-apis-apipublic)
  - [Authentication & Sessions](#2-authentication--sessions-apiauth)
  - [Commerce & Orders](#3-customer-commerce-apis)
  - [Vendor Partner APIs](#4-vendor-portal-apis-apivendor)
  - [Master Admin APIs](#5-platform-admin-apis-apiadmin)
- [Database Maintenance Scripts](#-database-maintenance-scripts)
- [Setup & Local Development](#-setup--local-development)
- [Environment Variables Configuration](#-environment-variables-configuration)
- [Deployment (Hostinger Node.js Web Hosting)](#-deployment)
- [Maintained & License](#-maintained--license)

---

## 🏛 Architecture & Tech Stack

- **Runtime**: Node.js 22 LTS
- **Framework**: Express 5.x
- **Database**: MongoDB Atlas Cluster via Mongoose 9.x (with resilient automatic reconnection loop and Google DNS fallback)
- **Authentication**: Stateless JSON Web Tokens (JWT) with HTTP-only cookies and Bearer header support
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for `customer`, `vendor`, and `admin`
- **Security & Headers**: Helmet, CORS whitelist (`https://sellbar.in`, `https://www.sellbar.in`), and Express Rate Limit (sliding window)
- **Asset Pipeline**: Cloudinary CDN integration for multi-angle product galleries, vendor KYC documents, and category icons
- **Payment Gateway**: Razorpay webhook and payment signature verification

```
┌────────────────────────────────────────────────────────┐
│                   Sellbar Ecosystem                    │
└────────────────────────────────────────────────────────┘
          │                                  │
          ▼                                  ▼
┌───────────────────────────┐    ┌───────────────────────┐
│ Next.js Frontend App      │    │ Express 5 Backend API │
│ (https://sellbar.in)      │    │ (https://app.sellbar) │
│                           │    │                       │
│ • Client App Router       │    │ • Mongoose 9 Schemas  │
│ • Cart & Session State    │◄───┤ • JWT & RBAC Guards   │
│ • Responsive Storefront   │    │ • Cloudinary SDK      │
│ • Trade-In Calculators    │    │ • Central Error Mgmt  │
└───────────────────────────┘    └───────────────────────┘
                                             │
                                             ▼
                                 ┌───────────────────────┐
                                 │ MongoDB Atlas Cluster │
                                 │ & Cloudinary Storage  │
                                 └───────────────────────┘
```

---

## 🗂 Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                     # Resilient MongoDB Atlas connector with DNS fallback
│   │   ├── cors.js                   # Cross-Origin Resource Sharing whitelist (sellbar.in)
│   │   ├── cloudinary.js             # Cloudinary SDK credentials setup
│   │   └── cloudinary-mapping.json   # 74/74 public asset to Cloudinary URL mapping
│   │
│   ├── controllers/
│   │   ├── admin/                    # Admin portal analytics, vendor approvals, user control
│   │   ├── customer/
│   │   │   └── publicProduct.controller.js # Public catalog, slug lookup, featured deals
│   │   ├── auth.controller.js        # Login, registration, token verification, logout
│   │   ├── cart.controller.js        # Database-backed shopping cart synchronization
│   │   ├── category.controller.js    # Category CRUD operations
│   │   ├── order.controller.js       # Customer order creation, tracking, cancellation
│   │   ├── payment.controller.js     # Payment webhook and verification handlers
│   │   ├── product.controller.js     # Vendor product management (Add, Edit, Delete)
│   │   ├── review.controller.js      # Customer reviews and ratings
│   │   ├── vendor.controller.js      # Vendor profile, store setup, metrics
│   │   └── vendorOrder.controller.js # Vendor order processing and dispatch
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js        # JWT verification and user extraction
│   │   ├── role.middleware.js        # RBAC role guards (`customer`, `vendor`, `admin`)
│   │   ├── error.middleware.js       # Central error responder with safe production output
│   │   └── rateLimit.middleware.js   # IP-based rate limiting (15 min window)
│   │
│   ├── models/                       # Mongoose schemas
│   │   ├── Product.js                # Full certified electronics specifications schema
│   │   ├── Category.js               # Product category taxonomy
│   │   ├── User.js                   # Customer, vendor, and admin user profiles
│   │   ├── Vendor.js                 # Merchant store details, KYC & bank account
│   │   ├── Order.js                  # Orders, lifecycle statuses & tracking items
│   │   ├── Cart.js                   # Persistent shopping cart
│   │   └── Review.js                 # Customer product ratings & unboxing photos
│   │
│   ├── routes/                       # Express router declarations
│   │   ├── public.routes.js          # Unauthenticated public storefront APIs
│   │   ├── auth.routes.js            # Login, signup, me, logout
│   │   ├── product.routes.js         # Products management
│   │   ├── category.routes.js        # Categories management
│   │   ├── order.routes.js           # Order operations
│   │   ├── cart.routes.js            # Cart persistence
│   │   ├── admin.routes.js           # Admin routes
│   │   ├── vendor.routes.js          # Vendor routes
│   │   └── index.js                  # Master route aggregator
│   │
│   ├── scripts/                      # Database migrations, seeding, and tests
│   │   ├── seed-dynamic-products.js  # Seeds certified refurbished electronics
│   │   ├── enrich-electronics-products.js # Adds multi-angle galleries, specs, FAQs
│   │   ├── migrate-public-images.js  # Migrates local images to Cloudinary CDN
│   │   └── test-api.js               # Automated suite testing all public endpoints
│   │
│   ├── app.js                        # Express application initialization & middleware stack
│   └── server.js                     # HTTP bootstrap with auto-reconnect & admin bootstrap
│
├── .env.example                      # Production & development environment template
├── package.json                      # Dependencies and scripts
└── README.md                         # Comprehensive backend documentation
```

---

## 🗄 Database Schemas & Models

### 1. Electronics Product Model (`src/models/Product.js`)
Specifically tailored for certified refurbished electronics:
| Field | Type | Description |
|---|---|---|
| `name` | `String` | Official product title (e.g. `Apple iPhone 14 (128GB) - Refurbished`) |
| `slug` | `String` | URL-friendly unique identifier (indexed, lowercase) |
| `category` | `ObjectId` | Reference to `Category` model |
| `brand` | `String` | Brand name (Apple, Samsung, Dell, Lenovo, OnePlus, HP) |
| `sku` | `String` | Unique Stock Keeping Unit (e.g. `SB-IP14-128-MID`) |
| `modelNumber`| `String` | Official hardware model code (e.g. `A2882`, `SM-S928B`) |
| `price` | `Number` | Current selling price in INR (₹) |
| `compareAtPrice`| `Number` | Original manufacturer MRP (₹) |
| `stock` | `Number` | Real-time available units in inventory |
| `condition` | `String` | Cosmetic grade: `Flawless`, `Superb`, or `Good` |
| `badge` | `String` | Marketing badge (e.g. `Lowest Price`, `Sellbar Choice`, `Best Seller`) |
| `warranty` | `String` | Warranty term (e.g. `12 Months Doorstep Replacement Warranty`) |
| `whatInTheBox`| `[String]` | Included accessories (Device, Cable, SIM tool, QC Certificate) |
| `images` | `[ImageSchema]`| Cloudinary HTTPS URLs, public IDs, and alt descriptions |
| `variants` | `[VariantSchema]`| Dynamic hardware options (Storage, RAM, Color, Processor) |
| `specs` | `[{ label, value }]`| Flat technical specifications list |
| `specifications`| `Mixed` | Grouped technical specifications (Display, Performance, Battery, Ports) |
| `customerReviews`| `[ReviewSchema]`| Verified buyer reviews with ratings, dates, and photos |
| `faqs` | `[FaqSchema]` | Electronics-specific frequently asked questions and answers |

### 2. Category Model (`src/models/Category.js`)
- `name`: Category name (`Mobile Phones`, `Laptops`, `Tablets`, `Smart Watches`, `Cameras`, `Gaming Consoles`).
- `slug`: URL slug matching frontend routes.
- `image`: Cloudinary HTTPS image object (`url`, `publicId`).
- `isActive`: Boolean visibility status.
- `sortOrder`: Display ordering on storefront.

---

## 📡 REST API Endpoints Reference

### 1. Public Storefront APIs (`/api/public/*`)
| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Service heartbeat & uptime status |
| `GET` | `/api/public/products` | `category`, `brand`, `search`, `minPrice`, `maxPrice`, `sort`, `page`, `limit` | Paginated product catalog |
| `GET` | `/api/public/products/:id` | `:id` (accepts MongoDB `_id`, `slug`, or `sku`) | Product detail with variants, specs & 4 related items |
| `GET` | `/api/public/products/featured` | `type` (`hot-deal`, `trending`, `featured`, `best-seller`) | Curated featured gadget deals |
| `GET` | `/api/public/categories` | None | Active categories with attached product count |

### 2. Authentication & Sessions (`/api/auth/*`)
| Method | Endpoint | Payload | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | `{ email/phone, password }` | Authenticates customer, vendor, or admin |
| `POST` | `/api/auth/register/customer` | `{ name, email, phone, password }` | Creates customer account |
| `POST` | `/api/auth/register/vendor` | `{ storeName, name, email, phone, password }` | Submits vendor application |
| `GET` | `/api/auth/me` | Bearer Token / Cookie | Returns current authenticated session |
| `POST` | `/api/auth/logout` | None | Clears authentication session |

### 3. Customer Commerce APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET / POST` | `/api/cart` | Get or update database-synced shopping cart |
| `POST` | `/api/orders` | Place verified order with address & payment method |
| `GET` | `/api/orders/:id` | View order lifecycle & real-time tracking updates |

### 4. Vendor Portal APIs (`/api/vendor/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vendor/products` | List all inventory products belonging to vendor |
| `POST` | `/api/vendor/products` | Create new gadget listing with image uploads |
| `PUT / DELETE` | `/api/vendor/products/:id` | Update or remove product listing |
| `GET` | `/api/vendor/orders` | View incoming customer orders assigned to vendor |
| `PUT` | `/api/vendor/orders/:id/status` | Update dispatch & courier tracking number |

### 5. Platform Admin APIs (`/api/admin/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/metrics` | Platform overview (Gross sales, active users, orders) |
| `GET / PUT` | `/api/admin/vendors` | Review and approve/reject merchant KYC applications |
| `GET / PUT` | `/api/admin/categories` | Global taxonomy management |
| `GET / PUT` | `/api/admin/users` | Customer moderation and account status controls |

---

## 🛠 Database Maintenance Scripts

Run these scripts from the backend root:

```bash
# 1. Seed 24 certified refurbished electronic devices:
node src/scripts/seed-dynamic-products.js

# 2. Enrich devices with multi-angle galleries, variants, specs, FAQs:
node src/scripts/enrich-electronics-products.js

# 3. Migrate all local public folder images to Cloudinary CDN:
node src/scripts/migrate-public-images.js

# 4. Run automated test suite verifying all 6 public API endpoints:
node src/scripts/test-api.js
```

---

## 🚀 Setup & Local Development

### Prerequisites
- **Node.js**: `v20.x` or higher (recommended: `v22.x`)
- **npm**: `v10.x` or higher
- **MongoDB**: MongoDB Atlas Cluster connection string

### Installation

```bash
# 1. Clone the backend repository
git clone https://github.com/sellbar3/sellbar-backend.git
cd sellbar-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
```

### Running Locally

```bash
# Start development server with auto-restart:
npm run dev

# Or start standard production server:
npm start
```

Health check will be live at: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the root of the project:

```env
NODE_ENV=production
PORT=5000

# MongoDB Atlas Cluster URI
MONGODB_URI=mongodb+srv://sellbar3_db_user:SwkiSitTUWtSeMBR@cluster0.foqbgdq.mongodb.net/sellbar?retryWrites=true&w=majority

# Frontend URLs allowed for CORS
CLIENT_URL=https://sellbar.in,https://www.sellbar.in,http://localhost:3000
CORS_ORIGINS=https://sellbar.in,https://www.sellbar.in,http://localhost:3000

# Backend API Gateway Domain
API_URL=https://app.sellbar.in/api

# JWT Authentication Security
JWT_ACCESS_SECRET=78f877d5dc4d1d58e7b999d414e4082141d0a7c8221ef81351f1aa0e5caf82fd60451ae4288815b7cef5e71943a97bf2
JWT_ACCESS_EXPIRES=115m
BCRYPT_ROUNDS=12

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME=dbd4anwt
CLOUDINARY_API_KEY=351662479493338
CLOUDINARY_API_SECRET=Cja3mJvAEbvFq8v5naFWqEDuK6U

# Default Admin Bootstrap Credentials
ADMIN_NAME=Sellbar Admin
ADMIN_EMAIL=admin@sellbar.com
ADMIN_PASSWORD=Admin@123456

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_Tr3yHd4f7QNPeV
RAZORPAY_KEY_SECRET=xGO55fhSHorH14lbaT0shAMo
```

---

## 🚢 Deployment (Hostinger Node.js Web Hosting)

Current live deployment configuration for `app.sellbar.in`:
- **Domain / Subdomain**: `app.sellbar.in`
- **Application Type**: `Express` (or `Node.js`)
- **Node.js Version**: 22
- **Document Root**: `/home/u199104819/domains/sellbar.in/public_html/app`
- **Entry File**: `src/server.js`
- **Build Command**: `echo 'Backend ready'`
- **Output Directory**: none / default

---

## 👥 Maintained & License

- **Maintained by**: [Maajanki Web Tech](https://maajankiwebtech.com)
- **License**: MIT
