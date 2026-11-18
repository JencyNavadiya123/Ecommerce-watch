// Navy price tag that floats beside the watch (upper right).
// Decorative duplicate of the price shown in text nearby, so hidden from screen readers.
function FloatingPrice({ label, value }) {
  return (
    <div className="ws-price" aria-hidden="true">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default FloatingPrice;
