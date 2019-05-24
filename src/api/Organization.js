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

// 通过 枚举返回list集合
export function GetSelectOptio () {
  return axios({
    url: '/api/services/app/Organization/GetSelectOptio', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'get'
  })
}

// 新增组织Create
export function CreateOu (parameter) {
  return axios({
    url: '/api/services/app/Organization/Create', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'post',
    data: parameter

  })
}

// 删除组织
export function DeleteOu (parameter) {
  return axios({
    url: '/api/services/app/Organization/Delete', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'DELETE',
    params: parameter

  })
}
