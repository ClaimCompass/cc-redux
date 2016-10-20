import 'babel-polyfill'

import applyMiddleware from './applyMiddleware'
import create from './create'
import handle from './handle'
import { createStore } from 'redux'
import { expect } from 'chai'

const syncUser = { firstname: 'Sync', lastname: 'SyncUser' }
const asyncUser = { firstname: 'Async', lastname: 'AsyncUser' }

const initUser = create('INIT_USER')
const fetchUser = () => dispatch => Promise.resolve({ user: asyncUser }).then(res => {
  dispatch(initUser(res))
})

const reducer = handle({
  [initUser]: (state, { user }) => ({ ...user }),

  default: (state, action) => ({ initial: true })
})

const store = createStore(reducer, applyMiddleware())

console.info('RUNNING TESTS --------------------------------------------------\n')

console.info('Test: initialise store with default state ----------------------')

store.dispatch({ type: '@@init' })
expect(store.getState().initial).to.equal(true)

console.info('✓\n')

console.info('Test: dispatch regular action ----------------------------------')

store.dispatch(initUser({ user: syncUser }))
expect(store.getState().firstname).to.equal(syncUser.firstname)
expect(store.getState().lastname).to.equal(syncUser.lastname)

console.info('✓\n')

console.info('Test: dispatch thunk action ------------------------------------')

store.dispatch(fetchUser())
Promise.resolve().then(() => {
  expect(store.getState().firstname).to.equal(asyncUser.firstname)
  expect(store.getState().lastname).to.equal(asyncUser.lastname)
  console.info('✓\n')
})
