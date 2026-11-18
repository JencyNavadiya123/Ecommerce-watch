import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BRANDS_CONTENT as text } from '../data/content';
import { getBrandBySlug, stockedBrands, upcomingBrands } from '../data/brands';
import { ALL, GENDER_OPTIONS, SORT_OPTIONS } from '../data/filters';
import { products } from '../data/products';
import { useHash } from '../hooks/useHash';
import { brandLink, parseHash, SHOP_PATH } from '../utils/hash';
import { formatPrice } from '../utils/price';
import { filterProducts, sortProducts } from '../utils/products';
import BrandMark from './brand/BrandMark';
import BrandMarquee from './brand/BrandMarquee';
import BrandsHero from './brand/BrandsHero';
import HouseCard from './brand/HouseCard';
import SelectField from './common/SelectField';
import ProductCard from './product/ProductCard';
import ProductSpotlight from './product/ProductSpotlight';
import QuickView from './product/QuickView';
import WatchShowcase from './showcase/WatchShowcase';

const watchCount = (count) => `${count} ${count === 1 ? 'watch' : 'watches'}`;

// Countries the stocked brands come from, for the "filter by origin" pills.
const origins = [...new Set(stockedBrands.map((brand) => brand.origin).filter(Boolean))].sort();
const originOptions = [
  { id: ALL, label: 'All houses', count: stockedBrands.length },
  ...origins.map((origin) => ({ id: origin, label: origin, count: stockedBrands.filter((b) => b.origin === origin).length })),
];

