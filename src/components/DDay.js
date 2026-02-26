import { useState, useEffect } from 'react';

import '../style/Dday.css';

export default function DDay() {
  const weddingDate = new Date('2027-09-07T11:00:00');
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="dday-section">
      <div className="dday-label">우리의 결혼식까지</div>
      <div className="dday-counter">
        <div className="dday-item">
          <span className="dday-number">{timeLeft.days}</span>
          <span className="dday-unit">days</span>
        </div>
        <span className="dday-colon">:</span>
        <div className="dday-item">
          <span className="dday-number">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="dday-unit">hours</span>
        </div>
        <span className="dday-colon">:</span>
        <div className="dday-item">
          <span className="dday-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="dday-unit">min</span>
        </div>
        <span className="dday-colon">:</span>
        <div className="dday-item">
          <span className="dday-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="dday-unit">sec</span>
        </div>
      </div>
    </div>
  );
}