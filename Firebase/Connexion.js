// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCXPzfelq9NtWtNbacLWK_nGGKv4-7ixM",
  authDomain: "appchap-19048.firebaseapp.com",
  projectId: "appchap-19048",
  storageBucket: "appchap-19048.appspot.com",
  messagingSenderId: "528359312608",
  appId: "1:528359312608:web:7f3daad3e8725404da9485",
  measurementId: "G-5LPXH3YNN4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase();
const db = getFirestore(app);
const storage = getStorage();
export {app, auth,db, database,storage}