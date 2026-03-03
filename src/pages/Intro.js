import { useState, useEffect, useRef } from 'react';
import '../style/Intro.css';

function Intro({ onFinish, onFirstTouch }) {
  const text = "we are getting married!";
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState('writing');
  const [done, setDone] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayed(prev => {
        if (prev >= text.length) {
          clearInterval(interval);
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done) {
      const t1 = setTimeout(() => setPhase('fadeout'), 1500);
      const t2 = setTimeout(() => onFinish(), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const handleTouch = () => {
    if (!triggered.current) {
      triggered.current = true;
      // 무음 재생으로 먼저 unlock
      const unlock = new Audio();
      unlock.play().catch(() => {});
      onFirstTouch?.();
    }
  };

  return (
    <div
      className={`intro-wrapper ${phase === 'fadeout' ? 'fadeout' : ''}`}
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      <div className="intro-text">
        {text.slice(0, displayed)}
        {!done && <span className="intro-cursor">|</span>}
      </div>
    </div>
  );
}

export default Intro;