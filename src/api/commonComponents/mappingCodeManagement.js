import request from '@/utils/request'

// 分页查询数据
export function getInfo(data) {
  return request({
    url: '/esbBaseMappingCode/selectAll',
    method: 'post',
    data
  })
}

// 数据插入
export function submitInfo(data) {
  return request({
    url: '/esbBaseMappingCode/insert',
    method: 'post',
    data
  })
}

// 数据更新
export function editInfo(data) {
  return request({
    url: `/esbBaseMappingCode/update`,
    method: 'put',
    data
  })
}

// 数据查询
export function deleteInfo(data) {
  return request({
    url: `/esbBaseMappingCode/deleteAll`,
    method: 'delete',
    data
  })
}


// 查看列表详情
export function editFun(data) {
  return request({
    url: `/esbBaseMappingCode/selectOne/`+data,
    method: 'get'
  })
}
