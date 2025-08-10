import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1kYclGN0QPdDU0-pz7L9tUVkX7kd6C_Q",
  authDomain: "my-firebase-project-836c4.firebaseapp.com",
  databaseURL: "https://my-firebase-project-836c4-default-rtdb.firebaseio.com",
  projectId: "my-firebase-project-836c4",
  storageBucket: "my-firebase-project-836c4.firebasestorage.app",
  messagingSenderId: "503498094466",
  appId: "1:503498094466:web:1d585727871f54ef58019b"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
