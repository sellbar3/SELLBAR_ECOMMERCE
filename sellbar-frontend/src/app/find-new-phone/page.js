"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  SlidersHorizontal, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  Zap, 
  Battery, 
  ShieldCheck, 
  Sparkles,
  Scale
} from "lucide-react";
import { getProductImageUrl, getCategoryFallbackImage } from "@/lib/productImageHelper";

const PHONES_DATABASE = [
  {
    id: "ip-15",
    name: "Apple iPhone 15",
    brand: "Apple",
    budgetRange: "30-60k",
    usage: ["Pro Camera", "Compact Flagship"],
    is5G: true,
    price: 52999,
    mrp: 79900,
    specs: "Dynamic Island, A16 Bionic, 48MP Main Camera, Type-C",
    cameraRating: 9.6,
    batteryRating: 8.8,
    performanceRating: 9.4,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ip-14",
    name: "Apple iPhone 14",
    brand: "Apple",
    budgetRange: "30-60k",
    usage: ["Pro Camera", "Compact Flagship"],
    is5G: true,
    price: 41999,
    mrp: 69900,
    specs: "A15 Bionic, Cinematic 4K, Ceramic Shield, All-Day Battery",
    cameraRating: 9.2,
    batteryRating: 8.7,
    performanceRating: 9.1,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ip-13",
    name: "Apple iPhone 13",
    brand: "Apple",
    budgetRange: "30-60k",
    usage: ["Compact Flagship", "Balanced"],
    is5G: true,
    price: 34999,
    mrp: 59900,
    specs: "Super Retina XDR, A15 Bionic, Sensor-Shift OIS",
    cameraRating: 9.0,
    batteryRating: 8.6,
    performanceRating: 8.9,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    budgetRange: "60k+",
    usage: ["Pro Camera", "High Performance & Gaming"],
    is5G: true,
    price: 78999,
    mrp: 129999,
    specs: "Galaxy AI, 200MP Quad Telephoto, Snapdragon 8 Gen 3, S-Pen",
    cameraRating: 9.8,
    batteryRating: 9.5,
    performanceRating: 9.8,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "s23",
    name: "Samsung Galaxy S23 5G",
    brand: "Samsung",
    budgetRange: "30-60k",
    usage: ["Pro Camera", "Compact Flagship"],
    is5G: true,
    price: 38999,
    mrp: 74999,
    specs: "Snapdragon 8 Gen 2, 50MP Nightography, 120Hz Dynamic AMOLED",
    cameraRating: 9.2,
    batteryRating: 8.5,
    performanceRating: 9.3,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "op-12",
    name: "OnePlus 12 5G",
    brand: "OnePlus",
    budgetRange: "30-60k",
    usage: ["High Performance & Gaming", "Long Battery Life"],
    is5G: true,
    price: 45999,
    mrp: 64999,
    specs: "Hasselblad Camera, Snapdragon 8 Gen 3, 5400mAh, 100W SuperVOOC",
    cameraRating: 9.1,
    batteryRating: 9.7,
    performanceRating: 9.6,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "op-11r",
    name: "OnePlus 11R 5G",
    brand: "OnePlus",
    budgetRange: "15-30k",
    usage: ["High Performance & Gaming", "Long Battery Life"],
    is5G: true,
    price: 24999,
    mrp: 39999,
    specs: "Snapdragon 8+ Gen 1, 100W Charging, 50MP Sony IMX890",
    cameraRating: 8.7,
    batteryRating: 9.3,
    performanceRating: 9.2,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "pixel-8",
    name: "Google Pixel 8",
    brand: "Google",
    budgetRange: "30-60k",
    usage: ["Pro Camera", "Compact Flagship"],
    is5G: true,
    price: 39999,
    mrp: 75999,
    specs: "Google Tensor G3, Best-in-Class Computational AI Photography",
    cameraRating: 9.7,
    batteryRating: 8.4,
    performanceRating: 8.8,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "pixel-7a",
    name: "Google Pixel 7a",
    brand: "Google",
    budgetRange: "15-30k",
    usage: ["Pro Camera", "Compact Flagship"],
    is5G: true,
    price: 21999,
    mrp: 43999,
    specs: "Google Tensor G2, 64MP Camera, Wireless Charging, IP67",
    cameraRating: 9.3,
    batteryRating: 8.2,
    performanceRating: 8.6,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "redmi-note-13-pro",
    name: "Redmi Note 13 Pro+ 5G",
    brand: "Xiaomi",
    budgetRange: "15-30k",
    usage: ["Long Battery Life", "Pro Camera"],
    is5G: true,
    price: 18999,
    mrp: 31999,
    specs: "200MP OIS Camera, 120W HyperCharge, IP68 Curved AMOLED",
    cameraRating: 8.8,
    batteryRating: 9.2,
    performanceRating: 8.7,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "moto-edge-40",
    name: "Motorola Edge 40 Neo",
    brand: "Motorola",
    budgetRange: "under-15k",
    usage: ["Compact Flagship", "Balanced"],
    is5G: true,
    price: 13999,
    mrp: 23999,
    specs: "144Hz pOLED, IP68 Water Resistance, Dimensity 7030, Clean Android",
    cameraRating: 8.4,
    batteryRating: 8.6,
    performanceRating: 8.3,
    link: "/buy-refurbished",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop&q=80",
  }
];

