import React,{useState} from "react";
import Intro from "./pages/Intro";
import Bride from "./pages/Bride";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <>
      {showIntro && (
        <Intro onFinish={() => setShowIntro(false)} />
      )}
      <div style={{
        opacity: showIntro ? 0 : 1,
        transition: 'opacity 1s ease',
      }}>
        <MusicPlayer/>
        <Bride/>
      </div>
    </>
  );
};

export default App;