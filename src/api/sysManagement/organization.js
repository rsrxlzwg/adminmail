import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/baseSysOrg/selectOrgTree',
    method: 'get',
    params
  })
}
export function submitInfo(data) {
  return request({
    url: '/baseSysOrg/insert',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/baseSysOrg/update`,
    method: 'put',  
    data 
  })
}
export function deleteInfo(data) {
  return request({
    url: `/baseSysOrg/deleteAll`,
    method: 'delete',  
    data 
  })
}
export function updateSort(data) {
  return request({
    url: `/baseSysOrg/updateSort`,
    method: 'put',  
    data 
  })
}
