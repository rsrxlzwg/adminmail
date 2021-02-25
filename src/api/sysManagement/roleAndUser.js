import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/baseSysRoleEntity/queryAllRole',
    method: 'get'
  })
}
export function getAllUsers(data) {
  return request({
    url: '/baseSysUser/queryPage',
    method: 'post',
    data
  })
}
export function getUsersByroleId(data) {
  return request({
    url: '/baseSysUserRole/queryPage',
    method: 'post',
    data
  })
}

export function insertRoleUsers(data) {
  return request({
    url: '/baseSysUserRole/insert',
    method: 'post',
    data
  })
}
export function deleteAll(data) {
  return request({
    url: '/baseSysUserRole/deleteAll',
    method: 'delete',
    data
  })
}
