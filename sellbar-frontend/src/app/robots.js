export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/account/',
                    '/cart/',
                    '/checkout/',
                    '/order-confirmation/',
                    '/login/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/account/',
                    '/cart/',
                    '/checkout/',
                ],
            },
        ],
        sitemap: 'https://sellbar.in/sitemap.xml',
        host: 'https://sellbar.in',
    };
}
