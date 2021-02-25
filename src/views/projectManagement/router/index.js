/**
 * 项目概览 projectOverview
 * 应用负载 applicationLoad
 * 存储资源 storageResources
 * 配置中心 configurationCenter
 * 项目设置 projectSettings
 */
const c = [
  {
    path: '/projectOverview/SystemConfiguration',
    component: {
      render: h => h('router-view')
    },
    meta: {
      title: '基础配置',
      icon: 'service',
      subTitle: '',
      level: 1
    },
    children: [

      {
        path: '/projectOverview/SystemConfiguration/Systemdictionary',
        component: () => import('@/views/projectManagement/view/menu/Systemdictionary'),
        meta: {
          title: '系统字典',
          icon: 'service',
          subTitle: '',
          level: 2
        }
      },
      // {
      //   path: '/projectOverview/SystemConfiguration/Logdesensitization',
      //   component: () => import('@/views/projectManagement/view/menu/Logdesensitization'),
      //   meta: {
      //     title: '日志脱敏',
      //     icon: 'service',
      //     subTitle: '',
      //     level: 2
      //   }
      // }
    ]
  },

  {
    path: '/projectOverview/authorityManagement',
    component: {render: h => h('router-view')},
    meta: {
      title: '权限管理',
      icon: 'service',
      subTitle: '',
      level: 1
    },
    children: [
       {
        path: '/projectOverview/authorityManagement/organizationManagement',
        component: () => import('@/views/platformManagement/organizationManagement'),
        meta: {
          title: '组织机构',
          icon: 'service',
          subTitle: '',
          level: 2
        }
      },
      {
        path: '/projectOverview/authorityManagement/userManagement',
        component: () => import('@/views/platformManagement/authorityManagement/userManagement'),
        meta: {
          title: '用户管理',
          icon: 'service',
          subTitle: '',
          level: 2
        }
      },
      {
        path: '/projectOverview/authorityManagement/addUserInfo',
        component: () => import('@/views/platformManagement/authorityManagement/addUserInfo'),
        meta: {
          title: '用户管理',
          icon: 'service',
          subTitle: '',
          level: 2
        },
        hidden: true
      },
      {
        path: '/platformManagement/authorityManagement/menumanagement',
        component: () => import('@/views/platformManagement/menumanagement'),
        meta: {
          title: '菜单管理',
          icon: 'service',
          subTitle: '',
          level: 2
        }
      },
      {
        path: '/projectOverview/authorityManagement/roleManagement',
        component: () => import('@/views/platformManagement/authorityManagement/roleManagement'),
        meta: {
          title: '角色管理',
          icon: 'service',
          subTitle: '',
          level: 2
        }
      },
      {
        path: '/projectOverview/authorityManagement/roleAuthorization',
        component: () => import('@/views/platformManagement/roleAuthorization'),
        meta: {
          title: '角色用户',
          icon: 'service',
          subTitle: '',
          level: 2
        }
      },
    
      // {
      //   path: '/projectOverview/authorityManagement/projectManagement',
      //   component: () => import('@/views/projectManagement/view/menu/Menumanagement'),
      //   meta: {
      //     title: '项目管理',
      //     icon: 'service',
      //     subTitle: '',
      //     level: 2
      //   }
      // },
     
     

    ]
  }

]
// 非展示业务界面
const b = [
  {
    path: '/Servicedetailsoverview',
    component: () => import('@/views/projectManagement/view/nonBusiness/Servicedetailsoverview'),
    meta: { title: '服务详情概览' },
    hidden: true
  },
  {
    path: '/Storagevolumedetails',
    component: () => import('@/views/projectManagement/view/nonBusiness/Storagevolumedetails'),
    meta: { title: '存储卷详情' },
    hidden: true
  },
  {
    path: '/Storageresourcesdes',
    component: () => import('@/views/projectManagement/view/menu/applicationLoad/workload/containerGroup/component/dialogmoudle/Storageresources/index.vue'),
    meta: { title: '存储资源' },
    hidden: true
  },
  {
    path: '/Loaddetails',
    component: () => import('@/views/projectManagement/view/menu/applicationLoad/workload/containerGroup'),
    meta: { title: '无状态' },
    hidden: true
  },
  {
    path: '/Storagevolumelistdetils',
    component: () => import('@/views/projectManagement/view/menu/storageResources/storageVolumeManagement/Storagevolumelist/detils.vue'),
    meta: {title: '存储卷列表'},
    hidden: true
  }
]

// function d  (val) {
//     val.forEach(element => {
//         element['name'] = element.path.replace('/\/\/', '')
//         if(element.children) {
//             d(element.children)
//         }
//     });
// }

const a = c.concat(b)
export {
  a
}

