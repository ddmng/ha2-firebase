import { h } from "/local_modules/hyperapp/src/index";

import {
  FirebaseLogin,
  FirebaseQuery,
} from './firebase';

const Login = state => [{
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "in_progress"
  }
},
FirebaseLogin({
  username: state.loginData.username,
  password: state.loginData.password,
  action: LoginSuccess,
  error: LoginError,
})
]

const LoginSuccess = (state, {username}) => [{
  ...state,
  loginData: {
    ...state.loginData,
    username: username,
    loggedin: "yes",
    querying: true
  }
},
FirebaseQuery({
  props: {
    username: state.loginData.username
  },
  action: LoadItems
})]

const LoginError = (state) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "error"
  }
})

const UpdateUsername = (state, {
  target: {
    value
  }
}) => ({
  ...state,
  loginData: {
    ...state.loginData,
    username: value
  }
});

const UpdatePassword = (state, {
  target: {
    value
  }
}) => ({
  ...state,
  loginData: {
    ...state.loginData,
    password: value
  }
});

const LoadItems = (state, items) => ({
  ...state,
  querying: false,
  items: items
})


export const LoginForm = ({ state }) => (
  <div class="container">
    <div class="container">
      <div class="row">
      <button class="btn btn-primary" onClick={Login}>Login</button>
      </div>
    </div>
  </div>
)
