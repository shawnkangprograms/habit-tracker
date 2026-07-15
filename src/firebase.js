import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyCaDed3DjoeWA_bwuoTQD0IziIIOm5PVDY",
authDomain: "habit-tracker-89cb0.firebaseapp.com",
projectId: "habit-tracker-89cb0",
storageBucket: "habit-tracker-89cb0.firebasestorage.app",
messagingSenderId: "623129139026",
appId: "1:623129139026:web:49161160a4a07794e04c8b" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
