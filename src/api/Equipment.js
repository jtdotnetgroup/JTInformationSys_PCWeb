import { axios } from '@/utils/request'

export function Create (data) {
  return axios({
    url: '/api/services/app/Equipment/Create',
    method: 'post',
    data
  })
}

export function Update (data) {
  return axios({
    url: '/api/services/app/Equipment/Update',
    method: 'put',
    data
  })
}

export function Delete (data) {
  return axios({
    url: '/api/services/app/Equipment/Delete',
    method: 'delete',
    data
  })
}

export function GetAll (params) {
  return axios({
    url: '/api/services/app/Equipment/GetAll',
    method: 'get',
    params
  })
}
