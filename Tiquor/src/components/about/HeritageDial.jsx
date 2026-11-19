import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import BrandMark from '../brand/BrandMark';

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
// Reduced motion still loops, just more slowly (and CSS drops the swinging hand).
const AUTO_ADVANCE_MS = 3200;
const REDUCED_ADVANCE_MS = 6000;

/**
 * Our houses as hour markers on a watch face, oldest at twelve o'clock, running clockwise.
 * The gold hand loops from house to house on its own, forever. Pointing at the dial with a
 * mouse, or moving keyboard focus into it, holds the hand on the chosen house; leaving lets
 * the loop carry on from there.
 */
function HeritageDial({ brands, eyebrow, title, intro, visitLabel }) {
  const count = brands.length;
  const step = count ? 360 / count : 0;
  // `angle` only ever grows, so the hand always turns clockwise, like a real watch:
  // from the last house it carries on forward to twelve o'clock, never spins backwards.
  const [hand, setHand] = useState({ active: 0, angle: 0 });
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const holding = hovering || focused;

  // Clockwise distance from where the hand is now to the chosen house (0–359°).
  const moveTo = (index) => setHand(({ angle }) => {
    const forward = (((index * step - angle) % 360) + 360) % 360;
    return { active: index, angle: angle + forward };
  });

  useEffect(() => {
    if (holding || count < 2) return undefined;
    const timer = setInterval(() => {
      setHand(({ active, angle }) => ({ active: (active + 1) % count, angle: angle + step }));
    }, prefersReducedMotion() ? REDUCED_ADVANCE_MS : AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [holding, count, step]);

  if (!count) return null;

  const { active, angle } = hand;
  const current = brands[active];
  // Only a real mouse pauses on hover; a tap on a phone shouldn't leave the loop stuck.
  const isMouse = (event) => event.pointerType === 'mouse';

  return (
    <section className="story-heritage" aria-labelledby="story-heritage-title">
      <div className="story-heritage-inner">
        <div className="story-heritage-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="story-heritage-title">{title}</h2>
          <p className="story-heritage-intro">{intro}</p>

          {/* The house the hand points at. Announced only when the shopper picks it, not on every auto step. */}
          <div className="story-heritage-detail" aria-live={holding ? 'polite' : 'off'} key={current.slug}>
            <span className="story-heritage-year">{current.founded}</span>
            <h3>{current.name}</h3>
            {current.tagline && <p>{current.tagline}</p>}
            <a className="story-text-link" href={current.href}>
              {visitLabel(current.name)} <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div
          className="heritage-dial"
          style={{ '--hand': `${angle}deg` }}
          onPointerEnter={(event) => isMouse(event) && setHovering(true)}
          onPointerLeave={(event) => isMouse(event) && setHovering(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setFocused(false)}
        >
          <span className="heritage-dial-ring" aria-hidden="true" />
          <span className="heritage-dial-hand" aria-hidden="true" />

          <div className="heritage-dial-centre" aria-hidden="true">
            <span className="heritage-dial-centre-year">{current.founded}</span>
            <span className="heritage-dial-centre-name">{current.name}</span>
            <span className="heritage-dial-centre-origin">{current.origin}</span>
          </div>

          <ol className="heritage-dial-markers">
            {brands.map((brand, index) => (
              <li key={brand.slug} style={{ '--a': `${index * step}deg` }}>
                <a
                  className={`heritage-marker ${index === active ? 'is-active' : ''}`}
                  href={brand.href}
                  aria-label={`${brand.name}, founded ${brand.founded} in ${brand.origin}`}
                  onPointerEnter={(event) => isMouse(event) && moveTo(index)}
                  onFocus={() => moveTo(index)}
                >
                  <BrandMark brand={brand} size="sm" />
                  <span className="heritage-marker-year">{brand.founded}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default HeritageDial;
