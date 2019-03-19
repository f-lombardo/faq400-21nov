import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import './registerServiceWorker'

import './smeupComponents'

Vue.config.productionTip = false

axios.defaults.baseURL = 'TODO'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
