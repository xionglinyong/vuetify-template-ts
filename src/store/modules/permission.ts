import { Menus } from '@/types/permission'
import { getUserMenu, setUserMenu } from '@/utils/auth'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store/index'

const asyncRoutes: Array<Menus> = [
  {
    path: '/toast',
    name: 'Toast',
    meta: {
      title: 'Toast',
      icon: 'mdi-android-messages'
    },
    componentPath: '/toast'
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
        meta: { icon: 'mdi-widgets', title: '企业台账' }
      },
      {
        path: 'manage',
        componentPath: '/enterprise/manage',
        name: 'Manage',
        meta: { icon: 'mdi-widgets', title: '企业管理' }
      }
    ]
  },
  {
    path: '/theme',
    name: 'Theme',
    meta: {
      title: '换肤',
      icon: 'iconfont icon-theme'
    },
    componentPath: '/theme'
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
  dynamic: true,
  store,
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
