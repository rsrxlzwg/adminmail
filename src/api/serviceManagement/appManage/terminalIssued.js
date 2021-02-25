import request from '@/utils/request'

export function getParams(data) {
  return request({
    url: '/gov/app/terminal/params',
    method: 'post',
    data
  })
}
export function getVersiByName(data) {
  return request({
    url: '/gov/app/query/version/by/name',
    method: 'post',
    data
  })
}

export function getSdkTmp(data) {
  return request({
    url: '/gov/app/terminal/info/query/list',
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
export function submitParams(data) {
  return request({
    url: `/gov/app/terminal/params?terminalId=${data.id}&versionId=${data.versionId}`,
    method: 'put',
    data:data.params
  })
}
export function submitAppParams(data) {
  return request({
    url: `/gov/app/${data.id}/params`,
    method: 'put',
    data:data.params
  })
}
