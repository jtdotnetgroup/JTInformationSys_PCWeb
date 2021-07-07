import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import localizations from './modules/localization'
import organizations from './modules/organization'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    localizations,
    organizations
  },
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {

  },
  getters
})
