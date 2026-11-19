// Hash links look like "#new?brand=timex&gender=men" or "#brands?brand=timex".
export const SHOP_PATH = '#new';
export const BRANDS_PATH = '#brands';
export const ABOUT_PATH = '#about';

export const parseHash = (hash = window.location.hash) => {
  const [path, query = ''] = hash.split('?');
  return { path, params: new URLSearchParams(query) };
};

const buildLink = (path, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `${path}?${query}` : path;
};

// shopLink({ brand: 'timex' }) -> "#new?brand=timex"
export const shopLink = (params) => buildLink(SHOP_PATH, params);

// brandLink('timex') -> "#brands?brand=timex"; brandLink() -> "#brands"
export const brandLink = (slug) => buildLink(BRANDS_PATH, slug ? { brand: slug } : {});

// categoryLink('chronographs') -> "#watches?category=chronographs"
export const CATEGORY_PATH = '#watches';
export const categoryLink = (slug) => buildLink(CATEGORY_PATH, { category: slug });
