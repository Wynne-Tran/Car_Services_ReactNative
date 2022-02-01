// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore} from '@firebase/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbMJKgzvuEWKU6gDJuEJfLEA6msu7CyZk",
  authDomain: "motorhub-cd08f.firebaseapp.com",
  projectId: "motorhub-cd08f",
  storageBucket: "motorhub-cd08f.appspot.com",
  messagingSenderId: "130159185649",
  appId: "1:130159185649:web:0eef40f2b7b43b9bfaa350",
  measurementId: "G-91P0ECF9GH"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}
else{
    app = firebase.app()
}

const db = getFirestore(app)
const auth = firebase.auth()
const storage = firebase.storage()
export {auth, db, storage} ;