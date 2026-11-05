export const DEVICE_CATEGORIES_CONFIG = {
  laptop: {
    categoryName: 'Laptop & MacBook',
    heroTitle: 'Sell Old Laptop & MacBook for Instant Cash',
    heroSubtitle: 'Choose your laptop brand and specs to calculate exact resale valuation with free doorstep pickup across West Champaran & Bihar.',
    brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer'],
    models: [
      { id: 'mba-m2', brand: 'Apple', name: 'Apple MacBook Air M2 (13.6")', basePrice: 62000, specs: 'Apple M2, Liquid Retina', image: '/sellbar/laptop-macbook-pro-m3.webp' },
      { id: 'mba-m1', brand: 'Apple', name: 'Apple MacBook Air M1 (13.3")', basePrice: 46000, specs: 'Apple M1 8-Core, Retina', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80' },
      { id: 'mbp-14-m2', brand: 'Apple', name: 'Apple MacBook Pro 14 M2 Pro', basePrice: 110000, specs: 'M2 Pro 10-Core, 120Hz XDR', image: '/sellbar/laptop-macbook-pro-m3.webp' },
      { id: 'dell-xps-13', brand: 'Dell', name: 'Dell XPS 13 (9310)', basePrice: 48000, specs: 'Core i7 11th Gen, FHD+', image: '/sellbar/laptop-dell-5320.png' },
      { id: 'dell-lat-5420', brand: 'Dell', name: 'Dell Latitude 5420', basePrice: 24000, specs: 'Core i5 11th Gen, Business Rugged', image: '/sellbar/laptop-dell-3410-i5.png' },
      { id: 'hp-envy-x360', brand: 'HP', name: 'HP Envy x360 2-in-1', basePrice: 35000, specs: 'Ryzen 7 5700U, Touchscreen', image: '/sellbar/laptop-dell-3410-i7.png' },
      { id: 'len-x1-carbon', brand: 'Lenovo', name: 'Lenovo ThinkPad X1 Carbon Gen 9', basePrice: 42000, specs: 'Core i7 11th Gen, Ultralight Carbon', image: '/sellbar/laptop-lenovo-thinkpad.webp' },
      { id: 'asus-zenbook-14', brand: 'Asus', name: 'Asus ZenBook 14 OLED', basePrice: 38000, specs: 'Core i5 12th Gen, 2.8K OLED', image: '/sellbar/laptop-dell-5310.png' },
    ],
    assessmentSteps: [
      {
        id: 'processor',
        title: 'Processor (CPU) Family',
        subtitle: 'Select the processor generation installed in your laptop',
        options: [
          { label: 'Apple M1 / M2 / M3 Silicon', factor: 1.0, icon: 'Cpu' },
          { label: 'Intel Core i7 / i9 (10th Gen or newer)', factor: 0.95, icon: 'Cpu' },
          { label: 'Intel Core i5 (8th to 11th Gen)', factor: 0.85, icon: 'Cpu' },
          { label: 'AMD Ryzen 5 / 7 / 9', factor: 0.90, icon: 'Cpu' },
          { label: 'Intel Core i3 / Older Generations', factor: 0.70, icon: 'Cpu' },
        ],
      },
      {
        id: 'ram_storage',
        title: 'RAM & Storage Configuration',
        subtitle: 'Select memory capacity and drive type',
        options: [
          { label: '16GB+ RAM / 512GB+ NVMe SSD', factor: 1.0, bonus: 2000 },
          { label: '8GB RAM / 256GB SSD', factor: 0.90, bonus: 0 },
          { label: '8GB RAM / 1TB HDD (Hard Drive)', factor: 0.80, deduction: 1500 },
          { label: '4GB RAM / 128GB or 500GB HDD', factor: 0.70, deduction: 2500 },
        ],
      },
      {
        id: 'screen_condition',
        title: 'Display & Screen Condition',
        subtitle: 'Inspect the panel for lines, dead pixels, or physical cracks',
        options: [
          { label: 'Spotless (No spots, scratches or dead pixels)', factor: 1.0 },
          { label: 'Minor anti-reflective coating marks / Micro scratches', factor: 0.88, deduction: 2000 },
          { label: 'White pressure spots / Screen bleeding', factor: 0.75, deduction: 4000 },
          { label: 'Cracked glass / Dead lines on display', factor: 0.50, deduction: 8000 },
        ],
      },
      {
        id: 'battery_backup',
        title: 'Battery Backup & Charging',
        subtitle: 'How long does the laptop run on battery?',
        options: [
          { label: '3+ Hours Backup (Normal battery health)', factor: 1.0 },
          { label: '1.5 to 2.5 Hours Backup', factor: 0.90, deduction: 1500 },
          { label: 'Less than 1 Hour / Service Recommended warning', factor: 0.78, deduction: 3000 },
          { label: 'Completely Dead (Works only plugged into charger)', factor: 0.65, deduction: 4500 },
        ],
      },
      {
        id: 'keyboard_ports',
        title: 'Keyboard, Trackpad & Functional Ports',
        subtitle: 'Check keys, trackpad click, WiFi and USB ports',
        options: [
          { label: 'All keys, trackpad and ports fully functional', factor: 1.0 },
          { label: '1-2 keys not working / sticky trackpad', factor: 0.90, deduction: 1500 },
          { label: 'Defective keyboard / faulty USB or Type-C port', factor: 0.80, deduction: 3000 },
        ],
      },
      {
        id: 'accessories',
        title: 'Original Charger & Bill',
        subtitle: 'Do you have the original laptop charging adapter?',
        options: [
          { label: 'Original Working Charger & Bill Available', bonus: 1500 },
          { label: 'Original Working Charger Available (No Bill)', bonus: 800 },
          { label: 'Compatible / Third-party Charger', bonus: 0 },
          { label: 'No Charger (Laptop Only)', deduction: 1500 },
        ],
      },
    ],
  },

  tablet: {
    categoryName: 'Tablet & iPad',
    heroTitle: 'Sell Old iPad & Android Tablet for Instant Payment',
    heroSubtitle: 'Instant price check for Apple iPad, Samsung Tab, and Lenovo tablets with free door-to-door verification.',
    brands: ['Apple', 'Samsung', 'Lenovo', 'OnePlus', 'Xiaomi'],
    models: [
      { id: 'ipad-pro-11', brand: 'Apple', name: 'Apple iPad Pro 11" (M2 Chip)', basePrice: 58000, specs: '120Hz ProMotion, M2', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80' },
      { id: 'ipad-air-5', brand: 'Apple', name: 'Apple iPad Air 5th Gen (M1)', basePrice: 42000, specs: 'M1 Chip, 10.9" Liquid Retina', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80' },
      { id: 'ipad-10', brand: 'Apple', name: 'Apple iPad 10th Gen (10.9")', basePrice: 27000, specs: 'A14 Bionic, USB-C', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80' },
      { id: 'ipad-mini-6', brand: 'Apple', name: 'Apple iPad Mini 6th Gen', basePrice: 32000, specs: 'A15 Bionic, Compact 8.3"', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80' },
      { id: 'tab-s9-fe', brand: 'Samsung', name: 'Samsung Galaxy Tab S9 FE', basePrice: 26000, specs: 'S-Pen Included, IP68', image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=500&q=80' },
      { id: 'tab-s8-ultra', brand: 'Samsung', name: 'Samsung Galaxy Tab S8 Ultra', basePrice: 54000, specs: 'Super AMOLED 14.6", 120Hz', image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'connectivity',
        title: 'Connectivity Variant',
        subtitle: 'Is your tablet WiFi-only or Cellular (SIM)?',
        options: [
          { label: 'WiFi + 5G / 4G Cellular (SIM Support)', factor: 1.0, bonus: 3000 },
          { label: 'WiFi Only', factor: 0.92, bonus: 0 },
        ],
      },
      {
        id: 'screen_touch',
        title: 'Touchscreen Digitizer & Display',
        subtitle: 'Does touch respond smoothly across all corners?',
        options: [
          { label: 'Flawless Touch & Glass (Zero marks/cracks)', factor: 1.0 },
          { label: 'Minor hairline scratches on glass', factor: 0.88, deduction: 1500 },
          { label: 'Touch lag / dead spots on screen', factor: 0.70, deduction: 3500 },
          { label: 'Cracked glass / shattered display', factor: 0.45, deduction: 7000 },
        ],
      },
      {
        id: 'battery_body',
        title: 'Battery Health & Body Casing',
        subtitle: 'Are there any bent corners or body scratches?',
        options: [
          { label: 'Like New (No bends, battery lasts 6+ hours)', factor: 1.0 },
          { label: 'Minor edge scuffs, battery normal', factor: 0.90, deduction: 1200 },
          { label: 'Slight frame bend / degraded battery', factor: 0.75, deduction: 3000 },
        ],
      },
      {
        id: 'accessories',
        title: 'Pencil / Stylus & Box',
        subtitle: 'Do you have original accessories?',
        options: [
          { label: 'Original Box + Apple Pencil / S-Pen + Charger', bonus: 2500 },
          { label: 'Original Box + Charger Only', bonus: 1000 },
          { label: 'Device Only', bonus: 0 },
        ],
      },
    ],
  },

  imac: {
    categoryName: 'Apple iMac & Mac Desktop',
    heroTitle: 'Sell Used Apple iMac & Mac Mini for Cash',
    heroSubtitle: 'Best market rates for 21.5", 24" (M1/M3), and 27" 5K Retina iMacs with safe doorstep collection.',
    brands: ['Apple'],
    models: [
      { id: 'imac-24-m3', brand: 'Apple', name: 'Apple iMac 24" M3 (2023)', basePrice: 95000, specs: 'Apple M3, 4.5K Retina', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80' },
      { id: 'imac-24-m1', brand: 'Apple', name: 'Apple iMac 24" M1 (2021)', basePrice: 65000, specs: 'Apple M1 8-Core, 4.5K Retina', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80' },
      { id: 'imac-27-5k-2020', brand: 'Apple', name: 'Apple iMac 27" 5K Retina (2020)', basePrice: 52000, specs: 'Intel Core i7 10th Gen, 5K Display', image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=500&q=80' },
      { id: 'mac-mini-m2', brand: 'Apple', name: 'Apple Mac Mini M2 (2023)', basePrice: 42000, specs: 'M2 8-Core CPU / 10-Core GPU', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'screen_display',
        title: 'Retina Display Condition',
        subtitle: 'Check the front 4.5K / 5K glass and LCD panel',
        options: [
          { label: 'Spotless Glass (Zero pink edges, zero cracks)', factor: 1.0 },
          { label: 'Minor edge chipping / small hairline scratch', factor: 0.85, deduction: 4000 },
          { label: 'Pink tint on border / LCD discoloration', factor: 0.70, deduction: 8000 },
          { label: 'Cracked front glass', factor: 0.40, deduction: 18000 },
        ],
      },
      {
        id: 'storage_ram',
        title: 'Memory & SSD Capacity',
        subtitle: 'What internal specs does your Mac have?',
        options: [
          { label: '16GB+ RAM / 512GB+ SSD', factor: 1.0, bonus: 4000 },
          { label: '8GB RAM / 256GB SSD', factor: 0.90, bonus: 0 },
          { label: 'Fusion Drive / HDD (Older Intel Models)', factor: 0.75, deduction: 5000 },
        ],
      },
      {
        id: 'magic_accessories',
        title: 'Apple Magic Keyboard & Magic Mouse',
        subtitle: 'Do you have the original wireless peripherals?',
        options: [
          { label: 'Original Magic Keyboard + Magic Mouse + Power Cord', bonus: 3500 },
          { label: 'Magic Keyboard + Power Cord Only', bonus: 2000 },
          { label: 'Power Cord Only (No Keyboard/Mouse)', bonus: 0 },
        ],
      },
    ],
  },

  'gaming-consoles': {
    categoryName: 'Gaming Consoles',
    heroTitle: 'Sell PlayStation, Xbox & Nintendo Consoles Online',
    heroSubtitle: 'Instant valuation for PS5 Disc/Digital, PS4 Pro, Xbox Series X/S, and Nintendo Switch with free doorstep pickup.',
    brands: ['Sony PlayStation', 'Microsoft Xbox', 'Nintendo'],
    models: [
      { id: 'ps5-disc', brand: 'Sony PlayStation', name: 'Sony PlayStation 5 (Disc Edition)', basePrice: 34000, specs: '825GB SSD, Ultra HD Blu-ray', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80' },
      { id: 'ps5-digital', brand: 'Sony PlayStation', name: 'Sony PlayStation 5 (Digital Edition)', basePrice: 29000, specs: '825GB SSD, Digital Only', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80' },
      { id: 'xbox-series-x', brand: 'Microsoft Xbox', name: 'Microsoft Xbox Series X', basePrice: 32000, specs: '1TB SSD, 12 Teraflops GPU', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=500&q=80' },
      { id: 'xbox-series-s', brand: 'Microsoft Xbox', name: 'Microsoft Xbox Series S', basePrice: 18000, specs: '512GB SSD, Compact All-Digital', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=500&q=80' },
      { id: 'switch-oled', brand: 'Nintendo', name: 'Nintendo Switch (OLED Model)', basePrice: 19000, specs: '7" OLED Screen, 64GB', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=500&q=80' },
      { id: 'ps4-pro', brand: 'Sony PlayStation', name: 'Sony PlayStation 4 Pro (1TB)', basePrice: 16000, specs: '4K HDR Gaming, 1TB HDD', image: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'hdmi_disc',
        title: 'HDMI Output & Disc Drive',
        subtitle: 'Does it output 4K/HDR video and read game discs?',
        options: [
          { label: 'HDMI & Disc Drive work perfectly (Zero noise)', factor: 1.0 },
          { label: 'HDMI works, but Disc Drive struggles to read discs', factor: 0.85, deduction: 2500 },
          { label: 'Digital Console (No disc drive by design)', factor: 1.0 },
        ],
      },
      {
        id: 'controller_condition',
        title: 'Wireless Controllers (DualSense / Xbox Wireless)',
        subtitle: 'Test analogue thumbsticks for stick-drift',
        options: [
          { label: '1 Original Controller in Flawless Condition (No drift)', factor: 1.0 },
          { label: '2 Original Controllers (Both working perfectly)', factor: 1.0, bonus: 2500 },
          { label: 'Controller has stick drift / sticky trigger buttons', factor: 0.90, deduction: 1500 },
          { label: 'No Controller (Console & Cables only)', factor: 0.82, deduction: 2500 },
        ],
      },
      {
        id: 'box_cables',
        title: 'Original Box & HDMI/Power Cables',
        subtitle: 'Do you have original retail packaging?',
        options: [
          { label: 'Original Box + HDMI Cable + Power Cord + Controller Cable', bonus: 1500 },
          { label: 'Cables Included (No Retail Box)', bonus: 500 },
          { label: 'Missing HDMI / Power Cord', deduction: 600 },
        ],
      },
    ],
  },

  television: {
    categoryName: 'Television & Smart TV',
    heroTitle: 'Sell Old LED, QLED & OLED Smart TV for Cash',
    heroSubtitle: 'Instant valuation for 32" to 75" Smart TVs from Sony, Samsung, LG, and Xiaomi with safe doorstep dismount and inspection.',
    brands: ['Samsung', 'LG', 'Sony', 'Xiaomi', 'OnePlus', 'TCL'],
    models: [
      { id: 'sony-bravia-55', brand: 'Sony', name: 'Sony Bravia 55" 4K Google TV', basePrice: 38000, specs: '4K Ultra HD, Dolby Vision', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500&q=80' },
      { id: 'sam-qled-55', brand: 'Samsung', name: 'Samsung 55" QLED 4K Smart TV', basePrice: 34000, specs: 'Quantum Dot, Quantum HDR', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500&q=80' },
      { id: 'lg-oled-55', brand: 'LG', name: 'LG 55" OLED 4K Cinema TV', basePrice: 52000, specs: 'Self-lit OLED Pixels, 120Hz', image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=500&q=80' },
      { id: 'mi-tv-43', brand: 'Xiaomi', name: 'Xiaomi 43" 4K Smart Android TV', basePrice: 14000, specs: 'PatchWall, Vivid Picture Engine', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'screen_size',
        title: 'Screen Size & Panel Category',
        subtitle: 'Select your TV screen size and display tech',
        options: [
          { label: '55" or Larger (OLED / QLED 4K Panel)', factor: 1.0, bonus: 3000 },
          { label: '43" to 50" (4K UHD LED Panel)', factor: 0.90, bonus: 0 },
          { label: '32" (HD Ready / Full HD LED)', factor: 0.70, deduction: 2000 },
        ],
      },
      {
        id: 'display_condition',
        title: 'Display Panel Health',
        subtitle: 'Are there any vertical lines, dark spots, or cracked matrix?',
        options: [
          { label: 'Flawless Picture (Zero dead pixels, zero lines)', factor: 1.0 },
          { label: 'Minor backlight bleeding on black scenes', factor: 0.88, deduction: 1500 },
          { label: 'Vertical lines / discoloration patches', factor: 0.60, deduction: 6000 },
          { label: 'Cracked internal panel (No display)', factor: 0.30, deduction: 12000 },
        ],
      },
      {
        id: 'accessories',
        title: 'Remote Control & Base Stand / Wall Mount',
        subtitle: 'Do you have the original smart remote?',
        options: [
          { label: 'Original Smart Remote + Table Stand / Mount Included', bonus: 1000 },
          { label: 'TV + Original Remote Only', bonus: 500 },
          { label: 'No Remote / Broken Remote', deduction: 800 },
        ],
      },
    ],
  },

  'smart-watch': {
    categoryName: 'Smartwatch',
    heroTitle: 'Sell Apple Watch & Galaxy Watch Online',
    heroSubtitle: 'Instant price check for Apple Watch, Samsung Galaxy Watch, and Amazfit with free home pickup.',
    brands: ['Apple', 'Samsung', 'OnePlus', 'Amazfit', 'Garmin'],
    models: [
      { id: 'aw-s9', brand: 'Apple', name: 'Apple Watch Series 9 GPS (45mm)', basePrice: 28000, specs: 'Always-On Display, S9 SiP', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80' },
      { id: 'aw-ultra', brand: 'Apple', name: 'Apple Watch Ultra (49mm Titanium)', basePrice: 48000, specs: 'Dual GPS, 100m Water Resistance', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80' },
      { id: 'gw-6', brand: 'Samsung', name: 'Samsung Galaxy Watch 6 (44mm)', basePrice: 15000, specs: 'Sapphire Crystal, BioActive', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
      { id: 'aw-se2', brand: 'Apple', name: 'Apple Watch SE 2nd Gen (44mm)', basePrice: 14000, specs: 'Retina Display, Crash Detection', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'screen_body',
        title: 'Display Glass & Casing Condition',
        subtitle: 'Check front curved glass and aluminium/titanium casing',
        options: [
          { label: 'Flawless (No scratches, no dents)', factor: 1.0 },
          { label: 'Minor micro-scratches on glass', factor: 0.88, deduction: 1200 },
          { label: 'Deep gouges or screen crack', factor: 0.50, deduction: 5000 },
        ],
      },
      {
        id: 'battery_sensors',
        title: 'Battery Health & Health Sensors',
        subtitle: 'Does heart rate & SpO2 sensor work?',
        options: [
          { label: '1+ Day Full Battery & All Sensors Working', factor: 1.0 },
          { label: 'Battery lasts under 10 hours', factor: 0.85, deduction: 1500 },
          { label: 'Sensor error / Touch latency', factor: 0.70, deduction: 3000 },
        ],
      },
      {
        id: 'charger_strap',
        title: 'Magnetic Charger & Original Band',
        subtitle: 'Do you have the original charging puck and band?',
        options: [
          { label: 'Original Magnetic Charger + Original Band', bonus: 1000 },
          { label: 'Charger Only (Aftermarket band)', bonus: 400 },
          { label: 'Watch Only (No charger)', deduction: 1000 },
        ],
      },
    ],
  },

  'smart-speaker': {
    categoryName: 'Smart Speaker',
    heroTitle: 'Sell Old Echo & Google Home Smart Speakers',
    heroSubtitle: 'Instant quote for Amazon Echo Dot, Echo Show, Apple HomePod, and Google Nest with doorstep payment.',
    brands: ['Amazon', 'Google', 'Apple'],
    models: [
      { id: 'homepod-2', brand: 'Apple', name: 'Apple HomePod (2nd Gen)', basePrice: 19000, specs: 'High-Excursion Woofer, Spatial Audio', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80' },
      { id: 'homepod-mini', brand: 'Apple', name: 'Apple HomePod Mini', basePrice: 6500, specs: '360-Degree Audio, Siri', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80' },
      { id: 'echo-show-10', brand: 'Amazon', name: 'Amazon Echo Show 10 (3rd Gen)', basePrice: 14000, specs: '10.1" HD Screen with Motion', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80' },
      { id: 'echo-dot-5', brand: 'Amazon', name: 'Amazon Echo Dot (5th Gen)', basePrice: 2800, specs: 'Deeper Bass, Clock LED', image: '/sellbar/guide-bose-speaker.webp' },
    ],
    assessmentSteps: [
      {
        id: 'sound_clarity',
        title: 'Audio Output & Mic Quality',
        subtitle: 'Is there any distortion at high volume?',
        options: [
          { label: 'Crystal Clear Sound & Far-Field Mics Functional', factor: 1.0 },
          { label: 'Slight speaker crackle at 100% volume', factor: 0.85, deduction: 800 },
          { label: 'Muffled sound / Microphone unresponsive', factor: 0.65, deduction: 1800 },
        ],
      },
      {
        id: 'accessories',
        title: 'Original Power Adapter',
        subtitle: 'Do you have the original power brick?',
        options: [
          { label: 'Original OEM Power Adapter Included', bonus: 500 },
          { label: 'No Adapter (Speaker Only)', deduction: 600 },
        ],
      },
    ],
  },

  'dslr-camera': {
    categoryName: 'DSLR & Mirrorless Camera',
    heroTitle: 'Sell DSLR & Mirrorless Cameras Online for Max Cash',
    heroSubtitle: 'Top market price quotes for Canon, Nikon, and Sony full-frame and crop sensor camera bodies and lenses.',
    brands: ['Canon', 'Sony', 'Nikon', 'Fujifilm'],
    models: [
      { id: 'sony-a7-iv', brand: 'Sony', name: 'Sony Alpha 7 IV Mirrorless Body', basePrice: 125000, specs: '33MP Full-Frame, 4K 60p', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
      { id: 'canon-eos-r6', brand: 'Canon', name: 'Canon EOS R6 Mark II Body', basePrice: 130000, specs: '24.2MP Full-Frame, Dual Pixel AF', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500&q=80' },
      { id: 'sony-a6400', brand: 'Sony', name: 'Sony Alpha a6400 with 16-50mm', basePrice: 44000, specs: '24.2MP APS-C, Real-Time Eye AF', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
      { id: 'canon-200d-ii', brand: 'Canon', name: 'Canon EOS 200D II with 18-55mm', basePrice: 28000, specs: '24.1MP APS-C, Dual Pixel', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'sensor_condition',
        title: 'Camera Sensor Health',
        subtitle: 'Inspect image sensor for fungus, dust spots or scratches',
        options: [
          { label: 'Spotless Sensor (No dust spots, zero fungus)', factor: 1.0 },
          { label: 'Minor dust spots (easily cleanable)', factor: 0.90, deduction: 2000 },
          { label: 'Fungus growth or scratch on sensor glass', factor: 0.60, deduction: 12000 },
        ],
      },
      {
        id: 'shutter_count',
        title: 'Shutter Count Actuations',
        subtitle: 'Estimated lifetime clicks on mechanical shutter',
        options: [
          { label: 'Low Shutter Count (< 20,000 clicks)', factor: 1.0, bonus: 2000 },
          { label: 'Moderate Shutter Count (20,000 - 60,000 clicks)', factor: 0.92, bonus: 0 },
          { label: 'Heavy Usage (> 80,000 clicks)', factor: 0.80, deduction: 4000 },
        ],
      },
      {
        id: 'accessories',
        title: 'Battery, Charger & Kit Lens',
        subtitle: 'What accessories are included?',
        options: [
          { label: 'Original Battery + Charger + Kit Lens + Box', bonus: 4000 },
          { label: 'Original Battery + Charger Only (Body Only)', bonus: 1000 },
          { label: 'Missing Battery or Charger', deduction: 1500 },
        ],
      },
    ],
  },

  earbuds: {
    categoryName: 'TWS Earbuds & Headphones',
    heroTitle: 'Sell Apple AirPods & TWS Earbuds Online',
    heroSubtitle: 'Instant cash for Apple AirPods Pro, Galaxy Buds, and Sony noise-cancelling headphones.',
    brands: ['Apple', 'Sony', 'Samsung', 'OnePlus', 'Bose'],
    models: [
      { id: 'airpods-pro-2', brand: 'Apple', name: 'Apple AirPods Pro (2nd Gen, USB-C)', basePrice: 14000, specs: 'Active Noise Cancellation, MagSafe', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80' },
      { id: 'sony-wf1000xm5', brand: 'Sony', name: 'Sony WF-1000XM5 Wireless Earbuds', basePrice: 13000, specs: 'Industry-leading ANC, LDAC Hi-Res', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80' },
      { id: 'galaxy-buds2-pro', brand: 'Samsung', name: 'Samsung Galaxy Buds 2 Pro', basePrice: 7500, specs: '24-bit Hi-Fi, 360 Audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80' },
      { id: 'airpods-3', brand: 'Apple', name: 'Apple AirPods 3rd Gen (Lightning)', basePrice: 8500, specs: 'Spatial Audio, MagSafe Case', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80' },
    ],
    assessmentSteps: [
      {
        id: 'audio_balance',
        title: 'Sound Balance & ANC Function',
        subtitle: 'Do both left and right earbuds sound balanced and loud?',
        options: [
          { label: 'Both earbuds loud & equal volume, ANC works 100%', factor: 1.0 },
          { label: 'One side slightly lower volume', factor: 0.80, deduction: 1500 },
          { label: 'One earbud not working / dead', factor: 0.45, deduction: 4000 },
        ],
      },
      {
        id: 'case_battery',
        title: 'Charging Case & Battery Health',
        subtitle: 'Does the case hold multiple recharges?',
        options: [
          { label: 'Case charges perfectly and holds 3+ full charges', factor: 1.0 },
          { label: 'Case battery drains within 1 day', factor: 0.85, deduction: 1200 },
          { label: 'Case lid loose / charging pins damaged', factor: 0.70, deduction: 2000 },
        ],
      },
      {
        id: 'accessories',
        title: 'Retail Box & Extra Ear Tips',
        subtitle: 'Do you have original box and silicone tips?',
        options: [
          { label: 'Original Box + Extra Silicone Ear Tips Included', bonus: 800 },
          { label: 'Earbuds + Case Only', bonus: 0 },
        ],
      },
    ],
  },
};
