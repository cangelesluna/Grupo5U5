import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXu4krSX5BzeiGvTKxcVw9gTwSV-KkeAc",
  authDomain: "proyecto-fitlife-u4.firebaseapp.com",
  projectId: "proyecto-fitlife-u4",
  storageBucket: "proyecto-fitlife-u4.firebasestorage.app",
  messagingSenderId: "330516709810",
  appId: "1:330516709810:web:ac0da804cb94e7dbe6e4ab",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
