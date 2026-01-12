import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: replace with production firebase config
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC4erRGEUOPVfQr79ooe9LYFEtHrRbgeGo",
  authDomain: "setra-app.firebaseapp.com",
  projectId: "setra-app",
  storageBucket: "setra-app.firebasestorage.app",
  messagingSenderId: "623978303360",
  appId: "1:623978303360:web:6eee7c53f2cac82ca33b65",
  measurementId: "G-8CFSPD9X4P"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'setra-app';

export { app, auth, db, appId };
