import api from '../api'

export default class CategoriesService {
  getCategories(data) {
    return api.get(`/categorys/list`)
  }
}