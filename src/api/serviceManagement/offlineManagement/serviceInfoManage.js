import request from '@/utils/request'
// 树
export function getServiceTree() {
  return request({
    url: '/gov/offline/service/catalog/tree',
    method: 'get'
  })
}
// 分页
export function getServices(data) {
  return request({
    url: '/gov/offline/service/lists',
    method: 'post',
    data
  })
}
// 详细信息
export function getServiceDetail(data) {
  return request({
    url: `/gov/offline/service/info/manage/${data}`,
    method: 'get'
  })
}
export function getMetadataList(data) {
  return request({
    url: `/gov/offline/metadata/info/query/list`,
    method: 'get',
    data
  })
}
