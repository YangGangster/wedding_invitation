import KakaoMap from '../KakaoMap';
import '../../style/LocationSection.css';

export default function LocationSection({ onGroomClick, onBrideClick }) {
  return (
    <>
      <div className='location-section'>
        <div className='location-section-text1'>LOCATION</div>
      </div>
      <div className='location-map-section'>
        <KakaoMap />
      </div>
      <div className='location-info-section'>
        <div className='location-info-section-text1'>이라운지 서울대점</div>
        <div className='location-info-section-text2'>
          서울특별시 관악구 관악로 1<br />
          서울대학교 310동 엔지니어하우스<br />
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
          네비게이션 이용 시 "이라운지 서울대점"을 입력하세요. (주차 2시간 무료)
        </div>
      </div>
      <div className='congratulatory-section'>
        <div className='congratulatory-section-text'>마음 전하실 곳</div>
        <div className='congratulatory-section-btn' onClick={onGroomClick}>
          신랑측 계좌번호
        </div>
        <div className='congratulatory-section-btn' onClick={onBrideClick}>
          신부측 계좌번호
        </div>
      </div>
    </>
  );
}
