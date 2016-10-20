const identity = x => x

export default function create (type, creator = identity) {
  const action = (...args) => ({ type, ...creator(...args) })
  action.toString = () => type
  return action
}
