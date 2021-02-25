import request from '@/utils/request'
// 接口树
export function getInterfaceTree() {
  return request({
    url: '/gov/offline/interface/tree',
    method: 'get'
  })
}
// 分页
export function getInterfaces(data) {
  return request({
    url: '/gov/offline/interfaces',
    method: 'post',
    data
  })
}
// 新增
export function addInterface(data) {
  return request({
    url: '/gov/offline/interface',
    method: 'post',
    data
  })
}
// 编辑
export function editInterface(data) {
  return request({
    url: '/gov/offline/interface',
    method: 'put',
    data
  })
}
// 删除
export function deletetInterface(data) {
  return request({
    url: `/gov/offline/interface/${data}`,
    method: 'delete'
  })
}
// 字段查询
export function getFields(data) {
  return request({
    url: `/gov/offline/interface/${data}/fields`,
    method: 'get'
  })
}
// 字段新增
export function addField(data) {
  return request({
    url: `/gov/offline/interface/field`,
    method: 'post',
    data
  })
}
// 字段更新
export function editField(data) {
  return request({
    url: `/gov/offline/interface/field`,
    method: 'put',
    data
  })
}
// 字段删除
export function deleteField(data) {
  return request({
    url: `/gov/offline/interface/field/${data}`,
    method: 'delete'
  })
}
// 数据项查询
export function getFieldItems(data) {
  return request({
    url: `/gov/offline/interface/field/${data}/items`,
    method: 'get'
  })
}
// 数据项编辑
export function editFieldItems(data) {
  return request({
    url: `/gov/offline/interface/field/items`,
    method: 'put',
    data
  })
}
export function getApps() {
  return request({
    url: '/gov/app/application/info/query/list',
    method: 'get'
  })
}
export function getProtocols() {
  return request({
    url: `/esbBaseProtocolManage/selectAll`,
    method: 'get'
  })
}
export function getMetadataList(data) {
  return request({
    url: `/gov/offline/metadata/info/query/list`,
    method: 'get',
    data
  })
}
