import { useEffect, useRef, useState } from 'react';
import { Gem, ShieldCheck, Tag, Truck } from 'lucide-react';

const ICONS = { gem: Gem, tag: Tag, truck: Truck, shield: ShieldCheck };
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Counts up once the first time `run` turns true; shows the value at once for reduced motion.
function useCountUp(value, run, duration = 1600) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
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
  }, [value, run, duration]);

  return shown;
}

function SubDial({ label, value, count, run }) {
  const counted = useCountUp(value, run && count);
  return (
    <figure className="subdial">
      <div className="subdial-face">
        <strong aria-hidden="true">{count ? counted : value}</strong>
        <span className="sr-only">{value}</span>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/**
 * Our promises as four "hallmarks" in the quarters of a dial (gold hairlines crossing at a
 * centre jewel), followed by the store in numbers as chronograph sub-dials that count up
 * when they scroll into view.
 * stats: [{ label, value, count: boolean }]
 */
function Hallmarks({ eyebrow, title, intro, items, stats }) {
  const dialsRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = dialsRef.current;
    if (!element || !('IntersectionObserver' in window)) { setInView(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="story-hallmarks" aria-labelledby="story-hallmarks-title">
      <div className="story-hallmarks-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="story-hallmarks-title">{title}</h2>
        </div>
        <p>{intro}</p>
      </div>

      <div className="hallmark-grid">
        <span className="hallmark-jewel" aria-hidden="true">✦</span>
        {items.map((item, index) => {
          const Icon = ICONS[item.icon] || Gem;
          return (
            <article className="hallmark" key={item.title}>
              <span className="hallmark-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="hallmark-body">
                <span className="hallmark-icon"><Icon size={20} strokeWidth={1.4} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="subdials" ref={dialsRef}>
        {stats.map((stat) => <SubDial key={stat.label} {...stat} run={inView} />)}
      </div>
    </section>
  );
}

export default Hallmarks;
