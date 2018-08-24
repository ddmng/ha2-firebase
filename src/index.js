import '/scss/style.scss'
import {
  app,
  h
} from "/local_modules/hyperapp/src/index";
import { LoginForm, Login } from './auth'
import { InputForm, ItemsList } from './items'
import { Header } from './header'

const initialState = {
  loginData: {
    username: "",
    loggedin: "no"
  },
  querying: false,
  items: [],
  anonymous: true
}

app({
  init: Login(initialState),
  view: (state) => (
    <main>
      <header>
        {state.loginData.loggedin === "yes" ? <Header state={state} /> : "" }
      </header>

      <section class="login">
        {state.loginData.loggedin !== "yes" 
          ? <LoginForm state={state} /> 
          : ""}
      </section>

      <section class="newitem">
        {state.loginData.loggedin === "yes" ? <InputForm state={state} /> : ""}
      </section>

      <section class="itemslist">
        {state.loginData.loggedin === "yes" ? <ItemsList state={state} /> : ""}
      </section>

      <footer>

      </footer>
    </main>
  ),
  subscribe: (s) => console.log("STATE: ", s),
  container: document.querySelector("body")
});

console.clear();
