import { axios } from '@/utils/request'

export function SaveDispBillList (data) {
  return axios({
    url: '/api/services/app/ICMODispBill/Create',
    method: 'post',
    data: data
  })
}
<<<<<<< HEAD

console.log('')
=======
>>>>>>> parent of bfd126e... Revert "OK"
