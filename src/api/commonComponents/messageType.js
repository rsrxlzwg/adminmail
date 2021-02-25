import request from '@/utils/request'

// 分页查询数据
export function getInfo(data) {
  return request({
    url: '/esbBaseMessagePattern/selectAll',
    method: 'post',
    data
  })
}

// 数据插入
export function submitInfo(data) {
  return request({
    url: '/esbBaseMessagePattern/insert',
    method: 'post',
    data
  })
}

// 数据更新
export function editInfo(data) {
  return request({
    url: `/esbBaseMessagePattern/update`,
    method: 'put',
    data
  })
}

// 数据查询
export function deleteInfo(data) {
  return request({
    url: `/esbBaseMessagePattern/deleteAll`,
    method: 'delete',
    data
  })
}
