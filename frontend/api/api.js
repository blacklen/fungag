/**
 * @author Nam NH
 * ApiClient to interact with api server
 */

import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

export default class Api {
  constructor(defaultConfig, preRequest) {
    this.defaultConfig = defaultConfig
    this.preRequest = preRequest
  }

  request(url, cookies) {
    this.defaultConfig = this.preRequest(this.defaultConfig, cookies)
    const token = localStorage.getItem('token')
    if (token) this.defaultConfig.headers['Authorization'] = 'Token ' + token;
    const { serverRuntimeConfig } = getConfig()
    let prefix = serverRuntimeConfig.onServer ? process.env.BASE_URL + '/api' : 'http://127.0.0.1:8000'
    return fetch( prefix + url, this.defaultConfig)
  }

  get(url, cookies) {
    this.defaultConfig.method = 'GET'
    this.defaultConfig.body = undefined
    return this.request(url, cookies)
  }

  post(url, data) {
    this.defaultConfig.method = 'POST'
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
      this.defaultConfig.headers['Content-Type'] = 'application/json'
    }
    else {
      delete this.defaultConfig.headers['Content-Type']
    }
    this.defaultConfig.body = data
    return this.request(url)
  }

  put(url, data) {
    this.defaultConfig.method = 'PUT'
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
      this.defaultConfig.headers['Content-Type'] = 'application/json'
    }
    else {
      delete this.defaultConfig.headers['Content-Type']
    }
    this.defaultConfig.body = data
    return this.request(url)
  }

  patch(url, data) {
    this.defaultConfig.method = 'PATCH'
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
      this.defaultConfig.headers['Content-Type'] = 'application/json'
    }
    this.defaultConfig.body = data
    return this.request(url)
  }

  delete(url) {
    this.defaultConfig.method = 'DELETE'
    return this.request(url)
  }
}
