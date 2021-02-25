import request from '@/utils/request'

// 分页查询数据
export function getInfo(data) {
  return request({
    url: '/esbBaseProtocolManage/selectPage',
    method: 'post',
    data
  })
}

// 查询详情
export function getprotolInfo(data) {
  return request({
    url: '/esbBaseProtocolManage/getprotolInfo',
    method: 'post',
    data
  })
}
// 新增时获取 所有要关联的表list
export function getProtocolList() {
  return request({
    url: '/esbBaseProtocolManage/getProtocolList',
    method: 'get'
  })
}
// 新增时获取 flow详情列表
export function getBaseServiceList(data) {
  return request({
    url: '/esbBaseAdaptationFlowInfo/queryPage',
    method: 'post',
    data
  })
}
// 数据插入
export function submitInfo(data) {
  return request({
    url: '/esbBaseProtocolManage/insert',
    method: 'post',
    data
  })
}

// 数据更新
export function editInfo(data) {
  return request({
    url: `/esbBaseProtocolManage/update`,
    method: 'put',
    data
  })
}

// 数据查询
export function deleteInfo(data) {
  return request({
    url: `/esbBaseProtocolManage/deleteAll`,
    method: 'delete',
    data
  })
}
