import Petals from '../Petals';
import '../../style/MainSection.css';

export default function MainSection() {
  return (
    <div className='mainsection'>
      <Petals />
      <div className='mainsection-text'>
        <div className='mainsection-text-1'>KIM MIN JAE & SEO YUN KYUNG</div>
        <hr style={{ border: 'none', borderTop: '1px solid #6e6e6eff', margin: '0px 20px' }} />
        <div className='mainsection-text-3'>2027. 09. 07 토요일 오전 11시<br />00000 웨딩홀</div>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src="https://i.pinimg.com/736x/76/d3/ee/76d3eee9223c8576b9fe7a5065cb5762.jpg"
          className='main-image'
          alt='t1'
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(255, 255, 255, 0.75)',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(25px, 3vw, 40px)',
          letterSpacing: '0.15em',
          whiteSpace: 'nowrap',
          width: '100%',
          textAlign: 'center',
        }}>
          we are getting married
        </div>
      </div>
    </div>
  );
}
