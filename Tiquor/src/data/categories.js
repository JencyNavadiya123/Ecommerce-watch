import { categoryLink } from '../utils/hash';
import { slugify } from '../utils/slugify';
import { products } from './products';

// Shop-by-style and collection pages linked from the Men / Women menus.
// `label` must match the link text in MENU_GROUPS (data/navigation.js) for the
// menu to link here. `products` lists product names from data/products.js, in display order.
const CATEGORY_LIST = [
  // Men · Shop by style
  {
    label: 'Dress watches', gender: 'men', group: 'Shop by style',
    titleLead: 'Dress', titleAccent: 'watches',
    intro: 'Slim cases and clean dials, made for shirt cuffs and evenings out.',
    products: [
      'DW Classic Sheffield', 'Titan Regalia Rectangle', 'Gucci G-Timeless', 'DW Dapper Bristol', 'Metropolitan Minimal',
      'Versace V-Circle Gent', 'Citizen Classic Date', 'DW Classic Black Durham', 'Titan Karishma Gold', 'DW Classic Navy',
    ],
  },
  {
    label: 'Chronographs', gender: 'men', group: 'Shop by style',
    titleLead: 'The', titleAccent: 'chronographs',
    intro: 'Stopwatch complications and tachymeter bezels, built to time every moment.',
    products: [
      'Tissot PRS 516 Chronograph', 'Fossil Grant Chronograph', 'Casio Edifice EQW-T650', 'Tissot 1853 Chronograph', 'Citizen Eco-Drive Chronograph',
      'Titan Octane Chronograph', 'Adidas Montreal Chronograph Black', 'Tissot PRC 200 Chronograph', 'Fossil Burgundy Chronograph', 'Citizen CTZ-9104 Chronograph',
    ],
  },
  {
    label: 'Automatic watches', gender: 'men', group: 'Shop by style',
    titleLead: 'Automatic', titleAccent: 'watches',
    intro: 'Self-winding mechanical movements, powered by the motion of your wrist.',
    products: [
      'Tissot PRX Powermatic 80', 'Tissot Le Locle Automatic', 'Citizen Promaster NY0040 Diver', 'Tissot Powermatic 80', 'Tissot PR 516 Automatic',
      'Tissot Seastar 1000 Automatic', 'Tissot PRS 516 Visodate', 'Citizen Promaster Automatic', 'Tissot Visodate 1960s', 'Citizen 6501 Automatic',
    ],
  },

  // Men · Shop by collection
  {
    label: 'Regent', gender: 'men', group: 'Shop by collection',
    titleLead: 'The', titleAccent: 'Regent',
    intro: 'Gold, lacquer and fine leather: our most refined pieces for formal occasions.',
    products: [
      'Versace V-Circle Gent', 'Tissot Le Locle Automatic', 'Fashion Black Gold', 'Gucci G-Frame', 'Versace Greca Logo',
      'Titan Edge Tonneau', 'Versace Medusa Gold', 'Tissot Powermatic 80', 'Gucci Grip', 'Versace Hellenyium',
    ],
  },
  {
    label: 'Sovereign', gender: 'men', group: 'Shop by collection',
    titleLead: 'The', titleAccent: 'Sovereign',
    intro: 'Divers, chronographs and tool watches with a commanding presence.',
    products: [
      'Tissot Seastar 1000 Automatic', 'Citizen Promaster Orca 200m', 'Gucci Dive 40mm', 'Tissot PRX Powermatic 80', 'Casio G-Shock GA-2000',
      'Citizen Promaster NY0040 Diver', 'Tissot Navigator 3000', 'Adidas Montreal Chronograph Gunmetal', 'Citizen Promaster Aqualand JP1010', 'Fossil Black Chronograph',
    ],
  },
  {
    label: 'Heritage', gender: 'men', group: 'Shop by collection',
    titleLead: 'The', titleAccent: 'Heritage',
    intro: 'Icons and vintage-spirited pieces that carry the history of watchmaking.',
    products: [
      'Tissot PR 516 Automatic', 'Tissot Visodate 1960s', 'Timex Electric Model 67', 'Citizen 6501 Automatic', 'Timex SSQ LED Gold',
      'Fossil 2002 LED', 'Casio Data Bank Calculator Gold', 'Timex Ironman Triathlon', 'Swatch Autoquarz 1998', 'Titan Vintage Roman',
    ],
  },

  // Women · Shop by style
  {
    label: 'Classic watches', gender: 'women', group: 'Shop by style',
    titleLead: 'Classic', titleAccent: 'watches',
    intro: 'Timeless round and square dials on leather and steel, for every day and every occasion.',
    products: [
      'DW Classic St Mawes', 'Gucci Heritage Roman', 'Tissot Stylist Clous de Paris', 'Citizen Two-Tone Classic', 'Versace Antares Gold',
      'Casio LTP-B165L Tank', 'Tissot Heritage Square Gold', 'Gucci Roman Bezel Gold', 'Swatch Worldtimer', 'Citizen Gold Rectangle',
    ],
  },
  {
    label: 'Jewellery watches', gender: 'women', group: 'Shop by style',
    titleLead: 'Jewellery', titleAccent: 'watches',
    intro: 'Crystal bezels, chain bracelets and precious tones: watches worn like fine jewellery.',
    products: [
      'Guess Pavé Multifunction', 'Titan Raga Floral', 'Timex Fria Crystal', 'Versace V-Circle Gold Mesh', 'Glamour Chronograph',
      'Titan Raga Bracelet', 'Gucci G-Link Bracelet', 'Timex Mandala Rose', 'Guess Gold Date', 'Titan Raga Rectangle',
    ],
  },
  {
    label: 'Minimal watches', gender: 'women', group: 'Shop by style',
    titleLead: 'Minimal', titleAccent: 'watches',
    intro: 'Clean dials and pared-back cases, made to say only what matters.',
    products: [
      'DW Petite Melrose', 'Tissot Rose Gold Lady', 'Swatch Gent Black', 'Adidas Northpark White', 'DW Petite Ashfield',
      'Swatch Irony Lady', 'Timex Model 550 LED', 'Swatch Jelly 1985', 'Adidas Candy Pink', 'Adidas Candy Blue',
    ],
  },

  // Women · Shop by collection
  {
    label: 'Crown', gender: 'women', group: 'Shop by collection',
    titleLead: 'The', titleAccent: 'Crown',
    intro: 'Our most opulent pieces in gold, Greca and Medusa, for evenings that deserve a crown.',
    products: [
      'Versace Antares Gold', 'Gucci 25H', 'Versace Medusa Icon', 'Guess Pavé Multifunction', 'Versace Antares Emerald',
      'Gucci Horsebit', 'Versace V-Circle Gold Mesh', 'Timex Mandala Rose', 'Gucci Interlocking G', 'Tissot Rose Gold Lady',
    ],
  },
  {
    label: 'Élan', gender: 'women', group: 'Shop by collection',
    titleLead: 'The', titleAccent: 'Élan',
    intro: 'Modern, spirited and effortlessly chic, for days that never stand still.',
    products: [
      'Guess Collection Sport Chrono', 'DW Petite Melrose', 'Titan Raga Floral', 'Fossil Two-Tone Chronograph', 'Versace Greca Sport',
      'Guess Sparkling Lilac', 'DW Petite Ashfield', 'Titan Raga Rose Gold', 'Swatch Irony Lady', 'Guess Gold Petite Crystal',
    ],
  },
  {
    label: 'Belle Époque', gender: 'women', group: 'Shop by collection',
    titleLead: 'The', titleAccent: 'Belle Époque',
    intro: 'Romantic vintage shapes and heirloom charm, inspired by watchmaking’s golden age.',
    products: [
      'Tissot Stylist Clous de Paris', 'Titan Raga Rectangle', 'Tissot Heritage Square Gold', 'Timex Fria Crystal', 'Citizen Gold Rectangle',
      'Gucci Roman Bezel Gold', 'Fossil Pocket Watch', 'Timex Model 550 LED', 'Swatch Worldtimer', 'Casio Data Bank',
    ],
  },
];

const productsByName = new Map(products.map((product) => [product.name, product]));

export const categories = CATEGORY_LIST.map((category) => {
  const slug = slugify(category.label);
  const items = category.products.map((name) => productsByName.get(name)).filter(Boolean);

  if (import.meta.env.DEV && items.length !== category.products.length) {
    const missing = category.products.filter((name) => !productsByName.has(name));
    console.warn(`Category "${category.label}" lists unknown products:`, missing);
  }

  return { ...category, slug, href: categoryLink(slug), products: items };
});

export const getCategoryBySlug = (slug) => categories.find((category) => category.slug === slug) || null;

// Menu link text -> category page, or null when that link has no page yet.
export const getCategoryHref = (gender, label) => (
  categories.find((category) => category.gender === gender && category.label === label)?.href || null
);
