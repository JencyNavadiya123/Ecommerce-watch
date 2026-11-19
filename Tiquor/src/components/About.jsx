import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { SITE } from '../config/site';
import { brandDirectory, stockedBrands } from '../data/brands';
import { ABOUT_CONTENT as text } from '../data/content';
import { products } from '../data/products';
import { brandLink } from '../utils/hash';
import Hallmarks from './about/Hallmarks';
import HeritageDial from './about/HeritageDial';
import LiveDial from './about/LiveDial';
import StoryClosing from './about/StoryClosing';
import ProductShowcase from './showcase/ProductShowcase';

// Everything below is counted from the catalogue, so the page stays true as it grows.
const timeline = brandDirectory
  .filter((brand) => brand.available && brand.founded)
  .sort((a, b) => a.founded - b.founded);
const oldestFounding = timeline[0]?.founded;
const yearsOfHeritage = oldestFounding ? Math.floor((SITE.collectionYear - oldestFounding) / 10) * 10 : 0;
const countries = new Set(stockedBrands.map((brand) => brand.origin).filter(Boolean));
// `count`: animate up from zero (a year stays as it is).
const stats = [
  { label: 'Houses', value: stockedBrands.length, count: true },
  { label: 'Watches', value: products.length, count: true },
  { label: 'Countries', value: countries.size, count: true },
  ...(oldestFounding ? [{ label: 'Heritage since', value: oldestFounding, count: false }] : []),
];
const chapterProduct = (name) => products.find((product) => product.name === name);

function About() {
  const promiseRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="story-page">
      {/* Opening: the shopper's own time, on our dial. */}
      <section className="bh story-hero" aria-labelledby="story-title">
        <span className="bh-watermark" aria-hidden="true">Story</span>
        <div className="bh-inner">
          <div className="bh-copy">
            <p className="eyebrow bh-reveal" style={{ '--d': 1 }}>{text.hero.eyebrow}</p>
            <h1 id="story-title" className="bh-reveal" style={{ '--d': 2 }}>
              {text.hero.titleLead} <em>{text.hero.titleAccent}</em>
            </h1>
            <p className="bh-tagline bh-reveal" style={{ '--d': 3 }}>{text.hero.intro}</p>
            <div className="story-actions bh-reveal" style={{ '--d': 4 }}>
              <a className="gold-button" href={brandLink()}>{text.hero.primaryCta} <span>→</span></a>
              <button
                className="story-text-link"
                type="button"
                onClick={() => promiseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                {text.hero.secondaryCta} <ArrowDown size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="story-hero-visual bh-reveal" style={{ '--d': 3 }}>
            <LiveDial caption={text.hero.dialCaption} />
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="story-manifesto" aria-label="Our belief">
        <span className="story-ornament" aria-hidden="true">✦</span>
        <blockquote>
          <p>{text.manifesto.quote}</p>
          <footer>{text.manifesto.signature}</footer>
        </blockquote>
      </section>

      {/* Three chapters, alternating sides */}
      <section className="story-chapters" ref={promiseRef} aria-label="How we work">
        {text.chapters.map((chapter, index) => {
          const product = chapterProduct(chapter.product);
          return (
            <article className={`story-chapter ${index % 2 ? 'is-reversed' : ''}`} key={chapter.numeral}>
              <div className="story-chapter-copy">
                <span className="story-numeral" aria-hidden="true">{chapter.numeral}</span>
                <p className="eyebrow">{chapter.eyebrow}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.text}</p>
              </div>
              {product && (
                <div className="story-chapter-visual">
                  <ProductShowcase product={product} size="feature" shape="arch" showPrice={false} />
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* Our houses as hour markers on a dial, oldest at twelve o'clock */}
      <HeritageDial
        brands={timeline}
        eyebrow={text.timeline.eyebrow}
        title={text.timeline.title(yearsOfHeritage)}
        intro={text.timeline.intro}
        visitLabel={text.timeline.visitLabel}
      />

      {/* Promises as four hallmarks, then the store in numbers as sub-dials */}
      <Hallmarks
        eyebrow={text.promises.eyebrow}
        title={text.promises.title}
        intro={text.promises.intro}
        items={text.promises.items}
        stats={stats}
      />

      {/* Invitation: the newest watches and a few moments to start from */}
      <StoryClosing content={text.closing} />
    </div>
  );
}

export default About;
