import { useRef } from 'react';
import { getBrandByName } from '../../data/brands';
import { useInView } from '../../hooks/useInView';
import { formatPrice } from '../../utils/price';
import FloatingLogo from './FloatingLogo';
import FloatingPrice from './FloatingPrice';

// Spreads the float animation start over 0–4s from a stable seed, so neighbouring
// cards in a grid never bob in unison.
const floatOffset = (seed = '') => {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % 4000) / 1000;
};

/**
 * Premium watch presentation used everywhere a watch is shown:
 * the watch photo with a floating price tag and a floating brand-logo card.
 *
 * size:  'hero' | 'feature' | 'card' | 'mini'   (mini = photo only, for tight spaces)
 * shape: 'arch' | 'rect'
 * fit:   'contain' for studio cut-outs on white, 'cover' for full photos
 * brand: brand name or brand object (logo is looked up from data/brands.js)
 * children render inside the frame (badges, wishlist, quick-view buttons).
 */
function WatchShowcase({
  image,
  alt,
  fit = 'contain',
  brand,
  price,
  priceLabel = 'Price',
  size = 'card',
  shape = 'rect',
  showPrice = true,
  showLogo = true,
  className = '',
  children,
}) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef);
  const brandInfo = typeof brand === 'string' ? (getBrandByName(brand) || { name: brand, logo: null }) : brand;
  const compact = size === 'mini';

  return (
    <div
      ref={rootRef}
      className={`ws ws-${size} ws-${shape} ws-fit-${fit} ${inView ? '' : 'is-paused'} ${className}`}
      style={{ '--ws-offset': `-${floatOffset(alt)}s` }}
    >
      <div className="ws-frame">
        {image
          ? <div className="ws-photo" role="img" aria-label={alt} style={{ backgroundImage: `url("${image}")` }} />
          : <span className="ws-empty">{alt}</span>}
        {children}
      </div>
      {!compact && showPrice && price != null && <FloatingPrice label={priceLabel} value={formatPrice(price)} />}
      {!compact && showLogo && brandInfo && <FloatingLogo brand={brandInfo} />}
    </div>
  );
}

export default WatchShowcase;
