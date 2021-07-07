import { axios } from '@/utils/request'

export function GetAll (params) {
  return axios({
    url: '/api/services/app/Sys_BasicInfo/GetAll',
    method: 'get',
    params: params
  })
}
export function GetAll3 (params) {
  return axios({
    url: '/api/services/app/Sys_BasicInfo/GetAll3',
    method: 'get',
    params: params
  })
}

export function Create (params) {
  return axios({
    url: '/api/services/app/Sys_BasicInfo/Create',
    method: 'post',
    data: params
  })
}

export function Delete (params) {
  return axios({
    url: '/api/services/app/Sys_BasicInfo/Delete',
    method: 'post',
    data: params
  })
}
