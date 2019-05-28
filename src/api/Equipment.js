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

export function CreateOrUpdateShift (data) {
  return axios({
    url: '/api/services/app/Equipment/CreateOrUpdateShift',
    method: 'post',
    data
  })
}

export function GetShiftList (params) {
  return axios({
    url: '/api/services/app/Equipment/GetShiftByEquipmentID',
    method: 'get',
    params
  })
}

export function DeleteShift (params) {
  return axios({
    url: '/api/services/app/Equipment/DeleteShift',
    method: 'delete',
    params
  })
}
