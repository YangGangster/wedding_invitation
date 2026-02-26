import '../../style/InvitationSection.css';

export default function InvitationSection() {
  return (
    <div className='invitation-section'>
      <div className='invitation-section-text1'>소중한 분들을 초대합니다.</div>
      <div className='invitation-section-text2'>
        저희 두 사람이 사랑과 믿음으로<br />
        한 가정을 이루게 되었습니다.<br />
        바쁘시더라도 부디 오셔서<br />
        저희의 앞날을 축복해 주시고<br />
        격려해 주시면 감사하겠습니다.
      </div>
      <div className='invitation-section-text3'>
        김기엽<span className='text3-inner'>의 장남</span> 김 민 재
      </div>
      <div className='invitation-section-text3'>
        서영민・문경아<span className='text3-inner'>의 장녀</span> 서 윤 경
      </div>
    </div>
  );
}
