import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    createPostRequest : ['data'],
    getPostsRequest: ['data'],
    getUserPostsRequest: ['data'],
    getPostsByCategoryRequest: ['data'],
    votePostRequest: ['data'],
    editPostRequest: ['data'],
    deletePostRequest: ['data'],
    
    postsUpdate: ['dataUpdate'],
    postsVote : ['vote'],
    postsSuccess: ['data'],
    postsFailure: ['error', 'status']
})

export const PostsTypes = Types
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

export const vote = (state, { vote }) => {
  return { ...state, processing: false, vote }
}

export const update = (state, { dataUpdate }) => {
  return { ...state, processing: false, dataUpdate }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_POST_REQUEST]: request,
  [Types.GET_POSTS_REQUEST]: request,
  [Types.GET_USER_POSTS_REQUEST]: request,
  [Types.GET_POSTS_BY_CATEGORY_REQUEST]: request,
  [Types.VOTE_POST_REQUEST]: request,
  [Types.EDIT_POST_REQUEST]: request,
  [Types.DELETE_POST_REQUEST]: request,

  [Types.POSTS_UPDATE]: update,
  [Types.POSTS_VOTE]: vote,
  [Types.POSTS_SUCCESS]: success,
  [Types.POSTS_FAILURE]: failure
})
