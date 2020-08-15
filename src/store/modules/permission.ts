import { Menus } from '@/types/permission'
import { getUserMenu, setUserMenu } from '@/utils/auth'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

const asyncRoutes: Array<Menus> = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'mdi-home'
    },
    componentPath: '/home'
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    meta: {
      title: '企业管理',
      icon: 'mdi-widgets'
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
    path: '/map',
    name: 'Map',
    meta: {
      title: '地图',
      icon: 'mdi-map'
    },
    componentPath: '/map'
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

@Module({
  name: 'Permission',
  namespaced: true,
  stateFactory: true
})
export default class Permission extends VuexModule {
  menu: Array<Menus> = getUserMenu() ?? asyncRoutes

  @Mutation
  setMenu (menus: Array<Menus>) {
    this.menu = menus
    setUserMenu(menus)
  }
}
