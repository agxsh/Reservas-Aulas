import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDp46-kve__AbuUSZ_8Vw1L3kVodph-7ns",
  authDomain: "reservas-aulas-c12d6.firebaseapp.com",
  projectId: "reservas-aulas-c12d6",
  storageBucket: "reservas-aulas-c12d6.firebasestorage.app",
  messagingSenderId: "610241242873",
  appId: "1:610241242873:web:be898b2ab9df845308a428",
  measurementId: "G-JFWN5QZL0Y"}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)