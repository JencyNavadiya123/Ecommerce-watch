import Brands from '../components/Brands';
import Home from '../components/Home';
import NewArrival from '../components/NewArrival';
import { useHash } from '../hooks/useHash';
import { BRANDS_PATH, parseHash } from '../utils/hash';

// Hash path -> page. Anything not listed falls back to DEFAULT_PAGE.
const ROUTES = {
  '#home': Home,
  [BRANDS_PATH]: Brands,
};
const DEFAULT_PAGE = NewArrival;

function Route() {
  const { hash } = useHash();
  const Page = ROUTES[parseHash(hash).path] || DEFAULT_PAGE;
  return <Page />;
}

export default Route;
