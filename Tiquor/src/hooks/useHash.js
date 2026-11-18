import { useEffect, useState } from 'react';

// Current location hash. Returns a new object on every hashchange, so effects
// re-run even when the same link is clicked again.
export function useHash() {
  const [location, setLocation] = useState(() => ({ hash: window.location.hash, at: 0 }));

  useEffect(() => {
    const handleHashChange = () => setLocation({ hash: window.location.hash, at: Date.now() });
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return location;
}
