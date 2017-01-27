# ClaimCompass Redux

[![NPM](https://nodei.co/npm/@claimcompass/cc-redux.png)](https://nodei.co/npm/@claimcompass/cc-redux)

Utility functions for reducing redux boilerplate.

```
npm install --save @claimcompass/cc-redux
```

## Usage

### create(type, ?creator)

Creates an action creator. **Example:**

```js
import { create } from '@claimcompass/cc-redux'

// no creator function specified - equivalent to using the identity function
// calling initUser({ firstname: 'Hi', lastname: 'World' }) returns
// { type: 'INIT_USER', firstname: 'Hi', lastname: 'World' }
export const initUser = create('INIT_USER')

// calling editUser('firstname', 'Hello') returns { type: 'EDIT_USER', firstname: 'Hello' }
export const editUser = create('EDIT_USER', (field, value) => ({ [field]: value }))
```

### handle(initialState, actionMap)

Creates a redux reducer. The actionMap object is a plain object containing
action types as keys. **Example:**

```js
import { handle } from '@claimcompass/cc-redux'
import * as types from './actions'

const user = handle({ firstname: 'John' }, {
  [types.initUser]: (state, { user }) => ({ ...user }),

  [types.editUser]: (state, { user }) => ({ ...state, ...user })

  // the default method is invoked if the dispatched action does not matched any of
  // the actions above
  default: (state, action) => state
})
```

### applyMiddleware(?...middleware)

A custom `applyMiddleware` enhancer which comes with some middleware already
applied. Currently the following middleware is applied by default:
- thunk

**Example:**
```js
import { applyMiddleware } from '@claimcompass/cc-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware())
```

## Testing

```
npm run build && npm run test
```
