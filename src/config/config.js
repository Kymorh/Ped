import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg8XO6vF29Dq7QUHbRI6XuxG8FuWv46Rk",
  authDomain: "test-app-152b3.firebaseapp.com",
  projectId: "test-app-152b3",
  storageBucket: "test-app-152b3.firebasestorage.app",
  messagingSenderId: "835850117304",
  appId: "1:835850117304:web:1cc1c9a6cd5956eef0544d"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);