import request from '@/utils/request'
// get
// export function getInfo(params) {
//   return request({
//     url: '/esbBaseProtocolInfo/selectAll',
//     method: 'get',
//     params
//   })
// }
export function getInfo(data) {
  return request({
    url: '/gov/offline/service/baffles',
    method: 'post',
    data
  })
}
export function submitInfo(data) {
  return request({
    url: '/gov/offline/service/baffle',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/gov/offline/service/baffle`,
    method: 'put',  
    data 
  })
}
// 删除1条
export function deleteOne(data) {
  return request({
    url: `/gov/offline/service/baffle/${data}`,
    method: 'delete',  
  })
}
// 批量删除
export function deleteInfo(data) {
  return request({
    url: `/gov/offline/service/baffle`,
    method: 'delete',  
    data 
  })
}
