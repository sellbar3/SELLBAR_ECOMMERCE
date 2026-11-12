const originsStr =
  process.env.CORS_ORIGINS ||
  process.env.CLIENT_URL ||
  "https://sellbar.in,https://www.sellbar.in,http://localhost:3000,http://localhost:5173";

const allowedOrigins = originsStr
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

function corsOptions() {
  return {
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      const cleanOrigin = origin.replace(/\/+$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith(".sellbar.in") ||
        cleanOrigin === "https://sellbar.in"
      ) {
        return cb(null, true);
      }
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    optionsSuccessStatus: 204,
  };
}

module.exports = { corsOptions };