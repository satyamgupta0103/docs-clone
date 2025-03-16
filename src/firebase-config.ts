// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO : Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKWuLzugdr7jd_1JhUoKB9s4E0RqNzt3w",
  authDomain: "docs-clone-257f6.firebaseapp.com",
  projectId: "docs-clone-257f6",
  storageBucket: "docs-clone-257f6.firebasestorage.app",
  messagingSenderId: "505665174573",
  appId: "1:505665174573:web:7e55f7575501f3ac610ca4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
