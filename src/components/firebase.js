// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtKlytLxboqAYbmskQdRqSI1Scen1SsMs",
  authDomain: "fakebook-c345a.firebaseapp.com",
  projectId: "fakebook-c345a",
  storageBucket: "fakebook-c345a.appspot.com",
  messagingSenderId: "60004969021",
  appId: "1:60004969021:web:d73b95d73e702318229854",
  measurementId: "G-B61MG93Y0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)