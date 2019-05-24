import { GetTreeList } from '@/api/Organization'

const store = {
  state: {
    organizations: []
  },
  mutations: {
    SET_ORGANIZATIONS: (state, payload) => {
      state.organizations = payload
    }
  },
  actions: {
    GetOrganizations ({ commit }, params) {
      GetTreeList(params).then(res => {
        var organizations = res.result
        commit('SET_ORGANIZATIONS', organizations)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

export default store
