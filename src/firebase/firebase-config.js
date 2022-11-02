// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP394MZJnD1A3kkdwIq7rbOeqVTnN5m4k",
  authDomain: "appchat-e24f9.firebaseapp.com",
  projectId: "appchat-e24f9",
  storageBucket: "appchat-e24f9.appspot.com",
  messagingSenderId: "485565957951",
  appId: "1:485565957951:web:4df3641fb844f207a3b58a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export { app, auth, storage, db };
