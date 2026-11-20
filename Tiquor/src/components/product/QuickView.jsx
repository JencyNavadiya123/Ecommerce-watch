import { useEffect, useRef } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import PriceTag from './PriceTag';
import ProductShowcase from '../showcase/ProductShowcase';

function QuickView({ product, label, onClose }) {
  const { addToBag } = useShop();
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const scrollTop = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo({ top: scrollTop, behavior: 'auto' });
    };
  }, [onClose]);

  const handleAddToBag = () => {
    addToBag(product.id);
    onClose();
  };

  return (
    <div className="quick-view-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="quick-view-close" type="button" aria-label="Close quick view" onClick={onClose}>
          <X size={21} strokeWidth={1.5} />
        </button>
        <div className="quick-view-image">
          <ProductShowcase product={product} size="feature" shape="arch" />
        </div>
        <div className="quick-view-content">
          <p className="eyebrow">{product.brand}{label && ` · ${label}`}</p>
          <h2 id="quick-view-title">{product.name}</h2>
          <p className="quick-view-type">{product.type}</p>
          <p className="quick-view-copy">{product.description}</p>
          <PriceTag product={product} className="quick-view-price" showSavings />
          <button className="gold-button quick-view-bag" type="button" onClick={handleAddToBag}>
            <ShoppingBag size={17} strokeWidth={1.5} /> Add to bag
          </button>
          {product.credit && (
            <p className="photo-credit">
              Photo: {product.credit.author} ·{' '}
              <a href={product.credit.source} target="_blank" rel="noopener noreferrer">{product.credit.license}</a>
              {' '}via Wikimedia Commons
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default QuickView;
