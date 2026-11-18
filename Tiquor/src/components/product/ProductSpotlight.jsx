import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import PriceTag from './PriceTag';
import ProductShowcase from '../showcase/ProductShowcase';
import WishlistButton from './WishlistButton';

// Large feature card. `eyebrow` overrides the small label; `reversed` puts the photo on the right.
function ProductSpotlight({ product, badge, eyebrow, reversed = false, className = '', onQuickView }) {
  const { addToBag } = useShop();

  return (
    <article className={`na-spotlight ${reversed ? 'is-reversed' : ''} ${className}`}>
      <div className="na-spotlight-media">
        {badge && <span className="na-badge">{badge}</span>}
        <WishlistButton product={product} />
        <ProductShowcase product={product} size="feature" shape="arch" />
      </div>
      <div className="na-spotlight-body">
        <p className="eyebrow">{eyebrow || `Spotlight · ${product.brand}`}</p>
        <h2>{product.name}</h2>
        <p className="na-spotlight-type">{product.type}</p>
        <p className="na-spotlight-copy">{product.description}</p>
        <PriceTag product={product} showSavings />
        <div className="na-spotlight-actions">
          <button className="gold-button" type="button" onClick={() => addToBag(product.id)}>
            <ShoppingBag size={17} strokeWidth={1.5} /> Add to bag
          </button>
          <button className="na-link-button" type="button" onClick={() => onQuickView(product)}>
            Quick view <ArrowUpRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductSpotlight;
