import { axios } from '@/utils/request'

export function get (id) {
  return axios({
    url: 'http://localhost:21021/api/services/app/ICMODaily/Get?Id=1',
    method: 'get'
  })
}
