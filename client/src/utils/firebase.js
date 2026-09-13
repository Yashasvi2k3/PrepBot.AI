
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-agent-85635.firebaseapp.com",
  projectId: "ai-interview-agent-85635",
  storageBucket: "ai-interview-agent-85635.firebasestorage.app",
  messagingSenderId: "459557241715",
  appId: "1:459557241715:web:a33009b155edfafddcbb06"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider};