import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { E_Router } from '@/enums/E_Router'

function checkAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  let is_auth = false

  onAuthStateChanged(getAuth(), (user) => {
    if (user && !is_auth) {
      is_auth = true
      next()
    } else {
      is_auth = true
      next({ name: 'auth' })
    }
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/PageAuth.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/PageHome.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/PageList.vue'),
    beforeEnter: checkAuth
  },
  {
    path: E_Router.EDIT_INTERVIEW + '/:id',
    name: 'edit-interview',
    component: () => import('@/views/SingleInterview.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/views/PageStatistics.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
