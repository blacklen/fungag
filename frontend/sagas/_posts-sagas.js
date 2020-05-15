/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { postsService } from '../services'
import PostsActions from '../redux/_posts-redux'
import { HttpStatus } from '../constants'

const PostsSagas = {
  *createPost({data}) {
    let response = yield call(postsService.createPost,data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.createPost = true
      yield put(PostsActions.postsSuccess(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },
  
  *getPosts({data}) {
    let response = yield call(postsService.getPosts,data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getPosts = true
      if (data.page > 1) responsedata.nextPage = data.page;

      yield put(PostsActions.postsSuccess(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },

  *getUserPosts({data}) {
    let response = yield call(postsService.getUserPosts, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getUserPosts = true
      responsedata.id_user = data.id;
      if (data.page > 1) responsedata.nextPage = data.page;

      yield put(PostsActions.postsSuccess(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },

  *getPostsByCategory({
    data
  }) {
    let response = yield call(postsService.getPostsByCategory, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getPostsByCategory = true
      responsedata.category_id = data.id
      if (data.page > 1) responsedata.nextPage = data.page;
      yield put(PostsActions.postsSuccess(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },

  *votePost({data}) {
    let response = yield call(postsService.votePost,data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.votePost = data.post_id
      responsedata.actionVote = data.action
      yield put(PostsActions.postsVote(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },

  *editPost({data}) {
    let response = yield call(postsService.editPost,data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.editPost = true
      yield put(PostsActions.postsUpdate(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },

  *deletePost({ data }) {
    let response = yield call(postsService.deletePost,data)
    let responsedata = {}
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.deletePost = data.id
      responsedata.message = "delete"
      yield put(PostsActions.postsUpdate(responsedata))
    } else {
      yield put(PostsActions.postsFailure(responsedata, response.status))
    }
  },


}

export default PostsSagas