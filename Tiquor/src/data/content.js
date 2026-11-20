import { SITE } from '../config/site';

// Page copy lives here so text changes never touch component code.

export const HOME_CONTENT = {
  eyebrow: `The Royal Collection · ${SITE.collectionYear}`,
  titleLead: 'A legacy',
  titleAccent: 'on your wrist.',
  description: 'Precision timepieces shaped by heritage, crafted for the moments that become history.',
  cta: { label: 'Explore the collection', href: '#new' },
  heroImageAlt: `${SITE.name} royal navy and gold luxury watch`,
};

export const BRANDS_CONTENT = {
  eyebrow: `The houses · ${SITE.collectionYear}`,
  titleLead: 'Our',
  titleAccent: 'brands',
  intro: 'Every house we carry, and every watch in its collection.',
  exploreLabel: 'Explore the houses',
  indexTitle: 'Shop by brand',
  upcomingTitle: 'Arriving soon',
  upcomingIntro: 'New houses joining the collection. Their watches will appear here as soon as they land.',
  collectionEyebrow: 'The house of',
  emptyTitle: (name) => `The ${name} collection is arriving soon`,
  emptyText: 'We’re preparing this collection now. In the meantime, explore the houses already in store.',
  notFoundTitle: 'We couldn’t find that brand',
  notFoundText: 'It may have moved or been renamed. Browse all our brands instead.',
  otherBrandsTitle: 'Explore other houses',
};

// Shop-by-style and collection pages (components/Category.jsx). Pages themselves live in data/categories.js.
export const CATEGORY_CONTENT = {
  audience: { men: 'For him', women: 'For her' },
  backLabel: { men: 'All men’s watches', women: 'All women’s watches' },
  tabsLabel: 'Browse styles and collections',
  ctaLabel: 'Shop the edit',
  notFoundTitle: 'We couldn’t find that collection',
  notFoundText: 'It may have moved or been renamed. Browse our new arrivals instead.',
  notFoundCta: 'Shop new arrivals',
};

// "Our story" page (components/About.jsx). Numbers on the page are counted from the catalogue.
export const ABOUT_CONTENT = {
  hero: {
    eyebrow: 'Our story',
    titleLead: 'Time,',
    titleAccent: 'well kept.',
    intro: `${SITE.name} exists for one reason: a watch is the one thing you wear every day that quietly keeps your story.`,
    dialCaption: 'The time where you are',
    primaryCta: 'Explore the houses',
    secondaryCta: 'Read our promise',
  },
  // `product` is a product name from data/products.js; its photo illustrates the chapter.
  chapters: [
    {
      numeral: 'I',
      eyebrow: 'The idea',
      title: 'A watch should outlive the moment it marks.',
      text: 'Phones remind us of the hour. A watch remembers it. We started with the pieces we would want to hand down: honest dials, lasting cases, movements made with care.',
      product: 'Tissot Le Locle Automatic',
    },
    {
      numeral: 'II',
      eyebrow: 'The art of choosing',
      title: 'Curated, never crowded.',
      text: 'From Swiss precision to Japanese invention and Indian craft, every house earns its place, and every watch inside it is chosen one by one. Fewer pieces, each worth wearing.',
      product: 'Titan Raga Floral',
    },
    {
      numeral: 'III',
      eyebrow: 'The promise',
      title: 'Clear prices, careful service.',
      text: 'You see the full price and exactly what you save, before you decide. Then your watch is packed with care and sent your way, ready for its first chapter with you.',
      product: 'Fossil Grant Chronograph',
    },
  ],
  timeline: {
    eyebrow: 'Our houses',
    title: (years) => `Over ${years} years of watchmaking, in one place`,
    intro: 'Every house we carry sits on our dial like an hour marker, oldest at twelve o’clock. Follow the hand, or point at a house to meet it.',
    visitLabel: (name) => `Visit ${name}`,
  },
  promises: {
    eyebrow: 'What we promise',
    title: 'Four hallmarks, on every order',
    intro: 'Like the marks stamped inside a fine case, these are the small promises we keep with every watch that leaves us.',
    items: [
      { icon: 'gem', title: 'Chosen one by one', text: 'Every piece is selected for its design, its maker and its staying power.' },
      { icon: 'tag', title: 'Honest pricing', text: 'The full price and your saving, shown clearly on every watch.' },
      { icon: 'truck', title: 'Free shipping', text: 'Complimentary delivery on eligible orders, packed with care.' },
      { icon: 'shield', title: 'Secure checkout', text: 'Your payment details stay protected from cart to confirmation.' },
    ],
  },
  closing: {
    eyebrow: 'Your chapter',
    titleLead: 'Find the watch that keeps',
    titleAccent: 'your story.',
    intro: 'The newest pieces have just arrived. Start with them, or with the moment you want to remember.',
    primaryCta: 'Shop new arrivals',
    secondaryCta: 'Browse all brands',
    // Shortcuts into the category pages (data/categories.js): `category` is the page label.
    momentsLabel: 'Or start with a moment',
    moments: [
      { label: 'The wedding day', gender: 'men', category: 'Dress watches' },
      { label: 'An anniversary', gender: 'women', category: 'Jewellery watches' },
      { label: 'A new adventure', gender: 'men', category: 'Chronographs' },
      { label: 'Every single day', gender: 'women', category: 'Minimal watches' },
    ],
    // Engraved around the ring that holds the newest watches.
    engraving: `${SITE.name} · Time, well kept · New arrivals`,
  },
};

export const NEW_ARRIVAL_CONTENT = {
  showcase: {
    eyebrow: `The latest chapter · ${SITE.collectionYear}`,
    titleLead: 'Discover',
    titleAccent: 'new arrivals.',
    tagline: 'Timeless style. Modern luxury.',
    videoSrc: 'https://www.pexels.com/download/video/39108088/',
    videoLabel: `${SITE.name} luxury wristwatch showcase`,
  },
  shop: {
    eyebrow: `Curated timepieces · ${SITE.collectionYear}`,
    titleLead: 'New',
    titleAccent: 'arrivals',
    intro: 'Discover the latest watches. Explore your style.',
    ledgerLabel: 'This season at a glance',
    freshLabel: 'Fresh from',
    moreLabel: 'more houses',
    // How many house logos appear under "Fresh from" (the houses with the newest arrivals).
    freshCount: 4,
    spotlightBadge: 'Just landed',
    emptyMessage: 'No watches match those filters.',
    // Newest pieces shown per brand in the full listing.
    perBrand: 3,
  },
  // Home page preview: the newest pieces across all brands, then a link to the full listing.
  latest: {
    count: 3,
    viewAllLabel: 'View all',
    emptyMessage: 'New arrivals are on their way.',
  },
};
