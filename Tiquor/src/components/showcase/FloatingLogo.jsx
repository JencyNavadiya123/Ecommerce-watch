import BrandMark from '../brand/BrandMark';

// White brand-logo card that floats over the watch's lower left corner.
function FloatingLogo({ brand }) {
  return (
    <div className="ws-logo" aria-hidden="true">
      <BrandMark brand={brand} />
    </div>
  );
}

export default FloatingLogo;
