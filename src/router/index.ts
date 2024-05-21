import {useUserStore} from '@/stores/user-store'
import {storeToRefs} from 'pinia'
import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext} from 'vue-router'

function checkAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()
  const {user_id} = storeToRefs(userStore)
  if (user_id.value === '') {
    next({name: 'auth'})
  } else {
    next()
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/interview/:id',
    name: 'auth',
    component: () => import('@/views/SingleInterview.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/PageHome.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/PageAuth.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/PageList.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/views/PageStatistics.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
