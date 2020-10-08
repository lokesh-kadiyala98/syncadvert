import { combineReducers } from 'redux'

import entities from './entities'
import authReducer from './auth'
import uiReducer from './ui'

export default combineReducers({
    entities,
    auth: authReducer,
    ui: uiReducer
})