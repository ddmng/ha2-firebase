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


export const ItemsManagement = ({ state }) => (
    <div class="container">
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
    </div>
)

const Item = ({ id, author, dateAdded, text }) => (

    <div class="card">
        <div class="card-header">
            <div class="card-title h5">{text}</div>
            <div class="card-subtitle text-gray">
                <small>{dateAdded.toDate().toLocaleString()}</small>
                <div class="chip">{author}</div>
            </div>
        </div>
        <div class="card-footer">
            <button onClick={Delete(id)} class="btn btn-primary"><i class="icon icon-check"></i></button>
            <button onClick={Delete(id)} class="btn btn-primary"><i class="icon icon-cross"></i></button>
        </div>
    </div>

)

const ItemsList = ({ state }) => (
    <div class="columns">
        <div class="col-12">
            {
                state.items.map(item => (
                    <Item id={item.id} author={item.data.author} dateAdded={item.data.dateAdded} text={item.data.text} />
                ))
            }
        </div>
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
