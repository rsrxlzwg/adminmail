import request from '@/utils/request'
// 分页查所有
export function getInfo(data) {
    return request({
      url: '/gov/offline/service/lists',
      method: 'post',
      data
    })
  }
  // 根据id查应用名
  export function getApp(params) {
    return request({
      url: `/gov/app/application/info/query/list`,
      method: 'get',
      params
    })
  }
  // 新增
  export function submitInfo(data) {
    return request({
      url: '/gov/offline/service/list',
      method: 'post',
      data
    })
  }
  // 修改
  export function editInfo(data) {
    return request({
      url: `/gov/offline/service/list`,
      method: 'put',
      data
    })
  }
  // 删除1条
  export function deleteOne(data) {
    return request({
      url: `/gov/offline/service/list/${data}`,
      method: 'delete',
    })
  }
  // 服务挡板名查询
  export function getServiceBaffle(params) {
    return request({
      url: `/gov/offline/service/baffle/query/list`,
      method: 'get',
      params
    })
  }
  //审批完成
  export function addServiceApproval(data) {
    return request({
      url: `/gov/offline/service/approval`,
      method: 'post',
      data
    })
  }

  export function getCatalog(data) {
    return request({
      url: `/gov/offline/service/catalogs/${data}`,
      method: 'get',
    })
  }


  export function getInterface(data) {
    return request({
      url: '/gov/offline/interface/info/query/list',
      method: 'post',
      data
    })
  }
