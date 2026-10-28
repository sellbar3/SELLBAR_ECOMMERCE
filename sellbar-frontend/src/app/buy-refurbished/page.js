"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "@/components/Refurb.css";

const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const PRICES = [
  [0, "Any price"],
  [5000, "Under ₹5,000"],
  [20000, "Under ₹20,000"],
  [50000, "Under ₹50,000"],
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
        const [pRes, cRes] = await Promise.all([
          fetch(`${API}/public/products?limit=100`, { cache: "no-store" }),
          fetch(`${API}/public/categories`, { cache: "no-store" }),
        ]);
        const pJson = await pRes.json();
        const cJson = await cRes.json();

        if (!pRes.ok || !pJson.success) throw new Error(pJson.message || "Products could not be loaded.");

        const list = (pJson.data?.products || []).map((p) => {
          const price = Number(p.price) || 0;
          const mrp = Number(p.compareAtPrice) || price;
          return {
            id: p._id,
            name: p.name || "Unnamed product",
            category: typeof p.category === "object" ? p.category?.name || "Other" : p.category || "Other",
            brand: typeof p.brand === "object" ? p.brand?.name || "" : p.brand || "",
            price,
            mrp,
            rating: Number(p.averageRating) || 0,
            reviews: Number(p.totalReviews) || 0,
            stock: Math.max(0, Number(p.stock) || 0),
            image: p.images?.find((i) => i?.url)?.url || "",
          };
        });

        if (!cancelled) {
          setProducts(list);
          setCategories(cRes.ok && cJson.success ? cJson.data?.categories || [] : []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof TypeError
              ? "Cannot reach the server. Check that the backend is running."
              : e.message || "Products could not be loaded."
          );
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

  // Open with ?category=phones from the menu links
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("category");
    if (!wanted || !categories.length) return;

    const key = wanted.toLowerCase();
    const match = categories.find(
      (c) => c.name?.toLowerCase().includes(key.replace(/s$/, "")) || c.slug?.toLowerCase() === key
    );
    if (match) setCategory(match.name);
  }, [categories]);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();

    const list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (maxPrice === 0 || p.price <= maxPrice) &&
        (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    );

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, category, maxPrice, sort, search]);

  const reset = () => {
    setCategory("All");
    setMaxPrice(0);
    setSort("popular");
    setSearch("");
  };

  return (
    <main className="rf">
      <div className="rf-top">
        <div>
          <Link href="/"><b>SELLBAR</b></Link>
          <Link href="/">← Back to store</Link>
        </div>
      </div>

      <div className="rf-wrap">
        <div className="rf-crumbs">
          <Link href="/">Home</Link> / <b>Buy refurbished</b>
        </div>

        <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Buy refurbished electronics</h1>
        <p className="rf-sub">Tested devices at lower prices. Showing {shown.length} items.</p>

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
              <h4>Price</h4>
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
                placeholder="Search by name or brand"
                aria-label="Search products"
              />
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                {SORTS.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="rf-state"><span>⏳</span><h3>Loading products...</h3></div>
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
                <p>Change the category or price, or clear the filters.</p>
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
                        {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <span className="rf-emoji">🛍️</span>}
                      </span>
                      <span className="rf-small">{p.brand || p.category}</span>
                      <h3>{p.name}</h3>
                      <span className="rf-small">
                        {p.rating > 0 ? `${p.rating.toFixed(1)} ★ (${p.reviews})` : "No reviews yet"}
                      </span>
                      <div className="rf-price">
                        <b>{inr(p.price)}</b>
                        {off > 0 && <del>{inr(p.mrp)}</del>}
                      </div>
                      <span className="rf-small">{p.stock > 0 ? "In stock" : "Currently unavailable"}</span>
                      <Link href="/#products" className="rf-btn">Add to cart on store page</Link>
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