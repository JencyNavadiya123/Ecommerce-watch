import { SITE } from '../config/site';

const currencyFormatter = new Intl.NumberFormat(SITE.locale, {
  style: 'currency',
  currency: SITE.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (value) => currencyFormatter.format(value);

export const getSavings = (product) => product.mrp - product.price;

export const getDiscountRatio = (product) => getSavings(product) / product.mrp;

export const getDiscount = (product) => Math.round(getDiscountRatio(product) * 100);
