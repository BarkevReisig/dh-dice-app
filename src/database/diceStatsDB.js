// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBq3Sp02wjPMu6ibIGP-9A1W3CJ27B5c60',
  authDomain: 'de2-dice-app-db.firebaseapp.com',
  projectId: 'de2-dice-app-db',
  storageBucket: 'de2-dice-app-db.appspot.com',
  messagingSenderId: '228429744425',
  appId: '1:228429744425:web:cfa9f3981e9f44d3e3cf38'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
