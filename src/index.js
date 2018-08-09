import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
import {
  Http
} from "/local_modules/fx/src/index";
import hh from "/local_modules/hyperscript-helpers/src/index";
const {
  main,
  input,
  button,
  h2,
  h4
} = hh(h);
import {
  fireBaseLogin
} from './firebase';

const Login = state => [{
    ...state,
    loggedin: "in_progress"
  },
  {
    props: {
      username: state.username,
      password: state.password
    },
    effect: fireBaseLogin
  }
]


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
    loggedin: "no"
  },
  view: ({
      loggedin
    }) =>
    main({},
      input({
        placeholder: "username",
        onInput: UpdateUsername
      }),
      input({
        placeholder: "password",
        onInput: UpdatePassword
      }),
      button({
          onClick: Login,
          disabled: loggedin !== "no"
        },
        "Login"),
    ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();