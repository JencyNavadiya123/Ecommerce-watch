import { SITE } from '../config/site';

// Page copy lives here so text changes never touch component code.

export const HOME_CONTENT = {
  eyebrow: `The Royal Collection · ${SITE.collectionYear}`,
  titleLead: 'A legacy',
  titleAccent: 'on your wrist.',
  description: 'Precision timepieces shaped by heritage, crafted for the moments that become history.',
  cta: { label: 'Explore the collection', href: '#collection' },
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
    spotlightBadge: 'Just landed',
    emptyMessage: 'No watches match those filters.',
  },
};
