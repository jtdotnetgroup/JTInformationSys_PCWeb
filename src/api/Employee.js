import { axios } from '@/utils/request'

// 通过 ID去查询员工的信息
export function GetAll (params) {
  return axios({
    url: '/api/services/app/Employee/GetAll',
    method: 'get'
    // 新增组织Create

  })
}

export function CreateEm (parameter) {
  return axios({
    url: '/api/services/app/Employee/Create', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'post',
    data: parameter

  })
}

// 员工编号
export function GetFMpno () {
  return axios({
    url: '/api/services/app/Employee/FMpno', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'post'
  })
}

// 员工编号
export function Update (params) {
  return axios({
    url: '/api/services/app/Employee/Update', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'PUT',
    data: params

  })
}

// 员工删除
export function Delete (params) {
  return axios({
    url: '/api/services/app/Employee/Delete', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'DELETE',
    params: params

  })
}
