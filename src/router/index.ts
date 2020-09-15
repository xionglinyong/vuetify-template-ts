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
        path: '/toast',
        name: 'Toast',
        meta: {
          title: 'toast',
          icon: 'mdi-android-messages'
        },
        component: () => import('@/views/toast/index.vue')
      },
      {
        path: '/',
        redirect: '/toast'
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
  mode: 'history',
  routes
})

export default router
