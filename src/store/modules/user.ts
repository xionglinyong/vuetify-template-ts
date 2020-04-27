import {
  deleteRefreshToken,
  deleteToken,
  deleteUserInfo,
  getRefreshToken,
  getToken,
  getUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo
} from '@/utils/auth'
import { LoginUser, UserInfo } from '@/interface/user'
import router from '@/router'
import { getUserInfoByToken, login, refreshToken } from '@/apis/authorize'

export default {
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
    userInfo: getUserInfo()
  },
  mutations: {
    SET_TOKEN (state: any, token: string) {
      state.token = token
      token ? setToken(token) : deleteToken()
    },
    SET_REFRESH_TOKEN (state: any, token: string) {
      state.refreshToken = token
      token ? setRefreshToken(token) : deleteRefreshToken()
    },
    SET_USER_INFO (state: any, user: UserInfo | '') {
      state.userInfo = user
      user ? setUserInfo(user) : deleteUserInfo()
    }
  },
  actions: {
    async login ({ commit, dispatch }: { commit: any; dispatch: Function }, user: LoginUser) {
      const res: any = await login(user)
      if (res.status === 200) {
        // 处理登录操作
        await commit('SET_TOKEN', res.data.access_token)
        await commit('SET_REFRESH_TOKEN', res.data.refresh_token)
        await dispatch('getUserInfo')
        router.push('/')
      } else {
        return res
      }
    },
    async getUserInfo ({ commit }: { commit: any }) {
      const res = await getUserInfoByToken()
      await commit('SET_USER_INFO', res.data)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    async refreshToken ({ commit, state }: { commit: any; state: any }) {
      const res: any = await refreshToken(state.refreshToken)
      if (res.status === 200) {
        await commit('SET_TOKEN', res.data.access_token)
        await commit('SET_REFRESH_TOKEN', res.data.refresh_token)
        router.go(0)
      } else {
        router.replace('/login')
        return res
      }
    },
    loginOut ({ commit }: { commit: any }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const routes: any = router.options.routes
      const layout: any = routes.find((item: any) => item.name === 'Layout')
      layout.children = []
      // 处理退出登录
      commit('SET_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_USER_INFO', '')
      router.replace('/login')
    }
  },
  namespaced: true
}
