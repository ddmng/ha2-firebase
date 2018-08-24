import {
    app,
    h
  } from "/local_modules/hyperapp/src/index";
  
export const makeEffect = effect => props => ({ effect, props })

export const ShowState = ({ state }) => (
    <div class="container">
        <pre>
        { JSON.stringify(state, null, 2)}
        </pre>
    </div>
)