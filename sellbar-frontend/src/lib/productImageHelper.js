import { getCloudinaryUrl } from '@/lib/cloudinary';

const CATEGORY_FALLBACK_IMAGES = {
  'mobile-phones': '/products/iphone-14.webp',
  'mobile': '/products/iphone-14.webp',
  'phone': '/products/iphone-14.webp',
  'laptop': '/sellbar/laptop-macbook-pro-m3.webp',
  'laptops': '/sellbar/laptop-macbook-pro-m3.webp',
  'tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
  'tablet': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
  'smart-watches': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
  'smartwatch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
  'gaming-consoles': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
  'gaming': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
  'cameras': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
  'camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
  'accessories': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
  'television': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
  'smart-speaker': '/sellbar/guide-bose-speaker.webp',
  'earbuds': 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
  'imac': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
  'default': '/products/iphone-14.webp',
};

const BRAND_FALLBACK_IMAGES = {
  apple: '/products/iphone-14.webp',
  samsung: '/sellbar/phone-samsung-s24.jpg',
  oneplus: '/sellbar/phone-oneplus-12.jpg',
  google: '/products/google-pixel-7.webp',
  dell: '/sellbar/laptop-dell-5320.png',
  hp: '/sellbar/laptop-dell-3410-i7.png',
  lenovo: '/sellbar/laptop-lenovo-thinkpad.webp',
  sony: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
};

/**
 * Universally resolves the display image URL for any product or gadget model
 * Handles:
 * - products from MongoDB / API
 * - products created via Admin dashboard (imageUrl / images array)
 * - cached products from products-cache.json
 * - sell models from deviceAssessmentData / sellMobileData
 * - local / relative paths and remote CDN URLs
 */
export function getProductImageUrl(product, categoryHint = '') {
  if (!product) return getCategoryFallbackImage(categoryHint);

  let raw = '';

  // 1. Check images array
  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0];
    if (typeof first === 'string') {
      raw = first;
    } else if (first && typeof first === 'object') {
      raw = first.url || first.secure_url || first.src || '';
    }
  }

  // 2. Check direct fields
  if (!raw && typeof product.image === 'string') raw = product.image;
  if (!raw && typeof product.imageUrl === 'string') raw = product.imageUrl;
  if (!raw && typeof product.img === 'string') raw = product.img;
  if (!raw && typeof product.thumbnail === 'string') raw = product.thumbnail;

  if (raw && typeof raw === 'string' && raw.trim()) {
    const trimmed = raw.trim();
    // Do not return dummy placeholder text
    if (!trimmed.includes('placeholder.webp')) {
      return getCloudinaryUrl(trimmed);
    }
  }

  // 3. Fallback based on brand or category
  const catKey = (
    typeof product.category === 'object'
      ? product.category?.slug || product.category?.name
      : product.category || categoryHint || ''
  ).toLowerCase();

  const brandKey = (
    typeof product.brand === 'object'
      ? product.brand?.name
      : product.brand || ''
  ).toLowerCase();

  if (BRAND_FALLBACK_IMAGES[brandKey]) {
    return getCloudinaryUrl(BRAND_FALLBACK_IMAGES[brandKey]);
  }

  return getCategoryFallbackImage(catKey);
}

/**
 * Returns safe fallback image URL for a given category
 */
export function getCategoryFallbackImage(category = '') {
  const norm = String(category || '').toLowerCase().trim();
  for (const [key, url] of Object.entries(CATEGORY_FALLBACK_IMAGES)) {
    if (norm.includes(key) || key.includes(norm)) {
      return getCloudinaryUrl(url);
    }
  }
  return getCloudinaryUrl(CATEGORY_FALLBACK_IMAGES.default);
}
