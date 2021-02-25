import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: '/baseLogAudit/queryPage',
    method: 'post',
    data
  })
}

