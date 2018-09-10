import { h } from "/local_modules/hyperapp/src/index";

import { Login, Logout, SyncItems } from "./firebase";
import { ItemsLoad, ItemsLoadFail } from "./items";

export const state = {
  loginData: {
    username: "",
    loggedin: "no"
  }
};

export const logout = state => [
  {
    ...state,
    querying: true
  },
  Logout({
    success: logoutSuccess,
    failure: logoutFailure
  })
];

const logoutSuccess = state => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "no",
    username: ""
  }
});

const logoutFailure = (state, error) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "no",
    error: error
  }
});

export const login = state => [
  {
    ...state,
    loginData: {
      loggedin: "in_progress"
    }
  },
  Login({
    anonymous: state.allowAnonymous,
    success: loginSuccess,
    failure: loginError
  })
];

const loginSuccess = (state, { username }) => [
  {
    ...state,
    loginData: {
      ...state.loginData,
      username: username,
      loggedin: "yes"
    }
  },
  SyncItems({
    success: ItemsLoad,
    failure: ItemsLoadFail
  })
];

const loginError = (state, { error }) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "no",
    error: error
  }
});

export const LoginForm = ({ state }) => (
  <div class="container">
    <div class="container">
      <div class="row">
        {state.loginData.loggedin == "in_progress" ? (
          <h1>
            <i class="fa fa-spinner fa-spin" />
          </h1>
        ) : (
            <button class="btn btn-primary" onClick={login}>
              <i class="fa fa-sign-in-alt" />
            </button>
          )}
      </div>
    </div>
  </div>
);
