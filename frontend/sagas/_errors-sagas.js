import { put } from 'redux-saga/effects'

import ErrorsActions from '../redux/_errors-redux'
import AuthsUtils from '../utils/auths'
import { HttpStatus } from '../constants'

const ErrorsSagas = {
  *raiseError({ error, status }) {
    if (status == HttpStatus.UNAUTHORIZED) {
      AuthsUtils.logout()
    }
    yield put(ErrorsActions.failure(error, status))
  }
}

export default ErrorsSagas