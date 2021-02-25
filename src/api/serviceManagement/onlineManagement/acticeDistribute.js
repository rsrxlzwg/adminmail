import request from '@/utils/request'
// 分页查所有
export function getInfo(data) {
    return request({
      url: '/gov/online/actice/distributes',
      method: 'post',
      data
    })
  } 
  
 // 新增
export function submitInfo(data) {
    return request({
      url: '/gov/online/actice/distribute',
      method: 'post',
      data
    })
  } 
  // 修改
export function editInfo(data) {
    return request({
      url: `/gov/online/actice/distribute`,
      method: 'put',
      data 
    })
  }
  // 删除1条
export function deleteOne(data) {
    return request({
      url: `/gov/online/actice/distribute/${data}`,
      method: 'delete', 
    })
  }
  export function getGroup(data) {
    return request({
      url: `/gov/app/terminal/group/query/list`,
      method: 'post',  
      data
    })
  }
 