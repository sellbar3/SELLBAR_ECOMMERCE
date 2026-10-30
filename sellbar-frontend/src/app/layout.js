import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Sellbar.in - India\'s Trusted Refurbished Electronics & Resale Marketplace',
    description: 'Turn old tech into instant money with free doorstep pickup. Buy certified refurbished smartphones, MacBooks, and laptops with 32-point inspection and 12 months warranty.',
    keywords: [
        'sell old phone',
        'cash for phone India',
        'refurbished iphone',
        'refurbished macbook',
        'buy refurbished phone',
        'device buyback India',
        'sellbar',
        'doorstep mobile repair',
        'recycle old mobile phone',
    ],
    authors: [{ name: 'Sellbar Technologies India' }],
    metadataBase: new URL('https://sellbar.in'),
    alternates: {
        canonical: 'https://sellbar.in',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Sellbar.in | Sell Smart. Buy Better.',
        description: 'Instant Doorstep Valuation & Certified Refurbished Electronics with 12 Months Warranty.',
        url: 'https://sellbar.in',
        siteName: 'Sellbar.in',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sellbar.in - Sell Old Devices & Buy Certified Refurbished Tech',
        description: 'Instant doorstep cash payout and certified refurbished electronics with 12 months warranty.',
    },
    verification: {
        google: 'google-site-verification-sellbar-e651337b',
    },
};
const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://sellbar.in/#organization',
            name: 'Sellbar Technologies India Pvt. Ltd.',
            url: 'https://sellbar.in',
            logo: 'https://sellbar.in/services/sell-phone.webp',
            sameAs: [
                'https://twitter.com/sellbar_in',
                'https://www.linkedin.com/company/sellbar-india',
                'https://www.instagram.com/sellbar.in',
            ],
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-77175-17777',
                contactType: 'customer service',
                areaServed: 'IN',
                availableLanguage: ['en', 'hi'],
            },
        },
        {
            '@type': 'WebSite',
            '@id': 'https://sellbar.in/#website',
            url: 'https://sellbar.in',
            name: 'Sellbar.in',
            description: 'India\'s Leading Re-Commerce & Refurbished Electronics Marketplace',
            publisher: {
                '@id': 'https://sellbar.in/#organization',
            },
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://sellbar.in/find-new-phone?q={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        },
    ],
};
export default function RootLayout({ children, }) {
    return (<html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </head>
        <body suppressHydrationWarning className={`${inter.className} min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col selection:bg-[#13b59b] selection:text-white`}>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
        </body>
    </html>);
}
