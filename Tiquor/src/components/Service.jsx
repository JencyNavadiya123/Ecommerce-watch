import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Box, Check, Clock, Droplets, FileText, Headset, Magnet, Mail, MapPin,
  Package, Phone, ShieldCheck, Sparkles, Thermometer, Truck, Watch, Wrench, X,
} from 'lucide-react';
import { SERVICE, SITE } from '../config/site';
import { SERVICE_CLOSING, SERVICE_FAQ_HELP, SERVICE_PAGES } from '../data/service';
import { products } from '../data/products';
import { useHash } from '../hooks/useHash';
import { parseHash } from '../utils/hash';
import { formatPrice } from '../utils/price';

// Icon names used in data/service.js.
const ICONS = {
  badge: BadgeCheck,
  box: Box,
  droplets: Droplets,
  file: FileText,
  headset: Headset,
  magnet: Magnet,
  mail: Mail,
  mapPin: MapPin,
  package: Package,
  shield: ShieldCheck,
  sparkles: Sparkles,
  thermometer: Thermometer,
  truck: Truck,
  watch: Watch,
  wrench: Wrench,
};
const iconFor = (name) => ICONS[name] || Sparkles;
// The catalogue is listed newest first, so these are the latest arrivals.
const newestWatches = products.slice(0, SERVICE_CLOSING.watchCount);
const twoDigits = (number) => String(number).padStart(2, '0');

function SectionHead({ section, id }) {
  return (
    <header className="sv-head">
      <div>
        <p className="eyebrow">{section.eyebrow}</p>
        <h2 id={id}>{section.title}</h2>
      </div>
      {section.intro && <p>{section.intro}</p>}
    </header>
  );
}

