import { ArrowUpRight } from 'lucide-react';
import { getBrandByName } from '../../data/brands';
import { getCategoryHref } from '../../data/categories';
import { products } from '../../data/products';
import { brandLink, SHOP_PATH } from '../../utils/hash';
import { takePerGroup } from '../../utils/products';
import WatchShowcase from '../showcase/WatchShowcase';

const COLLAGE_POSITIONS = ['is-left', 'is-center', 'is-right'];
// The newest piece from each of the three most recent houses (products are listed newest first).
const newest = takePerGroup(products, 'brand', 1).slice(0, 3);

/**
 * Closing invitation for the "Our story" page: a navy caseback panel with the call to
 * action, occasion shortcuts into the category pages, and the newest watches inside a
 * slowly turning engraved ring.
 * content: ABOUT_CONTENT.closing
 */
function StoryClosing({ content }) {
  const moments = content.moments
    .map((moment) => ({ ...moment, href: getCategoryHref(moment.gender, moment.category) }))
    .filter((moment) => moment.href);
  // Repeated so the engraving runs all the way round the ring.
  const engraving = `${content.engraving} ✦ `.repeat(3);

  return (
    <section className="story-closing" aria-labelledby="story-closing-title">
      <div className="story-closing-panel">
        <div className="story-closing-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="story-closing-title">
            {content.titleLead} <em>{content.titleAccent}</em>
          </h2>
          <p className="story-closing-intro">{content.intro}</p>
          <div className="story-actions">
            <a className="gold-button" href={SHOP_PATH}>{content.primaryCta} <span>→</span></a>
            <a className="story-text-link" href={brandLink()}>
              {content.secondaryCta} <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
          </div>

          {moments.length > 0 && (
            <nav className="story-moments" aria-label={content.momentsLabel}>
              <p>{content.momentsLabel}</p>
              <ul>
                {moments.map((moment) => (
                  <li key={moment.label}>
                    <a href={moment.href}>
                      <span>{moment.label}</span>
                      <small>{moment.category}</small>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {newest.length > 0 && (
          <div className="story-closing-visual">
            <svg className="story-closing-ring" viewBox="0 0 400 400" aria-hidden="true">
              <defs>
                <path id="story-ring-path" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
              </defs>
              <circle cx="200" cy="200" r="190" />
              <circle cx="200" cy="200" r="150" />
              <text>
                <textPath href="#story-ring-path" textLength="1060">{engraving}</textPath>
              </text>
            </svg>
            <div className="bx-collage story-closing-collage">
              {newest.map((product, index) => (
                <a
                  className={`bx-collage-item ${COLLAGE_POSITIONS[index]}`}
                  href={brandLink(getBrandByName(product.brand)?.slug)}
                  key={product.id}
                  aria-label={`${product.name}, from the ${product.brand} collection`}
                >
                  <span className="bx-collage-float" style={{ '--d': index }}>
                    <WatchShowcase image={product.image} alt={product.name} fit={product.fit} size="mini" shape="arch" />
                    <span className="bx-collage-name">{product.brand}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default StoryClosing;
