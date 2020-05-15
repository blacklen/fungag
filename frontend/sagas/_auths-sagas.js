/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { authsService } from '../services'
import AuthsActions from '../redux/_auths-redux'
import { HttpStatus } from '../constants'

const AuthsSagas = {
  *login({ data }) {
    let response = yield call(authsService.login, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.login = true
      yield put(AuthsActions.authsSuccess(responsedata))
    } else {
      yield put(AuthsActions.authsFailure(responsedata, response.status))
    }
  },

  *register({ data }) {
    let response = yield call(authsService.register, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.register = true
      yield put(AuthsActions.authsSuccess(responsedata))
    } else {
      yield put(AuthsActions.authsFailure(responsedata, response.status))
    }
  },

  *forgotPassword({ data }) {
    let response = yield call(authsService.forgotPassword, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.forgotPassword = true
      yield put(AuthsActions.authsSuccess(responsedata))
    } else {
      yield put(AuthsActions.authsFailure(responsedata, response.status))
    }
  },

  *resetPassword({ data }) {
    let response = yield call(authsService.resetPassword, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.resetPassword = true
      yield put(AuthsActions.authsSuccess(responsedata))
    } else {
      yield put(AuthsActions.authsFailure(responsedata, response.status))
    }
  },

  *socialLogin({ data }) {
    let response = yield call(authsService.socialLogin, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.socialLogin = true
      yield put(AuthsActions.authsSuccess(responsedata))
    } else {
      yield put(AuthsActions.authsFailure(responsedata, response.status))
    }
  },

  *logout() {
    let response = yield call(authsService.logout)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.logout = true
      yield put(AuthsActions.authsSuccess(responsedata))
    } else {
      yield put(AuthsActions.authsFailure(responsedata, response.status))
    }
  },

}

export default AuthsSagas