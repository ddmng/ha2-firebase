import { h } from "/local_modules/hyperapp/src/index";
import { deleteItemEffect, addItemEffect } from './firebase'

const Delete = (id) => (state) => [{
    ...state,
},
deleteItemEffect({
        item: id,
        success: itemDeleted(id),
        failure: itemDeleteFail
})]

const itemDeleted = (id) => (state) => ({
    ...state,
    deleted: id,
    error: ''
})

const itemDeleteFail = (state, error) => ({
    ...state,
    deleted: '',
    error: error
})

const newTodoUpdate = (state, { target: { value } }) => ({
    ...state,
    newtodo: value,
})

const todoAdd = (state) => [{
    ...state,
    adding: true
},
addItemEffect({
        text: state.newtodo,
        author: state.loginData.username,
        dateAdded: new Date(),
        success: todoAdded(state.newtodo),
        failure: todoAddFail
}
)]

const todoAdded = (text) => (state) => ({
    ...state,
    newtodo: "",
    adding: false,
    error: ''
})

const todoAddFail = (state, error) => ({
    ...state,
    adding: false,
    error: error
})

export const itemsLoad = (state, items) => ({
    ...state,
    querying: false,
    items: items
  })
  
export const itemsLoadFail = (state) => ({
    ...state,
    querying: false,
    items: []
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
        <form onsubmit={(state, event) => {
                event.preventDefault(true)
                return todoAdd
            }}>
            <input class="form-input" 
                id="todoitem"
                placeholder="Add a new todo..."
                onInput={newTodoUpdate}
                value={state.newtodo}
                disabled={state.adding} />
            <button class="btn btn-primary"
                type="submit"
                disabled={state.adding || !state.newtodo || state.newtodo.length === 0}><i class="fa fa-plus"></i></button>
        </form>
        </div>
    </div>
)
