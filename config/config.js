import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';
import React, { Component } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyCCrCsC_ZOTtBXhUmWB8tGphpDajiul-vE",
  authDomain: "final-project-menza.firebaseapp.com",
  databaseURL: "https://final-project-menza.firebaseio.com",
  projectId: "final-project-menza",
  storageBucket: "final-project-menza.appspot.com",
  messagingSenderId: "959907896570",
  appId: "1:959907896570:web:861850853d9e76390d7d43",
  measurementId: "G-CNEC9JWDG2"
};

  firebase.initializeApp(firebaseConfig);

  export const f=firebase;
  export const database=firebase.database();
  export const auth=firebase.auth();
  export const storage=firebase.storage();
  //export const fs=firebase.firestore();
  export default f;