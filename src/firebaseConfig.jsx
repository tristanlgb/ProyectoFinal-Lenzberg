// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { apiKey: "AIzaSyAcT2rO1y1GuyyMwi3NkF0mAawKbFwlE74",
  authDomain: "pokestore-c9e6c.firebaseapp.com",
  projectId: "pokestore-c9e6c",
  storageBucket: "pokestore-c9e6c.firebasestorage.app",
  messagingSenderId: "288367313676",
  appId: "1:288367313676:web:6206fcf8f2ed19c7c87f29",
  measurementId: "G-19KYDGMCXV"},

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
