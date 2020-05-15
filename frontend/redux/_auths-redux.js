import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: ['data'],
  registerRequest: ['data'],
  forgotPasswordRequest: ['data'],
  resetPasswordRequest: ['data'],
  socialLoginRequest: ['data'],
  logoutRequest : [null],
  authsSuccess: ['data'],
  authsFailure: ['error', 'status']
})

export const AuthsTypes = Types
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
  [Types.LOGIN_REQUEST]: request,
  [Types.REGISTER_REQUEST]: request,
  [Types.FORGOT_PASSWORD_REQUEST]: request,
  [Types.RESET_PASSWORD_REQUEST]: request,
  [Types.SOCIAL_LOGIN_REQUEST]: request,
  [Types.LOGOUT_REQUEST]: request,

  [Types.AUTHS_SUCCESS]: success,
  [Types.AUTHS_FAILURE]: failure
})
