import { SITE } from '../config/site';
import {
  ABOUT_PATH, BRANDS_PATH, CARE_PATH, CONTACT_PATH, SHIPPING_PATH, SHOP_PATH, WARRANTY_PATH, shopLink,
} from '../utils/hash';

export const ANNOUNCEMENTS = [
  `WELCOME TO ${SITE.name} · TIMELESS LUXURY`,
  'FREE SHIPPING ON ELIGIBLE ORDERS',
  'EXTRA 5% OFF ON PREPAID ORDERS',
  'EXCLUSIVE OFFERS ON SELECTED WATCHES',
  'PREMIUM WATCHES · TIMELESS CRAFTSMANSHIP',
  'SECURE PAYMENTS AND EASY SHOPPING',
];

export const PRIMARY_LINK = { label: 'New arrivals', href: SHOP_PATH };
export const SECONDARY_LINK = { label: 'Our story', href: ABOUT_PATH };

// How many product photos the Men / Women menus show on the right.
export const MENU_FEATURED_COUNT = 3;

// type 'brands' -> brand tile grid (data/brands.js)
// type 'gender' -> link columns on the left, featured product photos on the right
export const MENU_GROUPS = {
  brands: {
    label: 'Brands',
    type: 'brands',
    eyebrow: 'Shop by brand',
    allBrandsLabel: 'View all brands',
  },
  men: {
    label: 'Men',
    type: 'gender',
    gender: 'men',
    eyebrow: 'Curated for him',
    featuredTitle: 'Featured for him',
    shopAllLabel: "Shop all men's watches",
    columns: [
      { title: 'Shop by style', links: ['Dress watches', 'Chronographs', 'Automatic watches'] },
      { title: 'Shop by collection', links: ['Regent', 'Sovereign', 'Heritage'] },
    ],
  },
  women: {
    label: 'Women',
    type: 'gender',
    gender: 'women',
    eyebrow: 'Curated for her',
    featuredTitle: 'Featured for her',
    shopAllLabel: "Shop all women's watches",
    columns: [
      { title: 'Shop by style', links: ['Classic watches', 'Jewellery watches', 'Minimal watches'] },
      { title: 'Shop by collection', links: ['Crown', 'Élan', 'Belle Époque'] },
    ],
  },
};

export const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'New arrivals', href: SHOP_PATH },
      { label: 'For him', href: shopLink({ gender: 'men' }) },
      { label: 'For her', href: shopLink({ gender: 'women' }) },
      { label: 'Our brands', href: BRANDS_PATH },
      { label: 'All watches', href: SHOP_PATH },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Shipping & returns', href: SHIPPING_PATH },
      { label: 'Care guide', href: CARE_PATH },
      { label: 'Warranty', href: WARRANTY_PATH },
      { label: 'Contact us', href: CONTACT_PATH },
    ],
  },
];


export const NEWSLETTER = {
  title: 'Join the inner circle',
  text: 'Sign up for private previews and considered offers.',
  placeholder: 'Your email address',
};
