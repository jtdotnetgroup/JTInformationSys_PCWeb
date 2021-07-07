import { axios } from '@/utils/request'

// 工序查询
export function GetTree () {
  return axios({
    url: '/api/services/app/TB_BadItemRelation/GetTree',
    method: 'get'

  })
}

// 通过工序ID去查询不良项目
export function GetAllBadItemRelation (params) {
  return axios({
    url: '/api/services/app/TB_BadItemRelation/GetAllBadItemRelation',
    method: 'get',
    params: params

  })
}

// 新增不良项目
export function Create (params) {
  return axios({
    url: '/api/services/app/TB_BadItemRelation/Create',
    method: 'post',
    data: params
  })
}

// 修改不良项目
export function Update (params) {
  return axios({
    url: '/api/services/app/TB_BadItemRelation/Update',
    method: 'PUT',
    data: params
  })
}

// 删除不良项目
export function Delete (params) {
  return axios({
    url: '/api/services/app/TB_BadItemRelation/Delete',
    method: 'Delete',
    params: params
  })
}

// 通过名称
export function GetICItem (params) {
  return axios({
    url: '/api/services/app/TB_BadItemRelation/GetICItem',
    method: 'Get',
    params: params
  })
}
