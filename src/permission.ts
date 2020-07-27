import router from '@/router'
import whiteList from '@/router/whiteList'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Route, RouteConfig } from 'vue-router'
import { Menus } from '@/types/permission'
import Layout from '@/layout/index.vue'

let init = true

/**
 * 根据后台数据返回路由数据
 * 实现思路：
 *  1.递归调用
 *  2.将递归数据放入路由数据
 * @param menus 路有数据
 * @param index 递归深度
 */
function recursionRouter (menus: Array<Menus>, index = 1): Array<RouteConfig> {
  const routes: Array<RouteConfig> = []
  for (const menu of menus) {
    const route: RouteConfig = {
      path: menu.path,
      // 一层路由时路由容器为layout，否则使用数据提供的容器
      component: index === 1
        ? () => import('@/layout/index.vue')
        : () => import(`@/views${menu.componentPath}/index.vue`),
      name: menu.name,
      meta: menu.meta
    }
    // 如果是嵌套路由，则递推调用
    if (menu?.children ?? false) {
      route.children = recursionRouter(menu.children as Array<Menus>, index + 1)
    } else if (index === 1) {
      // 如果是一级路由，则添加内容为layout路由
      route.children = [{
        path: menu.path,
        name: menu.name,
        meta: {
          title: menu.meta?.title,
          icon: menu.meta?.icon
        },
        component: () => import(`@/views${menu.componentPath}/index.vue`)
      }]
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
      const routerData = await store.getters.menu
      const routes = recursionRouter(routerData)
      console.log(routes)
      router.addRoutes(routes)
      init = false
      next({
        ...to,
        replace: true
      })
    } else {
      next()
    }
  }
})

router.afterEach((to: Route) => {
  document.title = to.meta.title
})
