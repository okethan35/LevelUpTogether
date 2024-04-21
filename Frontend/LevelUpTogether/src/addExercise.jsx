import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyCpz8slD9gpJTBf38K7JmtYFpgHcvniLBs",
  authDomain: "leveluptogether-e7502.firebaseapp.com",
  projectId: "leveluptogether-e7502",
  storageBucket: "leveluptogether-e7502.appspot.com",
  messagingSenderId: "403257475271",
  appId: "1:403257475271:web:f3c070a6eef7abc6697ee2",
  measurementId: "G-WKXMXEZZPK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

function addExercise() {
    return(
u
    )
}