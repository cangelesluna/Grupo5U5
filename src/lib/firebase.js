// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOm_dVhveLM2P-nbaMzk19gxvMsqtgTsc",
  authDomain: "fitlife-u4.firebaseapp.com",
  projectId: "fitlife-u4",
  storageBucket: "fitlife-u4.firebasestorage.app",
  messagingSenderId: "497724041285",
  appId: "1:497724041285:web:e6c8901cb03e3ca3269b2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
