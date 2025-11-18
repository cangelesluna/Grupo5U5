
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCXu4krSX5BzeiGvTKxcVw9gTwSV-KkeAc",
  authDomain: "proyecto-fitlife-u4.firebaseapp.com",
  projectId: "proyecto-fitlife-u4",
  storageBucket: "proyecto-fitlife-u4.firebasestorage.app",
  messagingSenderId: "330516709810",
  appId: "1:330516709810:web:ac0da804cb94e7dbe6e4ab"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);