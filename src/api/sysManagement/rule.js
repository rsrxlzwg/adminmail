import request from '@/utils/request'

//查询所有角色，返回树结构
export function getList(data) {
    return request({
      url: '/baseSysRoleEntity/queryAllRole',
      method: 'get',
      data
    })
  }

//查询角色详情
  export function getDetail(params) {
    return request({
      url: '/baseSysRoleEntity/selectOne',
      method: 'get',
      params
    })
  }
  
//编辑角色
  export function editInfo(data) {
    return request({
      url: `/baseSysRoleEntity/update`,
      method: 'put',  
      data 
    })
  }


//新增角色
  export function submitInfo(data) {
    return request({
      url: '/baseSysRoleEntity/insert',
      method: 'post',
      data
    })
  }


  //删除角色
  export function deleteInfo(data) {
    return request({
      url: `/baseSysRoleEntity/deleteAll`,
      method: 'delete',  
      data 
    })
  }

export function getInfo(data) {
  return request({
    url: '/baseSysUser/queryPage',
    method: 'post',
    data
  })
}


// 提交树
export function submitAuth(data) {
  return request({
    url: '/baseSysPermissionEntity/updateOperateAndDataRule',
    method: 'post',
    data
  })
}

// 获取树
export function getAllTree(data) {
  return request({
    url: '/baseSysPermissionEntity/showOperatePermissions',
    method: 'get',
    data
  })
}

// 获取权限
export function getAuthData(params) {
  return request({
    url: '/baseSysPermissionEntity/showOperatePermission',
    method: 'get',
    params
  })
}


// 获取所有的数据树
export function getAllDataTree(data) {
  return request({
    url: '/baseSysPermissionDataEntity/showDataRulePermissions',
    method: 'get',
    data
  })
}


// 获取数据权限
export function getPermissionAuthData(params) {
  return request({
    url: '/baseSysPermissionDataEntity/showDataPermission',
    method: 'get',
    params
  })
}





export function updateSort(data) {
  return request({
    url: `/baseSysRoleEntity/updateRoleSort`,
    method: 'put',  
    data 
  })
}