"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "@/css/Refurb.css";
import { fetchProducts, fetchCategories } from "@/lib/productApi";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const PRICES = [
  [0, "Any price"],
  [25000, "Under ₹25,000"],
  [50000, "Under ₹50,000"],
  [100000, "Under ₹1,00,000"],
];

const SORTS = [
  ["popular", "Popular"],
  ["low", "Price: low to high"],
  ["high", "Price: high to low"],
  ["rating", "Rating"],
];

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function BuyRefurbishedPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const [pData, cData] = await Promise.all([
          fetchProducts({ limit: 100 }),
          fetchCategories(),
        ]);

        const list = (pData.products || []).map((p) => {
          const price = Number(p.price) || 0;
          const mrp = Number(p.compareAtPrice) || Math.round(price * 1.4);
          return {
            id: p._id,
            slug: p.slug || p._id,
            name: p.name || "Unnamed product",
            category: typeof p.category === "object" ? p.category?.name || "Other" : p.category || "Other",
            categorySlug: typeof p.category === "object" ? p.category?.slug : "",
            brand: typeof p.brand === "object" ? p.brand?.name || "" : p.brand || "",
            price,
            mrp,
            rating: Number(p.rating || p.averageRating) || 4.8,
            reviews: Number(p.reviewsCount || p.totalReviews) || 124,
            stock: Math.max(0, Number(p.stock) || 0),
            image: p.images?.[0]?.url || getCloudinaryUrl("/products/iphone-14.webp"),
          };
        });

        if (!cancelled) {
          setProducts(list);
          setCategories(cData || []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Products could not be loaded.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Open with ?category=... from URL query
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("category");
    if (!wanted || !categories.length) return;
    const match = categories.find(
      (c) => c.slug === wanted || c.name.toLowerCase() === wanted.toLowerCase()
    );
    if (match) setCategory(match.name);
  }, [categories]);

  const shown = useMemo(() => {
    let list = [...products];

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (maxPrice > 0) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [products, category, maxPrice, search, sort]);

  const reset = () => {
    setCategory("All");
    setMaxPrice(0);
    setSort("popular");
    setSearch("");
  };

  return (
    <main className="rf">
      <div className="rf-wrap rf-crumbs">
        <Link href="/">Home</Link> / <b>Buy refurbished devices</b>
      </div>

      <div className="rf-wrap">
        <div className="rf-tabs" role="tablist" aria-label="Categories">
          {["All", ...categories.map((c) => c.name)].map((name) => (
            <button
              key={name}
              role="tab"
              aria-selected={category === name}
              className={category === name ? "on" : ""}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="rf-layout">
          <aside className="rf-side" aria-label="Filters">
            <div>
              <h4>Price Filter</h4>
              {PRICES.map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="price"
                    checked={maxPrice === value}
                    onChange={() => setMaxPrice(value)}
                  />{" "}
                  {label}
                </label>
              ))}
            </div>
            <button className="rf-reset" onClick={reset}>Reset all filters</button>
          </aside>

          <div>
            <div className="rf-bar">
              <input
                className="rf-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, brand, or model..."
                aria-label="Search products"
              />
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                {SORTS.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="rf-state"><span>⏳</span><h3>Loading verified products...</h3></div>
            ) : error ? (
              <div className="rf-state">
                <span>⚠️</span>
                <h3>Products could not be loaded</h3>
                <p>{error}</p>
                <button className="rf-btn" onClick={() => window.location.reload()}>Try again</button>
              </div>
            ) : shown.length === 0 ? (
              <div className="rf-state">
                <span>🔎</span>
                <h3>No products match your filters</h3>
                <p>Change the category or price range, or clear the filters.</p>
                <button className="rf-btn" onClick={reset}>Clear filters</button>
              </div>
            ) : (
              <div className="rf-grid">
                {shown.map((p) => {
                  const off = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
                  return (
                    <article className="rf-card" key={p.id}>
                      {off > 0 && <span className="rf-badge">{off}% off</span>}
                      <span className="rf-pic">
                        {p.image ? (
                          <img src={p.image} alt={p.name} loading="lazy" />
                        ) : (
                          <span className="rf-emoji">📱</span>
                        )}
                      </span>
                      <span className="rf-small">{p.brand || p.category}</span>
                      <h3>{p.name}</h3>
                      <span className="rf-small">
                        {p.rating > 0 ? `${p.rating.toFixed(1)} ★ (${p.reviews} reviews)` : "4.8 ★ (120 reviews)"}
                      </span>
                      <div className="rf-price">
                        <b>{inr(p.price)}</b>
                        {off > 0 && <del>{inr(p.mrp)}</del>}
                      </div>
                      <span className="rf-small">{p.stock > 0 ? "In stock • 12M Warranty" : "Limited stock"}</span>
                      <Link href={`/product/${p.slug || p.id}`} className="rf-btn">
                        View Product Details
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
