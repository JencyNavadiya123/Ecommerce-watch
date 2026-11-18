// Brand logo on a white card, or the brand name as a wordmark when there's no logo file.
function BrandMark({ brand, size = 'md', muted = false }) {
  return (
    <span className={`brand-mark brand-mark-${size} ${muted ? 'is-muted' : ''}`} aria-hidden="true">
      {brand.logo
        ? <span className="brand-mark-logo" style={{ backgroundImage: `url("${brand.logo}")` }} />
        : <span className="brand-mark-wordmark">{brand.name}</span>}
    </span>
  );
}

export default BrandMark;
