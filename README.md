# hyperapp TODO on Firebase

Exploring the new [Hyperapp](https://github.com/hyperapp/hyperapp) V2 WIP. A test with Firebase and PWA.

Sample TODO application with HAv2. Todos:

* remove global state (see https://github.com/hyperapp/hyperapp/issues/672#issuecomment-381606947)
* ~~form for adding~~
* ~~delete button~~
* ~~refactoring~~
* ~~styling~~
* check if it's the correct way to use HAv2
* add devtools

## Demo
Application is deployed at: https://hyperapp-38ccc.firebaseapp.com

## How to run

Clone the repository, including the Hyperapp sources in the submodule:

```bash
git clone --recurse-submodules https://github.com/ddmng/ha2-firebase.git
```

Enter in the Hyperapp submodule directory and change to branch V2:

```bash
cd local_modules/hyperapp
git checkout V2
```

Come back to the project's root and start the dev mode:

```bash
npm start
```

## How to Deploy
Assuming that you have access rights to the configured Firebase Account, issue a `firebase login` followed by a `firebase deploy`.

To change the Firebase account, look at the first lines of `firebase.js` files.

Firebase Cloud Datastore should contain a database called `items` to host the todos.