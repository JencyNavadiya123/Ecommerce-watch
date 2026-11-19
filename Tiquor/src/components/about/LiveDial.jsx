import { useEffect, useState } from 'react';

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const NUMERALS = { 0: 'XII', 3: 'III', 6: 'VI', 9: 'IX' };
const pad = (value) => String(value).padStart(2, '0');

// A gold-on-navy watch dial showing the visitor's own time. The seconds hand ticks
// once a second; with reduced motion it is hidden and the dial updates each minute.
function LiveDial({ caption }) {
  const [now, setNow] = useState(() => new Date());
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), reduced ? 30000 : 1000);
    return () => clearInterval(timer);
  }, [reduced]);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  return (
    <figure className="story-dial">
      <svg viewBox="0 0 300 300" role="img" aria-label={`${caption}: ${pad(now.getHours())}:${pad(now.getMinutes())}`}>
        <defs>
          <radialGradient id="story-dial-face" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#1a2a55" />
            <stop offset="70%" stopColor="#0d1834" />
            <stop offset="100%" stopColor="#060d20" />
          </radialGradient>
          <linearGradient id="story-dial-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f1dcae" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#9a7b45" />
          </linearGradient>
        </defs>

        {/* Case, bezel and face */}
        <circle cx="150" cy="150" r="146" fill="url(#story-dial-gold)" />
        <circle cx="150" cy="150" r="136" fill="url(#story-dial-face)" />
        <circle cx="150" cy="150" r="124" fill="none" stroke="rgba(201,169,110,0.35)" strokeWidth="0.8" />

        {/* Minute track and hour markers */}
        {Array.from({ length: 60 }, (_, index) => {
          const isHour = index % 5 === 0;
          return (
            <line
              key={index}
              x1="150" y1={isHour ? 22 : 24} x2="150" y2={isHour ? 36 : 30}
              stroke={isHour ? 'url(#story-dial-gold)' : 'rgba(228,201,144,0.45)'}
              strokeWidth={isHour ? 3 : 1}
              strokeLinecap="round"
              transform={`rotate(${index * 6} 150 150)`}
            />
          );
        })}
        {Object.entries(NUMERALS).map(([hour, label]) => {
          const angle = (Number(hour) * 30 - 90) * (Math.PI / 180);
          return (
            <text
              key={hour}
              x={150 + Math.cos(angle) * 92}
              y={150 + Math.sin(angle) * 92}
              className="story-dial-numeral"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {label}
            </text>
          );
        })}
        <text x="150" y="196" className="story-dial-brand" textAnchor="middle">WOW WATCHES</text>

        {/* Hands */}
        <g className="story-dial-hand" style={{ transform: `rotate(${hours * 30}deg)` }}>
          <path d="M150 158 L146 150 L150 74 L154 150 Z" fill="url(#story-dial-gold)" />
        </g>
        <g className="story-dial-hand" style={{ transform: `rotate(${minutes * 6}deg)` }}>
          <path d="M150 162 L147 150 L150 46 L153 150 Z" fill="#f7f3eb" />
        </g>
        {!reduced && (
          <g className="story-dial-hand is-seconds" style={{ transform: `rotate(${seconds * 6}deg)` }}>
            <line x1="150" y1="172" x2="150" y2="34" stroke="#c9a96e" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        )}
        <circle cx="150" cy="150" r="6" fill="url(#story-dial-gold)" />
        <circle cx="150" cy="150" r="2" fill="#0d1834" />
      </svg>
      <figcaption>
        <span>{caption}</span>
        <strong>{pad(now.getHours())}:{pad(now.getMinutes())}</strong>
      </figcaption>
    </figure>
  );
}

export default LiveDial;
