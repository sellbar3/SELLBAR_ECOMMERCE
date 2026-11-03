import { fetchProductByIdOrSlug } from '@/lib/productApi';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) {
    return {
      title: 'Certified Refurbished Device Details',
      alternates: { canonical: 'https://sellbar.in/product' },
    };
  }

  const data = await fetchProductByIdOrSlug(slug);
  const product = data?.product;

  const title = product?.name
    ? `Buy Refurbished ${product.name} - Best Price & Warranty`
    : 'Buy Certified Refurbished Gadgets';

  return {
    title,
    alternates: {
      canonical: `https://sellbar.in/product/${slug}`,
    },
  };
}

export default function ProductsDetailLayout({ children }) {
  return children;
}
