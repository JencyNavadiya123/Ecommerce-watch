import { ArrowUpRight, Instagram, Mail } from 'lucide-react';
import logo from '../../assets/logo/tiquor-logo-light.svg';
import { SITE } from '../../config/site';
import { FOOTER_COLUMNS, NEWSLETTER, SOCIAL_LINK } from '../../data/navigation';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <img src={logo} alt={SITE.name} />
          <p>{SITE.tagline}</p>
          <a className="footer-social" href={SOCIAL_LINK.href}>
            <Instagram size={16} strokeWidth={1.5} /> {SOCIAL_LINK.label} <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
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
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder={NEWSLETTER.placeholder} required />
            <button type="submit" aria-label="Subscribe"><Mail size={17} strokeWidth={1.5} /></button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Crafted with intention · Secure checkout</span>
      </div>
    </footer>
  );
}

export default Footer;
