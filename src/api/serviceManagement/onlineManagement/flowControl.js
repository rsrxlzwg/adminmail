import request from '@/utils/request'


export function getInfo(data) {
  return request({
    url: '/gov/online/flow/controls',
    method: 'post',
    data
  })
}
export function editInfo(data) {
    return request({
      url: '/gov/online/flow/control',
      method: 'put',
      data
    })
}
export function deleteOne(data) {
    return request({
      url: `/gov/online/flow/control/${data}`,
      method: 'delete',  
    })
}
export function getService(data) {
    return request({
      url: `/gov/offline/service/list/query/list`,
      method: 'post',  
      data
    })
  }
  export function getPolicy() {
    return request({
      url: `/esbBaseFlowControlPolicy/queryList`,
      method: 'get',  
    })
  }
  export function getTerminal(data) {
    return request({
      url: `/gov/app/terminal/info/query/list`,
      method: 'post',  
      data
    })
  }
  export function issueInfo(data) {
    return request({
      url: `/gov/online/down`,
      method: 'post',  
      data
    })
  }
export function submitInfo(data) {
    return request({
      url: '/gov/online/flow/control',
      method: 'post',
      data
    })
}