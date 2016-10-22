import { applyMiddleware as reduxApplyMiddleware, combine } from 'redux'
import thunk from 'redux-thunk'

export default function applyMiddleware (...additionalMiddlewares) {
  return reduxApplyMiddleware(thunk, ...additionalMiddlewares)
}
