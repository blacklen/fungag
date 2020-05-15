/**
 * @author Nam NH
 * Center point to export instances of services
 */
import AuthsService from './_auths-services'
import PostsService from './_posts-services'
import CategoriesService from './_categories-services'

export const authsService = new AuthsService()
export const postsService = new PostsService()
export const categoriesService = new CategoriesService()
