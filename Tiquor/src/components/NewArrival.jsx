import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  ShoppingBag,
  X,
} from 'lucide-react';
import heroWatch from '../assets/hero/royal-watch.svg';

const brandCatalog = [
  'Adidas',
  'Gucci',
  'Guess',
  'Versace',
  'Timex',
  'GC',
  'Nautica',
  'Daniel Wellington',
  'Aston Martin',
  'Philipp Plein',
  'Plein Sport',
  'United Colors of Benetton',
];

const watchImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1508685096489-7aacdcb0c4c6?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1557531365-e8b22d0a6b0d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85',
];

const providedWatchImages = {
  "Men's Premium Analog Watch": '/images/products/guess-gold-black.png',
  'Marlin Hand-Wound': '/images/products/timex-rose-bracelet.png',
  'Timex Crystal Charm': '/images/products/timex-rose-charm.png',
  'Greca Signature': '/images/products/versace-gold-black.png',
  'Medusa Gold': '/images/products/versace-gold.png',
  'Greca Emerald': '/images/products/versace-silver-green.png',
};

const productSpecs = [
  ['Adidas', 'Archive Chronograph', 'Chronograph · Gold detail', 62000, 43400],
  ['Gucci', 'G-Timeless Classic', 'Dress watch · Green dial', 118000, 82600],
  ['Guess', "Men's Premium Analog Watch", 'Quartz · Navy dial', 15000, 10500],
  ['Versace', 'Greca Signature', 'Swiss made · Black dial', 98000, 68600],
  ['Timex', 'Marlin Hand-Wound', 'Hand-wound · Leather strap', 32000, 22400],
  ['Timex', 'Timex Crystal Charm', 'Jewelled · Rose gold bracelet', 28000, 19600],
  ['GC', 'Structura Sport', 'Chronograph · Steel bracelet', 54000, 37800],
  ['Nautica', 'Ocean Tide', 'Quartz · Blue dial', 18000, 12600],
  ['Daniel Wellington', 'Iconic Link', 'Minimal · Rose gold', 24500, 17150],
  ['Aston Martin', 'Performance Edition', 'Automatic · Racing green', 76000, 53200],
  ['Philipp Plein', 'The Skull', 'Statement · Black steel', 89000, 57850],
  ['Plein Sport', 'Runner Chrono', 'Sport · Silicone strap', 28500, 19950],
  ['United Colors of Benetton', 'Color Block', 'Fashion · Ivory dial', 12500, 8750],
  ['Versace', 'Medusa Gold', 'Swiss made · Gold bracelet', 105000, 73500],
  ['Versace', 'Greca Emerald', 'Swiss made · Emerald dial', 112000, 78400],
];

