import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/global.css';

import FadeInSection from '../components/FadeInSection';
import DDay from '../components/DDay';
import Guestbook from '../components/GuestBook';
import AccountModal from '../components/accountModal';
import MainSection from '../components/sections/MainSection';
import CalendarSection from '../components/sections/CalendarSection';
import InvitationSection from '../components/sections/InvitationSection';
import GallerySection from '../components/sections/GallerySection';
import LocationSection from '../components/sections/LocationSection';

import groomAccountData from '../assets/groom_account_number_data.json';
import brideAccountData from '../assets/bride_account_number_data.json';

function Bride() {
  const [clickedAccountData, setClickedAccountData] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const accountClick = (account_data) => {
    setClickedAccountData(account_data.data);
  };

  return (
    <div className='main container'>
      <div className="row justify-content-md-center">
        <div className="col col-md-2 col-lg-3" />
        <div className="col-md">

          <FadeInSection><MainSection /></FadeInSection>
          <FadeInSection><DDay /></FadeInSection>
          <FadeInSection><CalendarSection /></FadeInSection>
          <FadeInSection><InvitationSection /></FadeInSection>
          <FadeInSection><GallerySection /></FadeInSection>
          <FadeInSection>
            <LocationSection
              onGroomClick={() => accountClick(groomAccountData)}
              onBrideClick={() => accountClick(brideAccountData)}
            />
          </FadeInSection>
          <FadeInSection><Guestbook /></FadeInSection>

          {clickedAccountData && (
            <AccountModal
              clickedAccountData={clickedAccountData}
              setClickedAccountData={setClickedAccountData}
              copiedAccount={copiedAccount}
              setCopiedAccount={setCopiedAccount}
            />
          )}

        </div>
        <div className="col col-md-2 col-lg-3" />
      </div>
    </div>
  );
}

export default Bride;
