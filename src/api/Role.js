import { axios } from '@/utils/request'

export function GetAll (params) {
  return axios({
    url: '/api/services/app/Role/GetAll',
    method: 'get',
    params: params
  })
}

export function Create (data) {
  return axios({
    url: '/api/services/app/Role/Create',
    method: 'post',
    data: data
  })
}

export function Update (data) {
  return axios({
    url: '/api/services/app/Role/Update',
    method: 'post',
    data: data
  })
}

export function Delete (Id) {
  return axios({
    url: '/api/services/app/Role/Delete',
    method: 'post',
    data: { Id }
  })
}
