import { h } from "/local_modules/hyperapp/src/index";

import {
  FirebaseLogin,
  FirebaseQuery,
  FirebaseLogout,
} from './firebase';

export const Logout = state => [(
  {
    loginData: {
      username: "a@a.com",
      password: "123456",
      loggedin: "yes"
    },
    querying: true,
    items: []
  }
),
FirebaseLogout({
  action: LogoutSuccess
})]


const LogoutSuccess = (state) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "no",
  }
})

export const Login = state => [(
  {
    loginData: {
      username: "a@a.com",
      password: "123456",
      loggedin: "in_progress"
    },
    querying: false,
    items: []
  }),
FirebaseLogin({
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
        {state.loginData.loggedin == "in_progress" ? <h2>Login in progress...</h2> : <button class="btn btn-primary" onClick={Login}>Login</button> }
      </div>
    </div>
  </div>
)
