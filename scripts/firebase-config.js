import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAhHBy8T2I8nztDZziThL5p4RiVs3AmGPU",
  authDomain: "shopping-list-fff4a.firebaseapp.com",
  projectId: "shopping-list-fff4a",
  storageBucket: "shopping-list-fff4a.firebasestorage.app",
  messagingSenderId: "73708204221",
  appId: "1:73708204221:web:7f0aa0a56ec5fdca1707d4",
};


const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const db = getDatabase(app);

export { auth, db};