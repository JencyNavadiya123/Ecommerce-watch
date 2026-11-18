import { useState } from 'react';
import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import logo from '../../assets/logo/tiquor-logo.svg';

const menuGroups = {
  brands: { label: 'Brands', columns: [{ title: 'Featured houses', links: ['Tiquor Signature', 'The Royal Edit', 'Independent makers'] }, { title: 'Discover', links: ['New arrivals', 'Best sellers', 'Limited editions'] }] },
  men: { label: 'Men', columns: [{ title: 'Shop by style', links: ['Dress watches', 'Chronographs', 'Automatic watches'] }, { title: 'Shop by collection', links: ['Regent', 'Sovereign', 'Heritage'] }] },
  women: { label: 'Women', columns: [{ title: 'Shop by style', links: ['Classic watches', 'Jewellery watches', 'Minimal watches'] }, { title: 'Shop by collection', links: ['Crown', 'Élan', 'Belle Époque'] }] },
};

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const closeMenus = () => { setActiveMenu(null); setMobileOpen(false); };
  const linkId = (link) => `#${link.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <button className="icon-button mobile-menu-button" type="button" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={21} strokeWidth={1.5} /></button>
          <a className="logo-link" href="/" onClick={closeMenus} aria-label="WOW WATCHES home"><img src={logo} alt="WOW WATCHES" /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#new">New arrivals</a>
            {Object.entries(menuGroups).map(([key, group]) => (
              <button className={`nav-menu-button ${activeMenu === key ? 'is-active' : ''}`} type="button" key={key} aria-expanded={activeMenu === key} onClick={() => setActiveMenu(activeMenu === key ? null : key)}>
                {group.label}<ChevronDown size={14} strokeWidth={1.5} />
              </button>
            ))}
            <a href="#about">Our story</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button" type="button" aria-label="Search"><Search size={19} strokeWidth={1.5} /></button>
            <button className="icon-button optional-action" type="button" aria-label="Account"><UserRound size={19} strokeWidth={1.5} /></button>
            <button className="icon-button optional-action" type="button" aria-label="Wishlist"><Heart size={19} strokeWidth={1.5} /></button>
            <button className="icon-button bag-action" type="button" aria-label="Shopping bag, 0 items"><ShoppingBag size={19} strokeWidth={1.5} /><span>0</span></button>
          </div>
        </div>
        {activeMenu && (
          <div className="mega-menu" role="region" aria-label={`${menuGroups[activeMenu].label} menu`}>
            <div className="mega-menu-inner">
              <div className="mega-menu-content">
                <p className="eyebrow">Curated for you</p><h2>{menuGroups[activeMenu].label}</h2>
                <div className="mega-columns">
                  {menuGroups[activeMenu].columns.map((column) => <div className="mega-column" key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <a href={linkId(link)} key={link} onClick={closeMenus}>{link}</a>)}</div>)}
                </div>
              </div>
              <a className="mega-promo" href="#collection" onClick={closeMenus}><span>THE ROYAL EDIT</span><strong>Time, refined.</strong><small>Discover the signature collection →</small></a>
            </div>
          </div>
        )}
      </header>
      {mobileOpen && (
        <div className="mobile-drawer-wrap">
          <button className="drawer-overlay" type="button" aria-label="Close menu" onClick={closeMenus} />
          <aside className="mobile-drawer" aria-label="Mobile navigation">
            <div className="drawer-header"><img src={logo} alt="WOW WATCHES" /><button className="icon-button" type="button" aria-label="Close menu" onClick={closeMenus}><X size={22} strokeWidth={1.5} /></button></div>
            <nav className="mobile-nav">
              <a href="#new" onClick={closeMenus}>New arrivals</a>
              {Object.entries(menuGroups).map(([key, group]) => <div className="mobile-nav-group" key={key}>
                <button type="button" onClick={() => setExpandedMobile(expandedMobile === key ? null : key)} aria-expanded={expandedMobile === key}>{group.label}<ChevronDown className={expandedMobile === key ? 'rotate-icon' : ''} size={17} strokeWidth={1.5} /></button>
                {expandedMobile === key && <div className="mobile-subnav">{group.columns.flatMap((column) => column.links).map((link) => <a href={linkId(link)} onClick={closeMenus} key={link}>{link}</a>)}</div>}
              </div>)}
              <a href="#about" onClick={closeMenus}>Our story</a>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default Header;
