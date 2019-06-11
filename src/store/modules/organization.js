import { GetTreeList, GetAll } from '@/api/Organization'
import { GetAll as GetAllEmployee, GetAllWorkers } from '@/api/Employee'

const store = {
  state: {
    organizations: [],
    workcenters: [],
    workers: [],
    tableData: []

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
    },
    SET_Employees: (state, payload) => {
      state.tableData = payload
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
        isWorkCenter: true
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
      GetAllWorkers()
        .then(res => {
          var result = res.result
          commit('SET_WORKERS', result.items)
        }).catch(err => {
          console.log(err)
        })
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
