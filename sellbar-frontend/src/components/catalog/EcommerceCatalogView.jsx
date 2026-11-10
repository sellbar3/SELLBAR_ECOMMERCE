'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  ShoppingCart,
  Heart,
  Grid3X3,
  Rows3,
  Sliders,
  ArrowUpDown,
  Tag,
  Check,
  Info,
  Package,
  Watch,
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Camera,
  Headphones,
} from 'lucide-react';
import { fetchProducts, fetchCategories } from '@/lib/productApi';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { addToCart } from '@/lib/cart';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

const CATEGORY_ICON_MAP = {
  'smart-watches': Watch,
  'mobile-phones': Smartphone,
  'laptops': Laptop,
  'tablets': Tablet,
  'gaming-consoles': Gamepad2,
  'cameras': Camera,
  'accessories': Headphones,
  'gadgets': Zap,
  'all': Sparkles,
};

const CONDITION_GRADES = [
  { id: 'Flawless', name: 'Flawless (Grade A+)', desc: 'Like brand new, zero marks, 90%+ battery' },
  { id: 'Superb', name: 'Superb (Grade A)', desc: 'Minimal hairline marks, fully certified' },
  { id: 'Good', name: 'Good (Grade B)', desc: 'Light cosmetic scuffs, 100% functional, best price' },
];

const DISCOUNT_RANGES = [
  { min: 50, label: '50% or more' },
  { min: 40, label: '40% or more' },
  { min: 30, label: '30% or more' },
  { min: 20, label: '20% or more' },
  { min: 10, label: '10% or more' },
];

const RATING_TIERS = [
  { stars: 4, label: '4★ & above' },
  { stars: 3, label: '3★ & above' },
];

const SORT_OPTIONS = [
  { val: 'popular', label: 'Featured / Popularity' },
  { val: 'low', label: 'Price: Low to High' },
  { val: 'high', label: 'Price: High to Low' },
  { val: 'rating', label: 'Customer Rating: High to Low' },
  { val: 'discount', label: 'Biggest Discount' },
  { val: 'newest', label: 'Newest Arrivals' },
];

