/** @type {import('next').NextConfig} */
const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about-us",
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
    return [
      {
        source: "/api/public/:path*",
        destination: `${backendUrl}/public/:path*`,
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
        source: "/api/admin/:path*",
        destination: `${backendUrl}/admin/:path*`,
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
