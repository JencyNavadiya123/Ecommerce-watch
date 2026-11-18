import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import WatchShowcase from '../showcase/WatchShowcase';

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const COLLAGE_POSITIONS = ['is-left', 'is-center', 'is-right'];

// Counts from 0 up to `value` once, easing out. Shows the final value straight away
// when the visitor prefers reduced motion.
function CountUp({ value, duration = 1400 }) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? value : 0));

  useEffect(() => {
    if (prefersReducedMotion()) { setShown(value); return undefined; }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setShown(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return shown;
}

/**
 * Opening of the All brands page.
 * stats:    [{ label, value, count: boolean }]   count = animate the number
 * featured: up to three brand objects shown as a fanned trio of arch photos
 */
function BrandsHero({ eyebrow, titleLead, titleAccent, intro, ctaLabel, stats, featured, onExplore }) {
  return (
    <header className="bx">
      <div className="bx-copy">
        <p className="eyebrow bh-reveal" style={{ '--d': 1 }}>{eyebrow}</p>
        <h1 className="bh-reveal" style={{ '--d': 2 }}>{titleLead} <em>{titleAccent}</em></h1>
        <p className="bx-intro bh-reveal" style={{ '--d': 3 }}>{intro}</p>
        <button className="gold-button bh-cta bh-reveal" style={{ '--d': 4 }} type="button" onClick={onExplore}>
          {ctaLabel} <ArrowDown size={16} strokeWidth={1.5} />
        </button>
      </div>

      {featured.length > 0 && (
        <div className="bx-collage">
          {featured.slice(0, 3).map((brand, index) => (
            <a
              className={`bx-collage-item ${COLLAGE_POSITIONS[index]}`}
              href={brand.href}
              key={brand.slug}
              aria-label={`${brand.name} collection`}
            >
              <span className="bx-collage-float" style={{ '--d': index }}>
                <WatchShowcase image={brand.photo} alt={`${brand.name} watch`} fit={brand.photoFit} size="mini" shape="arch" />
                <span className="bx-collage-name">{brand.name}</span>
              </span>
            </a>
          ))}
        </div>
      )}

      <dl className="bx-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>
              <span aria-hidden="true">{stat.count ? <CountUp value={stat.value} /> : stat.value}</span>
              <span className="sr-only">{stat.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export default BrandsHero;
