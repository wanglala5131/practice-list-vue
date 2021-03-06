import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faArrowUp,
  faListAlt,
  faStar,
  faChevronDown,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

library.add(faPlus, faArrowUp, faListAlt, faStar, faChevronDown, faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
