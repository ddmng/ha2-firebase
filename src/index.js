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
    loggedin: "in_progress"
  },
  FirebaseLogin({
    props: {
      username: state.username,
      password: state.password
    },
    action: LoginSuccess,
    error: LoginError
  })
]

const LoginSuccess = (state) => ({
  ...state,
  loggedin: "yes"
})

const LoginError = (state) => ({
  ...state,
  loggedin: "error"
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
  username: value
});

const UpdatePassword = (state, {
  target: {
    value
  }
}) => ({
  ...state,
  password: value
});

const LoginForm = (state) => (
  h('div', {
    id: "loginform",
    class: state.loggedin === "yes"?"hidden":"",
  }, [
    h('h3', {}, 'Welcome to My App'),
    h('input', {
      placeholder: "username",
      onInput: UpdateUsername,
      value: state.username
    }),
    h('input', {
      placeholder: "password",
      onInput: UpdatePassword,
      value: state.password
    }),
    h('button', {
        onClick: Login,
        disabled: state.loggedin === "yes" || state.loggedin === "in_progress"
      },
      "Login"),
  ])
)

const TestForm = () => (
  h('h1', {}, [])
)

app({
  init: {
    username: "a@a.com",
    password: "123456",
    loggedin: "no",
    querying: false,
    items: []
  },
  view: (state) =>
    h('main', {}, [
      LoginForm(state),
      TestForm(),
      
      h('button', {
          onClick: Query,
          disabled: (state.loggedin !== "yes") || (state.querying === true)
        },
        "Query"),
      h('div', {},
        state.items.map(item =>
          h('li', {
            id: `li-${item.id}`
          }, item.data.author)
        )
      )
    ]),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();