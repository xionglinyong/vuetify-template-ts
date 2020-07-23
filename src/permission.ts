import router from '@/router'
import whiteList from '@/router/whiteList'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Route, RouteConfig } from 'vue-router'
import { Menus } from '@/interface/permission'
import Layout from '@/layout/index.vue'

let init = true

/**
 * 根据后台数据返回路由数据
 * 实现思路：
 *  1.递归调用
 *  2.将递归数据放入路由数据
 * @param routerData
 */
function recursionRouter (menus: Array<Menus>): Array<RouteConfig> {
  const routes: Array<RouteConfig> = []
  for (const menu of menus) {
    let route: RouteConfig
    if (menu.children && (menu.children as Array<Menus>).length > 0) {
      route = {
        path: menu.path,
        component: () => import('@/layout/index.vue'),
        name: menu.name,
        meta: menu.meta
      }
      route.children = recursionRouter(menu.children as Array<Menus>)
    } else {
      route = {
        path: '/',
        name: `${menu.name}Layout`,
        component: Layout,
        children: [
          {
            path: menu.path,
            name: menu.name,
            meta: menu.meta,
            component: () => import(`@/views${menu.componentPath}/index.vue`)
          }
        ]
      }
      // route.component = () => import(`@/views${menu.componentPath}/index.vue`)
    }
    routes.push(route)
  }
  return routes
}

router.beforeEach(async (to: Route, from: Route, next: any) => {
  // 校验是否在白名单之内
  if (whiteList.includes(to.path)) {
    next()
  } else {
    // 查看是否有token
    const token: string = getToken()
    if (!token) {
      next('/login', true)
      return
    }
    // 首次加载或刷新页面
    if (init) {
      const children = await store.getters.menu
      router.addRoutes(recursionRouter(children))
      init = false
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})

router.afterEach((to: Route) => {
  document.title = to.meta.title
})
