
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app")

// Add the Firebase products that you want to use
require("firebase/auth")
require("firebase/database")


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD4_xJBrgwlEoSE2kHhM00hFpVld70UDWw",
  authDomain: "awesome-todo-9ae15.firebaseapp.com",
  databaseURL: "https://awesome-todo-9ae15.firebaseio.com",
  projectId: "awesome-todo-9ae15",
  storageBucket: "awesome-todo-9ae15.appspot.com",
  messagingSenderId: "524723731124",
  appId: "1:524723731124:web:5f3c734e973ce3a2da75e1",
  measurementId: "G-T74G09V62B"
}
// Initialize Firebase
let  firebaseApp = firebase.initializeApp(firebaseConfig)
// firebase.analytics();
let firebaseAuth = firebase.auth()
let firebaseDb = firebase.database()

export { firebaseAuth, firebaseDb }
