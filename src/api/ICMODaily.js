import { axios } from '@/utils/request'

export function ICMODailyGetAll (params) {
  return axios({
    url: '/api/services/app/ICMODaily/GetAll',
    method: 'get',
    params: params
  })
}

export function GetDailyListByFMOInterID (params) {
  return axios({
    url: '/api/services/app/ICMODaily/GetDailyListByFMOInterID',
    method: 'get',
    params: params
  })
}

export function ImportExcel (data) {
  return axios({
    url: '/api/services/app/ICMODaily/ImportFromExcel',
    method: 'post',
    data
  })
}
// 导入
export function ImportExcelList (data) {
  return axios({
    url: '/api/services/app/ICMODaily/ImportDaily',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
