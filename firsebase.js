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
  apiKey: "AIzaSyBKxaSP2OruP9qZOKRB4j4_MTbon-BKCuc",
  authDomain: "reactnative-79949.firebaseapp.com",
  projectId: "reactnative-79949",
  storageBucket: "reactnative-79949.appspot.com",
  messagingSenderId: "442933355508",
  appId: "1:442933355508:web:f326c7710c68c0ecaecfa1",
  measurementId: "G-GDNKCWR7BJ"
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