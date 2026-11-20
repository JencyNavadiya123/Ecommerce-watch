import { SERVICE, SITE } from '../config/site';
import { CARE_PATH, CONTACT_PATH, SHIPPING_PATH, SHOP_PATH, WARRANTY_PATH } from '../utils/hash';

// Copy for the four service pages (components/Service.jsx). Figures such as the return
// window and contact details come from SERVICE in config/site.js, so change them there.
//
// Each page: a hero (eyebrow, title, intro, three facts, an icon for the medallion) and a
// list of sections. Section types:
//   'steps'   -> journey along a gold track   items: [{ icon, title, text, tag? }] (tag: a short time note)
//   'cards'   -> icon cards                   items: [{ icon, title, text }]
//   'compare' -> two lists side by side       columns: [{ tone: 'yes' | 'no', title, items: [] }]
//   'table'   -> small reference table        head: [], rows: [[]]
//   'faq'     -> questions that open          items: [{ q, a }]
//   'contact' -> contact cards and the form   (details come from SERVICE)
// Icons are named in components/Service.jsx (ICONS).

export const SERVICE_PAGES = [
  {
    path: SHIPPING_PATH,
    label: 'Shipping & returns',
    icon: 'truck',
    watermark: 'Delivery',
    eyebrow: 'Service · Shipping & returns',
    titleLead: 'Sent with care,',
    titleAccent: 'returned with ease.',
    intro: 'Every watch leaves us checked, protected and insured, and comes back just as simply if it is not the one.',
    facts: [
      { label: 'Dispatch', value: SERVICE.dispatchTime },
      { label: 'Delivery', value: SERVICE.deliveryTime },
      { label: 'Returns', value: `${SERVICE.returnDays} days` },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'From our hands to yours',
        title: 'How your order travels',
        intro: 'Four steps, and you hear from us at each one.',
        items: [
          { icon: 'mail', tag: 'Straight away', title: 'Order confirmed', text: 'You receive a confirmation by email as soon as your payment is approved.' },
          { icon: 'package', tag: 'Checked by hand', title: 'Checked and packed', text: 'We inspect the watch, set the time and seal it in its original box with the warranty card.' },
          { icon: 'truck', tag: `Within ${SERVICE.dispatchTime}`, title: 'Dispatched', text: 'Your parcel leaves us insured, and a tracking link is sent to you.' },
          { icon: 'badge', tag: `In ${SERVICE.deliveryTime}`, title: 'Delivered', text: 'Your watch arrives at your door. A signature may be asked for on delivery.' },
        ],
      },
      {
        type: 'cards',
        eyebrow: 'Shipping',
        title: 'Good to know before it ships',
        items: [
          { icon: 'truck', title: 'Free shipping', text: 'Delivery is complimentary on eligible orders. Any charge is shown at checkout before you pay.' },
          { icon: 'shield', title: 'Insured in transit', text: 'Every parcel is covered until it reaches you, so a lost or damaged delivery is ours to put right.' },
          { icon: 'package', title: 'Discreet packaging', text: 'Plain outer boxes with tamper-evident seals. Nothing on the outside says what is inside.' },
          { icon: 'mapPin', title: 'Track every step', text: 'Follow your parcel with the tracking link in your dispatch email, from our door to yours.' },
        ],
      },
      {
        type: 'compare',
        eyebrow: 'Returns',
        title: `${SERVICE.returnDays} days to change your mind`,
        intro: `Tell us within ${SERVICE.returnDays} days of delivery and we will arrange the return. Refunds go back to your original payment method once the watch has been checked.`,
        columns: [
          {
            tone: 'yes',
            title: 'We can accept',
            items: [
              'Watches that are unworn, with protective films still in place',
              'Original box, warranty card, manuals and all tags included',
              'Bracelets and straps that have not been resized or altered',
              'Items that arrived damaged or different from your order',
            ],
          },
          {
            tone: 'no',
            title: 'We cannot accept',
            items: [
              'Watches showing signs of wear, scratches or water exposure',
              'Engraved or personalised pieces',
              'Returns missing the box, warranty card or accessories',
              `Requests made more than ${SERVICE.returnDays} days after delivery`,
            ],
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'Questions',
        title: 'Shipping and returns, answered',
        items: [
          { q: 'How do I start a return?', a: 'Write to us with your order number and the reason for the return. We reply with the next steps and arrange a pickup where the courier offers one.' },
          { q: 'When will I receive my refund?', a: 'Once the returned watch reaches us and passes inspection, we issue the refund to your original payment method. Your bank may take a few more working days to show it.' },
          { q: 'Can I exchange for another watch?', a: 'Yes. Tell us which piece you would like instead and we will reserve it while your return is on its way. Any price difference is settled before the new watch ships.' },
          { q: 'My parcel arrived damaged. What now?', a: 'Please do not wear the watch. Send us photos of the parcel and the watch as soon as you can and we will arrange a replacement or a full refund.' },
          { q: 'Can I change my address after ordering?', a: 'If the order has not been dispatched, yes. Contact us straight away with your order number and the new address.' },
        ],
      },
    ],
  },
  {
    path: CARE_PATH,
    label: 'Care guide',
    icon: 'sparkles',
    watermark: 'Care',
    eyebrow: 'Service · Care guide',
    titleLead: 'Keep it well,',
    titleAccent: 'keep it for life.',
    intro: 'A good watch asks for very little. A few small habits will keep yours accurate, bright and ready to hand down.',
    facts: [
      { label: 'Wipe down', value: 'Weekly' },
      { label: 'Seals checked', value: 'Yearly' },
      { label: 'Full service', value: `${SERVICE.serviceIntervalYears} yrs` },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Everyday habits',
        title: 'Six ways to look after your watch',
        items: [
          { icon: 'sparkles', title: 'Clean it gently', text: 'Wipe the case and bracelet with a soft, dry cloth. For metal bracelets, a damp cloth and mild soap, then dry fully.' },
          { icon: 'droplets', title: 'Respect the water rating', text: 'Check the rating on the case back before swimming. Never press buttons or pull the crown under water.' },
          { icon: 'magnet', title: 'Avoid magnets', text: 'Speakers, phone cases and bag clasps can magnetise a movement and make it run fast. Keep some distance.' },
          { icon: 'thermometer', title: 'Mind heat and shocks', text: 'Saunas, dashboards in the sun and hard knocks are hard on seals and movements. Take it off for sport.' },
          { icon: 'watch', title: 'Care for the strap', text: 'Keep leather away from water, perfume and sweat. Let it dry naturally and rotate straps if you wear it daily.' },
          { icon: 'box', title: 'Store it properly', text: 'Rest it in its box or a soft pouch, away from damp and direct sun, and apart from other jewellery.' },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Water resistance',
        title: 'What the numbers on the case back mean',
        intro: 'Ratings describe pressure in a laboratory, not a diving depth. Use this as a guide.',
        head: ['Rating', 'Safe for', 'Avoid'],
        rows: [
          ['30 m · 3 ATM', 'Rain and hand washing', 'Showering, swimming'],
          ['50 m · 5 ATM', 'Showering, light swimming', 'Diving, water sports'],
          ['100 m · 10 ATM', 'Swimming and snorkelling', 'Scuba diving'],
          ['200 m · 20 ATM and above', 'Recreational diving', 'Hot water and steam'],
        ],
      },
      {
        type: 'compare',
        eyebrow: 'By movement',
        title: 'Quartz or automatic: what each one needs',
        columns: [
          {
            tone: 'yes',
            title: 'Quartz watches',
            items: [
              'Replace the battery as soon as it stops; a flat battery can leak',
              'Have the seals checked whenever the case back is opened',
              'Pull the crown out to save the battery during long storage',
              'Use an authorised service centre for battery changes',
            ],
          },
          {
            tone: 'yes',
            title: 'Automatic watches',
            items: [
              'Wear it regularly, or wind the crown 20 to 30 turns to start it',
              'Avoid changing the date between 9 pm and 3 am',
              `Book a full service every ${SERVICE.serviceIntervalYears} years`,
              'Expect a few seconds of variation a day; this is normal',
            ],
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'Questions',
        title: 'Care, answered',
        items: [
          { q: 'My automatic watch has stopped. Is it broken?', a: 'Almost certainly not. An automatic runs on the movement of your wrist and stops after a day or two off it. Wind the crown, set the time and wear it.' },
          { q: 'Can I wear my watch in the shower?', a: 'We would not, even with a high rating. Hot water and soap age the seals far faster than cold water does.' },
          { q: 'How do I remove scratches?', a: 'Light marks on polished steel can be refinished during a service. Please avoid home polishing kits, which can remove plating and soften sharp edges.' },
          { q: 'There is mist under the glass. What should I do?', a: 'Moisture has entered the case. Have the watch looked at by a service centre as soon as possible, before it reaches the movement.' },
        ],
      },
    ],
  },
  {
    path: WARRANTY_PATH,
    label: 'Warranty',
    icon: 'shield',
    watermark: 'Warranty',
    eyebrow: 'Service · Warranty',
    titleLead: 'Genuine,',
    titleAccent: 'and guaranteed.',
    intro: `Every watch from ${SITE.name} is authentic, brand new and covered by its maker’s warranty from the day it reaches you.`,
    facts: [
      { label: 'Authenticity', value: '100%' },
      { label: 'Cover', value: 'Maker’s' },
      { label: 'Starts', value: 'On delivery' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'What you receive',
        title: 'Protection that comes in the box',
        items: [
          { icon: 'badge', title: 'Authentic, always', text: 'We sell only genuine, brand-new watches sourced through authorised channels.' },
          { icon: 'file', title: 'Stamped warranty card', text: 'Your warranty card is dated and included in the box. Keep it with your invoice.' },
          { icon: 'wrench', title: 'Authorised service', text: 'Repairs under warranty are carried out by the brand’s own authorised service centres.' },
          { icon: 'headset', title: 'We handle the claim', text: 'Tell us what is wrong and we guide you through the claim from start to finish.' },
        ],
      },
      {
        type: 'compare',
        eyebrow: 'The cover',
        title: 'What the warranty includes',
        intro: 'The warranty period and exact terms are set by each brand and printed on your warranty card. In general:',
        columns: [
          {
            tone: 'yes',
            title: 'Covered',
            items: [
              'Manufacturing defects in the movement',
              'Faults in the dial, hands or crown that are not caused by wear',
              'Timekeeping outside the brand’s stated tolerance',
              'Functions that stop working in normal use',
            ],
          },
          {
            tone: 'no',
            title: 'Not covered',
            items: [
              'Batteries, straps, bracelets and glass',
              'Scratches, dents and normal wear',
              'Water damage beyond the watch’s rating',
              'Accidents, misuse or repairs by unauthorised workshops',
            ],
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Making a claim',
        title: 'Four steps to a repair',
        items: [
          { icon: 'mail', title: 'Contact us', text: 'Write to us with your order number, a short description of the fault and a photo or video if you can.' },
          { icon: 'file', title: 'We assess', text: 'We confirm your cover and tell you where and how to send the watch, with its warranty card.' },
          { icon: 'wrench', title: 'Repaired by the brand', text: 'The authorised service centre inspects the watch and repairs it under the brand’s terms.' },
          { icon: 'truck', title: 'Returned to you', text: 'Your watch comes back tested and insured in transit. We keep you updated along the way.' },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'Questions',
        title: 'Warranty, answered',
        items: [
          { q: 'How long is my warranty?', a: 'It depends on the brand and sometimes the model. The exact period is printed on the warranty card in your box, and we are happy to confirm it for you.' },
          { q: 'I have lost my warranty card. Can I still claim?', a: 'Contact us with your order number. Your invoice is proof of purchase and we will help you with the brand’s requirements.' },
          { q: 'Does resizing the bracelet affect my warranty?', a: 'Having links removed by a professional does not affect the warranty. Damage caused during resizing is not covered.' },
          { q: 'Is the warranty valid if I gift the watch?', a: 'Yes. The warranty follows the watch, so pass on the warranty card and a copy of the invoice with it.' },
        ],
      },
    ],
  },
  {
    path: CONTACT_PATH,
    label: 'Contact us',
    icon: 'mail',
    watermark: 'Hello',
    eyebrow: 'Service · Contact us',
    titleLead: 'We are here,',
    titleAccent: 'whenever you are.',
    intro: 'A question about a watch, an order or a repair? Write to us or call, and a real person will help.',
    facts: [
      { label: 'Open', value: SERVICE.openDays },
      { label: 'Hours', value: SERVICE.openHours },
      { label: 'Time zone', value: SERVICE.timeZone },
    ],
    sections: [
      {
        type: 'contact',
        eyebrow: 'Get in touch',
        title: 'Choose how to reach us',
        // Navy card on the left.
        cardEyebrow: 'Client care',
        cardTitleLead: 'A real person,',
        cardTitleAccent: 'every time.',
        cardNote: 'Nothing you type here is stored on this site. Your message goes from your own email app straight to us.',
        // Form on the right.
        formTitle: 'Send us a message',
        formIntro: `Tell us a little about what you need. We reply ${SERVICE.replyTime}.`,
        topics: ['A watch', 'My order', 'Returns', 'Warranty', 'Something else'],
        submitLabel: 'Open in email',
        submitNote: 'This opens your email app with the message written out. Press send there to reach us.',
      },
      {
        type: 'faq',
        eyebrow: 'Before you write',
        title: 'Quick answers',
        items: [
          { q: 'Where is my order?', a: 'Use the tracking link in your dispatch email. If it has not moved for a few days, send us your order number and we will chase it.' },
          { q: 'Can you help me choose a watch?', a: 'Gladly. Tell us the occasion, the wrist it is for and your budget, and we will suggest a few pieces.' },
          { q: 'Do you resize bracelets?', a: 'Tell us your wrist size when you order and we will let you know what is possible for that model.' },
          { q: 'Is my payment secure?', a: 'Yes. Payments are processed over an encrypted connection and we never store your card details.' },
        ],
      },
    ],
  },
];

// Link under each answer in the questions section (hidden on the contact page).
export const SERVICE_FAQ_HELP = { label: 'Still need help? Contact us', href: CONTACT_PATH };

// Closing band shared by all four pages.
export const SERVICE_CLOSING = {
  eyebrow: 'Still deciding?',
  titleLead: 'The newest pieces have',
  titleAccent: 'just arrived.',
  intro: 'Fresh from the houses we carry, chosen one by one. See what has landed, or ask us to help you choose.',
  // How many of the newest watches (top of data/products.js) appear in the arched windows.
  watchCount: 3,
  newLabel: 'Just landed',
  assurances: [
    { icon: 'truck', label: 'Free shipping on eligible orders' },
    { icon: 'shield', label: 'Secure checkout' },
    { icon: 'badge', label: 'Authentic watches' },
  ],
  primaryCta: { label: 'Shop new arrivals', href: SHOP_PATH },
  secondaryCta: { label: 'Contact us', href: CONTACT_PATH },
};
