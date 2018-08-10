import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
    assign
} from "/local_modules/fx/src/utils.js"

// Firebase configuration
var config = {
    apiKey: "AIzaSyBvOqs9TkUxEM184yIFLCFhNaCsgxHzPTc",
    authDomain: "hyperapp-38ccc.firebaseapp.com",
    databaseURL: "https://hyperapp-38ccc.firebaseio.com",
    projectId: "hyperapp-38ccc",
    storageBucket: "hyperapp-38ccc.appspot.com",
    messagingSenderId: "220388866281"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

function loginEffect(props, dispatch) {
    console.log("Logging in with props: ", props)
    firebase.auth().signInWithEmailAndPassword(props.username, props.password)
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

export function FirebaseLogin({action, error, username, password}) {
    return {
        props: {
            action, 
            error,
            username,
            password
        },
        effect: loginEffect
    }
}

function queryEffect(props, dispatch) {
    db.collection(props.props.collection).onSnapshot(querySnapshot => {
    //db.collection(props.props.collection).get().then((querySnapshot) => {
        const items = [] 
        querySnapshot.forEach((doc) => {
            items.push({id: doc.id, data: doc.data()} )
        });
        dispatch(props.action, items)
    }, e => {
         console.error("Error querying resource", e)
    });
}

export function FirebaseQuery(props) {
    console.log("props: ", props)
    return {
        props: props,
        effect: queryEffect
    }
}