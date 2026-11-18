import { SITE } from '../config/site';
import { slugify } from '../utils/slugify';

const DEFAULT_PRODUCT_DESCRIPTION = 'A considered timepiece with a precision movement, polished details, and a dial designed to stay timeless.';

// Listed newest first. `image` is a file name inside SITE.productImagePath (without .png).
// `gender` ('men' | 'women') drives the Men / Women menus and the "For" filter.
const productList = [
  { brand: 'Timex', name: 'Expedition Blue', type: 'Blue dial · Steel bracelet', mrp: 62000, price: 43400, image: 'timex-blue', gender: 'men' },
  { brand: 'Guess', name: 'Glamour Chronograph', type: 'Lilac dial · Crystal bezel', mrp: 15000, price: 10500, image: 'guess-purple', gender: 'women' },
  { brand: 'Timex', name: 'Metropolitan Minimal', type: 'White dial · Blue leather strap', mrp: 32000, price: 22400, image: 'timex-white', gender: 'men' },
  { brand: 'Timex', name: 'Fashion Black Gold', type: 'Black dial · Gold case', mrp: 98000, price: 68600, image: 'timex-black-gold', gender: 'men' },
  { brand: 'Guess', name: 'Guess Gold Date', type: 'Gold dial · Crystal-set bracelet', mrp: 28000, price: 19600, image: 'guess-gold', gender: 'women' },
  { brand: 'Philipp Plein', name: 'Plein Sport Chronograph', type: 'Tiger dial · Rubber strap', mrp: 18000, price: 12600, image: 'plein-sport-black', gender: 'men' },
  { brand: 'Adidas', name: 'Adidas Process SP1', type: 'Blue dial · Silicone strap', mrp: 76000, price: 53200, image: 'adidas-blue', gender: 'men' },
  { brand: 'Versace', name: 'Versace Medusa Gold', type: 'Ivory dial · Two-tone bracelet', mrp: 125000, price: 87500, image: 'versace-medusa-gold', gender: 'men' },
  { brand: 'Guess', name: 'Guess Pavé Multifunction', type: 'Crystal pavé dial · Black strap', mrp: 105000, price: 73500, image: 'guess-gold-black', gender: 'women' },
  { brand: 'Versace', name: 'Versace Antares Emerald', type: 'Green dial · Greca steel bracelet', mrp: 112000, price: 78400, image: 'versace-silver-green', gender: 'women' },
  { brand: 'Timex', name: 'Timex Mandala Rose', type: 'Grey mandala dial · Rose gold bracelet', mrp: 24500, price: 17150, image: 'timex-rose-bracelet', gender: 'women' },
  { brand: 'Timex', name: 'Timex Fria Crystal', type: 'Mother-of-pearl dial · Crystal links', mrp: 19800, price: 13860, image: 'timex-rose-charm', gender: 'women' },
  { brand: 'Versace', name: 'Versace Antares Gold', type: 'Black dial · Gold Greca bracelet', mrp: 135000, price: 94500, image: 'versace-gold', gender: 'women' },

  // Openly licensed photos from Wikimedia Commons. `credit` is shown in Quick View,
  // as the CC BY-SA licences require. Full list: public/images/products/CREDITS.md
  {
    brand: 'Daniel Wellington', name: 'DW Classic Canterbury', type: 'White dial · Striped NATO strap',
    mrp: 18000, price: 12600, image: 'dw-classic-canterbury.jpg', gender: 'men',
    credit: { author: 'Kristoffer Fagermo', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Daniel_wellington_classic.jpg' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Classic Sheffield', type: 'White dial · Black leather strap',
    mrp: 16500, price: 11550, image: 'dw-classic-sheffield.jpg', gender: 'men',
    credit: { author: 'DONGHODW', license: 'CC BY-SA 2.5', source: 'https://commons.wikimedia.org/wiki/File:Daniel-wellington-watch-review.jpg' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Classic St Mawes', type: 'White dial · Rose gold case · Brown leather',
    mrp: 17500, price: 12250, image: 'dw-classic-st-mawes.jpg', gender: 'women',
    credit: { author: 'SIG SG 510', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Orologio_Daniel_Wellington.jpg' },
  },
  {
    brand: 'Gucci', name: 'Gucci Heritage Roman', type: 'Black & white Roman dial · Black leather strap',
    mrp: 98000, price: 68600, image: 'gucci-heritage-roman.jpg', gender: 'women',
    credit: { author: 'Norbert Pietsch (Enpi48)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Gucci_Damenuhr_1998.jpg' },
  },

  // Tissot
  {
    brand: 'Tissot', name: 'Tissot PR 516 Automatic', type: 'Silver dial · Gold-tone bracelet',
    mrp: 52000, price: 36400, image: 'tissot-pr516-automatic.jpg', gender: 'men',
    credit: { author: 'Norbert Pietsch (Enpi48)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_Armbanduhr_Automatic_PR_516_GL_(1972).jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot 1853 Chronograph', type: 'Cream dial · Tachymeter bezel',
    mrp: 48000, price: 33600, image: 'tissot-1853-chronograph.jpg', gender: 'men',
    credit: { author: 'Ralf Steinberger', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Watch_hands_of_Tissot_chronograph_watch.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot PR 50 Titanium', type: 'Black dial · Titanium case · Luminous hands',
    mrp: 39000, price: 27300, image: 'tissot-lumiere.jpg', gender: 'men',
    credit: { author: 'Bautsch', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Phosphoreszierendes.Ziffernblatt.Arbanduhr.P1105849.jpg' },
  },

  // Citizen
  {
    brand: 'Citizen', name: 'Citizen Classic Date', type: 'White dial · Brown leather strap',
    mrp: 14500, price: 10150, image: 'citizen-classic-date.jpg', gender: 'men',
    credit: { author: 'Petar Milošević', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_wristwatch.jpg' },
  },
  // Enabled once its photo has downloaded (see CREDITS.md).
  // {
  //   brand: 'Citizen', name: 'Citizen GN-4-S', type: 'Titanium case · Grey dial',
  //   mrp: 26000, price: 18200, image: 'citizen-gn-4-s.jpg', gender: 'men',
  //   credit: { author: 'Mc681', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_GN-4-S_001.jpg' },
  // },
  {
    brand: 'Citizen', name: 'Citizen Promaster Automatic', type: 'Full-lume dial · Diver bezel',
    mrp: 32000, price: 22400, image: 'citizen-promaster-auto.jpg', gender: 'men',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_Promaster_automatico_con_quadrante_completamente_luminescente.jpg' },
  },

  // Swatch
  {
    brand: 'Swatch', name: 'Swatch Irony Chrono', type: 'White dial · Steel case',
    mrp: 16000, price: 11200, image: 'swatch-irony-chrono.jpg', gender: 'men',
    credit: { author: 'Booksworm', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:Swatch_Irony_angle_below.jpg' },
  },
  // Enabled once its photo has downloaded (see CREDITS.md).
  // {
  //   brand: 'Swatch', name: 'Swatch Gent Black', type: 'Black dial · Black strap',
  //   mrp: 6500, price: 4550, image: 'swatch-gent-black.jpg', gender: 'women',
  //   credit: { author: 'Luekk', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_GB101.jpg' },
  // },
  {
    brand: 'Swatch', name: 'Swatch Jelly 1985', type: 'Transparent case · Skeleton dial',
    mrp: 7500, price: 5250, image: 'swatch-jelly-1985.jpg', gender: 'women',
    credit: { author: 'Hannes Grobe', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch-1985_hg.jpg' },
  },

  // Casio
  {
    brand: 'Casio', name: 'Casio Data Bank', type: 'Analog-digital · Gold-tone case · Brown leather',
    mrp: 6000, price: 4200, image: 'casio-data-bank.jpg', gender: 'women',
    credit: { author: 'Stollenbaeck', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:FKT-100.jpg' },
  },
  {
    brand: 'Casio', name: 'Casio Edifice EQW-T650', type: 'Black dial · Chronograph · Steel bracelet',
    mrp: 38000, price: 26600, image: 'casio-edifice-eqw-t650.jpg', gender: 'men',
    credit: { author: '踝太郎', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:EQW-T650DB-1AJF_Feb._2023.jpg' },
  },
  {
    brand: 'Casio', name: 'Casio Outgear SGW-400H', type: 'Digital · Altimeter & barometer',
    mrp: 9000, price: 6300, image: 'casio-outgear-sgw-400h.jpg', gender: 'men',
    credit: { author: 'KuwarOnline', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Casio_Sport_outgear_SGW-400HD-1BV.jpg' },
  },
];

// `image` may include its extension (e.g. 'photo.jpg'); without one, .png is assumed.
const imagePath = (image) => `${SITE.productImagePath}/${/\.\w+$/.test(image) ? image : `${image}.png`}`;

export const products = productList.map((product) => ({
  ...product,
  id: slugify(product.name),
  image: imagePath(product.image),
  // Studio cut-outs on white (.png) sit inside the frame; real photos (.jpg) fill it.
  fit: product.fit || (/\.jpe?g$/i.test(product.image) ? 'cover' : 'contain'),
  description: product.description || DEFAULT_PRODUCT_DESCRIPTION,
}));

// Brands come from the products themselves, so a new brand shows up automatically.
export const brands = [...new Set(products.map((product) => product.brand))].sort();
