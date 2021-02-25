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
    url: '/gov/pub/messages',
    method: 'post',
    data
  })
}