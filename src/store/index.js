import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import localizations from './/modules/localization'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    localizations
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
