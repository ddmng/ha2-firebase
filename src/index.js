import { app, h } from "/local_modules/hyperapp/src/index";
import { Http } from "/local_modules/fx/src/index";
import hh from "/local_modules/hyperscript-helpers/src/index";
const { main, input, button, h2, h4 } = hh(h);
import devtools from 'hyperapp-redux-devtools';

const SuccessResponse = (state, response) => ({
  ...state,
  response,
  error: null,
  fetching: false
});

const ErrorResponse = (state, error) => ({
  ...state,
  response: null,
  error,
  fetching: false
});

const SendHttp = state => [
  { ...state, response: "...", error: null, fetching: true },
  Http({
    url: state.url,
    response: "text",
    action: SuccessResponse,
    error: ErrorResponse
  })
];

const Example = state => ({
  ...state,
  example: state.example + 1
})

const UpdateUrl = (state, { target: { value } }) => ({ ...state, url: value });

devtools(app)({
  init: {
    response: null,
    error: null,
    url: "https://httpstat.us/200",
    fetching: false,
    example: 1
  },
  view: ({ response, error, url, fetching, example }) =>
    main(
      {},
      input({
        autofocus: true,
        value: url,
        disabled: fetching,
        onInput: UpdateUrl
      }),
      button(
        {
          onClick: SendHttp
        },
        "Send"
      ),
      h2({}, `Response: ${response}`),
      h4({}, `Error: ${error && (error.statusText || error.message)}`),
      h4({}, `Example: ${example}`),
      button({
        onClick: Example
      },
    "Example")
    ),
  subscribe: console.log,
  container: document.body
});

console.clear();
