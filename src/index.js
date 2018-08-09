import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
// import hh from "/local_modules/hyperscript-helpers/src/index";
// const {
//   main,
//   input,
//   button,
//   div,
//   h3,
//   span
// } = hh(h);
import {
  FirebaseLogin,
  FirebaseQuery
} from './firebase';

const Login = state => [{
    ...state,
    loggedin: "in_progress"
  },
  FirebaseLogin({
    props: {
      username: state.username,
      password: state.password
    },
    action: LoginSuccess,
    error: LoginError
  })
]

const LoginSuccess = (state) => ({
  ...state,
  loggedin: "yes"
})

const LoginError = (state) => ({
  ...state,
  loggedin: "error"
})

const Query = state => [{
    ...state,
    querying: true
  },
  FirebaseQuery({
    props: {
      collection: "items"
    },
    action: FillItems
  })
]

const FillItems = (state, items) => ({
  ...state,
  querying: false,
  items: items
})

const UpdateUsername = (state, {
  target: {
    value
  }
}) => ({
  ...state,
  username: value
});

const UpdatePassword = (state, {
  target: {
    value
  }
}) => ({
  ...state,
  password: value
});

app({
  init: {
    username: "a@a.com",
    password: "123456",
    loggedin: "no",
    querying: false,
    items: []
  },
  view: ({
      username,
      password,
      loggedin,
      querying,
      items
    }) =>
    h('main', {}, [
      h('input', {
        placeholder: "username",
        onInput: UpdateUsername,
        value: username
      }),
      h('input', {
        placeholder: "password",
        onInput: UpdatePassword,
        value: password
      }),
      h('button', {
          onClick: Login,
          disabled: loggedin === "yes" || loggedin === "in_progress"
        },
        "Login"),
      h('button', {
          onClick: Query,
          disabled: (loggedin !== "yes") || (querying === true)
        },
        "Query"),
      items.map(item =>
        h('input', {
          value: item.author
        })
      )
    ]),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();