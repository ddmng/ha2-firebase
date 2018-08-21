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


const LoginForm = ({ state }) => (
  <div class="container">
    <form onSubmit={Login}>
      <div class="row centered">
        <h3>Lista della spesa</h3>

        <input class="form-input" autofocus placeholder="username" onInput={UpdateUsername} value={state.loginData.username} />

        <input class="form-input" type="password" placeholder="password" onInput={UpdatePassword} value={state.loginData.password} />

        <div class="btn-login">
          <button class="btn btn-primary" type="submit" disabled={(state.loginData.loggedin === "in_progress")}>
            <i class="fas fa-sign-in-alt"></i></button>
        </div>
      </div>
    </form>
  </div>
)

export { LoginForm }