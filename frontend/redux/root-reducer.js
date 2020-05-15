/**
 * @author Nam NH
 * This file combines all reducers and create redux store
 */

import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

const rootReducer = combineReducers({
  modal,
  auths: require('./_auths-redux').reducer,
  errors: require('./_errors-redux').reducer,
  posts: require('./_posts-redux').reducer,
  categories : require('./_categories-redux').reducer
  
})

export default rootReducer