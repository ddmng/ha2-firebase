import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
    apiKey: "AIzaSyBvOqs9TkUxEM184yIFLCFhNaCsgxHzPTc",
    authDomain: "hyperapp-38ccc.firebaseapp.com",
    databaseURL: "https://hyperapp-38ccc.firebaseio.com",
    projectId: "hyperapp-38ccc",
    storageBucket: "hyperapp-38ccc.appspot.com",
    messagingSenderId: "220388866281"
};
firebase.initializeApp(config);

function fireBaseLogin() {
    console.log("Login to firebase in progress")
    firebase.auth().signInWithEmailAndPassword("daneelrolivaw1@gmail.com", "Password1").then(e => {
        console.log("Authenticated", e)
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Login error", errorCode, errorMessage)
        // ...
    });
}

var db = firebase.firestore();


// db.collection("items").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id}`, doc.data());
//     });
//   });


export {
    firebase,
    db,
    fireBaseLogin
}