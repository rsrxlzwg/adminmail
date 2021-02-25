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
    url: '/esbMqConfig/selectPage',
    method: 'post',
    data
  })
}
export function submitInfo(data) {
  return request({
    url: '/esbMqConfig/insert',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/esbMqConfig/update`,
    method: 'put',  
    data 
  })
}
export function deleteInfo(data) {
  return request({
    url: `/esbMqConfig/deleteAll`,
    method: 'delete',  
    data 
  })
}
export function getoneInfo(data) {
    return request({
      url: '/esbMqConfig/selectOne',
      method: 'get',
      data
    })
  }
  export function editFun(data) {
        return request({
          url: '/esbMqConfig/selectOne/'+data,
          method: 'get',
          data
        })
      }