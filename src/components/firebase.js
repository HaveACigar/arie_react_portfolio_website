import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDdcGGw-GTieDUl-DQgRpK1vpTN36UvOGI",
  authDomain: "react-contact-form-26c58.firebaseapp.com",
  projectId: "react-contact-form-26c58",
  storageBucket: "react-contact-form-26c58.appspot.com",
  messagingSenderId: "482875075332",
  appId: "1:482875075332:web:76ffd1170e2f630503be51"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
