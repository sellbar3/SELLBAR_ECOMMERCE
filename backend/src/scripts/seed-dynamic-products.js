const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const Product = require("../models/Product");
const Category = require("../models/Category");
const Vendor = require("../models/Vendor");

const mappingPath = path.join(__dirname, "../config/cloudinary-mapping.json");
const cloudinaryMap = JSON.parse(fs.readFileSync(mappingPath, "utf8"));

function getCloudinary(localPath) {
  return cloudinaryMap[localPath] || localPath;
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for dynamic products seed");

  // Find approved vendor
  const vendor = await Vendor.findOne({ approvalStatus: "approved", isStoreActive: true });
  if (!vendor) {
    throw new Error("No approved active vendor found to associate products with.");
  }
  console.log(`Using vendor: ${vendor.storeName} (${vendor._id})`);

  // Ensure Categories
  const categoryDefs = [
    {
      name: "Mobile Phones",
      slug: "mobile-phones",
      description: "Certified Refurbished Smartphones with 32-Point Quality Check",
      image: { url: getCloudinary("/services/buy-phone.webp"), publicId: "sellbar/services/buy-phone" },
      sortOrder: 1,
    },
    {
      name: "Laptops",
      slug: "laptop",
      description: "Refurbished Business & Gaming Laptops with Warranty",
      image: { url: getCloudinary("/services/buy-laptops.webp"), publicId: "sellbar/services/buy-laptops" },
      sortOrder: 2,
    },
    {
      name: "Tablets",
      slug: "tablets",
      description: "Apple iPads & Android Tablets in Mint Condition",
      image: { url: getCloudinary("/services/buy-tablets.webp"), publicId: "sellbar/services/buy-tablets" },
      sortOrder: 3,
    },
    {
      name: "Smart Watches",
      slug: "smart-watches",
      description: "Apple Watches and Galaxy Wearables with Battery Health Guarantee",
      image: { url: getCloudinary("/services/buy-smartwatches.webp"), publicId: "sellbar/services/buy-smartwatches" },
      sortOrder: 4,
    },
    {
      name: "Cameras",
      slug: "cameras",
      description: "DSLRs, Mirrorless & Lenses Tested by Optics Experts",
      image: { url: getCloudinary("/services/buy-cameras.webp"), publicId: "sellbar/services/buy-cameras" },
      sortOrder: 5,
    },
    {
      name: "Gaming Consoles",
      slug: "gaming-consoles",
      description: "PlayStation, Xbox & Nintendo Consoles with Controller",
      image: { url: getCloudinary("/services/buy-gaming.webp"), publicId: "sellbar/services/buy-gaming" },
      sortOrder: 6,
    },
  ];

  const categoryMap = {};
  for (const catDef of categoryDefs) {
    let cat = await Category.findOne({ slug: catDef.slug });
    if (!cat) {
      cat = await Category.create({ ...catDef, isActive: true, createdBy: vendor.user });
      console.log(`Created category: ${cat.name}`);
    } else {
      cat.name = catDef.name;
      cat.image = catDef.image;
      cat.isActive = true;
      await cat.save();
      console.log(`Updated category: ${cat.name}`);
    }
    categoryMap[catDef.slug] = cat._id;
  }

  // Product Definitions
  const productsToSeed = [
    // Phones
    {
      name: "OPPO Reno15 Pro 5G - Refurbished",
      slug: "oppo-reno15-pro-5g-refurbished",
      brand: "OPPO",
      category: categoryMap["mobile-phones"],
      price: 54999,
      compareAtPrice: 79999,
      stock: 12,
      sku: "OPP-RENO15-PRO",
      description: "Sellbar Certified OPPO Reno15 Pro 5G with 12GB RAM, 256GB Storage. Features flagship Sony portrait cameras, 80W SuperVOOC fast charging, and vibrant 120Hz curved AMOLED display. Fully inspected with 12 months comprehensive warranty.",
      images: [
        { url: getCloudinary("/cashify/phone-oppo-reno15.jpg"), publicId: "sellbar/cashify/phone-oppo-reno15", alt: "OPPO Reno15 Pro 5G" },
      ],
      rating: 4.8,
      reviewsCount: 184,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["oppo", "reno15", "5g", "smartphone", "camera-phone"],
      specs: [
        { label: "Storage & RAM", value: "12GB RAM | 256GB Internal" },
        { label: "Processor", value: "MediaTek Dimensity 8200" },
        { label: "Battery", value: "4600 mAh with 80W Fast Charge" },
        { label: "Camera", value: "50MP Sony IMX890 OIS + 32MP Telephoto" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Samsung Galaxy S21 Ultra 5G - Refurbished",
      slug: "samsung-galaxy-s21-ultra-5g-refurbished",
      brand: "Samsung",
      category: categoryMap["mobile-phones"],
      price: 36699,
      compareAtPrice: 73600,
      stock: 8,
      sku: "SAM-S21-ULTRA",
      description: "Certified Refurbished Samsung Galaxy S21 Ultra 5G. 108MP Quad Camera, 100x Space Zoom, Dynamic AMOLED 2X 120Hz display with S-Pen support. Inspected and certified by Sellbar technicians.",
      images: [
        { url: getCloudinary("/cashify/phone-samsung-s21.jpg"), publicId: "sellbar/cashify/phone-samsung-s21", alt: "Samsung Galaxy S21 Ultra" },
      ],
      rating: 4.7,
      reviewsCount: 312,
      badge: "Best Seller",
      condition: "Flawless",
      featuredType: "best-seller",
      isFeatured: true,
      tags: ["samsung", "galaxy", "s21-ultra", "5g", "flagship"],
      specs: [
        { label: "RAM & Storage", value: "12GB RAM | 256GB Storage" },
        { label: "Display", value: "6.8\" Quad HD+ Dynamic AMOLED 2X" },
        { label: "Battery", value: "5000 mAh (Tested >85% Health)" },
        { label: "Camera", value: "108MP + 12MP + 10MP + 10MP with 100x Zoom" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Samsung Galaxy S24 Ultra 5G - Refurbished",
      slug: "samsung-galaxy-s24-ultra-5g-refurbished",
      brand: "Samsung",
      category: categoryMap["mobile-phones"],
      price: 63999,
      compareAtPrice: 134999,
      stock: 15,
      sku: "SAM-S24-ULTRA",
      description: "Sellbar Certified Samsung Galaxy S24 Ultra 5G in Titanium Gray. Snapdragon 8 Gen 3 for Galaxy, Galaxy AI features, Titanium frame and built-in S Pen. Backed by 12-month doorstep replacement guarantee.",
      images: [
        { url: getCloudinary("/cashify/phone-samsung-s24.jpg"), publicId: "sellbar/cashify/phone-samsung-s24", alt: "Samsung Galaxy S24 Ultra" },
      ],
      rating: 4.9,
      reviewsCount: 420,
      badge: "Sellbar Choice",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["samsung", "s24-ultra", "galaxy-ai", "titanium", "flagship"],
      specs: [
        { label: "Processor", value: "Snapdragon 8 Gen 3 for Galaxy" },
        { label: "Display", value: "6.8\" Flat QHD+ Dynamic AMOLED 2X 2600 nits" },
        { label: "Camera", value: "200MP Main + 50MP 5x Periscope + AI Zoom" },
        { label: "Build", value: "Titanium Frame with Corning Gorilla Armor" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "OnePlus 12 5G - Refurbished",
      slug: "oneplus-12-5g-refurbished",
      brand: "OnePlus",
      category: categoryMap["mobile-phones"],
      price: 39299,
      compareAtPrice: 69999,
      stock: 14,
      sku: "1P-12-BLK",
      description: "Sellbar Certified OnePlus 12 5G with Hasselblad Camera System, Snapdragon 8 Gen 3, and 5400 mAh high-density battery with 100W SuperVOOC. Pristine like-new condition.",
      images: [
        { url: getCloudinary("/cashify/phone-oneplus-12.jpg"), publicId: "sellbar/cashify/phone-oneplus-12", alt: "OnePlus 12 5G" },
      ],
      rating: 4.8,
      reviewsCount: 198,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "trending",
      isFeatured: true,
      tags: ["oneplus", "oneplus-12", "hasselblad", "5g", "fast-charging"],
      specs: [
        { label: "RAM & Storage", value: "16GB LPDDR5X | 512GB UFS 4.0" },
        { label: "Battery", value: "5400 mAh with 100W SUPERVOOC" },
        { label: "Display", value: "6.82\" 2K 120Hz ProXDR AMOLED 4500 nits" },
        { label: "Camera", value: "50MP Sony LYT-808 + 64MP 3x Periscope" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Samsung Galaxy Z Fold5 5G - Refurbished",
      slug: "samsung-galaxy-z-fold5-5g-refurbished",
      brand: "Samsung",
      category: categoryMap["mobile-phones"],
      price: 69499,
      compareAtPrice: 84399,
      stock: 6,
      sku: "SAM-ZFOLD5-512",
      description: "Certified Refurbished Samsung Galaxy Z Fold5. 7.6-inch folding Dynamic AMOLED 2X inner display with Flex Hinge. Thoroughly stress-tested for 200,000+ folds.",
      images: [
        { url: getCloudinary("/cashify/phone-samsung-fold5.jpg"), publicId: "sellbar/cashify/phone-samsung-fold5", alt: "Samsung Galaxy Z Fold5" },
      ],
      rating: 4.9,
      reviewsCount: 156,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["samsung", "fold5", "foldable", "z-fold", "flagship"],
      specs: [
        { label: "Main Screen", value: "7.6\" Dynamic AMOLED 2X 120Hz Foldable" },
        { label: "Cover Screen", value: "6.2\" Dynamic AMOLED 2X 120Hz" },
        { label: "RAM & Storage", value: "12GB RAM | 512GB Storage" },
        { label: "Processor", value: "Snapdragon 8 Gen 2 for Galaxy" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Apple iPhone 14 (128GB) - Refurbished",
      slug: "apple-iphone-14-128gb-refurbished",
      brand: "Apple",
      category: categoryMap["mobile-phones"],
      price: 38999,
      compareAtPrice: 69900,
      stock: 20,
      sku: "APL-IP14-128",
      description: "Certified Refurbished Apple iPhone 14 in Midnight. Super Retina XDR OLED display, A15 Bionic chip with 5-core GPU, dual 12MP camera with Photonic Engine and Action mode. Battery health guaranteed > 85%.",
      images: [
        { url: getCloudinary("/products/iphone-14.webp"), publicId: "sellbar/products/iphone-14", alt: "Apple iPhone 14" },
      ],
      rating: 4.9,
      reviewsCount: 540,
      badge: "Super Deal",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["apple", "iphone", "iphone-14", "ios", "bionic"],
      specs: [
        { label: "Storage", value: "128GB NVMe" },
        { label: "Chipset", value: "Apple A15 Bionic with 5-core GPU" },
        { label: "Display", value: "6.1\" Super Retina XDR OLED Display" },
        { label: "Battery Health", value: "Tested & Certified >88% Capacity" },
        { label: "Warranty", value: "12 Months Doorstep Replacement Warranty" },
      ],
    },
    {
      name: "Apple iPhone 13 (128GB) - Refurbished",
      slug: "apple-iphone-13-128gb-refurbished",
      brand: "Apple",
      category: categoryMap["mobile-phones"],
      price: 32999,
      compareAtPrice: 59900,
      stock: 18,
      sku: "APL-IP13-128",
      description: "Certified Refurbished Apple iPhone 13 (128GB) with Cinematic mode, A15 Bionic chip, and Ceramic Shield front. Passed 32-point inspection.",
      images: [
        { url: getCloudinary("/products/iphone-13.webp"), publicId: "sellbar/products/iphone-13", alt: "Apple iPhone 13" },
      ],
      rating: 4.8,
      reviewsCount: 680,
      badge: "Best Seller",
      condition: "Flawless",
      featuredType: "best-seller",
      isFeatured: true,
      tags: ["apple", "iphone-13", "ios", "5g", "retina"],
      specs: [
        { label: "Storage", value: "128GB" },
        { label: "Display", value: "6.1\" Super Retina XDR OLED" },
        { label: "Chipset", value: "Apple A15 Bionic" },
        { label: "Battery", value: "Certified >85% Health" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Google Pixel 7 (128GB) - Refurbished",
      slug: "google-pixel-7-128gb-refurbished",
      brand: "Google",
      category: categoryMap["mobile-phones"],
      price: 24999,
      compareAtPrice: 59999,
      stock: 10,
      sku: "GOOG-PIX7-128",
      description: "Sellbar Certified Google Pixel 7 powered by Google Tensor G2. Legendary Pixel Computational Photography, Real Tone, Magic Eraser, and stock Android experience.",
      images: [
        { url: getCloudinary("/products/google-pixel-7.webp"), publicId: "sellbar/products/google-pixel-7", alt: "Google Pixel 7" },
      ],
      rating: 4.7,
      reviewsCount: 220,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "trending",
      isFeatured: true,
      tags: ["google", "pixel", "pixel-7", "tensor", "camera-phone"],
      specs: [
        { label: "Processor", value: "Google Tensor G2 with Titan M2" },
        { label: "Display", value: "6.3\" 90Hz Smooth OLED Display" },
        { label: "Camera", value: "50MP Octa PD Quad Bayer Main Camera" },
        { label: "Battery", value: "4355 mAh with Fast Wireless Charging" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },

    // Laptops
    {
      name: "Dell Latitude 3410 Core i5 - Refurbished",
      slug: "dell-latitude-3410-core-i5-refurbished",
      brand: "Dell",
      category: categoryMap["laptop"],
      price: 19999,
      compareAtPrice: 55000,
      stock: 15,
      sku: "DELL-LAT3410-I5",
      description: "Certified Refurbished Dell Latitude 3410 Enterprise Laptop. 10th Gen Intel Core i5 processor, 16GB DDR4 RAM, 512GB Fast NVMe SSD, Full HD Anti-Glare display, and original Dell high-speed charger.",
      images: [
        { url: getCloudinary("/cashify/laptop-dell-3410-i5.png"), publicId: "sellbar/cashify/laptop-dell-3410-i5", alt: "Dell Latitude 3410 Core i5" },
      ],
      rating: 4.6,
      reviewsCount: 165,
      badge: "Best Value",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["dell", "latitude", "core-i5", "laptop", "office-laptop"],
      specs: [
        { label: "Processor", value: "Intel Core i5-10210U (Up to 4.20 GHz)" },
        { label: "RAM", value: "16GB DDR4 High-Speed RAM" },
        { label: "Storage", value: "512GB M.2 NVMe PCIe SSD" },
        { label: "Display", value: "14.0\" Full HD (1920x1080) Anti-Glare" },
        { label: "Battery Health", value: "Genuine Dell Battery >80% Capacity" },
        { label: "OS", value: "Windows 11 Pro Genuine License" },
      ],
    },
    {
      name: "Dell Latitude 3410 Core i7 - Refurbished",
      slug: "dell-latitude-3410-core-i7-refurbished",
      brand: "Dell",
      category: categoryMap["laptop"],
      price: 24999,
      compareAtPrice: 68000,
      stock: 10,
      sku: "DELL-LAT3410-I7",
      description: "Refurbished Dell Latitude 3410 powered by Intel Core i7 10th Gen, 16GB RAM, 512GB SSD. Perfect for coding, multitasking, and heavy enterprise workloads.",
      images: [
        { url: getCloudinary("/cashify/laptop-dell-3410-i7.png"), publicId: "sellbar/cashify/laptop-dell-3410-i7", alt: "Dell Latitude 3410 Core i7" },
      ],
      rating: 4.8,
      reviewsCount: 140,
      badge: "Super Deal",
      condition: "Flawless",
      featuredType: "best-seller",
      isFeatured: true,
      tags: ["dell", "latitude", "core-i7", "workstation", "business-laptop"],
      specs: [
        { label: "Processor", value: "Intel Core i7-10510U (Up to 4.90 GHz)" },
        { label: "RAM", value: "16GB DDR4 High-Speed RAM" },
        { label: "Storage", value: "512GB M.2 NVMe SSD" },
        { label: "Display", value: "14.0\" Full HD Display" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Dell Latitude 5310 Core i5 - Refurbished",
      slug: "dell-latitude-5310-core-i5-refurbished",
      brand: "Dell",
      category: categoryMap["laptop"],
      price: 21999,
      compareAtPrice: 62000,
      stock: 12,
      sku: "DELL-LAT5310-I5",
      description: "Ultraportable 13.3-inch Dell Latitude 5310 enterprise laptop. Premium magnesium chassis, backlit keyboard, Wi-Fi 6, and USB-C Thunderbolt support.",
      images: [
        { url: getCloudinary("/cashify/laptop-dell-5310.png"), publicId: "sellbar/cashify/laptop-dell-5310", alt: "Dell Latitude 5310" },
      ],
      rating: 4.7,
      reviewsCount: 98,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "trending",
      isFeatured: true,
      tags: ["dell", "latitude-5310", "ultrabook", "core-i5", "portable"],
      specs: [
        { label: "Processor", value: "Intel Core i5-10310U vPro" },
        { label: "RAM & SSD", value: "16GB DDR4 | 512GB NVMe SSD" },
        { label: "Display", value: "13.3\" FHD WVA Anti-Glare Display" },
        { label: "Weight", value: "Only 1.24 kg Ultra-Lightweight" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Dell Latitude 5320 11th Gen Core i5 - Refurbished",
      slug: "dell-latitude-5320-11th-gen-core-i5-refurbished",
      brand: "Dell",
      category: categoryMap["laptop"],
      price: 26999,
      compareAtPrice: 79000,
      stock: 8,
      sku: "DELL-LAT5320-I5",
      description: "Sellbar Certified Dell Latitude 5320 featuring 11th Gen Intel Core i5 processor with Iris Xe graphics, 16GB RAM, and 512GB PCIe Gen 4 SSD.",
      images: [
        { url: getCloudinary("/cashify/laptop-dell-5320.png"), publicId: "sellbar/cashify/laptop-dell-5320", alt: "Dell Latitude 5320" },
      ],
      rating: 4.9,
      reviewsCount: 110,
      badge: "Top Rated",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["dell", "5320", "11th-gen", "iris-xe", "business-laptop"],
      specs: [
        { label: "Processor", value: "11th Gen Intel Core i5-1145G7" },
        { label: "Graphics", value: "Intel Iris Xe Graphics" },
        { label: "RAM & Storage", value: "16GB LPDDR4x | 512GB PCIe SSD" },
        { label: "Ports", value: "Dual Thunderbolt 4 with Power Delivery" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Lenovo ThinkPad L14 Gen 2 - Refurbished",
      slug: "lenovo-thinkpad-l14-gen-2-refurbished",
      brand: "Lenovo",
      category: categoryMap["laptop"],
      price: 25499,
      compareAtPrice: 72000,
      stock: 9,
      sku: "LEN-THINKPAD-L14",
      description: "Legendary Lenovo ThinkPad durability with spill-resistant keyboard, TrackPoint navigation, MIL-STD 810H tested chassis, and Intel Core i5 processor.",
      images: [
        { url: getCloudinary("/cashify/laptop-lenovo-thinkpad.webp"), publicId: "sellbar/cashify/laptop-lenovo-thinkpad", alt: "Lenovo ThinkPad L14" },
      ],
      rating: 4.8,
      reviewsCount: 135,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["lenovo", "thinkpad", "l14", "durable", "enterprise"],
      specs: [
        { label: "Keyboard", value: "Award-winning Spill-Resistant ThinkPad Keyboard" },
        { label: "Processor", value: "Intel Core i5 11th Gen" },
        { label: "RAM & Storage", value: "16GB RAM | 512GB Fast SSD" },
        { label: "Battery", value: "Certified >85% with Rapid Charge" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Apple MacBook Pro M3 (16GB / 512GB) - Refurbished",
      slug: "apple-macbook-pro-m3-refurbished",
      brand: "Apple",
      category: categoryMap["laptop"],
      price: 114999,
      compareAtPrice: 169900,
      stock: 5,
      sku: "APL-MBP-M3",
      description: "Certified Refurbished Apple MacBook Pro with Apple M3 Silicon chip, 14.2-inch Liquid Retina XDR display with ProMotion 120Hz, Space Grey finish, and MagSafe 3 charging.",
      images: [
        { url: getCloudinary("/cashify/laptop-macbook-pro-m3.webp"), publicId: "sellbar/cashify/laptop-macbook-pro-m3", alt: "Apple MacBook Pro M3" },
      ],
      rating: 4.9,
      reviewsCount: 88,
      badge: "Sellbar Choice",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["apple", "macbook-pro", "m3", "retina", "pro-laptop"],
      specs: [
        { label: "Processor", value: "Apple M3 Chip with 8-Core CPU & 10-Core GPU" },
        { label: "Memory", value: "16GB Unified Memory" },
        { label: "Storage", value: "512GB Super-Fast SSD" },
        { label: "Display", value: "14.2\" Liquid Retina XDR (3024x1964) 120Hz" },
        { label: "Battery Health", value: "Tested >92% Original Capacity (100+ cycles left)" },
        { label: "Warranty", value: "12 Months Doorstep Replacement Warranty" },
      ],
    },

    // Hot Deals / Gadgets
    {
      name: "Bose SoundLink Flex Bluetooth Speaker - Refurbished",
      slug: "bose-soundlink-flex-bluetooth-speaker-refurbished",
      brand: "Bose",
      category: categoryMap["smart-watches"], // Or gadgets
      price: 9499,
      compareAtPrice: 15900,
      stock: 14,
      sku: "BOSE-FLEX-SPK",
      description: "Certified Refurbished Bose SoundLink Flex Waterproof Bluetooth Speaker. PositionIQ technology detects orientation and optimizes sound automatically.",
      images: [
        { url: getCloudinary("/cashify/hot-deal-1.webp"), publicId: "sellbar/cashify/hot-deal-1", alt: "Bose SoundLink Flex" },
      ],
      rating: 4.9,
      reviewsCount: 310,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["bose", "speaker", "bluetooth", "audio", "waterproof"],
      specs: [
        { label: "Battery Life", value: "Up to 12 Hours on single charge" },
        { label: "Water Resistance", value: "IP67 Waterproof & Dustproof (It floats!)" },
        { label: "Audio", value: "Custom engineered transducer & dual passive radiators" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Apple Watch Series 8 GPS (45mm) - Refurbished",
      slug: "apple-watch-series-8-gps-45mm-refurbished",
      brand: "Apple",
      category: categoryMap["smart-watches"],
      price: 21999,
      compareAtPrice: 45900,
      stock: 11,
      sku: "APL-WATCH-S8-45",
      description: "Certified Refurbished Apple Watch Series 8 (45mm Aluminum Case). Temperature sensing, Blood Oxygen app, ECG, Crash Detection, and Always-On Retina display.",
      images: [
        { url: getCloudinary("/cashify/hot-deal-2.webp"), publicId: "sellbar/cashify/hot-deal-2", alt: "Apple Watch Series 8" },
      ],
      rating: 4.8,
      reviewsCount: 260,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["apple", "apple-watch", "smartwatch", "series-8", "fitness"],
      specs: [
        { label: "Case Size", value: "45mm Starlight Aluminum Case" },
        { label: "Sensors", value: "Blood Oxygen, ECG, Temperature Sensing" },
        { label: "Battery Health", value: "Guaranteed >85% Capacity" },
        { label: "Water Resistance", value: "50m Water Resistant (Swimproof)" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Sony PlayStation 5 Console - Refurbished",
      slug: "sony-playstation-5-console-refurbished",
      brand: "Sony",
      category: categoryMap["gaming-consoles"],
      price: 36999,
      compareAtPrice: 54990,
      stock: 7,
      sku: "SONY-PS5-DISC",
      description: "Certified Refurbished Sony PlayStation 5 with Ultra-High Speed 825GB SSD, Ray Tracing, 4K-TV Gaming up to 120fps, and original DualSense Wireless Controller.",
      images: [
        { url: getCloudinary("/cashify/hot-deal-3.webp"), publicId: "sellbar/cashify/hot-deal-3", alt: "Sony PlayStation 5" },
      ],
      rating: 4.9,
      reviewsCount: 410,
      badge: "Super Deal",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["sony", "ps5", "playstation", "gaming", "console"],
      specs: [
        { label: "Storage", value: "Custom 825GB Ultra-High Speed SSD" },
        { label: "Controller", value: "Original DualSense with Haptic Feedback" },
        { label: "Resolution", value: "Up to 4K 120Hz with HDR and Ray Tracing" },
        { label: "Included", value: "Console, 1 Controller, HDMI 2.1, Power Cord" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Canon EOS 1500D DSLR Camera Kit - Refurbished",
      slug: "canon-eos-1500d-dslr-camera-kit-refurbished",
      brand: "Canon",
      category: categoryMap["cameras"],
      price: 26999,
      compareAtPrice: 47995,
      stock: 6,
      sku: "CANON-1500D-KIT",
      description: "Certified Refurbished Canon EOS 1500D 24.1MP Digital SLR Camera with EF S18-55 is II Lens. Includes battery, charger, strap, and 16GB high-speed SD card.",
      images: [
        { url: getCloudinary("/cashify/hot-deal-4.webp"), publicId: "sellbar/cashify/hot-deal-4", alt: "Canon EOS 1500D DSLR" },
      ],
      rating: 4.7,
      reviewsCount: 180,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "hot-deal",
      isFeatured: true,
      tags: ["canon", "dslr", "camera", "photography", "1500d"],
      specs: [
        { label: "Sensor", value: "24.1 Megapixel APS-C CMOS Sensor" },
        { label: "Lens", value: "EF-S 18-55mm f/3.5-5.6 IS II Lens" },
        { label: "Connectivity", value: "Built-in Wi-Fi and NFC" },
        { label: "Video", value: "Full HD 1080p Video Recording" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    // Tablets
    {
      name: "Apple iPad 10th Gen (64GB Wi-Fi) - Refurbished",
      slug: "apple-ipad-10th-gen-64gb-refurbished",
      brand: "Apple",
      category: categoryMap["tablets"],
      price: 28999,
      compareAtPrice: 39900,
      stock: 10,
      sku: "APL-IPAD10-64",
      description: "Sellbar Certified Apple iPad 10th Generation in Silver. 10.9-inch Liquid Retina display, A14 Bionic chip, landscape 12MP Ultra Wide front camera, and USB-C connectivity.",
      images: [
        { url: getCloudinary("/services/buy-tablets.webp"), publicId: "sellbar/services/buy-tablets", alt: "Apple iPad 10th Gen" },
      ],
      rating: 4.8,
      reviewsCount: 210,
      badge: "Top Seller",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["apple", "ipad", "tablet", "retina", "a14"],
      specs: [
        { label: "Display", value: "10.9\" Liquid Retina Display with True Tone" },
        { label: "Processor", value: "A14 Bionic chip with Neural Engine" },
        { label: "Storage", value: "64GB High-Speed Storage" },
        { label: "Battery", value: "Tested >88% Health Guarantee" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    {
      name: "Samsung Galaxy Tab S8 (128GB Wi-Fi) - Refurbished",
      slug: "samsung-galaxy-tab-s8-128gb-refurbished",
      brand: "Samsung",
      category: categoryMap["tablets"],
      price: 35999,
      compareAtPrice: 58999,
      stock: 8,
      sku: "SAM-TABS8-128",
      description: "Certified Refurbished Samsung Galaxy Tab S8. 11-inch 120Hz display, Snapdragon 8 Gen 1 processor, quad speakers by AKG, and ultra-low latency S Pen included in the box.",
      images: [
        { url: getCloudinary("/services/buy-tablets.webp"), publicId: "sellbar/services/buy-tablets", alt: "Samsung Galaxy Tab S8" },
      ],
      rating: 4.8,
      reviewsCount: 160,
      badge: "Best Value",
      condition: "Flawless",
      featuredType: "trending",
      isFeatured: true,
      tags: ["samsung", "galaxy-tab", "tab-s8", "spen", "android-tablet"],
      specs: [
        { label: "Display", value: "11\" LTPS TFT 120Hz Display" },
        { label: "Processor", value: "Qualcomm Snapdragon 8 Gen 1" },
        { label: "RAM & Storage", value: "8GB RAM | 128GB (Expandable up to 1TB)" },
        { label: "Accessories", value: "Original Compatible S Pen Included" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    // Smart Watches
    {
      name: "Samsung Galaxy Watch 5 Pro (45mm) - Refurbished",
      slug: "samsung-galaxy-watch-5-pro-45mm-refurbished",
      brand: "Samsung",
      category: categoryMap["smart-watches"],
      price: 18499,
      compareAtPrice: 44999,
      stock: 9,
      sku: "SAM-WATCH5PRO-45",
      description: "Certified Refurbished Samsung Galaxy Watch 5 Pro. Sapphire crystal glass, titanium body, GPX route tracking, BioActive Sensor, and 590mAh long-lasting battery.",
      images: [
        { url: getCloudinary("/services/buy-smartwatches.webp"), publicId: "sellbar/services/buy-smartwatches", alt: "Samsung Galaxy Watch 5 Pro" },
      ],
      rating: 4.7,
      reviewsCount: 145,
      badge: "Lowest Price",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["samsung", "galaxy-watch", "smartwatch", "fitness", "titanium"],
      specs: [
        { label: "Build", value: "Titanium Case with Sapphire Crystal Glass" },
        { label: "Sensors", value: "BioActive Sensor (HR, ECG, BIA, Sleep Analysis)" },
        { label: "Battery", value: "590 mAh (Up to 80 Hours)" },
        { label: "Water Resistance", value: "IP68 + 5ATM Swimproof" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    // Gaming Consoles
    {
      name: "Xbox Series X Console (1TB) - Refurbished",
      slug: "xbox-series-x-console-1tb-refurbished",
      brand: "Microsoft",
      category: categoryMap["gaming-consoles"],
      price: 35999,
      compareAtPrice: 55990,
      stock: 6,
      sku: "MS-XBOX-SX-1TB",
      description: "Certified Refurbished Microsoft Xbox Series X. 12 teraflops of raw graphic processing power, 1TB NVMe SSD, Quick Resume, and Xbox Wireless Controller.",
      images: [
        { url: getCloudinary("/services/buy-gaming.webp"), publicId: "sellbar/services/buy-gaming", alt: "Xbox Series X" },
      ],
      rating: 4.9,
      reviewsCount: 220,
      badge: "Super Deal",
      condition: "Flawless",
      featuredType: "trending",
      isFeatured: true,
      tags: ["xbox", "series-x", "microsoft", "gaming", "console"],
      specs: [
        { label: "Performance", value: "12 Teraflops GPU with DirectX Raytracing" },
        { label: "Storage", value: "1TB Custom NVMe SSD" },
        { label: "Resolution", value: "True 4K Gaming up to 120 FPS" },
        { label: "Included", value: "Console, Xbox Controller, Ultra High Speed HDMI" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
    // Cameras
    {
      name: "Sony Alpha A6400 Mirrorless Camera - Refurbished",
      slug: "sony-alpha-a6400-mirrorless-refurbished",
      brand: "Sony",
      category: categoryMap["cameras"],
      price: 52999,
      compareAtPrice: 85990,
      stock: 5,
      sku: "SONY-A6400-KIT",
      description: "Sellbar Certified Sony Alpha ILCE-6400 with 16-50mm Power Zoom Lens. Real-time Eye AF, 4K HDR recording, 24.2MP Exmor CMOS sensor, and 180-degree tiltable LCD touchscreen.",
      images: [
        { url: getCloudinary("/services/buy-cameras.webp"), publicId: "sellbar/services/buy-cameras", alt: "Sony Alpha A6400" },
      ],
      rating: 4.9,
      reviewsCount: 130,
      badge: "Top Rated",
      condition: "Flawless",
      featuredType: "featured",
      isFeatured: true,
      tags: ["sony", "alpha", "a6400", "mirrorless", "4k-camera"],
      specs: [
        { label: "Sensor", value: "24.2MP APS-C Exmor CMOS Sensor" },
        { label: "Autofocus", value: "425 Phase-Detection AF Points with Real-time Eye AF" },
        { label: "Video", value: "Internal 4K 30p Recording with S-Log3" },
        { label: "Lens", value: "Sony E PZ 16-50mm f/3.5-5.6 OSS Lens" },
        { label: "Warranty", value: "12 Months Comprehensive Sellbar Warranty" },
      ],
    },
  ];

  let seededCount = 0;
  for (const prodData of productsToSeed) {
    let existing = await Product.findOne({ slug: prodData.slug });
    if (!existing) {
      await Product.create({
        ...prodData,
        vendor: vendor._id,
        status: "active",
      });
      seededCount++;
      console.log(`+ Created product: ${prodData.name} (₹${prodData.price})`);
    } else {
      Object.assign(existing, prodData);
      existing.vendor = vendor._id;
      existing.status = "active";
      await existing.save();
      console.log(`~ Updated product: ${prodData.name}`);
    }
  }

  console.log(`\nDynamic products seed finished! Processed ${productsToSeed.length} products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
