"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { panelRequest } from "../lib/panel";

export default function ProductForm({ session, productId }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    name: "", description: "", brand: "", sku: "", category: "",
    price: "", compareAtPrice: "", stock: "", status: "active",
  });

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    panelRequest("/public/categories")
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});

    if (productId) {
      panelRequest(`/products/${productId}`, { token: session.token })
        .then((d) => {
          const p = d.product || d;
          setF({
            name: p.name || "",
            description: p.description || "",
            brand: p.brand || "",
            sku: p.sku || "",
            category: p.category?._id || p.category || "",
            price: p.price ?? "",
            compareAtPrice: p.compareAtPrice ?? "",
            stock: p.stock ?? "",
            status: p.status || "active",
          });
        })
        .catch((e) => setError(e.message));
    }
  }, [productId, session.token]);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = new FormData();
    Object.entries(f).forEach(([k, v]) => {
      if (v !== "" && v !== null) body.append(k, v);
    });
    files.forEach((file) => body.append("images", file));

    try {
      await panelRequest(productId ? `/products/${productId}` : "/products", {
        method: productId ? "PATCH" : "POST",
        body,
        token: session.token,
      });
      router.push("/vendor/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="pn-box pn-form" onSubmit={submit}>
      <label>Product name<input required value={f.name} onChange={set("name")} /></label>
      <label>Brand<input value={f.brand} onChange={set("brand")} /></label>
      <label>SKU<input value={f.sku} onChange={set("sku")} /></label>
      <label>
        Category
        <select required value={f.category} onChange={set("category")}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </label>
      <label>Price (₹)<input required type="number" min="0" value={f.price} onChange={set("price")} /></label>
      <label>Old price / MRP (₹)<input type="number" min="0" value={f.compareAtPrice} onChange={set("compareAtPrice")} /></label>
      <label>Stock<input required type="number" min="0" value={f.stock} onChange={set("stock")} /></label>
      <label>
        Status
        <select value={f.status} onChange={set("status")}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <label className="full">Description<textarea rows={4} value={f.description} onChange={set("description")} /></label>
      <label className="full">
        Images (max 10)
        <input type="file" accept="image/*" multiple onChange={(e) => setFiles([...e.target.files])} />
      </label>

      {error && <p className="pn-err full">{error}</p>}

      <div className="full pn-row">
        <button className="pn-btn" disabled={saving}>{saving ? "Saving..." : productId ? "Update product" : "Add product"}</button>
        <button type="button" className="pn-btn gray" onClick={() => router.push("/vendor/products")}>Cancel</button>
      </div>
    </form>
  );
}
