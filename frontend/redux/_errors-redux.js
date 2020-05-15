import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  failure: ['error', 'status']
})

export const ErrorsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null
}

/* ------------- Reducers ------------- */
export const raise = (state, { error }) => {
  return { ...state, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FAILURE]: raise
})
