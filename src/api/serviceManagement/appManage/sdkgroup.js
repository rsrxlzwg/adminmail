import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: '/gov/app/terminal/groups',
    method: 'post',
    data
  })
}
export function submitInfo(data) {
  return request({
    url: '/gov/app/terminal/group',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/gov/app/terminal/group`,
    method: 'put',  
    data 
  })
}
// 删除1条
export function deleteOne(data) {
  return request({
    url: `/gov/app/terminal/group/${data}`,
    method: 'delete',  
  })
}
export function getApp(params) {
  return request({
    url: `/gov/app/application/info/query/list`,
    method: 'get',  
    params 
  })
}
export function getGroup(data) {
    return request({
      url: `/gov/app/terminal/group/query/list`,
      method: 'post',  
      data 
    })
}
