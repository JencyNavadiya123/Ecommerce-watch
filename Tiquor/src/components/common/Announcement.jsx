const offers = [
  'WELCOME TO WOW WATCHES · TIMELESS LUXURY',
  'FREE SHIPPING ON ELIGIBLE ORDERS',
  'EXTRA 5% OFF ON PREPAID ORDERS',
  'EXCLUSIVE OFFERS ON SELECTED WATCHES',
  'PREMIUM WATCHES · TIMELESS CRAFTSMANSHIP',
  'SECURE PAYMENTS AND EASY SHOPPING',
];

function Announcement() {
  const content = [...offers, ...offers];

  return (
    <div className="announcement" role="region" aria-label="Promotional announcements">
      <div className="announcement-track">
        {content.map((offer, index) => (
          <span className="announcement-item" key={`${offer}-${index}`}>
            {offer}<span className="announcement-separator" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Announcement;
