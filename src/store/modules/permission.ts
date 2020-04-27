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
    componentPath: '/Home'
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
        componentPath: '/enterprise/ledger',
        name: 'Manage',
        meta: { title: '企业管理' }
      }
    ]
  }
]
export default {
  state: {
    menu: getUserMenu() ?? asyncRoutes
  },
  mutations: {
    SET_MENU (state: any, menus: Menus) {
      state.menu = menus
      setUserMenu(menus)
    }
  },
  actions: {
    setMenu ({ commit }: { commit: any }, menus: Menus) {
      commit('SET_MENU', menus ?? getUserMenu())
    }
  },
  namespaced: true
}
