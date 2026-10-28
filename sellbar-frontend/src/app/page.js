"use client";

import { useEffect, useMemo, useState } from "react";

import { getCart, addCartItem, updateCartItem } from "../lib/cart";
import { SESSION_KEY } from "../lib/auth";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurServices from "@/components/OurServices";
import { SellDeviceSection, ShowcaseSections } from "@/components/ShowcaseSections";
import { HomeMoreSections } from "@/components/HomeSections";
import HotDealsSection from "@/components/HotDealsSection";

const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const categoryIcons = {
  Mobiles: "📱",
  Laptops: "💻",
  Smartwatches: "⌚",
  Headphones: "🎧",
  Tablets: "📲",
  Accessories: "🔌",
  Footwear: "👟",
  Fashion: "👕",
  Electronics: "🔌",
};

const categoryIcon = (name) => categoryIcons[name] || "🛍️";

const fallbackColors = ["#e0edff", "#eee7ff", "#dff5e8", "#fce7d9", "#fef3c7", "#fce7f3"];

const slides = [
  {
    title: "Welcome to SELLBAR",
    sub: "Discover products from trusted sellers",
    cta: "Shop Products",
    cat: "All",
    emoji: "🛍️",
    bg: "linear-gradient(120deg,#2874f0,#6a5af9)",
  },
  {
    title: "Great Finds. Great Prices.",
    sub: "Explore the latest products and offers",
    cta: "Explore Products",
    cat: "All",
    emoji: "✨",
    bg: "linear-gradient(120deg,#e8590c,#f59f00)",
  },
  {
    title: "Your Next Favorite Is Here",
    sub: "Browse products available on SELLBAR",
    cta: "Browse Now",
    cat: "All",
    emoji: "🛒",
    bg: "linear-gradient(120deg,#0b7a75,#38b26e)",
  },
];

const sorts = [
  { key: "relevance", label: "Relevance" },
  { key: "low", label: "Price: Low to High" },
  { key: "high", label: "Price: High to Low" },
  { key: "rating", label: "Rating" },
];

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const off = (product) => {
  const oldPrice = Number(product.oldPrice) || 0;
  const price = Number(product.price) || 0;
  if (oldPrice <= price || oldPrice <= 0) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

const isExpired = (token) => {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return payload.exp ? payload.exp * 1000 < Date.now() : false;
  } catch {
    return true;
  }
};

