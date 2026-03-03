import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzdPzj0U06Eqqm1ey5ioD5HGycFa8iN2I",
  authDomain: "ming-gang-wedding-invi.firebaseapp.com",
  projectId: "ming-gang-wedding-invi",
  storageBucket: "ming-gang-wedding-invi.firebasestorage.app",
  messagingSenderId: "11663063604",
  appId: "1:11663063604:web:6d718818278475b7f56861",
  measurementId: "G-DP1J8YY0ZE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);