import heroWatch from '../assets/hero/royal-watch.svg';
import { HOME_CONTENT } from '../data/content';

function Home() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">{HOME_CONTENT.eyebrow}</p>
        <h1 id="hero-title">{HOME_CONTENT.titleLead}<br /><em>{HOME_CONTENT.titleAccent}</em></h1>
        <p className="hero-description">{HOME_CONTENT.description}</p>
        <a className="gold-button" href={HOME_CONTENT.cta.href}>{HOME_CONTENT.cta.label} <span>→</span></a>
      </div>
      <div className="hero-watch">
        <img className="hero-watch-vector" src={heroWatch} alt={HOME_CONTENT.heroImageAlt} />
      </div>
    </section>
  );
}

export default Home;
