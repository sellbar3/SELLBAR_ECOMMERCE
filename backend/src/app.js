
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { corsOptions } = require("./config/cors");
const rateLimit = require("./middlewares/rateLimit.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.disable("x-powered-by");

app.set(
  "trust proxy",
  process.env.NODE_ENV === "production" ? 1 : false
);

app.use(helmet());
app.use(cors(corsOptions()));
app.use(compression());

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  })
);

app.use(cookieParser());

app.use("/api", rateLimit);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "sellbar-api",
    domain: "app.sellbar.in",
    frontend: "https://sellbar.in",
    message: "SELLBAR API Gateway is running",
    endpoints: {
      health: "/api/health",
      public: "/api/public",
      auth: "/api/auth",
      products: "/api/products",
      orders: "/api/orders",
    },
    time: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "sellbar-api",
    message: "SELLBAR API is running",
    time: new Date().toISOString(),
  });
});

app.use("/api", require("./routes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Central error handler must remain last.
app.use(errorHandler);

module.exports = app;
