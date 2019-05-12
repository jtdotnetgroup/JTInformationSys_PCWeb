import { getUserList } from '@/api/manage'

export const store = {
  state: {
    userList: []

  },
  mutations: {
    SET_USERS: (state, userList) => {
      state.userList = userList
    }
  },
  actions: {
    getUserList ({ commit }, params) {
      getUserList(params).then(res => {
        console.log(res)
      })
    }
  }
}
