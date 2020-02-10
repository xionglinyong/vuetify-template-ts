import { deleteToken, getToken, setToken } from '@/utils/auth'
import { LoginUser } from '@/interface/user'
import router from '@/router'

export default {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN (state: any, token: string) {
      state.token = token
      token ? setToken(token) : deleteToken()
    }
  },
  actions: {
    async login ({ commit }: {commit: any}, user: LoginUser) {
      // 处理登录操作
      commit('SET_TOKEN', 'token')
      router.push('/')
    },
    loginOut ({ commit }: {commit: any}) {
      // 处理退出登录
      commit('SET_TOKEN', '')
    }
  },
  namespaced: true
}
