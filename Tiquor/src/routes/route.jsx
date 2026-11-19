import About from '../components/About';
import Brands from '../components/Brands';
import Category from '../components/Category';
import Home from '../components/Home';
import NewArrival from '../components/NewArrival';
import { useHash } from '../hooks/useHash';
import { ABOUT_PATH, BRANDS_PATH, CATEGORY_PATH, parseHash } from '../utils/hash';

// Hash path -> page. Anything not listed falls back to DEFAULT_PAGE.
const ROUTES = {
  '#home': Home,
  [BRANDS_PATH]: Brands,
  [CATEGORY_PATH]: Category,
  [ABOUT_PATH]: About,
};
const DEFAULT_PAGE = NewArrival;

function Route() {
  const { hash } = useHash();
  const Page = ROUTES[parseHash(hash).path] || DEFAULT_PAGE;
  return <Page />;
}

export default Route;
