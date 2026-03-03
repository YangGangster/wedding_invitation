import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import '../style/MusicPlayer.css';

const MusicPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      audio.playbackRate = 0.8;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }));

  const toggle = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
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