import api from '../api'

export default class PostsService {
  createPost(data) {
    return api.post(`/post/new/ `,data)
  }

  getPosts(data) {
    let page = data.page ? data.page : 1;
    return api.get(`/post?page=${page}&&page_size=4`)
  }

  getUserPosts(data) {
    let page = data.page ? data.page : 1;
    return api.get(`/post/user/${data.id}?page=${page}&&page_size=4`)
  }

  getPostsByCategory(data) {
    let page = data.page ? data.page : 1;
    return api.get(`/post/category/${data.id}?page=${page}&&page_size=4`)
  }

  votePost(data) {
    return api.post(`/post/like/`, data)
  }

  editPost(data) {
    return api.patch(`/post/update-delete/${data.id}/`, data.postData)
  }

  deletePost(data) {
    return api.delete(`/post/update-delete/${data.id}/`)
  }
}