export const BLOG_POSTS = [
  {
    slug: 'how-to-get-maximum-cash-selling-old-iphone-2026',
    title: 'How to Get Maximum Cash When Selling Your Old iPhone in 2026',
    excerpt: 'Learn the top physical preparation tips, battery optimization, and timing tricks to lock in the highest buyback price for your iPhone.',
    content: `
      <h2>1. Clean the Device Thoroughly</h2>
      <p>First impressions matter significantly during device valuation. Carefully clean the screen, ports, and speaker grills using a soft microfiber cloth and isopropyl alcohol. Remove any stubborn grime or sticker residues from phone cases.</p>
      
      <h2>2. Check Battery Health & Avoid Degradation</h2>
      <p>iPhones with battery health above 85% fetch 15% to 25% more resale value. Avoid keeping the device completely discharged before pickup, as a working battery allows the technician to run hardware diagnostics seamlessly.</p>
      
      <h2>3. Gather Original Accessories and Valid Retail Invoices</h2>
      <p>Having the original retail box, Apple OEM charging cable, and a valid purchase invoice can bump your cash payout by ₹500 to ₹1,200. Retail bills also verify that the phone is free of finance locks or blacklisting.</p>
      
      <h2>4. Create a Full iCloud Backup & Turn Off "Find My"</h2>
      <p>Before handing over your iPhone, backup all data to iCloud or your computer. Then sign out of Apple ID and disable "Find My iPhone". Devices with active iCloud activation locks cannot be processed or paid for under Indian recommerce regulations.</p>
      
      <h2>5. Choose Sellbar Doorstep Pickup for Instant UPI Payout</h2>
      <p>Instead of risking low-ball offers or meeting strangers on classifieds, Sellbar provides instant doorstep valuation in Bettiah, Bagaha, Motihari, and across Bihar with immediate bank transfer upon inspection.</p>
    `,
    date: 'Jan 18, 2026',
    readTime: '4 min read',
    category: 'Selling Guide',
    author: 'Aman Verma',
    authorRole: 'Hardware Diagnostic Lead',
    tags: ['iPhone', 'Sell Phone', 'Resale Tips', 'Cashify Alternative'],
  },
  {
    slug: 'refurbished-vs-used-vs-second-hand-guide',
    title: 'Refurbished vs Used vs Second-Hand: What You Must Know',
    excerpt: 'Understand the critical differences between unverified second-hand devices and 32-point certified refurbished gadgets backed by warranty.',
    content: `
      <h2>What is a Used Phone?</h2>
      <p>A used or second-hand phone is sold directly by an individual without any technical testing, part replacement, or after-sales warranty. If the display fails after 3 days, the buyer has zero recourse or protection.</p>
      
      <h2>What Makes Certified Refurbished Different?</h2>
      <p>Refurbished phones at Sellbar undergo strict 32-point hardware and software audits. Any worn-out batteries or fragile components are replaced with high-grade OEM parts, sanitized, repackaged with warranty, and rated transparently (Flawless, Superb, Good).</p>
      
      <h2>The Savings Benefit</h2>
      <p>Buying certified refurbished gadgets gives you flagship grade experiences (iPhone 13, Galaxy S22, MacBook Air M1) at 40% to 65% lower than the brand-new retail price with a 6-month or 1-year replacement warranty.</p>
    `,
    date: 'Jan 12, 2026',
    readTime: '6 min read',
    category: 'Refurbished Tech',
    author: 'Neha Kumari',
    authorRole: 'Tech Reviewer',
    tags: ['Refurbished', 'Smart Shopping', 'Warranty', 'Budget Gadgets'],
  },
  {
    slug: 'best-budget-refurbished-laptops-students-coders',
    title: 'Best Budget Refurbished Laptops for Students and Coders',
    excerpt: 'A breakdown of Lenovo ThinkPad X1 Carbon vs Dell Latitude series for durability, keyboard quality, and multitasking value under ₹35,000.',
    content: `
      <h2>1. Lenovo ThinkPad X1 Carbon & T480</h2>
      <p>Renowned for the legendary ThinkPad ergonomic keyboard, spill resistance, and dual battery options. Perfect for programmers typing thousands of lines of code daily.</p>
      
      <h2>2. Dell Latitude 7490 / 5400 Series</h2>
      <p>Equipped with Intel Core i5/i7 8th to 11th Gen processors, fast NVMe SSDs, and easily upgradeable RAM slots up to 32GB. Highly cost-effective for BCA, B.Tech, and design students.</p>
      
      <h2>3. Apple MacBook Air M1 (Renewed)</h2>
      <p>For designers and iOS developers, the Apple M1 Silicon still dominates in battery endurance (15+ hours) and silent fanless performance, available at less than ₹48,000.</p>
    `,
    date: 'Dec 29, 2025',
    readTime: '5 min read',
    category: 'Buying Guide',
    author: 'Rajesh Sharma',
    authorRole: 'Enterprise Tech Specialist',
    tags: ['Laptops', 'ThinkPad', 'Coding', 'College Tech'],
  },
  {
    slug: 'e-waste-crisis-india-recommerce-solution',
    title: 'E-Waste Crisis in India: Why Recommerce Is the Ultimate Solution',
    excerpt: 'Explore how recycling and buying renewed gadgets helps reduce electronic waste while keeping top-tier flagships affordable.',
    content: `
      <h2>The Growing Mountain of E-Waste</h2>
      <p>India is currently the third-largest producer of electronic waste globally. Discarded lithium batteries and printed circuit boards contain harmful heavy metals like lead, mercury, and cadmium that pollute groundwater when dumped in municipal landfills.</p>
      
      <h2>Circular Economy and Extended Lifespans</h2>
      <p>Extending a smartphone's lifespan by just 1.5 to 2 years reduces its carbon manufacturing footprint by more than 40%. Through certified refurbishing, Sellbar prevents thousands of functioning devices from entering scrap yards.</p>
      
      <h2>Responsible Recycling for Dead Phones</h2>
      <p>Even if an old phone cannot be turned on or repaired, disposing of it through Sellbar's e-waste recovery channel ensures precious metals like gold, copper, and palladium are sustainably reclaimed.</p>
    `,
    date: 'Dec 20, 2025',
    readTime: '5 min read',
    category: 'Sustainability',
    author: 'Pooja Singh',
    authorRole: 'Green Tech Advocate',
    tags: ['E-Waste', 'Green Planet', 'Recycling', 'Circular Economy'],
  },
];

export function getBlogPostBySlug(slug) {
  if (!slug) return null;
  return BLOG_POSTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}
