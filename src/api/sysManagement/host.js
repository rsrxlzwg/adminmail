import request from '@/utils/request'

export function getHost(params) {
  return request({
    url: '/v1/host',
    method: 'get',
    params
  })
}
export function submitInfo(data) {
  return request({
    url: '/v1/host',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/v1/host/${data.id}`,
    method: 'put',
    data
  })
}
export function delInfo(id) {
  return request({
    url: `/v1/host/${id}`,
    method: 'delete',
  })
}