export default function EcommerceCatalogView({
  categoryKey = 'all',
  categoryTitle = 'Certified Refurbished Electronics',
  categorySubtitle = 'Tested across 32 rigorous hardware points with 12-Month Doorstep Replacement Warranty & Free Insured Shipping.',
  breadcrumbCategory = 'Electronics',
  categoryIcon = null,
  specFilters = [],
  heroBadge = 'Sellbar Certified Store',
}) {
  const CategoryIcon = categoryIcon || CATEGORY_ICON_MAP[categoryKey] || Zap;
  // Products & Raw Data States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItem, setAddedItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // View Layout
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedRating, setSelectedRating] = useState(null); // null or number
  const [selectedDiscount, setSelectedDiscount] = useState(null); // null or number
  const [onlyAssured, setOnlyAssured] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState({}); // { ram: ['8GB'], storage: ['128GB'] }
  const [sortBy, setSortBy] = useState('popular');

  // Accordion Toggles for Sidebar
  const [openSections, setOpenSections] = useState({
    brand: true,
    price: true,
    condition: true,
    rating: true,
    discount: true,
    specs: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Load Products
  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        setLoading(true);
        const queryParams = { limit: 120 };
        if (categoryKey && categoryKey !== 'all') {
          queryParams.category = categoryKey;
        }
        const data = await fetchProducts(queryParams);
        if (active) {
          const raw = Array.isArray(data?.products) ? data.products : [];
          setProducts(raw);
        }
      } catch (err) {
        console.warn('Failed to load products for catalog view:', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, [categoryKey]);

  // Extract all available brands with counts
  const availableBrands = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const b = typeof p.brand === 'object' ? p.brand?.name : p.brand;
      if (b && typeof b === 'string') {
        const trimmed = b.trim();
        counts[trimmed] = (counts[trimmed] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Filtered Brands in sidebar search
  const visibleBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  // Handle Multi-Select Brand Toggle
  const toggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  // Handle Condition Grade Toggle
  const toggleGrade = (gradeId) => {
    setSelectedGrades((prev) =>
      prev.includes(gradeId) ? prev.filter((g) => g !== gradeId) : [...prev, gradeId]
    );
  };

  // Handle Price Range Application
  const applyPriceInputs = (e) => {
    if (e) e.preventDefault();
    const minVal = minPrice !== '' ? Number(minPrice) : 0;
    const maxVal = maxPrice !== '' ? Number(maxPrice) : 200000;
    setAppliedPriceRange({ min: Math.max(0, minVal), max: Math.max(minVal, maxVal) });
  };

  const applyQuickPrice = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max ? max.toString() : '');
    setAppliedPriceRange({ min, max: max || 200000 });
  };

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      selectedBrands.length > 0 ||
      selectedGrades.length > 0 ||
      appliedPriceRange.min > 0 ||
      appliedPriceRange.max < 200000 ||
      selectedRating !== null ||
      selectedDiscount !== null ||
      onlyAssured ||
      onlyInStock ||
      searchQuery.trim().length > 0 ||
      Object.values(selectedSpecs).some((arr) => arr?.length > 0)
    );
  }, [
    selectedBrands,
    selectedGrades,
    appliedPriceRange,
    selectedRating,
    selectedDiscount,
    onlyAssured,
    onlyInStock,
    searchQuery,
    selectedSpecs,
  ]);

  // Reset All Filters
  const resetAllFilters = () => {
    setSelectedBrands([]);
    setBrandSearch('');
    setSelectedGrades([]);
    setMinPrice('');
    setMaxPrice('');
    setAppliedPriceRange({ min: 0, max: 200000 });
    setSelectedRating(null);
    setSelectedDiscount(null);
    setOnlyAssured(false);
    setOnlyInStock(false);
    setSelectedSpecs({});
    setSearchQuery('');
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const brand = (typeof p.brand === 'object' ? p.brand?.name : p.brand || '').toLowerCase();
        const model = (p.modelNumber || '').toLowerCase();
        return name.includes(q) || brand.includes(q) || model.includes(q);
      });
    }

    // Brands multi-select
    if (selectedBrands.length > 0) {
      const lowerBrands = selectedBrands.map((b) => b.toLowerCase());
      list = list.filter((p) => {
        const b = (typeof p.brand === 'object' ? p.brand?.name : p.brand || '').toLowerCase();
        return lowerBrands.includes(b);
      });
    }

    // Condition Grade
    if (selectedGrades.length > 0) {
      list = list.filter((p) => {
        const cond = p.condition || 'Flawless';
        return selectedGrades.includes(cond);
      });
    }

    // Price range
    list = list.filter((p) => {
      const price = Number(p.price) || 0;
      return price >= appliedPriceRange.min && price <= appliedPriceRange.max;
    });

    // Rating
    if (selectedRating !== null) {
      list = list.filter((p) => {
        const r = Number(p.rating || p.averageRating) || 4.5;
        return r >= selectedRating;
      });
    }

    // Discount
    if (selectedDiscount !== null) {
      list = list.filter((p) => {
        const price = Number(p.price) || 0;
        const compare = Number(p.compareAtPrice) || Math.round(price * 1.35);
        if (compare <= price) return false;
        const discount = Math.round(((compare - price) / compare) * 100);
        return discount >= selectedDiscount;
      });
    }

    // Sellbar Assured
    if (onlyAssured) {
      list = list.filter((p) => p.isFeatured || p.badge?.includes('Assured') || (p.rating || 4.5) >= 4.5);
    }

    // In Stock Only
    if (onlyInStock) {
      list = list.filter((p) => (Number(p.stock) || 10) > 0);
    }

    // Sorting
    list.sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      const ratingA = Number(a.rating || a.averageRating) || 4.5;
      const ratingB = Number(b.rating || b.averageRating) || 4.5;

      const compareA = Number(a.compareAtPrice) || priceA * 1.3;
      const discA = compareA > priceA ? Math.round(((compareA - priceA) / compareA) * 100) : 0;
      const compareB = Number(b.compareAtPrice) || priceB * 1.3;
      const discB = compareB > priceB ? Math.round(((compareB - priceB) / compareB) * 100) : 0;

      switch (sortBy) {
        case 'low':
          return priceA - priceB;
        case 'high':
          return priceB - priceA;
        case 'rating':
          return ratingB - ratingA;
        case 'discount':
          return discB - discA;
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'popular':
        default:
          return (b.reviewsCount || 100) - (a.reviewsCount || 100);
      }
    });

    return list;
  }, [
    products,
    searchQuery,
    selectedBrands,
    selectedGrades,
    appliedPriceRange,
    selectedRating,
    selectedDiscount,
    onlyAssured,
    onlyInStock,
    sortBy,
  ]);

  // Add to cart handler
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id: product._id || product.id,
      name: product.name,
      price: Number(product.price) || 0,
      compareAtPrice: Number(product.compareAtPrice) || Math.round(Number(product.price) * 1.35),
      image: getProductImageUrl(product, categoryKey),
      conditionGrade: product.condition || 'Flawless',
      color: product.color || 'Default',
      storage: product.storage || '128GB',
      warranty: '12 Months Doorstep Warranty',
    };
    addToCart(item, 1);
    setAddedItem(product._id || product.id);
    setTimeout(() => setAddedItem(null), 2200);
  };

  // Toggle Wishlist
  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Render Filter Sidebar Content
  const renderFilterPanel = () => (
    <div className="space-y-6 text-slate-800">
      {/* Assured / Prime-like Toggle */}
      <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#13b59b] text-white flex items-center justify-center shadow-xs">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-1">
              Sellbar <span className="text-[#13b59b]">Assured</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">32-Pt QC &amp; 1-Yr Warranty</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={onlyAssured}
            onChange={(e) => setOnlyAssured(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#13b59b]"></div>
        </label>
      </div>

      {/* 1. Brands Section (Amazon Multi-Select + Instant Search) */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Brand ({selectedBrands.length > 0 ? `${selectedBrands.length} selected` : 'All'})</span>
          {openSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.brand && (
          <div className="space-y-2.5">
            {availableBrands.length > 5 && (
              <div className="relative mb-2">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brands..."
                  className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#13b59b]"
                />
              </div>
            )}

            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 text-xs">
              {visibleBrands.length === 0 ? (
                <div className="text-slate-400 py-1 text-xs">No brand matches found.</div>
              ) : (
                visibleBrands.map(({ name, count }) => {
                  const isChecked = selectedBrands.includes(name);
                  return (
                    <label
                      key={name}
                      onClick={() => toggleBrand(name)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition select-none ${
                        isChecked
                          ? 'bg-teal-50 text-[#13b59b] font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                            isChecked
                              ? 'bg-[#13b59b] border-[#13b59b] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span>{name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-semibold">({count})</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Price Range (Min/Max Input + Quick Tiers) */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Price (₹)</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.price && (
          <div className="space-y-3">
            {/* Quick Price Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Under ₹15K', min: 0, max: 15000 },
                { label: '₹15K - ₹30K', min: 15000, max: 30000 },
                { label: '₹30K - ₹60K', min: 30000, max: 60000 },
                { label: '₹60K+', min: 60000, max: 200000 },
              ].map((tier, idx) => {
                const isActive =
                  appliedPriceRange.min === tier.min && appliedPriceRange.max === tier.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyQuickPrice(tier.min, tier.max)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#13b59b] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Min - Max inputs with Go button */}
            <form onSubmit={applyPriceInputs} className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#13b59b]"
                />
              </div>
              <span className="text-slate-400 text-xs font-semibold">to</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#13b59b]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer shrink-0"
              >
                Go
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 3. Refurbished Condition Grades (Sellbar Certified Grades) */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('condition')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Condition Grade</span>
          {openSections.condition ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.condition && (
          <div className="space-y-2 text-xs">
            {CONDITION_GRADES.map((cg) => {
              const isChecked = selectedGrades.includes(cg.id);
              return (
                <label
                  key={cg.id}
                  onClick={() => toggleGrade(cg.id)}
                  className={`block p-2 rounded-xl cursor-pointer transition select-none border ${
                    isChecked
                      ? 'bg-teal-50/70 border-[#13b59b] shadow-xs'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
                        isChecked
                          ? 'bg-[#13b59b] border-[#13b59b] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`font-bold ${isChecked ? 'text-[#13b59b]' : 'text-slate-800'}`}>
                      {cg.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 pl-6 leading-tight">{cg.desc}</p>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Customer Rating Filter (Flipkart/Amazon style) */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Customer Rating</span>
          {openSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.rating && (
          <div className="space-y-1.5 text-xs">
            {RATING_TIERS.map((rt) => {
              const isChecked = selectedRating === rt.stars;
              return (
                <button
                  key={rt.stars}
                  type="button"
                  onClick={() => setSelectedRating(isChecked ? null : rt.stars)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${
                    isChecked ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-500">
                      {[...Array(rt.stars)].map((_, i) => (
                        <Star key={i} size={13} className="fill-current" />
                      ))}
                      {[...Array(5 - rt.stars)].map((_, i) => (
                        <Star key={i} size={13} className="text-slate-300" />
                      ))}
                    </div>
                    <span className="text-xs">&amp; up</span>
                  </div>
                  {isChecked && <Check size={14} className="text-amber-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Discount Percentage Filter */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Discount Offer</span>
          {openSections.discount ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.discount && (
          <div className="space-y-1 text-xs">
            {DISCOUNT_RANGES.map((dr) => {
              const isChecked = selectedDiscount === dr.min;
              return (
                <button
                  key={dr.min}
                  type="button"
                  onClick={() => setSelectedDiscount(isChecked ? null : dr.min)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{dr.label}</span>
                  {isChecked && <Check size={14} className="text-emerald-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. In Stock Only Toggle */}
      <div className="flex items-center justify-between py-1">
        <span className="text-xs font-bold text-slate-700">In Stock Items Only</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#13b59b]"></div>
        </label>
      </div>

      {/* Clear All CTA in Sidebar */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} /> Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/buy-refurbished" className="hover:text-[#13b59b] transition">
              Buy Refurbished
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{breadcrumbCategory}</span>
          </nav>
        </div>
      </div>

      {/* 2. Category Hero Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#13b59b]/20 text-[#2dd4bf] border border-[#13b59b]/30">
              <CategoryIcon size={14} />
              <span>{heroBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {categoryTitle}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              {categorySubtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <CheckCircle2 size={14} className="text-[#2dd4bf]" /> 32-Point Quality Check
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <ShieldCheck size={14} className="text-[#2dd4bf]" /> 12-Month Doorstep Warranty
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <Truck size={14} className="text-[#2dd4bf]" /> Free Express Shipping
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
            <div className="text-2xl sm:text-3xl font-black text-[#2dd4bf]">Up to 70% OFF</div>
            <div className="text-xs text-slate-300 mt-0.5">Vs Brand New Store Price</div>
            <div className="text-[11px] text-teal-300 font-semibold mt-2">
              7-Day Doorstep Replacement Window
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR (Column 1) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Filter size={16} className="text-[#13b59b]" />
                  <span>Filters</span>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-rose-500 hover:text-rose-600 transition cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {renderFilterPanel()}
            </div>
          </aside>

          {/* MAIN CONTENT AREA (Columns 2-4) */}
          <main className="lg:col-span-3 space-y-5">
            {/* Top Toolbar: Search + Count + Sort + View Mode */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Search in Category */}
                <div className="relative flex-1 max-w-md">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search within ${breadcrumbCategory}...`}
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#13b59b]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Sort & Mobile Filter Buttons */}
                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  {/* Mobile Filter Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <SlidersHorizontal size={14} className="text-[#13b59b]" />
                    <span>Filters</span>
                    {hasActiveFilters && (
                      <span className="w-4 h-4 rounded-full bg-[#13b59b] text-white text-[10px] flex items-center justify-center font-bold">
                        •
                      </span>
                    )}
                  </button>

                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-semibold hidden md:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs focus:outline-none focus:border-[#13b59b] cursor-pointer"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.val} value={opt.val}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grid vs List View toggle (Desktop) */}
                  <div className="hidden sm:flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition ${
                        viewMode === 'grid'
                          ? 'bg-white text-[#13b59b] shadow-xs'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Grid View"
                    >
                      <Grid3X3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition ${
                        viewMode === 'list'
                          ? 'bg-white text-[#13b59b] shadow-xs'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="List View"
                    >
                      <Rows3 size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips / Pills Bar (Amazon/Flipkart style) */}
              {hasActiveFilters && (
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Active Filters:
                  </span>

                  {selectedBrands.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold"
                    >
                      <span>Brand: {b}</span>
                      <button type="button" onClick={() => toggleBrand(b)} className="hover:text-teal-950">
                        <X size={12} />
                      </button>
                    </span>
                  ))}

                  {selectedGrades.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold"
                    >
                      <span>Grade: {g}</span>
                      <button type="button" onClick={() => toggleGrade(g)} className="hover:text-teal-950">
                        <X size={12} />
                      </button>
                    </span>
                  ))}

                  {(appliedPriceRange.min > 0 || appliedPriceRange.max < 200000) && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold">
                      <span>
                        ₹{appliedPriceRange.min.toLocaleString('en-IN')} - ₹
                        {appliedPriceRange.max.toLocaleString('en-IN')}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMinPrice('');
                          setMaxPrice('');
                          setAppliedPriceRange({ min: 0, max: 200000 });
                        }}
                        className="hover:text-teal-950"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedRating !== null && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-semibold">
                      <span>{selectedRating}★ &amp; above</span>
                      <button
                        type="button"
                        onClick={() => setSelectedRating(null)}
                        className="hover:text-amber-950"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedDiscount !== null && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold">
                      <span>{selectedDiscount}%+ OFF</span>
                      <button
                        type="button"
                        onClick={() => setSelectedDiscount(null)}
                        className="hover:text-emerald-950"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {onlyAssured && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold">
                      <span>Assured Only</span>
                      <button
                        type="button"
                        onClick={() => setOnlyAssured(false)}
                        className="hover:text-teal-950"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {onlyInStock && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-xs font-semibold">
                      <span>In Stock</span>
                      <button
                        type="button"
                        onClick={() => setOnlyInStock(false)}
                        className="hover:text-slate-950"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Total items counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items in{' '}
                  <strong className="text-slate-900">{breadcrumbCategory}</strong>
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  ✓ Doorstep Delivery in 24-48 Hours
                </span>
              </div>
            </div>

            {/* PRODUCT GRID / LIST */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-5 border border-slate-200 animate-pulse space-y-4"
                  >
                    <div className="w-full aspect-square bg-slate-100 rounded-2xl"></div>
                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    <div className="h-8 bg-slate-100 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#13b59b] flex items-center justify-center mx-auto">
                  <Package size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">No electronics matched your filters</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Try clearing some of your active filters, increasing the price range, or searching for a different brand or model.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => {
                  const id = p._id || p.id;
                  const price = Number(p.price) || 0;
                  const compare = Number(p.compareAtPrice) || Math.round(price * 1.35);
                  const discount = compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
                  const savings = compare > price ? compare - price : 0;
                  const emi = Math.round(price / 12);
                  const isAdded = addedItem === id;
                  const isWished = wishlist.includes(id);
                  const imgUrl = getProductImageUrl(p, categoryKey);
                  const condition = p.condition || 'Flawless';
                  const brand = typeof p.brand === 'object' ? p.brand?.name : p.brand || '';

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-[#13b59b] hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative"
                    >
                      {/* Top Badges & Wishlist */}
                      <div className="flex items-center justify-between mb-3 z-10">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            condition === 'Flawless'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : condition === 'Superb'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {condition}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(id, e)}
                          className={`p-1.5 rounded-full transition ${
                            isWished ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500'
                          }`}
                          title="Save to Wishlist"
                        >
                          <Heart size={16} className={isWished ? 'fill-current' : ''} />
                        </button>
                      </div>

                      {/* Image */}
                      <Link
                        href={`/product/${p.slug || id}`}
                        className="block relative aspect-square w-full bg-[#f8fafc] rounded-2xl p-4 mb-3 overflow-hidden flex items-center justify-center"
                      >
                        {discount > 0 && (
                          <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs z-10">
                            {discount}% OFF
                          </span>
                        )}
                        <img
                          src={imgUrl}
                          alt={p.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getCategoryFallbackImage(categoryKey);
                          }}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          {brand && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {brand}
                            </span>
                          )}
                          <Link
                            href={`/product/${p.slug || id}`}
                            className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#13b59b] transition line-clamp-2 leading-snug"
                          >
                            {p.name}
                          </Link>

                          {/* Ratings */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[11px] font-bold px-1.5 py-0.5 rounded border border-amber-200/50">
                              <Star size={11} className="fill-amber-500 text-amber-500" />
                              <span>{p.rating || 4.7}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">
                              ({p.reviewsCount || 86})
                            </span>
                          </div>
                        </div>

                        {/* Price & Savings */}
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              ₹{price.toLocaleString('en-IN')}
                            </span>
                            {compare > price && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{compare.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          <div className="text-[10px] text-slate-500 font-medium">
                            No Cost EMI from <strong className="text-slate-800">₹{emi}/mo</strong>
                          </div>

                          <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                            <Truck size={12} /> Free Doorstep Delivery
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(p, e)}
                              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-900 hover:bg-slate-800 text-white'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={13} strokeWidth={3} />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart size={13} />
                                  <span>Add to Cart</span>
                                </>
                              )}
                            </button>

                            <Link
                              href={`/product/${p.slug || id}`}
                              className="px-3 py-2 bg-teal-50 hover:bg-[#13b59b] hover:text-white text-[#13b59b] border border-teal-200 rounded-xl text-xs font-bold transition text-center shrink-0"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-4">
                {filteredProducts.map((p) => {
                  const id = p._id || p.id;
                  const price = Number(p.price) || 0;
                  const compare = Number(p.compareAtPrice) || Math.round(price * 1.35);
                  const discount = compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
                  const emi = Math.round(price / 12);
                  const isAdded = addedItem === id;
                  const isWished = wishlist.includes(id);
                  const imgUrl = getProductImageUrl(p, categoryKey);
                  const condition = p.condition || 'Flawless';
                  const brand = typeof p.brand === 'object' ? p.brand?.name : p.brand || '';

                  return (
                    <div
                      key={id}
                      className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-[#13b59b] hover:shadow-md transition flex flex-col sm:flex-row items-center gap-6 group"
                    >
                      <Link
                        href={`/product/${p.slug || id}`}
                        className="w-full sm:w-48 aspect-square bg-[#f8fafc] rounded-2xl p-4 shrink-0 flex items-center justify-center relative overflow-hidden"
                      >
                        {discount > 0 && (
                          <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md z-10">
                            {discount}% OFF
                          </span>
                        )}
                        <img
                          src={imgUrl}
                          alt={p.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getCategoryFallbackImage(categoryKey);
                          }}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        />
                      </Link>

                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center gap-2">
                          {brand && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md uppercase">
                              {brand}
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-50 text-teal-800 rounded-md">
                            Grade: {condition}
                          </span>
                        </div>

                        <Link
                          href={`/product/${p.slug || id}`}
                          className="text-base font-bold text-slate-900 group-hover:text-[#13b59b] transition block"
                        >
                          {p.name}
                        </Link>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                            <Star size={12} className="fill-amber-500 text-amber-500" />
                            <span>{p.rating || 4.7}</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            {p.reviewsCount || 94} verified ratings
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2">
                          {p.description ||
                            'Pre-owned device inspected across 32 points. Clean IMEI, unlinked iCloud/Google ID, sealed with 12-Month warranty.'}
                        </p>
                      </div>

                      <div className="sm:border-l sm:border-slate-100 sm:pl-6 w-full sm:w-56 shrink-0 space-y-3 text-left sm:text-right">
                        <div>
                          <div className="text-xl font-black text-slate-900">
                            ₹{price.toLocaleString('en-IN')}
                          </div>
                          {compare > price && (
                            <div className="text-xs text-slate-400 line-through">
                              MRP ₹{compare.toLocaleString('en-IN')}
                            </div>
                          )}
                          <div className="text-[10px] text-emerald-700 font-bold mt-1">
                            Save ₹{(compare - price).toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(p, e)}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900 hover:bg-slate-800 text-white'
                            }`}
                          >
                            <ShoppingCart size={13} />
                            <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                          </button>

                          <Link
                            href={`/product/${p.slug || id}`}
                            className="block w-full py-2 px-3 bg-teal-50 hover:bg-[#13b59b] hover:text-white text-[#13b59b] border border-teal-200 rounded-xl text-xs font-bold transition text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE SLIDE-OVER FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          {/* Drawer Box */}
          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <SlidersHorizontal size={18} className="text-[#13b59b]" />
                <span>Filters &amp; Refinements</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Filter Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterPanel()}
            </div>

            {/* Footer CTAs */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
