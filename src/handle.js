export default function handle (actionMap) {
  if (!actionMap.default) {
    throw new Error(
      'Handle expects an argument which is a plain object that MUST' +
      'contain a key named `default`. The provided object has no `default` key.'
    )
  }

  return (state, action) => {
    if (actionMap[action.type]) {
      return actionMap[action.type](state, action)
    }

    return actionMap.default(state, action)
  }
}
