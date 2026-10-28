"use client";

import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { panelRequest, pickList } from "../../../lib/panel";

const EMPTY = { name: "", description: "", parent: "", sortOrder: 0, isActive: true };
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function Categories({ session }) {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState({ ok: "", err: "" });
  const [saving, setSaving] = useState(false);

  // image state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [removeImage, setRemoveImage] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await panelRequest("/categories?limit=100", { token: session.token });
      setRows(pickList(d, "categories"));
    } catch (e) {
      setMsg({ ok: "", err: e.message });
    }
  }, [session.token]);

  useEffect(() => { load(); }, [load]);

  // selected file ka preview + memory cleanup
  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      e.target.value = "";
      return setMsg({ ok: "", err: "Sirf image file select karo." });
    }
    if (f.size > MAX_SIZE) {
      e.target.value = "";
      return setMsg({ ok: "", err: "Image 5MB se choti honi chahiye." });
    }
    setMsg({ ok: "", err: "" });
    setFile(f);
    setRemoveImage(false);
  }

  function startEdit(c) {
    setEditId(c._id);
    setForm({
      name: c.name || "",
      description: c.description || "",
      parent: c.parent?._id || "",
      sortOrder: c.sortOrder ?? 0,
      isActive: c.isActive !== false,
    });
    setFile(null);
    setRemoveImage(false);
    setExistingImage(c.image?.url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditId(null);
    setForm(EMPTY);
    setFile(null);
    setExistingImage("");
    setRemoveImage(false);
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setMsg({ ok: "", err: "" });

    const body = new FormData();
    body.append("name", form.name.trim());
    body.append("description", form.description.trim());
    body.append("parent", form.parent); // "" = main category, backend null bana deta hai
    body.append("sortOrder", String(Number(form.sortOrder) || 0));
    body.append("isActive", String(form.isActive));
    if (file) body.append("image", file);
    if (removeImage) body.append("removeImage", "true");

    try {
      await panelRequest(editId ? `/categories/${editId}` : "/categories", {
        method: editId ? "PATCH" : "POST",
        token: session.token,
        body,
      });
      setMsg({ ok: editId ? "Category update ho gayi." : "Category add ho gayi.", err: "" });
      reset();
      load();
    } catch (err) {
      setMsg({ ok: "", err: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function toggle(c) {
    setMsg({ ok: "", err: "" });
    try {
      // sirf isActive bhej rahe hain, JSON body, FormData nahi
      await panelRequest(`/categories/${c._id}`, {
        method: "PATCH",
        token: session.token,
        body: { isActive: !c.isActive },
      });
      load();
    } catch (err) {
      setMsg({ ok: "", err: err.message });
    }
  }

  async function deactivate(c) {
    if (!window.confirm(`"${c.name}" ko deactivate karna hai? Products safe rahenge.`)) return;
    try {
      await panelRequest(`/categories/${c._id}`, { method: "DELETE", token: session.token });
      load();
    } catch (err) {
      setMsg({ ok: "", err: err.message });
    }
  }

  const parentOptions = rows.filter((c) => !c.parent && c._id !== editId);
  const shownImage = preview || (!removeImage ? existingImage : "");

  return (
    <>
      <form className="pn-box pn-form" onSubmit={submit}>
        <h2 className="full">{editId ? "Edit category" : "Add new category"}</h2>

        <label>Name<input required minLength={2} maxLength={100} value={form.name} onChange={set("name")} /></label>
        <label>
          Parent category (optional)
          <select value={form.parent} onChange={set("parent")}>
            <option value="">— None (main category) —</option>
            {parentOptions.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </label>
        <label>Sort order<input type="number" min="0" value={form.sortOrder} onChange={set("sortOrder")} /></label>
        <label>
          Category image (optional, max 5MB)
          <input key={file ? "has" : "none"} type="file" accept="image/*" onChange={onFile} />
        </label>

        {shownImage && (
          <div className="full pn-row">
            <img
              className="th"
              src={shownImage}
              alt="preview"
              style={{ width: 80, height: 80, objectFit: "cover" }}
            />
            {preview ? (
              <button type="button" className="pn-btn gray" onClick={() => setFile(null)}>
                Nayi image hatao
              </button>
            ) : (
              <button type="button" className="pn-btn gray" onClick={() => setRemoveImage(true)}>
                Image remove karo
              </button>
            )}
          </div>
        )}

        <label className="full">Description<textarea rows={2} maxLength={500} value={form.description} onChange={set("description")} /></label>
        <label className="pn-row" style={{ flexDirection: "row" }}>
          <input type="checkbox" checked={form.isActive} onChange={set("isActive")} /> Active (store par dikhe)
        </label>

        {msg.err && <p className="pn-err full">{msg.err}</p>}
        {msg.ok && <p className="pn-ok full">{msg.ok}</p>}

        <div className="full pn-row">
          <button className="pn-btn" disabled={saving}>{saving ? "Saving..." : editId ? "Update category" : "Add category"}</button>
          {editId && <button type="button" className="pn-btn gray" onClick={reset}>Cancel edit</button>}
        </div>
      </form>

      <div className="pn-box">
        <h2>All categories ({rows.length})</h2>
        <table>
          <thead><tr><th></th><th>Name</th><th>Slug</th><th>Parent</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c._id}>
                <td>{c.image?.url ? <img className="th" src={c.image.url} alt="" /> : "🗂️"}</td>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>{c.parent?.name || "—"}</td>
                <td>{c.sortOrder}</td>
                <td><span className="pn-badge">{c.isActive ? "active" : "inactive"}</span></td>
                <td className="pn-row">
                  <button className="pn-btn" onClick={() => startEdit(c)}>Edit</button>
                  <button className={`pn-btn ${c.isActive ? "gray" : "green"}`} onClick={() => (c.isActive ? deactivate(c) : toggle(c))}>
                    {c.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function AdminCategories() {
  return <PanelShell role="admin" title="Categories">{(s) => <Categories session={s} />}</PanelShell>;
}