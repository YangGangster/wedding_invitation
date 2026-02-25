import React, { useState } from 'react';
import data from '../assets/image_data.json';
import pinIcon from '../assets/location-pin.png';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../style/App.css';
import '../style/Calendar.css';
import ImageModal from '../components/imageModal';
import AccountModal from '../components/accountModal';
import Petals from '../components/Petals';
import Calendar from 'react-calendar';
import DDay from '../components/DDay';

function Bride() {
  // state for image modal
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  // state for account modal
  const [ clickedAccountData, setClickedAccountData ] = useState(null);
  const [ copiedAccount, setCopiedAccount ] = useState(null);

  // const navermaps = useNavermaps()

  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll ? data.data : data.data.slice(0, 9); 

  const handleClick = (item, index) => {
    console.log(item,index)
    setCurrentIndex(index);
    setClickedImg(item.link);
  };
  const accountClick = (account_data) => {
    setClickedAccountData(account_data.data);
  };

  const handleRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };
  
  const handleRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data.data[totalLength-1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="">
     
      <div className='main container'>
        <div className="row justify-content-md-center">
          <div className="col col-md-2 col-lg-3">
          </div>

          <div className="col-md">
            <div className='mainsection'>
               <Petals/>
                <div className='mainsection-text'>
                <div className='mainsection-text-1'>KIM MIN JAE & SEO YUN KYUNG</div>
                <hr style={{ border: 'none', borderTop: '1px solid #6e6e6eff', margin: '0px 20px' }} />
                <div className='mainsection-text-3'>2027. 09. 04 토요일 오전 11시<br/>00000 웨딩홀</div>
              </div>
              
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src="https://i.pinimg.com/736x/76/d3/ee/76d3eee9223c8576b9fe7a5065cb5762.jpg" className='main-image' alt='t1'></img>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(25px, 3vw, 40px)',  // 모바일 최소 14px, 웹 최대 28px
                    letterSpacing: '0.15em',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                      we are getting married
                </div>
              </div>
            
            </div>
            <DDay />
            <div className='calendar-section'>
              <Calendar showNavigation={true}
                        navigationLabel={() => (
                          <div className="custom-nav-label">
                            <span className="nav-month">9</span>
                            <span className="nav-month-text">September</span>
                            <span className="nav-right">sat. am 11:00</span>
                          </div>
                        )}
                        prevLabel={null}   // 이전 화살표 숨기기
                        nextLabel={null}   // 다음 화살표 숨기기
                        prev2Label={null}
                        next2Label={null}
                        defaultValue={new Date(2027,8,7)}
                        formatDay={(locale, date) => date.getDate()}
                        showNeighboringDecade={false}
                        showNeighboringMonth={false}
                        tileDisabled={({ date }) => {
                          return !(
                            date.getFullYear() === 2027 &&
                            date.getMonth() === 8 &&  // 0부터 시작이라 9월 = 8
                            date.getDate() === 4
                          );
                        }}
                        tileClassName={({ date }) =>
                          date.getFullYear() === 2027 && date.getMonth() === 8 && date.getDate() === 4
                            ? 'wedding-day'
                            : null
                        }
                         tileContent={({ date }) => {
                          if (date.getFullYear() === 2027 && date.getMonth() === 8 && date.getDate() === 4) {
                            return (
                              <div className="wedding-tile">
                                <svg viewBox="0 0 32 32" width="36" height="36">
                                  <path
                                    d="M16 28S4 20 4 11.5a7.5 7.5 0 0 1 12-6 7.5 7.5 0 0 1 12 6C28 20 16 28 16 28z"
                                    fill="#fce4ec"
                                    stroke="#fce4ec"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="wedding-date">4</span>
                              </div>
                            );
                          }
                          return null;
                        }}
                        onClickDay={() => {}} />
            </div>
            <div className='invitation-section'>
              <div className='invitation-section-text1'>소중한 분들을 초대합니다.</div>
              <div className='invitation-section-text2'>
                    저희 두 사람이 사랑과 믿음으로<br/>
                    한 가정을 이루게 되었습니다.<br/>
                    바쁘시더라도 부디 오셔서<br/>
                    저희의 앞날을 축복해 주시고<br/>
                    격려해 주시면 감사하겠습니다.
              </div>
              <div className='invitation-section-text3'>
                김기엽<span className='text3-inner'>의 장남</span> 김 민 재
              </div>
              <div className='invitation-section-text3'>
                서영민・문경아<span className='text3-inner'>의 장녀</span> 서 윤 경
              </div>
            </div>
            <div className='gallery-section'>
              <div className='gallery-section-text'>
                GALLERY
              </div>
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

                            {/* 9개 초과일 때만 더보기 버튼 표시 */}
                            {data.data.length > 9 && (
                              <button
                                className='gallery-more-btn'
                                onClick={() => setShowAll(!showAll)}
                              >
                                {showAll ? '접기 ∧' : `더보기 +${data.data.length - 9}`}
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
            <div className='location-section'>
              <div className='location-section-text1'>
                LOCATION
              </div>
            </div>
            <div className='location-map-section'>
              <MapDiv
                style={{
                  width: '100%',
                  height: '350px'
                }}
              >
                {/* <NaverMap 
                  defaultCenter={new navermaps.LatLng(37.44865592343993,126.95097244672262)}
                  defaultZoom={16}>
                  <Marker 
                  position={new navermaps.LatLng(37.44865592343993,126.95097244672262)} 
                  icon={
                    {
                      url : pinIcon,
                      size : new navermaps.Size(64,64)
                    }
                  }/>
                </NaverMap> */}
              </MapDiv>
            </div>
            <div className='location-info-section'>
                <div className='location-info-section-text1'>이라운지 서울대점</div>
                <div className='location-info-section-text2'>
                    서울특별시 관악구 관악로 1<br/>
                    서울대학교 310동 엔지니어하우스<br/>
                    Tel. 02-875-7761
                </div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>대중교통</div>
              <ol className='location-how-publictrans-section-list'>
                <li>2호선 서울대입구역 3번 출구 → 5511,5513 버스 → 제2공학관(종점) 하차</li>
                <li>2호선 낙성대역 4번 출구 → 관악02 마을버스 → 제2공학관(종점) 하차</li>
                <li>신림선 관악산역 1번 출구 → 5511,5516 버스 → 제2공학관(종점) 하차</li>
              </ol>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>자가용</div>
              <div className='location-how2-section-text2'>
                네비게이션 이용 시 “이라운지 서울대점”을 입력하세요. (주차 2시간 무료)
              </div>
            </div>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>마음 전하실 곳</div>
                <div 
                  className='congratulatory-section-btn' 
                  onClick={() => accountClick(groomAccountData)}>신랑측 계좌번호</div>
                <div 
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>신부측 계좌번호</div>
            </div>
            {clickedAccountData && <AccountModal 
              clickedAccountData={clickedAccountData}
              setClickedAccountData={setClickedAccountData}
              copiedAccount={copiedAccount}
              setCopiedAccount={setCopiedAccount}
              />}
          </div>

          <div className="col col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Bride;
