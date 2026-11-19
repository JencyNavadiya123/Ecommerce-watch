import { ArrowUpRight } from 'lucide-react';
import { brandDirectory } from '../../data/brands';
import { getCategoryHref } from '../../data/categories';
import { MENU_FEATURED_COUNT, MENU_GROUPS } from '../../data/navigation';
import { products } from '../../data/products';
import { brandLink, shopLink } from '../../utils/hash';
import { formatPrice } from '../../utils/price';
import { slugify } from '../../utils/slugify';
import ProductShowcase from '../showcase/ProductShowcase';

const pieces = (count) => `${count} ${count === 1 ? 'piece' : 'pieces'}`;

// Flat link list for a menu group, used by the mobile drawer.
// Items without `href` are shown but not clickable (brands with no stock yet).
export function getMenuLinks(key) {
  const group = MENU_GROUPS[key];
  if (group.type === 'brands') {
    return [
      { label: group.allBrandsLabel, href: brandLink() },
      ...brandDirectory.map((brand) => ({
        label: brand.name,
        href: brand.available ? brand.href : null,
        note: brand.available ? null : 'Coming soon',
      })),
    ];
  }
  const genderLink = shopLink({ gender: group.gender });
  return [
    ...group.columns.flatMap((column) => column.links).map((label) => ({
      label,
      href: getCategoryHref(group.gender, label) || genderLink,
    })),
    { label: group.shopAllLabel, href: genderLink },
  ];
}

function BrandGrid({ onNavigate }) {
  return (
    <div className="mega-brand-grid">
      {brandDirectory.map((brand) => {
        const tile = (
          <>
            <span className={`mega-brand-media ${brand.photo ? 'has-photo' : ''}`} aria-hidden="true">
              {brand.logo
                ? <span className="mega-brand-logo" style={{ backgroundImage: `url("${brand.logo}")` }} />
                : <span className="mega-brand-wordmark">{brand.name}</span>}
              {brand.photo && <span className="mega-brand-photo" style={{ backgroundImage: `url("${brand.photo}")` }} />}
            </span>
            <span className="mega-brand-name">{brand.name}</span>
            <span className="mega-brand-meta">{brand.count ? pieces(brand.count) : 'Coming soon'}</span>
          </>
        );

        return brand.available
          ? <a className="mega-brand" href={brand.href} key={brand.slug} onClick={onNavigate}>{tile}</a>
          : <div className="mega-brand is-soon" key={brand.slug}>{tile}</div>;
      })}
    </div>
  );
}

function FeaturedProducts({ group, onNavigate }) {
  const featured = products.filter((product) => product.gender === group.gender).slice(0, MENU_FEATURED_COUNT);

  return (
    <aside className="mega-featured" aria-label={group.featuredTitle}>
      <div className="mega-featured-head">
        <h3>{group.featuredTitle}</h3>
        <a href={shopLink({ gender: group.gender })} onClick={onNavigate}>
          Shop all <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
      </div>
      <div className="mega-featured-grid">
        {featured.map((product) => (
          <a
            className="mega-featured-item"
            href={shopLink({ gender: group.gender, brand: slugify(product.brand) })}
            key={product.id}
            onClick={onNavigate}
          >
            {/* Tiles are small: photo only; brand, name and price are listed just below. */}
            <ProductShowcase product={product} size="mini" className="mega-featured-media" />
            <span className="mega-featured-brand">{product.brand}</span>
            <span className="mega-featured-name">{product.name}</span>
            <span className="mega-featured-price">{formatPrice(product.price)}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

// The panel stays mounted while closed (hidden + inert) so it can fade out smoothly.
// `key={menuKey}` remounts the inner content, replaying its fade when switching menus.
function MegaMenu({ id, menuKey, isOpen, panelRef, onNavigate }) {
  const group = MENU_GROUPS[menuKey];
  const genderLink = group.gender && shopLink({ gender: group.gender });

  return (
    <div
      id={id}
      ref={panelRef}
      className={`mega-menu ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label={`${group.label} menu`}
      aria-hidden={!isOpen}
      inert={isOpen ? undefined : ''}
    >
      <div className={`mega-menu-inner mega-menu-${group.type}`} key={menuKey}>
        <div className="mega-menu-content">
          <p className="eyebrow">{group.eyebrow}</p>
          <h2>{group.label}</h2>
          {group.type === 'brands' ? (
            <>
              <BrandGrid onNavigate={onNavigate} />
              <a className="mega-shop-all" href={brandLink()} onClick={onNavigate}>
                {group.allBrandsLabel} <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </>
          ) : (
            <>
              <div className="mega-columns">
                {group.columns.map((column) => (
                  <div className="mega-column" key={column.title}>
                    <h3>{column.title}</h3>
                    {column.links.map((link) => (
                      // Links with their own style/collection page go there; the rest open the gender listing.
                      <a href={getCategoryHref(group.gender, link) || genderLink} key={link} onClick={onNavigate}>{link}</a>
                    ))}
                  </div>
                ))}
              </div>
              <a className="mega-shop-all" href={genderLink} onClick={onNavigate}>
                {group.shopAllLabel} <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </>
          )}
        </div>
        {group.type === 'gender' && <FeaturedProducts group={group} onNavigate={onNavigate} />}
      </div>
    </div>
  );
}

export default MegaMenu;