const BUDGET_PILLS = [
  { id: "all", label: "All Budgets" },
  { id: "under-15k", label: "Under ₹15,000" },
  { id: "15-30k", label: "₹15,000 - ₹30,000" },
  { id: "30-60k", label: "₹30,000 - ₹60,000" },
  { id: "60k+", label: "₹60,000+ Premium" },
];

const USAGE_PILLS = [
  "All Priorities",
  "Pro Camera",
  "High Performance & Gaming",
  "Long Battery Life",
  "Compact Flagship"
];

export default function FindNewPhonePage() {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedUsage, setSelectedUsage] = useState("All Priorities");
  const [only5G, setOnly5G] = useState(false);
  const [comparedPhones, setComparedPhones] = useState([]);

  const filtered = PHONES_DATABASE.filter((p) => {
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchesBudget = selectedBudget === "all" || p.budgetRange === selectedBudget;
    const matchesUsage = selectedUsage === "All Priorities" || p.usage.includes(selectedUsage);
    const matches5G = !only5G || p.is5G;
    const matchesQuery = query === "" || 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.specs.toLowerCase().includes(query.toLowerCase());
    return matchesBrand && matchesBudget && matchesUsage && matches5G && matchesQuery;
  });

  function toggleCompare(phone) {
    if (comparedPhones.find(c => c.id === phone.id)) {
      setComparedPhones(comparedPhones.filter(c => c.id !== phone.id));
    } else {
      if (comparedPhones.length >= 3) {
        alert("You can compare up to 3 phones at once.");
        return;
      }
      setComparedPhones([...comparedPhones, phone]);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Smart Phone Finder</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto mb-2">
            <Smartphone className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Find Your Ideal Smartphone by Budget &amp; Needs
          </h1>
          <p className="text-gray-500 text-sm">
            Compare flagship and mid-range devices. Discover certified refurbished prices with up to 50% savings and 12 months warranty.
          </p>
        </div>

        {/* Interactive Filter Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          {/* Search & Brands Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search phone name or specs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {["All", "Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Motorola"].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedBrand === b
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Select Budget Range:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {BUDGET_PILLS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBudget(b.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedBudget === b.id
                      ? "bg-[#2bbda3] text-white shadow-xs"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Usage Preferences & 5G Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Primary Usage Focus:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {USAGE_PILLS.map((u) => (
                  <button
                    key={u}
                    onClick={() => setSelectedUsage(u)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedUsage === u
                        ? "bg-teal-50 text-[#2bbda3] border border-teal-200 font-bold"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer self-start sm:self-center select-none">
              <input
                type="checkbox"
                checked={only5G}
                onChange={(e) => setOnly5G(e.target.checked)}
                className="w-4 h-4 text-[#2bbda3] rounded accent-[#2bbda3]"
              />
              <span className="text-xs font-semibold text-gray-800">5G Network Ready Only</span>
            </label>
          </div>
        </div>

        {/* Results Counter & Active Comparison Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Found <strong>{filtered.length}</strong> matching smartphone deals</span>
          {comparedPhones.length > 0 && (
            <span className="text-[#2bbda3] font-bold">
              Comparing {comparedPhones.length}/3 selected models (Scroll down)
            </span>
          )}
        </div>

        {/* Phone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((phone) => {
            const isCompared = comparedPhones.some(c => c.id === phone.id);
            return (
              <div
                key={phone.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {phone.brand}
                    </span>
                    {phone.is5G && (
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                        5G Ready
                      </span>
                    )}
                  </div>

                  <div className="relative aspect-[4/3] w-full bg-[#f8fafc] rounded-2xl p-4 my-2 overflow-hidden flex items-center justify-center border border-slate-100">
                    <img
                      src={getProductImageUrl(phone, 'mobile')}
                      alt={phone.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getCategoryFallbackImage('mobile');
                      }}
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">{phone.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{phone.specs}</p>

                  {/* Benchmark Performance Ratings */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] bg-[#f8fafc] p-2.5 rounded-xl border border-gray-100">
                    <div>
                      <div className="font-bold text-gray-900">{phone.cameraRating}/10</div>
                      <div className="text-[10px] text-gray-400">Camera</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{phone.performanceRating}/10</div>
                      <div className="text-[10px] text-gray-400">Speed</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{phone.batteryRating}/10</div>
                      <div className="text-[10px] text-gray-400">Battery</div>
                    </div>
                  </div>

                  {/* Price & Refurbished Discount */}
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#2bbda3]">
                      ₹{phone.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{phone.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Save {Math.round(((phone.mrp - phone.price) / phone.mrp) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Link
                    href={phone.link}
                    className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-[#2bbda3] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    View Refurbished Units <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => toggleCompare(phone)}
                    className={`w-full py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                      isCompared
                        ? "bg-rose-50 text-rose-600 border border-rose-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    {isCompared ? "Remove from Compare" : "+ Add to Compare"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Table (When phones are selected) */}
        {comparedPhones.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-teal-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Side-by-Side Phone Comparison</h3>
                <p className="text-xs text-gray-500">Comparing specs, ratings, and price savings</p>
              </div>
              <button
                onClick={() => setComparedPhones([])}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Clear Comparison
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 font-bold text-gray-900">Specification</th>
                    {comparedPhones.map(p => (
                      <th key={p.id} className="border border-gray-200 p-3 font-bold text-[#2bbda3]">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Refurbished Price</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3 font-black text-gray-900 text-sm">
                        ₹{p.price.toLocaleString("en-IN")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Original Retail MRP</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3 text-gray-500 line-through">
                        ₹{p.mrp.toLocaleString("en-IN")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Camera Score</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3 font-bold text-emerald-700">
                        {p.cameraRating} / 10
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Speed / CPU Score</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3 font-bold text-teal-700">
                        {p.performanceRating} / 10
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Battery Rating</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3 font-bold text-gray-800">
                        {p.batteryRating} / 10
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Key Highlights</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3 text-gray-600">
                        {p.specs}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Action</td>
                    {comparedPhones.map(p => (
                      <td key={p.id} className="border border-gray-200 p-3">
                        <Link
                          href={p.link}
                          className="inline-block px-3 py-1.5 rounded-lg bg-[#2bbda3] text-white font-bold text-xs"
                        >
                          Buy Refurbished &rarr;
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
