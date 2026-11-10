/**
 * Sellbar Mobile Database & Catalog for Sell Old Mobile Phone Module
 */

export const POPULAR_BRANDS = [
  { id: "apple", name: "Apple", slug: "apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", count: 12 },
  { id: "samsung", name: "Samsung", slug: "samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", count: 14 },
  { id: "oneplus", name: "OnePlus", slug: "oneplus", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/OnePlus_logo.svg", count: 8 },
  { id: "xiaomi", name: "Xiaomi", slug: "xiaomi", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg", count: 10 },
  { id: "vivo", name: "Vivo", slug: "vivo", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.png", count: 8 },
  { id: "oppo", name: "Oppo", slug: "oppo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/OPPO_Logo.svg", count: 6 },
  { id: "realme", name: "Realme", slug: "realme", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Realme_logo.svg", count: 6 },
  { id: "google", name: "Google Pixel", slug: "google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", count: 5 },
  { id: "motorola", name: "Motorola", slug: "motorola", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Motorola_new_logo.svg", count: 5 },
];

export const MOBILE_MODELS = [
  // ================= APPLE =================
  {
    id: "apple-iphone-17-pro",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 17 Pro",
    slug: "iphone-17-pro",
    series: "iPhone 17 Series",
    launchYear: 2025,
    launchPrice: 154900,
    baseResalePrice: 105000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 100,
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", color: "Natural Titanium", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "512GB", color: "Natural Titanium", priceDelta: 12000 },
      { id: "v3", ram: "12GB", storage: "1TB", color: "Dark Titanium", priceDelta: 25000 },
    ],
    specs: {
      display: "6.3-inch LTPO Super Retina XDR OLED 120Hz ProMotion (3000 nits)",
      processor: "Apple A19 Pro 2nm Chip (Hardware Ray Tracing)",
      rearCamera: "48MP Fusion + 48MP Ultra Wide + 48MP 5x Telephoto",
      frontCamera: "24MP TrueDepth with Center Stage",
      battery: "3,988 mAh with 40W Fast Charging & 25W MagSafe",
      os: "iOS 19 (Apple Intelligence)",
      weight: "194g",
    },
  },
  {
    id: "apple-iphone-16-pro",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 16 Pro",
    slug: "iphone-16-pro",
    series: "iPhone 16 Series",
    launchYear: 2024,
    launchPrice: 119900,
    baseResalePrice: 84000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 99,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Natural Titanium", priceDelta: 0 },
      { id: "v2", ram: "8GB", storage: "256GB", color: "Black Titanium", priceDelta: 6000 },
      { id: "v3", ram: "8GB", storage: "512GB", color: "Desert Titanium", priceDelta: 12000 },
      { id: "v4", ram: "8GB", storage: "1TB", color: "White Titanium", priceDelta: 18000 },
    ],
    specs: {
      display: "6.3-inch Super Retina XDR OLED 120Hz ProMotion",
      processor: "Apple A18 Pro 3nm Chip",
      rearCamera: "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      frontCamera: "12MP TrueDepth Camera",
      battery: "3,582 mAh with MagSafe Fast Wireless Charging",
      os: "iOS 18",
      weight: "199g",
    },
  },
  {
    id: "apple-iphone-15-pro-max",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    series: "iPhone 15 Series",
    launchYear: 2023,
    launchPrice: 159900,
    baseResalePrice: 76000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 98,
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", color: "Natural Titanium", priceDelta: 0 },
      { id: "v2", ram: "8GB", storage: "512GB", color: "Blue Titanium", priceDelta: 7000 },
      { id: "v3", ram: "8GB", storage: "1TB", color: "Black Titanium", priceDelta: 14000 },
    ],
    specs: {
      display: "6.7-inch Super Retina XDR OLED 120Hz ProMotion",
      processor: "Apple A17 Pro Chip",
      rearCamera: "48MP Main + 12MP 5x Telephoto + 12MP Ultra-Wide",
      frontCamera: "12MP TrueDepth",
      battery: "4,422 mAh with USB-C 3.0",
      os: "iOS 17 (Upgradable to iOS 18)",
      weight: "221g",
    },
  },
  {
    id: "apple-iphone-15",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 15",
    slug: "iphone-15",
    series: "iPhone 15 Series",
    launchYear: 2023,
    launchPrice: 79900,
    baseResalePrice: 48000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 97,
    variants: [
      { id: "v1", ram: "6GB", storage: "128GB", color: "Black", priceDelta: 0 },
      { id: "v2", ram: "6GB", storage: "256GB", color: "Blue", priceDelta: 5000 },
      { id: "v3", ram: "6GB", storage: "512GB", color: "Pink", priceDelta: 10000 },
    ],
    specs: {
      display: "6.1-inch Super Retina XDR OLED with Dynamic Island",
      processor: "Apple A16 Bionic",
      rearCamera: "48MP Dual Camera System",
      frontCamera: "12MP TrueDepth",
      battery: "3,349 mAh USB-C",
      os: "iOS 17",
      weight: "171g",
    },
  },
  {
    id: "apple-iphone-14",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 14",
    slug: "iphone-14",
    series: "iPhone 14 Series",
    launchYear: 2022,
    launchPrice: 79900,
    baseResalePrice: 36000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 96,
    variants: [
      { id: "v1", ram: "6GB", storage: "128GB", color: "Midnight", priceDelta: 0 },
      { id: "v2", ram: "6GB", storage: "256GB", color: "Starlight", priceDelta: 4500 },
      { id: "v3", ram: "6GB", storage: "512GB", color: "Blue", priceDelta: 9000 },
    ],
    specs: {
      display: "6.1-inch Super Retina XDR OLED Display",
      processor: "Apple A15 Bionic (5-core GPU)",
      rearCamera: "12MP Main + 12MP Ultra-Wide",
      frontCamera: "12MP Autofocus",
      battery: "3,279 mAh with MagSafe",
      os: "iOS 16",
      weight: "172g",
    },
  },
  {
    id: "apple-iphone-13",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 13",
    slug: "iphone-13",
    series: "iPhone 13 Series",
    launchYear: 2021,
    launchPrice: 79900,
    baseResalePrice: 30000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 95,
    variants: [
      { id: "v1", ram: "4GB", storage: "128GB", color: "Midnight", priceDelta: 0 },
      { id: "v2", ram: "4GB", storage: "256GB", color: "Starlight", priceDelta: 4000 },
      { id: "v3", ram: "4GB", storage: "512GB", color: "Green", priceDelta: 8000 },
    ],
    specs: {
      display: "6.1-inch Super Retina XDR OLED",
      processor: "Apple A15 Bionic",
      rearCamera: "12MP Wide with Sensor-Shift OIS + 12MP Ultra-Wide",
      frontCamera: "12MP TrueDepth",
      battery: "3,240 mAh",
      os: "iOS 15",
      weight: "174g",
    },
  },
  {
    id: "apple-iphone-12",
    brand: "Apple",
    brandSlug: "apple",
    name: "Apple iPhone 12",
    slug: "iphone-12",
    series: "iPhone 12 Series",
    launchYear: 2020,
    launchPrice: 79900,
    baseResalePrice: 22000,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 91,
    variants: [
      { id: "v1", ram: "4GB", storage: "64GB", color: "Black", priceDelta: 0 },
      { id: "v2", ram: "4GB", storage: "128GB", color: "White", priceDelta: 3000 },
      { id: "v3", ram: "4GB", storage: "256GB", color: "Blue", priceDelta: 6000 },
    ],
    specs: {
      display: "6.1-inch Super Retina XDR OLED",
      processor: "Apple A14 Bionic",
      rearCamera: "12MP + 12MP Ultra-Wide",
      frontCamera: "12MP TrueDepth",
      battery: "2,815 mAh",
      os: "iOS 14",
      weight: "164g",
    },
  },

  // ================= SAMSUNG =================
  {
    id: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    brandSlug: "samsung",
    name: "Samsung Galaxy S24 Ultra 5G",
    slug: "galaxy-s24-ultra",
    series: "Galaxy S Series",
    launchYear: 2024,
    launchPrice: 129999,
    baseResalePrice: 72000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 98,
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", color: "Titanium Gray", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "512GB", color: "Titanium Black", priceDelta: 7000 },
      { id: "v3", ram: "12GB", storage: "1TB", color: "Titanium Violet", priceDelta: 15000 },
    ],
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X 120Hz (Corning Gorilla Armor)",
      processor: "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
      rearCamera: "200MP Quad Camera with 5x Periscope & 100x Space Zoom",
      frontCamera: "12MP Dual Pixel AF",
      battery: "5,000 mAh with 45W Fast Charging & Integrated S-Pen",
      os: "One UI 6.1 (Android 14) with Galaxy AI",
      weight: "232g",
    },
  },
  {
    id: "samsung-galaxy-s23",
    brand: "Samsung",
    brandSlug: "samsung",
    name: "Samsung Galaxy S23 5G",
    slug: "galaxy-s23",
    series: "Galaxy S Series",
    launchYear: 2023,
    launchPrice: 74999,
    baseResalePrice: 33000,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 94,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Phantom Black", priceDelta: 0 },
      { id: "v2", ram: "8GB", storage: "256GB", color: "Cream", priceDelta: 4000 },
    ],
    specs: {
      display: "6.1-inch Dynamic AMOLED 2X 120Hz",
      processor: "Snapdragon 8 Gen 2 Mobile Platform for Galaxy",
      rearCamera: "50MP Main + 10MP Telephoto 3x + 12MP Ultra-Wide",
      frontCamera: "12MP",
      battery: "3,900 mAh",
      os: "Android 13 (Upgradable to Android 14)",
      weight: "168g",
    },
  },
  {
    id: "samsung-galaxy-z-fold-5",
    brand: "Samsung",
    brandSlug: "samsung",
    name: "Samsung Galaxy Z Fold 5 5G",
    slug: "galaxy-z-fold-5",
    series: "Galaxy Z Series",
    launchYear: 2023,
    launchPrice: 154999,
    baseResalePrice: 65000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 93,
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", color: "Icy Blue", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "512GB", color: "Phantom Black", priceDelta: 8000 },
    ],
    specs: {
      display: "7.6-inch Foldable Dynamic AMOLED 2X + 6.2-inch Cover Screen",
      processor: "Snapdragon 8 Gen 2 for Galaxy",
      rearCamera: "50MP + 12MP Telephoto + 12MP Ultra Wide",
      frontCamera: "4MP Under Display + 10MP Cover Camera",
      battery: "4,400 mAh",
      os: "Android 13 with Multi-Active Window",
      weight: "253g",
    },
  },
  {
    id: "samsung-galaxy-a55-5g",
    brand: "Samsung",
    brandSlug: "samsung",
    name: "Samsung Galaxy A55 5G",
    slug: "galaxy-a55-5g",
    series: "Galaxy A Series",
    launchYear: 2024,
    launchPrice: 39999,
    baseResalePrice: 22000,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 90,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Awesome Iceblue", priceDelta: 0 },
      { id: "v2", ram: "8GB", storage: "256GB", color: "Awesome Navy", priceDelta: 3000 },
      { id: "v3", ram: "12GB", storage: "256GB", color: "Awesome Lemon", priceDelta: 5000 },
    ],
    specs: {
      display: "6.6-inch Super AMOLED 120Hz with Vision Booster",
      processor: "Exynos 1480 with AMD Xclipse 530 GPU",
      rearCamera: "50MP OIS + 12MP Ultra-Wide + 5MP Macro",
      frontCamera: "32MP",
      battery: "5,000 mAh with IP67 water resistance",
      os: "One UI 6.1 (Android 14)",
      weight: "213g",
    },
  },

  // ================= ONEPLUS =================
  {
    id: "oneplus-12-5g",
    brand: "OnePlus",
    brandSlug: "oneplus",
    name: "OnePlus 12 5G",
    slug: "oneplus-12-5g",
    series: "Number Series",
    launchYear: 2024,
    launchPrice: 64999,
    baseResalePrice: 38000,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 95,
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", color: "Silky Black", priceDelta: 0 },
      { id: "v2", ram: "16GB", storage: "512GB", color: "Flowy Emerald", priceDelta: 5000 },
    ],
    specs: {
      display: "6.82-inch 2K 120Hz ProXDR AMOLED (4500 nits peak)",
      processor: "Snapdragon 8 Gen 3 Mobile Platform",
      rearCamera: "4th Gen Hasselblad Camera (50MP + 64MP 3x Periscope + 48MP)",
      frontCamera: "32MP",
      battery: "5,400 mAh with 100W SUPERVOOC + 50W AIRVOOC",
      os: "OxygenOS 14 (Android 14)",
      weight: "220g",
    },
  },
  {
    id: "oneplus-11-5g",
    brand: "OnePlus",
    brandSlug: "oneplus",
    name: "OnePlus 11 5G",
    slug: "oneplus-11-5g",
    series: "Number Series",
    launchYear: 2023,
    launchPrice: 56999,
    baseResalePrice: 28000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 92,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Titan Black", priceDelta: 0 },
      { id: "v2", ram: "16GB", storage: "256GB", color: "Eternal Green", priceDelta: 4000 },
    ],
    specs: {
      display: "6.7-inch 2K 120Hz Fluid AMOLED",
      processor: "Snapdragon 8 Gen 2",
      rearCamera: "50MP Hasselblad Triple Camera",
      frontCamera: "16MP",
      battery: "5,000 mAh with 100W SUPERVOOC",
      os: "OxygenOS 13",
      weight: "205g",
    },
  },
  {
    id: "oneplus-nord-ce-4",
    brand: "OnePlus",
    brandSlug: "oneplus",
    name: "OnePlus Nord CE 4 5G",
    slug: "oneplus-nord-ce-4",
    series: "Nord Series",
    launchYear: 2024,
    launchPrice: 24999,
    baseResalePrice: 14000,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 89,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Dark Chrome", priceDelta: 0 },
      { id: "v2", ram: "8GB", storage: "256GB", color: "Celadon Marble", priceDelta: 2000 },
    ],
    specs: {
      display: "6.7-inch FHD+ 120Hz AMOLED",
      processor: "Snapdragon 7 Gen 3",
      rearCamera: "50MP Sony LYT-600 OIS + 8MP Ultra-Wide",
      frontCamera: "16MP",
      battery: "5,500 mAh with 100W Fast Charging",
      os: "OxygenOS 14",
      weight: "186g",
    },
  },

  // ================= XIAOMI =================
  {
    id: "xiaomi-14-pro",
    brand: "Xiaomi",
    brandSlug: "xiaomi",
    name: "Xiaomi 14 Pro 5G",
    slug: "xiaomi-14-pro",
    series: "Xiaomi Flagship",
    launchYear: 2024,
    launchPrice: 79999,
    baseResalePrice: 42000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 92,
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", color: "Black", priceDelta: 0 },
      { id: "v2", ram: "16GB", storage: "512GB", color: "Jade Green", priceDelta: 6000 },
    ],
    specs: {
      display: "6.73-inch 2K LTPO 120Hz OLED (Leica Summilux)",
      processor: "Snapdragon 8 Gen 3",
      rearCamera: "50MP Leica Variable Aperture + 50MP 75mm Floating Telephoto + 50MP",
      frontCamera: "32MP",
      battery: "4,880 mAh with 120W HyperCharge",
      os: "Xiaomi HyperOS (Android 14)",
      weight: "223g",
    },
  },
  {
    id: "xiaomi-redmi-note-13-pro-plus",
    brand: "Xiaomi",
    brandSlug: "xiaomi",
    name: "Redmi Note 13 Pro+ 5G",
    slug: "redmi-note-13-pro-plus",
    series: "Redmi Note Series",
    launchYear: 2024,
    launchPrice: 31999,
    baseResalePrice: 17500,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 91,
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", color: "Fusion Black", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "256GB", color: "Fusion Purple", priceDelta: 2000 },
      { id: "v3", ram: "12GB", storage: "512GB", color: "Fusion White", priceDelta: 4000 },
    ],
    specs: {
      display: "6.67-inch 1.5K Curved AMOLED 120Hz (Corning Gorilla Glass Victus)",
      processor: "MediaTek Dimensity 7200-Ultra (4nm)",
      rearCamera: "200MP Samsung ISOCELL HP3 with OIS + 8MP + 2MP",
      frontCamera: "16MP",
      battery: "5,000 mAh with 120W HyperCharge (IP68)",
      os: "MIUI 14 / HyperOS",
      weight: "204g",
    },
  },

  // ================= VIVO =================
  {
    id: "vivo-v30-pro-5g",
    brand: "Vivo",
    brandSlug: "vivo",
    name: "Vivo V30 Pro 5G (V300 Pro)",
    slug: "vivo-v30-pro-5g",
    series: "V Series",
    launchYear: 2024,
    launchPrice: 46999,
    baseResalePrice: 28000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 95,
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", color: "Andaman Blue", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "512GB", color: "Classic Black", priceDelta: 4000 },
    ],
    specs: {
      display: "6.78-inch 1.5K 120Hz 3D Curved AMOLED (2800 nits)",
      processor: "MediaTek Dimensity 8200 4nm Flagship Chip",
      rearCamera: "Triple 50MP ZEISS (IMX920 OIS + 2x Telephoto + Ultra-Wide) + Smart Aura Light",
      frontCamera: "50MP Eye AF Selfie Camera",
      battery: "5,000 mAh with 80W FlashCharge",
      os: "Funtouch OS 14 (Android 14)",
      weight: "188g",
    },
  },
  {
    id: "vivo-x100-pro",
    brand: "Vivo",
    brandSlug: "vivo",
    name: "Vivo X100 Pro 5G",
    slug: "vivo-x100-pro",
    series: "X Series",
    launchYear: 2024,
    launchPrice: 89999,
    baseResalePrice: 48000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 92,
    variants: [
      { id: "v1", ram: "16GB", storage: "512GB", color: "Asteroid Black", priceDelta: 0 },
    ],
    specs: {
      display: "6.78-inch 1.5K LTPO AMOLED 120Hz",
      processor: "MediaTek Dimensity 9300 + Vivo V3 Chip",
      rearCamera: "50MP 1-inch Sony IMX989 + 50MP ZEISS APO Telephoto + 50MP",
      frontCamera: "32MP",
      battery: "5,400 mAh with 100W FlashCharge",
      os: "Funtouch OS 14 (Android 14)",
      weight: "225g",
    },
  },
  {
    id: "vivo-v29-5g",
    brand: "Vivo",
    brandSlug: "vivo",
    name: "Vivo V29 5G",
    slug: "vivo-v29-5g",
    series: "V Series",
    launchYear: 2023,
    launchPrice: 32999,
    baseResalePrice: 16500,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 88,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Himalayan Blue", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "256GB", color: "Space Black", priceDelta: 2500 },
    ],
    specs: {
      display: "6.78-inch 1.5K 3D Curved AMOLED 120Hz",
      processor: "Qualcomm Snapdragon 778G",
      rearCamera: "50MP OIS Night Camera with Smart Aura Light + 8MP + 2MP",
      frontCamera: "50MP Eye AF Selfie Camera",
      battery: "4,600 mAh with 80W FlashCharge",
      os: "Funtouch OS 13",
      weight: "186g",
    },
  },

  // ================= GOOGLE PIXEL =================
  {
    id: "google-pixel-8-pro",
    brand: "Google Pixel",
    brandSlug: "google",
    name: "Google Pixel 8 Pro",
    slug: "pixel-8-pro",
    series: "Pixel Series",
    launchYear: 2023,
    launchPrice: 106999,
    baseResalePrice: 52000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 94,
    variants: [
      { id: "v1", ram: "12GB", storage: "128GB", color: "Bay Blue", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "256GB", color: "Obsidian", priceDelta: 5000 },
    ],
    specs: {
      display: "6.7-inch Super Actua LTPO OLED 120Hz (2400 nits peak)",
      processor: "Google Tensor G3 with Titan M2 security",
      rearCamera: "50MP Octa PD + 48MP Quad PD Telephoto 5x + 48MP Ultra-Wide",
      frontCamera: "10.5MP Dual PD with AF",
      battery: "5,050 mAh with temperature sensor",
      os: "Android 14 with 7 years of OS updates",
      weight: "213g",
    },
  },
  {
    id: "google-pixel-8",
    brand: "Google Pixel",
    brandSlug: "google",
    name: "Google Pixel 8",
    slug: "pixel-8",
    series: "Pixel Series",
    launchYear: 2023,
    launchPrice: 75999,
    baseResalePrice: 32000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 91,
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", color: "Hazel", priceDelta: 0 },
      { id: "v2", ram: "8GB", storage: "256GB", color: "Rose", priceDelta: 4000 },
    ],
    specs: {
      display: "6.2-inch Actua OLED 120Hz",
      processor: "Google Tensor G3",
      rearCamera: "50MP Octa PD + 12MP Ultra-Wide with Macro Focus",
      frontCamera: "10.5MP",
      battery: "4,575 mAh",
      os: "Android 14",
      weight: "187g",
    },
  },

  // ================= MOTOROLA =================
  {
    id: "motorola-edge-50-pro",
    brand: "Motorola",
    brandSlug: "motorola",
    name: "Motorola Edge 50 Pro 5G",
    slug: "edge-50-pro",
    series: "Edge Series",
    launchYear: 2024,
    launchPrice: 35999,
    baseResalePrice: 21000,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    network: "5G",
    popularity: 89,
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", color: "Luxe Lavender", priceDelta: 0 },
      { id: "v2", ram: "12GB", storage: "256GB", color: "Black Beauty", priceDelta: 3000 },
    ],
    specs: {
      display: "6.7-inch 1.5K 144Hz pOLED 3D Curved (Pantone Validated)",
      processor: "Qualcomm Snapdragon 7 Gen 3",
      rearCamera: "50MP OIS + 13MP Macro/Ultra-Wide + 10MP 3x Telephoto",
      frontCamera: "50MP Quad Pixel with AF",
      battery: "4,500 mAh with 125W TurboPower + 50W Wireless (IP68)",
      os: "Hello UI (Android 14)",
      weight: "186g",
    },
  },
];

