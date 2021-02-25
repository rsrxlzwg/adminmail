import request from '@/utils/request'
export function getMetadatas(data) {
  return request({
    url: '/gov/offline/metadata/infos',
    method: 'post',
    data
  })
}
export function addtMetadata(data) {
  return request({
    url: '/gov/offline/metadata/info',
    method: 'post',
    data
  })
}
export function editMetadata(data) {
  return request({
    url: '/gov/offline/metadata/info',
    method: 'put',
    data
  })
}
export function deletetMetadata(data) {
  return request({
    url: `/gov/offline/metadata/info/${data}`,
    method: 'delete',
    data
  })
}
export function download() {
  return request({
    url: `/gov/offline/metadata/info/download`,
    method: 'get'
  })
}
export function upload() {
  return request({
    url: `/gov/offline/metadata/info/upload`,
    method: 'post'
  })
}
export function getModel() {
  return request({
    url: `/gov/offline/metadata/info/model`,
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

export function getReferenceList(data) {
  return request({
    url: `/gov/offline/metadata/reference/query/list`,
    method: 'post',
    data
  })
}

export function getDistinctMeta(data){
  return request({
    url: `/gov/offline/metadata/distinct`,
    method: 'post',
    data
  })
}

