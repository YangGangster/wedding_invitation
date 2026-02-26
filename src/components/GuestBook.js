import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import '../style/Guestbook.css'
import {
  collection, addDoc, getDocs, deleteDoc, doc,
  orderBy, query, serverTimestamp
} from 'firebase/firestore';
import { X, Trash2 } from 'lucide-react';

export default function Guestbook() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim() || !password.trim()) return;
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      password,
      createdAt: serverTimestamp(),
    });
    setName('');
    setMessage('');
    setPassword('');
    setIsOpen(false);
    fetchComments();
  };

  const handleDelete = async (item) => {
    const input = prompt('비밀번호를 입력하세요');
    if (input !== item.password) {
      alert('비밀번호가 틀렸습니다');
      return;
    }
    await deleteDoc(doc(db, 'guestbook', item.id));
    fetchComments();
  };

  return (
    <div className="guestbook-section">
      <div className="guestbook-title">GUESTBOOK</div>

      <button className="guestbook-write-btn" onClick={() => setIsOpen(true)}>
        축하 메시지 남기기 ✉️
      </button>

      {/* 목록 */}
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

      {/* 모달 */}
      {isOpen && (
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
      )}
    </div>
  );
}