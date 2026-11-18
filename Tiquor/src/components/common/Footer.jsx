import { ArrowUpRight, Instagram, Mail } from 'lucide-react';
import logo from '../../assets/logo/tiquor-logo-light.svg';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block"><img src={logo} alt="WOW WATCHES" /><p>Timepieces made for the moments<br />that become history.</p><a className="footer-social" href="#instagram"><Instagram size={16} strokeWidth={1.5} /> Instagram <ArrowUpRight size={14} strokeWidth={1.5} /></a></div>
        <div className="footer-column"><h3>Explore</h3><a href="#new">New arrivals</a><a href="#men">For him</a><a href="#women">For her</a><a href="#collection">All watches</a></div>
        <div className="footer-column"><h3>Service</h3><a href="#shipping">Shipping & returns</a><a href="#care">Care guide</a><a href="#warranty">Warranty</a><a href="#contact">Contact us</a></div>
        <div className="footer-newsletter"><h3>Join the inner circle</h3><p>Sign up for private previews and considered offers.</p><form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe"><Mail size={17} strokeWidth={1.5} /></button></form></div>
      </div>
      <div className="footer-bottom"><span>© 2026 WOW WATCHES</span><span>Crafted with intention · Secure checkout</span></div>
    </footer>
  );
}

export default Footer;
