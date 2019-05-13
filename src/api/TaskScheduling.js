import { axios } from '@/utils/request'

export function GetTaskSchedulData (params) {
  return axios({
    url: '/api/services/app/TaskScheduling/GetAll',
    method: 'get',
    params: params
  })
}
