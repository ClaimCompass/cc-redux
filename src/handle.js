export default function handle (initial = {}, actionMap = {}) {
  return (state = initial, action) => {
    if (actionMap[action.type]) {
      return actionMap[action.type](state, action)
    }

    return actionMap.default ? actionMap.default(state, action) : state
  }
}
