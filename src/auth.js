import { h } from "/local_modules/hyperapp/src/index";

import {
  loginEffect,
  logoutEffect,
  syncItemsEffect,
} from './firebase';

export const Logout = state => [(
  {
    ...state,
    querying: true
  }
),
logoutEffect({
  success: LogoutSuccess,
  failure: LogoutFailure
})]


const LogoutSuccess = (state) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "no",
  }
})

const LogoutFailure = (state, error) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "no",
    error: error
  }
})

export const Login = (state) => [(
  {...state,
    loginData: {
      loggedin: "in_progress"
    }
  }),
loginEffect({
  anonymous: state.anonymous,
  success: LoginSuccess,
  failure: LoginError,
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
syncItemsEffect({
  success: LoadItems,
  failure: LoadItemsFail
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

const LoadItemsFail = (state) => ({
  ...state,
  querying: false,
  items: []
})

export const LoginForm = ({ state }) => (
  <div class="container">
    <div class="container">
      <div class="row">
          {state.loginData.loggedin == "in_progress" 
        ? <h1><i class="fa fa-spinner fa-spin"></i></h1> 
        : <button class="btn btn-primary" onClick={Login}><i class="fa fa-sign-in-alt"></i></button> }
      </div>
    </div>
  </div>
)
