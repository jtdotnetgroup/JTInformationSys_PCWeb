import { axios } from '@/utils/request'

// 树形的查询方法
export function GetTreeList (params) {
  return axios({
    url: '/api/services/app/Organization/GetTreeList', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'get',
    params: params

  })
}

// 通过 ID去查询员工的信息
export function GetAll (params) {
  return axios({
    url: '/api/services/app/Employee/GetAll', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'get',
    params: params

  })
}
