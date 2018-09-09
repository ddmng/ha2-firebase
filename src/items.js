import { h } from "/local_modules/hyperapp/src/index";
import { DeleteItem, AddItem } from "./firebase";

const Delete = (state, { id, text }) => [
  {
    ...state
  },
  DeleteItem({
    item: id,
    success: [itemDeleted, { text }],
    failure: itemDeleteFail
  })
];

const itemDeleted = (state, { text }) => ({
  ...state,
  deleted: text,
  error: ""
});

const itemDeleteFail = (state, error) => ({
  ...state,
  deleted: "",
  error: error
});

const newTodoUpdate = (state, { target: { value } }) => ({
  ...state,
  newtodo: value
});

const todoAdd = state => [
  {
    ...state,
    adding: true
  },
  AddItem({
    text: state.newtodo,
    author: state.loginData.username,
    dateAdded: new Date(),
    success: todoAdded,
    failure: todoAddFail
  })
];

const Undo = (state, {text}) => todoAdd({
  ...state,
  newtodo: text
})

const todoAdded = state => ({
  ...state,
  newtodo: "",
  adding: false,
  error: "",
  deleted: ""
});

const todoAddFail = (state, error) => ({
  ...state,
  adding: false,
  error: error
});

export const itemsLoad = (state, items) => ({
  ...state,
  querying: false,
  items: items
});

export const itemsLoadFail = state => ({
  ...state,
  querying: false,
  items: []
});

const Item = ({ id, author, dateAdded, text }) => (
  <div class="item-data w3-animate-bottom">
    <div>
      <div class="item-title">{text}</div>
      <div class="item-metadata">
        {author}, <small>{dateAdded.toDate().toLocaleDateString()}</small>
      </div>
    </div>
    <button onClick={[Delete, { id, text }]} class="btn btn-delete">
      <i class="fa fa-trash-alt" />
    </button>
  </div>
);

export const ItemsList = ({ state }) => (
  <div class="container">
    {state.items.map(item => (
      <div class="row item-row">
        <Item
          id={item.id}
          author={item.data.author}
          dateAdded={item.data.dateAdded}
          text={item.data.text}
        />
      </div>
    ))}
  </div>
);

export const InputForm = ({ state }) => (
  <div class="container">
    <div class="row">
      <form
        onsubmit={(_, event) => {
          event.preventDefault(true);
          return todoAdd;
        }}
      >
        <input
          class="form-input"
          id="todoitem"
          placeholder="Add a new todo..."
          onInput={newTodoUpdate}
          value={state.newtodo}
          disabled={state.adding}
        />
        <button
          class="btn btn-primary"
          type="submit"
          disabled={
            state.adding || !state.newtodo || state.newtodo.length === 0
          }
        >
          <i class="fa fa-plus" />
        </button>
        <button
          class="btn btn-warning"
          type="button"
          disabled={ !state.deleted }
          onClick= { [ Undo, {text: state.deleted}] }
        >
          <i class="fa fa-undo" />
        </button>
      </form>
    </div>
  </div>
);
