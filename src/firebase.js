import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
    assign
} from "/local_modules/fx/src/utils.js"


var config = {
    apiKey: "AIzaSyBvOqs9TkUxEM184yIFLCFhNaCsgxHzPTc",
    authDomain: "hyperapp-38ccc.firebaseapp.com",
    databaseURL: "https://hyperapp-38ccc.firebaseio.com",
    projectId: "hyperapp-38ccc",
    storageBucket: "hyperapp-38ccc.appspot.com",
    messagingSenderId: "220388866281"
};
firebase.initializeApp(config);

function loginEffect(props, dispatch) {

    console.log("Login to firebase in progress as", props.props.username)

    firebase.auth().signInWithEmailAndPassword(props.props.username, props.props.password)
        .then(result => {
            console.log("Authenticated", result)
            dispatch(props.action, result)
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Login error", errorCode, errorMessage)

            dispatch(props.error, error)
        });
}

export function FirebaseLogin(props) {
    console.log("props: ", props)
    return {
        props:props,
        effect: loginEffect
    }
}

var db = firebase.firestore();


// db.collection("items").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id}`, doc.data());
//     });
//   });