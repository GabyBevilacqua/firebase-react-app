// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxbHnHWsZRqtVlgdrNbw_CK703zhFRifE",
  authDomain: "appreactfirebase-143be.firebaseapp.com",
  projectId: "appreactfirebase-143be",
  storageBucket: "appreactfirebase-143be.firebasestorage.app",
  messagingSenderId: "788177161709",
  appId: "1:788177161709:web:886f7cf0515ee93f6d6be4",
  measurementId: "G-7HJ0PQJ438"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };