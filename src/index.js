import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
import imgTrash from "../assets/trash-2.svg"
import {LoginForm} from './login'

const Item = ({ id, author, dateAdded, text }) => (
  <div class="card small">
    <div class="section dark">
      <div class="row">
        <div class="col-sm-11">
          <small>[{ id }]</small> { author }
        </div>
        <div class="col-sm-1">
          <span ><img class="closebtn" src={ imgTrash }></img></span>
        </div>
      </div>
    </div>
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
        <div class="col-md-1"></div>
        <div class="col-md-10">
        <div class="row">
            {state.items.map( item  => (
              <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
            ))}
        </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </main>
  ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();