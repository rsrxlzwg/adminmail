import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: '/gov/app/terminal/infos',
    method: 'post',
    data
  })
}
export function submitInfo(data) {
  return request({
    url: '/gov/app/terminal/info',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/gov/app/terminal/info`,
    method: 'put',
    data
  })
}

export function sendVersion(data) {
  return request({
    url: '/gov/app/version/send',
    method: 'put',
    data
  })
}

// 删除1条
export function deleteOne(data) {
  return request({
    url: `/gov/app/terminal/info`,
    method: 'delete',
    data
  })
}
