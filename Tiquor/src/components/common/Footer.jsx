import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import logo from '../../assets/logo/tiquor-logo-light.svg';
import { SITE } from '../../config/site';
import { FOOTER_COLUMNS, NEWSLETTER } from '../../data/navigation';

function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <img src={logo} alt={SITE.name} />
          <p>{SITE.tagline}</p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
          </div>
        ))}
        <div className="footer-newsletter">
          <h3>{NEWSLETTER.title}</h3>
          <p>{NEWSLETTER.text}</p>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder={NEWSLETTER.placeholder} required />
            <button type="submit" aria-label={subscribed ? 'Subscribed' : 'Subscribe'}>
              {subscribed ? <Check size={17} strokeWidth={1.5} /> : <Mail size={17} strokeWidth={1.5} />}
            </button>
          </form>
          {subscribed && <p className="footer-newsletter-success" role="status">Thank you. You’re on the list.</p>}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
