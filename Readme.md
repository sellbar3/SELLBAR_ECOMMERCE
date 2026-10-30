# SELLBAR — Multi-Vendor Refurbished Electronics & Recommerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4%20(Turbopack)-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%7C%20Mongoose%209-green?logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN%20Integrated-blue?logo=cloudinary)](https://cloudinary.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Contributors](https://img.shields.io/badge/Contributors-Welcome-orange?logo=github)](https://github.com/sellbar3/SELLBAR_ECOMMERCE/graphs/contributors)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SELLBAR** is a modern, high-performance, enterprise-grade multi-vendor e-commerce and recommerce platform specifically engineered for **certified refurbished electronic gadgets** (Smartphones, Laptops, Tablets, Smartwatches, Cameras, Gaming Consoles).

This repository contains the complete full-stack codebase:
1. **`backend/`**: Node.js, Express 5, and Mongoose REST API layer running on port `5000`.
2. **`sellbar-frontend/`**: Next.js 16 (App Router + Turbopack) high-conversion web application running on port `3000`.

---

## 📑 Table of Contents
- [Architecture & Overview](#-architecture--overview)
- [Monorepo Project Structure](#-monorepo-project-structure)
- [Backend Deep Dive (`backend/`)](#-backend-deep-dive-backend)
  - [Folder Structure](#backend-folder-structure)
  - [Database Schemas & Models](#database-schemas--models)
  - [REST API Endpoints Reference](#rest-api-endpoints-reference)
  - [Database Maintenance Scripts](#database-maintenance-scripts)
- [Frontend Deep Dive (`sellbar-frontend/`)](#-frontend-deep-dive-sellbar-frontend)
  - [Folder Structure](#frontend-folder-structure)
  - [App Router Sitemap (72+ Routes)](#app-router-sitemap-72-routes)
  - [Electronics Single Product Detail Page](#electronics-single-product-detail-page)
  - [Resilient API Layer & Offline Fallback](#resilient-api-layer--offline-fallback)
  - [Cloudinary CDN Asset Pipeline](#cloudinary-cdn-asset-pipeline)
  - [Cart, Session & Checkout Architecture](#cart-session--checkout-architecture)
- [Setup & Installation Guide for Contributors](#-setup--installation-guide-for-contributors)
  - [Prerequisites](#prerequisites)
  - [Environment Variables Configuration](#environment-variables-configuration)
  - [Running the Application](#running-the-application)
- [Contributor Workflow & How-To Guides](#-contributor-workflow--how-to-guides)
  - [How to Add a New Storefront Page](#1-how-to-add-a-new-storefront-page)
  - [How to Add a New Backend API & Schema](#2-how-to-add-a-new-backend-api--schema)
  - [How to Seed or Refresh Certified Products](#3-how-to-seed-or-refresh-certified-products)
  - [Troubleshooting & FAQs](#4-troubleshooting--faqs)
- [Contributors & License](#-contributors--license)

---

## 🏛 Architecture & Overview

Sellbar connects three major user ecosystems:
1. **Customers**: Can purchase certified refurbished electronics with 32-point hardware inspection, 12-month doorstep warranty, and 7-day replacement, or sell old gadgets for instant valuation and doorstep payout.
2. **Vendors (`/vendor`)**: Verified merchant partners manage store inventory, product listings, variants, pricing, order fulfillment, and logistics.
3. **Administrators (`/admin`)**: Master control center overseeing vendor KYC approvals, global catalog categories, customer user management, and platform analytics.

```
┌────────────────────────────────────────────────────────┐
│                   Sellbar Ecosystem                    │
└────────────────────────────────────────────────────────┘
          │                                  │
          ▼                                  ▼
┌───────────────────────────┐    ┌───────────────────────┐
│ Next.js 16 Frontend App   │    │ Express 5 Backend API │
│ (Port 3000)               │    │ (Port 5000)           │
│                           │    │                       │
│ • App Router (72+ Routes) │    │ • Mongoose 9 Schemas  │
│ • Turbopack Build Engine  │◄───┤ • JWT & RBAC Auth     │
│ • Cloudinary CDN Client   │    │ • Cloudinary SDK      │
│ • Resilient Offline Cache │    │ • Central Error Mgmt  │
└───────────────────────────┘    └───────────────────────┘
                                             │
                                             ▼
                                 ┌───────────────────────┐
                                 │ MongoDB Atlas Cluster │
                                 │ & Cloudinary Storage  │
                                 └───────────────────────┘
```

---

## 🗂 Monorepo Project Structure

```
SELLBAR_ECOMMERCE/
├── backend/                       # REST API Server (Express + MongoDB)
│   ├── src/
│   │   ├── config/                # Database connection, CORS, Cloudinary mapping
│   │   ├── controllers/           # Business logic grouped by user role
│   │   ├── middlewares/           # Authentication, role access, error handling, rate limiting
│   │   ├── models/                # Mongoose database models and schema definitions
│   │   ├── routes/                # Express router declarations
│   │   ├── scripts/               # Migration, seeding, testing, and cache scripts
│   │   ├── services/              # External services (Cloudinary, SMS, Payments)
│   │   ├── app.js                 # Express application initialization & middleware stack
│   │   └── server.js              # HTTP server bootstrap with resilient DB reconnect
│   ├── .env.example               # Backend environment template
│   └── package.json               # Backend dependencies and scripts
│
├── sellbar-frontend/              # Storefront Web App (Next.js 16 + React 19)
│   ├── public/                    # Static assets (3D GLB models, SVGs, favicon)
│   ├── src/
│   │   ├── app/                   # Next.js App Router (72+ pages & API routes)
│   │   ├── components/            # Reusable UI components, sections & shadcn blocks
│   │   ├── config/                # Cloudinary image mapping and fallback products cache
│   │   ├── css/                   # Stylesheets and custom utilities
│   │   └── lib/                   # API clients, auth helpers, local cart, utilities
│   ├── next.config.mjs            # Turbopack rules, proxy rewrites, and redirects
│   ├── .env.example               # Frontend environment template
│   └── package.json               # Frontend dependencies and scripts
│
├── package.json                   # Root workspace orchestration scripts
└── Readme.md                      # Comprehensive developer and contributor guide
```

---

## ⚙️ Backend Deep Dive (`backend/`)

The backend is built with **Express 5** and **Mongoose 9**, implementing clean architectural separation between routing, middleware, controllers, and models.

### Backend Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                     # MongoDB connection with retry loop
│   │   ├── cors.js                   # Cross-Origin Resource Sharing whitelist
│   │   ├── cloudinary.js             # Cloudinary SDK credentials setup
│   │   └── cloudinary-mapping.json   # 74/74 public asset to Cloudinary URL mapping
│   │
│   ├── controllers/
│   │   ├── admin/                    # Admin portal analytics, approvals, and user control
│   │   ├── customer/
│   │   │   └── publicProduct.controller.js # Public catalog, slug lookup, featured, categories
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
│   │   ├── rateLimit.middleware.js   # IP-based rate limiting (15 min window)
│   │   └── upload.middleware.js      # Multer file upload handling for Cloudinary
│   │
│   ├── models/
│   │   ├── Product.js                # Core electronics product schema with variants & specs
│   │   ├── Category.js               # Category schema with hierarchy & image
│   │   ├── User.js                   # Customer and admin account schema with bcrypt
│   │   ├── Vendor.js                 # Merchant partner details, approval status, store info
│   │   ├── Order.js                  # Order lifecycle, addresses, status, items
│   │   ├── Cart.js                   # Server cart items schema
│   │   ├── Review.js                 # Product review schema
│   │   ├── Coupon.js                 # Promo discount code rules
│   │   ├── Notification.js           # Real-time event notifications
│   │   └── Shipping.js               # Shipping address and courier tracking
│   │
│   ├── routes/
│   │   ├── admin.routes.js           # `/api/admin/*`
│   │   ├── auth.routes.js            # `/api/auth/*`
│   │   ├── cart.routes.js            # `/api/cart/*`
│   │   ├── category.routes.js        # `/api/categories/*`
│   │   ├── customer.routes.js        # `/api/customer/*`
│   │   ├── order.routes.js           # `/api/orders/*`
│   │   ├── payment.routes.js         # `/api/payments/*`
│   │   ├── product.routes.js         # `/api/products/*`
│   │   ├── publicProduct.routes.js   # `/api/public/*`
│   │   ├── review.routes.js          # `/api/reviews/*`
│   │   ├── vendor.routes.js          # `/api/vendor/*`
│   │   ├── vendorOrder.routes.js     # `/api/vendor/orders/*`
│   │   └── index.js                  # Master route aggregator mounted at `/api`
│   │
│   ├── scripts/
│   │   ├── migrate-public-images.js  # Uploads all 74 local public images to Cloudinary
│   │   ├── seed-dynamic-products.js  # Seeds 24 certified products across 6 categories
│   │   ├── enrich-electronics-products.js # Adds electronics variants, specs, reviews, FAQs
│   │   ├── export-cache.js           # Exports MongoDB products to frontend cache file
│   │   ├── check-db.js               # Diagnoses MongoDB Atlas collections & indexes
│   │   └── test-api.js               # Standalone test suite verifying all 6 API endpoints
│   │
│   ├── app.js                        # Express configuration, security headers, compression
│   └── server.js                     # HTTP server startup with MongoDB connection
```

---

### Database Schemas & Models

#### 1. Product Model (`backend/src/models/Product.js`)
Specifically tailored for certified refurbished consumer electronics:

| Field | Type | Description |
|---|---|---|
| `name` | `String` | Official product title (e.g. `Apple iPhone 14 (128GB) - Refurbished`) |
| `slug` | `String` | URL-friendly unique identifier (indexed, lowercase) |
| `category` | `ObjectId` | Reference to `Category` model |
| `brand` | `String` | Brand name (Apple, Samsung, Dell, Lenovo, OnePlus, etc.) |
| `sku` | `String` | Unique Stock Keeping Unit code (e.g. `SB-IP14-128-MID`) |
| `modelNumber`| `String` | Official hardware model code (e.g. `A2882`, `SM-S928B`) |
| `price` | `Number` | Current selling price in INR (₹) |
| `compareAtPrice`| `Number` | Original manufacturer MRP (₹) |
| `stock` | `Number` | Real-time available units in inventory |
| `condition` | `String` | Cosmetic grade: `Flawless`, `Superb`, or `Good` |
| `badge` | `String` | Marketing badge (e.g. `Lowest Price`, `Sellbar Choice`, `Best Seller`) |
| `warranty` | `String` | Official warranty term (e.g. `12 Months Doorstep Replacement Warranty`) |
| `whatInTheBox`| `[String]` | Included accessories (Device, Cable, SIM tool, QC Certificate) |
| `images` | `[ImageSchema]`| Cloudinary HTTPS URLs, public IDs, and alt descriptions |
| `variants` | `[VariantSchema]`| Dynamic hardware options (Storage, RAM, Color, Processor, Network) |
| `specs` | `[{ label, value }]`| Flat technical specifications list |
| `specifications`| `Mixed` | Grouped technical specifications (Display, Performance, Battery, Ports) |
| `customerReviews`| `[ReviewSchema]`| Verified buyer reviews with ratings, dates, comments, and customer photos |
| `faqs` | `[FaqSchema]` | Electronics-specific frequently asked questions and answers |
| `isFeatured` | `Boolean` | Homepage featured flag |
| `featuredType` | `String` | `hot-deal`, `featured`, `trending`, `best-seller`, `new-arrival` |

#### 2. Category Model (`backend/src/models/Category.js`)
- `name`: Category name (`Mobile Phones`, `Laptops`, `Tablets`, `Smart Watches`, `Cameras`, `Gaming Consoles`).
- `slug`: URL slug matching frontend routes.
- `image`: Cloudinary HTTPS image object (`url`, `publicId`).
- `isActive`: Boolean visibility status.
- `sortOrder`: Display ordering on storefront.

#### 3. User & Vendor Models
- **`User.js`**: Supports roles `customer`, `vendor`, and `admin`. Passwords hashed with `bcryptjs` (10 rounds).
- **`Vendor.js`**: Store name, GSTIN, business address, bank verification, and `approvalStatus` (`pending`, `approved`, `rejected`).

---

### REST API Endpoints Reference

#### Public Storefront APIs (`/api/public/*`)
| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/public/products` | `category`, `brand`, `search`, `minPrice`, `maxPrice`, `sort`, `page`, `limit` | Paginated product catalog |
| `GET` | `/api/public/products/:id` | `:id` (accepts MongoDB `_id`, `slug`, or `sku`) | Product detail with variants, specs & 4 related items |
| `GET` | `/api/public/products/featured` | `type` (`hot-deal`, `trending`, `featured`, `best-seller`) | Curated featured gadget deals |
| `GET` | `/api/public/categories` | None | Active categories with attached product count |

#### Authentication APIs (`/api/auth/*`)
| Method | Endpoint | Payload | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | `{ email/phone, password }` | Authenticates customer, vendor, or admin |
| `POST` | `/api/auth/register/customer` | `{ name, email, phone, password }` | Creates customer account |
| `POST` | `/api/auth/register/vendor` | `{ storeName, name, email, phone, password }` | Submits vendor application |
| `GET` | `/api/auth/me` | Bearer Token / Cookie | Returns current authenticated session |
| `POST` | `/api/auth/logout` | None | Clears authentication session |

#### Customer Commerce APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET / POST` | `/api/cart` | Get or update database-synced shopping cart |
| `POST` | `/api/orders` | Place verified order with address & payment method |
| `GET` | `/api/orders/:id` | View order lifecycle & tracking updates |

---

### Database Maintenance Scripts

Run these scripts from the repository root:

```bash
# 1. Migrate all 74 local public folder images to Cloudinary:
node backend/src/scripts/migrate-public-images.js

# 2. Seed 24 certified refurbished electronic devices:
node backend/src/scripts/seed-dynamic-products.js

# 3. Enrich devices with multi-angle galleries, variants, specs, FAQs:
node backend/src/scripts/enrich-electronics-products.js

# 4. Export MongoDB products to frontend offline cache:
node backend/src/scripts/export-cache.js

# 5. Run automated test suite verifying all 6 public API endpoints:
node backend/src/scripts/test-api.js
```

---

## 💻 Frontend Deep Dive (`sellbar-frontend/`)

Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Uses the **App Router** architecture with Turbopack for sub-second compile times.

### Frontend Folder Structure

```
sellbar-frontend/
├── public/                           # Static assets
│   ├── assets/3d/                    # 3D models (smartphone.glb, sneaker.glb)
│   ├── banners/                      # Local fallbacks (all 74 backed by Cloudinary)
│   ├── cashify/                      # Guides & article thumbnails
│   ├── products/                     # Product images
│   ├── sell-icons/                   # Trade-in device category icons
│   └── services/                     # Storefront services icons
│
├── src/
│   ├── app/                          # Next.js 16 App Router (72+ Routes)
│   │   ├── (Storefront)/             # Home `/`, `/buy-refurbished`, `/supersale`
│   │   ├── buy-refurbished-gadgets/  # Multi-category certified gadget deals
│   │   ├── buy-refurbished-laptops/  # Refurbished laptops with brand filters
│   │   ├── buy-refurbished-mobile-phones/ # Refurbished smartphones catalog
│   │   ├── product/[slug]/           # Premium Electronics Single Product Detail Page
│   │   ├── sell/                     # Device trade-in category hub
│   │   ├── sell-old-*/               # Dedicated trade-in calculators (10 device types)
│   │   ├── cart/                     # Shopping cart page with quantity controls
│   │   ├── checkout/                 # Secure multi-step shadcn/ui checkout
│   │   ├── account/                  # Customer profile, orders, addresses
│   │   ├── vendor/                   # Merchant partner portal (login, signup, catalog)
│   │   ├── admin/                    # Platform control center (users, vendors, catalog)
│   │   ├── api/                      # Next.js API route handlers:
│   │   │   ├── auth/                 # Proxy auth routes (`login`, `me`, `otp`, `register`)
│   │   │   └── public/[...slug]/     # Resilient route handler with live proxy & offline fallback
│   │   └── layout.js                 # Global HTML root, JSON-LD Schema & metadata
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui primitives (`button`, `card`, `checkout-block`, etc.)
│   │   ├── HeroCarousel.jsx          # Homepage hero banner carousel (Cloudinary CDN)
│   │   ├── RefurbishedPhonesSection.jsx # Dynamic mobile phones slider
│   │   ├── RefurbishedLaptopsSection.jsx # Dynamic laptops slider
│   │   ├── HotDealsSection.jsx       # Dynamic hot deals slider
│   │   ├── OurServicesSection.jsx    # Sellbar core services grid
│   │   ├── SellYourOldDeviceSection.jsx # Instant cash device sale icons
│   │   ├── CashifyGuidesSection.jsx  # Device buying guides
│   │   ├── TrendingArticlesSection.jsx # Tech news & updates
│   │   ├── Navbar.jsx                # Responsive header with live search & cart counter
│   │   ├── Footer.jsx                # Complete site footer with legal links
│   │   └── LoginModal.jsx            # OTP & mobile auth popup dialog
│   │
│   ├── config/
│   │   ├── cloudinary-mapping.json   # 74-key JSON mapping local paths -> Cloudinary CDN URLs
│   │   └── products-cache.json       # 24-product snapshot for instant offline dev fallback
│   │
│   └── lib/
│       ├── productApi.js             # Resilient client layer for fetching products
│       ├── cloudinary.js             # URL helper for Cloudinary transformations
│       ├── cart.js                   # LocalStorage cart management with custom events
│       ├── auth.js                   # JWT session helper (`getSession`, `clearSession`)
│       └── utils.js                  # Tailwind class merge helper (`cn()`)
```

---

### App Router Sitemap (72+ Routes)

Contributors can reference the table below when adding or modifying pages:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Storefront Routes                                                        │
├──────────────────────────────┬───────────────────────────────────────────┤
│ Route Path                   │ Purpose                                   │
├──────────────────────────────┼───────────────────────────────────────────┤
│ /                            │ Homepage (Hero banners, live deals, tech) │
│ /buy-refurbished             │ Master certified refurbished catalog      │
│ /buy-refurbished-mobile-phones | Smartphones with brand & price filters │
│ /buy-refurbished-laptops     │ Laptops with processor & RAM filters      │
│ /buy-refurbished-gadgets     │ Multi-gadget deals (Smartwatches, tablets)│
│ /product/[slug]              │ Premium Electronics Single Product Detail │
│ /find-new-phone              │ Smartphone finder & recommendation engine │
│ /supersale                   │ Seasonal discount showcase                │
│ /cart                        │ Shopping cart review                      │
│ /checkout                    │ Multi-step address, shipping, and payment │
│ /account                     │ User orders, profile, saved addresses     │
│ /orders                      │ Order tracking & invoice downloads        │
│ /track-order                 │ Real-time courier dispatch status         │
└──────────────────────────────┴───────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ Recommerce / Trade-In Routes                                             │
├──────────────────────────────┬───────────────────────────────────────────┤
│ /sell                        │ Trade-in hub for selling used devices     │
│ /sell-old-mobile-phone       │ Smartphone valuation wizard (15 brands)   │
│ /sell-old-laptop             │ Laptop valuation calculator               │
│ /sell-old-tablet             │ iPad & Android tablet trade-in            │
│ /sell-old-smart-watch        │ Smartwatch trade-in                       │
│ /sell-old-television         │ Smart TV trade-in                         │
│ /sell-old-dslr-camera        │ DSLR & mirrorless camera trade-in         │
│ /sell-old-gaming-consoles    │ PS5, Xbox, Nintendo trade-in              │
│ /sell-old-earbuds            │ Wireless earbuds trade-in                 │
│ /sell-old-smart-speaker      │ Smart speakers (Echo, HomePod, Bose)      │
│ /sell-old-imac               │ Apple iMac & Mac Studio trade-in          │
│ /recycle-old-mobile-phone    │ Eco-friendly electronics recycling        │
│ /repair                      │ Doorstep screen & battery repair service  │
└──────────────────────────────┴───────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ Partner & Control Portals                                                │
├──────────────────────────────┬───────────────────────────────────────────┤
│ /vendor                      │ Vendor portal landing page                │
│ /vendor/login                │ Vendor partner authentication             │
│ /vendor/signup               │ Merchant registration & KYC onboarding    │
│ /vendor/products             │ Inventory & catalog management            │
│ /vendor/products/new         │ Add new product with Cloudinary uploads   │
│ /vendor/orders               │ Order dispatch & shipping management      │
│ /vendor/profile              │ Store profile & bank settlement settings  │
│ /panel-login                 │ Unified entry point for vendors & admins  │
│ /admin                       │ Admin master control center               │
│ /admin/login                 │ Secure administrator login                │
│ /admin/products              │ Platform-wide catalog oversight           │
│ /admin/categories            │ Global category taxonomy management       │
│ /admin/users                 │ Customer & vendor user account moderation │
└──────────────────────────────┴───────────────────────────────────────────┘
```

---

### Electronics Single Product Detail Page

Located at [`sellbar-frontend/src/app/product/[slug]/page.js`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/app/product/[slug]/page.js). Specifically designed for **high-end electronics e-commerce**:

1. **Two-Column Desktop (~55% / ~45%)**:
   - **Left Column**: 1:1 Aspect ratio viewport, desktop mouse hover-zoom lens, fullscreen lightbox inspection modal, mobile touch swipe gestures (`touchstart`/`touchend`), multi-angle thumbnails (front, back, angle, side/ports).
   - **Right Column (Sticky)**: Brand badge, official **Model Number** & **SKU**, star rating with verified purchase count, prominent price block with **MRP strikethrough**, **Savings % chip**, **No-Cost EMI calculator**, real-time **Stock counter**, and **Pincode Delivery Estimator**.
2. **Electronics-Specific Dynamic Variants**:
   - **Smartphones**: Storage (`128GB`, `256GB`, `512GB`), RAM (`6GB`, `8GB`), Color swatches with chips (`Midnight`, `Starlight`, `Deep Blue`), and Network (`5G`).
   - **Laptops**: Processor (`Intel Core i5/i7`, `Apple M`), RAM (`8GB`, `16GB`), and SSD Storage (`256GB`, `512GB`).
   - Selecting a variant immediately recalculates **price**, **compare price**, **SKU**, **stock**, and dynamically updates the **active gallery photo**.
3. **Structured Technical Tabs (Below the Fold)**:
   - **Technical Specifications**: Structured categorized table (*Display & Build*, *Performance & Storage*, *Battery & Charging*, *Connectivity & Ports*, *Quality Assurance*).
   - **Product Overview & Grade Breakdown**: Transparent criteria for *Flawless (Grade A++)*, *Superb (Grade A+)*, and *Good (Grade A)*.
   - **What's in the Box**: Visual cards displaying device, fast charger, SIM tool, 32-point inspection report, warranty card.
   - **Warranty & Replacement**: Complete coverage terms and step-by-step doorstep claim process.
   - **Customer Reviews & Photos**: Rating breakdown bars (5★–1★), customer-uploaded unboxing photo gallery with lightbox, and verified buyer reviews.
   - **Electronics FAQs**: Interactive accordion covering battery health guarantees, refurbishment testing, and returns.
4. **Mobile Sticky Action Bar**:
   - Automatically floats at the bottom on mobile devices displaying product title, active variant price, **Cart**, and **Buy Now** buttons.

---

### Resilient API Layer & Offline Fallback

To ensure the frontend is **100% resilient** and never crashes when the developer runs only the frontend (or when the backend is restarting), two complementary mechanisms are in place:

1. **Next.js App Router Route Handler** ([`sellbar-frontend/src/app/api/public/[...slug]/route.js`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/app/api/public/[...slug]/route.js)):
   - Handles `/api/public/*` requests natively within Next.js.
   - Attempts to proxy to `http://localhost:5000/api/public/...` with an active abort controller.
   - If the backend is running, returns live MongoDB data.
   - If the backend server is offline (`ECONNREFUSED`), **seamlessly serves the filtered response from `products-cache.json` with HTTP 200**.
   - Completely eliminates `Failed to proxy http://localhost:5000 AggregateError: ECONNREFUSED` terminal logs.
2. **Client API Service** ([`sellbar-frontend/src/lib/productApi.js`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/lib/productApi.js)):
   - Exports `fetchProducts`, `fetchProductByIdOrSlug`, `fetchFeaturedProducts`, and `fetchCategories`.
   - Never throws fatal exceptions; if network fails, falls back gracefully to `products-cache.json`.

---

### Cloudinary CDN Asset Pipeline

- All **74 images** inside `sellbar-frontend/public` (hero banners, service icons, sell icons, product photos, cashify thumbnails) were migrated to Cloudinary under account `dbd4anwt`.
- **Mapping**: Loaded via [`sellbar-frontend/src/config/cloudinary-mapping.json`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/config/cloudinary-mapping.json).
- **Helper** ([`sellbar-frontend/src/lib/cloudinary.js`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/lib/cloudinary.js)):
  ```javascript
  import { getCloudinaryUrl } from "@/lib/cloudinary";

  // Automatically resolves local path to secure Cloudinary HTTPS URL:
  const imageUrl = getCloudinaryUrl("/products/iphone-14.webp");
  // Returns: https://res.cloudinary.com/dbd4anwt/image/upload/v1793353852/sellbar/products/iphone-14.webp
  ```

---

### Cart, Session & Checkout Architecture

- **Cart Management** ([`sellbar-frontend/src/lib/cart.js`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/lib/cart.js)):
  - Persists items in `localStorage` under key `sellbar_cart`.
  - Dispatches `sellbar-cart-updated` browser events so the header cart counter and badges reactively update across all open tabs.
  - Supports variant options: `id`, `name`, `price`, `quantity`, `image`, `conditionGrade`, `variantName`, `sku`.
- **Session Authentication** ([`sellbar-frontend/src/lib/auth.js`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/lib/auth.js)):
  - Handles JWT token extraction and role management.
- **Checkout Block** ([`sellbar-frontend/src/components/ui/checkout-block.jsx`](file:///d:/Sellbar%20Ecommerce/sellbar-frontend/src/components/ui/checkout-block.jsx)):
  - Built with shadcn/ui patterns (`Card`, `Badge`, `Select`, `Input`).
  - Reads active cart items from `getLocalCart()` and automatically synchronizes pricing, delivery charges, and taxes.

---

## 🚀 Setup & Installation Guide for Contributors

### Prerequisites
- **Node.js**: `v20.x` or higher (recommended: `v22.x` or `v24.x`)
- **npm**: `v10.x` or higher
- **Git**
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/sellbar`) or MongoDB Atlas connection string.

---

### Environment Variables Configuration

#### 1. Backend Configuration (`backend/.env`)
Create `backend/.env` in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.foqbgdq.mongodb.net/sellbar
JWT_ACCESS_SECRET=your_jwt_secret_key_minimum_32_characters_long_12345
JWT_ACCESS_EXPIRES=1d
BCRYPT_ROUNDS=10
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME=dbd4anwt
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Default Admin Bootstrap Credentials
ADMIN_EMAIL=admin@sellbar.com
ADMIN_PASSWORD=admin1234
ADMIN_NAME=SELLBAR Admin
```

#### 2. Frontend Configuration (`sellbar-frontend/.env.local`)
Create `sellbar-frontend/.env.local` in `sellbar-frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Running the Application

From the root project directory:

```bash
# 1. Install Backend Dependencies
npm --prefix backend install

# 2. Install Frontend Dependencies
npm --prefix sellbar-frontend install

# 3. Start the Backend API Server (Port 5000):
npm run dev:backend

# 4. In a separate terminal, start the Next.js Frontend (Port 3000):
npm run dev:frontend
```

Once running:
- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **Product Detail**: [http://localhost:3000/product/apple-iphone-14-128gb-refurbished](http://localhost:3000/product/apple-iphone-14-128gb-refurbished)
- **Vendor Portal**: [http://localhost:3000/vendor/login](http://localhost:3000/vendor/login)
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Backend Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🤝 Contributor Workflow & How-To Guides

### 1. How to Add a New Storefront Page
1. Create a new folder inside `sellbar-frontend/src/app/<your-page-name>/`.
2. Add a `page.js` file:
   ```javascript
   "use client";
   import React from "react";
   import Link from "next/link";

   export default function MyNewPage() {
     return (
       <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-6xl mx-auto">
           <h1 className="text-3xl font-black text-gray-900">New Feature Page</h1>
         </div>
       </div>
     );
   }
   ```
3. Test production build using `npm --prefix sellbar-frontend run build` to ensure 0 Turbopack route errors.

### 2. How to Add a New Backend API & Schema
1. Create the schema in `backend/src/models/<ModelName>.js`.
2. Add controller methods in `backend/src/controllers/<role>/<controllerName>.js`.
3. Create a router in `backend/src/routes/<routeName>.routes.js`.
4. Mount the route inside `backend/src/routes/index.js`:
   ```javascript
   router.use("/my-feature", require("./myFeature.routes"));
   ```

### 3. How to Seed or Refresh Certified Products
If you modify product fields or add new categories:
```bash
# Update the database
node backend/src/scripts/seed-dynamic-products.js
node backend/src/scripts/enrich-electronics-products.js

# Refresh the frontend offline cache
node backend/src/scripts/export-cache.js
```

### 4. Troubleshooting & FAQs

- **Q: Why does the terminal show `ECONNREFUSED` on port 5000?**
  **A**: You are running only the frontend (`npm run dev:frontend`) while the backend API server is stopped. Start the backend with `npm run dev:backend`. The frontend's resilient route handler (`src/app/api/public/[...slug]/route.js`) will continue serving all product data seamlessly even if the backend is stopped.
- **Q: How are images stored and served?**
  **A**: All website graphics, product photos, and icons are stored on Cloudinary and mapped in `sellbar-frontend/src/config/cloudinary-mapping.json`. Use `getCloudinaryUrl("/path/to/img.webp")` from `@/lib/cloudinary` whenever rendering images.
- **Q: What is the primary brand color?**
  **A**: `#2BBDA3` (Sellbar Teal), accented with `#1a907e` (darker teal) and dark slate `#0f172a`.

---

## 👥 Contributors & License

We welcome contributions from developers, designers, and testers! Feel free to open issues or submit pull requests.

- View all contributors: [GitHub Contributors Graph](https://github.com/sellbar3/SELLBAR_ECOMMERCE/graphs/contributors)
- Maintained by: **Sellbar Engineering Team** & [Maajanki Web Tech](https://maajankiwebtech.com)
- Licensed under the **MIT License**.
