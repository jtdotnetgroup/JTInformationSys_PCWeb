import { axios } from '@/utils/request'

export function GetDaily (Id) {
  return axios({
    url: '/api/services/app/ICMODaily/Get',
    method: 'get',
    params: { Id }
  })
}

export function GetDailyAll (Sorting, SkipCount, MaxResultCount) {
  return axios({
    url: '/api/services/app/VW_MOBillList/GetDaTask', // /api/services/app/VW_MOBillList/GetDaTask
    method: 'get',
    params: { Sorting, SkipCount, MaxResultCount }

  })
}
