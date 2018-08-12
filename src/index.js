import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
import imgTrash from "../assets/trash-2.svg"
import { LoginForm } from './login'
import { DeleteItem, AddItem } from './firebase'

const Delete = (id) => (state) => [{
  ...state,
},
DeleteItem({
  props: {
    collection: "items",
    item: id,
    action: ItemDeleted(id)
  }
})]

const ItemDeleted = (id) => (state) => ({
  ...state,
  deleted: id
})


const UpdateNewTodo = (state, { target: { value } }) => ({
  ...state,
  newtodo: value
})

const NewTodo = (state) => [{
  ...state
},
AddItem({
  props: {
    collection: "items",
    text: state.newtodo,
    author: state.loginData.username,
    dateAdded: new Date(),
    action: TodoAdded(state.newtodo)
  }
}
)]

const TodoAdded = (text) => (state) => ({
  ...state,
  added: text,
  newtodo: ""
})


const Item = ({ id, author, dateAdded, text }) => (
  <div class="card small">
    <div class="section dark">
      <div class="row">
        <div class="col-sm-11">
          <small>[{id}]</small> {author}
        </div>
        <div class="col-sm-1">
          <span onClick={Delete(id)} ><img class="closebtn" src={imgTrash}></img></span>
        </div>
      </div>
    </div>
    <div class="section">{text}</div>
    <div class="section dark"><small>{dateAdded.toDate().toLocaleString()} </small></div>
  </div>
)

const ItemsList = ({ state }) => (
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div class="row">
        {
          state.items.map(item => (
            <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
          ))
        }
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>
)

const InputForm = ({ state }) => (
  <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
      <div class="input-group">
        <label for="newtodo">Todo: </label>
        <input placeholder="Add a new todo..." onInput={UpdateNewTodo} value={state.newtodo} />
        <div class="button-group">
          <button class="btn" onClick={NewTodo}><span class="icon-bookmark"></span> New</button>
        </div>
      </div>
    </div>
    <div class="col-sm-1"></div>
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
      <div class="columns">
        <div class="column col-3 col-xs-1"></div>
        <div class="column col-6 col-xs-10">
          <LoginForm state={state} />
        </div>
        <div class="column col-3 col-xs-1"></div>
      </div>
      <div class="columns">
        <div class="column col-3 col-xs-1"></div>
        <div class="column col-6 col-xs-10">
        {state.loginData.loggedin === "yes" ? <ItemsList state={state} /> : ""}
        </div>
        <div class="column col-3 col-xs-1"></div>
      </div>
      <div class="columns">
        <div class="column col-3 col-xs-1"></div>
        <div class="column col-6 col-xs-10">
        {state.loginData.loggedin === "yes" ? <InputForm state={state} /> : ""}
        </div>
        <div class="column col-3 col-xs-1"></div>
      </div>

    </main>
  ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();