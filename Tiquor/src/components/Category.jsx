import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { categories, getCategoryBySlug } from '../data/categories';
import { CATEGORY_CONTENT as text } from '../data/content';
import { SORT_OPTIONS } from '../data/filters';
import { useHash } from '../hooks/useHash';
import { parseHash, SHOP_PATH, shopLink } from '../utils/hash';
import { formatPrice } from '../utils/price';
import { sortProducts } from '../utils/products';
import SelectField from './common/SelectField';
import ProductCard from './product/ProductCard';
import QuickView from './product/QuickView';
import WatchShowcase from './showcase/WatchShowcase';

const COLLAGE_POSITIONS = ['is-left', 'is-center', 'is-right'];

// Same sorts as the shop, but the default keeps the page's curated order.
const CATEGORY_SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  ...SORT_OPTIONS.filter((option) => option.compare),
];

// "#watches?category=chronographs" -> one style or collection page from the Men / Women menus.
function Category() {
  const { hash } = useHash();
  const slug = parseHash(hash).params.get('category');
  const category = getCategoryBySlug(slug);
  const shopRef = useRef(null);
  const [sortBy, setSortBy] = useState(CATEGORY_SORT_OPTIONS[0].id);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // A new category starts at the top, in its curated order.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSortBy(CATEGORY_SORT_OPTIONS[0].id);
  }, [slug]);

  const visible = useMemo(() => (category ? sortProducts(category.products, sortBy) : []), [category, sortBy]);

  if (!category) {
    return (
      <div className="na-shop">
        <div className="brand-empty">
          <h1>{text.notFoundTitle}</h1>
          <p>{text.notFoundText}</p>
          <a className="gold-button" href={SHOP_PATH}>{text.notFoundCta}</a>
        </div>
      </div>
    );
  }

  // Every style and collection for the same audience, so shoppers can hop between them.
  // Grouped as in the menu: [['Shop by style', [...]], ['Shop by collection', [...]]].
  const tabGroups = Object.entries(categories
    .filter((item) => item.gender === category.gender)
    .reduce((groups, item) => {
      (groups[item.group] ||= []).push(item);
      return groups;
    }, {}));
  const brandCount = new Set(category.products.map((product) => product.brand)).size;
  const stats = [
    { label: 'Pieces', value: category.products.length },
    { label: 'Brands', value: brandCount },
    { label: 'From', value: formatPrice(Math.min(...category.products.map((product) => product.price))) },
  ];

  // The first three curated pieces fan out in the opening, like the All brands page.
  const showcase = category.products.slice(0, 3);

  return (
    <div className="category-page">
      <section className="bh ch" aria-labelledby="category-title">
        <span className="bh-watermark" aria-hidden="true">{category.titleAccent}</span>
        <div className="bh-inner">
          <div className="bh-copy">
            <a className="brand-crumb" href={shopLink({ gender: category.gender })}>
              <ArrowLeft size={15} strokeWidth={1.5} /> {text.backLabel[category.gender]}
            </a>
            <p className="eyebrow bh-reveal" style={{ '--d': 1 }}>{text.audience[category.gender]} · {category.group}</p>
            <h1 id="category-title" className="bh-reveal" style={{ '--d': 2 }}>
              {category.titleLead} <em>{category.titleAccent}</em>
            </h1>
            <p className="bh-tagline bh-reveal" style={{ '--d': 3 }}>{category.intro}</p>
            <dl className="bh-facts bh-reveal" style={{ '--d': 4 }}>
              {stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
            </dl>
            <button
              className="gold-button bh-cta bh-reveal"
              style={{ '--d': 5 }}
              type="button"
              onClick={() => shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {text.ctaLabel} <ArrowDown size={16} strokeWidth={1.5} />
            </button>
          </div>

          <div className="bx-collage ch-collage">
            {showcase.map((product, index) => (
              <button
                className={`bx-collage-item ${COLLAGE_POSITIONS[index]}`}
                type="button"
                key={product.id}
                aria-label={`Quick view: ${product.name}`}
                onClick={() => setQuickViewProduct(product)}
              >
                <span className="bx-collage-float" style={{ '--d': index }}>
                  <WatchShowcase image={product.image} alt={product.name} fit={product.fit} size="mini" shape="arch" />
                  <span className="bx-collage-name">{product.brand}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="na-shop ch-shop" aria-label={category.label} ref={shopRef}>
        <div className="ch-toolbar">
          <nav className="ch-tabs" aria-label={text.tabsLabel}>
            {tabGroups.map(([group, items]) => (
              <div className="ch-tab-group" key={group}>
                <span className="ch-label">{group.replace(/^Shop by /i, '')}</span>
                <div className="ch-chips">
                  {items.map((tab) => (
                    <a
                      className={`ch-chip ${tab.slug === category.slug ? 'is-active' : ''}`}
                      href={tab.href}
                      key={tab.slug}
                      aria-current={tab.slug === category.slug ? 'page' : undefined}
                    >
                      {tab.label}
                      <span className="ch-chip-count">{tab.products.length}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="ch-results">
          <span aria-live="polite">Showing {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}</span>
          <div className="ch-sort">
            <span className="ch-label" aria-hidden="true">Sort</span>
            <SelectField label="Sort by" value={sortBy} options={CATEGORY_SORT_OPTIONS} onChange={setSortBy} />
          </div>
        </div>

        <div className="na-grid category-grid" key={category.slug}>
          {visible.map((product, index) => (
            <ProductCard key={product.id} product={product} position={index + 1} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </section>

      {quickViewProduct && (
        <QuickView product={quickViewProduct} label={category.label} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}

export default Category;
