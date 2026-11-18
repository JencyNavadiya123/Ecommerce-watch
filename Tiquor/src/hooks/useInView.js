import { useEffect, useState } from 'react';

// True while the element is on (or near) the screen. Used to pause decorative
// animations for watches the shopper has scrolled past.
export function useInView(ref, rootMargin = '150px') {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
