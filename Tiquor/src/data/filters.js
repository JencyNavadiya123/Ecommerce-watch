import { formatPrice, getDiscountRatio } from '../utils/price';

export const ALL = 'all';

// `min` is inclusive, `max` is exclusive. Labels are built from the numbers.
const PRICE_STEPS = [40000, 80000];

export const PRICE_RANGES = [
  { id: ALL, label: 'All prices' },
  { id: `under-${PRICE_STEPS[0]}`, label: `Under ${formatPrice(PRICE_STEPS[0])}`, max: PRICE_STEPS[0] },
  {
    id: `${PRICE_STEPS[0]}-${PRICE_STEPS[1]}`,
    label: `${formatPrice(PRICE_STEPS[0])} – ${formatPrice(PRICE_STEPS[1])}`,
    min: PRICE_STEPS[0],
    max: PRICE_STEPS[1],
  },
  { id: `over-${PRICE_STEPS[1]}`, label: `${formatPrice(PRICE_STEPS[1])} & above`, min: PRICE_STEPS[1] },
];

// `compare: null` keeps the catalogue order (newest first).
export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest arrivals', compare: null },
  { id: 'price-low', label: 'Price: Low to High', compare: (a, b) => a.price - b.price },
  { id: 'price-high', label: 'Price: High to Low', compare: (a, b) => b.price - a.price },
  { id: 'discount', label: 'Highest discount', compare: (a, b) => getDiscountRatio(b) - getDiscountRatio(a) },
];

export const GENDER_OPTIONS = [
  { id: ALL, label: 'All watches' },
  { id: 'men', label: 'For him' },
  { id: 'women', label: 'For her' },
];

export const DEFAULT_FILTERS = {
  brand: ALL,
  gender: ALL,
  priceRange: ALL,
  sortBy: SORT_OPTIONS[0].id,
};
