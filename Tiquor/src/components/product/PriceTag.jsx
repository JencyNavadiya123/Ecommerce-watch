import { formatPrice, getDiscount, getSavings } from '../../utils/price';

function PriceTag({ product, className = 'na-price', showDiscount = true, showSavings = false }) {
  return (
    <>
      <div className={className}>
        <strong>{formatPrice(product.price)}</strong>
        <del>{formatPrice(product.mrp)}</del>
        {showDiscount && <span>{getDiscount(product)}% off</span>}
      </div>
      {showSavings && <p className="product-savings">You save {formatPrice(getSavings(product))}</p>}
    </>
  );
}

export default PriceTag;
