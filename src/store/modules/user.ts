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
import { UserInfo } from '@/types/user'
import router from '@/router'
import store from '@/store/index'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  store,
  name: 'User',
  namespaced: true,
  stateFactory: true
})
export default class User extends VuexModule {
  token = getToken()
  refreshToken = getRefreshToken()
  userInfo: UserInfo | null = getUserInfo()

  @Mutation
  setToken (token: string) {
    this.token = token
    token ? setToken(token) : deleteToken()
  }

  @Mutation
  setRefreshToken (token: string) {
    this.refreshToken = token
    token ? setRefreshToken(token) : deleteRefreshToken()
  }

  @Mutation
  setUserInfo (user: UserInfo | null) {
    this.userInfo = user
    user ? setUserInfo(user) : deleteUserInfo()
  }

  @Action
  async login () {
    this.context.commit('setToken', 'token')
    this.context.commit('setRefreshToken', 'refreshToken')
    this.context.commit('setUserInfo', {})
    router.replace('/')
  }

  @Action
  async loginOut () {
    this.context.commit('setToken', '')
    this.context.commit('setRefreshToken', '')
    this.context.commit('setUserInfo', null)
    router.replace('/login')
  }
}
