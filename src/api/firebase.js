import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
const database = getDatabase(app);

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

const adminUser = async (user) => {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
};

export const addNewProduct = async (product, imgURL) => {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imgURL,
    options: product.options.split(','),
  });
};

export const getProducts = async () => {
  return get(ref(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
};