/**
 * Helper to query models with multi-faceted filtering & sorting
 */
export function queryMobileModels({
  brand = "",
  search = "",
  ram = [],
  storage = [],
  network = "",
  minPrice = 0,
  maxPrice = 1000000,
  sortBy = "popularity",
} = {}) {
  let list = [...MOBILE_MODELS];

  // Brand filter (case-insensitive)
  if (brand && brand.toLowerCase() !== "all") {
    list = list.filter(
      (m) =>
        m.brandSlug.toLowerCase() === brand.toLowerCase() ||
        m.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // Keyword Search across brand, name, series
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.series.toLowerCase().includes(q) ||
        m.slug.toLowerCase().includes(q)
    );
  }

  // RAM filter
  if (ram && ram.length > 0) {
    list = list.filter((m) =>
      m.variants.some((v) => ram.includes(v.ram))
    );
  }

  // Storage filter
  if (storage && storage.length > 0) {
    list = list.filter((m) =>
      m.variants.some((v) => storage.includes(v.storage))
    );
  }

  // Network filter (4G / 5G)
  if (network && network !== "all") {
    list = list.filter((m) => m.network.toUpperCase() === network.toUpperCase());
  }

  // Price Range filter
  if (minPrice > 0 || maxPrice < 1000000) {
    list = list.filter((m) => {
      const price = m.baseResalePrice;
      return price >= minPrice && price <= maxPrice;
    });
  }

  // Sorting
  switch (sortBy) {
    case "price-desc":
      list.sort((a, b) => b.baseResalePrice - a.baseResalePrice);
      break;
    case "price-asc":
      list.sort((a, b) => a.baseResalePrice - b.baseResalePrice);
      break;
    case "newest":
      list.sort((a, b) => b.launchYear - a.launchYear);
      break;
    case "popularity":
    default:
      list.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return list;
}

export function getMobileModelBySlug(brandSlug, modelSlug) {
  return MOBILE_MODELS.find(
    (m) =>
      (m.brandSlug.toLowerCase() === brandSlug.toLowerCase() ||
       m.brand.toLowerCase() === brandSlug.toLowerCase()) &&
      m.slug.toLowerCase() === modelSlug.toLowerCase()
  );
}
