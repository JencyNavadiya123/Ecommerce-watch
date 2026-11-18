import { Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

function WishlistButton({ product }) {
  const { isWishlisted, toggleWishlist } = useShop();
  const selected = isWishlisted(product.id);

  return (
    <button
      className={`na-wish ${selected ? 'is-selected' : ''}`}
      type="button"
      aria-pressed={selected}
      aria-label={selected ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      onClick={() => toggleWishlist(product.id)}
    >
      <Heart size={18} fill={selected ? 'currentColor' : 'none'} strokeWidth={1.5} />
    </button>
  );
}

export default WishlistButton;
