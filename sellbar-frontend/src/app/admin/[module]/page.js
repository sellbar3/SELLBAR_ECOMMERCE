
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PanelShell from "../../../components/PanelShell";
import {
  readRecords,
  writeRecords,
  makeRecordId,
  downloadCSV,
} from "../../../lib/adminDemoStore";

const MODULES = {
  orders: {
    title: "Orders",
    fields: [
      ["orderNumber", "Order Number"],
      ["customer", "Customer"],
      ["email", "Email"],
      ["total", "Total Amount (₹)", "number"],
      ["paymentMethod", "Payment Method", "select", ["COD", "Online"]],
      ["address", "Shipping Address"],
    ],
    statuses: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    initial: [
      {
        orderNumber: "ORD-DEMO-1001",
        customer: "Demo Customer",
        email: "customer@example.com",
        total: "1499",
        paymentMethod: "COD",
        address: "Demo Address",
        status: "Pending",
      },
    ],
  },

  payments: {
    title: "Payments & Refunds",
    fields: [
      ["transactionId", "Transaction ID"],
      ["orderNumber", "Order Number"],
      ["customer", "Customer"],
      ["amount", "Amount (₹)", "number"],
      ["method", "Payment Method", "select", ["COD", "UPI", "Card", "Razorpay"]],
      ["reason", "Refund Reason"],
    ],
    statuses: ["Pending", "Paid", "Failed", "Refund Requested", "Refunded"],
    initial: [
      {
        transactionId: "TXN-DEMO-001",
        orderNumber: "ORD-DEMO-1001",
        customer: "Demo Customer",
        amount: "1499",
        method: "COD",
        reason: "",
        status: "Pending",
      },
    ],
  },

  payouts: {
    title: "Commissions & Payouts",
    fields: [
      ["vendor", "Vendor"],
      ["orderNumber", "Order Reference"],
      ["sales", "Sales Amount (₹)", "number"],
      ["rate", "Commission (%)", "number"],
      ["reference", "Payout Reference"],
    ],
    statuses: ["Pending", "Approved", "Paid", "Rejected"],
    initial: [
      {
        vendor: "Demo Vendor",
        orderNumber: "ORD-DEMO-1001",
        sales: "5000",
        rate: "10",
        reference: "PAY-DEMO-001",
        status: "Pending",
      },
    ],
  },

  inventory: {
    title: "Inventory",
    fields: [
      ["sku", "SKU"],
      ["product", "Product Name"],
      ["vendor", "Vendor"],
      ["quantity", "Stock Quantity", "number"],
      ["reorderLevel", "Low Stock Threshold", "number"],
    ],
    statuses: ["In Stock", "Low Stock", "Out of Stock"],
    initial: [
      {
        sku: "SKU-DEMO-001",
        product: "Demo Product",
        vendor: "Demo Vendor",
        quantity: "20",
        reorderLevel: "5",
        status: "In Stock",
      },
    ],
  },

  coupons: {
    title: "Coupons & Offers",
    fields: [
      ["code", "Coupon Code"],
      ["discountType", "Discount Type", "select", ["Percentage", "Fixed Amount"]],
      ["discount", "Discount Value", "number"],
      ["minimumOrder", "Minimum Order (₹)", "number"],
      ["expiry", "Expiry Date", "date"],
    ],
    statuses: ["Active", "Inactive", "Expired"],
    initial: [
      {
        code: "WELCOME10",
        discountType: "Percentage",
        discount: "10",
        minimumOrder: "499",
        expiry: "2027-12-31",
        status: "Active",
      },
    ],
  },

  reviews: {
    title: "Reviews",
    fields: [
      ["customer", "Customer"],
      ["product", "Product"],
      ["rating", "Rating (1-5)", "number"],
      ["comment", "Review Comment", "textarea"],
    ],
    statuses: ["Pending", "Approved", "Rejected"],
    initial: [
      {
        customer: "Demo Customer",
        product: "Demo Product",
        rating: "5",
        comment: "Sample review",
        status: "Pending",
      },
    ],
  },

  returns: {
    title: "Returns & Complaints",
    fields: [
      ["requestId", "Request ID"],
      ["orderNumber", "Order Number"],
      ["customer", "Customer"],
      ["reason", "Reason", "textarea"],
      ["resolution", "Resolution Note", "textarea"],
    ],
    statuses: ["Pending", "Under Review", "Approved", "Rejected", "Resolved"],
    initial: [
      {
        requestId: "RET-DEMO-001",
        orderNumber: "ORD-DEMO-1001",
        customer: "Demo Customer",
        reason: "Damaged item",
        resolution: "",
        status: "Pending",
      },
    ],
  },

  shipping: {
    title: "Shipping",
    fields: [
      ["orderNumber", "Order Number"],
      ["carrier", "Courier / Carrier"],
      ["trackingNumber", "Tracking Number"],
      ["shippingCost", "Shipping Cost (₹)", "number"],
      ["deliveryDate", "Estimated Delivery", "date"],
    ],
    statuses: ["Processing", "Shipped", "In Transit", "Delivered", "Delivery Failed"],
    initial: [
      {
        orderNumber: "ORD-DEMO-1001",
        carrier: "Demo Courier",
        trackingNumber: "SHIP-DEMO-001",
        shippingCost: "80",
        deliveryDate: "2026-11-05",
        status: "Processing",
      },
    ],
  },

  reports: {
    title: "Reports & Analytics",
    fields: [
      ["reportName", "Report Name"],
      ["period", "Reporting Period"],
      ["description", "Description", "textarea"],
    ],
    statuses: ["Available", "Processing", "Archived"],
    initial: [
      {
        reportName: "Monthly Sales",
        period: "October 2026",
        description: "Demo report",
        status: "Available",
      },
    ],
  },

  notifications: {
    title: "Notifications",
    fields: [
      ["title", "Notification Title"],
      ["audience", "Audience", "select", ["All Customers", "All Vendors", "Staff", "Selected Users"]],
      ["message", "Message", "textarea"],
      ["scheduledAt", "Schedule Date", "date"],
    ],
    statuses: ["Draft", "Scheduled", "Sent", "Cancelled"],
    initial: [
      {
        title: "Welcome to SELLBAR",
        audience: "All Customers",
        message: "Welcome to our store",
        scheduledAt: "",
        status: "Draft",
      },
    ],
  },

  staff: {
    title: "Staff & Permissions",
    fields: [
      ["name", "Staff Name"],
      ["email", "Email", "email"],
      ["role", "Role", "select", ["Admin", "Manager", "Order Manager", "Support", "Inventory Manager", "Analyst"]],
      ["permissions", "Permissions", "textarea"],
    ],
    statuses: ["Active", "Inactive"],
    initial: [
      {
        name: "Demo Staff",
        email: "staff@example.com",
        role: "Support",
        permissions: "view_orders, manage_complaints",
        status: "Active",
      },
    ],
  },

  settings: {
    title: "Website Settings",
    fields: [
      ["key", "Setting Name"],
      ["value", "Setting Value"],
      ["description", "Description", "textarea"],
    ],
    statuses: ["Active", "Inactive"],
    initial: [
      { key: "Store Name", value: "SELLBAR", description: "Website name", status: "Active" },
      { key: "Support Email", value: "support@example.com", description: "Contact email", status: "Active" },
      { key: "Shipping Charge", value: "80", description: "Default shipping charge in INR", status: "Active" },
      { key: "GST Rate", value: "18", description: "Example tax setting", status: "Active" },
      { key: "Return Policy", value: "7 days", description: "Example return policy", status: "Active" },
      { key: "Privacy Policy", value: "Configure privacy policy", description: "Privacy policy content", status: "Active" },
      { key: "Terms & Conditions", value: "Configure terms", description: "Terms content", status: "Active" },
    ],
  },
};

