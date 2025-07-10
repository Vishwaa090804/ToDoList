// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ifzjIO70DJDfcau27aY-71TqdALHwFc",
  authDomain: "todo2-78367.firebaseapp.com",
  projectId: "todo2-78367",
  storageBucket: "todo2-78367.firebasestorage.app",
  messagingSenderId: "794879345100",
  appId: "1:794879345100:web:d198de6b0bcef6ade65d69",
  measurementId: "G-9FBWT6H2FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);