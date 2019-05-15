import { axios } from '@/utils/request'

export function GetTaskSchedulData (params) {
  return axios({
    url: '/api/services/app/TaskScheduling/GetAll',
    method: 'get',
    params: params
  })
}

export function GetAllDailyList (params) {
  return axios({
    url: 'api/services/app/ICMODispBill/GetAll',
    method: 'get',
    params: params
  })
}

export function SaveDailyList (data) {
  return axios({
    url: '/api/services/app/ICMODaily/Create',
    method: 'post',
    data: data
  })
}
