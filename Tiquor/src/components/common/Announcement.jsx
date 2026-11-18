import { ANNOUNCEMENTS } from '../../data/navigation';

function Announcement() {
  // Repeated twice so the scrolling track loops seamlessly.
  const content = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

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
