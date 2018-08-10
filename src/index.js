import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
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
  action: FillItems
})]

const LoginError = (state) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "error"
  }
})



const FillItems = (state, items) => ({
  ...state,
  querying: false,
  items: items
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
      <div class="button-group">
          <button onClick={Login} disabled={ (state.loginData.loggedin === "yes" || state.loginData.loggedin === "in_progress") }>
          <span class="icon-user"></span> Login</button>
      </div>
    </div>
  </div>
)

const Item = ({ id, author, dateAdded, text }) => (
  <div class="card small">
    <div class="section dark"><small>[{ id }]</small> { author }</div>
    <div class="section">{ text }</div>
    <div class="section dark"><small>{ dateAdded.toDate().toLocaleString() } </small></div>
  </div>
)

app({
  init: {
    loginData: {
      username: "a@a.com",
      password: "123456",
      loggedin: "no",
    },
    querying: false,
    items: []
  },
  view: (state) => (
  <main>
    <div class="container">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="row">
            <LoginForm state={state} />
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>

      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
        <div class="row">
            {state.items.map( item  => (
              <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
            ))}
        </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </main>
  ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();