import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import BrandMark from './BrandMark';

const SPEED = 42; // pixels per second
const TOUCH_RESUME_DELAY = 1500; // ms after a swipe before auto-scroll resumes

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/**
 * Endless, auto-scrolling row of brand logo cards.
 *
 * The brand list is rendered several times side by side. The row scrolls by itself;
 * whenever the scroll position passes one full set, it is shifted back by exactly one
 * set width, which is invisible, so the loop never ends or shows a gap. Because it is a
 * real scroll container, trackpad scrolling, mouse dragging and touch swipes all work
 * and wrap the same way. Only the first copy is exposed to keyboard and screen readers.
 */
function BrandMarquee({ brands, title, allHref, allLabel = 'All brands' }) {
  const viewportRef = useRef(null);
  const setRef = useRef(null);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [copies, setCopies] = useState(reducedMotion ? 1 : 3);
  const [dragging, setDragging] = useState(false);
  const inView = useInView(viewportRef);
  const motion = useRef({ pos: 0, setWidth: 0, hovered: false, focused: false, touching: false, drag: null, dragged: false, resumeTimer: null });

  const isPaused = () => {
    const m = motion.current;
    return m.hovered || m.focused || m.touching || Boolean(m.drag);
  };

  // Keep the position inside the middle copy, shifting by exactly one set when it leaves.
  const keepInRange = () => {
    const viewport = viewportRef.current;
    const m = motion.current;
    if (!viewport || !m.setWidth) return;
    let shift = 0;
    if (m.pos >= m.setWidth * 2) shift = -m.setWidth;
    else if (m.pos < m.setWidth) shift = m.setWidth;
    if (!shift) return;
    m.pos += shift;
    if (m.drag) m.drag.startScroll += shift;
    viewport.scrollLeft = m.pos;
  };

  // Measure one set and render enough copies to always fill the row.
  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return undefined;

    const measure = () => {
      const m = motion.current;
      const setWidth = set.offsetWidth;
      if (!setWidth) return;
      const firstMeasure = !m.setWidth;
      m.setWidth = setWidth;
      setCopies(Math.max(3, Math.ceil(viewport.clientWidth / setWidth) + 2));
      if (firstMeasure) m.pos = setWidth;
      keepInRange();
      viewport.scrollLeft = m.pos;
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(set);
    measure();
    return () => observer.disconnect();
  }, [reducedMotion, brands]);

  // Auto-scroll loop: runs only while visible, the tab is active and nobody is interacting.
  useEffect(() => {
    if (reducedMotion || !inView) return undefined;
    const viewport = viewportRef.current;
    let frame;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!isPaused() && !document.hidden && motion.current.setWidth) {
        motion.current.pos += SPEED * dt;
        keepInRange();
        viewport.scrollLeft = motion.current.pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, inView]);

  useEffect(() => () => clearTimeout(motion.current.resumeTimer), []);

  // Manual scrolling (trackpad, swipe, drag): follow it and wrap seamlessly.
  const handleScroll = () => {
    if (reducedMotion || !isPaused()) return;
    motion.current.pos = viewportRef.current.scrollLeft;
    keepInRange();
  };

  // Mouse: hover pauses; press-and-drag scrolls.
  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse') motion.current.hovered = true;
  };
  const handlePointerLeave = (event) => {
    if (event.pointerType === 'mouse') motion.current.hovered = false;
  };
  const handlePointerDown = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse' || event.button !== 0) return;
    motion.current.drag = { startX: event.clientX, startScroll: viewportRef.current.scrollLeft };
    motion.current.dragged = false;

    const onMove = (moveEvent) => {
      const m = motion.current;
      if (!m.drag) return;
      const dx = moveEvent.clientX - m.drag.startX;
      if (Math.abs(dx) > 4 && !m.dragged) {
        m.dragged = true;
        setDragging(true);
      }
      if (m.dragged) {
        m.pos = m.drag.startScroll - dx;
        viewportRef.current.scrollLeft = m.pos;
        keepInRange();
      }
    };
    const onUp = () => {
      motion.current.drag = null;
      setDragging(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // A drag should not also count as a click on the card under the pointer.
  const handleClickCapture = (event) => {
    if (motion.current.dragged) {
      event.preventDefault();
      event.stopPropagation();
      motion.current.dragged = false;
    }
  };

  // Touch: pause while the finger is down, resume shortly after the swipe settles.
  const handleTouchStart = () => {
    clearTimeout(motion.current.resumeTimer);
    motion.current.touching = true;
  };
  const handleTouchEnd = () => {
    clearTimeout(motion.current.resumeTimer);
    motion.current.resumeTimer = setTimeout(() => {
      motion.current.pos = viewportRef.current?.scrollLeft ?? motion.current.pos;
      motion.current.touching = false;
    }, TOUCH_RESUME_DELAY);
  };

  if (!brands.length) return null;

  return (
    <nav className={`bm ${reducedMotion ? 'is-static' : ''}`} aria-label={title}>
      <div className="bm-head">
        <h2>{title}</h2>
        {allHref && <a className="brand-link" href={allHref}>{allLabel} <ArrowUpRight size={15} strokeWidth={1.5} /></a>}
      </div>
      <div
        ref={viewportRef}
        className={`bm-viewport ${dragging ? 'is-dragging' : ''}`}
        onScroll={handleScroll}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onClickCapture={handleClickCapture}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onFocus={() => { motion.current.focused = true; }}
        onBlur={() => { motion.current.focused = false; }}
      >
        <div className="bm-track">
          {Array.from({ length: copies }, (_, copy) => (
            <div className="bm-set" ref={copy === 0 ? setRef : undefined} aria-hidden={copy > 0 || undefined} key={copy}>
              {brands.map((brand) => (
                <a
                  className="bm-item"
                  href={brand.href}
                  key={brand.slug}
                  tabIndex={copy > 0 ? -1 : undefined}
                  draggable={false}
                >
                  <BrandMark brand={brand} />
                  <span>{brand.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default BrandMarquee;
