import request from '@/utils/request'

export function getTree() {
  return request({
    url: '/gov/offline/service/catalog/tree',
    method: 'get',
  })
}
export function submitInfo(data) {
  return request({
    url: '/gov/offline/service/catalog',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/gov/offline/service/catalog`,
    method: 'put',  
    data 
  })
}
// 删除1条
export function deleteOne(data) {
  return request({
    url: `/gov/offline/service/catalog/${data}`,
    method: 'delete',  
  })
}
export function getObject(data) {
  return request({
    url: `/gov/offline/service/catalogs/${data}`,
    method: 'get',  
  })

}