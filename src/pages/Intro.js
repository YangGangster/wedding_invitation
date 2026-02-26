import { useState, useEffect } from 'react';
import '../style/Intro.css';

function Intro({ onFinish }) {
  const text = "we are getting married!";
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState('writing');
  const [done, setDone] = useState(false);

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
  }, []);

  useEffect(() => {
    if (done) {
      const t1 = setTimeout(() => setPhase('fadeout'), 1500);
      const t2 = setTimeout(() => onFinish(), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [done]);

  return (
    <div className={`intro-wrapper ${phase === 'fadeout' ? 'fadeout' : ''}`}>
      <div className="intro-text">
        {text.slice(0, displayed)}
        {!done && <span className="intro-cursor">|</span>}
      </div>
    </div>
  );
}

export default Intro;