import { axios } from '@/utils/request'

export function GetDaily (Id) {
  return axios({
    url: '/api/services/app/ICMODaily/Get',
    method: 'get',
    params: { Id }
  })
}

export function GetDailyAll (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/GetDailyGroup', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'get',
    params: params

  })
}

export function GetDispBillAll (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/GetDailyFsrIdTask', // /api/services/app/VW_MOBillList/GetDaTask 模态表
    method: 'get',
    params: params

  })
}

export function CreateAll (parameter) {
  return axios({
    url: '/api/services/app/ICMODispBill/Create', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'post',
    data: parameter
  })
}
