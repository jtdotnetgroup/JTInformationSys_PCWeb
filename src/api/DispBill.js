import { axios } from '@/utils/request'

export function SaveDispBillList (data) {
  return axios({
    url: '/api/services/app/ICMODispBill/Create',
    method: 'post',
    data: data
  })
}

export function GetDailyDispBillList (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/GetDailyDispatchList',
    method: 'get',
    params
  })
}
