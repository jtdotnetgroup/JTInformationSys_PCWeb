
import { axios } from '@/utils/request'

//  查询成员管理
export function GetRoleUser (params) {
  return axios({
    url: '/api/services/app/VW_RoleUserAll/GetRoleUser', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'get',
    params: params

  })
}

// 角色赋值
export function Create (params) {
  return axios({
    url: '/api/services/app/VW_RoleUserAll/Create', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'POST',
    data: params

  })
}
