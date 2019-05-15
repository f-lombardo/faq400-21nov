import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'

import './registerServiceWorker'
import './smeupComponents'

import DynamismManager from './classes/DynamismManager'

Vue.config.productionTip = false

axios.defaults.baseURL = 'TODO'

// adding dynamism manager to Vue
Vue.prototype.$dynamismManager = new DynamismManager()

const Instance = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

console.log(Instance);