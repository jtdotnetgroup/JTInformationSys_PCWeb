import { GetTreeList, GetAll } from '@/api/Organization'
import { GetAll as GetAllEmployee, GetAllWorkers } from '@/api/Employee'
import { resolve } from 'url'

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

        // TerrArray()
        // var organizations = []
        // res.result.forEach(e => {
        //   e.slots = { icon: 'smile' }
        //   organizations.push(e)
        // })

        var array = TerrArray(organizations)

        // console.log(array)

        console.log(array)
        commit('SET_ORGANIZATIONS', array)
      }).catch(err => {
        console.log(err)
      })
    },
    GetWorkCenters ({ commit }, params) {
      // 获取所有车间
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

// 递归的方法拼接图标
function TerrArray (data) {
  var tree = []
  for (var i = 0; i < data.length; i++) {
    var obj = data[i]
    obj.slots = { icon: 'folder' }

    if (data[i].children.length > 0) {
      obj.slots = { icon: 'folderopen' }
      TerrArray(data[i].children)
    }
    tree.push(obj)
  }
  return tree
}

export default store
