import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
    appId: process.env.REACT_APP_APPLICATION_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };


  firebase.initializeApp(firebaseConfig);

  const eleveightDB = firebase.firestore();
  const eleveightAuth = firebase.auth();
  const eleveightStorage = firebase.storage();
  const timestamp = firebase.firestore.timestamp;

  export{eleveightDB, eleveightAuth, eleveightStorage, timestamp};