import firebase from '@firebase/app';
import '@firebase/firestore'
import "firebase/auth";
import { makeEffect } from './utils'

/* Firebase configuration */
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvOqs9TkUxEM184yIFLCFhNaCsgxHzPTc",
    authDomain: "hyperapp-38ccc.firebaseapp.com",
    databaseURL: "https://hyperapp-38ccc.firebaseio.com",
    projectId: "hyperapp-38ccc",
    storageBucket: "hyperapp-38ccc.appspot.com",
    messagingSenderId: "220388866281"
};

/* Initialize firebase stuff */
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};
db.settings(settings);
const itemsCollection = "items";

/* Query for items list */
export const SyncItems = (props) => ({
    effect: syncItemsEffect,
    props: props
})

const syncItemsEffect = ({ props }, dispatch) =>
    db.collection(itemsCollection).onSnapshot(querySnapshot => {
        console.log("Received update from firebase!", querySnapshot)

        const items = []
        querySnapshot.docs
            .sort((a, b) => (a.data().dateAdded > b.data().dateAdded))
            .forEach((doc) => {
                items.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
        dispatch(props.success, items)
    }, e => {
        console.error("Error querying resource", e)
        dispatch(props.failure);
    })


/* Login */
export const Login = (props) => ({
    effect: loginEffect,
    props: props
})

const loginEffect = ({ props }, dispatch) => {
    console.log("Logging in with props: ", props)

    // Added to avoid requiring Google login
    if (props.anonymous === true) {
        console.log("Anonyous login set")
        dispatch(props.success, {
            username: "anonymous"
        })
        return;
    }
    let savedEmail = localStorage.getItem('email')
    if (savedEmail) {
        dispatch(props.success, {
            username: savedEmail
        })
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log("Signing in with Google")
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log("Auth: ", result.user.email)
            localStorage.setItem('email', result.user.email);
            localStorage.setItem('token', result.credential.accessToken);
            dispatch(props.success, {
                username: result.user.email
            })
        }).catch(function (error) {
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.error("Error in auth: ", errorMessage)
            dispatch(props.failure, error)
        });
    }
}

/* Logout */
export const Logout = (props) => ({
    effect: logoutEffect,
    props: props
})

const logoutEffect = ({ props }, dispatch) => {
    console.log("Logging out")

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        localStorage.removeItem('email');
        localStorage.removeItem('token');

        dispatch(props.success)
    }).catch(function (error) {
        // An error happened.
        console.error("Logout error: ", error)
        dispatch(action.failure, error)
    });
}

export const DeleteItem = (props) => ({
    effect: deleteItemEffect,
    props: props
})

const deleteItemEffect = ({ props }, dispatch) => {
    db.collection(itemsCollection).doc(props.item).delete().then(
        () => dispatch(props.success, props.item)
    ).catch(error => {
        console.log("Error deleting", props.item, error)
        dispatch(props.failure, error)
    })
}

export const AddItem = (props) => ({
    effect: addItemEffect,
    props: props
})

const addItemEffect = ({ props }, dispatch) => {
    db.collection(itemsCollection).doc().set({
        author: props.author,
        text: props.text,
        dateAdded: props.dateAdded
    }).then(
        () => dispatch(props.success, props.item)
    ).catch(error => {
        console.error("Error deleting", props.item, error)
        dispatch(props.failure, error)
    }
    )
}