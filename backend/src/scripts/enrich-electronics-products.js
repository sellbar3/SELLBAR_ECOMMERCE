const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

require("../models/Category");
const Product = require("../models/Product");

const mappingPath = path.join(__dirname, "../config/cloudinary-mapping.json");
const cloudinaryMap = JSON.parse(fs.readFileSync(mappingPath, "utf8"));

function getCloudinary(localPath) {
  return cloudinaryMap[localPath] || localPath;
}

async function enrichProducts() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for enriching electronics products...");

  const products = await Product.find({}).populate("category", "name slug");
  console.log(`Found ${products.length} products to enrich.`);

  const assuredBadge = getCloudinary("/sellbar-assured.svg");
  const phoneImg1 = getCloudinary("/products/iphone-14.webp");
  const phoneImg2 = getCloudinary("/products/iphone-13.webp");
  const phoneImg3 = getCloudinary("/products/samsung-s23.webp");
  const laptopImg1 = getCloudinary("/cashify/laptop-dell-3410-i5.png");
  const laptopImg2 = getCloudinary("/cashify/laptop-dell-5310.png");

  for (const p of products) {
    const catSlug = p.category?.slug || "";
    const isPhone = catSlug === "mobile-phones" || /phone|iphone|galaxy|reno|pixel|oneplus/i.test(p.name);
    const isLaptop = catSlug === "laptop" || /laptop|dell|macbook|thinkpad/i.test(p.name);
    const isWatch = catSlug === "smart-watches" || /watch/i.test(p.name);
    const isTablet = catSlug === "tablets" || /ipad|tablet/i.test(p.name);
    const isCamera = catSlug === "cameras" || /camera|eos|dslr|lens/i.test(p.name);
    const isConsole = catSlug === "gaming-consoles" || /playstation|xbox|console/i.test(p.name);

    // Multi-angle images
    const currentImgs = p.images && p.images.length > 0 ? p.images.map(img => img.url) : [];
    const mainImg = currentImgs[0] || phoneImg1;

    let gallery = [
      { url: mainImg, publicId: "sellbar/p1", alt: `${p.name} - Front View` }
    ];

    if (isPhone) {
      gallery.push({ url: phoneImg2, publicId: "sellbar/p2", alt: `${p.name} - Back Angle View` });
      gallery.push({ url: phoneImg3, publicId: "sellbar/p3", alt: `${p.name} - Side Profile & Ports` });
    } else if (isLaptop) {
      gallery.push({ url: laptopImg1, publicId: "sellbar/l1", alt: `${p.name} - Keyboard & Trackpad View` });
      gallery.push({ url: laptopImg2, publicId: "sellbar/l2", alt: `${p.name} - Side Ports & Hinge` });
    } else {
      gallery.push({ url: mainImg, publicId: "sellbar/o1", alt: `${p.name} - Detail Angle View` });
    }

    // Model Number & SKU
    const baseCode = p.brand ? p.brand.substring(0, 3).toUpperCase() : "SB";
    const skuCode = `${baseCode}-${Math.floor(1000 + Math.random() * 9000)}-${p.condition === "Flawless" ? "FL" : "SP"}`;
    const modelNum = isPhone ? `A${Math.floor(2000 + Math.random() * 900)}` : isLaptop ? `DL-${Math.floor(3000 + Math.random() * 5000)}` : `MOD-${Math.floor(100 + Math.random() * 900)}`;

    // Variants
    let variants = [];
    if (isPhone) {
      variants = [
        {
          name: "128GB / Midnight",
          sku: `${skuCode}-128-MID`,
          price: p.price,
          compareAtPrice: p.compareAtPrice || Math.round(p.price * 1.4),
          stock: Math.max(3, p.stock || 5),
          attributes: { storage: "128GB", ram: "6GB", color: "Midnight", colorCode: "#1c2331", network: "5G" },
          image: mainImg,
        },
        {
          name: "256GB / Starlight",
          sku: `${skuCode}-256-STA`,
          price: p.price + 4500,
          compareAtPrice: (p.compareAtPrice || Math.round(p.price * 1.4)) + 6000,
          stock: 6,
          attributes: { storage: "256GB", ram: "6GB", color: "Starlight", colorCode: "#f8f9fa", network: "5G" },
          image: phoneImg2,
        },
        {
          name: "512GB / Deep Blue",
          sku: `${skuCode}-512-BLU`,
          price: p.price + 11000,
          compareAtPrice: (p.compareAtPrice || Math.round(p.price * 1.4)) + 14000,
          stock: 4,
          attributes: { storage: "512GB", ram: "8GB", color: "Deep Blue", colorCode: "#1e3a8a", network: "5G" },
          image: phoneImg3,
        }
      ];
    } else if (isLaptop) {
      variants = [
        {
          name: "8GB RAM / 256GB SSD",
          sku: `${skuCode}-8-256`,
          price: p.price,
          compareAtPrice: p.compareAtPrice || Math.round(p.price * 1.4),
          stock: Math.max(2, p.stock || 4),
          attributes: { ram: "8GB", storage: "256GB SSD", processor: "Intel Core i5 / Apple M", color: "Space Gray", colorCode: "#4b5563" },
          image: mainImg,
        },
        {
          name: "16GB RAM / 512GB SSD",
          sku: `${skuCode}-16-512`,
          price: p.price + 7000,
          compareAtPrice: (p.compareAtPrice || Math.round(p.price * 1.4)) + 9500,
          stock: 5,
          attributes: { ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7 / Apple M Pro", color: "Space Gray", colorCode: "#4b5563" },
          image: laptopImg1,
        }
      ];
    } else if (isWatch) {
      variants = [
        {
          name: "40mm / GPS Only",
          sku: `${skuCode}-40-GPS`,
          price: p.price,
          compareAtPrice: p.compareAtPrice || Math.round(p.price * 1.4),
          stock: Math.max(3, p.stock || 5),
          attributes: { size: "40mm", connectivity: "GPS", color: "Midnight", colorCode: "#1f2937" },
          image: mainImg,
        },
        {
          name: "44mm / GPS + Cellular",
          sku: `${skuCode}-44-CELL`,
          price: p.price + 4000,
          compareAtPrice: (p.compareAtPrice || Math.round(p.price * 1.4)) + 5500,
          stock: 3,
          attributes: { size: "44mm", connectivity: "GPS + Cellular", color: "Silver", colorCode: "#e5e7eb" },
          image: mainImg,
        }
      ];
    } else {
      variants = [
        {
          name: "Standard Certified Edition",
          sku: `${skuCode}-STD`,
          price: p.price,
          compareAtPrice: p.compareAtPrice || Math.round(p.price * 1.4),
          stock: Math.max(2, p.stock || 4),
          attributes: { edition: "Standard Edition", color: "Original Finish" },
          image: mainImg,
        }
      ];
    }

    // Structured Specifications
    const specifications = {
      "Display & Build": [
        { label: "Screen / Form Factor", value: isPhone ? "6.1\" - 6.8\" High Refresh OLED / AMOLED" : isLaptop ? "14.0\" Full HD Anti-Glare IPS" : isWatch ? "Always-On Retina OLED" : "High-grade certified chassis" },
        { label: "Build Materials", value: "Aerospace-grade Aluminum / Titanium Glass" },
        { label: "Cosmetic Quality", value: `${p.condition || "Flawless"} (Grade A++, Zero Deep Scratches)` },
      ],
      "Performance & Storage": [
        { label: "Processor & Architecture", value: p.specs?.find(s => s.label?.toLowerCase().includes("processor"))?.value || (isPhone ? "Octa-Core Flagship Processor" : "High Performance CPU") },
        { label: "Memory (RAM)", value: p.specs?.find(s => s.label?.toLowerCase().includes("ram"))?.value || (isPhone ? "6GB - 12GB LPDDR5" : "8GB - 16GB DDR4/Unified") },
        { label: "Storage", value: p.specs?.find(s => s.label?.toLowerCase().includes("storage"))?.value || (isPhone ? "128GB / 256GB High Speed Flash" : "256GB / 512GB NVMe M.2 SSD") },
      ],
      "Battery & Power": [
        { label: "Battery Health", value: ">85% to 100% Tested Original Capacity Guaranteed" },
        { label: "Charging Standard", value: isPhone ? "Fast USB-PD Fast Charging" : "65W USB-C Power Delivery" },
        { label: "Inspection Status", value: "Passed 100% Battery Stress Diagnostic" },
      ],
      "Connectivity & Ports": [
        { label: "Wireless Support", value: "Wi-Fi 6 (802.11ax) + Bluetooth 5.2/5.3" },
        { label: "Cellular / Data", value: isPhone ? "5G VoLTE Dual SIM Supported" : "High-speed Gigabit WLAN" },
        { label: "Physical I/O", value: isLaptop ? "USB-C Thunderbolt, USB-A 3.2, HDMI 2.0, 3.5mm Audio" : "Type-C / Lightning Port" },
      ],
      "Sellbar Quality Assurance": [
        { label: "Diagnostic Check", value: "32-Point Laboratory Hardware & Sensor Inspection" },
        { label: "Warranty Coverage", value: "12 Months Comprehensive Doorstep Replacement Warranty" },
        { label: "Replacement Window", value: "7-Day Hassle-Free Replacement Policy" },
      ]
    };

    // Customer Reviews
    const customerReviews = [
      {
        reviewerName: "Rahul Sharma",
        rating: 5,
        title: "Looks and performs absolutely like brand new!",
        comment: "Received the device within 2 days in Gurgaon. Packaging was sealed and tamper-evident. Ran 32 hardware benchmark tests and battery health is at 94%. Outstanding deal from Sellbar!",
        date: "24 Oct 2026",
        verifiedBuyer: true,
        photos: [mainImg]
      },
      {
        reviewerName: "Ananya Deshmukh",
        rating: 5,
        title: "Saved over 40% compared to buying new",
        comment: "Grade Flawless is literally flawless — no marks or scratches anywhere on the screen or body. The 12-month warranty gives great peace of mind. Highly recommend Sellbar for electronics!",
        date: "18 Oct 2026",
        verifiedBuyer: true,
        photos: []
      },
      {
        reviewerName: "Vikram Malhotra",
        rating: 4,
        title: "Great condition and super fast dispatch",
        comment: "Delivery was quick and the charging cable was brand new. Performance is blazing fast. Will buy all my future gadgets from here.",
        date: "12 Oct 2026",
        verifiedBuyer: true,
        photos: []
      }
    ];

    // Electronics FAQs
    const faqs = [
      {
        question: "What is Sellbar's 32-point electronics quality inspection?",
        answer: "Every device undergoes exhaustive hardware diagnostic tests including display digitizer uniformity, battery degradation rate, motherboard voltage stability, camera focus calibration, speakers, microphones, and wireless connectivity to ensure 100% functional integrity."
      },
      {
        question: "What battery health is guaranteed on this device?",
        answer: "We guarantee that all refurbished electronics arrive with at least 85% to 100% original battery health capacity. Units with sub-85% health are rejected or fitted with brand-new certified replacement batteries before listing."
      },
      {
        question: "How does the 12-Month Doorstep Replacement Warranty work?",
        answer: "If you encounter any technical, hardware, or motherboard malfunction within 12 months of purchase, simply submit a ticket under your Sellbar account. Our technician will visit your doorstep to inspect, repair, or replace the unit without extra service fees."
      },
      {
        question: "What accessories are included inside the box?",
        answer: "Each device comes packed in our custom eco-friendly tamper-sealed box containing the certified device, a brand new fast-charging data cable, a SIM ejector tool (for cellular devices), a verified 32-point QC certificate, and your 12-month warranty card."
      },
      {
        question: "Can I return or replace the product if I am not satisfied?",
        answer: "Yes, Sellbar provides a 7-day hassle-free doorstep replacement or return window if the device does not match the described cosmetic grade or fails any functionality test."
      }
    ];

    // What's in the Box
    const whatInTheBox = [
      `Sellbar Certified ${p.name} (Factory Sanitized & Tested)`,
      isPhone ? "Fast Charging Type-C / Lightning Cable" : isLaptop ? "Original 65W/100W Power Adapter with Cable" : "Magnetic Fast Charging Dock",
      isPhone ? "SIM Tray Ejector Pin" : "User Quick Setup Guide",
      "Official 32-Point Quality Diagnostic Certificate",
      "12-Month Comprehensive Doorstep Warranty Card"
    ];

    p.sku = p.sku || skuCode;
    p.modelNumber = p.modelNumber || modelNum;
    p.warranty = "12 Months Comprehensive Doorstep Replacement Warranty";
    p.whatInTheBox = whatInTheBox;
    p.variants = variants;
    p.specifications = specifications;
    p.customerReviews = customerReviews;
    p.faqs = faqs;
    p.images = gallery;

    await p.save();
    console.log(`Enriched: ${p.name} (${variants.length} variants, ${gallery.length} images)`);
  }

  console.log("All electronics products successfully enriched!");
  await mongoose.disconnect();
}

enrichProducts().catch(err => {
  console.error("Enrichment error:", err);
  process.exit(1);
});
