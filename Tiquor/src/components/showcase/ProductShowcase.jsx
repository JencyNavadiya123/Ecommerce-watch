import WatchShowcase from './WatchShowcase';

// WatchShowcase filled from a product: its own photo, brand logo and price.
function ProductShowcase({ product, ...props }) {
  return (
    <WatchShowcase
      image={product.image}
      alt={`${product.brand} ${product.name}`}
      fit={product.fit}
      brand={product.brand}
      price={product.price}
      {...props}
    />
  );
}

export default ProductShowcase;
