import Vue, { PluginObject } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import axios, { AxiosResponse } from 'axios'
import whiteList from '@/plugins/whiteList'
import { getToken } from '@/utils/auth'
import router from '@/router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.baseURL || process.env.apiUrl,
  headers: {
    'X-Custom-Source': 'browser'
  },
  timeout: 60 * 1000 // 请求超时
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

// 请求拦截
_axios.interceptors.request.use(
  (cfg: any) => {
    if (!whiteList.includes(cfg.url)) {
      const token = getToken()
      if (!token) {
        router.replace('/Login')
      } else {
        cfg.headers.Authorization = `BasicAuth ${token}`
      }
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
  (res: AxiosResponse<any>) => {
    // Do something with response data
    return res
  },
  (err: Error) => {
    // Do something with response error
    return Promise.reject(err)
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
