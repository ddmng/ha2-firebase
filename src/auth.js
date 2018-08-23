import { h } from "/local_modules/hyperapp/src/index";

import {
  FirebaseLogin,
  FirebaseQuery,
  FirebaseLogout,
} from './firebase';

export const Logout = state => [(
  {
    ...state,
    querying: true
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
      username: "",
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

const LoadItems = (state, items) => ({
  ...state,
  querying: false,
  items: items
})

export const LoginForm = ({ state }) => (
  <div class="container">
    <div class="container">
      <div class="row">
        {state.loginData.loggedin == "in_progress" ? <h1><i class="fa fa-spinner fa-spin"></i></h1> : <button class="btn btn-primary" onClick={Login}><i class="fa fa-sign-in-alt"></i></button> }
      </div>
    </div>
  </div>
)
