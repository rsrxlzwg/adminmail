import request from '@/utils/request'


export function getInfos(data) {
  return request({
    url: '/gov/online/service/find',
    method: 'post',
    data
  })
    
}
