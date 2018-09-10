export const preventDefault = action => (state, event) => [
    state,
    {
      action,
      effect: ({action}, dispatch) => {
        event.preventDefault()
        dispatch(action)
      }
    }
  ]
  