# ClaimCompass Redux
Utility functions for reducing redux boilerplate.

## Usage

### create(type, ?creator)

Creates an action creator. **Example:**

```
import { create } from '@claimcompass/cc-redux'

// no creator function specified - equivalent to using the identity function
// calling initUser({ firstname: 'Hi', lastname: 'World' }) returns
// { type: 'INIT_USER', firstname: 'Hi', lastname: 'World' }
export const initUser = create('INIT_USER')

// calling editUser('firstname', 'Hello') returns { type: 'EDIT_USER', firstname: 'Hello' }
export const editUser = create('EDIT_USER', (field, value) => ({ [field]: value }))
```

### handle(actionMap)

Creates a redux reducer. The actionMap object is a plain object containing
action types as keys. The object MUST also contain a key `default` which returns
the initial state. **Example:**

```
import { handle } from '@claimcompass/cc-redux'
import * as types from './actions'

const user = handle({
  [types.initUser]: (state, { user }) => ({ ...user }),

  [types.editUser]: (state, { user }) => ({ ...state, ...user })

  'default': {}
})
```

### applyMiddleware(?...middleware)

A custom `applyMiddleware` enhancer which comes with some middleware already
applied. Currently the following middleware is applied by default:
- thunk

**Example:**
```
import { applyMiddleware } from '@claimcompass/cc-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware())
```
