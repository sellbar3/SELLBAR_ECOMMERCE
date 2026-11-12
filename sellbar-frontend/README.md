# SELLBAR — Frontend Storefront & Portals

[![Next.js](https://img.shields.io/badge/Next.js-16.4%20(Turbopack)-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.x-green?logo=node.js)](https://nodejs.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN%20Integrated-blue?logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SELLBAR Frontend** is a modern, high-performance, enterprise-grade e-commerce & recommerce storefront built for **certified refurbished electronic gadgets** (Smartphones, Laptops, Tablets, Smartwatches, Cameras, Gaming Consoles, Audio, and Accessories).

This repository contains the standalone Next.js 16 web application powering:
- **Customer Storefront** (Browse, dynamic filters, live deals, instant gadget valuation, 32-point inspection guarantees)
- **Electronics Single Product Detail Page (PDP)** with real-time hardware variant switching
- **Vendor Partner Portal** (`/vendor`) for merchant inventory and order fulfillment
- **Platform Master Control Center** (`/admin`) for catalog, user, and partner approvals

- **Live Production URL**: [https://sellbar.in](https://sellbar.in)
- **Production API Gateway**: [https://app.sellbar.in/api](https://app.sellbar.in/api)

---

## 📑 Table of Contents
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Folder Structure](#-folder-structure)
- [App Router Sitemap (72+ Routes)](#-app-router-sitemap-72-routes)
- [Electronics Single Product Detail Page](#-electronics-single-product-detail-page)
- [Resilient API Layer & Offline Fallback](#-resilient-api-layer--offline-fallback)
- [Cloudinary CDN Asset Pipeline](#-cloudinary-cdn-asset-pipeline)
- [Cart, Session & Checkout Architecture](#-cart-session--checkout-architecture)
- [Setup & Local Development](#-setup--local-development)
- [Environment Variables Configuration](#-environment-variables-configuration)
- [Deployment (Hostinger Node.js / VPS / Vercel)](#-deployment)
- [How-To Guides & Contributing](#-how-to-guides--contributing)
- [Maintained & License](#-maintained--license)

---

## 🏛 Architecture & Tech Stack

- **Framework**: Next.js 16.4.2 (App Router + React 19)
- **Styling**: Tailwind CSS 4.x + Lucide Icons + Radix UI Primitives
- **Image Optimization**: Cloudinary CDN (74+ pre-optimized responsive cloud assets)
- **Persistence & State**: Reactive LocalStorage Cart synchronization across multi-tab sessions with custom window events
- **API Communication**: Unified Axios client with automatic bearer token attachment and resilient fallback to bundled JSON snapshots
- **Server Runtime**: Node.js 22 LTS with custom entry file `server.js` for standalone cloud hosting compatibility

```
┌────────────────────────────────────────────────────────┐
│                   Sellbar Frontend                     │
│               Next.js 16 (Port 3000)                   │
├──────────────────────────┬─────────────────────────────┤
│ Customer Storefront      │ Recommerce / Trade-In Hub   │
│ • Catalog & Filtering    │ • 10 Device Valuation Tools │
│ • Variant Re-calculator  │ • Doorstep Pickup & Payout  │
├──────────────────────────┼─────────────────────────────┤
│ Merchant Portal (/vendor)│ Admin Control (/admin)      │
│ • Inventory & Listings   │ • Approvals, Catalog & KYC  │
└──────────────────────────┴─────────────────────────────┘
             │                                │
             ▼                                ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│ Cloudinary CDN Pipeline │      │ Backend REST API        │
│ 74+ Cloud Hosted Assets │      │ (https://app.sellbar.in)│
└─────────────────────────┘      └─────────────────────────┘
```

---

## 🗂 Folder Structure

```
sellbar-frontend/
├── public/                           # Static assets
│   ├── assets/3d/                    # 3D models (smartphone.glb, sneaker.glb)
│   ├── banners/                      # Local fallbacks (all backed by Cloudinary)
│   ├── sellbar/                      # Guides & article thumbnails
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
│   │   ├── checkout/                 # Secure multi-step checkout
│   │   ├── account/                  # Customer profile, orders, addresses
│   │   ├── admin/                    # Platform Master Control Center
│   │   │   ├── page.js               # Executive Admin Dashboard (KPIs, GMV, analytics charts)
│   │   │   ├── brands/               # Brand taxonomy management (Apple, Samsung, Dell, etc.)
│   │   │   ├── categories/           # Product category & subcategory management
│   │   │   ├── login/                # Dedicated Administrator authentication & session guard
│   │   │   ├── products/             # Platform-wide product catalog moderation & inventory control
│   │   │   ├── sell-models/          # Recommerce trade-in catalog & model specifications
│   │   │   ├── sell-orders/          # Customer trade-in pickup orders & doorstep QC management
│   │   │   ├── users/                # User accounts moderation (Customers, Vendors, Admins, KYC)
│   │   │   ├── valuation/            # Dynamic valuation algorithm rules & condition deductions
│   │   │   └── [...slug]/            # Dynamic fallback router for nested admin sub-views
│   │   │
│   │   ├── vendor/                   # Merchant Partner Portal
│   │   │   ├── page.js               # Vendor business summary & sales analytics dashboard
│   │   │   ├── login/                # Merchant sign-in & session management
│   │   │   ├── signup/               # Merchant registration, GST/KYC onboarding & store setup
│   │   │   ├── orders/               # Order fulfillment, shipment packing & courier dispatch
│   │   │   ├── products/             # Merchant product inventory management
│   │   │   │   ├── page.js           # Live product inventory table with stock toggles
│   │   │   │   ├── new/              # Add product wizard with Cloudinary uploads & variant matrix
│   │   │   │   └── [id]/             # Edit product specifications, pricing & grading
│   │   │   └── profile/              # Store branding, warehouse address & bank payout details
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
│   │   ├── SellbarGuidesSection.jsx  # Device buying guides
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
│       ├── api.js                    # Base Axios instance targeting backend gateway
│       ├── productApi.js             # Resilient client layer for fetching products
│       ├── cloudinary.js             # URL helper for Cloudinary transformations
│       ├── cart.js                   # LocalStorage cart management with custom events
│       ├── auth.js                   # JWT session helper (`getSession`, `clearSession`)
│       └── utils.js                  # Tailwind class merge helper (`cn()`)
│
├── next.config.mjs                   # Webpack rules, proxy rewrites, and redirects
├── server.js                         # Production Node.js bootstrapper (standalone fallback)
├── package.json                      # Dependencies and scripts
└── README.md                         # Comprehensive frontend guide
```

---

## 🗺 App Router Sitemap (72+ Routes)

### Storefront Routes
| Route Path | Purpose |
|---|---|
| `/` | Homepage (Hero banners, live deals, tech categories) |
| `/buy-refurbished` | Master certified refurbished catalog |
| `/buy-refurbished-mobile-phones` | Smartphones with brand & price filters |
| `/buy-refurbished-laptops` | Laptops with processor & RAM filters |
| `/buy-refurbished-gadgets` | Multi-gadget deals (Smartwatches, tablets) |
| `/product/[slug]` | Premium Electronics Single Product Detail |
| `/find-new-phone` | Smartphone finder & recommendation engine |
| `/supersale` | Seasonal discount showcase |
| `/cart` | Shopping cart review |
| `/checkout` | Multi-step address, shipping, and payment |
| `/account` | User orders, profile, saved addresses |
| `/orders` | Order tracking & invoice downloads |
| `/track-order` | Real-time courier dispatch status |
| `/about-us` | Company background, mission, certified refurbish process |
| `/contact-us` | Customer support & grievance officer details |
| `/privacy-policy` | Privacy policy & data protection terms |
| `/terms` | Terms of service |
| `/refund-policy` | 7-day replacement & refund rules |
| `/warranty-policy` | 12-month doorstep warranty guide |

### Recommerce / Trade-In Routes
| Route Path | Purpose |
|---|---|
| `/sell` | Trade-in hub for selling used devices |
| `/sell-old-mobile-phone` | Smartphone valuation wizard (15 brands) |
| `/sell-old-laptop` | Laptop valuation calculator |
| `/sell-old-tablet` | iPad & Android tablet trade-in |
| `/sell-old-smart-watch` | Smartwatch trade-in |
| `/sell-old-television` | Smart TV trade-in |
| `/sell-old-dslr-camera` | DSLR & mirrorless camera trade-in |
| `/sell-old-gaming-consoles` | PS5, Xbox, Nintendo trade-in |
| `/sell-old-earbuds` | Wireless earbuds trade-in |
| `/sell-old-smart-speaker` | Smart speakers (Echo, HomePod, Bose) |
| `/sell-old-imac` | Apple iMac & Mac Studio trade-in |
| `/recycle-old-mobile-phone` | Eco-friendly electronics recycling |
| `/repair` | Doorstep screen & battery repair service |

### 🏢 Admin Master Control Portal (`src/app/admin/`)
The Admin Portal provides platform owners with complete control over inventory, merchants, trade-in valuations, orders, and customer accounts.

| Folder / Route Path | File Location | Key Capabilities & Features |
|---|---|---|
| `/admin` | `src/app/admin/page.js` | **Executive Overview**: Total GMV, active users, orders count, revenue charts, recent transactions table |
| `/admin/brands` | `src/app/admin/brands/page.js` | **Brand Management**: Add/edit manufacturers (Apple, Samsung, OnePlus, Dell, HP, Lenovo) |
| `/admin/categories` | `src/app/admin/categories/page.js` | **Taxonomy Control**: Global categories, commission rates, banner associations, and SEO slugs |
| `/admin/products` | `src/app/admin/products/page.js` | **Catalog Oversight**: Platform-wide product moderation, approvals, price audit, and inventory toggles |
| `/admin/sell-models` | `src/app/admin/sell-models/page.js` | **Trade-in Catalog**: Master database of sellable electronic models, base valuation prices, and variants |
| `/admin/sell-orders` | `src/app/admin/sell-orders/page.js` | **Buyback Pipeline**: Customer device selling orders, technician doorstep pickup dispatch, and QC status |
| `/admin/valuation` | `src/app/admin/valuation/page.js` | **Pricing Algorithm**: Configure deduction rules for cosmetic scratches, battery health, and functional defects |
| `/admin/users` | `src/app/admin/users/page.js` | **User Accounts**: Customer & merchant account moderation, role assignment, and status toggles |
| `/admin/login` | `src/app/admin/login/page.js` | **Admin Auth**: Protected administrator login with secure JWT session validation |
| `/admin/[...slug]` | `src/app/admin/[...slug]/page.js` | **Dynamic Sub-Views**: Unified router fallback for deep admin sub-modules |

---

### 🏪 Vendor / Merchant Partner Portal (`src/app/vendor/`)
The Vendor Portal is designed for certified refurbishment partners and sellers to manage their listings, stock, and customer orders.

| Folder / Route Path | File Location | Key Capabilities & Features |
|---|---|---|
| `/vendor` | `src/app/vendor/page.js` | **Merchant Dashboard**: Daily sales metrics, pending dispatches, revenue summary, low stock alerts |
| `/vendor/login` | `src/app/vendor/login/page.js` | **Partner Sign-in**: Secure authentication for verified merchant partners |
| `/vendor/signup` | `src/app/vendor/signup/page.js` | **Merchant Registration**: Business registration, GST/PAN KYC upload, warehouse address submission |
| `/vendor/products` | `src/app/vendor/products/page.js` | **Inventory List**: Table of all vendor products with live stock toggles, price updates, and status filters |
| `/vendor/products/new` | `src/app/vendor/products/new/page.js` | **Product Creation Wizard**: Multi-image Cloudinary upload, condition grading (A++/A+/A), variant matrix |
| `/vendor/products/[id]` | `src/app/vendor/products/[id]/page.js` | **Product Editor**: Modify specifications, update pricing, restock hardware variants, and adjust descriptions |
| `/vendor/orders` | `src/app/vendor/orders/page.js` | **Order Fulfillment**: Track new orders, download invoices, mark orders packed, generate shipping labels |
| `/vendor/profile` | `src/app/vendor/profile/page.js` | **Store Settings**: Business profile, pickup warehouse location, bank account details for settlements |
| `/panel-login` | `src/app/panel-login/page.js` | **Unified Entry**: Smart redirection gateway routing users to either Admin or Vendor portal |

---

## 📱 Electronics Single Product Detail Page

Located at `src/app/product/[slug]/page.js`. Specifically engineered for **electronics recommerce**:

1. **Two-Column Desktop Viewport (~55% / ~45%)**:
   - **Left Column**: 1:1 Aspect ratio image frame, desktop hover-zoom lens, fullscreen modal inspection lightbox, mobile touch swipe gestures (`touchstart`/`touchend`), multi-angle thumbnail selector (front, back, angle, side/ports).
   - **Right Column (Sticky)**: Brand badge, official **Model Number** & **SKU**, star rating with verified purchase count, prominent price block with **MRP strikethrough**, **Savings % chip**, **No-Cost EMI calculator**, real-time **Stock counter**, and **Pincode Delivery Estimator**.
2. **Dynamic Variant Switching**:
   - **Smartphones**: Storage (`128GB`, `256GB`, `512GB`), RAM (`6GB`, `8GB`), Color swatches with chips (`Midnight`, `Starlight`, `Deep Blue`), and Network (`5G`).
   - **Laptops**: Processor (`Intel Core i5/i7`, `Apple M`), RAM (`8GB`, `16GB`), and SSD Storage (`256GB`, `512GB`).
   - Selecting a variant dynamically recalculates **price**, **compare price**, **SKU**, **stock**, and updates the **active gallery photo**.
3. **Structured Technical Tabs**:
   - **Technical Specifications**: Structured categorized table (*Display & Build*, *Performance & Storage*, *Battery & Charging*, *Connectivity & Ports*, *Quality Assurance*).
   - **Product Overview & Grade Breakdown**: Transparent criteria for *Flawless (Grade A++)*, *Superb (Grade A+)*, and *Good (Grade A)*.
   - **What's in the Box**: Visual cards displaying device, fast charger, SIM tool, 32-point inspection report, warranty card.
   - **Warranty & Replacement**: Complete coverage terms and step-by-step doorstep claim process.
   - **Customer Reviews & Photos**: Rating breakdown bars (5★–1★), customer-uploaded unboxing photo gallery with lightbox, and verified buyer reviews.
   - **Electronics FAQs**: Interactive accordion covering battery health guarantees, refurbishment testing, and returns.
4. **Mobile Sticky Action Bar**:
   - Floats at the bottom on mobile devices displaying product title, active variant price, **Cart**, and **Buy Now** buttons.

---

## 🛡 Resilient API Layer & Offline Fallback

The frontend is architected to be **100% resilient** and never crash, even if the backend server is temporarily restarting or unreachable during local development:

1. **Next.js App Router Route Handler** (`src/app/api/public/[...slug]/route.js`):
   - Handles `/api/public/*` requests natively within Next.js.
   - First attempts to proxy requests to `https://app.sellbar.in/api/public/...` (or local backend).
   - If the backend is running, returns live MongoDB data.
   - If the backend is unreachable, **seamlessly serves the matching cached response from `src/config/products-cache.json` with HTTP 200**.
   - Completely prevents unhandled exceptions or blank screens.
2. **Client API Service** (`src/lib/productApi.js`):
   - Exports `fetchProducts`, `fetchProductByIdOrSlug`, `fetchFeaturedProducts`, and `fetchCategories`.
   - Built with try/catch fallbacks to maintain a 100% smooth user experience under poor network conditions.

---

## ☁️ Cloudinary CDN Asset Pipeline

- All storefront graphics, banners, service icons, sell icons, and product photos are served via Cloudinary CDN under account `dbd4anwt`.
- **Mapping**: Loaded via `src/config/cloudinary-mapping.json`.
- **Helper** (`src/lib/cloudinary.js`):
  ```javascript
  import { getCloudinaryUrl } from "@/lib/cloudinary";

  // Automatically resolves local path to secure Cloudinary HTTPS URL:
  const imageUrl = getCloudinaryUrl("/products/iphone-14.webp");
  // Returns: https://res.cloudinary.com/dbd4anwt/image/upload/v1793353852/sellbar/products/iphone-14.webp
  ```

---

## 🛒 Cart, Session & Checkout Architecture

- **Cart Management** (`src/lib/cart.js`):
  - Persists items in `localStorage` under key `sellbar_cart`.
  - Dispatches `sellbar-cart-updated` browser events so the header cart counter and badges reactively update across all open tabs.
  - Supports variant options: `id`, `name`, `price`, `quantity`, `image`, `conditionGrade`, `variantName`, `sku`.
- **Session Authentication** (`src/lib/auth.js`):
  - Handles JWT token extraction and role management (`customer`, `vendor`, `admin`).
- **Checkout Block** (`src/components/ui/checkout-block.jsx`):
  - Built with shadcn/ui patterns (`Card`, `Badge`, `Select`, `Input`).
  - Reads active cart items from `getLocalCart()` and automatically synchronizes pricing, delivery charges, and taxes.

---

## 🚀 Setup & Local Development

### Prerequisites
- **Node.js**: `v20.x` or higher (recommended: `v22.x`)
- **npm**: `v10.x` or higher
- **Git**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sellbar3/sellbar-frontend.git
cd sellbar-frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local
```

### Running Locally

```bash
# Start development server with Turbopack (Port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables Configuration

Create a `.env.local` file in the root of `sellbar-frontend`:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=https://app.sellbar.in/api

# Site Metadata URL
NEXT_PUBLIC_SITE_URL=https://sellbar.in

# Cloudinary Cloud Name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dbd4anwt
```

---

## 🚢 Deployment

### 1. Hostinger Node.js Web App (Current Production Setup)
- **Domain**: `sellbar.in`
- **Application Type**: Next.js (or Node.js)
- **Node.js Version**: 22
- **Build Command**: `npm run build`
- **Entry File**: `server.js` (automatically serves standalone build or Next.js production server)
- **Output Directory**: none / default

### 2. Vercel Deployment
1. Import the `sellbar-frontend` repository in Vercel.
2. Framework Preset: **Next.js**
3. Set environment variable `NEXT_PUBLIC_API_URL=https://app.sellbar.in/api`.
4. Deploy!

---

## 🤝 How-To Guides & Contributing

### How to Add a New Storefront Page
1. Create a new folder inside `src/app/<your-page-name>/`.
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
3. Test production build using `npm run build` to verify that there are no routing or prerendering errors.

---

## 👥 Maintained & License

- **Maintained by**: [Maajanki Web Tech](https://maajankiwebtech.com)
