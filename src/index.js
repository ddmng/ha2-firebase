import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
// import hh from "/local_modules/hyperscript-helpers/src/index";
// const {
//   main,
//   input,
//   button,
//   div,
//   h3,
//   span
// } = hh(h);
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

const LoginSuccess = (state) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "yes"
  }
})

const LoginError = (state) => ({
  ...state,
  loginData: {
    ...state.loginData,
    loggedin: "error"
  }
})

const Query = state => [{
    ...state,
    querying: true
  },
  FirebaseQuery({
    props: {
      collection: "items"
    },
    action: FillItems
  })
]

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
  <div id="loginform" class={state.loginData.loggedin==="yes"?"hidden":""}>
    <h3>Welcome to my app</h3>
    <input placeholder="username" onInput={UpdateUsername} value={state.loginData.username} />
    <input placeholder="password" onInput={UpdatePassword} value={state.loginData.password} />
    <button onClick={Login} disabled={ (state.loginData.loggedin === "yes" || state.loginData.loggedin === "in_progress") }>Login</button>
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
      <LoginForm state={state} />
      <button onClick={Query} disabled= { (state.loginData.loggedin !== "yes") || (state.querying === true) }>Query</button>
      <div>
        {state.items.map( item  => (
          <li id={ item.id }> { item.data.author } </li>
        ))}
      </div>
  </main>
  ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();