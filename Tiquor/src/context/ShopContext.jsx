import { createContext, useContext, useMemo, useState } from 'react';

const ShopContext = createContext(null);

const toggleItem = (list, id) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

// Bag and wishlist shared by every page and the header.
export function ShopProvider({ children }) {
  const [bag, setBag] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const value = useMemo(() => ({
    bag,
    wishlist,
    addToBag: (productId) => setBag((current) => [...current, productId]),
    toggleWishlist: (productId) => setWishlist((current) => toggleItem(current, productId)),
    isInBag: (productId) => bag.includes(productId),
    isWishlisted: (productId) => wishlist.includes(productId),
  }), [bag, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside <ShopProvider>');
  return context;
}
