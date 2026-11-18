import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import logo from '../../assets/logo/tiquor-logo.svg';
import { SITE } from '../../config/site';
import { useShop } from '../../context/ShopContext';
import { MENU_GROUPS as menuGroups, PRIMARY_LINK, SECONDARY_LINK } from '../../data/navigation';
import MegaMenu, { getMenuLinks } from './MegaMenu';

const MEGA_MENU_ID = 'header-mega-menu';
// Hovering a menu title opens it after this delay, so passing over the nav doesn't flicker.
const HOVER_OPEN_DELAY = 140;
// Shorter delay when another menu is already open, so brushing a neighbouring title
// on the way down into the panel doesn't swap the menu.
const HOVER_SWITCH_DELAY = 90;
// A click this soon after a hover-open keeps the menu open instead of toggling it shut.
const HOVER_CLICK_GRACE = 500;

function Header() {
  const { bag } = useShop();
  const [activeMenu, setActiveMenu] = useState(null);
  // The last opened menu stays rendered (hidden) so the panel can animate out.
  const [renderedMenu, setRenderedMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const navRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRefs = useRef({});
  const hoverTimer = useRef(null);
  const hoverOpenedAt = useRef(0);
  const activeMenuRef = useRef(activeMenu);
  activeMenuRef.current = activeMenu;

  const openMenu = useCallback((key) => {
    setActiveMenu(key);
    setRenderedMenu(key);
  }, []);

  const closeMenu = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setActiveMenu(null);
  }, []);

  const closeMenus = useCallback(() => {
    closeMenu();
    setMobileOpen(false);
  }, [closeMenu]);

  // Click on a menu title: toggle. Ignore the click if hover opened this same menu a moment ago.
  const handleTriggerClick = (key) => {
    clearTimeout(hoverTimer.current);
    if (activeMenuRef.current !== key) {
      openMenu(key);
    } else if (Date.now() - hoverOpenedAt.current > HOVER_CLICK_GRACE) {
      closeMenu();
    }
  };

  // Mouse hover on a menu title opens it (or switches to it if another menu is open).
  // Leaving never closes the menu; it only cancels a hover-open that hasn't happened yet.
  const handleTriggerEnter = (key) => (event) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    if (activeMenuRef.current === key) return;
    hoverTimer.current = setTimeout(() => {
      hoverOpenedAt.current = Date.now();
      openMenu(key);
    }, activeMenuRef.current ? HOVER_SWITCH_DELAY : HOVER_OPEN_DELAY);
  };
  const handleTriggerLeave = () => clearTimeout(hoverTimer.current);

  // While a menu is open: close on outside click or Escape.
  useEffect(() => {
    if (!activeMenu) return undefined;

    const handlePointerDown = (event) => {
      if (navRef.current?.contains(event.target) || panelRef.current?.contains(event.target)) return;
      closeMenu();
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      triggerRefs.current[activeMenu]?.focus();
      closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu, closeMenu]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <button className="icon-button mobile-menu-button" type="button" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={21} strokeWidth={1.5} /></button>
          <a className="logo-link" href="/" onClick={closeMenus} aria-label={`${SITE.name} home`}><img src={logo} alt={SITE.name} /></a>
          <nav className="desktop-nav" aria-label="Main navigation" ref={navRef}>
            <a href={PRIMARY_LINK.href} onClick={closeMenus}>{PRIMARY_LINK.label}</a>
            {Object.entries(menuGroups).map(([key, group]) => (
              <button
                className={`nav-menu-button ${activeMenu === key ? 'is-active' : ''}`}
                type="button"
                key={key}
                ref={(node) => { triggerRefs.current[key] = node; }}
                aria-expanded={activeMenu === key}
                aria-controls={MEGA_MENU_ID}
                onClick={() => handleTriggerClick(key)}
                onPointerEnter={handleTriggerEnter(key)}
                onPointerLeave={handleTriggerLeave}
              >
                {group.label}<ChevronDown size={14} strokeWidth={1.5} />
              </button>
            ))}
            <a href={SECONDARY_LINK.href} onClick={closeMenus}>{SECONDARY_LINK.label}</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button" type="button" aria-label="Search"><Search size={19} strokeWidth={1.5} /></button>
            <button className="icon-button optional-action" type="button" aria-label="Account"><UserRound size={19} strokeWidth={1.5} /></button>
            <button className="icon-button optional-action" type="button" aria-label="Wishlist"><Heart size={19} strokeWidth={1.5} /></button>
            <button className="icon-button bag-action" type="button" aria-label={`Shopping bag, ${bag.length} items`}><ShoppingBag size={19} strokeWidth={1.5} /><span>{bag.length}</span></button>
          </div>
        </div>
        {renderedMenu && (
          <MegaMenu
            id={MEGA_MENU_ID}
            menuKey={renderedMenu}
            isOpen={Boolean(activeMenu)}
            panelRef={panelRef}
            onNavigate={closeMenus}
          />
        )}
      </header>
      {mobileOpen && (
        <div className="mobile-drawer-wrap">
          <button className="drawer-overlay" type="button" aria-label="Close menu" onClick={closeMenus} />
          <aside className="mobile-drawer" aria-label="Mobile navigation">
            <div className="drawer-header"><img src={logo} alt={SITE.name} /><button className="icon-button" type="button" aria-label="Close menu" onClick={closeMenus}><X size={22} strokeWidth={1.5} /></button></div>
            <nav className="mobile-nav">
              <a href={PRIMARY_LINK.href} onClick={closeMenus}>{PRIMARY_LINK.label}</a>
              {Object.entries(menuGroups).map(([key, group]) => <div className="mobile-nav-group" key={key}>
                <button type="button" onClick={() => setExpandedMobile(expandedMobile === key ? null : key)} aria-expanded={expandedMobile === key}>{group.label}<ChevronDown className={expandedMobile === key ? 'rotate-icon' : ''} size={17} strokeWidth={1.5} /></button>
                {expandedMobile === key && (
                  <div className="mobile-subnav">
                    {getMenuLinks(key).map((link) => (link.href
                      ? <a href={link.href} onClick={closeMenus} key={link.label}>{link.label}</a>
                      : <span className="is-soon" key={link.label}>{link.label} <small>{link.note}</small></span>))}
                  </div>
                )}
              </div>)}
              <a href={SECONDARY_LINK.href} onClick={closeMenus}>{SECONDARY_LINK.label}</a>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default Header;
