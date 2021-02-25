import request from '@/utils/request'

//查询所有菜单，返回树结构
export function getMenuTree(data) {
    return request({
      url: '/baseSysMenuEntity/selectAllMenu',
      method: 'get',
      data
    })
  }


//新增菜单
export function submitMenuInfo(data) {
    return request({
      url: '/baseSysMenuEntity/insert',
      method: 'post',
      data
    })
  }


    
//编辑菜单
export function editMenuInfo(data) {
    return request({
      url: `/baseSysMenuEntity/updateById`,
      method: 'put',  
      data 
    })
  }



      
//编辑菜单的位置  菜单挪位
export function editMenuInfoPosition(data) {
    return request({
      url: `/baseSysMenuEntity/updateInfO`,
      method: 'put',  
      data 
    })
  }





  //删除菜单
export function deleteMenuInfo(data) {
    return request({
      url: `/baseSysMenuEntity/deleteById/${data}`,
      method: 'delete',  
    })
  }




  
  /** 按钮的增删改查 */



  
  //根据菜单id查询按钮
export function getOperateList(params) {
    return request({
      url: '/baseSysOperateEntity/selectByMenuId',
      method: 'get',
      params
    })
  }


  //新增按钮
export function submitOperateInfo(data) {
    return request({
      url: '/baseSysOperateEntity/insert',
      method: 'post',
      data
    })
  }


  
//编辑按钮
export function editOperateInfo(data) {
    return request({
      url: `/baseSysOperateEntity/update`,
      method: 'put',  
      data 
    })
  }



 //删除按钮
export function deleteOperateInfo(data) {
    return request({
      url: `/baseSysOperateEntity/deleteAll`,
      method: 'delete',  
      data 
    })
  }




  

  /** 数据规则  */
  
  //查询数据规则
export function getDataRuleList(params) {
    return request({
      url: '/baseSysDataRuleEntity/selectByMenuId',
      method: 'get',
      params
    })
  }




   //新增数据规则
export function submitDataRuleInfo(data) {
    return request({
      url: '/baseSysDataRuleEntity/insert',
      method: 'post',
      data
    })
  }



  //编辑数据规则
export function editDataRuleInfo(data) {
    return request({
      url: `/baseSysDataRuleEntity/update`,
      method: 'put',  
      data 
    })
  }




  //删除数据规则
export function deleteDataRuleInfo(data) {
    return request({
      url: `/baseSysDataRuleEntity/deleteAll`,
      method: 'delete',  
      data 
    })
  }


  //菜单排序
export function updateSort(data) {
    return request({
      url: `/baseSysMenuEntity/updateSort`,
      method: 'put',  
      data 
    })
  }









 
 


