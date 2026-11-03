import { fetchProductByIdOrSlug } from '@/lib/productApi';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) {
    return {
      title: 'Certified Refurbished Device Details',
      description: 'Buy certified refurbished electronics with 32-point inspection, 7-day return, and 12-month warranty on Sellbar.in.',
    };
  }

  const data = await fetchProductByIdOrSlug(slug);
  const product = data?.product;

  if (!product) {
    // Pretty format slug for title fallback
    const fallbackName = String(slug)
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `Buy Refurbished ${fallbackName} - Verified Quality`,
      description: `Buy certified refurbished ${fallbackName} online at best prices with 12 months warranty and 7 days return policy on Sellbar.in.`,
      alternates: {
        canonical: `https://sellbar.in/product/${slug}`,
      },
    };
  }

  const title = `Buy Refurbished ${product.name} - Best Price & Warranty`;
  const desc =
    product.description?.slice(0, 155) ||
    `Get the best deal on certified refurbished ${product.name} at Sellbar.in. 32-point tested, 7-day returns, express shipping, and up to 12 months warranty.`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://sellbar.in/product/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Sellbar.in`,
      description: desc,
      url: `https://sellbar.in/product/${slug}`,
      siteName: 'Sellbar.in',
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Sellbar.in`,
      description: desc,
    },
  };
}

export default function ProductDetailLayout({ children }) {
  return children;
}
