import React, { useState, useRef, useEffect } from "react";
import Intro from "./pages/Intro";
import Bride from "./pages/Bride";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const musicRef = useRef(null);

  useEffect(() => {
    const unlock = () => {
      musicRef.current?.play();
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
    };
    document.addEventListener('touchstart', unlock);
    document.addEventListener('click', unlock);
    return () => {
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
    };
  }, []);

  return (
    <>
      <MusicPlayer ref={musicRef} />
      {showIntro && (
        <Intro
          onFinish={() => setShowIntro(false)}
          onFirstTouch={() => musicRef.current?.play()}
        />
      )}
      <div style={{
        opacity: showIntro ? 0 : 1,
        transition: 'opacity 1s ease',
      }}>
        <Bride />
      </div>
    </>
  );
};

export default App;