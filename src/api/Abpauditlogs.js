import { axios } from '@/utils/request'

// 查询日志的方法
export function GetAll (params) {
  return axios({
    url: '/api/services/app/AuditLog/GetAll',
    method: 'get',
    params: params
  })
}
