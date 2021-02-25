import request from '@/utils/request'

// 分页查询数据
export function getInfo(data) {
  return request({
    url: '/gov/pub/app/page',
    method: 'post',
    data
  })
}

// 数据插入
export function submitInfo(data) {
  return request({
    url: '/gov/pub/app/pulish',
    method: 'post',
    data
  })
}

// 数据更新
export function editInfo(data) {
  return request({
    url: '/gov/pub/app/pulish',
    method: 'put',
    data
  })
}

// 数据删除
export function deleteInfo(data) {
  return request({
    url: '/gov/pub/app/pulish',
    method: 'delete',
    data
  })
}
// 查询子页面的数据
export function editFun(data){
  return request({
    url: '/gov/pub/app/publish/'+data,
    method: 'get',
    data
  })
}

