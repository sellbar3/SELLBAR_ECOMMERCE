"use client";

import { useEffect, useState } from "react";
import AutoTable from "./AutoTable";
import { label, money, panelRequest } from "../lib/panel";

const isMoney = (k) => /revenue|sales|earning|amount/i.test(k);

export default function DashboardView({ endpoint, session }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    panelRequest(endpoint, { token: session.token })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [endpoint, session.token]);

  if (error) return <p className="pn-err">{error}</p>;
  if (!data) return <p>Loading...</p>;

  // Collect numbers (also from one nested level, e.g. data.stats.totalOrders)
  const stats = [];
  const collect = (obj) => {
    for (const [k, v] of Object.entries(obj || {})) {
      if (typeof v === "number") stats.push([k, v]);
      else if (v && typeof v === "object" && !Array.isArray(v) && !v._id) collect(v);
    }
  };
  collect(data);

  const lists = [];
  const findLists = (obj) => {
    for (const [k, v] of Object.entries(obj || {})) {
      if (Array.isArray(v) && v.length && typeof v[0] === "object") lists.push([k, v]);
      else if (v && typeof v === "object" && !Array.isArray(v)) findLists(v);
    }
  };
  findLists(data);

  return (
    <>
      <div className="pn-cards">
        {stats.map(([k, v]) => (
          <div className="pn-card" key={k}>
            <small>{label(k)}</small>
            <strong>{isMoney(k) ? money(v) : v.toLocaleString("en-IN")}</strong>
          </div>
        ))}
      </div>

      {lists.map(([k, rows]) => (
        <div className="pn-box" key={k}>
          <h2>{label(k)}</h2>
          <AutoTable rows={rows.slice(0, 10)} />
        </div>
      ))}

      {!stats.length && !lists.length && (
        <pre className="pn-box">{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
}
