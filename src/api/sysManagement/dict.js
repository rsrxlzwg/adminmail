import request from '@/utils/request'

// 分页查询数据
export function getInfo(data) {
  return request({
    url: '/sys/dict/selectPage',
    method: 'post',
    data
  })
}

// 数据插入
export function submitInfo(data) {
  return request({
    url: '/sys/dict/insert',
    method: 'post',
    data
  })
}

// 数据更新
export function editInfo(data) {
  return request({
    url: '/sys/dict/update',
    method: 'put',
    data
  })
}

// 数据查询
export function deleteInfo(data) {
  return request({
    url: '/sys/dict/delete',
    method: 'delete',
    data
  })
}
// 查询子页面的数据
export function selectAddInfo(data){
  return request({
    url: '/sys/dictInfo/selectAll',
    method: 'post',
    data
  })
}

