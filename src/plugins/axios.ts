import Vue, { PluginObject } from 'vue'
import axios, { AxiosResponse } from 'axios'
import whiteList from '@/plugins/whiteList'
import { getToken } from '@/utils/auth'
import router from '@/router'
import store from '../store/index'
import { MessageType } from '@/types/enum'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://119.29.237.201:5810';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.baseURL || process.env.apiUrl || 'http://119.29.237.201:5810/api/v1/',
  timeout: 60 * 1000 // 请求超时
  // withCredentials: true, // Check cross-site Access-Control
}
const _axios = axios.create(config)
// 请求拦截
_axios.interceptors.request.use(
  (cfg: any) => {
    try {
      if (!whiteList.includes(cfg.url)) {
        const token = getToken()
        if (!token) {
          router.replace('/login')
        } else {
          // cfg.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch (e) {
    }
    return cfg
  },
  (err: Error) => {
    // Do something with request error
    return Promise.reject(err)
  }
)

// 响应拦截
_axios.interceptors.response.use(
  async (res: AxiosResponse<any>) => {
    // Do something with response data
    if (res.status === 401) {
      await store.dispatch('user/refreshToken')
    }
    return res.data
  },
  async (err: Error) => {
    try {
      if (err.message.includes('401')) {
        await store.dispatch('user/refreshToken')
      } else {
        throw err
      }
      return Promise.reject(err)
    } catch (e) {
      window.tips(err.message, MessageType.error)
    }
  }
)

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios
  }
}
Plugin.install = (Vue) => {
  Vue.$axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
