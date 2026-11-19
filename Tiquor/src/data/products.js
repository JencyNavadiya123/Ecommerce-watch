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
  {
    brand: 'Tissot', name: 'Tissot PRS 516 Chronograph', type: 'Black dial · Tachymeter bezel · Steel bracelet',
    mrp: 62000, price: 43400, image: 'tissot-prs-516.jpg', gender: 'men',
    credit: { author: 'Lloydloo', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_PRS516_(cropped).jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot PRC 200 Chronograph', type: 'Black dial · Yellow accents · Steel bracelet',
    mrp: 45000, price: 31500, image: 'tissot-prc-200.jpg', gender: 'men',
    credit: { author: 'Finlogo', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_PRC_200_T17.1.586.52_(cropped_2).jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Seastar 1000 Automatic', type: 'Silver dial · Diver bezel · Steel bracelet',
    mrp: 58000, price: 40600, image: 'tissot-seastar-1000.jpg', gender: 'men',
    credit: { author: 'Minzoblate', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Wikipedia-Tissot-Seastar-1000-Dial-1.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Navigator 3000', type: 'Blue dial · World time · Steel bracelet',
    mrp: 52000, price: 36400, image: 'tissot-navigator-3000.jpg', gender: 'men',
    credit: { author: 'Minzoblate', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Wikipedia-Tissot-Navigator-3000-Blue-Dial-T96148842.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Rose Gold Lady', type: 'White dial · Rose-gold bracelet',
    mrp: 28000, price: 19600, image: 'tissot-ladies-bracelet.jpg', gender: 'women',
    credit: { author: 'Selvakumar mallar', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_watch.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Heritage Square Gold', type: 'Silver square dial · Gold mesh bracelet',
    mrp: 34000, price: 23800, image: 'tissot-vintage-gold-ladies.jpg', gender: 'women',
    credit: { author: 'EMore98', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_dress_watch_manuale_anni_Cinquanta.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Stylist Clous de Paris', type: 'White Roman dial · Square case · Burgundy leather',
    mrp: 30000, price: 21000, image: 'tissot-stylist-clous-de-paris.jpg', gender: 'women',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_Stylist_a_carica_manuale_anni_Settanta,_con_lunetta_con_decorazione_a_clous_de_Paris.jpg' },
  },
  // Automatic movements (Men › Automatic watches)
  {
    brand: 'Tissot', name: 'Tissot Le Locle Automatic', type: 'White Roman dial · Automatic · Black leather',
    mrp: 48000, price: 33600, image: 'tissot-le-locle-automatic.jpg', gender: 'men',
    credit: { author: 'TheUrsus', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:TissotLeLocle.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Powermatic 80', type: 'Silver dial · 80-hour automatic · Brown leather',
    mrp: 52000, price: 36400, image: 'tissot-powermatic-80.jpg', gender: 'men',
    credit: { author: 'Hystiff', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Cadran_montre_m%C3%A9canique_TISSOT_Powermatic_80.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot PRX Powermatic 80', type: 'Black waffle dial · Automatic · Integrated bracelet',
    mrp: 65000, price: 45500, image: 'tissot-prx-powermatic-80.jpg', gender: 'men',
    credit: { author: 'Soulreaper', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_PRX_35mm.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot PRS 516 Visodate', type: 'Silver dial · Day-date · Automatic · Rally bracelet',
    mrp: 55000, price: 38500, image: 'tissot-prs-516-visodate.jpg', gender: 'men',
    credit: { author: 'Minzoblate', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Wikipedia-Tissot-PRS516-Visodate-new.jpg' },
  },
  {
    brand: 'Tissot', name: 'Tissot Visodate 1960s', type: 'Champagne dial · Automatic · Green croc strap',
    mrp: 42000, price: 29400, image: 'tissot-visodate-1960s.jpg', gender: 'men',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tissot_Visodate,_anni_%2760.jpg' },
  },

  // Citizen
  {
    brand: 'Citizen', name: 'Citizen Classic Date', type: 'White dial · Brown leather strap',
    mrp: 14500, price: 10150, image: 'citizen-classic-date.jpg', gender: 'men',
    credit: { author: 'Petar Milošević', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_wristwatch.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen GN-4-S', type: 'Titanium case · Grey dial',
    mrp: 26000, price: 18200, image: 'citizen-gn-4-s.jpg', gender: 'men',
    credit: { author: 'Mc681', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_GN-4-S_001.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Promaster Automatic', type: 'Full-lume dial · Diver bezel',
    mrp: 32000, price: 22400, image: 'citizen-promaster-auto.jpg', gender: 'men',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_Promaster_automatico_con_quadrante_completamente_luminescente.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Promaster Orca 200m', type: 'Black dial · Titanium case · Rubber strap',
    mrp: 34000, price: 23800, image: 'citizen-orca-titanium.jpg', gender: 'men',
    credit: { author: 'Guillaume Pillet (derivative: Pittigrilli)', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_%22Orca%22_200m_titanium_Diver_watch_(turned,_without_background).jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Promaster Aqualand JP1010', type: 'Analog-digital · Depth gauge · Diver bezel',
    mrp: 30000, price: 21000, image: 'citizen-aqualand-jp1010.jpg', gender: 'men',
    credit: { author: 'Pittigrilli', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_Promaster_Aqualand_diving_watch,_type_JP1010,_with_depth_gauge_(cropped).jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Gold Rectangle', type: 'Champagne dial · Gold-plated bracelet',
    mrp: 9500, price: 6650, image: 'citizen-gold-quartz-ladies.jpg', gender: 'women',
    credit: { author: 'EMore98', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_da_donna_al_quarzo_placcato_oro,_anni_80_circa.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Two-Tone Classic', type: 'White dial · Two-tone steel bracelet',
    mrp: 11000, price: 7700, image: 'citizen-two-tone-ladies.jpg', gender: 'women',
    credit: { author: 'Guywestern', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_timepiece.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Promaster Eco-Drive Diver', type: 'Black dial · Eco-Drive · Nylon strap',
    mrp: 24000, price: 16800, image: 'citizen-promaster-ap0440.jpg', gender: 'men',
    credit: { author: 'Francis Flinch (derivative: Pittigrilli)', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Citizen_Promaster_Eco-Drive_AP0440-14F_Diver%27s_200_m_(edited,_cropped_to_casing).jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen Eco-Drive Chronograph', type: 'White dial · Chronograph · Tachymeter bezel',
    mrp: 28000, price: 19600, image: 'citizen-eco-drive-chrono.jpg', gender: 'men',
    credit: { author: 'Premnath Kudva', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_quartz_chronograph_watch_with_Eco-Drive_and_tachymeter_scale_bezel.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen CTZ-9104 Chronograph', type: 'Black dial · Chronograph · Green canvas strap',
    mrp: 22000, price: 15400, image: 'citizen-ctz-9104-chrono.jpg', gender: 'men',
    credit: { author: 'Jacek Halicki', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:2023_Zegarek_Citizen_CTZ-9104.jpg' },
  },
  // Automatic movements (Men › Automatic watches)
  {
    brand: 'Citizen', name: 'Citizen Promaster NY0040 Diver', type: 'Black dial · Automatic · Diver’s 200 m',
    mrp: 26000, price: 18200, image: 'citizen-promaster-ny0040.jpg', gender: 'men',
    credit: { author: 'Pittigrilli', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_Promaster_Automatic_NY0040-09EE_Diver_200_m.jpg' },
  },
  {
    brand: 'Citizen', name: 'Citizen 6501 Automatic', type: 'Silver dial · Day-date · Automatic · Steel bracelet',
    mrp: 16000, price: 11200, image: 'citizen-6501-automatic.jpg', gender: 'men',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Citizen_automatico,_calibro_6501,_met%C3%A0_anni_Settanta.jpg' },
  },

  // Swatch
  {
    brand: 'Swatch', name: 'Swatch Irony Chrono', type: 'White dial · Steel case',
    mrp: 16000, price: 11200, image: 'swatch-irony-chrono.jpg', gender: 'men',
    credit: { author: 'Booksworm', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:Swatch_Irony_angle_below.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Gent Black', type: 'Black dial · Black strap',
    mrp: 6500, price: 4550, image: 'swatch-gent-black.jpg', gender: 'women',
    credit: { author: 'Luekk', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_GB101.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Jelly 1985', type: 'Transparent case · Skeleton dial',
    mrp: 7500, price: 5250, image: 'swatch-jelly-1985.jpg', gender: 'women',
    credit: { author: 'Hannes Grobe', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch-1985_hg.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Once Again', type: 'White dial · Day-date · Black strap',
    mrp: 6000, price: 4200, image: 'swatch-once-again.jpg', gender: 'men',
    credit: { author: 'Khalid Mahmood', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_Once_Again.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Irony Charcoal Suit', type: 'Black dial · Steel case · Textured strap',
    mrp: 9500, price: 6650, image: 'swatch-irony-charcoal.jpg', gender: 'men',
    credit: { author: 'BastienM', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_Irony_Charcoal_Suit.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Worldtimer', type: 'Gold-tone case · Blue leather strap',
    mrp: 8000, price: 5600, image: 'swatch-worldtimer.jpg', gender: 'women',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_%22Worldtimer%22,_met%C3%A0_anni_%2790.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Irony Lady', type: 'Green dial · Steel flex bracelet',
    mrp: 8500, price: 5950, image: 'swatch-irony-lady.jpg', gender: 'women',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_Irony_da_donna,_fine_anni_%2790_-_inizio_anni_2000.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Gent Sky Blue', type: 'Turquoise dial · Day-date · Silicone strap',
    mrp: 6000, price: 4200, image: 'swatch-gent-sky-blue.jpg', gender: 'men',
    credit: { author: 'Clyde94', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Esemplare_di_Swatch_con_movimento_al_quarzo,_cassa_in_plastica_e_cinturino_di_gomma.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Autoquarz 1998', type: 'Black dial · Orange strap',
    mrp: 12000, price: 8400, image: 'swatch-autoquarz.jpg', gender: 'men',
    credit: { author: 'Dnalor 01', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Swatch_Swiss_Autoquarz,_1998.jpg' },
  },
  {
    brand: 'Swatch', name: 'Swatch Lots of Dots by Mendini', type: 'Transparent case · Multicolour dot dial',
    mrp: 7000, price: 4900, image: 'swatch-mendini-dots.jpg', gender: 'women',
    credit: { author: 'Minicooperfahrer', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Swatch-Uhr_GZ121_von_Alessandro_Mendini.png' },
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
  {
    brand: 'Casio', name: 'Casio MTP-RS105M Solar', type: 'Teal dial · Solar powered · Mesh bracelet',
    mrp: 8500, price: 5950, image: 'casio-mtp-rs105m-solar.jpg', gender: 'men',
    credit: { author: 'PurpleBuffalo', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Casio_MTP-RS105M-3B.jpg' },
  },
  {
    brand: 'Casio', name: 'Casio MTP-4700 Twin Graph', type: 'Blue dial · Analog-digital · Steel bracelet',
    mrp: 12000, price: 8400, image: 'casio-mtp-4700-twin-graph.jpg', gender: 'men',
    credit: { author: 'Luigi abc', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Casio_mtp4700.jpg' },
  },
  {
    brand: 'Casio', name: 'Casio LTP-B165L Tank', type: 'Mint Roman dial · Black leather strap',
    mrp: 5500, price: 3850, image: 'casio-ltp-b165l-tank.jpg', gender: 'women',
    credit: { author: 'Łukasz Pojezierski', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Casio_LTP-B165L-2BVEF_Tiffany_Tank.png' },
  },
  {
    brand: 'Casio', name: 'Casio Data Bank Calculator Gold', type: 'Gold-tone case · Calculator keypad',
    mrp: 7000, price: 4900, image: 'casio-data-bank-gold.jpg', gender: 'men',
    credit: { author: 'cisnky', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Casio_Data_Bank_watch_in_gold_(edited).jpg' },
  },
  {
    brand: 'Casio', name: 'Casio G-Shock GA-2000', type: 'Carbon Core Guard · Yellow accents',
    mrp: 13000, price: 9100, image: 'casio-g-shock-ga-2000.jpg', gender: 'men',
    credit: { author: 'Maxquijano', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:G-Shock_GA-2000_Carbon_Core_Guard.jpg' },
  },
  {
    brand: 'Casio', name: 'Casio G-Shock GA-100', type: 'Black resin · Analog-digital · Red hands',
    mrp: 9500, price: 6650, image: 'casio-g-shock-ga-100.jpg', gender: 'men',
    credit: { author: 'Pittigrilli', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Casio_G-Shock_GA-100,_digital_and_analog_watch_(from_2010,_photographed_in_2023).jpg' },
  },
  {
    brand: 'Casio', name: 'Casio G-Shock GW-M5610U', type: 'Square digital · Solar radio-controlled',
    mrp: 11000, price: 7700, image: 'casio-g-shock-gw-m5610u.jpg', gender: 'men',
    credit: { author: 'Md. Rifat Hasan Jihan', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:CASIO_G-Shock_GW-M5610U.jpg' },
  },

  // Timex
  {
    brand: 'Timex', name: 'Timex Electric Model 67', type: 'Champagne dial · Gold-tone bracelet',
    mrp: 21000, price: 14700, image: 'timex-electric-model-67.jpg', gender: 'men',
    credit: { author: 'Joe Haupt', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Vintage_Timex_Electric_Watch,_Model_67,_Made_in_West_Germany_(8663522689).jpg' },
  },
  {
    brand: 'Timex', name: 'Timex Ironman Triathlon', type: 'Digital · 8-lap memory · Resin strap',
    mrp: 7500, price: 5250, image: 'timex-ironman-triathlon.jpg', gender: 'men',
    credit: { author: 'HuckleCat', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Timex_Ironman_Triathlon_Watch_-_1st_Generation.jpg' },
  },
  {
    brand: 'Timex', name: 'Timex Expedition Field', type: 'Cream analog-digital dial · Brown leather',
    mrp: 9500, price: 6650, image: 'timex-expedition-field.jpg', gender: 'men',
    credit: { author: 'Microrao', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Timex_expedition_mf13.jpg' },
  },
  {
    brand: 'Timex', name: 'Timex Model 550 LED', type: 'Red LED display · Gold-tone mesh bracelet',
    mrp: 14000, price: 9800, image: 'timex-model-550-led.jpg', gender: 'women',
    credit: { author: 'Joe Haupt', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Vintage_Timex_Model_550_LED_Digital_Watch,_Circa_1970s_(15730039292).jpg' },
  },
  {
    brand: 'Timex', name: 'Timex SSQ LED Gold', type: 'Red LED display · Gold-tone bracelet',
    mrp: 15000, price: 10500, image: 'timex-ssq-led-gold.jpg', gender: 'men',
    credit: { author: 'UwaChiikawa', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:1976_Timex_SSQ_LED_Watch_(Montgomery_Ward).jpg' },
  },

  // Adidas
  {
    brand: 'Adidas', name: 'Adidas Santiago Silver', type: 'Silver dial · Diver bezel · Steel bracelet',
    mrp: 14000, price: 9800, image: 'adidas-santiago-silver.jpg', gender: 'men',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3707022590' },
  },
  {
    brand: 'Adidas', name: 'Adidas Santiago Orange', type: 'Orange dial · Black leather strap',
    mrp: 13500, price: 9450, image: 'adidas-santiago-orange.jpg', gender: 'men',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3706210727' },
  },
  {
    brand: 'Adidas', name: 'Adidas Montreal Chronograph Black', type: 'Black dial · Chronograph · Steel bracelet',
    mrp: 18000, price: 12600, image: 'adidas-montreal-chrono-black.jpg', gender: 'men',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3707022060' },
  },
  {
    brand: 'Adidas', name: 'Adidas Montreal Chronograph Gunmetal', type: 'Black & yellow dial · Chronograph · Steel bracelet',
    mrp: 18500, price: 12950, image: 'adidas-montreal-chrono-gun.jpg', gender: 'men',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3706210429' },
  },
  {
    brand: 'Adidas', name: 'Adidas Montreal Brown', type: 'Brown dial · Steel bracelet',
    mrp: 15000, price: 10500, image: 'adidas-montreal-brown.jpg', gender: 'men',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3706210251' },
  },
  {
    brand: 'Adidas', name: 'Adidas Northpark Gunmetal', type: 'Grey square dial · Steel bracelet',
    mrp: 12500, price: 8750, image: 'adidas-northpark-gun.jpg', gender: 'men',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3706210135' },
  },
  {
    brand: 'Adidas', name: 'Adidas Northpark White', type: 'White square dial · Steel bracelet',
    mrp: 12500, price: 8750, image: 'adidas-northpark-white.jpg', gender: 'women',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3707021884' },
  },
  {
    brand: 'Adidas', name: 'Adidas Candy Blue', type: 'Blue digital display · White silicone strap',
    mrp: 6500, price: 4550, image: 'adidas-candy-blue.jpg', gender: 'women',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3706221737' },
  },
  {
    brand: 'Adidas', name: 'Adidas Candy Pink', type: 'Pink digital display · White silicone strap',
    mrp: 6500, price: 4550, image: 'adidas-candy-pink.jpg', gender: 'women',
    credit: { author: 'adifansnet', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/35301442@N07/3706221787' },
  },

  // Daniel Wellington
  {
    brand: 'Daniel Wellington', name: 'DW Classic Cornwall', type: 'White dial · Silver case · Dark leather strap',
    mrp: 12500, price: 8750, image: 'dw-classic-cornwall.jpg', gender: 'men',
    credit: { author: 'Devon Janse van Rensburg', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Daniel_Wellington_(Unsplash).jpg' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Classic Navy', type: 'Navy dial · Silver case · Tan leather strap',
    mrp: 15000, price: 10500, image: 'dw-classic-navy.jpg', gender: 'men',
    credit: { author: 'Daniele', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Daniel_Wellington_orologio.jpg' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Classic Glasgow', type: 'White dial · Navy, red & white NATO strap',
    mrp: 13500, price: 9450, image: 'dw-classic-glasgow.jpg', gender: 'men',
    credit: { author: 'Personal Creations', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Red_white_and_blue_watch_(26212677113).jpg' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Classic Black Durham', type: 'Black dial · Silver case · Brown leather strap',
    mrp: 15500, price: 10850, image: 'dw-classic-black-durham.jpg', gender: 'men',
    credit: { author: 'maiing_maii', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/197121802@N07/52606351019' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Dapper Bristol', type: 'White Roman dial · Rose gold case · Brown leather',
    mrp: 16000, price: 11200, image: 'dw-dapper-bristol.jpg', gender: 'men',
    credit: { author: 'Saigon Time', license: 'CC0', source: 'https://www.flickr.com/photos/117673294@N04/43639141092' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Petite Ashfield', type: 'Rose gold case · Pink striped NATO strap',
    mrp: 11000, price: 7700, image: 'dw-petite-ashfield.jpg', gender: 'women',
    credit: { author: 'simbiosc', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/46950055@N02/22705616302' },
  },
  {
    brand: 'Daniel Wellington', name: 'DW Petite Melrose', type: 'White dial · Silver mesh strap',
    mrp: 12000, price: 8400, image: 'dw-petite-melrose.jpg', gender: 'women',
    credit: { author: 'Betül Yıldız', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/46053585@N02/42133103421' },
  },

  // Gucci
  {
    brand: 'Gucci', name: 'Gucci Roman Bezel Gold', type: 'Black dial · Gold Roman bezel · Leather strap',
    mrp: 85000, price: 59500, image: 'gucci-vintage-gold-bezel.jpg', gender: 'women',
    credit: { author: 'Rooey202', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/50284194@N00/5256491474' },
  },
  {
    brand: 'Gucci', name: 'Gucci G-Link Bracelet', type: 'Black dial · Gold & steel link bracelet',
    mrp: 92000, price: 64400, image: 'gucci-g-link-bracelets.jpg', gender: 'women',
    credit: { author: 'achimh', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/8599338@N04/16766790652' },
  },
  // Placeholder photos: no openly licensed photo of these models exists yet, so each one
  // reuses a Gucci photo above. Replace `image` (and `credit`) when the model's own shot arrives.
  { brand: 'Gucci', name: 'Gucci G-Timeless', type: 'Black & white dial · Black leather strap', mrp: 78000, price: 54600, image: 'gucci-heritage-roman.jpg', gender: 'men', credit: { author: 'Norbert Pietsch (Enpi48)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Gucci_Damenuhr_1998.jpg' } },
  { brand: 'Gucci', name: 'Gucci Dive 40mm', type: 'Black dial · Gold-tone bezel · Rubber strap', mrp: 115000, price: 80500, image: 'gucci-vintage-gold-bezel.jpg', gender: 'men', credit: { author: 'Rooey202', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/50284194@N00/5256491474' } },
  { brand: 'Gucci', name: 'Gucci Grip', type: 'Black dial · Steel link bracelet', mrp: 105000, price: 73500, image: 'gucci-g-link-bracelets.jpg', gender: 'men', credit: { author: 'achimh', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/8599338@N04/16766790652' } },
  { brand: 'Gucci', name: 'Gucci Interlocking G', type: 'Roman dial · Black leather strap', mrp: 72000, price: 50400, image: 'gucci-heritage-roman.jpg', gender: 'women', credit: { author: 'Norbert Pietsch (Enpi48)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Gucci_Damenuhr_1998.jpg' } },
  { brand: 'Gucci', name: 'Gucci 25H', type: 'Black dial · Gold-tone link bracelet', mrp: 128000, price: 89600, image: 'gucci-g-link-bracelets.jpg', gender: 'women', credit: { author: 'achimh', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/8599338@N04/16766790652' } },
  { brand: 'Gucci', name: 'Gucci Horsebit', type: 'Black dial · Gold-tone case · Leather strap', mrp: 88000, price: 61600, image: 'gucci-vintage-gold-bezel.jpg', gender: 'women', credit: { author: 'Rooey202', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/50284194@N00/5256491474' } },
  { brand: 'Gucci', name: 'Gucci G-Frame', type: 'Black & white dial · Steel case · Leather strap', mrp: 76000, price: 53200, image: 'gucci-heritage-roman.jpg', gender: 'men', credit: { author: 'Norbert Pietsch (Enpi48)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Gucci_Damenuhr_1998.jpg' } },

  // Guess
  {
    brand: 'Guess', name: 'Guess Collection Sport Chrono', type: 'Black dial · Chronograph · Navy bezel',
    mrp: 32000, price: 22400, image: 'guess-collection-chrono.jpg', gender: 'women',
    credit: { author: 'derosieres', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/91879051@N04/14776127709' },
  },
  {
    brand: 'Guess', name: 'Guess Gold Link Petite', type: 'Black dial · Gold-tone link bracelet',
    mrp: 14000, price: 9800, image: 'guess-gold-link-ladies.jpg', gender: 'women',
    credit: { author: 'hey tiffany!', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/84077682@N00/3098649681' },
  },
  {
    brand: 'Guess', name: 'Guess Diamond Accent', type: 'Black dial · Crystal markers · Steel bracelet',
    mrp: 16000, price: 11200, image: 'guess-diamond-black.jpg', gender: 'men',
    credit: { author: 'tjshirey', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/21458522@N00/5647989797' },
  },
  // Placeholder photos: reuse Guess studio shots until each model's own photo is added.
  { brand: 'Guess', name: 'Guess Sparkling Lilac', type: 'Lilac dial · Crystal bezel · Steel bracelet', mrp: 17000, price: 11900, image: 'guess-purple', gender: 'women' },
  { brand: 'Guess', name: 'Guess Gold Petite Crystal', type: 'Gold dial · Crystal-set bracelet', mrp: 22000, price: 15400, image: 'guess-gold', gender: 'women' },
  { brand: 'Guess', name: 'Guess Multifunction Black Gold', type: 'Crystal dial · Gold-tone case · Black strap', mrp: 26000, price: 18200, image: 'guess-gold-black', gender: 'women' },
  { brand: 'Guess', name: 'Guess Classic Steel Gent', type: 'Black dial · Steel bracelet · 42 mm', mrp: 15000, price: 10500, image: 'guess-diamond-black.jpg', gender: 'men', credit: { author: 'tjshirey', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/21458522@N00/5647989797' } },

  // Versace
  { brand: 'Versace', name: 'Versace V-Circle Gold Mesh', type: 'Black & gold Greca dial · Gold mesh bracelet', mrp: 98000, price: 68600, image: 'versace-gold-black', gender: 'women' },
  // Placeholder photos: reuse Versace studio shots until each model's own photo is added.
  { brand: 'Versace', name: 'Versace V-Circle Gent', type: 'Black & gold Greca dial · Gold-tone bracelet', mrp: 104000, price: 72800, image: 'versace-gold-black', gender: 'men' },
  { brand: 'Versace', name: 'Versace Greca Logo', type: 'Black dial · Gold Greca bracelet', mrp: 118000, price: 82600, image: 'versace-gold', gender: 'men' },
  { brand: 'Versace', name: 'Versace V-Palazzo', type: 'Ivory dial · Medusa head · Two-tone bracelet', mrp: 132000, price: 92400, image: 'versace-medusa-gold', gender: 'men' },
  { brand: 'Versace', name: 'Versace Medusa Icon', type: 'Ivory dial · Two-tone bracelet', mrp: 108000, price: 75600, image: 'versace-medusa-gold', gender: 'women' },
  { brand: 'Versace', name: 'Versace Hellenyium', type: 'Green dial · Steel bracelet', mrp: 122000, price: 85400, image: 'versace-silver-green', gender: 'men' },
  { brand: 'Versace', name: 'Versace Greca Sport', type: 'Green dial · Greca steel bracelet', mrp: 96000, price: 67200, image: 'versace-silver-green', gender: 'women' },

  // Fossil
  {
    brand: 'Fossil', name: 'Fossil Grant Chronograph', type: 'Brown Roman dial · Chronograph · Steel bracelet',
    mrp: 14500, price: 10150, image: 'fossil-grant-chrono.jpg', gender: 'men',
    credit: { author: 'Pradeepkulasekaran', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Fossil_men.jpg' },
  },
  {
    brand: 'Fossil', name: 'Fossil Twist Multifunction', type: 'Silver skeleton dial · Steel bracelet',
    mrp: 16500, price: 11550, image: 'fossil-twist-multifunction.jpg', gender: 'men',
    credit: { author: 'StuartWebster', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/34883952@N02/4298785354' },
  },
  {
    brand: 'Fossil', name: 'Fossil Burgundy Chronograph', type: 'Red sunburst dial · Chronograph · Steel bracelet',
    mrp: 15500, price: 10850, image: 'fossil-burgundy-chrono.jpg', gender: 'men',
    credit: { author: 'Challiyan', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Watch_by_Fossil.jpg' },
  },
  {
    brand: 'Fossil', name: 'Fossil Black Chronograph', type: 'Black dial · Chronograph · 10 ATM',
    mrp: 13500, price: 9450, image: 'fossil-black-chrono.jpg', gender: 'men',
    credit: { author: 'arturodonate', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/15790252@N06/3330227821' },
  },
  {
    brand: 'Fossil', name: 'Fossil Steel Chronograph', type: 'Grey dial · Chronograph · Steel bracelet',
    mrp: 12500, price: 8750, image: 'fossil-steel-chrono.jpg', gender: 'men',
    credit: { author: 'johndbritton', license: 'CC BY-SA 2.0', source: 'https://www.flickr.com/photos/25953512@N03/4642621449' },
  },
  {
    brand: 'Fossil', name: 'Fossil Leather Cuff Chronograph', type: 'White dial · Chronograph · Black leather cuff',
    mrp: 14000, price: 9800, image: 'fossil-leather-chrono.jpg', gender: 'men',
    credit: { author: 'Jimmy Benson', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/26148267@N07/5475640833' },
  },
  {
    brand: 'Fossil', name: 'Fossil Blue Chronograph', type: 'Yellow dial · Tachymeter · Black strap',
    mrp: 11000, price: 7700, image: 'fossil-yellow-chrono.jpg', gender: 'men',
    credit: { author: 'Lsr1302', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Fossil_Blue.jpg' },
  },
  {
    brand: 'Fossil', name: 'Fossil 2002 LED', type: 'Red LED display · Silver-tone bracelet',
    mrp: 10500, price: 7350, image: 'fossil-2002-led.jpg', gender: 'men',
    credit: { author: 'Joe Haupt', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Reproduction_LED_Men%27s_Silvertone_Watch_by_Fossil,_%22Fossil_2002%22,_Model_JR-7792_(8512091955).jpg' },
  },
  {
    brand: 'Fossil', name: 'Fossil Two-Tone Chronograph', type: 'White dial · Gold-tone bezel · Two-tone bracelet',
    mrp: 15000, price: 10500, image: 'fossil-two-tone-chrono.jpg', gender: 'women',
    credit: { author: 'Cvmontuy', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Fossil_wristwatch_with_white_background.jpg' },
  },
  {
    brand: 'Fossil', name: 'Fossil Pocket Watch', type: 'Black dial · Leather pouch',
    mrp: 9000, price: 6300, image: 'fossil-pocket-watch.jpg', gender: 'women',
    credit: { author: 'Malte Ahrens', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Fossil-Uhr.jpg' },
  },

  // Titan
  {
    brand: 'Titan', name: 'Titan Octane Chronograph', type: 'Blue dial · Chronograph · Steel bracelet',
    mrp: 14500, price: 10150, image: 'titan-octane-chrono.jpg', gender: 'men',
    credit: { author: 'KuwarOnline', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Titan_Octane_Series_Watch.jpg' },
  },
  {
    brand: 'Titan', name: 'Titan Regalia Rectangle', type: 'Black dial · Rectangular case · Steel bracelet',
    mrp: 11500, price: 8050, image: 'titan-regalia-rectangle.jpg', gender: 'men',
    credit: { author: 'Joydeep', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:TITAN_watch.jpg' },
  },
  {
    brand: 'Titan', name: 'Titan Classique Square', type: 'Grey dial · Square case · Steel bracelet',
    mrp: 9500, price: 6650, image: 'titan-classique-square.jpg', gender: 'men',
    credit: { author: 'AroundTheGlobe', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Titan_watches.JPG' },
  },
  {
    brand: 'Titan', name: 'Titan Karishma Gold', type: 'White dial · Gold-tone case · Brown leather',
    mrp: 6500, price: 4550, image: 'titan-karishma-gold.jpg', gender: 'men',
    credit: { author: 'AroundTheGlobe', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Titan_watches.JPG' },
  },
  {
    brand: 'Titan', name: 'Titan Edge Tonneau', type: 'Black sunburst dial · Rose-gold case · Croc leather',
    mrp: 18500, price: 12950, image: 'titan-edge-tonneau.jpg', gender: 'men',
    credit: { author: 'Tawhid Sikder Barishal', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Titan_Edge_Tawhid_Sikder.jpg' },
  },
  {
    brand: 'Titan', name: 'Titan Vintage Roman', type: 'White Roman dial · Date window · Steel bracelet',
    mrp: 7500, price: 5250, image: 'titan-vintage-roman.jpg', gender: 'men',
    credit: { author: 'Nagarjun', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/64924693@N00/28650182681' },
  },
  {
    brand: 'Titan', name: 'Titan Raga Floral', type: 'Grey dial · Crystal flower · Crystal bezel',
    mrp: 16500, price: 11550, image: 'titan-raga-floral.jpg', gender: 'women',
    credit: { author: 'Sowmiya Thangavel', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Titan_watch.jpg' },
  },
  {
    brand: 'Titan', name: 'Titan Raga Rose Gold', type: 'Petal dial · Rose-gold bracelet',
    mrp: 13500, price: 9450, image: 'titan-raga-rose-gold.jpg', gender: 'women',
    credit: { author: 'Darakshanehaluddin', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Watch_Titan.jpg' },
  },
  {
    brand: 'Titan', name: 'Titan Raga Bracelet', type: 'Black dial · Rose-gold chain bracelet',
    mrp: 12000, price: 8400, image: 'titan-raga-bracelet.jpg', gender: 'women',
    credit: { author: 'Gracy Sambath', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Titan_Gold_watch.jpg' },
  },
  {
    brand: 'Titan', name: 'Titan Raga Rectangle', type: 'Ivory dial · Gold-tone open bracelet',
    mrp: 10500, price: 7350, image: 'titan-raga-rectangle.jpg', gender: 'women',
    credit: { author: 'netlancer2006', license: 'CC BY 2.0', source: 'https://www.flickr.com/photos/36392767@N00/1017380724' },
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
