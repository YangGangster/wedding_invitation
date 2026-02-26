import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import data from '../../assets/image_data.json';
import ImageModal from '../ImageModal';
import '../../style/GallerySection.css';

export default function GallerySection() {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data.data : data.data.slice(0, 9);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
  };

  const handleRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      setClickedImg(data.data[0].link);
      return;
    }
    const newIndex = currentIndex + 1;
    setClickedImg(data.data[newIndex].link);
    setCurrentIndex(newIndex);
  };

  const handleRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      setClickedImg(data.data[totalLength - 1].link);
      return;
    }
    const newIndex = currentIndex - 1;
    setClickedImg(data.data[newIndex].link);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className='gallery-section'>
        <div className='gallery-section-text'>GALLERY</div>
      </div>
      <div>
        <div className='gallery-image-list-wrapper row'>
          {visibleData.map((item, index) => (
            <div key={index} className='col-4'>
              <img
                className='gallery-image'
                src={item.thumb_image_link}
                alt={item.text}
                onClick={() => handleClick(item, index)}
              />
            </div>
          ))}
        </div>

        {data.data.length > 9 && (
          <button
            className='gallery-more-btn'
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>접기 <ChevronUp size={14} /></>
            ) : (
              <>더보기 <ChevronDown size={14} /></>
            )}
          </button>
        )}

        {clickedImg && (
          <ImageModal
            clickedImg={clickedImg}
            handleRotationRight={handleRotationRight}
            handleRotationLeft={handleRotationLeft}
            setClickedImg={setClickedImg}
          />
        )}
      </div>
    </>
  );
}