function AdminModuleContent() {
  const params = useParams();
  const moduleName = Array.isArray(params.module)
    ? params.module[0]
    : params.module;

  const isKnownModule = !!MODULES[moduleName];
  const config = MODULES[moduleName] || {
    title: moduleName || "Module",
    fields: [],
    statuses: ["Pending"],
    initial: [],
  };

  const [rows, setRows] = useState([]);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setReady(false);
    setRows([]);
    setFormOpen(false);
    setEditingId(null);
    setSearch("");
    setFilter("All");
    setError("");

    if (!isKnownModule) return;

    setRows(readRecords(moduleName, config.initial));
    setReady(true);
  }, [moduleName]);

  function persist(nextRows) {
    if (!writeRecords(moduleName, nextRows)) {
      setError("Data browser storage mein save nahi hua.");
      return false;
    }

    setRows(nextRows);
    setError("");
    return true;
  }

  function createRecord() {
    const values = {};
    config.fields.forEach(([key]) => {
      values[key] = "";
    });

    setForm(values);
    setEditingId(null);
    setFormOpen(true);
    setError("");
  }

  function editRecord(row) {
    setForm({ ...row });
    setEditingId(row.id);
    setFormOpen(true);
    setError("");
  }

  function saveRecord(event) {
    event.preventDefault();

    for (const [key, label] of config.fields) {
      if (!String(form[key] ?? "").trim()) {
        setError(`${label} bharna zaroori hai.`);
        return;
      }
    }

    if (moduleName === "reviews") {
      const rating = Number(form.rating);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        setError("Rating 1 se 5 ke beech honi chahiye.");
        return;
      }
    }

    if (moduleName === "coupons") {
      const discount = Number(form.discount);
      if (discount <= 0 || !Number.isFinite(discount)) {
        setError("Discount zero se zyada hona chahiye.");
        return;
      }
      if (form.discountType === "Percentage" && discount > 100) {
        setError("Percentage discount 100 se zyada nahi ho sakta.");
        return;
      }
    }

    if (moduleName === "inventory") {
      if (Number(form.quantity) < 0 || Number(form.reorderLevel) < 0) {
        setError("Stock quantity negative nahi ho sakti.");
        return;
      }
    }

    const nextRows = editingId
      ? rows.map((row) =>
          row.id === editingId ? { ...row, ...form } : row
        )
      : [
          {
            ...form,
            id: makeRecordId(),
            status: config.statuses[0],
            createdAt: new Date().toISOString(),
          },
          ...rows,
        ];

    if (persist(nextRows)) {
      setFormOpen(false);
      setEditingId(null);
    }
  }

  function changeStatus(row, status) {
    if (
      moduleName === "payments" &&
      status === "Refunded" &&
      !window.confirm("Demo status only: real refund process nahi hoga. Continue?")
    ) return;

    if (
      moduleName === "payouts" &&
      status === "Paid" &&
      !window.confirm("Demo status only: bank transfer nahi hoga. Continue?")
    ) return;

    if (
      moduleName === "notifications" &&
      status === "Sent" &&
      !window.confirm("Demo status only: actual notification nahi bheji jayegi. Continue?")
    ) return;

    const nextRows = rows.map((item) => {
      if (item.id !== row.id) return item;

      if (moduleName === "inventory") {
        const quantity = Number(item.quantity);
        const threshold = Number(item.reorderLevel);

        return {
          ...item,
          status: quantity <= 0
            ? "Out of Stock"
            : quantity <= threshold
              ? "Low Stock"
              : "In Stock",
        };
      }

      return { ...item, status };
    });

    persist(nextRows);
  }

  function deleteRecord(row) {
    if (!window.confirm("Is demo record ko delete karna hai?")) return;

    persist(rows.filter((item) => item.id !== row.id));
  }

  const filteredRows = rows.filter((row) => {
    const term = search.toLowerCase().trim();
    const matchesSearch = Object.values(row).some((value) =>
      String(value ?? "").toLowerCase().includes(term)
    );

    return matchesSearch &&
      (filter === "All" || row.status === filter);
  });

  if (!config) {
    return (
      <PanelShell role="admin" title="Not Found">
        <div className="pn-box">
          <h2>Module not found</h2>
          <p>Admin menu aur route path check karein.</p>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell role="admin" title={config.title}>
      <div style={{ display: "grid", gap: 18 }}>
        <div className="pn-box">
          <h2>{config.title}</h2>
          <p>Demo management mode — API integration baad mein hogi.</p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <strong>Total: {rows.length}</strong>
            <strong>Showing: {filteredRows.length}</strong>
            <strong>Pending: {rows.filter((r) => r.status === "Pending").length}</strong>
          </div>
        </div>

        {error && (
          <div className="pn-box" role="alert" style={{ color: "#b91c1c" }}>
            {error}
          </div>
        )}

        {formOpen && (
          <form className="pn-box" onSubmit={saveRecord}>
            <h3>{editingId ? "Edit Record" : "Add New Record"}</h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 14,
            }}>
              {config.fields.map(([key, label, type, options]) => (
                <label key={key} style={{ display: "grid", gap: 6 }}>
                  {label}

                  {type === "select" ? (
                    <select
                      required
                      value={form[key] ?? ""}
                      onChange={(e) =>
                        setForm((old) => ({ ...old, [key]: e.target.value }))
                      }
                    >
                      <option value="">Select...</option>
                      {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : type === "textarea" ? (
                    <textarea
                      required
                      rows={3}
                      value={form[key] ?? ""}
                      onChange={(e) =>
                        setForm((old) => ({ ...old, [key]: e.target.value }))
                      }
                    />
                  ) : (
                    <input
                      required
                      type={type || "text"}
                      min={type === "number" ? "0" : undefined}
                      step={type === "number" ? "any" : undefined}
                      value={form[key] ?? ""}
                      onChange={(e) =>
                        setForm((old) => ({ ...old, [key]: e.target.value }))
                      }
                    />
                  )}
                </label>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button type="submit">Save Record</button>
              <button type="button" onClick={() => setFormOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="pn-box">
          <div style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 16,
          }}>
            <input
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {config.statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <button onClick={createRecord}>+ Add New</button>

            <button
              onClick={() =>
                downloadCSV(`${moduleName}-report.csv`, filteredRows)
              }
            >
              Export CSV
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>#</th>
                  {config.fields.map(([key, label]) => (
                    <th key={key} style={{ textAlign: "left", padding: 10 }}>
                      {label}
                    </th>
                  ))}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {ready && filteredRows.map((row, index) => (
                  <tr key={row.id}>
                    <td style={{ padding: 10 }}>{index + 1}</td>

                    {config.fields.map(([key]) => (
                      <td key={key} style={{ padding: 10 }}>
                        {String(row[key] ?? "")}
                      </td>
                    ))}

                    <td style={{ padding: 10 }}>
                      <select
                        value={row.status || config.statuses[0]}
                        onChange={(e) => changeStatus(row, e.target.value)}
                      >
                        {config.statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>

                    <td style={{ padding: 10 }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => editRecord(row)}>Edit</button>
                        <button onClick={() => deleteRecord(row)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {ready && filteredRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={config.fields.length + 3}
                      style={{ padding: 20, textAlign: "center" }}
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ fontSize: 12, color: "#64748b" }}>
          Demo data browser local storage mein save hota hai. Refund, payout,
          shipping booking, notifications aur staff permissions abhi real
          services se connected nahi hain.
        </p>
      </div>
    </PanelShell>
  );
}

export default function AdminModulePage() {
  return (
    <Suspense fallback={<p className="pn-loading">Loading...</p>}>
      <AdminModuleContent />
    </Suspense>
 );
}
