import { GetTreeList, GetAll } from '@/api/Organization'

const store = {
  state: {
    organizations: [],
    tableData: [],
    total: 50

  },
  mutations: {
    SET_ORGANIZATIONS: (state, payload) => {
      state.organizations = payload
    },
    SET_Employees: (state, payload, ptotal) => {
      state.tableData = payload
      state.total = ptotal
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
    GetEmployees ({ commit }, params) {
      GetAll(params).then(res => {
        const result = res.result

        if (result) {
          var tableData = result.items

          var total = result.totalCount

          commit('SET_Employees', tableData, total)
        }
      }).catch(err => {
        console.log(err)
      })
    }

  }
}

export default store
