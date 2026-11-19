# SELLBAR — Backend REST API Gateway

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%7C%20Mongoose%209-green?logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN%20Integrated-blue?logo=cloudinary)](https://cloudinary.com/)
[![Logistics](https://img.shields.io/badge/Logistics-Shiprocket%20%7C%20Delhivery-orange)](https://shiprocket.in)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SELLBAR Backend** is an enterprise-grade, high-concurrency RESTful API service engineered specifically for the **SELLBAR** multi-vendor certified refurbished electronics and recommerce platform.

- **Production API Gateway**: [https://app.sellbar.in/api](https://app.sellbar.in/api)
- **Health Check Endpoint**: [https://app.sellbar.in/api/health](https://app.sellbar.in/api/health)
- **Frontend Storefront**: [https://sellbar.in](https://sellbar.in)

---

## 📑 Table of Contents
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Newly Implemented Capabilities (Changelog)](#-newly-implemented-capabilities-changelog)
  - [C. Courier & Logistics API (Pan-India Shipping)](#c-courier--logistics-api-pan-india-shipping)
  - [D. Vendor Automated Commission & Payout Ledger](#d-vendor-automated-commission--payout-ledger)
  - [E. Real-Time Sound & Audio Ping Alerts for Admin](#e-real-time-sound--audio-ping-alerts-for-admin)
- [Folder Structure](#-folder-structure)
- [Database Schemas & Models](#-database-schemas--models)
- [REST API Endpoints Reference](#-rest-api-endpoints-reference)
  - [1. Public Storefront APIs](#1-public-storefront-apis-apipublic)
  - [2. Authentication & Sessions](#2-authentication--sessions-apiauth)
  - [3. Customer Commerce & Orders](#3-customer-commerce--orders-apiorders)
  - [4. Logistics, Shipping & Barcode Labels](#4-logistics-shipping--barcode-labels-apishipping)
  - [5. Vendor Partner & Payout APIs](#5-vendor-partner--payout-apis-apivendor)
  - [6. Master Admin & Live Alert APIs](#6-master-admin--live-alert-apis-apiadmin)
- [Database Maintenance Scripts](#-database-maintenance-scripts)
- [Setup & Local Development](#-setup--local-development)
- [Environment Variables Configuration](#-environment-variables-configuration)
- [Deployment (Hostinger Node.js Web Hosting)](#-deployment-hostinger-nodejs-web-hosting)
- [Maintained & License](#-maintained--license)

---

## 🏛 Architecture & Tech Stack

- **Runtime**: Node.js 22 LTS
- **Framework**: Express 5.x
- **Database**: MongoDB Atlas Cluster via Mongoose 9.x (with automatic reconnection loops & Google DNS fallback)
- **Authentication**: Stateless JSON Web Tokens (JWT) with HTTP-only cookies and Bearer header support
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for `customer`, `vendor`, and `admin`
- **Logistics & Shipping**: Shiprocket & Delhivery multi-carrier API routing, 1-Click AWB generation, and native pure SVG Code-128 barcode rendering
- **Financial Settlements**: Automated platform commission deduction (10%) and weekly vendor payout ledger
- **Security & Headers**: Helmet, CORS whitelist (`https://sellbar.in`, `https://www.sellbar.in`), and Express Rate Limit (sliding window)
- **Asset Pipeline**: Cloudinary CDN integration for multi-angle product galleries, vendor KYC documents, and category icons
- **Payment Gateway**: Razorpay webhook and payment signature verification

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Sellbar Ecosystem                             │
└────────────────────────────────────────────────────────────────────────┘
                 │                                        │
                 ▼                                        ▼
┌──────────────────────────────────┐    ┌─────────────────────────────────┐
│ Next.js Frontend App             │    │ Express 5 Backend API           │
│ (https://sellbar.in)             │    │ (https://app.sellbar.in/api)    │
│                                  │    │                                 │
│ • Web Audio Order Ping Alerts    │    │ • Mongoose 9 Schemas            │
│ • 1-Click Barcode Label Print    │◄───┤ • Logistics Service (Shiprocket)│
│ • Vendor Payout Ledger Views     │    │ • Automated Commission Calc     │
│ • Pan-India PIN Code Checker     │    │ • Real-Time Order Alerts Poller │
└──────────────────────────────────┘    └─────────────────────────────────┘
                                                         │
                                    ┌────────────────────┴────────────────┐
                                    ▼                                     ▼
                        ┌───────────────────────┐             ┌───────────────────────┐
                        │ MongoDB Atlas Cluster │             │ Courier API Gateways  │
                        │ & Cloudinary Storage  │             │ Shiprocket / Delhivery│
                        └───────────────────────┘             └───────────────────────┘
```

---

## ⚡ Newly Implemented Capabilities (Changelog)

### C. Courier & Logistics API (Pan-India Shipping)
1. **Multi-Carrier Logistics Service (`src/services/logistics.service.js`)**:
   - Integrates with **Shiprocket** and **Delhivery** logistics APIs.
   - Provides an intelligent fallback simulation mode for offline/test environments to guarantee zero runtime crashes.
   - **1-Click AWB Assignment**: Generates official Tracking Numbers (AWB), assigns carrier (`Delhivery Surface`, `Shiprocket Express`, or `Sellbar Local Fleet`), and updates orders in real time.
2. **Native SVG Code-128 Barcode Generator**:
   - Built directly into `logistics.service.js` with zero native OS binary dependencies (`canvas` or `cairo` not required).
   - Generates clean, crisp, scalable SVG barcodes for AWB tracking numbers that print perfectly on standard 4x6 inch thermal shipping labels or A4 paper.
3. **Printable HTML Shipping Label (`/api/shipping/label/:orderId`)**:
   - Outputs a standard high-resolution thermal shipping label complete with barcode SVG, Seller details (West Champaran hub), Consignee shipping address, routing codes, order items, and return policy.
4. **Live Milestone Tracking (`/api/shipping/track/:id`)**:
   - Returns real-time milestone progress: `ORDER_PLACED` ➔ `AWB_ASSIGNED` ➔ `PICKED_UP` ➔ `IN_TRANSIT` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`.
5. **Pan-India Serviceability (`src/utils/serviceability.js`)**:
   - Validates all 6-digit Indian Postal PIN codes across North, South, East, and West zones.
   - Preserves **West Champaran & Bihar Local Fleet** priority (`sameDayAllowed: true`, `expressAllowed: true`).

---

### D. Vendor Automated Commission & Payout Ledger
1. **Automated Commission Calculation (`src/controllers/order/order.controller.js`)**:
   - On order creation, the platform automatically applies the vendor's agreed commission rate (default **10%**).
   - Records `commissionRate`, `commissionAmount`, and `vendorEarnings` per order directly in the `Order` model.
2. **Vendor Bank Details Management (`src/models/Vendor.js`)**:
   - Supports verified vendor bank details: `bankName`, `accountNumber`, `ifscCode`, `accountHolderName`, and `upiId`.
   - Dedicated endpoint: `PATCH /api/vendor/bank-details`.
3. **Weekly Payout Settlement Ledger (`src/models/VendorPayout.js`)**:
   - Tracks weekly settlement cycles, gross vendor sales, platform commission deducted, net disbursed amount, payment mode (`NEFT`, `IMPS`, `UPI`, `BANK_TRANSFER`), and unique bank reference / UTR numbers.
   - **Vendor Portal**: `GET /api/vendor/payouts` returns payout history, current unpaid balance, and total earnings.
   - **Admin Portal**: `GET /api/admin/payouts` lists all vendor payout statuses, while `POST /api/admin/payouts/settle` allows admins to disburse weekly earnings in 1 click.

---

### E. Real-Time Sound & Audio Ping Alerts for Admin
1. **Live Order Monitoring Endpoint (`GET /api/admin/live-alerts`)**:
   - Scans both customer device purchase orders (`Order`) and sell trade-in requests (`SellOrder` / `Lead`) placed within the last 30 seconds.
   - Returns counts, recent order summaries, customer names, and alert triggers.
2. **Frontend Web Audio API Integration (`AdminHeader.jsx`)**:
   - Connects to `/api/admin/live-alerts` via a lightweight 7-second background polling cycle.
   - Synthesizes a high-fidelity two-tone chime bell (587 Hz ➔ 880 Hz) using the browser's native Web Audio API oscillators—guaranteeing 0 missing audio file 404 errors.
   - Displays an animated floating toast notification in the admin header with direct links to view new orders immediately.

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
│   │   ├── admin/
│   │   │   └── admin.controller.js   # Admin analytics, KYC approval, live audio alerts, vendor payouts
│   │   ├── customer/
│   │   │   └── publicProduct.controller.js # Public catalog, slug lookup, featured deals
│   │   ├── shipping/
│   │   │   └── shipping.controller.js # AWB generation, label preview, live tracking, PIN code checks
│   │   ├── auth.controller.js        # Login, registration, token verification, logout
│   │   ├── cart.controller.js        # Database-backed shopping cart synchronization
│   │   ├── category.controller.js    # Category CRUD operations
│   │   ├── order.controller.js       # Customer orders with automated commission & Pan-India logistics
│   │   ├── payment.controller.js     # Payment webhook and verification handlers
│   │   ├── product.controller.js     # Vendor product management (Add, Edit, Delete)
│   │   ├── review.controller.js      # Customer reviews and ratings
│   │   ├── vendor/
│   │   │   └── vendor.controller.js  # Vendor profile, bank details, payouts ledger
│   │   └── vendorOrder.controller.js # Vendor order processing and dispatch
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js        # JWT verification and user extraction
│   │   ├── role.middleware.js        # RBAC role guards (`customer`, `vendor`, `admin`)
│   │   ├── vendor.middleware.js      # Enforces approved merchant KYC before store operations
│   │   ├── error.middleware.js       # Central error responder with safe production output
│   │   ├── rateLimit.middleware.js   # IP-based rate limiting (15 min window)
│   │   └── upload.middleware.js      # Multer file upload handler
│   │
│   ├── models/                       # Mongoose schemas
│   │   ├── Product.js                # Full certified electronics specifications schema
│   │   ├── Category.js               # Product category taxonomy
│   │   ├── User.js                   # Customer, vendor, and admin user profiles
│   │   ├── Vendor.js                 # Merchant store details, commission rate & bank details
│   │   ├── Order.js                  # Orders, commission breakdown & courier logistics fields
│   │   ├── Shipment.js               # Pan-India shipment records, AWBs, carriers & milestones
│   │   ├── VendorPayout.js           # Weekly vendor settlement ledger & disbursement records
│   │   ├── Cart.js                   # Persistent shopping cart
│   │   └── Review.js                 # Customer product ratings & unboxing photos
│   │
│   ├── routes/                       # Express router declarations
│   │   ├── public.routes.js          # Unauthenticated public storefront APIs
│   │   ├── auth.routes.js            # Login, signup, me, logout
│   │   ├── product.routes.js         # Products management
│   │   ├── category.routes.js        # Categories management
│   │   ├── order.routes.js           # Order operations
│   │   ├── shipping.routes.js        # 1-Click AWB, tracking, printable labels & PIN code check
│   │   ├── cart.routes.js            # Cart persistence
│   │   ├── admin.routes.js           # Admin controls, live alerts, vendor approvals & payouts
│   │   ├── vendor.routes.js          # Vendor profile, bank details & payout ledger
│   │   ├── vendorOrder.routes.js     # Vendor order dispatch
│   │   ├── payment.routes.js         # Razorpay checkout & webhooks
│   │   ├── review.routes.js          # Ratings & unboxing feedback
│   │   └── index.js                  # Master route aggregator
│   │
│   ├── services/
│   │   └── logistics.service.js      # Delhivery/Shiprocket API engine, SVG barcode & label generator
│   │
│   ├── utils/
│   │   └── serviceability.js         # Pan-India PIN code validator with Bihar local fleet priority
│   │
│   ├── scripts/                      # Database migrations, seeding, and tests
│   │   ├── seed-dynamic-products.js  # Seeds certified refurbished electronic devices
│   │   ├── enrich-electronics-products.js # Adds multi-angle galleries, specs, FAQs
│   │   ├── migrate-public-images.js  # Migrates local images to Cloudinary CDN
│   │   └── test-api.js               # Automated suite testing public endpoints
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

### 1. Shipment Model (`src/models/Shipment.js`)
Dedicated schema for Pan-India courier management and milestone tracking:
| Field | Type | Description |
|---|---|---|
| `orderId` | `ObjectId` | Reference to the associated `Order` |
| `vendorId` | `ObjectId` | Reference to the merchant fulfilling the package |
| `carrier` | `String` | Courier partner (`DELHIVERY`, `SHIPROCKET`, `LOCAL_EXPRESS`) |
| `awbNumber` | `String` | Unique Air Waybill number (indexed) |
| `routingCode` | `String` | Courier sort hub routing code (e.g. `DEL-PAT-WCH`) |
| `status` | `String` | Lifecycle: `LABEL_CREATED`, `PICKED_UP`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED`, `RTO` |
| `customerAddress` | `Object` | Full shipping address with validated 6-digit PIN code |
| `packageDimensions`| `Object` | Physical weight (grams) and dimensions (L × W × H in cm) |
| `milestones` | `[MilestoneSchema]`| Real-time chronological location timestamps and event descriptions |

### 2. Vendor Payout Model (`src/models/VendorPayout.js`)
Tracks automated commission deductions and weekly vendor settlements:
| Field | Type | Description |
|---|---|---|
| `payoutId` | `String` | Unique payout transaction identifier (e.g. `PO-1731580000000-842`) |
| `vendorId` | `ObjectId` | Reference to `Vendor` receiving disbursement |
| `orderIds` | `[ObjectId]`| List of delivered customer orders included in this settlement cycle |
| `grossAmount` | `Number` | Total customer billing value of settled orders (₹) |
| `commissionRate`| `Number` | Platform commission percentage deducted (default `10%`) |
| `commissionAmount`| `Number` | Total platform revenue retained by Sellbar (₹) |
| `netPayable` | `Number` | Final net amount disbursed to vendor's bank account (₹) |
| `payoutStatus` | `String` | Status: `PENDING`, `PROCESSING`, `SETTLED`, `FAILED` |
| `settlementCycle`| `String` | Settlement timeframe (e.g. `WEEKLY_SETTLEMENT_NOV_W2`) |
| `paymentRef` | `String` | Bank UTR / IMPS / UPI transaction reference ID |
| `paymentMode` | `String` | Transfer method: `BANK_TRANSFER`, `NEFT`, `IMPS`, `UPI` |

### 3. Order Model Updates (`src/models/Order.js`)
Enhanced with Pan-India courier logistics and automated commission breakdown:
- **Logistics**: `shippingCarrier`, `awbNumber`, `shippingLabelUrl`, `courierTrackingUrl`, `shippingStatus`, `isPanIndia`.
- **Commission**: `commissionRate` (default 10%), `commissionAmount`, `vendorEarnings`, `payoutStatus` (`PENDING`, `SETTLED`), `payoutRef`, `payoutSettledAt`.

### 4. Vendor Model Updates (`src/models/Vendor.js`)
- `commissionRate`: Percentage fee charged on merchant transactions (default: `10%`).
- `bankDetails`: Object holding `bankName`, `accountNumber`, `ifscCode`, `accountHolderName`, and `upiId`.

---

## 📡 REST API Endpoints Reference

### 1. Public Storefront APIs (`/api/public/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service heartbeat & uptime status |
| `GET` | `/api/public/products` | Paginated product catalog with filtering & sorting |
| `GET` | `/api/public/products/:id` | Product detail with variants, specs & 4 related items |
| `GET` | `/api/public/products/featured` | Curated featured gadget deals (`hot-deal`, `trending`, `best-seller`) |
| `GET` | `/api/public/categories` | Active categories with attached product counts |

### 2. Authentication & Sessions (`/api/auth/*`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticates customer, vendor, or admin |
| `POST` | `/api/auth/register/customer` | Creates new customer account |
| `POST` | `/api/auth/register/vendor` | Submits merchant store application |
| `GET` | `/api/auth/me` | Returns current authenticated session from JWT |
| `POST` | `/api/auth/logout` | Clears authentication cookies |

### 3. Customer Commerce & Orders (`/api/orders/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET / POST` | `/api/cart` | Get or synchronize shopping cart |
| `POST` | `/api/orders` | Places order, validates Pan-India PIN code & auto-calculates 10% commission |
| `GET` | `/api/orders/:id` | Order details with live logistics and shipment milestone data |

### 4. Logistics, Shipping & Barcode Labels (`/api/shipping/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/shipping/check?pincode=XXXXXX` | Checks Pan-India courier serviceability & estimated delivery days |
| `GET` | `/api/shipping/pincodes` | Lists verified priority delivery PIN codes (Bihar & Pan-India) |
| `POST` | `/api/shipping/generate-awb` | **1-Click AWB Generation** with Shiprocket/Delhivery routing |
| `GET` | `/api/shipping/label/:orderId` | Generates printable **HTML/PDF Shipping Label with Code-128 SVG Barcode** |
| `GET` | `/api/shipping/track/:id` | Returns real-time milestone tracking progress |

### 5. Vendor Partner & Payout APIs (`/api/vendor/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vendor/dashboard` | Merchant dashboard overview with revenue and order statistics |
| `GET` | `/api/vendor/products` | Inventory listings belonging to vendor |
| `POST` | `/api/vendor/products` | Create new gadget listing with image uploads |
| `PUT / DELETE` | `/api/vendor/products/:id` | Update or remove product listing |
| `GET` | `/api/vendor/orders` | Incoming customer orders assigned to vendor |
| `PUT` | `/api/vendor/orders/:id/status` | Update dispatch status & tracking number |
| `GET` | `/api/vendor/payouts` | **Vendor Payout Ledger**: gross sales, 10% commission deducted, net balance & payout history |
| `PATCH` | `/api/vendor/bank-details` | Update bank account & UPI ID for weekly settlement disbursement |

### 6. Master Admin & Live Alert APIs (`/api/admin/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Platform metrics (Gross merchandise volume, active merchants, orders) |
| `GET` | `/api/admin/live-alerts` | **Real-Time Sound Alert Feed**: Polls new orders in the last 30s to trigger audio ping |
| `GET` | `/api/admin/payouts` | **Platform Payout Ledger**: Overview of all vendor earnings, commission retained, and pending settlements |
| `POST` | `/api/admin/payouts/settle` | **1-Click Weekly Settlement**: Disburses vendor earnings and marks orders settled |
| `GET / PATCH` | `/api/admin/vendors/:id/approval`| Review and approve/reject merchant KYC applications |
| `GET / PATCH` | `/api/admin/users/:id/status` | Customer and vendor account status controls |

---

## 🛠 Database Maintenance Scripts

Run these scripts from the `backend/` directory:

```bash
# 1. Seed 24 certified refurbished electronic devices:
node src/scripts/seed-dynamic-products.js

# 2. Enrich devices with multi-angle galleries, variants, specs, FAQs:
node src/scripts/enrich-electronics-products.js

# 3. Migrate all local public folder images to Cloudinary CDN:
node src/scripts/migrate-public-images.js

# 4. Run automated test suite verifying all public API endpoints:
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
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
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

Create a `.env` file in the root of `backend/`:

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

# (Optional) Shiprocket & Delhivery Production API Credentials
# When omitted, the built-in logistics service uses high-fidelity simulation mode
SHIPROCKET_EMAIL=logistics@sellbar.in
SHIPROCKET_PASSWORD=your_shiprocket_password
DELHIVERY_API_KEY=your_delhivery_api_key
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
