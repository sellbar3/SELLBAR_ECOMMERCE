"use client";

import { fmtDate, label, money } from "../lib/panel";

const SKIP = new Set(["_id", "__v", "password", "token", "items", "images"]);

function cell(key, v) {
  if (v === null || v === undefined || v === "") return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number")
    return /total|amount|price|revenue|sales|subtotal/i.test(key) ? money(v) : v;
  if (typeof v === "string") return /At$|date/i.test(key) ? fmtDate(v) : v;
  if (typeof v === "object") return v.name || v.storeName || v.email || null;
  return null;
}

// Generic table: shows up to 6 simple columns of any list of objects.
export default function AutoTable({ rows }) {
  if (!rows?.length) return <p>Kuch nahi mila.</p>;

  const cols = Object.keys(rows[0])
    .filter((k) => !SKIP.has(k) && cell(k, rows[0][k]) !== null)
    .slice(0, 6);

  return (
    <table>
      <thead>
        <tr>{cols.map((c) => <th key={c}>{label(c)}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row._id || i}>
            {cols.map((c) => <td key={c}>{String(cell(c, row[c]) ?? "")}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
