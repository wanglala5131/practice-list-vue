import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Index from '../views/Index.vue'

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
    name: 'signin',
    component: SignIn
  },
  {
    path: '/practice/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
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

export default router
