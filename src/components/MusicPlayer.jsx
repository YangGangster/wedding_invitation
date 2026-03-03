import { useState, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import '../style/MusicPlayer.css';

const MusicPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    audio.playbackRate = 0.9;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      const tryPlay = () => {
        audio.playbackRate = 0.9;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('touchstart', tryPlay);
      };
      document.addEventListener('click', tryPlay);
      document.addEventListener('touchstart', tryPlay);
    });
  }, []);

  useImperativeHandle(ref, () => ({ play: playAudio }), [playAudio]);

  const toggle = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/Wedding.mp3" loop />
      <button className={`music-btn ${isPlaying ? 'playing' : ''}`} onClick={toggle}>
        <div className="music-bars">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`bar bar-${i}`} />
          ))}
        </div>
      </button>
    </>
  );
});

export default MusicPlayer;