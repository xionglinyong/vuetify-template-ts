import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
import { getToken } from '@/utils/auth'
import whiteList from '@/router/whiteList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/index.vue')
      },
      {
        path: '/',
        redirect: '/home'
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 校验是否在白名单之内
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 查看是否有token
  const token: string = getToken()
  let nextPath = ''
  if (!token) {
    nextPath = '/Login'
  }
  console.log(nextPath)
  nextPath ? next(nextPath) : next()
})

export default router
