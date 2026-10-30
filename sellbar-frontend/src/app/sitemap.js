import { db } from '@/lib/db';

export default function sitemap() {
    const baseUrl = 'https://sellbar.in';
    const now = new Date();
    // All 36+ Canonical Sellbar Routes
    const staticRoutes = [
        // Core Homepage & Discovery
        { url: `${baseUrl}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/sell`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
        { url: `${baseUrl}/buy-refurbished`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
        { url: `${baseUrl}/buy-refurbished-gadgets`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
        { url: `${baseUrl}/repair`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/find-new-phone`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/recycle-old-mobile-phone`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
        // Sell Specific Categories
        { url: `${baseUrl}/sell-old-mobile-phone`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/sell-old-laptop`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
        { url: `${baseUrl}/sell-old-tablet`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/sell-old-smart-watch`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/sell-old-television`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/sell-old-gaming-consoles`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/sell-old-imac`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/sell-old-dslr-camera`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/sell-old-earbuds`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/sell-old-smart-speaker`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        // Guides & Educational Pages
        { url: `${baseUrl}/what-is-refurbished`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/buy-refurbished-mobile-phones/what-is-refurbished-mobile-phones`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
        // Corporate, Partnership & Careers
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/career`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/press-releases`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/partner-with-us`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/supersale`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/corporate-information`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        // Help, Support & Order Tracking
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/faq/category/buyback`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/track-order`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
        // Legal Policies & Compliance
        { url: `${baseUrl}/warranty-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/terms-conditions`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms-of-use`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/e-waste-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ];
    // Dynamic Refurbished Products
    const products = db.getRefurbishedProducts ? db.getRefurbishedProducts() : [];
    const productRoutes = products.map((p) => ({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: new Date(p.createdAt || now),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));
    // Dynamic Device Resale Models
    const models = db.getDeviceModels ? db.getDeviceModels() : [];
    const modelRoutes = models.map((m) => ({
        url: `${baseUrl}/sell/device/${m.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));
    return [...staticRoutes, ...productRoutes, ...modelRoutes];
}
