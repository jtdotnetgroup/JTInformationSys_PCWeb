import { axios } from '@/utils/request'

export function GetAll (params) {
  return axios({
    url: '/api/services/app/User/GetAll',
    method: 'get',
    params: params
  })
}
// 获取明细
export function GetMx (params) {
  return axios({
    url: '/api/services/app/User/Get',
    method: 'get',
    params: params
  })
}
// 数据添加
export function DataAdd (params) {
  return axios({
    url: '/api/services/app/User/Create',
    method: 'POST',
    data: params
  })
}

// 数据删除
export function DataDel (params) {
  return axios({
    url: '/api/services/app/User/Delete',
    method: 'DELETE',
    params: params
  })
}

// 数据更改
export function DataPUT (params) {
  return axios({
    url: '/api/services/app/User/Update',
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 数据添加和修改
export function DataAddOrPUT (url, params) {
  return axios({
    url: url,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取明细
export function GetRoles () {
  return axios({
    url: '/api/services/app/User/GetRoles',
    method: 'get'
  })
}
