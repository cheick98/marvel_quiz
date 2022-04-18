import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyD-tzm11JhwBW9UG5ed_2buTNPGcGSJF2g",
  authDomain: "marvel-quiz-276a5.firebaseapp.com",
  projectId: "marvel-quiz-276a5",
  storageBucket: "marvel-quiz-276a5.appspot.com",
  messagingSenderId: "823724819517",
  appId: "1:823724819517:web:e50edb76a3692656db5654",
};
// Initialize Firebase
const app = initializeApp(config);
export const auth = getAuth(app);
const db = getFirestore(app);
export { setDoc, getDoc };

//inscription
export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//connexion
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//deconnexion
export const logoutUser = () => {
  return signOut(auth);
};

//Recuperer le mot de passe
export const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

//Recuperation d'un utilisateur par son identifiant
export const user = (uid) => {
  return doc(db, `users/${uid}`);
};
