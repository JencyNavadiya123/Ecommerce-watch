import { SITE } from '../config/site';
import { brandLink } from '../utils/hash';
import { slugify } from '../utils/slugify';
import { brands as productBrands, products } from './products';

// Brands the store carries, in display order.
// `logo`: a file name inside SITE.brandImagePath (public/images/brands). Without one the
// brand is shown as a text wordmark. Brands with no products yet appear as "Coming soon".
// `founded`, `origin` and `tagline` appear on the brand's own page.
const BRAND_DIRECTORY = [
  { name: 'Adidas', logo: 'adidas.svg', founded: 1949, origin: 'Germany', tagline: 'Three stripes of sporting heritage, made for everyday wrists.' },
  { name: 'Gucci', logo: 'gucci.svg', founded: 1921, origin: 'Italy', tagline: 'Florentine glamour, cast in gold and lacquer.' },
  { name: 'Guess', logo: 'guess.svg', founded: 1981, origin: 'USA', tagline: 'Californian sparkle with a fashion-house attitude.' },
  { name: 'Versace', founded: 1978, origin: 'Italy', tagline: 'The Medusa and the Greca: Milanese bravado for the wrist.' },
  { name: 'Timex', logo: 'timex.svg', founded: 1854, origin: 'USA', tagline: 'American watchmaking since the 1850s, honest and enduring.' },
  { name: 'Tissot', logo: 'tissot.png', founded: 1853, origin: 'Switzerland', tagline: 'Swiss precision from Le Locle, ticking since 1853.' },
  { name: 'Citizen', logo: 'citizen.png', founded: 1918, origin: 'Japan', tagline: 'Japanese engineering, built to outlast the day.' },
  { name: 'Daniel Wellington', logo: 'daniel-wellington.svg', founded: 2011, origin: 'Sweden', tagline: 'Scandinavian minimalism: clean dials, quiet confidence.' },
  { name: 'Casio', logo: 'casio.png', founded: 1946, origin: 'Japan', tagline: 'Tokyo invention, from data banks to chronographs.' },
  { name: 'Philipp Plein', logo: 'philipp-plein.jpg', founded: 1998, origin: 'Germany', tagline: 'Unapologetic luxury with a rock-and-roll edge.' },
  { name: 'Plein Sport', founded: 2016, origin: 'Switzerland', tagline: 'Performance attitude, styled for the street.' },
  { name: 'Swatch', logo: 'swatch.png', founded: 1983, origin: 'Switzerland', tagline: 'Swiss playfulness: colour, design and pure invention.' },
];

// Any brand that has products but was not listed above is added automatically,
// so a new product never ends up without a brand page.
const listedNames = new Set(BRAND_DIRECTORY.map((brand) => brand.name));
const unlistedBrands = productBrands.filter((name) => !listedNames.has(name)).map((name) => ({ name }));

export const brandDirectory = [...BRAND_DIRECTORY, ...unlistedBrands].map((brand) => {
  const brandProducts = products.filter((product) => product.brand === brand.name);
  const slug = slugify(brand.name);

  return {
    ...brand,
    slug,
    products: brandProducts,
    count: brandProducts.length,
    available: brandProducts.length > 0,
    logo: brand.logo ? `${SITE.brandImagePath}/${brand.logo}` : null,
    photo: brandProducts[0]?.image || null,
    photoFit: brandProducts[0]?.fit || 'contain',
    priceFrom: brandProducts.length ? Math.min(...brandProducts.map((product) => product.price)) : null,
    href: brandLink(slug),
  };
});

// Brands with watches in stock, and those still to come.
export const stockedBrands = brandDirectory.filter((brand) => brand.available);
export const upcomingBrands = brandDirectory.filter((brand) => !brand.available);

export const getBrandBySlug = (slug) => brandDirectory.find((brand) => brand.slug === slug) || null;
export const getBrandByName = (name) => brandDirectory.find((brand) => brand.name === name) || null;
