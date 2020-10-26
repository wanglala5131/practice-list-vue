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
    isAuthenticated: false,
    token: undefined
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await userAPI.getCurrentUser()
        if (statusText !== 'OK') {
          throw new Error()
        }
        const { id, name, email } = data
        commit('setCurrentUser', {
          id,
          name,
          email
        })
        return true
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法獲取使用者資料，請重新再試'
        })
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {}
})
