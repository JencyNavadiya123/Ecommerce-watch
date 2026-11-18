import { ALL, PRICE_RANGES, SORT_OPTIONS } from '../data/filters';

const inPriceRange = (price, rangeId) => {
  const range = PRICE_RANGES.find((item) => item.id === rangeId);
  if (!range) return true;
  return price >= (range.min ?? 0) && price < (range.max ?? Infinity);
};

export const filterProducts = (list, { brand = ALL, gender = ALL, priceRange = ALL }) => list.filter((product) => (
  (brand === ALL || product.brand === brand)
  && (gender === ALL || product.gender === gender)
  && inPriceRange(product.price, priceRange)
));

export const sortProducts = (list, sortId) => {
  const option = SORT_OPTIONS.find((item) => item.id === sortId);
  return option?.compare ? [...list].sort(option.compare) : list;
};

// countBy(products, 'brand') -> { Timex: 5, Guess: 3, ... }
export const countBy = (list, key) => list.reduce((counts, item) => {
  counts[item[key]] = (counts[item[key]] || 0) + 1;
  return counts;
}, {});
