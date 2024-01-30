// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA9bz1kzHBI0BWbLV-wUca3y5BzM2vEns",
  authDomain: "chronocraft-2f3e1.firebaseapp.com",
  projectId: "chronocraft-2f3e1",
  storageBucket: "chronocraft-2f3e1.appspot.com",
  messagingSenderId: "365471803777",
  appId: "1:365471803777:web:89f5a0cd53fe4832a1e080",
  measurementId: "G-709VKT9F95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export {auth,provider};