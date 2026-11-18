import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../../utils/price';
import BrandMark from './BrandMark';

const watchCount = (count) => `${count} ${count === 1 ? 'watch' : 'watches'}`;

// Brand card for the All brands page: logo (crossfades to the brand's watch on hover),
// founding facts, tagline and collection summary. `index` staggers the entrance animation.
function HouseCard({ brand, index = 0 }) {
  const facts = [brand.founded && `Est. ${brand.founded}`, brand.origin].filter(Boolean).join(' · ');

  return (
    <a className="house-card" href={brand.href} style={{ '--i': index }}>
      <span className="house-card-media" aria-hidden="true">
        <BrandMark brand={brand} />
        {brand.photo && (
          <span
            className={`house-card-photo ${brand.photoFit === 'cover' ? 'is-cover' : ''}`}
            style={{ backgroundImage: `url("${brand.photo}")` }}
          />
        )}
      </span>
      <span className="house-card-body">
        {facts && <span className="house-card-meta">{facts}</span>}
        <span className="house-card-name">{brand.name}</span>
        {brand.tagline && <span className="house-card-tagline">{brand.tagline}</span>}
        <span className="house-card-foot">
          <span>
            {watchCount(brand.count)}
            {brand.priceFrom && <> · from {formatPrice(brand.priceFrom)}</>}
          </span>
          <span className="house-card-arrow"><ArrowUpRight size={16} strokeWidth={1.5} /></span>
        </span>
      </span>
    </a>
  );
}

export default HouseCard;
