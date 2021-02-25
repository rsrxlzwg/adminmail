import request from '@/utils/request'
export function getInfo(data) {
    return request({
      url: '/gov/online/load/manages',
      method: 'post',
      data
    })
  }
  export function editInfo(data) {
      return request({
        url: '/gov/online/load/manage',
        method: 'put',
        data
      })
  }
  export function deleteOne(data) {
      return request({
        url: `/gov/online/load/manage/${data}`,
        method: 'delete',  
      })
  }
  export function submitInfo(data) {
    return request({
      url: '/gov/online/load/manage',
      method: 'post',
      data
    })
}
export function getPolicy() {
    return request({
      url: `esbBaseLoadManagePolicy/queryList`,
      method: 'get',  
    })
  }