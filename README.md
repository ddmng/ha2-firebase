# ha2-firebase
Exploring the new Hyperapp V2 WIP. A test with Firebase and PWA.

Sample TODO application with HAv2. Todos:

* remove global state (see https://github.com/hyperapp/hyperapp/issues/672#issuecomment-381606947)
* ~~form for adding~~
* ~~delete button~~
* ~~refactoring~~
* ~~styling~~
* check if it's the correct way to use HAv2
* add devtools

## How to run

Clone the repository:

```bash
git clone https://github.com/ddmng/ha2-firebase.git
```

Enter in the `local_modules` directory, clone hyperapp sources and change to branch V2:

```bash
cd ha2-firebase/local_modules/
git clone https://github.com/hyperapp/hyperapp.git
cd hyperapp
git checkout V2
```

Come back to the project's root and start the dev mode:

```bash
cd ../../
npm install
npm start
```

## How to Deploy
Follow the instructions to install Firebase tools on your host.
Assuming that you have access rights to the configured Firebase Account, issue a `firebase login` followed by a `firebase deploy`.

**NOTE**: the deploy script uses *workbook* to generate the service worker.

To change the Firebase account, look at the first lines of `firebase.js` files.

Firebase Cloud Datastore should contain a database called `items` to host the todos.