"use client";

import { useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { panelRequest } from "../../../lib/panel";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const TYPES = ["image/jpeg", "image/png", "image/webp"];
const FIELDS = ["storeName", "storeDescription", "phone", "address"];

function Profile({ session }) {
  const [orig, setOrig] = useState(null);
  const [vals, setVals] = useState({});
  const [msg, setMsg] = useState({ ok: "", err: "" });
  const [saving, setSaving] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [removeLogo, setRemoveLogo] = useState(false);

  useEffect(() => {
    panelRequest("/vendor/profile", { token: session.token })
      .then((d) => {
        const p = d.vendor || d.profile || d;
        setOrig(p);
        setVals({
          storeName: p.storeName || "",
          storeDescription: p.storeDescription || "",
          phone: p.phone || "",
          address: p.address || "",
        });
      })
      .catch((e) => setMsg({ ok: "", err: e.message }));
  }, [session.token]);

  // chuni hui file ka preview + cleanup
  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const set = (k) => (e) => setVals({ ...vals, [k]: e.target.value });

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!TYPES.includes(f.type)) {
      e.target.value = "";
      return setMsg({ ok: "", err: "Sirf JPG, PNG ya WebP image chuno." });
    }
    if (f.size > MAX_SIZE) {
      e.target.value = "";
      return setMsg({ ok: "", err: "Image 5MB se choti honi chahiye." });
    }
    setMsg({ ok: "", err: "" });
    setFile(f);
    setRemoveLogo(false);
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setMsg({ ok: "", err: "" });

    const body = new FormData();
    FIELDS.forEach((k) => body.append(k, (vals[k] || "").trim()));
    if (file) body.append("logo", file);
    if (removeLogo) body.append("removeLogo", "true");

    try {
      const d = await panelRequest("/vendor/profile", {
        method: "PATCH",
        token: session.token,
        body,
      });
      setOrig(d.vendor || d);
      setFile(null);
      setRemoveLogo(false);
      setMsg({ ok: "Profile update ho gaya.", err: "" });
    } catch (err) {
      setMsg({ ok: "", err: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (!orig) return <p>{msg.err || "Loading..."}</p>;

  const logoSrc = preview || (!removeLogo ? orig.logo?.url : "");
  const initial = (vals.storeName || "S").charAt(0).toUpperCase();

  return (
    <>
      {/* Header card: logo + store info */}
      <div className="pn-box" style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div
          style={{
            width: 110, height: 110, borderRadius: "50%", overflow: "hidden",
            background: "#e8edf5", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 42, fontWeight: 700, color: "#1a2540",
            border: "3px solid #e2e8f0", flexShrink: 0,
          }}
        >
          {logoSrc
            ? <img src={logoSrc} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : initial}
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 style={{ margin: "0 0 8px" }}>{vals.storeName || "Your store"}</h2>
          <div className="pn-row" style={{ marginBottom: 12 }}>
            <span className="pn-badge">{orig.approvalStatus}</span>
            <span className="pn-badge">{orig.isStoreActive ? "store active" : "store inactive"}</span>
          </div>

          <div className="pn-row">
            <label className="pn-btn" style={{ cursor: "pointer", margin: 0 }}>
              {logoSrc ? "Logo badlo" : "Logo upload karo"}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} hidden />
            </label>

            {preview && (
              <button type="button" className="pn-btn gray" onClick={() => setFile(null)}>
                Nayi image hatao
              </button>
            )}
            {!preview && orig.logo?.url && !removeLogo && (
              <button type="button" className="pn-btn gray" onClick={() => setRemoveLogo(true)}>
                Logo remove karo
              </button>
            )}
          </div>
          <small style={{ color: "#64748b" }}>JPG, PNG ya WebP, max 5MB</small>
        </div>
      </div>

      {/* Edit form */}
      <form className="pn-box pn-form" onSubmit={save}>
        <h2 className="full">Store details</h2>

        <label>
          Store name
          <input required maxLength={120} value={vals.storeName} onChange={set("storeName")} />
        </label>
        <label>
          Phone
          <input value={vals.phone} onChange={set("phone")} />
        </label>
        <label className="full">
          Address
          <input value={vals.address} onChange={set("address")} />
        </label>
        <label className="full">
          Store description
          <textarea rows={4} maxLength={2000} value={vals.storeDescription} onChange={set("storeDescription")} />
        </label>

        {msg.err && <p className="pn-err full">{msg.err}</p>}
        {msg.ok && <p className="pn-ok full">{msg.ok}</p>}

        <div className="full">
          <button className="pn-btn" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </>
  );
}

export default function VendorProfile() {
  return <PanelShell role="vendor" title="Store Profile">{(s) => <Profile session={s} />}</PanelShell>;
}