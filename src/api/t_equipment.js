import { axios } from '@/utils/request'

export function GetAllList (params) {
  return axios({
    url: '/api/services/app/t_equipment/t_equipmentList',
    method: 'POST',
    data: params
  })
}
// 获取明细
export function GetSelectModel (params) {
  return axios({
    url: '/api/services/app/Organization/GetSelectModel',
    method: 'get',
    params: params
  })
}