async function post(path, body) {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const [slide, setSlide] = useState(0);
  const [user, setUser] = useState(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [pendingId, setPendingId] = useState(null);

  // Load products and categories from backend
  useEffect(() => {
    let cancelled = false;

    async function loadStoreData() {
      setProductsLoading(true);
      setProductsError("");

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API}/public/products?limit=100`, { cache: "no-store" }),
          fetch(`${API}/public/categories`, { cache: "no-store" }),
        ]);

        const productsJson = await productsResponse.json();
        const categoriesJson = await categoriesResponse.json();

        if (!productsResponse.ok || !productsJson.success) {
          throw new Error(productsJson.message || "Products could not be loaded.");
        }

        if (!categoriesResponse.ok || !categoriesJson.success) {
          throw new Error(categoriesJson.message || "Categories could not be loaded.");
        }

        const apiProducts = (productsJson.data?.products || []).map(
          (product, index) => {
            const price = Number(product.price) || 0;
            const oldPrice = Number(product.compareAtPrice) || price;

            const categoryName =
              typeof product.category === "object"
                ? product.category?.name || "Other"
                : product.category || "Other";

            return {
              id: product._id,
              name: product.name || "Unnamed product",
              category: categoryName,
              price,
              oldPrice,
              rating: Number(product.averageRating) || 0,
              reviews: Number(product.totalReviews) || 0,
              emoji: categoryIcon(categoryName),
              color: fallbackColors[index % fallbackColors.length],
              specs: product.description || product.brand || "Available on SELLBAR",
              image: product.images?.find((item) => item?.url)?.url || "",
              stock: Math.max(0, Number(product.stock) || 0),
            };
          }
        );

        if (!cancelled) {
          setProducts(apiProducts);
          setCategories(categoriesJson.data?.categories || []);
        }
      } catch (error) {
        if (!cancelled) {
          setProductsError(
            error instanceof TypeError
              ? "Backend se connect nahi ho pa raha. Backend aur API URL check karein."
              : error.message || "Store data load nahi ho saka."
          );
        }
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    }

    loadStoreData();

    return () => {
      cancelled = true;
    };
  }, []);

  // Restore login session
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");

      if (saved?.token && !isExpired(saved.token)) {
        setUser(saved);
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // Ignore invalid local session data
    }
  }, []);

  // Automatic hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Backend cart helpers
  const buildCartMap = (data) => {
    const next = {};
    for (const item of data?.items || []) {
      const id = item.product?.id || item.product?._id || item.productId;
      if (id) next[id] = Number(item.quantity) || 1;
    }
    return next;
  };

  const syncCart = async (token) => {
    const data = await getCart(token);
    setCart(buildCartMap(data));
  };

  // Load the cart from backend whenever the user logs in
  useEffect(() => {
    if (!user?.token || isExpired(user.token)) return;

    let cancelled = false;

    getCart(user.token)
      .then((data) => {
        if (!cancelled) setCart(buildCartMap(data));
      })
      .catch((error) => {
        if (!cancelled) console.error("Cart loading error:", error.message);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.token]);

  // Search, category, price and rating filters
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.specs.toLowerCase().includes(query);

      const matchesRating =
        minRating === 0 || (product.rating > 0 && product.rating >= minRating);

      const matchesPrice = maxPrice === 0 || product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesRating && matchesPrice;
    });

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, search, category, sort, minRating, maxPrice]);

  // Products with the biggest discount
  const deals = useMemo(
    () => [...products].sort((a, b) => off(b) - off(a)).slice(0, 8),
    [products]
  );

  const cartItems = products.filter((product) => cart[product.id]);

  const cartCount = cartItems.reduce((total, product) => total + cart[product.id], 0);

  const cartTotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0
  );

  const cartSaved = cartItems.reduce(
    (total, product) =>
      total + Math.max(0, product.oldPrice - product.price) * cart[product.id],
    0
  );

  const toggleWish = (id) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const openAuth = (mode, id = null) => {
    setPendingId(id);
    setAuthMode(mode);
    setAuthError("");
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
    setPendingId(null);
    setAuthError("");
  };

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}

    setUser(null);
    setCart({});
    setCartOpen(false);
  };

  // Cart actions (backend)
  const addItem = async (id, token = user?.token) => {
    if (!token || isExpired(token)) {
      openAuth("login", id);
      return;
    }

    const product = products.find((item) => item.id === id);
    if (!product || product.stock <= 0) return;

    if ((cart[id] || 0) >= product.stock) {
      alert("Itna stock available nahi hai.");
      return;
    }

    try {
      await addCartItem(id, 1, token);
      await syncCart(token);
    } catch (error) {
      alert(error.message || "Cart mein product add nahi hua.");
    }
  };

  const changeQty = async (id, delta) => {
    if (!user?.token || isExpired(user.token)) {
      openAuth("login");
      return;
    }

    const product = products.find((item) => item.id === id);
    if (!product) return;

    const nextQty = (cart[id] || 0) + delta;

    if (nextQty > product.stock) {
      alert("Itna stock available nahi hai.");
      return;
    }

    try {
      await updateCartItem(id, Math.max(0, nextQty), user.token);
      await syncCart(user.token);
    } catch (error) {
      alert(error.message || "Cart update nahi hua.");
    }
  };

  const addToCart = async (id) => {
    if (!user || isExpired(user.token)) {
      if (user) logout();
      openAuth("login", id);
      return;
    }

    await addItem(id, user.token);
  };

  // Login and customer registration
  const submitAuth = async (event) => {
    event.preventDefault();
    setAuthError("");

    const { name, email, password } = form;

    if (!email.trim() || !password || (authMode === "register" && !name.trim())) {
      setAuthError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }

    setAuthLoading(true);
    let registered = false;

    try {
      if (authMode === "register") {
        await post("/auth/register/customer", {
          name: name.trim(),
          email: email.trim(),
          password,
        });

        registered = true;
      }

      const data = await post("/auth/login", {
        email: email.trim(),
        password,
        role: "customer",
      });

      const session = { token: data.token, ...data.user };

      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } catch {}

      setUser(session);
      setAuthOpen(false);
      setForm({ name: "", email: "", password: "" });

      if (pendingId) {
        await addItem(pendingId, session.token);
      }

      setPendingId(null);
    } catch (error) {
      if (registered) setAuthMode("login");

      setAuthError(
        error instanceof TypeError
          ? "Cannot reach the server. Check that the backend is running."
          : registered
            ? "Account created, but login failed. Please log in."
            : error.message
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  const goTo = (cat) => {
    setCategory(cat);
    setSearch("");
    scrollToProducts();
  };

  const handleNavbarSearch = (term) => {
    setSearch(term);
    setCategory("All");
    scrollToProducts();
  };

  const resetFilters = () => {
    setCategory("All");
    setSearch("");
    setMinRating(0);
    setMaxPrice(0);
    setSort("relevance");
  };

  // Product card
  const renderCard = (product) => (
    <article className="card" key={product.id}>
      <div className="card-img" style={{ background: product.color }}>
        <button
          className={`heart ${wishlist.includes(product.id) ? "on" : ""}`}
          aria-label={`Save ${product.name}`}
          aria-pressed={wishlist.includes(product.id)}
          onClick={() => toggleWish(product.id)}
        >
          {wishlist.includes(product.id) ? "♥" : "♡"}
        </button>

        {product.image ? (
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        ) : (
          <span className="card-emoji">{product.emoji}</span>
        )}
      </div>

      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="specs">{product.specs}</p>

        <div className="rating-row">
          {product.rating > 0 ? (
            <>
              <span className="rating-pill">{product.rating.toFixed(1)} ★</span>
              <span className="reviews">
                ({product.reviews.toLocaleString("en-IN")})
              </span>
            </>
          ) : (
            <span className="reviews">No reviews yet</span>
          )}
        </div>

        <div className="price-row">
          <strong>{money(product.price)}</strong>

          {product.oldPrice > product.price && (
            <>
              <del>{money(product.oldPrice)}</del>
              <span className="off">{off(product)}% off</span>
            </>
          )}
        </div>

        <p className="free">
          {product.stock > 0 ? "In stock" : "Currently unavailable"}
        </p>

        <button
          className="btn-cart"
          onClick={() => addToCart(product.id)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </article>
  );

  return (
    <main>
      {/* 1. Navbar */}
      <Navbar
        user={user}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={openAuth}
        onLogout={logout}
        onSearch={handleNavbarSearch}
      />

      {/* 2. Hero banner */}
      <section className="hero" aria-label="Offers">
        {slides.map((item, index) => (
          <div
            key={item.title}
            className={`slide ${index === slide ? "show" : ""}`}
            style={{ background: item.bg }}
            aria-hidden={index !== slide}
          >
            <div className="slide-copy">
              <h1>{item.title}</h1>
              <p>{item.sub}</p>
              <button className="btn-white" onClick={() => goTo(item.cat)}>
                {item.cta}
              </button>
            </div>

            <div className="slide-emoji">{item.emoji}</div>
          </div>
        ))}

        <div className="dots">
          {slides.map((item, index) => (
            <button
              key={item.title}
              className={index === slide ? "dot on" : "dot"}
              aria-label={`Show offer ${index + 1}`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* 3. Trust strip */}
      <div className="trust">
        <span>🚚 Delivery options</span>
        <span>💵 Convenient payments</span>
        <span>↩️ Returns subject to policy</span>
        <span>🔒 Secure shopping</span>
      </div>

      {/* 4-6. Services, Sell device, Promo banners */}
      <OurServices />
      <SellDeviceSection />
      <HotDealsSection />

      {/* 7. Top discounts (from API) */}
      <section className="block" id="deals">
        <div className="block-head">
          <h2>Top Discounts</h2>
          <span className="timer">✨ Biggest savings first</span>
        </div>

        {productsLoading ? (
          <p>Loading offers...</p>
        ) : deals.length > 0 ? (
          <div className="deal-row">
            {deals.map((product) => (
              <button
                key={product.id}
                className="deal"
                onClick={() => addToCart(product.id)}
                aria-label={`Add ${product.name} to cart`}
              >
                <span className="deal-img" style={{ background: product.color }}>
                  {product.image ? (
                    <img src={product.image} alt="" loading="lazy" />
                  ) : (
                    product.emoji
                  )}
                </span>

                <span className="deal-name">{product.name}</span>
                <span className="deal-off">
                  {off(product) > 0 ? `${off(product)}% off` : "Available now"}
                </span>
                <span className="deal-price">{money(product.price)}</span>
              </button>
            ))}
          </div>
        ) : (
          <p>Offers abhi available nahi hain.</p>
        )}
      </section>

      {/* 8. Product listing */}
      <section className="shop" id="products">
        <aside className="filters">
          <h3>Filters</h3>

          <div className="f-group">
            <h4>Category</h4>

            {["All", ...categories.map((item) => item.name)].map((name) => (
              <label key={name}>
                <input
                  type="radio"
                  name="cat"
                  checked={category === name}
                  onChange={() => setCategory(name)}
                />{" "}
                {name}
              </label>
            ))}
          </div>

          <div className="f-group">
            <h4>Price</h4>

            {[
              [0, "Any price"],
              [5000, "Under ₹5,000"],
              [20000, "Under ₹20,000"],
              [50000, "Under ₹50,000"],
            ].map(([value, label]) => (
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

          <div className="f-group">
            <h4>Customer Ratings</h4>

            {[
              [0, "All ratings"],
              [4, "4★ & above"],
              [4.5, "4.5★ & above"],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="rate"
                  checked={minRating === value}
                  onChange={() => setMinRating(value)}
                />{" "}
                {label}
              </label>
            ))}
          </div>

          <button className="btn-link" onClick={resetFilters}>
            Clear all
          </button>
        </aside>

        <div className="results">
          <div className="sortbar">
            <div>
              <h2>{category === "All" ? "All Products" : category}</h2>
              <small>{filtered.length} items</small>
            </div>

            <div className="sort-opts">
              <span>Sort by</span>

              {sorts.map((item) => (
                <button
                  key={item.key}
                  className={sort === item.key ? "on" : ""}
                  onClick={() => setSort(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chips">
            {["All", ...categories.map((item) => item.name)].map((name) => (
              <button
                key={name}
                className={category === name ? "chip on" : "chip"}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {productsLoading ? (
            <div className="empty">
              <span>⏳</span>
              <h3>Loading products...</h3>
              <p>SELLBAR store se products laaye ja rahe hain.</p>
            </div>
          ) : productsError ? (
            <div className="empty">
              <span>⚠️</span>
              <h3>Products load nahi ho paaye</h3>
              <p>{productsError}</p>
              <button className="btn-cart" onClick={() => window.location.reload()}>
                Try again
              </button>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid">{filtered.map(renderCard)}</div>
          ) : (
            <div className="empty">
              <span>🔎</span>
              <h3>
                {products.length
                  ? "No products match your filters"
                  : "No products available yet"}
              </h3>
              <p>
                {products.length
                  ? "Search ya filters badal kar dekhein."
                  : "Approved sellers ke active products yahan dikhai denge."}
              </p>
              <button className="btn-cart" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}

          <p className="demo-note">
            Products and categories are loaded from the SELLBAR API.
          </p>
        </div>
      </section>

      {/* 9-10. More sections */}
      <ShowcaseSections />
      <HomeMoreSections />

      {/* 11. Seller section */}
      <section className="sell" id="account">
        <div>
          <h2>Sell on SELLBAR</h2>
          <p>
            Apne products ko SELLBAR par list karein aur customers tak
            pahunchayein.
          </p>
        </div>

        <a href="#products" className="btn-white">
          Explore Products
        </a>
      </section>

      {/* 12. Footer */}
      <Footer
        categories={categories}
        setCategory={setCategory}
        onResetFilters={resetFilters}
      />

      {/* Login / Register modal */}
      {authOpen && (
        <div className="modal-wrap" onClick={closeAuth}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Login"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-side">
              <h2>
                {authMode === "login" ? "Login" : "Looks like you're new here!"}
              </h2>

              <p>
                {authMode === "login"
                  ? "Get access to your cart, orders and wishlist."
                  : "Sign up with your email to get started."}
              </p>

              <span className="modal-emoji">🛍️</span>
            </div>

            <form className="modal-form" onSubmit={submitAuth}>
              <button
                type="button"
                className="modal-close"
                onClick={closeAuth}
                aria-label="Close"
              >
                ✕
              </button>

              {pendingId && (
                <p className="modal-note">
                  Please login to add items to your cart.
                </p>
              )}

              {authMode === "register" && (
                <input
                  placeholder="Full name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              )}

              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password (min 6 characters)"
                autoComplete={
                  authMode === "login" ? "current-password" : "new-password"
                }
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
              />

              {authError && (
                <p className="modal-error" role="alert">
                  {authError}
                </p>
              )}

              <button className="btn-order" type="submit" disabled={authLoading}>
                {authLoading
                  ? "Please wait..."
                  : authMode === "login"
                    ? "Login"
                    : "Create account"}
              </button>

              <button
                type="button"
                className="btn-link"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "register" : "login");
                  setAuthError("");
                }}
              >
                {authMode === "login"
                  ? "New to SELLBAR? Create an account"
                  : "Existing user? Log in"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}

      <aside className={`drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-head">
          <h3>My Cart ({cartCount})</h3>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 && (
            <div className="empty">
              <span>🛒</span>
              <h3>Your cart is empty</h3>
              <p>Add items to see them here.</p>
            </div>
          )}

          {cartItems.map((product) => (
            <div className="line" key={product.id}>
              <span className="line-img" style={{ background: product.color }}>
                {product.image ? (
                  <img src={product.image} alt="" loading="lazy" />
                ) : (
                  product.emoji
                )}
              </span>

              <div className="line-info">
                <strong>{product.name}</strong>

                <span>
                  {money(product.price)}{" "}
                  {product.oldPrice > product.price && (
                    <del>{money(product.oldPrice)}</del>
                  )}
                </span>

                <div className="qty">
                  <button
                    onClick={() => changeQty(product.id, -1)}
                    aria-label="Decrease"
                  >
                    −
                  </button>

                  <b>{cart[product.id]}</b>

                  <button
                    onClick={() => changeQty(product.id, 1)}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-foot">
            <p className="saved">You save {money(cartSaved)} on this order</p>

            <div className="total">
              <span>Total</span>
              <strong>{money(cartTotal)}</strong>
            </div>

            <button
              className="btn-order"
              onClick={() => {
                setCartOpen(false);
                window.location.href = "/checkout";
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </main>
  );
}