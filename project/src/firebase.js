// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA7ifzjIO70DJDfcau27aY-71TqdALHwFc",
  authDomain: "todo2-78367.firebaseapp.com",
  projectId: "todo2-78367",
  storageBucket: "todo2-78367.firebasestorage.app",
  messagingSenderId: "794879345100",
  appId: "1:794879345100:web:d198de6b0bcef6ade65d69",
  measurementId: "G-9FBWT6H2FC",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth ,db};

