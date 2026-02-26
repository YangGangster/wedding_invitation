import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import '../style/ImageModal.css'

const ImageModal = ({ clickedImg, handleRotationRight, handleRotationLeft, setClickedImg }) => {
  const [slideDir, setSlideDir] = useState('slide-enter');
  const [animating, setAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const imgRef = useRef(null);

  const animate = (outDir, inDir, callback) => {
    if (animating) return;
    setAnimating(true);
    setSlideDir(outDir);

    setTimeout(() => {
      callback();
      if (imgRef.current) {
        imgRef.current.style.animation = 'none';
        void imgRef.current.offsetHeight; // reflow
        imgRef.current.style.animation = '';
      }
      setSlideDir(inDir);
      setAnimating(false);
    }, 30);
  };

  const goRight = () => animate('slide-out-left', 'slide-enter-left', handleRotationRight);
  const goLeft  = () => animate('slide-out-right', 'slide-enter-right', handleRotationLeft);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;
    diff > 0 ? goRight() : goLeft();
    setTouchStartX(null);
  };

  return (
    <div className="overlay" onClick={() => setClickedImg(null)}>

      <img
        ref={imgRef}
        className={`overlay-img ${slideDir}`}
        src={clickedImg}
        alt="original size"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* 닫기 */}
      <span className="overlay-close" onClick={() => setClickedImg(null)}>
        <X size={22} color="#fff" />
      </span>

      {/* 오른쪽 */}
      <div
        className="overlay-arrow overlay-arrow-right"
        onClick={(e) => { e.stopPropagation(); goRight(); }}
      >
        <ChevronRight size={24} color="#fff" />
      </div>

      {/* 왼쪽 */}
      <div
        className="overlay-arrow overlay-arrow-left"
        onClick={(e) => { e.stopPropagation(); goLeft(); }}
      >
        <ChevronLeft size={24} color="#fff" />
      </div>

    </div>
  );
};

export default ImageModal;