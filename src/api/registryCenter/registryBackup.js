import request from '@/utils/request'
// 分页查所有
export function getInfo(data) {
    return request({
      url: '/center/backups',
      method: 'post',
      data
    })
  } 
  
 // 新增
export function submitInfo(data) {
    return request({
      url: '/center/backup',
      method: 'post',
      data
    })
  } 

   // 修改
export function editInfo(data) {
    return request({
      url: `/center/backup`,
      method: 'put',
      data 
    })
  }
  // 删除1条
export function deleteOne(data) {
    return request({
      url: `/center/backup/${data}`,
      method: 'delete', 
    })
  }
   // 切换
export function switchInfo(data) {
    return request({
      url: '/center/switch',
      method: 'post',
      data
    })
  } 

  
