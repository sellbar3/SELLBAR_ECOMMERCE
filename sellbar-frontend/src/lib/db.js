// Dynamic re-commerce & catalog helper for sitemaps and discovery

export const db = {
  getRefurbishedProducts: () => [
    { slug: 'apple-iphone-13', createdAt: '2026-01-15' },
    { slug: 'apple-iphone-14-pro', createdAt: '2026-02-10' },
    { slug: 'apple-iphone-15', createdAt: '2026-03-01' },
    { slug: 'samsung-galaxy-s23-ultra', createdAt: '2026-01-20' },
    { slug: 'samsung-galaxy-s24-ultra', createdAt: '2026-02-28' },
    { slug: 'oneplus-12', createdAt: '2026-02-15' },
    { slug: 'apple-macbook-air-m2', createdAt: '2026-01-18' },
    { slug: 'apple-macbook-pro-m3', createdAt: '2026-03-12' },
    { slug: 'lenovo-thinkpad-t14', createdAt: '2026-02-05' },
    { slug: 'dell-latitude-3410', createdAt: '2026-02-14' },
  ],

  getDeviceModels: () => [
    { slug: 'iphone-15-pro-max' },
    { slug: 'iphone-14' },
    { slug: 'iphone-13' },
    { slug: 'samsung-galaxy-s24' },
    { slug: 'samsung-galaxy-s23' },
    { slug: 'oneplus-11-5g' },
    { slug: 'macbook-pro-14-m1' },
    { slug: 'dell-xps-13' },
    { slug: 'lenovo-legion-5' },
    { slug: 'ipad-air-5th-gen' },
  ],
};
