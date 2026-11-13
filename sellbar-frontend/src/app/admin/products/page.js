"use client";

import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { money } from "../../../lib/panel";
import { getCloudinaryUrl } from "../../../lib/cloudinary";
import { getProductImageUrl, getCategoryFallbackImage } from "@/lib/productImageHelper";

function AdminProductsList({ session }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Bulk Import state
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkRows, setBulkRows] = useState([]);
  const [bulkFileName, setBulkFileName] = useState("");
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkStatus, setBulkStatus] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    compareAtPrice: "",
    stock: "10",
    imageUrl: "",
    condition: "Flawless",
    warranty: "12 Months Doorstep Warranty",
    status: "active",
    badge: "Lowest Price",
    featuredType: "regular",
    isFeatured: false,
    description: "",
  });

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/products?limit=200", {
        headers: {
          "Content-Type": "application/json",
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
        },
        cache: "no-store",
      });

      const json = await res.json();
      if (json.success && json.data) {
        setProducts(json.data.products || []);
        if (json.data.categories) {
          setCategories(json.data.categories);
        }
      } else {
        throw new Error(json.message || "Failed to load products");
      }
    } catch (e) {
      setError(e.message || "Could not connect to product database.");
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError("Product name and price are required");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add product");
      }

      setSuccessMsg(`"${formData.name}" added successfully to database!`);
      setTimeout(() => setSuccessMsg(""), 4000);
      setIsAddModalOpen(false);
      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "",
        price: "",
        compareAtPrice: "",
        stock: "10",
        imageUrl: "",
        condition: "Flawless",
        warranty: "12 Months Doorstep Warranty",
        status: "active",
        badge: "Lowest Price",
        featuredType: "regular",
        isFeatured: false,
        description: "",
      });
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Update Product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setSubmitting(true);
      setError("");
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProduct._id,
          name: editingProduct.name,
          brand: editingProduct.brand,
          category: typeof editingProduct.category === "object" ? editingProduct.category?._id : editingProduct.category,
          price: editingProduct.price,
          compareAtPrice: editingProduct.compareAtPrice,
          stock: editingProduct.stock,
          status: editingProduct.status,
          condition: editingProduct.condition,
          warranty: editingProduct.warranty,
          badge: editingProduct.badge,
          imageUrl: editingProduct.images?.[0]?.url || editingProduct.imageUrl,
          description: editingProduct.description,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update product");
      }

      setSuccessMsg(`"${editingProduct.name}" updated successfully!`);
      setTimeout(() => setSuccessMsg(""), 4000);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Quick Status Toggle
  const handleToggleStatus = async (product) => {
    const nextStatus = product.status === "active" ? "draft" : "active";
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product._id, status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      setError("Failed to change status: " + err.message);
    }
  };

  // Helper to parse CSV string into array of objects
  const parseCSVText = (text) => {
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/^["']|["']$/g, ""));

    return lines.slice(1).map((line) => {
      const values = [];
      let insideQuote = false;
      let entry = "";
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          insideQuote = !insideQuote;
        } else if (char === "," && !insideQuote) {
          values.push(entry.trim());
          entry = "";
        } else {
          entry += char;
        }
      }
      values.push(entry.trim());

      const row = {};
      header.forEach((key, i) => {
        row[key] = (values[i] || "").replace(/^["']|["']$/g, "");
      });
      return row;
    });
  };

  // Download Sample CSV Template
  const handleDownloadSampleCSV = () => {
    const sample =
      "name,brand,category,price,compareAtPrice,stock,condition,warranty,badge,imageUrl,description\n" +
      '"Apple iPhone 14 (128GB - Blue)","Apple","mobile-phones",41999,69900,8,"Flawless","12 Months Doorstep Warranty","Lowest Price","https://images.unsplash.com/photo-1592750475338-74b7b21085ab","Certified pre-owned iPhone 14 with original box."\n' +
      '"Samsung Galaxy S23 5G (256GB - Phantom Black)","Samsung","mobile-phones",44999,74999,5,"Flawless","12 Months Doorstep Warranty","Top Rated","https://images.unsplash.com/photo-1610945415295-d9bbf067e59c","Premium flagship with Snapdragon 8 Gen 2."\n' +
      '"OnePlus 11 5G (16GB RAM / 256GB)","OnePlus","mobile-phones",36999,56999,12,"Good","12 Months Doorstep Warranty","Best Seller","https://images.unsplash.com/photo-1580910051074-3eb694886505","Superfast 100W SuperVOOC charger included."\n' +
      '"Apple MacBook Air M1 (8GB / 256GB SSD)","Apple","laptops",49999,92900,4,"Flawless","12 Months Doorstep Warranty","Apple Silicon","https://images.unsplash.com/photo-1611186871348-b1ce696e52c9","All-day battery life with 100% battery health."\n';

    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sellbar_products_sample_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle CSV file selection
  const handleCSVFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulkFileName(file.name);
    setBulkStatus(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const parsed = parseCSVText(content);
        setBulkRows(parsed);
      }
    };
    reader.readAsText(file);
  };

  // Submit bulk products
  const handleBulkSubmit = async () => {
    if (!bulkRows || bulkRows.length === 0) {
      setBulkStatus({ type: "error", message: "No product rows loaded to import." });
      return;
    }

    try {
      setBulkUploading(true);
      setBulkStatus(null);

      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: bulkRows }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to batch import products");
      }

      setBulkStatus({
        type: "success",
        message: `✓ Successfully imported ${data.count} products!${data.skippedCount ? ` (${data.skippedCount} skipped due to invalid data)` : ""}`,
      });

      setSuccessMsg(`Imported ${data.count} products from ${bulkFileName || "CSV"} successfully!`);
      setTimeout(() => setSuccessMsg(""), 5000);

      // Reload products list
      await loadProducts();
      setTimeout(() => {
        setIsBulkModalOpen(false);
        setBulkRows([]);
        setBulkFileName("");
        setBulkStatus(null);
      }, 1500);
    } catch (err) {
      setBulkStatus({ type: "error", message: err.message || "Bulk upload failed" });
    } finally {
      setBulkUploading(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (product) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${product.name}" from database?`
    );
    if (!confirmDelete) return;

    try {
      setError("");
      const res = await fetch(`/api/admin/products?id=${product._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product");
      }
      setSuccessMsg(`"${product.name}" deleted from database.`);
      setTimeout(() => setSuccessMsg(""), 4000);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtered list
  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase());

    const catSlug = (typeof p.category === "object" ? p.category?.slug : p.category) || "";
    const matchesCat =
      categoryFilter === "all" ||
      catSlug === categoryFilter ||
      p.category?._id === categoryFilter;

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  // Calculate quick stats
  const totalCount = products.length;
  const activeCount = products.filter((p) => p.status === "active").length;
  const lowStockCount = products.filter((p) => Number(p.stock) <= 3).length;
  const totalValue = products.reduce(
    (sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0),
    0
  );

  return (
    <div className="pn-box">
      {/* Top Banner / Notification */}
      {successMsg && (
        <div
          style={{
            background: "#dcfce7",
            color: "#15803d",
            padding: "10px 16px",
            borderRadius: 8,
            marginBottom: 16,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>✓ {successMsg}</span>
          <button
            onClick={() => setSuccessMsg("")}
            style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            padding: "10px 16px",
            borderRadius: 8,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>⚠️ {error}</span>
          <button
            onClick={() => setError("")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div style={{ fontSize: 12, color: "#64748b", fontWeight: "600" }}>Total Products</div>
          <div style={{ fontSize: 24, fontWeight: "800", color: "#0f172a" }}>{totalCount}</div>
        </div>

        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div style={{ fontSize: 12, color: "#166534", fontWeight: "600" }}>Active on Website</div>
          <div style={{ fontSize: 24, fontWeight: "800", color: "#15803d" }}>{activeCount}</div>
        </div>

        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fef3c7",
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div style={{ fontSize: 12, color: "#b45309", fontWeight: "600" }}>Low / Out of Stock</div>
          <div style={{ fontSize: 24, fontWeight: "800", color: "#d97706" }}>{lowStockCount}</div>
        </div>

        <div
          style={{
            background: "#f0f9ff",
            border: "1px solid #e0f2fe",
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div style={{ fontSize: 12, color: "#0369a1", fontWeight: "600" }}>Inventory Worth</div>
          <div style={{ fontSize: 20, fontWeight: "800", color: "#0284c7" }}>
            {money(totalValue)}
          </div>
        </div>
      </div>

      {/* Header and Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: "800" }}>
            Products ({filtered.length})
          </h2>
          <span
            style={{
              fontSize: 12,
              background: "#e2e8f0",
              color: "#334155",
              padding: "2px 8px",
              borderRadius: 12,
              fontWeight: 600,
            }}
          >
            Live DB Connected
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            style={{
              background: "#0284c7",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: "700",
              fontSize: 13,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>📥</span> Bulk CSV Import
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            style={{
              background: "#13b59b",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: "700",
              fontSize: 13,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>➕</span> Add New Product
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 16,
          background: "#fafafa",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #eee",
        }}
      >
        <input
          type="text"
          placeholder="Search by title, brand, or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 13,
          }}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 13,
            background: "#fff",
          }}
        >
          <option value="all">All Categories</option>
          <option value="mobile-phones">Mobile Phones</option>
          <option value="laptop">Laptops</option>
          <option value="smart-watches">Smart Watches</option>
          <option value="tablets">Tablets</option>
          <option value="gaming-consoles">Gaming Consoles</option>
          <option value="cameras">Cameras</option>
          <option value="electronics">Audio &amp; Electronics</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 13,
            background: "#fff",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <button
          type="button"
          onClick={loadProducts}
          title="Refresh from MongoDB"
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: "1px solid #cbd5e1",
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Main Table */}
      {loading ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "#64748b" }}>
          <p style={{ fontSize: 16, fontWeight: "600" }}>Loading products from MongoDB Atlas...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "#64748b" }}>
          <p style={{ fontSize: 16, fontWeight: "600" }}>No products match your search or filters.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategoryFilter("all");
              setStatusFilter("all");
            }}
            style={{
              marginTop: 8,
              padding: "6px 12px",
              background: "#13b59b",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "10px 12px", width: 50 }}>Image</th>
                <th style={{ padding: "10px 12px" }}>Product Name</th>
                <th style={{ padding: "10px 12px" }}>Category</th>
                <th style={{ padding: "10px 12px" }}>Brand</th>
                <th style={{ padding: "10px 12px" }}>Selling Price</th>
                <th style={{ padding: "10px 12px" }}>Stock</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
                <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const img = getProductImageUrl(p);
                const catName =
                  typeof p.category === "object"
                    ? p.category?.name || p.category?.slug
                    : p.category || "General";

                return (
                  <tr
                    key={p._id || p.id}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td style={{ padding: "8px 12px" }}>
                      <img
                        src={img}
                        alt=""
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getCategoryFallbackImage(catName);
                        }}
                        style={{
                          width: 44,
                          height: 44,
                          objectFit: "contain",
                          borderRadius: 6,
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          padding: 2,
                        }}
                      />
                    </td>
                    <td style={{ padding: "8px 12px", fontWeight: "600", color: "#1e293b", maxWidth: 260 }}>
                      <div title={p.name} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b", fontWeight: "normal" }}>
                        {p.condition || "Refurbished"} • {p.badge || "Assured"}
                      </div>
                    </td>
                    <td style={{ padding: "8px 12px", color: "#475569" }}>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 12,
                          background: "#e0f2fe",
                          color: "#0369a1",
                          fontWeight: "600",
                        }}
                      >
                        {catName}
                      </span>
                    </td>
                    <td style={{ padding: "8px 12px", color: "#475569", fontWeight: "500" }}>
                      {p.brand || "—"}
                    </td>
                    <td style={{ padding: "8px 12px", fontWeight: "700", color: "#0f172a" }}>
                      {money(p.price || 0)}
                      {p.compareAtPrice && (
                        <div style={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through", fontWeight: "normal" }}>
                          {money(p.compareAtPrice)}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "8px 12px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: Number(p.stock) <= 3 ? "#dc2626" : "#16a34a",
                        }}
                      >
                        {p.stock ?? "0"} in stock
                      </span>
                    </td>
                    <td style={{ padding: "8px 12px" }}>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p)}
                        title="Click to toggle status"
                        style={{
                          fontSize: 11,
                          fontWeight: "700",
                          padding: "3px 10px",
                          borderRadius: 12,
                          border: "none",
                          cursor: "pointer",
                          background: p.status === "active" ? "#dcfce7" : "#f1f5f9",
                          color: p.status === "active" ? "#166534" : "#475569",
                        }}
                      >
                        {p.status === "active" ? "● Active" : "○ " + (p.status || "Draft")}
                      </button>
                    </td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...p })}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 4,
                            border: "1px solid #cbd5e1",
                            background: "#fff",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: "600",
                            color: "#0f172a",
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 4,
                            border: "1px solid #fecaca",
                            background: "#fff",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: "600",
                            color: "#dc2626",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD PRODUCT MODAL                                       */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 620,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: "800" }}>➕ Add New Product</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apple iPhone 15 Pro (128GB) - Refurbished"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, background: "#fff" }}
                  >
                    <option value="">Select Category</option>
                    <option value="mobile-phones">Mobile Phones</option>
                    <option value="laptop">Laptops</option>
                    <option value="smart-watches">Smart Watches</option>
                    <option value="tablets">Tablets</option>
                    <option value="gaming-consoles">Gaming Consoles</option>
                    <option value="cameras">Cameras</option>
                    <option value="electronics">Audio &amp; Electronics</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apple, Samsung, Dell"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 34999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Original / Compare Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 69999"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, background: "#fff" }}
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Product Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://res.cloudinary.com/... or /products/sample.webp"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Condition Badge
                  </label>
                  <input
                    type="text"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Warranty
                  </label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Brief description of product features, specifications, and certified inspection details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: "8px 16px",
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "8px 20px",
                    background: "#13b59b",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  {submitting ? "Saving to Database..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EDIT PRODUCT MODAL                                      */}
      {/* ======================================================== */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 620,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: "800" }}>✏️ Edit Product</h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProduct}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Brand
                  </label>
                  <input
                    type="text"
                    value={editingProduct.brand || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Status
                  </label>
                  <select
                    value={editingProduct.status || "active"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, background: "#fff" }}
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingProduct.price || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.compareAtPrice || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, compareAtPrice: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock ?? ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Badge
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProduct.images?.[0]?.url || editingProduct.imageUrl || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        images: [{ url: e.target.value, publicId: "", alt: editingProduct.name }],
                      })
                    }
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{
                    padding: "8px 16px",
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "8px 20px",
                    background: "#13b59b",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  {submitting ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Import Modal */}
      {isBulkModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              maxWidth: 820,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              padding: 24,
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: 16,
                marginBottom: 20,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                  📥 Bulk Import Products via CSV / Excel
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748b" }}>
                  Upload a batch of refurbished inventory listings directly into your MongoDB catalog.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsBulkModalOpen(false);
                  setBulkStatus(null);
                }}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                }}
              >
                ✕
              </button>
            </div>

            {/* Template Download & File Picker Box */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px dashed #cbd5e1",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                  1. Get Sample Template
                </div>
                <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px" }}>
                  Download the formatted CSV file with required columns (name, brand, category, price, stock, etc.).
                </p>
                <button
                  type="button"
                  onClick={handleDownloadSampleCSV}
                  style={{
                    padding: "8px 14px",
                    background: "#0284c7",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  📄 Download Sample CSV Template
                </button>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px dashed #cbd5e1",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                  2. Select / Upload Your CSV File
                </div>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCSVFileChange}
                  style={{
                    fontSize: 12,
                    display: "block",
                    width: "100%",
                    padding: "6px 0",
                    cursor: "pointer",
                  }}
                />
                {bulkFileName && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "#0284c7", fontWeight: 600 }}>
                    Selected: {bulkFileName} ({bulkRows.length} rows parsed)
                  </div>
                )}
              </div>
            </div>

            {/* Status alerts */}
            {bulkStatus && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  marginBottom: 16,
                  fontSize: 12,
                  fontWeight: 600,
                  background: bulkStatus.type === "success" ? "#dcfce7" : "#fee2e2",
                  color: bulkStatus.type === "success" ? "#15803d" : "#b91c1c",
                  border: `1px solid ${bulkStatus.type === "success" ? "#bbf7d0" : "#fca5a5"}`,
                }}
              >
                {bulkStatus.message}
              </div>
            )}

            {/* Preview of Parsed Rows */}
            {bulkRows.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                    File Preview ({bulkRows.length} Items Detected)
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      background: "#e0f2fe",
                      color: "#0369a1",
                      padding: "2px 8px",
                      borderRadius: 10,
                      fontWeight: 700,
                    }}
                  >
                    Ready for Validation
                  </span>
                </div>

                <div
                  style={{
                    maxHeight: 260,
                    overflowY: "auto",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr style={{ background: "#f1f5f9", textAlign: "left", color: "#475569" }}>
                        <th style={{ padding: "8px 10px" }}>#</th>
                        <th style={{ padding: "8px 10px" }}>Product Name</th>
                        <th style={{ padding: "8px 10px" }}>Brand</th>
                        <th style={{ padding: "8px 10px" }}>Category</th>
                        <th style={{ padding: "8px 10px" }}>Price (₹)</th>
                        <th style={{ padding: "8px 10px" }}>Stock</th>
                        <th style={{ padding: "8px 10px" }}>Condition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkRows.slice(0, 30).map((r, idx) => {
                        const name = r.name || r.Name || r.title || "";
                        const price = r.price !== undefined ? r.price : r.Price;
                        const isValid = name.trim() && !isNaN(Number(price));

                        return (
                          <tr
                            key={idx}
                            style={{
                              borderBottom: "1px solid #f1f5f9",
                              background: isValid ? "#fff" : "#fff1f2",
                            }}
                          >
                            <td style={{ padding: "6px 10px", color: "#94a3b8" }}>{idx + 1}</td>
                            <td style={{ padding: "6px 10px", fontWeight: 600, color: "#1e293b" }}>
                              {name || <span style={{ color: "#e11d48" }}>[Missing Name]</span>}
                            </td>
                            <td style={{ padding: "6px 10px", color: "#64748b" }}>{r.brand || r.Brand || "-"}</td>
                            <td style={{ padding: "6px 10px", color: "#64748b" }}>{r.category || r.Category || "default"}</td>
                            <td style={{ padding: "6px 10px", fontWeight: 700, color: "#0f172a" }}>
                              {price !== undefined && !isNaN(Number(price)) ? (
                                `₹${Number(price).toLocaleString("en-IN")}`
                              ) : (
                                <span style={{ color: "#e11d48" }}>[Invalid]</span>
                              )}
                            </td>
                            <td style={{ padding: "6px 10px", color: "#64748b" }}>{r.stock || r.Stock || 10}</td>
                            <td style={{ padding: "6px 10px" }}>
                              <span
                                style={{
                                  background: "#f0fdf4",
                                  color: "#166534",
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  fontSize: 10,
                                  fontWeight: 600,
                                }}
                              >
                                {r.condition || r.Condition || "Flawless"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {bulkRows.length > 30 && (
                    <div style={{ textAlign: "center", padding: 8, fontSize: 11, color: "#64748b", background: "#f8fafc" }}>
                      ...and {bulkRows.length - 30} more products
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                borderTop: "1px solid #e2e8f0",
                paddingTop: 16,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsBulkModalOpen(false);
                  setBulkStatus(null);
                }}
                style={{
                  padding: "8px 18px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkSubmit}
                disabled={bulkUploading || bulkRows.length === 0}
                style={{
                  padding: "8px 22px",
                  background: bulkRows.length > 0 ? "#13b59b" : "#94a3b8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: bulkRows.length > 0 ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {bulkUploading ? (
                  <span>⏳ Importing {bulkRows.length} Products...</span>
                ) : (
                  <span>🚀 Import {bulkRows.length} Products to Catalog</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <PanelShell role="admin" title="Products">
      {(session) => <AdminProductsList session={session} />}
    </PanelShell>
  );
}
