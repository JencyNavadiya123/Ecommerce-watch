import { useEffect, useState } from 'react';
import NewArrival from '../components/NewArrival';
import heroWatch from '../assets/hero/royal-watch.svg';

function HomePage() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">The Royal Collection · 2026</p>
        <h1 id="hero-title">A legacy<br /><em>on your wrist.</em></h1>
        <p className="hero-description">
          Precision timepieces shaped by heritage, crafted for the moments that become history.
        </p>
        <a className="gold-button" href="#collection">Explore the collection <span>→</span></a>
      </div>
      <div className="hero-watch">
        <img className="hero-watch-vector" src={heroWatch} alt="WOW WATCHES royal navy and gold luxury watch" />
      </div>
    </section>
  );
}

function Route() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (hash === '#home') {
    return <HomePage />;
  }

  return <NewArrival />;
}

export default Route;
