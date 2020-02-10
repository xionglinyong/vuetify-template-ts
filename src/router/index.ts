import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '../views/Home.vue'
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
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
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
    nextPath = '/login'
  }
  console.log(nextPath)
  nextPath ? next(nextPath) : next()
})

export default router
