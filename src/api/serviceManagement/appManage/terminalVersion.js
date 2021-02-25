import request from '@/utils/request'

// 分页查所有
export function getInfo(params) {
  return request({
    url: '/gov/app/query/version/name',
    method: 'get',
    params
  })
}
// 上传
export function uploadInfo(data) {
  return request({
    url: '/gov/app/upload',
    method: 'post',
    data
  })
}
// 下载
export function download(data) {
  return request({
    url: `/gov/app/download`,
    method: 'post',
    data
  })
} 
// 删一个
export function deleteOne(data) {
  return request({
    url: `/gov/app/delete/${data}`,
    method: 'delete'
  })    
} 
export function getPage(data) {
  return request({
    url: '/gov/app/selectAll',
    method: 'post',
    data
  })
}