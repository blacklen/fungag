/**
 * @author NamNH
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { AuthsTypes } from '../redux/_auths-redux'
import { PostsTypes } from '../redux/_posts-redux'
import { CategoriesTypes } from '../redux/_categories-redux'
/* ------------- Sagas ------------- */
import ErrorsSagas from './_errors-sagas'
import AuthsSagas from './_auths-sagas'
import PostsSagas from './_posts-sagas'
import CategoriesSagas from './_categories-sagas'
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        //authentication
        takeLatest(AuthsTypes.LOGIN_REQUEST, AuthsSagas.login),
        takeLatest(AuthsTypes.REGISTER_REQUEST, AuthsSagas.register),
        takeLatest(AuthsTypes.FORGOT_PASSWORD_REQUEST, AuthsSagas.forgotPassword),
        takeLatest(AuthsTypes.RESET_PASSWORD_REQUEST, AuthsSagas.resetPassword),
        takeLatest(AuthsTypes.SOCIAL_LOGIN_REQUEST, AuthsSagas.socialLogin),
        takeLatest(AuthsTypes.LOGOUT_REQUEST, AuthsSagas.logout),
        takeLatest(AuthsTypes.AUTHS_FAILURE, ErrorsSagas.raiseError),
        //categories
        takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, CategoriesSagas.getCategories),
        takeLatest(CategoriesTypes.CATEGORIES_FAILURE, ErrorsSagas.raiseError),
        //posts
        takeLatest(PostsTypes.CREATE_POST_REQUEST, PostsSagas.createPost),
        takeLatest(PostsTypes.GET_POSTS_REQUEST, PostsSagas.getPosts),
        takeLatest(PostsTypes.GET_USER_POSTS_REQUEST, PostsSagas.getUserPosts),
        takeLatest(PostsTypes.GET_POSTS_BY_CATEGORY_REQUEST, PostsSagas.getPostsByCategory),
        takeLatest(PostsTypes.VOTE_POST_REQUEST, PostsSagas.votePost),
        takeLatest(PostsTypes.EDIT_POST_REQUEST, PostsSagas.editPost),
        takeLatest(PostsTypes.DELETE_POST_REQUEST, PostsSagas.deletePost),
        takeLatest(PostsTypes.POSTS_FAILURE, ErrorsSagas.raiseError),
    ])
}