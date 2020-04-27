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
        component: () => import('../views/Home/index.vue')
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
    component: () => import('../views/Login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
