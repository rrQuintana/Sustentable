// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyHZDrQ1pyF1tkyUa2cKOPtYXs1v1PlwQ",
  authDomain: "swapper-stu.firebaseapp.com",
  projectId: "swapper-stu",
  storageBucket: "swapper-stu.appspot.com",
  messagingSenderId: "965342473110",
  appId: "1:965342473110:web:bc1f6ecd28377960a5cbb7",
  measurementId: "G-S0EEEE4VL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export {app, auth,provider, db, storage};