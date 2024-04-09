import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.NEXT_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

let firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// let auth = getAuth();
let db = getDatabase(firebaseApp);
let firestore = getFirestore(firebaseApp);

const initializeFirebaseApp = () =>
  !getApps().length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage(firebaseApp, "gs://goraku-e7cfb.appspot.com");
export { firebaseApp, db, firestore, initializeFirebaseApp, storage };
