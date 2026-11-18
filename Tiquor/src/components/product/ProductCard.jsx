import { Check, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getDiscount } from '../../utils/price';
import ProductShowcase from '../showcase/ProductShowcase';
import PriceTag from './PriceTag';
import WishlistButton from './WishlistButton';

function ProductCard({ product, position, onQuickView }) {
  const { addToBag, isInBag } = useShop();
  const added = isInBag(product.id);

  return (
    <article className="na-card">
      {/* Grid cards show price and brand in the text below, so no floating tags here. */}
      <ProductShowcase product={product} size="card" showPrice={false} showLogo={false} className="na-card-media">
        <span className="na-badge">−{getDiscount(product)}%</span>
        <WishlistButton product={product} />
        <button className="na-card-quick" type="button" onClick={() => onQuickView(product)}>
          Quick view
        </button>
      </ProductShowcase>
      <div className="na-card-body">
        <div className="na-card-top">
          <span>{product.brand}</span>
          {position && <span className="na-card-index">{String(position).padStart(2, '0')}</span>}
        </div>
        <h2>{product.name}</h2>
        <p className="na-card-type">{product.type}</p>
        <div className="na-card-foot">
          <PriceTag product={product} />
          <button
            className={`na-card-bag ${added ? 'is-added' : ''}`}
            type="button"
            aria-label={`Add ${product.name} to bag`}
            onClick={() => addToBag(product.id)}
          >
            {added ? <Check size={18} strokeWidth={1.75} /> : <ShoppingBag size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
