import request from '@/utils/request'
export function getApps(data) {
  return request({
    url: '/gov/app/application/infos',
    method: 'post',
    data
  })
}
export function addApp(data) {
  return request({
    url: '/gov/app/application/info',
    method: 'post',
    data
  })
}
export function editApp(data) {
  return request({
    url: '/gov/app/application/info',
    method: 'put',
    data
  })
}
export function deleteOne(data) {
  return request({
    url: `/gov/app/application/info/${data}`,
    method: 'delete',
    data
  })
}
export function getProtocols() {
  return request({
    url: `esbBaseProtocolManage/selectAll`,
    method: 'get'
  })
}
export function startApp(data) {
  return request({
    url: `/gov/app/application/${data}/start`,
    method: 'put'
  })
}
export function stopApp(data) {
  return request({
    url: `/gov/app/application/${data}/stop`,
    method: 'put'
  })
}
