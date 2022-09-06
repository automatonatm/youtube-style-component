
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDVzSx0QOSVgm6MOOeeF7EO4qYrKXTKycA",
    authDomain: "clone-2eea5.firebaseapp.com",
    projectId: "clone-2eea5",
    storageBucket: "clone-2eea5.appspot.com",
    messagingSenderId: "889147123457",
    appId: "1:889147123457:web:86ebfa4be7c9099c3fdd00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const provider = new GoogleAuthProvider()

export default app;

