import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
import imgTrash from "../assets/trash-2.svg"
import { LoginForm } from './login'
import { DeleteItem, AddItem } from './firebase'
import { ItemsManagement } from './items'

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
        <ItemsManagement state={state}/>
    </main>
  ),
  subscribe: console.log,
  container: document.querySelector("#app")
});

console.clear();