// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import { Localization } from './utils/helper/localization'
import { message } from 'ant-design-vue/es/message'

import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$Localiztion = Localization
Vue.prototype.$message = message

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
