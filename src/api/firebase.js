import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'shoppy-bc774.firebaseapp.com',
  databaseURL:
    'https://shoppy-bc774-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'shoppy-bc774',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const login = () => {
  return signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  return signOut(auth);
};

export const onUserStateChanged = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
