const store = {
  state: {
    localizationSources: {}
  },
  mutations: {
    SET_LOCALIZATION: (state, payload) => {
      state.localizationSources = payload
    }
  },
  actions: {
    UpdateLocalization ({ commit }, localizationSources) {
      commit('SET_LOCALIZATION', localizationSources)
    }
  }
}

export default store
