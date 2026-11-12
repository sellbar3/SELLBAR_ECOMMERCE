/** @type {import('next').NextConfig} */
const backendUrl = (
  process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost:5000")
    ? process.env.NEXT_PUBLIC_API_URL
    : "https://app.sellbar.in/api"
).replace(/\/+$/, "");

const nextConfig = {
  output: 'standalone',
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    ignoreIssue: [
      { path: /node_modules/ },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/community",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    if (!backendUrl) return [];
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendUrl}/auth/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${backendUrl}/admin/:path*`,
      },
      {
        source: "/api/sell-orders/:path*",
        destination: `${backendUrl}/sell-orders/:path*`,
      },
      {
        source: "/api/sell-models/:path*",
        destination: `${backendUrl}/sell-models/:path*`,
      },
      {
        source: "/api/products/:path*",
        destination: `${backendUrl}/products/:path*`,
      },
      {
        source: "/api/categories/:path*",
        destination: `${backendUrl}/categories/:path*`,
      },
      {
        source: "/api/cart/:path*",
        destination: `${backendUrl}/cart/:path*`,
      },
      {
        source: "/api/orders/:path*",
        destination: `${backendUrl}/orders/:path*`,
      },
      {
        source: "/api/vendor/:path*",
        destination: `${backendUrl}/vendor/:path*`,
      },
      {
        source: "/api/payments/:path*",
        destination: `${backendUrl}/payments/:path*`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${backendUrl}/reviews/:path*`,
      },
    ];
  },
};

export default nextConfig;
