import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/storage/nfs',
    method: 'get',
    params
  })
}
export function submitInfo(data) {
  return request({
    url: '/v1/storage/nfs',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/v1/storage/nfs/${data.id}`,
    method: 'put',
    data
  })
}
export function delInfo(id) {
  return request({
    url: `/v1/storage/nfs/${id}`,
    method: 'delete',
  })
}
