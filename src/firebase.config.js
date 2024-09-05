// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAr0YA9bboHWYyZS_bXqFWMsV9XOJ0Il6c",
  authDomain: "akto-adda.firebaseapp.com",
  projectId: "akto-adda",
  storageBucket: "akto-adda.appspot.com",
  messagingSenderId: "714892692921",
  appId: "1:714892692921:web:ae1f4f067885f7b8ccba68",
  measurementId: "G-P5G2416W54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
