import { GetTreeList, GetAll } from '@/api/Organization'
import { GetAll as GetAllEmployee } from '@/api/Employee'

const store = {
  state: {
    organizations: [],
    workcenters: [],
    workers: [],
    tableData: [],
    total: 50

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
      SET_Employees: (state, payload, ptotal) => {
        state.tableData = payload
        state.total = ptotal
      }
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

    },

    GetEmployees ({ commit }, params) {
      GetAllEmployee(params).then(res => {
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
