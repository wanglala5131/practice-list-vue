import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/users'
import { Toast } from '../utils/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: undefined,
      name: undefined,
      email: undefined
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email } = data
        commit('setCurrentUser', {
          id,
          name,
          email
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法獲取使用者資料，請重新再試'
        })
      }
    }
  },
  modules: {}
})
