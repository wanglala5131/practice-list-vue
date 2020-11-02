import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Index from '../views/Index.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/practice/signin'
  },
  {
    path: '/practice',
    name: 'practice-index',
    component: Index
  },
  {
    path: '/practice/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/practice/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/practice/items/close',
    name: 'item-clise',
    component: () => import('../views/CloseItems.vue')
  },
  {
    path: '/practice/items/:id(\\d+)',
    name: 'practice-item',
    component: () => import('../views/PracticeItem.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  //查看是否有token，如果有就進行驗證
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']
  //如果token無效 & 進入需驗證頁面 就轉址到signin
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/practice/signin')
    return
  }
  //如果token有效 & 進入不須驗證頁面 就轉址到首頁  (即不須再次登入就到首頁，點icon回首頁)
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/practice')
    return
  }
  next()
})

export default router
