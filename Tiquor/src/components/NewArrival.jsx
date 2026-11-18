import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { NEW_ARRIVAL_CONTENT } from '../data/content';
import { ALL, DEFAULT_FILTERS, GENDER_OPTIONS, PRICE_RANGES, SORT_OPTIONS } from '../data/filters';
import { brands, products } from '../data/products';
import { useHash } from '../hooks/useHash';
import { parseHash, SHOP_PATH } from '../utils/hash';
import { getDiscount } from '../utils/price';
import { countBy, filterProducts, sortProducts } from '../utils/products';
import { slugify } from '../utils/slugify';
import SelectField from './common/SelectField';
import ProductCard from './product/ProductCard';
import ProductSpotlight from './product/ProductSpotlight';
import QuickView from './product/QuickView';

const { showcase, shop } = NEW_ARRIVAL_CONTENT;
const brandCounts = countBy(products, 'brand');
const brandTabs = [
  { id: ALL, label: 'All brands', count: products.length },
  ...brands.map((brand) => ({ id: brand, label: brand, count: brandCounts[brand] })),
];
const stats = [
  { label: 'Pieces', value: products.length },
  { label: 'Brands', value: brands.length },
  { label: 'Save up to', value: `${Math.max(...products.map(getDiscount))}%` },
];

function ArrivalShowcase() {
  return (
    <section className="arrival-showcase" aria-labelledby="showcase-title">
      <video className="arrival-showcase-video" autoPlay muted loop playsInline aria-label={showcase.videoLabel}>
        <source src={showcase.videoSrc} type="video/mp4" />
      </video>
      <div className="arrival-showcase-overlay" />
      <div className="arrival-showcase-copy">
        <p className="eyebrow">{showcase.eyebrow}</p>
        <h1 id="showcase-title">{showcase.titleLead}<br /><span>{showcase.titleAccent}</span></h1>
        <p>{showcase.tagline}</p>
      </div>
    </section>
  );
}

// "#new?brand=timex&gender=men" -> filters, or null when the link carries no filters.
const filtersFromHash = (hash) => {
  const { params } = parseHash(hash);
  const brandSlug = params.get('brand');
  const gender = params.get('gender');
  if (!brandSlug && !gender) return null;

  return {
    ...DEFAULT_FILTERS,
    brand: brands.find((brand) => slugify(brand) === brandSlug) || ALL,
    gender: GENDER_OPTIONS.some((option) => option.id === gender) ? gender : ALL,
  };
};

function NewArrival() {
  const { bag } = useShop();
  const location = useHash();
  const shopRef = useRef(null);
  const [filters, setFilters] = useState(() => filtersFromHash(location.hash) || DEFAULT_FILTERS);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Menu links such as "#new?brand=timex" set the filters and scroll to the products.
  useEffect(() => {
    const linkedFilters = filtersFromHash(location.hash);
    if (!linkedFilters) return;
    setFilters(linkedFilters);
    shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location]);

  // Once the shopper changes filters by hand, drop the link's query so the same
  // menu link works again next time.
  const updateFilters = (next) => {
    setFilters(next);
    if (window.location.hash.includes('?')) window.history.replaceState(null, '', SHOP_PATH);
  };
  const setFilter = (key) => (value) => updateFilters({ ...filters, [key]: value });
  const isFiltered = Object.keys(DEFAULT_FILTERS).some((key) => filters[key] !== DEFAULT_FILTERS[key]);

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), filters.sortBy),
    [filters],
  );
  const [spotlight, ...gridProducts] = visibleProducts;

  return (
    <div className="new-arrival-page">
      <ArrivalShowcase />

      <section className="na-shop" aria-labelledby="shop-arrivals-title" ref={shopRef}>
        <header className="na-head">
          <div>
            <p className="eyebrow">{shop.eyebrow}</p>
            <h1 id="shop-arrivals-title">{shop.titleLead} <em>{shop.titleAccent}</em></h1>
          </div>
          <div className="na-head-meta">
            <p>{shop.intro}</p>
            <dl className="na-stats">
              {stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
            </dl>
          </div>
        </header>

        <div className="na-toolbar">
          <div className="na-brand-tabs" role="group" aria-label="Shop new arrivals by brand">
            {brandTabs.map((tab) => (
              <button
                className={filters.brand === tab.id ? 'is-active' : ''}
                type="button"
                key={tab.id}
                aria-pressed={filters.brand === tab.id}
                onClick={() => setFilter('brand')(tab.id)}
              >
                {tab.label}<sup>{tab.count}</sup>
              </button>
            ))}
          </div>
          <div className="na-toolbar-controls">
            <SelectField label="For" value={filters.gender} options={GENDER_OPTIONS} onChange={setFilter('gender')} />
            <SelectField label="Price range" value={filters.priceRange} options={PRICE_RANGES} onChange={setFilter('priceRange')} />
            <SelectField label="Sort by" value={filters.sortBy} options={SORT_OPTIONS} onChange={setFilter('sortBy')} />
          </div>
        </div>

        <div className="na-results">
          <div className="na-results-left">
            <span aria-live="polite">Showing {visibleProducts.length} of {products.length} pieces</span>
            {isFiltered && (
              <button className="na-reset" type="button" onClick={() => updateFilters(DEFAULT_FILTERS)}>
                Clear filters <X size={14} />
              </button>
            )}
          </div>
          {bag.length > 0 && (
            <span className="bag-status">
              <Check size={15} /> {bag.length} {bag.length === 1 ? 'piece' : 'pieces'} in bag
            </span>
          )}
        </div>

        {spotlight && <ProductSpotlight product={spotlight} badge={shop.spotlightBadge} onQuickView={setQuickViewProduct} />}

        <div className="na-grid">
          {gridProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} position={index + 2} onQuickView={setQuickViewProduct} />
          ))}
        </div>

        {visibleProducts.length === 0 && <p className="empty-arrivals">{shop.emptyMessage}</p>}
      </section>

      {quickViewProduct && (
        <QuickView product={quickViewProduct} label="New arrival" onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}

export default NewArrival;
