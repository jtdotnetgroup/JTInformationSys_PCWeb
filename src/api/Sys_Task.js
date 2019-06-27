import { axios } from '@/utils/request'

export function GetAllList (params) {
  return axios({
    url: '/api/services/app/Sys_Task/Sys_TaskList',
    method: 'POST',
    data: params
  })
}
// 获取明细
export function GetMx (params) {
  return axios({
    url: '/api/services/app/Sys_Task/Get',
    method: 'get',
    params: params
  })
}
// 数据添加
export function DataAdd (params) {
  return axios({
    url: '/api/services/app/Sys_Task/UpdOrAdd',
    method: 'POST',
    data: params
  })
}
// 获取明细
export function TaskRecordGetAll (params) {
  return axios({
    url: '/api/services/app/Sys_TaskRecord/GetAll',
    method: 'get',
    params: params
  })
}
