import request from '@/utils/unpackRequest'

export function getInfo(data) {
  return request({
    url: '/esbBaseUnpackPackConfig/selectPage',
    method: 'post',
    data
  })
}
export function submitInfo(data) {
  return request({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/esbBaseUnpackPackConfig/insert',
    method: 'post',
    data
  })
}
export function editInfo(data) {
  return request({
    url: `/esbBaseUnpackPackConfig/update`,
    method: 'post',  
    data 
  })
}
export function deleteOne(data) {
  return request({
    url: `/esbBaseUnpackPackConfig/deleteAll`,
    method: 'delete',  
    data 
  })
}

export function downInfo(data) {
    return request({
      url: `/esbBaseUnpackPackConfig/downloadXml/`+data,
      method: 'post',
      responseType: 'blob'
    })
  }
  
  export function getService(data) {
      return request({
        url: `/gov/offline/service/list/query/list`,
        method: 'post',
        data
      })
    }
    export function getPattern(params) {
        return request({
          url: `/esbBaseMessagePattern/queryList`,
          method: 'get',
          params
        })
      }
    
