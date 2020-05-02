import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

firebase.initializeApp({
  apiKey: "AIzaSyDKh0zfGD-sdVC9UaF7qu0V40bFNZ6KPX4",
  authDomain: "muslimsdua.firebaseapp.com",
  projectId: "muslimsdua"
});

export const signInGoogle = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const callFunction = (name, data) => firebase.functions().httpsCallable(name)(data)
  .then(result => result.data);

export const getIdToken = () => firebase.auth().currentUser.getIdToken();