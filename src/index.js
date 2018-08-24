import "/scss/style.scss";
import { app, h } from "/local_modules/hyperapp/src/index";
import { LoginForm, login, state as authState } from "./auth";
import { InputForm, ItemsList } from "./items";
import { Header } from "./header";
import { ShowState } from "./utils";

const initialState = {
  ...authState,
  querying: false,
  items: [],
  allowAnonymous: true
};

app({
  init: login(initialState),
  view: state => (
    <main>
      <header>
        {state.loginData.loggedin === "yes" ? <Header state={state} /> : ""}
      </header>

      <section class="login">
        {state.loginData.loggedin !== "yes" ? <LoginForm state={state} /> : ""}
      </section>

      <section class="newitem">
        {state.loginData.loggedin === "yes" ? <InputForm state={state} /> : ""}
      </section>

      <section class="itemslist">
        {state.loginData.loggedin === "yes" ? <ItemsList state={state} /> : ""}
      </section>

      <footer>
        <ShowState state={state} />
      </footer>
    </main>
  ),
  subscribe: s => console.log("STATE: ", s),
  container: document.querySelector("body")
});

console.clear();
