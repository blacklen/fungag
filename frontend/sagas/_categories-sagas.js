/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { categoriesService } from '../services'
import CategoriesActions from '../redux/_categories-redux'
import { HttpStatus } from '../constants'

const CategoriesSagas = {
  *getCategories({ data }) {
    let response = yield call(categoriesService.getCategories,data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getCategories = true
      yield put(CategoriesActions.categoriesSuccess(responsedata))
    } else {
      yield put(CategoriessActions.categoriesFailure(responsedata, response.status))
    }
  },

}

export default CategoriesSagas