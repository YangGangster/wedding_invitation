import { db } from '../config/firebase';
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, orderBy, query, serverTimestamp
} from 'firebase/firestore';

export const getGuestbook = async () => {
  const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addGuestbook = async ({ name, message, password }) => {
  await addDoc(collection(db, 'guestbook'), {
    name,
    message,
    password,
    createdAt: serverTimestamp(),
  });
};

export const deleteGuestbook = async (item) => {
  const input = prompt('비밀번호를 입력하세요');
  if (input !== item.password) {
    alert('비밀번호가 틀렸습니다');
    return false;
  }
  await deleteDoc(doc(db, 'guestbook', item.id));
  return true;
};