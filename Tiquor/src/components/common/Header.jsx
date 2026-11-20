import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import logo from '../../assets/logo/tiquor-logo.svg';
import { SITE } from '../../config/site';
import { useShop } from '../../context/ShopContext';
import { MENU_GROUPS as menuGroups, PRIMARY_LINK, SECONDARY_LINK } from '../../data/navigation';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/price';
import MegaMenu, { getMenuLinks } from './MegaMenu';
import QuickView from '../product/QuickView';

const MEGA_MENU_ID = 'header-mega-menu';
// Hovering a menu title opens it after this delay, so passing over the nav doesn't flicker.
const HOVER_OPEN_DELAY = 140;
// Shorter delay when another menu is already open, so brushing a neighbouring title
// on the way down into the panel doesn't swap the menu.
const HOVER_SWITCH_DELAY = 90;
// A click this soon after a hover-open keeps the menu open instead of toggling it shut.
const HOVER_CLICK_GRACE = 500;

function Header() {
  const { bag, wishlist, removeFromBag } = useShop();
  const [activeMenu, setActiveMenu] = useState(null);
  // The last opened menu stays rendered (hidden) so the panel can animate out.
  const [renderedMenu, setRenderedMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [utilityPanel, setUtilityPanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const navRef = useRef(null);
  const panelRef = useRef(null);
  const searchRef = useRef(null);
  const searchBarRef = useRef(null);
  const triggerRefs = useRef({});
  const hoverTimer = useRef(null);
  const hoverOpenedAt = useRef(0);
  const activeMenuRef = useRef(activeMenu);
  activeMenuRef.current = activeMenu;

  const openMenu = useCallback((key) => {
    setUtilityPanel(null);
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
    setUtilityPanel(null);
    setSearchActive(false);
    setSearchQuery('');
  }, [closeMenu]);

  const openUtilityPanel = (panel) => {
    closeMenu();
    setSearchActive(false);
    setMobileOpen(false);
    setSearchQuery('');
    setUtilityPanel(panel);
  };

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

  useEffect(() => {
    if (!utilityPanel) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setUtilityPanel(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [utilityPanel]);

  // Close the search results on outside click or Escape.
  useEffect(() => {
    if (!searchActive) return undefined;
    const handlePointerDown = (event) => {
      if (!searchBarRef.current?.contains(event.target)) setSearchActive(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { setSearchActive(false); searchRef.current?.blur(); }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchActive]);

  const closeSearch = () => { setSearchActive(false); setSearchQuery(''); };

  const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const searchResults = products
    .filter((product) => {
      const searchable = `${product.brand} ${product.name} ${product.type}`.toLowerCase();
      return searchTerms.every((term) => searchable.includes(term));
    })
    .slice(0, 5);
  const openSearchResult = (product) => {
    closeSearch();
    closeMenu();
    setUtilityPanel(null);
    setQuickViewProduct(product);
  };
  const submitSearch = (event) => {
    event.preventDefault();
    if (searchResults[0]) openSearchResult(searchResults[0]);
  };
  const wishlistProducts = wishlist.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const bagItems = [...new Set(bag)].map((id) => ({
    product: products.find((product) => product.id === id),
    quantity: bag.filter((item) => item === id).length,
  })).filter((item) => item.product);
  const bagSubtotal = bagItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <>
      <header className={`site-header ${searchActive ? 'is-searching' : ''}`}>
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
            {/* Always-visible search pill, with live results dropping below it. */}
            <div className="header-search-bar" ref={searchBarRef}>
              <form className="header-search-field" role="search" onSubmit={submitSearch}>
                <label className="sr-only" htmlFor="header-search">Search watches</label>
                <Search size={17} strokeWidth={1.6} aria-hidden="true" />
                <input
                  id="header-search"
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setSearchActive(true)}
                  placeholder="Search"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button className="header-search-clear" type="button" aria-label="Clear search" onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}><X size={15} strokeWidth={1.8} /></button>
                )}
              </form>
              {searchActive && searchQuery.trim() && (
                <div className="header-search-results">
                  {searchResults.map((product) => (
                    <button type="button" onClick={() => openSearchResult(product)} key={product.id}>
                      <span className="utility-product-image" style={{ backgroundImage: `url("${product.image}")` }} aria-hidden="true" />
                      <span><strong>{product.name}</strong><small>{product.brand} · {product.type}</small></span>
                      <b>{formatPrice(product.price)}</b>
                    </button>
                  ))}
                  {searchResults.length === 0 && <p className="utility-empty">No watches match that search.</p>}
                </div>
              )}
            </div>
            <button className="icon-button optional-action" type="button" aria-label={`Wishlist, ${wishlist.length} saved`} onClick={() => openUtilityPanel('wishlist')}><Heart size={19} strokeWidth={1.5} /><span>{wishlist.length > 0 ? wishlist.length : ''}</span></button>
            <button className="icon-button bag-action" type="button" aria-label={`Shopping bag, ${bag.length} items`} onClick={() => openUtilityPanel('bag')}><ShoppingBag size={19} strokeWidth={1.5} /><span>{bag.length}</span></button>
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
      {utilityPanel && (
        <button className="utility-overlay" type="button" aria-label="Close panel" onClick={() => setUtilityPanel(null)} />
      )}
      {utilityPanel && (
        <>
          <aside className="utility-panel" role="dialog" aria-modal="true" aria-label={`${utilityPanel} panel`}>
            <div className="utility-panel-head">
              <p className="eyebrow">
                {utilityPanel === 'wishlist' ? 'Your saved pieces' : 'Your collection'}
              </p>
              <button className="icon-button" type="button" aria-label="Close panel" onClick={() => setUtilityPanel(null)}><X size={21} strokeWidth={1.5} /></button>
            </div>

            {utilityPanel === 'wishlist' && (
              <div className="utility-list">
                {wishlistProducts.length > 0 ? wishlistProducts.map((product) => (
                  <button className="utility-product-row" type="button" onClick={() => openSearchResult(product)} key={product.id}>
                    <span className="utility-product-image" style={{ backgroundImage: `url("${product.image}")` }} aria-hidden="true" />
                    <span><strong>{product.name}</strong><small>{product.brand} · {product.type}</small></span>
                    <b>{formatPrice(product.price)}</b>
                  </button>
                )) : <p className="utility-empty">Your saved pieces will appear here.</p>}
              </div>
            )}

            {utilityPanel === 'bag' && (
              <div className="utility-list">
                {bagItems.length > 0 ? bagItems.map(({ product, quantity }) => (
                  <div className="utility-bag-item" key={product.id}>
                    <span className="utility-product-image" style={{ backgroundImage: `url("${product.image}")` }} aria-hidden="true" />
                    <span><strong>{product.name}</strong><small>{product.brand} · Qty {quantity} · {formatPrice(product.price)}</small></span>
                    <button type="button" onClick={() => removeFromBag(product.id)}>Remove one</button>
                  </div>
                )) : <p className="utility-empty">Your bag is ready for its first timepiece.</p>}
                {bagItems.length > 0 && (
                  <div className="utility-bag-footer">
                    <div className="utility-bag-subtotal">
                      <span>Subtotal</span>
                      <strong>{formatPrice(bagSubtotal)}</strong>
                    </div>
                    <a className="gold-button utility-checkout" href="#new" onClick={closeMenus}>
                      <span>Continue shopping</span>
                      <b aria-hidden="true">→</b>
                    </a>
                  </div>
                )}
              </div>
            )}

          </aside>
        </>
      )}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          label="Search result"
          onClose={() => setQuickViewProduct(null)}
        />
      )}
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
