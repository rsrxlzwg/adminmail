import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/credential',
    method: 'get',
    params
  })
}
export function submitInfo(data) {
  return request({
    url: '/v1/credential',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/v1/credential/${data.id}`,
    method: 'put',
    data
  })
}
export function delInfo(id) {
  return request({
    url: `/v1/credential/${id}`,
    method: 'delete',
  })
}
