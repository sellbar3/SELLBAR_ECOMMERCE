
const PREFIX = "sellbar_admin_demo_v1_";

export function readRecords(moduleName, fallback = []) {
  if (typeof window === "undefined") return fallback;

  try {
    const saved = window.localStorage.getItem(PREFIX + moduleName);
    if (saved === null) return fallback;

    const records = JSON.parse(saved);
    return Array.isArray(records) ? records : fallback;
  } catch {
    return fallback;
  }
}

export function writeRecords(moduleName, records) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(
      PREFIX + moduleName,
      JSON.stringify(records)
    );
    return true;
  } catch {
    return false;
  }
}

export function makeRecordId() {
  return globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function downloadCSV(filename, records) {
  if (typeof window === "undefined" || !records.length) {
    if (typeof window !== "undefined") {
      window.alert("Export karne ke liye records nahi hain.");
    }
    return;
  }

  const columns = [...new Set(records.flatMap(Object.keys))];

  const cell = (value) => {
    const raw = value == null
      ? ""
      : typeof value === "object"
        ? JSON.stringify(value)
        : String(value);

    return `"${raw.replace(/"/g, '""')}"`;
  };

  const csv = [
    columns.map(cell).join(","),
    ...records.map((row) =>
      columns.map((column) => cell(row[column])).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
