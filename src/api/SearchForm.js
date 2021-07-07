import { axios } from '@/utils/request'

export function GetAll (params) {
  return axios({
    url: '/api/services/app/Common/GetQueryFields',
    method: 'GET',
    params: params
  })
}
