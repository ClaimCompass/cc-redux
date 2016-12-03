export default function handle (initial = {}, actionMap = {}) {
  return (state = initial, action) => {
    if (actionMap[action.type]) {
      return actionMap[action.type](state, action)
    }

    return state
  }
}
