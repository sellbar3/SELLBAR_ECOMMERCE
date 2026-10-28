function errorHandler(err, req, res, next) {
  console.error(`API ERROR: ${req.method} ${req.originalUrl}`);
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const isProduction = process.env.NODE_ENV === "production";
  const isErrorObject = err instanceof Error;

  const statusCode =
    (typeof err === "object" && (err?.statusCode || err?.status)) || 500;

  const message =
    typeof err === "string" ? err : err?.message || "Internal server error";

  res.status(statusCode >= 400 && statusCode < 600 ? statusCode : 500).json({
    success: false,
    message: isProduction && statusCode >= 500 ? "Internal server error" : message,
    ...(!isProduction && !isErrorObject ? { debug: err } : {}),
  });
}

module.exports = errorHandler;