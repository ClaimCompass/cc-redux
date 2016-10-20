import { applyMiddleware as reduxApplyMiddleware, combine } from 'redux'
import thunk from 'redux-thunk'

export default function applyMiddleware (...additionalMiddlewares) {
  return createStore => (reducer, initial, enhancer) => {
    const middleware = reduxApplyMiddleware(thunk)
    const enhancerFunc = enhancer ? combine(enhancer, middleware) : middleware
    return createStore(reducer, initial, enhancerFunc)
  }
}
