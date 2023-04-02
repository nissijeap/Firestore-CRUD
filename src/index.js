// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBggbyvWgM57WedVOyXuhWBqUB7dJ55e9M",
  authDomain: "fir-paglinawan.firebaseapp.com",
  projectId: "fir-paglinawan",
  storageBucket: "fir-paglinawan.appspot.com",
  messagingSenderId: "713900004451",
  appId: "1:713900004451:web:2bbf9809e8f66b35ee9456",
  measurementId: "G-J7QHKVR7ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)