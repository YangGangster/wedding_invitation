import { CopyToClipboard } from 'react-copy-to-clipboard';
import { createPortal } from 'react-dom';
import '../style/AccountModal.css';

const AccountModal = ({ clickedAccountData, setClickedAccountData, copiedAccount, setCopiedAccount }) => {

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const accountClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedAccountData(null);
            setCopiedAccount(null);
        }
    };

    const copyAccountNumber = async (account_number) => {
        setCopiedAccount(account_number);
        await delay(3000);
        setCopiedAccount(null);
    };

    const modal = (
        <div className="overlay dismiss" onClick={accountClick} style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <div className="account-popup">
                <div className="account-info-area"></div>

                {clickedAccountData.map((group, groupIndex) => (
                    <div key={groupIndex} className="account-info-each">

                        {/* 그룹 헤더 (title) */}
                        <div className="each-header">
                            <div className="each-title">{group.title}</div>
                        </div>
                        <hr className="each-line" />

                        {/* 계좌 목록 */}
                        {group.accounts.map((item, accountIndex) => (
                            <div key={accountIndex} className="each-body">
                                <p className="each-account-text">
                                    {item.bank_name} (예금주 : {item.account_owner}) <br />
                                    {item.account_number}
                                </p>
                                <CopyToClipboard
                                    text={item.account_number}
                                    onCopy={() => copyAccountNumber(item.account_number)}
                                >
                                    <div className="each-copy-btn">복사하기</div>
                                </CopyToClipboard>
                                {copiedAccount === item.account_number && (
                                    <div className="copy-success">복사되었습니다.</div>
                                )}
                            </div>
                        ))}

                    </div>
                ))}

                <div className="account-popup-close dismiss" onClick={accountClick}>닫기</div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
};

export default AccountModal;