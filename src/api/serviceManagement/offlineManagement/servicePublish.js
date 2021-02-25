import request from '@/utils/request'


export function getInfo(data) {
  return request({
    url: '/gov/offline/service/lists',
    method: 'post',
    data
  })
}
export function publish(data) {
    return request({
      url: `/gov/offline/service/publish`,
      method: 'put',  
      data 
    })
}
export function cancel(data) {
      return request({
        url: `/gov/offline/service/cancel`,
        method: 'put',  
        data 
})
    
}
