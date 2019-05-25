import { axios } from '@/utils/request'

// 通过 ID去查询员工的信息
export function GetAll (params) {
  return axios({
    url: '/api/services/app/Employee/GetAll',
    method: 'get',
    params: params

  })
}
