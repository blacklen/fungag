import Cookies from 'js-cookie'

export default class AuthsUtils {
  static isAuthenticated() {
    return !!Cookies.get('is_login')
  }

  static login(token, id) {
    Cookies.set('is_login', true, { expires: 1 })
    localStorage.setItem("token", token)
    localStorage.setItem("id_user",id)
  }

  static logout() {
    Cookies.remove('is_login')
    localStorage.removeItem('token')
    localStorage.removeItem('id_user')
  }
}
