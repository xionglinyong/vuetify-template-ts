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
import { resetNum } from '@/permission'

function getRoutes (userInfo: UserInfo = getUserInfo()) {
  let routes: any = []

  if (userInfo) {
    const role = userInfo.role ? userInfo.role[0] : undefined
    const routeMap = new Map()
    routeMap.set('SuperAdmin', [
      {
        path: '/receipt',
        name: 'Receipt',
        component: () => import('@/views/Receipt/index.vue')
      },
      {
        path: '/userManage',
        name: 'UserManage',
        component: () => import('@/views/UserManage/index.vue')
      },
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index/index.vue')
      },
      {
        path: '/',
        redirect: '/index'
      }
    ])
    routeMap.set('企业', [
      {
        path: '/company',
        name: 'Company',
        component: () => import('@/views/Company/index.vue')
      },
      {
        path: '/input',
        name: 'InputInfo',
        component: () => import('@/views/InputInfo/index.vue')
      },
      {
        path: '/receipt',
        name: 'Receipt',
        component: () => import('@/views/Receipt/index.vue')
      },
      {
        path: '/',
        redirect: '/company'
      }
    ])
    routeMap.set('执法人员', [
      {
        path: '/check',
        name: 'Check',
        component: () => import('@/views/Check/index.vue')
      },
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index/index.vue')
      },
      {
        path: '/',
        redirect: '/index'
      }
    ])
    routes = routeMap.get(role)
  }

  return routes
}

export default {
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
    userInfo: getUserInfo(),
    layoutChildren: getRoutes()
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
    },
    SET_MENU (state: any, menu: any) {
      state.layoutChildren = menu
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
      await commit('SET_MENU', getRoutes(res.data))
      await commit('SET_USER_INFO', res.data)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    async refreshToken ({ commit, state }: { commit: any; state: any }) {
      const res: any = await refreshToken({ refreshToken: state.refreshToken })
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
      resetNum()
      router.replace('/login')
    }
  },
  namespaced: true
}
