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
    <div class="row">
            <h5>{text}</h5>
            {dateAdded.toDate().toLocaleString()}
            {author}
            <button onClick={Delete(id)} class="btn btn-delete"><i class="fa fa-trash-alt"></i></button>
    </div>

)

export const ItemsList = ({ state }) => (
    <div class="row">
            {
                state.items.map(item => (
                    <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
                ))
            }
    </div>
)

export const InputForm = ({ state }) => (
    <div class="row">
        <label class="input-label" for="newtodo">Todo: </label>
        <input class="form-input" placeholder="Add a new todo..." onInput={UpdateNewTodo} value={state.newtodo} />
        <button class="btn btn-primary" onClick={NewTodo}><span class="icon-bookmark"></span> New</button>
    </div>
)