// A journey: icon medallions joined by a gold track, with a card under each stop. The steps
// rise and the track draws itself in, once, when the section scrolls into view.
function Steps({ items }) {
  const listRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = listRef.current;
    if (!element || !('IntersectionObserver' in window)) { setVisible(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <ol className={`sv-steps ${visible ? 'is-visible' : ''}`} ref={listRef}>
      {items.map((item, index) => {
        const Icon = iconFor(item.icon);
        return (
          <li className="sv-step" style={{ '--i': index }} key={item.title}>
            <div className="sv-step-rail" aria-hidden="true">
              <span className="sv-step-node"><Icon size={26} strokeWidth={1.3} /></span>
            </div>
            <div className="sv-step-card">
              <span className="sv-step-index" aria-hidden="true">{twoDigits(index + 1)}</span>
              <p className="sv-step-label">Step {index + 1} of {items.length}</p>
              <h3>{item.title}</h3>
              <p className="sv-step-text">{item.text}</p>
              {item.tag && <span className="sv-step-tag"><Clock size={13} strokeWidth={2} aria-hidden="true" /> {item.tag}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Cards({ items }) {
  return (
    // One navy panel split into cells. Three columns when the count divides by three, otherwise
    // four, so the last row is always full.
    <div className="sv-cards" style={{ '--cols': items.length % 3 === 0 ? 3 : 4 }}>
      {items.map((item, index) => {
        const Icon = iconFor(item.icon);
        return (
          <article className="sv-card" key={item.title}>
            <Icon className="sv-card-ghost" size={150} strokeWidth={0.8} aria-hidden="true" />
            <div className="sv-card-top">
              <span className="sv-icon"><Icon size={23} strokeWidth={1.3} /></span>
              <span className="sv-card-index" aria-hidden="true">{twoDigits(index + 1)} / {twoDigits(items.length)}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}

function Compare({ columns }) {
  return (
    // One framed panel in two halves, joined by a jewel on the centre line.
    <div className="sv-compare">
      <span className="sv-compare-jewel" aria-hidden="true">✦</span>
      {columns.map((column) => {
        const Mark = column.tone === 'no' ? X : Check;
        return (
          <div className={`sv-compare-col is-${column.tone}`} key={column.title}>
            <Mark className="sv-compare-ghost" size={230} strokeWidth={0.7} aria-hidden="true" />
            <div className="sv-compare-head">
              <span className="sv-compare-badge" aria-hidden="true"><Mark size={24} strokeWidth={1.8} /></span>
              <div>
                <p className="sv-compare-count">{twoDigits(column.items.length)} points</p>
                <h3>{column.title}</h3>
              </div>
            </div>
            <ul>
              {column.items.map((item) => (
                <li key={item}><span className="sv-mark" aria-hidden="true"><Mark size={13} strokeWidth={2.4} /></span>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Table({ head, rows, caption }) {
  return (
    <div className="sv-table-wrap">
      <table className="sv-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>{head.map((cell) => <th scope="col" key={cell}>{cell}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest]) => (
            <tr key={first}>
              <th scope="row">{first}</th>
              {rest.map((cell, index) => <td data-label={head[index + 1]} key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Questions as an index on the left; the chosen answer fills a navy card on the right.
// On small screens the card is hidden and the answer opens under its question instead.
function Faq({ items, help }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="sv-faq">
      <ul className="sv-faq-list">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li className={isActive ? 'is-active' : ''} key={item.q}>
              <button type="button" aria-expanded={isActive} onClick={() => setActive(index)}>
                <span className="sv-faq-index" aria-hidden="true">{twoDigits(index + 1)}</span>
                <span className="sv-faq-question">{item.q}</span>
                <ArrowRight className="sv-faq-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
              {isActive && <p className="sv-faq-inline">{item.a}</p>}
            </li>
          );
        })}
      </ul>

      <div className="sv-faq-answer" aria-live="polite">
        <span className="sv-faq-numeral" aria-hidden="true">{twoDigits(active + 1)}</span>
        {/* The key replays the fade each time a new question is chosen. */}
        <div className="sv-faq-answer-body" key={current.q}>
          <p className="sv-faq-count">Answer {active + 1} of {items.length}</p>
          <h3>{current.q}</h3>
          <p>{current.a}</p>
        </div>
        {help && (
          <a className="sv-faq-help" href={help.href}>
            {help.label} <ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
        )}
      </div>
    </div>
  );
}

const EMPTY_FORM = { name: '', email: '', order: '', topic: '', message: '' };

// There is no server behind the form: it opens the shopper's email app with the message written out.
function Contact({ section }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, topic: section.topics[0] });
  const setField = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = [
      form.message,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      ...(form.order ? [`Order number: ${form.order}`] : []),
    ].join('\n');
    const query = `subject=${encodeURIComponent(`${form.topic} · ${SITE.name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = `mailto:${SERVICE.email}?${query}`;
  };

  const channels = [
    { icon: Mail, label: 'Email', value: SERVICE.email, href: `mailto:${SERVICE.email}`, note: `We reply ${SERVICE.replyTime}.` },
    { icon: Phone, label: 'Call', value: SERVICE.phone, href: `tel:${SERVICE.phone.replace(/[^+\d]/g, '')}`, note: 'For anything urgent about an order.' },
    { icon: Clock, label: 'Hours', value: `${SERVICE.openDays}, ${SERVICE.openHours}`, note: `${SERVICE.timeZone}. Closed on public holidays.` },
  ];

  return (
    <div className="sv-contact">
      <aside className="sv-concierge" aria-label={section.cardEyebrow}>
        <p className="eyebrow">{section.cardEyebrow}</p>
        <h3>{section.cardTitleLead} <em>{section.cardTitleAccent}</em></h3>
        <ul className="sv-channels">
        {channels.map(({ icon: Icon, label, value, href, note }) => (
          <li key={label}>
            <span className="sv-icon"><Icon size={20} strokeWidth={1.4} /></span>
            <div>
              <p className="sv-channel-label">{label}</p>
              {href
                ? <a className="sv-channel-value" href={href}>{value} <ArrowUpRight size={15} strokeWidth={1.5} /></a>
                : <p className="sv-channel-value">{value}</p>}
              <p className="sv-channel-note">{note}</p>
            </div>
          </li>
        ))}
        </ul>
        <p className="sv-concierge-note"><ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" /> {section.cardNote}</p>
      </aside>

      <form className="sv-form" onSubmit={handleSubmit}>
        <h3>{section.formTitle}</h3>
        <p>{section.formIntro}</p>

        <fieldset className="sv-topics">
          <legend className="sv-field-label">What is it about?</legend>
          <div className="sv-topic-list">
            {section.topics.map((topic) => (
              <label className="sv-topic" key={topic}>
                <input type="radio" name="topic" value={topic} checked={form.topic === topic} onChange={setField('topic')} />
                <span>{form.topic === topic && <Check size={14} strokeWidth={2.2} aria-hidden="true" />}{topic}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sv-form-grid">
          <label>
            <span>Your name</span>
            <input type="text" autoComplete="name" placeholder="Full name" value={form.name} onChange={setField('name')} required />
          </label>
          <label>
            <span>Email address</span>
            <input type="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={setField('email')} required />
          </label>
          <label className="is-wide">
            <span>Order number <em>(optional)</em></span>
            <input type="text" placeholder="If your message is about an order" value={form.order} onChange={setField('order')} />
          </label>
          <label className="is-wide">
            <span>Your message</span>
            <textarea rows={5} placeholder="Tell us how we can help" value={form.message} onChange={setField('message')} required />
          </label>
        </div>

        <div className="sv-form-foot">
          <button className="gold-button" type="submit">{section.submitLabel} <span>→</span></button>
          <p>{section.submitNote}</p>
        </div>
      </form>
    </div>
  );
}

function SectionBody({ section, help }) {
  switch (section.type) {
    case 'steps': return <Steps items={section.items} />;
    case 'cards': return <Cards items={section.items} />;
    case 'compare': return <Compare columns={section.columns} />;
    case 'table': return <Table head={section.head} rows={section.rows} caption={section.title} />;
    case 'faq': return <Faq items={section.items} help={help} />;
    case 'contact': return <Contact section={section} />;
    default: return null;
  }
}

/**
 * Shipping & returns, Care guide, Warranty and Contact us. One layout; the hash picks
 * which page of data/service.js to show.
 */
function Service() {
  const { hash } = useHash();
  const page = SERVICE_PAGES.find((item) => item.path === parseHash(hash).path) || SERVICE_PAGES[0];
  const HeroIcon = iconFor(page.icon);
  const closingLinks = [SERVICE_CLOSING.primaryCta, SERVICE_CLOSING.secondaryCta].filter((link) => link.href !== page.path);

  // "Still need help?" under each answer; left out on the contact page itself.
  const faqHelp = SERVICE_FAQ_HELP.href === page.path ? null : SERVICE_FAQ_HELP;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page.path]);

  return (
    // The key restarts the entrance animation and resets open questions when the page changes.
    <div className="sv-page" key={page.path}>
      <section className="bh sv-hero" aria-labelledby="sv-title">
        <span className="bh-watermark" aria-hidden="true">{page.watermark}</span>
        <div className="bh-inner">
          <div className="bh-copy">
            <p className="eyebrow bh-reveal" style={{ '--d': 1 }}>{page.eyebrow}</p>
            <h1 id="sv-title" className="bh-reveal" style={{ '--d': 2 }}>
              {page.titleLead} <em>{page.titleAccent}</em>
            </h1>
            <p className="bh-tagline bh-reveal" style={{ '--d': 3 }}>{page.intro}</p>
            <dl className="bh-facts bh-reveal" style={{ '--d': 4 }}>
              {page.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="sv-medallion bh-reveal" style={{ '--d': 3 }} aria-hidden="true">
            <span className="sv-medallion-ring" />
            <span className="sv-medallion-core"><HeroIcon size={64} strokeWidth={1} /></span>
          </div>
        </div>
      </section>

      <nav className="sv-tabs" aria-label="Service pages">
        {SERVICE_PAGES.map((item) => {
          const Icon = iconFor(item.icon);
          const isCurrent = item.path === page.path;
          return (
            <a className={isCurrent ? 'is-active' : ''} href={item.path} aria-current={isCurrent ? 'page' : undefined} key={item.path}>
              <Icon size={17} strokeWidth={1.5} /> {item.label}
            </a>
          );
        })}
      </nav>

      {page.sections.map((section, index) => {
        const id = `sv-section-${index}`;
        return (
          <section className={`sv-section is-${section.type}`} aria-labelledby={id} key={section.title}>
            <div className="sv-section-inner">
              <SectionHead section={section} id={id} />
              <SectionBody section={section} help={faqHelp} />
            </div>
          </section>
        );
      })}

      {/* Invitation: copy on the left, the newest watches in arched windows on the right. */}
      <section className="sv-finale" aria-labelledby="sv-finale-title">
        <div className="sv-finale-panel">
          <div className="sv-finale-copy">
            <p className="eyebrow">{SERVICE_CLOSING.eyebrow}</p>
            <h2 id="sv-finale-title">{SERVICE_CLOSING.titleLead} <em>{SERVICE_CLOSING.titleAccent}</em></h2>
            <p className="sv-finale-intro">{SERVICE_CLOSING.intro}</p>
            <div className="sv-finale-actions">
              {closingLinks.map((link, index) => (
                index === 0
                  ? <a className="gold-button" href={link.href} key={link.href}>{link.label} <span>→</span></a>
                  : <a className="sv-text-link" href={link.href} key={link.href}>{link.label} <ArrowUpRight size={15} strokeWidth={1.5} /></a>
              ))}
            </div>
            <ul className="sv-finale-assurances">
              {SERVICE_CLOSING.assurances.map((item) => {
                const Icon = iconFor(item.icon);
                return <li key={item.label}><Icon size={16} strokeWidth={1.6} aria-hidden="true" /> {item.label}</li>;
              })}
            </ul>
          </div>

          <div className="sv-finale-watches">
            {newestWatches.map((product, index) => (
              <a className="sv-finale-watch" href={SERVICE_CLOSING.primaryCta.href} key={product.id}>
                <span className={`sv-finale-frame ${product.fit === 'cover' ? 'is-cover' : ''}`}>
                  <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" />
                  {index === 1 && <span className="sv-finale-new">{SERVICE_CLOSING.newLabel}</span>}
                </span>
                <span>
                  <span className="sv-finale-brand">{product.brand}</span>
                  <span className="sv-finale-name">{product.name}</span>
                  <span className="sv-finale-price">{formatPrice(product.price)}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
