import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDZ1Yu8ZS1Ta7FGWyneE5vMzdI5htwhL74",
  authDomain: "to-do-dd77b.firebaseapp.com",
  projectId: "to-do-dd77b",
  storageBucket: "to-do-dd77b.appspot.com",
  messagingSenderId: "733256396420",
  appId: "1:733256396420:web:6872ca53a8cbaccf11dcd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()// for authentication
const provider = new GoogleAuthProvider() // for provider

const db = getFirestore(app)

export {db,auth,provider}