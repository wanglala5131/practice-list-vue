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
    redirect: '/items'
  },

  {
    path: '/items',
    name: 'practice-index',
    component: Index
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/items/close',
    name: 'item-close',
    component: () => import('../views/CloseItems.vue')
  },
  {
    path: '/items/:id/edit',
    name: 'edit-item',
    component: () => import('../views/EditItem.vue')
  },
  {
    path: '/items/:id(\\d+)',
    name: 'practice-item',
    component: () => import('../views/PracticeItem.vue')
  },
  {
    path: '/items/create',
    name: 'create-item',
    component: () => import('../views/CreateItem.vue')
  },
  {
    path: '/setting',
    component: () => import('../views/Setting.vue'),
    children: [
      {
        path: '',
        redirect: '/setting/subcategories'
      },
      {
        path: 'categories',
        component: () => import('../components/Categories.vue')
      },
      {
        path: 'subcategories',
        component: () => import('../components/Subcategories.vue')
      }
    ]
  },
  {
    path: '/cart',
    name: 'carts',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/lists',
    name: 'lists',
    component: () => import('../views/Lists.vue')
  },
  {
    path: '/lists/:id(\\d+)',
    name: 'list',
    component: () => import('../views/EditList.vue')
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
    next('/signin')
    return
  }
  //如果token有效 & 進入不須驗證頁面 就轉址到首頁  (即不須再次登入就到首頁，點icon回首頁)
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/items')
    return
  }
  next()
})

export default router
