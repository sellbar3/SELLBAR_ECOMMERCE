# SELLBAR — Frontend Storefront & Portals

[![Next.js](https://img.shields.io/badge/Next.js-16.4%20(Turbopack)-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.x-green?logo=node.js)](https://nodejs.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN%20Integrated-blue?logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SELLBAR Frontend** is an enterprise-grade e-commerce & recommerce platform built with **Next.js 16 (App Router) + React 19 + Tailwind CSS 4**, specifically engineered for **Certified Refurbished Electronics** (Smartphones, Laptops, Tablets, Smartwatches, Cameras, Gaming Consoles, Audio, and Accessories) and **Old Device Trade-In / Instant Cash Buyback**.

- **Storefront URL**: [https://sellbar.in](https://sellbar.in)
- **API Gateway URL**: [https://app.sellbar.in/api](https://app.sellbar.in/api)
- **Local Dev URL**: [http://localhost:3000](http://localhost:3000)

---

## 📑 Table of Contents
1. [Architecture & Tech Stack](#-architecture--tech-stack)
2. [Complete Directory & File Structure](#-complete-directory--file-structure)
3. [Public Storefront Pages & Catalog](#1-public-storefront-pages--catalog)
4. [Recommerce & Sell Old Device Pages](#2-recommerce--sell-old-device-pages)
5. [Cart, Checkout & Order Confirmation](#3-cart-checkout--order-confirmation)
6. [Customer / User Dashboard (`/account`)](#4-customer--user-dashboard-account)
7. [Admin Master Control Center (`/admin`)](#5-admin-master-control-center-admin)
   - [Real-time Audio Alert Notification Bell (Feature E)](#real-time-audio-alert-notification-bell-feature-e)
   - [Pan-India Logistics & Barcode Shipping Labels (Feature C)](#pan-india-logistics--barcode-shipping-labels-feature-c)
   - [Vendor Payouts & Commission Settlements (Feature D)](#vendor-payouts--commission-settlements-feature-d)
8. [Vendor / Merchant Partner Portal (`/vendor`)](#6-vendor--merchant-partner-portal-vendor)
   - [1-Click AWB Generation & Label Printing](#1-click-awb-generation--label-printing)
   - [Vendor Commission & Payout Ledger Page](#vendor-commission--payout-ledger-page)
9. [Next.js API Route Handlers (`src/app/api`)](#7-nextjs-api-route-handlers-srcappapi)
10. [Key Components & Shared Libraries](#8-key-components--shared-libraries)
11. [Setup, Environment Variables & Development](#9-setup-environment-variables--development)

---

## 🏛 Architecture & Tech Stack

- **Framework**: Next.js 16.4.2 (App Router, Turbopack, React Server & Client Components)
- **Runtime**: React 19.3.0 + Node.js 20+
- **Styling**: Tailwind CSS 4.x + Lucide React + Material-UI (MUI & MUI X Charts/DataGrid)
- **Image CDN**: Cloudinary CDN pipeline (`dbd4anwt`) with automated fallback mapping (`src/config/cloudinary-mapping.json`)
- **State Management**: Reactive multi-tab synchronized `localStorage` cart with custom browser events
- **Audio Synthesis**: Native Web Audio API synthesizer generating zero-latency crystal-clear bell chime ping (no external audio files required)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SELLBAR FRONTEND ARCHITECTURE                   │
│                        Next.js 16 (Port 3000)                          │
├──────────────────────────┬─────────────────────────┬───────────────────┤
│ Customer Storefront      │ Recommerce Trade-In Hub │ User Dashboard    │
│ • Catalog & Filtering    │ • 10 Device Calculators │ • Orders & Items  │
│ • Electronics PDP        │ • Instant Doorstep Cash │ • Sell Requests   │
│ • Cart & Multi-Step Pay  │ • 32-Point Diagnostics  │ • Device Warranty │
├──────────────────────────┼─────────────────────────┼───────────────────┤
│ Master Admin Portal      │ Merchant Partner Portal │ Next.js API Layer │
│ (/admin)                 │ (/vendor)               │ (/api/...)        │
│ • Audio Order Alerts 🔔  │ • 1-Click AWB Shipping  │ • Live Alerts     │
│ • Pan-India Courier API  │ • Barcode Label Print   │ • Shipping Labels │
│ • Vendor Payouts Ledger  │ • Commission Ledger 10% │ • Vendor Payouts  │
└──────────────────────────┴─────────────────────────┴───────────────────┘
```

---

## 🗂 Complete Directory & File Structure

```
sellbar-frontend/
├── public/                                # Static images, icons, logos, and 3D models
│   ├── assets/3d/                         # 3D models (smartphone.glb, sneaker.glb)
│   ├── banners/                           # Storefront promotional banners
│   ├── products/                          # Product thumbnail fallbacks
│   ├── sell-icons/                        # Trade-in device category vector icons
│   └── services/                          # Service guarantee badges
│
├── src/
│   ├── app/                               # Next.js 16 App Router Routes
│   │   ├── layout.js                      # Root HTML layout with Navbar & Footer
│   │   ├── page.js                        # Storefront Homepage
│   │   │
│   │   ├── (Storefront Catalog)/
│   │   │   ├── buy-refurbished/           # Master catalog of certified refurbished electronics
│   │   │   ├── buy-refurbished-mobile-phones/ # Refurbished smartphones with brand filters
│   │   │   ├── buy-refurbished-laptops/   # Laptops catalog with processor/RAM filters
│   │   │   ├── buy-refurbished-tablets/   # iPads & Android tablets catalog
│   │   │   ├── buy-refurbished-smart-watches/ # Apple Watch & smartwatches
│   │   │   ├── buy-refurbished-dslr-cameras/ # DSLR & mirrorless cameras
│   │   │   ├── buy-refurbished-gaming-consoles/ # PS5, PS4, Xbox, Nintendo
│   │   │   ├── buy-refurbished-gadgets/   # Multi-category certified gadgets deals
│   │   │   ├── buy-accessories/           # Chargers, cables, adapters, cases
│   │   │   ├── supersale/                 # Flash sales & festive mega discounts
│   │   │   ├── brands/                    # Brands directory (Apple, Samsung, Dell, etc.)
│   │   │   ├── search/                    # Live dynamic search results page
│   │   │   ├── shop/                      # Category & brand taxonomy views
│   │   │   │   ├── brands/page.js         # Shop by manufacturer
│   │   │   │   └── categories/[slug]/     # Dynamic category product listing
│   │   │   ├── product/[slug]/page.js     # Single Product Detail Page (PDP) with variants
│   │   │   └── find-new-phone/page.js     # Smart phone recommendation quiz
│   │   │
│   │   ├── (Recommerce & Sell Old Device)/
│   │   │   ├── sell/page.js               # Trade-in category selection hub
│   │   │   ├── sell-old-mobile-phone/     # Smartphone valuation engine (brand/model selector)
│   │   │   │   ├── page.js                # Select brand & popular models
│   │   │   │   ├── [brand]/page.js        # Select specific model from brand
│   │   │   │   ├── [brand]/[model]/page.js # 3-step condition assessment questionnaire
│   │   │   │   └── order-confirmed/page.js # Doorstep pickup appointment confirmation
│   │   │   ├── sell-old-laptop/           # Old laptop valuation calculator
│   │   │   ├── sell-old-tablet/           # Old tablet trade-in calculator
│   │   │   ├── sell-old-smart-watch/      # Smartwatch trade-in calculator
│   │   │   ├── sell-old-television/       # Smart TV trade-in calculator
│   │   │   ├── sell-old-dslr-camera/      # DSLR & camera trade-in calculator
│   │   │   ├── sell-old-gaming-consoles/  # Gaming console trade-in calculator
│   │   │   ├── sell-old-earbuds/          # Wireless earbuds valuation
│   │   │   ├── sell-old-smart-speaker/    # Smart speaker valuation
│   │   │   ├── sell-old-imac/             # Apple iMac trade-in valuation
│   │   │   ├── recycle-old-mobile-phone/  # Eco-friendly electronic scrap recycling
│   │   │   ├── repair/ & laptop-repair/   # Doorstep screen, battery & motherboard repair
│   │   │   └── rent-ps5/                  # Gaming console rental service
│   │   │
│   │   ├── (Cart & Checkout Flow)/
│   │   │   ├── cart/page.js               # Shopping cart with quantity modification
│   │   │   ├── checkout/page.js           # Multi-step checkout (Address, Pan-India courier, Pay)
│   │   │   └── order-confirmed/page.js    # Order success page with tracking summary
│   │   │
│   │   ├── (Customer / User Dashboard)/
│   │   │   ├── account/                   # Customer master account center
│   │   │   │   ├── layout.js              # Account layout with left navigation sidebar
│   │   │   │   ├── page.js                # Profile overview & quick statistics
│   │   │   │   ├── orders/page.js         # Customer order history & invoices
│   │   │   │   ├── sell-orders/page.js    # Customer old device trade-in requests & QC status
│   │   │   │   ├── payouts/page.js        # Device sale payout status (UPI / Bank transfer)
│   │   │   │   ├── warranty/page.js       # Active 6-12 month warranty cards & claim form
│   │   │   │   ├── addresses/page.js      # Saved delivery addresses management
│   │   │   │   ├── reviews/page.js        # Customer published product ratings & reviews
│   │   │   │   ├── wishlist/page.js       # Saved favorite gadgets
│   │   │   │   └── profile/page.js        # Personal details, phone, and password edit
│   │   │   ├── orders/page.js             # Standalone direct orders tracking page
│   │   │   ├── track-order/page.js        # Pan-India consignment tracking (AWB search)
│   │   │   └── wishlist/page.js           # Direct wishlist page
│   │   │
│   │   ├── (Admin Master Control Center)/
│   │   │   ├── admin/
│   │   │   │   ├── page.js                # Executive Admin Dashboard (MUI Charts, Sales, GMV)
│   │   │   │   ├── login/page.js          # Secure Administrator login portal
│   │   │   │   ├── orders/                # Orders management (AWB assignment, Barcode labels)
│   │   │   │   ├── shipping/              # Pan-India Courier API Dashboard (Delhivery / Shiprocket)
│   │   │   │   ├── payouts/               # Vendor Commission & Weekly Settlement Ledger
│   │   │   │   ├── sell-orders/page.js    # Trade-in orders, technician dispatch, QC price revision
│   │   │   │   ├── sell-models/page.js    # Master catalog of sellable phone models & base prices
│   │   │   │   ├── valuation/page.js      # Algorithmic valuation engine deduction rules
│   │   │   │   ├── products/page.js       # Platform catalog moderation, stock & prices
│   │   │   │   ├── categories/page.js     # Taxonomy, categories & banner settings
│   │   │   │   ├── brands/page.js         # Supported manufacturer brands
│   │   │   │   ├── users/page.js          # Customer, vendor, and admin accounts moderation
│   │   │   │   └── [...slug]/page.js      # Universal sub-view router (Tax, SEO, AI Copywriter)
│   │   │
│   │   ├── (Vendor Partner Portal)/
│   │   │   ├── vendor/
│   │   │   │   ├── page.js                # Merchant dashboard (Sales, pending orders, revenue)
│   │   │   │   ├── login/page.js          # Merchant authentication
│   │   │   │   ├── signup/page.js         # Merchant registration, GST/KYC & bank details
│   │   │   │   ├── orders/page.js         # Orders fulfillment with 1-Click AWB & Barcode Label PDF
│   │   │   │   ├── payouts/page.js        # Vendor Commission (10%) & Weekly Settlement Ledger
│   │   │   │   ├── products/
│   │   │   │   │   ├── page.js            # Live inventory table with stock toggles
│   │   │   │   │   ├── new/page.js        # Add product wizard with Cloudinary multi-upload
│   │   │   │   │   └── [id]/page.js       # Edit product specs, grading (A++/A+/A), and price
│   │   │   │   └── profile/page.js        # Store branding, pickup warehouse address, bank settings
│   │   │   └── panel-login/page.js        # Unified entry gateway (Routes to Admin or Vendor)
│   │   │
│   │   ├── (Informational, Corporate & Legal)/
│   │   │   ├── about-us/                  # Company story, 32-point inspection lab process
│   │   │   ├── contact/                   # Customer support & grievance officer contact
│   │   │   ├── careers/                   # Job openings & culture
│   │   │   ├── offline-stores/            # Offline retail partner store locations in Bihar
│   │   │   ├── partner-with-us/           # Vendor & technician franchise partnership
│   │   │   ├── press-releases/            # Media coverage & announcements
│   │   │   ├── corporate-information/     # Corporate registration & leadership
│   │   │   ├── community/                 # Tech community & forums
│   │   │   ├── blog/ & articles/          # Refurbished buying guides & tech news
│   │   │   ├── what-is-refurbished/       # Refurbished vs Used vs New explanation guide
│   │   │   ├── faq/                       # Frequently asked questions
│   │   │   ├── privacy-policy/            # Data protection & privacy policy
│   │   │   ├── terms/ & terms-conditions/ # Terms of service
│   │   │   ├── refund-policy/ & return-policy/ # 7-day replacement & refund rules
│   │   │   ├── shipping-policy/           # Pan-India & local delivery timelines
│   │   │   ├── warranty-policy/           # 12-month doorstep warranty coverage
│   │   │   ├── cookie-policy/             # Cookie policy
│   │   │   └── e-waste-policy/            # Environmental e-waste handling policy
│   │   │
│   │   └── api/                           # Next.js Serverless Route Handlers
│   │       ├── admin/
│   │       │   ├── live-alerts/route.js   # Real-time polling for new Sell & Purchase orders
│   │       │   ├── payouts/route.js       # Admin vendor commission ledger & statistics
│   │       │   ├── payouts/settle/route.js # 1-Click weekly settlement execution with UTR
│   │       │   ├── sell-orders/route.js   # Customer trade-in requests API
│   │       │   ├── valuation/route.js     # Valuation engine rules API
│   │       │   ├── products/route.js      # Admin product management API
│   │       │   └── [...slug]/route.js     # Universal admin telemetry & sub-routes
│   │       ├── shipping/
│   │       │   ├── generate-awb/route.js  # 1-Click Delhivery / Shiprocket AWB generator
│   │       │   ├── label/[id]/route.js    # Print-ready Barcode Shipping Label HTML / PDF
│   │       │   └── track/[id]/route.js    # Live milestone tracking API
│   │       ├── vendor/
│   │       │   ├── payouts/route.js       # Vendor commission & weekly settlement ledger API
│   │       │   └── bank-details/route.js  # Vendor bank account & UPI settings API
│   │       ├── orders/                    # Customer order placement & history API
│   │       ├── serviceability/            # Pincode check API (Pan-India & West Champaran)
│   │       ├── sell-orders/               # Trade-in order submission API
│   │       └── auth/                      # Authentication proxy API
│   │
│   ├── components/                        # Reusable React UI Components
│   │   ├── AdminHeader.jsx                # Admin top header with Web Audio Bell Ping & Sound Toggle
│   │   ├── AdminSidebar.jsx               # Collapsible accordion sidebar navigation for Admin
│   │   ├── PanelShell.js                  # Master portal wrapper with auth guards (Admin & Vendor)
│   │   ├── Navbar.jsx                     # Customer storefront navigation with live search
│   │   ├── Footer.jsx                     # Comprehensive footer with legal & category links
│   │   ├── SellbarStylePDP.jsx            # Two-column electronics product page with dynamic variants
│   │   ├── BuybackWizard.jsx              # Interactive device valuation step-by-step wizard
│   │   ├── HeroCarousel.jsx               # Cloudinary CDN responsive hero banners slider
│   │   ├── RefurbishedPhonesSection.jsx   # Certified smartphones carousel slider
│   │   ├── RefurbishedLaptopsSection.jsx  # Certified laptops carousel slider
│   │   ├── HotDealsSection.jsx            # Festive flash deals carousel slider
│   │   ├── LoginModal.jsx                 # OTP & phone authentication modal dialog
│   │   ├── DesktopOnlyGuard.jsx           # Guard requiring minimum screen width for admin
│   │   └── ui/                            # Radix UI & Tailwind primitive buttons, cards, dialogs
│   │
│   ├── config/
│   │   ├── cloudinary-mapping.json        # 74/74 local image paths mapped to Cloudinary CDN URLs
│   │   └── products-cache.json            # 24-product snapshot for offline dev fallback
│   │
│   └── lib/
│       ├── panel.js                       # Panel session management (`getPanelSession`, `money`, `fmtDate`)
│       ├── api.js                         # Unified fetch client targeting backend gateway
│       ├── adminNavigationConfig.js       # Complete navigation structure for Admin sidebar
│       ├── productImageHelper.js          # Cloudinary image URL resolver with fallbacks
│       └── db.js                          # Resilient MongoDB connector for Next.js route handlers
│
├── package.json                           # Dependencies (Next.js 16, React 19, Tailwind 4, MUI)
├── next.config.mjs                        # Next.js configuration & image domains
├── server.js                              # Custom Node.js production server wrapper
└── README.md                              # This file
```

---

## 1. Public Storefront Pages & Catalog

All public pages are server-rendered with Next.js 16 App Router for optimal SEO, Core Web Vitals, and OpenGraph social previews:

1. **Homepage (`src/app/page.js`)**:
   - `HeroCarousel`: Hero banners served from Cloudinary CDN.
   - `SellYourOldDeviceSection`: Grid of 10 device categories for instant trade-in.
   - `RefurbishedPhonesSection` & `RefurbishedLaptopsSection`: Dynamic carousels with price, specs, warranty badge, and savings calculation.
   - `OurServicesSection`: 32-point inspection guarantee, 12-month doorstep warranty, 7-day replacement.
2. **Electronics Single Product Detail Page (`src/app/product/[slug]/page.js`)**:
   - **Dynamic Variant Switching**: Storage (128GB, 256GB, 512GB), RAM (6GB, 8GB), Color swatches with live image updates.
   - **Grading Transparency**: Clear breakdown for *Flawless (Grade A++)*, *Superb (Grade A+)*, and *Good (Grade A)*.
   - **Pricing & Savings**: MRP strikethrough, discount %, No-Cost EMI calculator, and Pincode delivery checker.
   - **Inspection Report**: Full 32-point hardware checklist (Battery health, display, cameras, motherboard).
3. **Certified Refurbished Category Catalogs**:
   - `/buy-refurbished-mobile-phones`: Brand filters (Apple, Samsung, OnePlus, Xiaomi) + budget sliders.
   - `/buy-refurbished-laptops`: Processor filters (Core i5, i7, Apple M1/M2/M3) + RAM/SSD filters.
   - `/buy-refurbished-tablets`, `/buy-refurbished-smart-watches`, `/buy-refurbished-dslr-cameras`, `/buy-refurbished-gaming-consoles`.
4. **Search & Recommendations**:
   - `/search`: Live instant debounced search over titles, brands, and SKUs.
   - `/find-new-phone`: Interactive recommendation wizard based on budget and usage.

---

## 2. Recommerce & Sell Old Device Pages

Cashify-style device buyback valuation engine with instant price estimation and free doorstep pickup:

1. **Trade-In Hub (`/sell`)**:
   - Master directory of all 10 sellable electronics categories.
2. **Smartphone Valuation Wizard (`/sell-old-mobile-phone`)**:
   - **Step 1 - Brand & Model**: Choose from 15+ verified brands (`/sell-old-mobile-phone/[brand]/[model]`).
   - **Step 2 - Variant & Storage**: Select RAM, storage capacity, and color.
   - **Step 3 - Condition Assessment**: 4-part questionnaire covering screen condition (scratches/cracks), body condition, functional issues, and original accessories (box, charger, bill).
   - **Instant Offer Calculation**: Live algorithm calculates final cash offer.
   - **Doorstep Pickup Booking (`/order-confirmed`)**: Customer enters address, PIN code, preferred pickup date, and time slot.
   - **Instant Payout Selection**: Customer selects payout via UPI ID or direct Bank Account transfer (processed immediately upon technician inspection).
3. **Other Device Calculators**:
   - `/sell-old-laptop`, `/sell-old-tablet`, `/sell-old-smart-watch`, `/sell-old-television`, `/sell-old-dslr-camera`, `/sell-old-gaming-consoles`, `/sell-old-earbuds`, `/sell-old-smart-speaker`, `/sell-old-imac`.

---

## 3. Cart, Checkout & Order Confirmation

1. **Shopping Cart (`/cart`)**:
   - Reactive item quantity modifiers (`+` / `-`).
   - Dynamic order summary calculating subtotal, delivery charges, and coupon discount.
   - Multi-tab synchronization using browser `storage` and `sellbar-cart-updated` events.
2. **Secure Multi-Step Checkout (`/checkout`)**:
   - **Step 1 - Delivery Address**: Full name, contact phone, street address, and 6-digit Indian PIN code.
   - **Step 2 - Serviceability & Courier**: Automatically identifies West Champaran local fleet (24-48 hr) or Pan-India priority courier (3-5 days).
   - **Step 3 - Payment Options**:
     - Cash on Delivery (COD) with doorstep verification.
     - Online Payment via Razorpay (UPI, Credit/Debit Cards, NetBanking).
3. **Order Confirmation (`/order-confirmed`)**:
   - Order receipt, tracking summary, estimated delivery date, and instant invoice download link.

---

## 4. Customer / User Dashboard (`/account`)

The customer dashboard allows users to manage their orders, sold devices, warranties, and addresses:

| Route Path | File Location | Key Capabilities & Features |
|---|---|---|
| `/account` | `src/app/account/page.js` | **Customer Overview**: Recent orders summary, active trade-in requests, quick links |
| `/account/orders` | `src/app/account/orders/page.js` | **Purchase Orders**: Order status tracking, purchased items, invoice download |
| `/account/sell-orders` | `src/app/account/sell-orders/page.js` | **Device Selling Requests**: Pickup appointment date, assigned technician, doorstep QC status |
| `/account/payouts` | `src/app/account/payouts/page.js` | **Device Sale Payouts**: Real-time UPI & Bank transfer payment status for sold phones |
| `/account/warranty` | `src/app/account/warranty/page.js` | **Certified Warranty Cards**: Active 6-12 month warranty certificates & 1-click doorstep claim |
| `/account/addresses` | `src/app/account/addresses/page.js` | **Saved Addresses**: Add, edit, or delete shipping and doorstep pickup addresses |
| `/account/reviews` | `src/app/account/reviews/page.js` | **My Reviews**: Customer submitted ratings, reviews, and unboxing photos |
| `/account/profile` | `src/app/account/profile/page.js` | **Profile Settings**: Update name, email, phone number, and security password |
| `/track-order` | `src/app/track-order/page.js` | **Live Consignment Tracking**: Input Order ID or AWB to track milestones from Bettiah Hub |
| `/wishlist` | `src/app/wishlist/page.js` | **Saved Wishlist**: Gadgets saved for later with instant "Move to Cart" button |

---

## 5. Admin Master Control Center (`/admin`)

The Admin Control Center gives platform owners enterprise-grade tools for operations, logistics, vendor management, and real-time monitoring.

### 🔔 Real-time Audio Alert Notification Bell (Feature E)
- **Location**: `src/components/AdminHeader.jsx` & `/api/admin/live-alerts`
- **How it works**:
  - The Admin panel polls `/api/admin/live-alerts` every **7 seconds**.
  - It tracks two streams: **New Store Purchase Orders (`Order`)** and **New Old Phone Sell Requests (`SellOrder`)**.
  - When an order arrives:
    1. Triggers a **Web Audio API two-tone bell chime ping** (880 Hz $\rightarrow$ 1318.5 Hz) synthesized natively in the browser.
    2. Displays a floating live alert toast at the top-right corner with order details and a "View" button.
    3. Increments the notification badge count.
  - **Sound Controls**: Includes a **[ 🔊 Sound Alert ON ]** toggle button in the header and a **"🔔 Test Sound"** button inside the notifications dropdown.

### 🚚 Pan-India Logistics & Barcode Shipping Labels (Feature C)
- **Location**: `src/app/admin/shipping/page.js` (or via `/admin/[...slug]`), `src/app/admin/orders/page.js`, `/api/shipping/*`
- **Features**:
  - **1-Click AWB Generation**: Automatically assigns courier partners (Delhivery Surface, Shiprocket Express, or Sellbar Local Fleet) and generates unique tracking numbers.
  - **Printable Barcode Shipping Labels (`/api/shipping/label/:orderId`)**: Generates official 4x6" thermal labels with Code-128 barcodes, consignee details, return addresses, and COD collect amounts.
  - **Live Consignment Tracking (`/api/shipping/track/:id`)**: Milestone status from manifest creation to doorstep delivery.
  - **Pan-India Pincode Checker**: Validates any 6-digit Indian PIN code.

### 💰 Vendor Payouts & Commission Settlements (Feature D)
- **Location**: `src/app/admin/payouts/page.js` (or via `/admin/[...slug]`), `/api/admin/payouts`
- **Features**:
  - **Platform Commission Overview**: Platform Gross Sales, Sellbar Fee (10%), Total Disbursed, and Pending Balances.
  - **Vendor Settlement Table**: Lists all vendor stores with their registered bank accounts, commission rates, and pending balances.
  - **1-Click Weekly Settlement Trigger**: Allows the Admin to record a Bank UTR number, settle pending balances, and generate a settlement transfer record.

---

## 6. Vendor / Merchant Partner Portal (`/vendor`)

The Vendor Portal is designed for certified refurbishment sellers to manage listings, dispatches, and financials:

| Route Path | File Location | Key Capabilities & Features |
|---|---|---|
| `/vendor` | `src/app/vendor/page.js` | **Vendor Dashboard**: Daily sales metrics, low stock warnings, revenue |
| `/vendor/login` | `src/app/vendor/login/page.js` | **Merchant Login**: Secure JWT authentication for verified sellers |
| `/vendor/signup` | `src/app/vendor/signup/page.js` | **Merchant Registration**: Business onboarding, GST/PAN submission, store profile |
| `/vendor/products` | `src/app/vendor/products/page.js` | **Inventory Table**: Live stock toggles, price updates, status filters |
| `/vendor/products/new` | `src/app/vendor/products/new/page.js` | **Add Product Wizard**: Multi-image Cloudinary upload, condition grading, variant matrix |
| `/vendor/products/[id]` | `src/app/vendor/products/[id]/page.js` | **Product Editor**: Modify specs, restock variants, adjust prices |
| `/vendor/orders` | `src/app/vendor/orders/page.js` | **Order Fulfillment**: 1-Click AWB generation, print barcode labels, track dispatches |
| `/vendor/payouts` | `src/app/vendor/payouts/page.js` | **Commission & Ledger**: 10% auto-deduction breakdown, bank setup, weekly transfers |
| `/vendor/profile` | `src/app/vendor/profile/page.js` | **Store Settings**: Warehouse address, contact details, store branding |

### ⚡ 1-Click AWB Generation & Label Printing
Inside `/vendor/orders`, each order card includes:
- **"⚡ 1-Click Generate Delhivery / Shiprocket AWB"**: Instantly generates an AWB number.
- **"🖨️ Print Barcode Label PDF"**: Opens the print-ready shipping label in a dedicated window.
- **"Track Milestone"**: Displays real-time transit milestones.
- **Automated Commission Strip**: Shows Gross Order Total, Sellbar Platform Fee (10%), and Vendor Net Earnings.

### 💵 Vendor Commission & Payout Ledger Page (`/vendor/payouts`)
- **4 Financial KPI Cards**: Pending Balance, Settled to Bank, Gross Sales, and Sellbar Fee (10%).
- **Bank Account Setup Card**: Form to save Account Holder, Account Number, IFSC Code, Bank Name, Branch, and UPI ID.
- **Weekly Bank Settlement History**: Complete audit table of all weekly disbursements with UTR numbers.
- **Itemized Order Commission Ledger**: Order-by-order breakdown of the 10% platform fee and net earnings.

---

## 7. Next.js API Route Handlers (`src/app/api`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/admin/live-alerts?since=...` | **Real-time Audio Alert API**: Checks for new purchase orders and sell requests |
| `GET` | `/api/admin/payouts` | **Admin Payouts API**: Platform gross, commission earned, and vendor balances |
| `POST` | `/api/admin/payouts/settle` | **Admin Settle API**: 1-click payout execution with Bank UTR recording |
| `POST` | `/api/shipping/generate-awb` | **AWB Generator**: 1-click Delhivery / Shiprocket tracking number generation |
| `GET` | `/api/shipping/label/[id]` | **Barcode Label HTML/PDF**: Renders printable Code-128 shipping label |
| `GET` | `/api/shipping/track/[id]` | **Tracking API**: Real-time consignment transit milestones |
| `GET` | `/api/vendor/payouts` | **Vendor Payouts API**: Vendor earnings, 10% fee deduction, and settlements |
| `PATCH` | `/api/vendor/bank-details` | **Bank Details API**: Updates vendor bank account and UPI details |
| `GET/POST`| `/api/orders` | **Customer Orders API**: Order creation and retrieval |
| `GET` | `/api/serviceability/check?pincode=...` | **Pincode API**: Pan-India & West Champaran delivery validation |

---

## 8. Key Components & Shared Libraries

- `src/components/AdminHeader.jsx`: Top navigation for admin with Web Audio bell chime, sound toggle, and live toast alerts.
- `src/components/AdminSidebar.jsx`: Collapsible multi-level accordion sidebar with active route highlighting.
- `src/components/PanelShell.js`: Universal dashboard layout wrapper enforcing role validation (`admin` or `vendor`).
- `src/components/SellbarStylePDP.jsx`: Complete two-column electronics product detail component with real-time variant switching.
- `src/lib/panel.js`: Helper functions: `getPanelSession`, `money` (₹ formatter), `fmtDate`, and `panelRequest`.
- `src/lib/adminNavigationConfig.js`: Master menu configuration for the Admin sidebar (all 20 modules).
- `src/lib/productImageHelper.js`: Resolves product images with automatic Cloudinary CDN and fallback handling.

---

## 9. Setup, Environment Variables & Development

### 1. Prerequisites
- Node.js 20.x or 22.x LTS
- npm 10+

### 2. Environment Variables (`.env.local` or `.env`)
```bash
# Backend REST API Gateway URL
NEXT_PUBLIC_API_URL=https://app.sellbar.in/api

# MongoDB Atlas connection (for internal Next.js API routes)
MONGODB_URI=mongodb+srv://sellbar3_db_user:SwkiSitTUWtSeMBR@cluster0.foqbgdq.mongodb.net/sellbar?retryWrites=true&w=majority

# Cloudinary CDN Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dbd4anwt
```

### 3. Installation & Running
```bash
# Navigate to frontend folder
cd sellbar-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
