import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getCategoriesRequest: ['data'],
    categoriesSuccess: ['data'],
    categoriesFailure: ['error', 'status']
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CATEGORIES_REQUEST]: request,
  [Types.CATEGORIES_SUCCESS]: success,
  [Types.CATEGORIES_FAILURE]: failure
})
