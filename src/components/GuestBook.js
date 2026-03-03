import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // ← 추가
import { getGuestbook, addGuestbook, deleteGuestbook } from '../function/firebase';
import '../style/Guestbook.css';
import { X, Trash2 } from 'lucide-react';

export default function Guestbook() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const list = await getGuestbook();
    setComments(list);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim() || !password.trim()) return;
    await addGuestbook({ name, message, password });
    setName('');
    setMessage('');
    setPassword('');
    setIsOpen(false);
    fetchComments();
  };

  const handleDelete = async (item) => {
    const success = await deleteGuestbook(item);
    if (success) fetchComments();
  };

  const modal = (
    <div className="guestbook-overlay" onClick={() => setIsOpen(false)}>
      <div className="guestbook-modal" onClick={(e) => e.stopPropagation()}>
        <div className="guestbook-modal-header">
          <span className="guestbook-modal-title">축하 메시지</span>
          <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
        </div>
        <input
          className="guestbook-input"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="guestbook-textarea"
          placeholder="축하 메시지를 남겨주세요 🌸"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          className="guestbook-input"
          placeholder="비밀번호 (삭제 시 필요)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="guestbook-submit-btn" onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );

  return (
    <div className="guestbook-section">
      <div className="guestbook-title">GUESTBOOK</div>

      <button className="guestbook-write-btn" onClick={() => setIsOpen(true)}>
        축하 메시지 남기기 ✉️
      </button>

      <div className="guestbook-list">
        {comments.length === 0 && (
          <div className="guestbook-empty">첫 번째 축하 메시지를 남겨주세요 🌸</div>
        )}
        {comments.map((c) => (
          <div key={c.id} className="guestbook-item">
            <div className="guestbook-item-header">
              <span className="guestbook-name">{c.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="guestbook-date">
                  {c.createdAt?.toDate?.().toLocaleDateString('ko-KR') ?? ''}
                </span>
                <Trash2
                  size={14}
                  style={{ cursor: 'pointer', color: '#ccc' }}
                  onClick={() => handleDelete(c)}
                />
              </div>
            </div>
            <div className="guestbook-message">{c.message}</div>
          </div>
        ))}
      </div>

      {/* Portal로 body에 직접 렌더링 */}
      {isOpen && createPortal(modal, document.body)}
    </div>
  );
}