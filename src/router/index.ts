import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'

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
        meta: {
          title: '首页',
          icon: 'el-icon-house'
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/',
        redirect: '/home'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
