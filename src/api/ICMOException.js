import { axios } from '@/utils/request'

export function GetExceptionsByDispFid (params) {
  return axios({
    url: '/api/services/app/ICException/GetAll',
    method: 'get',
    params
  })
}
