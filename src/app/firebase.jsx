// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import React from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// const { applicationDefault, cert } = require('firebase-admin/app');
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZblNziGTOzLRzavHFNLpbEG6VuwB83Es",
  authDomain: "monina-s.firebaseapp.com",
  projectId: "monina-s",
  storageBucket: "monina-s.appspot.com",
  messagingSenderId: "96349885551",
  appId: "1:96349885551:web:4cacb7da434dd4dd2d699a",
  measurementId: "G-181257QX32",
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);


