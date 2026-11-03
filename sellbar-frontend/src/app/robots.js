export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/vendor/',
                    '/panel-login/',
                    '/api/',
                    '/account/',
                    '/cart/',
                    '/checkout/',
                    '/order-confirmation/',
                    '/order-confirmed/',
                    '/orders/',
                    '/login/',
                    '/register/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/vendor/',
                    '/panel-login/',
                    '/api/',
                    '/account/',
                    '/cart/',
                    '/checkout/',
                    '/order-confirmation/',
                    '/order-confirmed/',
                    '/orders/',
                ],
            },
        ],
        sitemap: 'https://sellbar.in/sitemap.xml',
        host: 'https://sellbar.in',
    };
}
