import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const storage = getStorage(firebaseApp);

export { firebaseApp, storage, auth };
