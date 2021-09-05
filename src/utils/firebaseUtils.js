import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { apiKey, authDomain, projectId } from './secret'

firebase.initializeApp({
  apiKey,
  authDomain,
  projectId
});

export const signInGoogle = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const callFunction = (name, data) => firebase.functions().httpsCallable(name)(data)
  .then(result => result.data);

export const getIdToken = () => firebase.auth().currentUser.getIdToken();