// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZP0XStNIOu_0tjFdfuZlGUj2m7YULisk",
  authDomain: "intj-82022.firebaseapp.com",
  databaseURL: "https://intj-82022-default-rtdb.firebaseio.com",
  projectId: "intj-82022",
  storageBucket: "intj-82022.firebasestorage.app",
  messagingSenderId: "691182097473",
  appId: "1:691182097473:web:ecf2e771cf4d47e7df22c0",
  measurementId: "G-HY99GS4FJV"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };