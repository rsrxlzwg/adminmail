import request from '@/utils/request'
// get
// export function getInfo(params) {
//   return request({
//     url: '/esbMqConfig/selectPage',
//     method: 'post',
//     params
//   })
// }
export function getInfo(data) {
  return request({
    url: '/esbMqMessage/selectPage',
    method: 'post',
    data
  })
}
export function getIdList(){
  return request({
    url: '/esbMqConfig/queryList',
    method: 'get',
  })
}
