import router from '@/router'
import whiteList from '@/router/whiteList'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Route, RouteConfig } from 'vue-router'
import { Menus } from '@/interface/permission'
import Layout from '@/layout/index.vue'

let i = 0

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
    const route: RouteConfig = {
      path: menu.path,
      component: Layout,
      name: menu.name,
      meta: menu.meta
    }
    if (menu.children && (menu.children as Array<Menus>).length > 0) {
      route.children = recursionRouter(menu.children as Array<Menus>)
    } else {
      // 路由懒加载，优化首屏加载时间
      route.component = () => import(`@/views${menu.componentPath}/index.vue`)
    }
    routes.push(route)
  }
  return routes
}

router.beforeEach(async (to: Route, from: Route, next: any) => {
  // debugger
  // console.log(from.path, to.path)
  let nextPath = ''
  // 校验是否在白名单之内
  if (whiteList.includes(to.path)) {
    next()
    return
  } else {
    if (i++ === 0) {
      const children = await store.getters.menu
      console.log(recursionRouter(children))
      router.addRoutes(recursionRouter(children))
      console.log(router)
      next({ ...to, replace: true })
    } else {
      next()
    }
  }

  // 查看是否有token
  const token: string = getToken()
  if (!token) {
    nextPath = '/login'
    next()
  }
})

router.afterEach((to: Route) => {
  document.title = to.meta.title
})
