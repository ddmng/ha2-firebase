import { h } from "/local_modules/hyperapp/src/index";
import { DeleteItem, AddItem } from './firebase'

const Delete = (id) => (state) => [{
    ...state,
},
DeleteItem({
    props: {
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
            <div class="item-data">
                <div>
                    <div class="item-title">{text}</div>
                    <div class="item-metadata">
                        {author}, <small>{dateAdded.toDate().toLocaleDateString()}</small>
                    </div>
                </div>
                <button onClick={Delete(id)} class="btn btn-delete"><i class="fa fa-trash-alt"></i></button>
            </div>
)

export const ItemsList = ({ state }) => (
    <div class="container">
            {
                state.items.map(item => (
                    <div class="row item-row">
                    <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
                    </div>
                ))
            }
    </div>
)

export const InputForm = ({ state }) => (
    <div class="container">
        
        <div class="row">
            <input class="form-input" 
                id="todoitem"
                placeholder="Add a new todo..."
                onInput={UpdateNewTodo}
                value={state.newtodo}
                disabled={state.adding} />
            <button class="btn btn-primary"
                onClick={NewTodo}
                disabled={state.adding || !state.newtodo || state.newtodo.length === 0}><i class="fa fa-plus"></i></button>
        </div>
    </div>
)
