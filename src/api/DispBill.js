import { axios } from '@/utils/request'

export function SaveDispBillList (data) {
  return axios({
    url: '/api/services/app/ICMODispBill/Create',
    method: 'post',
    data: data
  })
}

export function GetDailyDispBillList (data) {
  return axios({
    url: '/api/services/app/ICMODispBill/Post_GetDailyDispatchList',
    method: 'post',
    data
  })
}

export function GetAllDispBill (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/GetAll',
    method: 'get',
    params
  })
}

export function CloseDispBill (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/CloseOrder',
    method: 'DELETE',
    params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function DeleteDailyAndDispBill (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/DeleteDailyAndDispBill',
    method: 'DELETE',
    data: params
  })
}

export function UpdateDispBill (params) {
  return axios({
    url: '/api/services/app/ICMODispBill/UpdateDispBill',
    method: 'PUT',
    data: params
  })
}
