import { Menus } from '@/interface/permission'
import { getUserMenu, setUserMenu } from '@/utils/auth'

const asyncRoutes: Array<Menus> = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'el-icon-house'
    },
    componentPath: '/home'
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    meta: {
      title: '企业管理',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'ledger',
        componentPath: '/enterprise/ledger',
        name: 'Ledger',
        meta: { title: '企业台账' }
      },
      {
        path: 'manage',
        componentPath: '/enterprise/manage',
        name: 'Manage',
        meta: { title: '企业管理' }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404-页面找不到'
    },
    componentPath: '/404'
  }
]
export default {
  state: {
    menu: getUserMenu() ?? asyncRoutes
  },
  mutations: {
    SET_MENU (state: any, menus: Array<Menus>) {
      state.menu = menus
      setUserMenu(menus)
    }
  },
  actions: {
    setMenu ({ commit }: { commit: any }, menus: Array<Menus>) {
      commit('SET_MENU', menus ?? getUserMenu())
    }
  },
  namespaced: true
}
