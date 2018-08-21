import { h } from "/local_modules/hyperapp/src/index";
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
    ...state,
    adding: true
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
    newtodo: "",
    adding: false
})


const Item = ({ id, author, dateAdded, text }) => (
    <div class="container">
        <div class="row">
            <h5>{text}</h5>
            {dateAdded.toDate().toLocaleString()}
            {author}
            <button onClick={Delete(id)} class="btn btn-delete"><i class="fa fa-trash-alt"></i></button>
        </div>
    </div>

)

export const ItemsList = ({ state }) => (
    <div class="container">
        <div class="row">
            {
                state.items.map(item => (
                    <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
                ))
            }
        </div>
    </div>
)

export const InputForm = ({ state }) => (
    <div class="container">
        <form onSubmit={NewTodo} >
        <div class="row">
            <label class="input-label" for="newtodo">Todo: </label>
            <input class="form-input" 
                id="todoitem"
                placeholder="Add a new todo..."
                onInput={UpdateNewTodo} 
                value={state.newtodo}
                disabled={state.adding} />
            <button class="btn btn-primary"
                onClick={NewTodo}
                disabled={state.adding}><i class="fa fa-plus"></i></button>
        </div>
        </form>
    </div>
)
