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
  state.loginData.loggedin !== "yes" &&
  <div class="container">
    <div class="columns">
      <div class="column col-12">
        <div class="form-group">
          <h3>Welcome to my app</h3>

          <input class="form-input" placeholder="username" onInput={UpdateUsername} value={state.loginData.username} />

          <input class="form-input" placeholder="password" onInput={UpdatePassword} value={state.loginData.password} />

          <button class="btn" onClick={Login} disabled={(state.loginData.loggedin === "yes" || state.loginData.loggedin === "in_progress")}>
            Login <i class="icon icon-forward"></i></button>

        </div>
      </div>
    </div>
  </div>
)

export { LoginForm }