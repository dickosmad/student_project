import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
     databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    
    // authDomain: "student-project-80105.firebaseapp.com",
    // databaseURL: "https://student-project-80105.firebaseio.com",
    // projectId: "student-project-80105",
    // storageBucket: "student-project-80105.appspot.com",
    // messagingSenderId: "773939569491",
    // appId: "1:773939569491:web:adb4d8781cb0bdbf9fb7a6",
    // measurementId: " G-2MR0Z1KQPY"
  };
  // Initialize Firebase
  console.log(firebaseConfig);
  
firebase.initializeApp(firebaseConfig);

export default firebase;
