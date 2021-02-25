import request from '@/utils/request'
// 分页查所有
export function getInfo(data) {
    return request({
      url: '/center/configs',
      method: 'post',
      data
    })
  }

 // 新增
export function submitInfo(data) {
    return request({
      url: '/center/config',
      method: 'post',
      data
    })
  }
  // 修改
export function editInfo(data) {
    return request({
      url: `/center/config`,
      method: 'put',
      data
    })
  }
  // 删除1条
export function deleteOne(data) {
    return request({
      url: `/center/config/${data}`,
      method: 'delete',
    })
  }

  export function queryList(params) {
    return request({
      url: '/center/queryList',
      method: 'get',
      params
    })
  }
