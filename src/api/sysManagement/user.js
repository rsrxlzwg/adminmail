import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: '/baseSysUser/queryPage',
    method: 'post',
    data
  })
}
export function getDetail(params) {
  return request({
    url: '/baseSysUser/selectOne',
    method: 'get',
    params
  })
}
export function submitInfo(data) {
  return request({
    url: '/baseSysUser/insert',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/baseSysUser/update`,
    method: 'put',  
    data
  })
}
export function deleteInfo(data) {
  return request({
    url: `/baseSysUser/deleteAll`,
    method: 'delete',  
    data 
  })
}
export function selectOrgTree(params) {
  return request({
    url: '/baseSysOrg/selectOrgTree',
    method: 'get',
    params
  })
}

export function selectCompany(params) {
  return request({
    url: '/baseSysOrg/selectCompany',
    method: 'get',
    params
  })
}