// Brands with no stock yet: listed, not linked, never shown as an empty collection.
function UpcomingBrands() {
  if (!upcomingBrands.length) return null;
  return (
    <section className="brand-upcoming" aria-labelledby="brand-upcoming-title">
      <div className="brand-upcoming-head">
        <h2 id="brand-upcoming-title">{text.upcomingTitle}</h2>
        <p>{text.upcomingIntro}</p>
      </div>
      <ul className="brand-upcoming-list">
        {upcomingBrands.map((brand) => (
          <li key={brand.slug}>
            <BrandMark brand={brand} size="sm" muted />
            <span>{brand.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BrandSection({ brand, onQuickView }) {
  const titleId = `brand-${brand.slug}-title`;
  return (
    <section className="brand-section" aria-labelledby={titleId}>
      <header className="brand-section-head">
        <BrandMark brand={brand} size="sm" />
        <div className="brand-section-title">
          <h2 id={titleId}>{brand.name}</h2>
          <span>{watchCount(brand.count)}</span>
        </div>
        <a className="brand-link" href={brand.href}>
          View collection <ArrowUpRight size={15} strokeWidth={1.5} />
        </a>
      </header>
      <div className="na-grid">
        {brand.products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
        ))}
      </div>
    </section>
  );
}

// Stats and the three brands pictured in the All brands opening.
const oldestFounding = Math.min(...stockedBrands.map((brand) => brand.founded).filter(Boolean));
const heroStats = [
  { label: 'Houses', value: stockedBrands.length, count: true },
  { label: 'Watches', value: products.length, count: true },
  { label: 'Countries', value: origins.length, count: true },
  ...(Number.isFinite(oldestFounding) ? [{ label: 'Heritage since', value: oldestFounding, count: false }] : []),
];
// Prefer studio photos (they sit cleanly in the arches); fall back to any photo.
const heroBrands = [
  ...stockedBrands.filter((brand) => brand.photo && brand.photoFit === 'contain'),
  ...stockedBrands.filter((brand) => brand.photo && brand.photoFit !== 'contain'),
].slice(0, 3);

function AllBrands({ onQuickView }) {
  const indexRef = useRef(null);
  const [origin, setOrigin] = useState(ALL);
  const shown = origin === ALL ? stockedBrands : stockedBrands.filter((brand) => brand.origin === origin);

  return (
    <div className="na-shop brands-shop">
      <BrandsHero
        eyebrow={text.eyebrow}
        titleLead={text.titleLead}
        titleAccent={text.titleAccent}
        intro={text.intro}
        ctaLabel={text.exploreLabel}
        stats={heroStats}
        featured={heroBrands}
        onExplore={() => indexRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      />

      <nav className="house-index" aria-label={text.indexTitle} ref={indexRef}>
        <div className="house-toolbar">
          <h2>{text.indexTitle}</h2>
          {originOptions.length > 2 && (
            <div className="bh-chips" role="group" aria-label="Filter houses by origin">
              {originOptions.map((option) => (
                <button
                  className={origin === option.id ? 'is-active' : ''}
                  type="button"
                  key={option.id}
                  aria-pressed={origin === option.id}
                  onClick={() => setOrigin(option.id)}
                >
                  {option.label} <sup>{option.count}</sup>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="house-grid" key={origin}>
          {shown.map((brand, index) => <HouseCard brand={brand} index={index} key={brand.slug} />)}
        </div>
      </nav>

      {shown.map((brand) => <BrandSection brand={brand} key={brand.slug} onQuickView={onQuickView} />)}

      <UpcomingBrands />
    </div>
  );
}

// Editorial opening for one brand: giant watermark name, facts, and the lead watch in an arch.
function BrandHero({ brand, onExplore }) {
  const facts = [
    brand.founded && { label: 'Founded', value: brand.founded },
    brand.origin && { label: 'Origin', value: brand.origin },
    { label: 'Pieces', value: brand.available ? brand.count : 'Soon' },
    brand.priceFrom && { label: 'From', value: formatPrice(brand.priceFrom) },
  ].filter(Boolean);

  return (
    <section className="bh" aria-labelledby="brand-hero-title">
      <span className="bh-watermark" aria-hidden="true">{brand.name}</span>
      <div className="bh-inner">
        <div className="bh-copy">
          <a className="brand-crumb" href={brandLink()}>
            <ArrowLeft size={15} strokeWidth={1.5} /> All brands
          </a>
          <p className="eyebrow bh-reveal" style={{ '--d': 1 }}>{text.collectionEyebrow}</p>
          <h1 id="brand-hero-title" className="bh-reveal" style={{ '--d': 2 }}>{brand.name}</h1>
          {brand.tagline && <p className="bh-tagline bh-reveal" style={{ '--d': 3 }}>{brand.tagline}</p>}
          <dl className="bh-facts bh-reveal" style={{ '--d': 4 }}>
            {facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          </dl>
          {brand.available && (
            <button className="gold-button bh-cta bh-reveal" style={{ '--d': 5 }} type="button" onClick={onExplore}>
              Explore the collection <ArrowDown size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>

        <div className="bh-visual">
          <WatchShowcase
            image={brand.photo}
            alt={brand.photo ? `${brand.name} watch` : brand.name}
            fit={brand.photoFit}
            brand={brand}
            price={brand.priceFrom}
            priceLabel="From"
            size="hero"
            shape="arch"
          />
        </div>
      </div>
    </section>
  );
}

// Endless auto-scrolling carousel of the other brands.
function OtherHouses({ brands }) {
  return <BrandMarquee brands={brands} title={text.otherBrandsTitle} allHref={brandLink()} />;
}

function BrandCollection({ slug, onQuickView }) {
  const brand = getBrandBySlug(slug);
  const collectionRef = useRef(null);
  const [gender, setGender] = useState(ALL);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].id);

  if (!brand) {
    return (
      <div className="na-shop brands-shop">
        <div className="brand-empty">
          <h1>{text.notFoundTitle}</h1>
          <p>{text.notFoundText}</p>
          <a className="gold-button" href={brandLink()}>View all brands</a>
        </div>
      </div>
    );
  }

  const otherBrands = stockedBrands.filter((item) => item.slug !== brand.slug);
  // Only offer "For him / For her" when this brand actually has both.
  const genderOptions = GENDER_OPTIONS.filter((option) => option.id === ALL
    || brand.products.some((product) => product.gender === option.id));
  const visible = sortProducts(filterProducts(brand.products, { gender }), sortBy);
  // Small collections: every piece gets a feature card. Larger ones: lead piece featured, rest in the grid.
  const featured = visible.length <= 2 ? visible : visible.slice(0, 1);
  const rest = visible.length <= 2 ? [] : visible.slice(1);

  return (
    <>
      <BrandHero brand={brand} onExplore={() => collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      <div className="na-shop brands-shop bh-collection" ref={collectionRef}>
        {brand.available ? (
          <>
            <div className="bh-collection-head">
              <div>
                <p className="eyebrow">The collection</p>
                <h2>{watchCount(visible.length)} by {brand.name}</h2>
              </div>
              <div className="bh-controls">
                {genderOptions.length > 2 && (
                  <div className="bh-chips" role="group" aria-label="Show watches for">
                    {genderOptions.map((option) => (
                      <button
                        className={gender === option.id ? 'is-active' : ''}
                        type="button"
                        key={option.id}
                        aria-pressed={gender === option.id}
                        onClick={() => setGender(option.id)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
                <SelectField label="Sort by" value={sortBy} options={SORT_OPTIONS} onChange={setSortBy} />
              </div>
            </div>

            {featured.map((product, index) => (
              <ProductSpotlight
                key={product.id}
                product={product}
                eyebrow={index === 0 ? `Signature piece · ${brand.name}` : `Also from ${brand.name}`}
                reversed={index % 2 === 1}
                className="bh-feature"
                onQuickView={onQuickView}
              />
            ))}

            {rest.length > 0 && (
              <div className="na-grid bh-grid">
                {rest.map((product, index) => (
                  <div className="bh-grid-item" style={{ '--i': index }} key={product.id}>
                    <ProductCard product={product} onQuickView={onQuickView} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="brand-empty">
            <h2>{text.emptyTitle(brand.name)}</h2>
            <p>{text.emptyText}</p>
            <div className="brand-empty-actions">
              <a className="gold-button" href={brandLink()}>View all brands</a>
              <a className="brand-link" href={SHOP_PATH}>Shop new arrivals <ArrowUpRight size={15} strokeWidth={1.5} /></a>
            </div>
          </div>
        )}

        <OtherHouses brands={otherBrands} />
      </div>
    </>
  );
}

// "#brands" lists every brand; "#brands?brand=timex" shows one brand's collection.
function Brands() {
  const { hash } = useHash();
  const slug = parseHash(hash).params.get('brand');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  return (
    <div className="brands-page">
      {slug
        ? <BrandCollection key={slug} slug={slug} onQuickView={setQuickViewProduct} />
        : <AllBrands onQuickView={setQuickViewProduct} />}
      {quickViewProduct && (
        <QuickView product={quickViewProduct} label="Collection" onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}

export default Brands;
