// File: src/app/login/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC93eTXf6U_oWCXGo3GZe8erqkTugoSYfQ",
  authDomain: "blueberries-films.firebaseapp.com",
  projectId: "blueberries-films",
  storageBucket: "blueberries-films.firebasestorage.app",
  messagingSenderId: "552243728897",
  appId: "1:552243728897:web:d1cf24460ad82ed11b6600",
  measurementId: "G-XRHX3N71CY",
};

// Initialize Firebase App (prevents re-initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(app);

// ✅ EXPORT BOTH so all components can import what they need
export { app, auth };
