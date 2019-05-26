import { GetTreeList, GetAll } from '@/api/Organization'

const store = {
  state: {
    organizations: [],
    workcenters: [],
    workers: []
  },
  mutations: {
    SET_ORGANIZATIONS: (state, payload) => {
      state.organizations = payload
    },
    SET_WORKCENTERS: (state, payload) => {
      state.workcenters = payload
    },
    SET_WORKERS: (state, payload) => {
      state.workers = payload
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
    },
    GetWorkCenters ({ commit }, params) {
      // 获取所有车间,车间代码为4
      params = {
        OrganizationType: 4
      }

      GetAll(params)
        .then(res => {
          var organizations = res.result
          commit('SET_WORKCENTERS', organizations)
        }).catch(err => {
          console.log(err)
        })
    },
    GetWorkers ({ commit }, params) {

    }
  }
}

export default store
