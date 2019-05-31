import { axios } from '@/utils/request'

export function GetTaskSchedulData (params) {
  // 查所有任务单接口
  return axios({
    url: '/api/services/app/TaskScheduling/GetAll',
    method: 'get',
    params: params
  })
}

export function GetAllDailyList (params) {
  // 查所有日计划单接口
  return axios({
    url: '/api/services/app/ICMODispBill/GetAll',
    method: 'get',
    params: params
  })
}

export function SaveDailyList (data) {
  // 保存日计划单接口
  return axios({
    url: '/api/services/app/ICMODaily/Create',
    method: 'post',
    data: data
  })
}

export function GetAllDailyByFMOInterID (params) {
  // 根据任务单ID获取所有日计划单排产数据
  return axios({
    url: '/api/services/app/ICMODaily/GetMOBillPlanDetail',
    method: 'get',
    params: params
  })
}
