import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
import hh from "/local_modules/hyperscript-helpers/src/index";
const {
  main,
  input,
  button,
} = hh(h);
import {
  FirebaseLogin
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
    loggedin: "no"
  },
  view: ({
      username,
      password,
      loggedin
    }) =>
    main({},
      input({
        placeholder: "username",
        onInput: UpdateUsername,
        value: username
      }),
      input({
        placeholder: "password",
        onInput: UpdatePassword,
        value: password
      }),
      button({
          onClick: Login,
          disabled: loggedin === "yes" || loggedin === "in_progress"
        },
        "Login"),
    ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();