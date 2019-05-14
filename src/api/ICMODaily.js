import { axios } from '@/utils/request'

export function ICMODailyGetAll (params) {
  return axios({
    url: '/api/services/app/ICMODaily/GetAll',
    method: 'get',
    params: params
  })
}
