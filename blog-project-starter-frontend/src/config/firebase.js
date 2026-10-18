import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-pL9uG8JNZTuwyjCUfR4D1mwK0wWOFuQ",
  authDomain: "blog-app-eae6c.firebaseapp.com",
  projectId: "blog-app-eae6c",
  storageBucket: "blog-app-eae6c.firebasestorage.app",
  messagingSenderId: "391932130567",
  appId: "1:391932130567:web:0bee95dfee13e8bd1501a2",
  measurementId: "G-19W65TH5K5"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);