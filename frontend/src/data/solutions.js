/* =========================================================================
   SOLUTIONS PAGE DATA
   Page-scoped data for the /solutions Services page. Logos, metrics,
   testimonials hooks, pricing tiers, FAQs, pillar mini-outcomes and
   video sources. PILLARS data stays inside Services.jsx because it
   is tightly coupled to imported Lucide icons + JSX layout.
   ========================================================================= */

/* Client logo placeholders — monochrome wordmarks rendered as inline SVG.
   Swap `name` and re-style as real client logos come in. */
export const CLIENT_LOGOS = [
  { name: 'Nexus' },
  { name: 'Bloom' },
  { name: 'Atlas' },
  { name: 'Pulse' },
  { name: 'Nord' },
  { name: 'Summit' },
  { name: 'Kinetic' },
  { name: 'Verdant' },
  { name: 'Forge' },
  { name: 'Lattice' },
  { name: 'Helix' },
  { name: 'Quartz' },
  { name: 'Pivotal' },
  { name: 'Mesa' },
  { name: 'Northwind' },
  { name: 'Olive' },
];

/* Outcome metrics — asymmetric collage. `size` controls grid span. */
export const METRICS = [
  {
    num: 40,
    suffix: '+',
    label: 'Brands launched',
    caption: 'Since 2021, across four continents.',
    modifier: 'lg',
    tint: 'p1',
  },
  {
    num: 3.4,
    suffix: '×',
    decimals: 1,
    label: 'Average ROI',
    caption: 'Measured over a 12-month retention window.',
    modifier: 'tall',
    tint: 'p3',
  },
  {
    num: 96,
    suffix: '%',
    label: 'Client retention',
    caption: 'Most engagements turn into multi-year partnerships.',
    modifier: 'sm',
    tint: 'p2',
  },
  {
    num: 50,
    suffix: 'M+',
    prefix: '$',
    label: 'Revenue generated',
    caption: 'For founders, operators and teams who told us in dollars.',
    modifier: 'sm',
    tint: 'p1',
  },
];

/* Pillar-specific mini-outcomes shown at the end of each editorial block */
export const PILLAR_OUTCOMES = {
  p1: [
    { num: 4, suffix: '×', label: 'Brand recall' },
    { num: 12, suffix: 'wk', label: 'Avg time to launch' },
    { num: 92, suffix: '%', label: 'Voice consistency' },
  ],
  p2: [
    { num: 2, suffix: 's', prefix: '<', label: 'Page load target' },
    { num: 20, suffix: 'hr/wk', label: 'Avg ops time saved' },
    { num: 3.4, suffix: '×', decimals: 1, label: 'Conversion lift' },
  ],
  p3: [
    { num: 160, suffix: '%', prefix: '+', label: 'Avg win-rate lift' },
    { num: 44, suffix: '%', prefix: '−', label: 'CAC reduction' },
    { num: 2.8, suffix: '×', decimals: 1, label: 'Margin multiplier' },
  ],
};

/* Pricing tiers — universal (not per-pillar) packages */
export const PRICING_TIERS = [
  {
    name: 'Essentials',
    tag: 'For founders who need one pillar done right.',
    priceBand: '$4k–$8k',
    priceUnit: '/ month',
    bestFor: 'Single-pillar engagements: brand sprint, landing-page system, or positioning audit.',
    features: [
      'One pillar, end to end',
      'Dedicated strategist + designer',
      'Monthly check-ins',
      'Brand or product playbook',
      'Async Loom reviews',
      '30-day post-launch support',
    ],
    cta: 'Start small',
    ctaVariant: 'ghost',
    featured: false,
  },
  {
    name: 'Growth',
    tag: 'For operators ready to wire all three pillars together.',
    priceBand: '$10k–$18k',
    priceUnit: '/ month',
    bestFor: 'All three pillars in light deployment with an embedded growth pod.',
    features: [
      'All three pillars, integrated',
      'Embedded 3-person growth pod',
      'Weekly working sessions',
      'Quarterly strategy resets',
      'Full automation stack',
      'Content engine + ads support',
      'Brand + product playbooks',
      'Slack DM access (workdays)',
      'Performance dashboard',
    ],
    cta: 'Talk to us',
    ctaVariant: 'primary',
    featured: true,
    ribbon: 'Most chosen',
  },
  {
    name: 'Enterprise',
    tag: 'For teams ready to install the operating system.',
    priceBand: 'Custom',
    priceUnit: '',
    bestFor: 'Full retainer, dedicated team, custom scopes, on-site days.',
    features: [
      'Everything in Growth, plus —',
      'Dedicated cross-functional team',
      'Quarterly on-site strategy days',
      'Custom scopes per quarter',
      'White-glove integration support',
      'Direct line to the founders',
      'Annual brand & market audits',
      '24h response SLA',
      'Multi-region rollout support',
      'Co-branded case study (optional)',
      'Co-author roadmap + KPI',
      'Founder-level governance',
    ],
    cta: 'Request a proposal',
    ctaVariant: 'p3',
    featured: false,
  },
];

/* FAQ — objection handling */
export const FAQS = [
  {
    q: 'Do you work on retainer or project?',
    a: "Both. Default is a 3-month diagnostic sprint that, in 9 of 10 cases, compounds into a retainer once we've shown the math works.",
  },
  {
    q: 'Will we keep the IP?',
    a: 'Yes. Every framework, asset, brand book, codebase and automation we build belongs to you. No lock-in, no licensing tail.',
  },
  {
    q: 'How fast can we start?',
    a: 'Seven to fourteen days from diagnostic. We hold a small monthly slot for founders we want to work with — if the fit is right.',
  },
  {
    q: 'What if we only need one pillar?',
    a: "Then we deliver one pillar. We never push you to buy what you don't need. About 30% of our work is single-pillar engagements.",
  },
  {
    q: 'Do you work outside the US?',
    a: 'Yes. Roughly 40% of our brands are EU, MENA or APAC. We work async-first with a 2-hour overlap window per region.',
  },
  {
    q: "Can you guarantee the metrics you've quoted?",
    a: "No serious operator guarantees ROI in a deck. We guarantee the operating system. The metrics are what we've delivered — repeatedly, not on average.",
  },
];

/* Video sources — placeholders pulled from Pexels CDN.
   Each video is ~2-4 MB H.264 MP4; swap with branded reels when ready.
   Posters are static Unsplash stills for instant first paint. */
export const VIDEO_SOURCES = {
  heroReel: {
    mp4: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1200&q=70',
    alt: 'STARTON brand reel preview',
  },
  p1: {
    mp4: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1600&q=70',
    alt: 'Brand & identity moodboard in motion',
  },
  p2: {
    mp4: 'https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
    alt: 'Engineering infrastructure macro footage',
  },
  p3: {
    mp4: 'https://videos.pexels.com/video-files/6774935/6774935-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70',
    alt: 'Strategy whiteboard session',
  },
  manifesto: {
    mp4: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1530819568329-97653eafbbfa?auto=format&fit=crop&w=1600&q=70',
    alt: 'Ink dispersing in water',
  },
  metrics: {
    mp4: 'https://videos.pexels.com/video-files/2882090/2882090-uhd_2732_1440_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70',
    alt: 'Abstract light leaks',
  },
  testimonial: {
    mp4: 'https://videos.pexels.com/video-files/4434286/4434286-uhd_2732_1440_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&w=1600&q=70',
    alt: 'Fog drifting through light',
  },
  finalCta: {
    mp4: 'https://videos.pexels.com/video-files/7991431/7991431-uhd_2732_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
    alt: 'Long-exposure light trails',
  },
};

/* Cinematic photographic "3D objects" — isolated product photography
   that behaves like a 3D layer via CSS transforms. All Unsplash CDN. */
export const MEDIA_ASSETS = {
  heroCamera: {
    src: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1200&q=85',
    alt: 'Vintage rangefinder camera on dark backdrop',
  },
  heroFilmStrip: {
    src: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1200&q=85',
    alt: '35mm film strip',
  },
  manifestoPaper: {
    src: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=80',
    alt: 'Aged paper surface',
  },
  metricsBrandImg: {
    src: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1600&q=85',
    alt: 'Studio meeting silhouette',
  },
  metricsRoiImg: {
    src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1600&q=85',
    alt: 'Stock chart on dark monitor',
  },
  metricsRetentionImg: {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Two professionals collaborating',
  },
  brandObject1: {
    src: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1100&q=85',
    alt: 'Polaroid camera on textured surface',
  },
  brandObject2: {
    src: 'https://images.unsplash.com/photo-1473891928440-ef850f74e574?auto=format&fit=crop&w=900&q=85',
    alt: 'Stack of vintage magazines',
  },
  engineObject1: {
    src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1100&q=85',
    alt: 'Vintage Mac computer on desk',
  },
  engineObject2: {
    src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    alt: 'Mechanical keyboard close-up',
  },
  strategyObject1: {
    src: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=1100&q=85',
    alt: 'Open hardback book with bookmark',
  },
  strategyObject2: {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85',
    alt: 'Brass compass on a map',
  },
  testimonialPortrait: {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=85',
    alt: 'Portrait of a founder',
  },
  finalCorridor: {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1800&q=85',
    alt: 'Vanishing-point corridor',
  },
};

/* Pillar → object map. Consumed by PillarScene to pick the photo pair
   for its signature 3D layer. */
export const PILLAR_OBJECTS = {
  p1: { primary: 'brandObject1',    secondary: 'brandObject2',    glow: 'rgba(210, 74, 167, 0.45)' },
  p2: { primary: 'engineObject1',   secondary: 'engineObject2',   glow: 'rgba(16, 31, 202, 0.40)'  },
  p3: { primary: 'strategyObject1', secondary: 'strategyObject2', glow: 'rgba(90, 21, 169, 0.45)'  },
};

/* KPI strip in hero — quick-read trust numbers */
export const HERO_KPIS = [
  { num: '40+', label: 'Brands shipped' },
  { num: '$50M+', label: 'Revenue generated' },
  { num: '3.4×', label: 'Avg ROI' },
];

/* Showcase filter chips */
export const SHOWCASE_FILTERS = [
  { id: 'all', label: 'All', color: null },
  { id: 'p1', label: 'Brand', color: 'p1' },
  { id: 'p2', label: 'Engine', color: 'p2' },
  { id: 'p3', label: 'Strategy', color: 'p3' },
];
