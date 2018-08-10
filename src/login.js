import { h } from "/local_modules/hyperapp/src/index";

import {
    FirebaseLogin,
    FirebaseQuery
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
    error: LoginError
  })
]

const LoginSuccess = (state) => [{
    ...state,
    loginData: {
      ...state.loginData,
      loggedin: "yes",
      querying: true
    }
  },
  FirebaseQuery({
    props: {
      collection: "items"
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
  
  
  const LoginForm = ( {state} ) => (
    <div id="loginform" class={ state.loginData.loggedin==="yes"?"hidden":"row"}>
      <div class="row">
        <h3>Welcome to my app</h3>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="username">Username</label>
          <input placeholder="username" onInput={UpdateUsername} value={state.loginData.username} />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input placeholder="password" onInput={UpdatePassword} value={state.loginData.password} />
        </div>
      </div>
      <div class="row">
          <div class="button-group">
            <button onClick={Login} disabled={ (state.loginData.loggedin === "yes" || state.loginData.loggedin === "in_progress") }>
            <span class="icon-user"></span> Login</button>
          </div>
        </div>
    </div>
  )

  export { LoginForm }