const products = productSpecs.map(([brand, name, type, mrp, price], index) => ({
  id: `${brand.toLowerCase().replaceAll(' ', '-')}-${index}`,
  brand,
  name,
  type,
  mrp,
  price,
  image: providedWatchImages[name] || watchImages[index % watchImages.length],
}));

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`;

function ProductCard({ product, isWishlisted, onWishlist, onQuickView, onAddToBag }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const savings = product.mrp - product.price;

  return (
    <article className="shop-product-card">
      <div className="shop-product-image">
        <img className="product-image-main" src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" onError={(event) => { event.currentTarget.src = heroWatch; }} />
        <span className="product-new-badge">New arrival</span>
        <span className="product-discount-badge">{discount}% off</span>
        <button
          className={`product-wishlist ${isWishlisted ? 'is-selected' : ''}`}
          type="button"
          aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
          onClick={() => onWishlist(product.id)}
        >
          <Heart size={19} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>
        <div className="product-image-actions">
          <button type="button" onClick={() => onQuickView(product)}>Quick view</button>
        </div>
      </div>
      <div className="shop-product-details">
        <p className="shop-product-brand">{product.brand}</p>
        <div className="product-name-row">
          <h2>{product.name}</h2>
          <span>{product.type}</span>
        </div>
        <div className="product-price-row">
          <strong>{formatPrice(product.price)}</strong>
          <del>{formatPrice(product.mrp)}</del>
          <span>{discount}% off</span>
        </div>
        <p className="product-savings">You save {formatPrice(savings)}</p>
        <button className="product-bag-button" type="button" onClick={() => onAddToBag(product)}>
          <ShoppingBag size={17} strokeWidth={1.5} /> Add to bag
        </button>
      </div>
    </article>
  );
}

function QuickView({ product, onClose, onAddToBag }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="quick-view-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="quick-view-modal" role="dialog" aria-modal="true" aria-labelledby="quick-view-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="quick-view-close" type="button" aria-label="Close quick view" onClick={onClose}><X size={21} strokeWidth={1.5} /></button>
        <div className="quick-view-image"><img src={product.image} alt={`${product.brand} ${product.name}`} onError={(event) => { event.currentTarget.src = heroWatch; }} /></div>
        <div className="quick-view-content">
          <p className="eyebrow">{product.brand} · New arrival</p>
          <h2 id="quick-view-title">{product.name}</h2>
          <p className="quick-view-type">{product.type}</p>
          <p className="quick-view-copy">A considered timepiece with a precision movement, polished details, and a dial designed to stay timeless.</p>
          <div className="quick-view-price"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.mrp)}</del><span>{discount}% off</span></div>
          <p className="product-savings">You save {formatPrice(product.mrp - product.price)}</p>
          <button className="gold-button quick-view-bag" type="button" onClick={() => onAddToBag(product)}>
            <ShoppingBag size={17} strokeWidth={1.5} /> Add to bag
          </button>
        </div>
      </section>
    </div>
  );
}

function NewArrival() {
  const [sortBy, setSortBy] = useState('newest');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [bag, setBag] = useState([]);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const brandMatches = brand === 'all' || product.brand === brand;
      const priceMatches = priceRange === 'all'
        || (priceRange === 'under-40000' && product.price < 40000)
        || (priceRange === '40000-80000' && product.price >= 40000 && product.price <= 80000)
        || (priceRange === 'over-80000' && product.price > 80000);
      return brandMatches && priceMatches;
    });

    return [...filtered].sort((first, second) => {
      if (sortBy === 'price-low') return first.price - second.price;
      if (sortBy === 'price-high') return second.price - first.price;
      if (sortBy === 'discount') return (second.mrp - second.price) / second.mrp - (first.mrp - first.price) / first.mrp;
      return products.indexOf(first) - products.indexOf(second);
    });
  }, [brand, priceRange, sortBy]);

  const toggleWishlist = (productId) => {
    setWishlist((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]);
  };

  const addToBag = (product) => {
    setBag((current) => [...current, product.id]);
    setQuickViewProduct(null);
  };

  return (
    <div className="new-arrival-page">
      {/* First section */}
      <section className="arrival-showcase" aria-labelledby="showcase-title">
        <video
          className="arrival-showcase-video"
          autoPlay
          muted
          loop
          playsInline
          aria-label="WOW WATCHES luxury wristwatch showcase"
        >
          <source src="https://www.pexels.com/download/video/39108088/" type="video/mp4" />
        </video>
        <div className="arrival-showcase-overlay" />
        <div className="arrival-showcase-copy">
          <p className="eyebrow">The latest chapter · 2026</p>
          <h1 id="showcase-title">Discover<br /><span>new arrivals.</span></h1>
          <p>Timeless style. Modern luxury.</p>
        </div>
      </section>

      <section className="shop-arrivals" aria-labelledby="shop-arrivals-title">
        <div className="shop-arrivals-heading">
          <div>
            <p className="eyebrow">Curated timepieces · 2026</p>
            <h1 id="shop-arrivals-title">New arrivals</h1>
            <p>Discover the latest watches. Explore your style.</p>
          </div>
          {bag.length > 0 && (
            <span className="bag-status">
              <Check size={15} /> {bag.length} {bag.length === 1 ? 'piece' : 'pieces'} in bag
            </span>
          )}
        </div>

        <div className="brand-discovery" aria-label="Shop new arrivals by brand">
          <button
            className={brand === 'all' ? 'is-active' : ''}
            type="button"
            onClick={() => setBrand('all')}
          >
            All brands
          </button>
          {brandCatalog.map((brandName) => (
            <button
              className={brand === brandName ? 'is-active' : ''}
              type="button"
              key={brandName}
              onClick={() => setBrand(brandName)}
            >
              {brandName}
            </button>
          ))}
        </div>

        <div className="arrival-filters" aria-label="Product filters">
          <label>
            <span>Price range</span>
            <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
              <option value="all">All prices</option>
              <option value="under-40000">Under ₹40,000</option>
              <option value="40000-80000">₹40,000 – ₹80,000</option>
              <option value="over-80000">Over ₹80,000</option>
            </select>
            <ChevronDown size={15} />
          </label>
          <label className="sort-filter">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">Newest arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest discount</option>
            </select>
            <ChevronDown size={15} />
          </label>
          <button
            className="view-all-button"
            type="button"
            onClick={() => {
              setBrand('all');
              setPriceRange('all');
              setSortBy('newest');
            }}
          >
            View all <ArrowUpRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="shop-product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onWishlist={toggleWishlist}
              onQuickView={setQuickViewProduct}
              onAddToBag={addToBag}
            />
          ))}
        </div>

        {visibleProducts.length === 0 && <p className="empty-arrivals">No watches match those filters.</p>}

      </section>

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToBag={addToBag} />}
    </div>
  );
}

export default NewArrival;
