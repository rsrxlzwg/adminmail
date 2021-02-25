import Vue from 'vue'
import Router from 'vue-router'
import * as managenrouter from '@/views/projectManagement/router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/gateway',
    name: 'gateway',
    component: Layout,
    meta: { title: '通用组件', icon: 'hostManagement', level: 0},
    expand:true,
    children: [
      {
        path: '/gateway/protocolType',
        name: 'protocolType',
        component: () => import('@/views/serviceGrid/genericComponent/protocolType'),
        meta: { title: '协议类型', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/gateway/messageParser',
        name: 'messageParser',
        component: () => import('@/views/serviceGrid/genericComponent/messageParser'),
        meta: { title: '报文解析器', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/gateway/messageType',
        name: 'messageType',
        component: () => import('@/views/serviceGrid/genericComponent/messageType'),
        meta: { title: '报文模式', icon: 'hostManagement', level:1 }
      },
      {
        path: '/gateway/exceptionHandling',
        name: 'exceptionHandling',
        component: () => import('@/views/serviceGrid/genericComponent/exceptionHandling'),
        meta: { title: '异常处理类', icon: 'hostManagement',level:1 },
      },
      {
        path: '/gateway/basicService',
        name: 'basicService',
        component: () => import('@/views/serviceGrid/genericComponent/basicService'),
        meta: { title: '基础抽象服务', icon: 'hostManagement', level: 1}
      },
      {
        path: '/gateway/threadPool',
        name: 'threadPool',
        component: () => import('@/views/serviceGrid/genericComponent/threadPool'),
        meta: { title: '线程池管理', icon: 'hostManagement',level:1},
      },
      {
        path: '/gateway/mappingCodeManagement',
        name: 'mappingCodeManagement',
        component: () => import('@/views/serviceGrid/genericComponent/mappingCodeManagement'),
        meta: { title: '映射码映射', icon: 'hostManagement',level:1 },
      },
      {
        path: '/gateway/balancingStrategy',
        name: 'balancingStrategy',
        // component: () => import('@/views/serviceGrid/genericComponent/mappingCodeManagement'),
        component: () => import('@/views/serviceGrid/genericComponent/balancingStrategy'),
        meta: { title: '负载均衡策略', icon: 'hostManagement',level:1 },
      },
      {
        path: '/gateway/flowControlStrategy',
        name: 'flowControlStrategy',
        component: () => import('@/views/serviceGrid/genericComponent/flowControlStrategy'),
        meta: { title: '流量控制策略', icon: 'hostManagement',level:1 },
      },
      {
        path: '/gateway/adaptationProcess',
        name: 'adaptationProcess',
        component: () => import('@/views/serviceGrid/genericComponent/adaptationProcess'),
        meta: { title: '适配流程', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/gateway/addProcess',
        name: 'addProcess',
        component: () => import('@/views/serviceGrid/genericComponent/addProcess'),
        meta: { title: '适配流程编辑', icon: 'hostManagement', level: 1 },
        hidden:true,
      },
       //   {
      //   path: '/Loadbalancingstrategy',
      //   name: 'Loadbalancingstrategy',
      // component: () => import('@/views/projectManagement/view/menu/Loadbalancingstrategy'),
      //   meta: { title: '负载均衡策略', icon: 'hostManagement', level: 1 },
      //   hidden:true,
      // },

    ]
  },
  {
    path: '/protocolManagement',
    name: 'protocolManagement',
    component: Layout,
    meta: { title: '通讯协议管理', icon: 'hostManagement', level: 0},
    expand:true,
    children: [
      {
        path: '/gateway/Unpackingconfiguration',
        name: 'Unpackingconfiguration',
        component: () => import('@/views/projectManagement/view/menu/Unpackingconfiguration'),
        meta: {
          title: '拆组包配置',
          icon: 'service',
          subTitle: '',
          level: 1
        }
      },
      {
        path: '/gateway/Agreementmanagement',
        name: 'Agreementmanagement',
        component: () => import('@/views/projectManagement/view/menu/Agreementmanagement'),
        meta: {
          title: '协议管理',
          icon: 'service',
          subTitle: '',
          level: 1
        }
      },

    ]
  },
  {
    path: '/serviceGovernance',
    component: Layout,
    meta: { title: '服务治理', level: 0},
    expand:false,
    children: [
      {
        path: '/serviceGovernance/appManagement',
        component: {render: h => h('router-view')},
        meta: {
          title: '应用管理',
          icon: 'service',
          subTitle: '',
          level: 1
        },
        children: [
          {
            path: '/serviceGovernance/appManagement/systemmessage',
            component: () => import('@/views/projectManagement/view/menu/systemmessage/systemmessage.vue'),
            meta: {
              title: '应用配置',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
          {
            path: '/serviceGovernance/appManagement/sdkGroup',
            component: () => import('@/views/projectManagement/view/menu/SDKGroupmanagement'),
            meta: {
              title: 'SDK组管理',
              icon: 'service',
              subTitle: '',
              level: 2
            }
            // SDKGroupmanagement
          },

          // {
          //   path: 'Terminalstartupitemmanagement',
          //   component: () => import('@/views/projectManagement/view/menu/projectOverview/applicationResourceQuota'),
          //   meta: {
          //     title: '启动项管理',
          //     icon: 'service',
          //     subTitle: ''
          //   }
          // },
          {
            path: '/serviceGovernance/appManagement/Versionmanagement',
            component: () => import('@/views/projectManagement/view/menu/Versionmanagement'),
            meta: {
              title: 'SDK版本滚动',
              icon: 'service',
              subTitle: '',
              level: 2
              // Versionmanagement
            }
          },
        {
            path: '/serviceGovernance/appManagement/Parametertemplate',
            component: () => import('@/views/projectManagement/view/menu/Parametertemplate'),
            meta: {
              title: 'SDK动态参数模板',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
           {
            path: '/serviceGovernance/appManagement/Terminalmanagement',
            component: () => import('@/views/projectManagement/view/menu/Terminalmanagement'),
            meta: {
              title: 'SDK终端管理',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
        ]
      },

      {
        path: '/serviceGovernance/Offlinegovernance',
        component: {render: h => h('router-view')},
        meta: {
          title: '线下治理',
          icon: 'service',
          subTitle: '',
          level: 1
        },
        children: [
          {
            path: '/serviceGovernance/Offlinegovernance/Metadatamanagement',
            component: () => import('@/views/projectManagement/view/menu/Metadatamanagement'),
            meta: {
              title: '元数据',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
          {
            path: '/serviceGovernance/Offlinegovernance/Queryinterface',
            // component: () => import('@/views/projectManagement/view/menu/applicationLoad/service/serviceList'),
            component: () => import('@/views/projectManagement/view/menu/Queryinterface'),
            meta: {
              title: '接口管理',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },

          {
            path: '/serviceGovernance/Offlinegovernance/servicePanel',
            component: () => import('@/views/projectManagement/view/menu/Serviceflap'),
            meta: {
              title: '服务挡板',
              icon: 'service',
              subTitle: '',
              level: 2
            }
            // Serviceflap
          },
          {
            path: '/serviceGovernance/Offlinegovernance/serviceCatalog',
            // component: () => import('@/views/projectManagement/view/menu/applicationLoad/service/serviceList'),
            component: () => import('@/views/projectManagement/view/menu/serviceCatalog'),
            meta: {
              title: '服务目录',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
          {
            path: '/serviceGovernance/Offlinegovernance/Servicedefinition',
            component: () => import('@/views/projectManagement/view/menu/Servicedefinition'),
            meta: {
              title: '服务定义',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },

          // {
          //   path: '/serviceGovernance/Offlinegovernance/servicePublication',
          //   component: () => import('@/views/projectManagement/view/menu/Serviceregistration'),
          //   meta: {
          //     title: '服务发布',
          //     icon: 'service',
          //     subTitle: '',
          //     level: 2
          //   }
          // },
          {
            path: '/serviceGovernance/Offlinegovernance/Servicepermissions',
            component: () => import('@/views/projectManagement/view/menu/Servicepermissions'),
            meta: {
              title: '服务发布',
              icon: 'service',
              subTitle:'',
              level: 2
            },
          },
          {
            path: '/serviceGovernance/Offlinegovernance/ServiceInformationManagement',
            // component: () => import('@/views/projectManagement/view/menu/applicationLoad/service/serviceList'),
            component: () => import('@/views/projectManagement/view/menu/ServiceInformationManagement/Serviceinformationmanagementdetails'),
            meta: {
              title: '服务信息管理',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
          {
            path: '/serviceGovernance/Offlinegovernance/Serviceinformationmanagementdetails',
            // component: () => import('@/views/projectManagement/view/menu/applicationLoad/service/serviceList'),
            component: () => import('@/views/projectManagement/view/menu/ServiceInformationManagement'),
            meta: {
              title: '服务信息管理详情',
              icon: 'service',
              subTitle: '',
              level: 2
            },
            hidden: true
          },

          //  {
          //   path: 'Serviceidentification',
          //   component: () => import('@/views/projectManagement/view/menu/Serviceidentification'),
          //   meta: {
          //     title: '服务识别',
          //     icon: 'service',
          //     subTitle:''
          //   },
          // },
          //  {
          //   path: 'Serviceconfigurationmanagement',
          //   // component: () => import('@/views/projectManagement/view/menu/applicationLoad/service/serviceList'),
          //   component: () => import('@/views/projectManagement/view/menu/Serviceconfigurationmanagement'),
          //   meta: {
          //     title: '服务配置管理',
          //     icon: 'service',
          //     subTitle:''
          //   },
          // },
          {
            path: '/serviceGovernance/Offlinegovernance/Interfacemanagement',
            // component: () => import('@/views/projectManagement/view/menu/applicationLoad/service/serviceList'),
            component: () => import('@/views/projectManagement/view/menu/Interfacemanagement'),
            meta: {
              title: '接口管理新增',
              icon: 'service',
              subTitle: '',
              level: 2
            },
            hidden: true
          },



        ]
      },
      {
        path: '/serviceGovernance/onlineGovernance',
        component: {render: h => h('router-view')},
        meta: {
          title: '线上治理',
          icon: 'service',
          subTitle: '',
          level: 1
        },
        children: [
          {
            path: '/serviceGovernance/onlineGovernance/serviceDiscovery',
            name: 'serviceDiscovery',
            component: () => import('@/views/projectManagement/view/menu/Servicediscovery'),
            meta: { title: '服务发现', icon: 'hostManagement', level: 2 }
            //Servicediscovery
          },
          {
            path: '/serviceGovernance/onlineGovernance/faultIsolation',
            name: 'faultIsolation',
            component: () => import('@/views/registrationCenter/registrationCenter'),
            meta: { title: '故障隔离', icon: 'hostManagement', level: 2 }
          },
          {
            path: '/serviceGovernance/onlineGovernance/serviceArbitrationtrafficProfile',
            name: 'serviceArbitrationtrafficProfile',
            component: () => import('@/views/projectManagement/view/menu/Trafficconfiguration'),
            meta: { title: '流量控制', icon: 'hostManagement', level: 2}
          },
          {
            path: '/serviceGovernance/onlineGovernance/TrafficSwitching',
            name: 'Multiactivetrafficswitching',
            component: () => import('@/views/projectManagement/view/menu/Multiactivetrafficswitching'),
            meta: { title: '多活流量分布', icon: 'hostManagement', level: 2}
            // Multiactivetrafficswitching
          },
          {
            path: '/serviceGovernance/onlineGovernance/serviceArbitrationLoadbalancing',
            name: 'serviceArbitrationLoadbalancing',
            component: () => import('@/views/projectManagement/view/menu/Loadbalancing'),
            meta: { title: '负载均衡', icon: 'hostManagement', level: 2}
          },
           {
            path: '/serviceGovernance/onlineGovernance/serviceTopology',
            name:'serviceTopology',
          component: () => import('@/views/logManagement/appTopology'),
            meta: {
              title: '服务SDK拓扑',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
          {
            path: '/serviceGovernance/onlineGovernance/appTopology',
            name:'appTopology',
            component: () => import('@/views/logManagement/serviceTopology'),
            meta: {
              title: '应用SDK拓扑',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },
          {
              path: '/serviceGovernance/onlineGovernance/centralizedTopology',
              component: () => import('@/views/logManagement/centralizedTopology'),
              name:'centralizedTopology',
              meta: {
                title: '集中式SDK拓扑',
                icon: 'service',
                subTitle: '',
                level: 2
              }
          },
          {
            path: '/serviceGovernance/onlineGovernance/Terminalstartupitemmanagement',
            component: () => import('@/views/projectManagement/view/menu/projectOverview/applicationResourceQuota'),
            meta: {
              title: '链路追踪',
              icon: 'service',
              subTitle: '',
              level: 2
            }
          },

          // {
          //   path: '/serviceGovernance/onlineGovernance/serviceTopology',
          //   component: () => import('@/views/logManagement/serviceTopology'),
          //   meta: {
          //     title: 'sdk拓扑图',
          //     icon: 'service',
          //     subTitle: '',
          //     level: 2
          //   }
          // }
        ]
      },


    ]
  },
  {
    path: '/forwardingsettings',
    name: 'Storeandforward',
    component: Layout,
    expand:false,
    meta: {
      title: '发布订阅', icon: 'hostManagement',level: 0
    },
    children: [
      {
        // path: '/Storeandforward/forwardingsettings',
        // name: 'fardingsettings',
        // component: () => import('@/views/projectManagement/view/menu/Storeandforward/forwardingsettings/forwardingsettings'),

        path: '/Storeandforward/Forwardingsettings',
        name: 'fardingsettings',
        component: () => import('@/views/projectManagement/view/menu/Storeandforward/Forwardingsettings/forwardingsettings'),
        meta: { title: '发布设置', icon: 'hostManagement' ,level: 1}
      },
      {
        path: '/Storeandforward/Forwardquery',
        name: 'Forwardquery',
        component: () => import('@/views/projectManagement/view/menu/Storeandforward/Forwardquery'),
        meta: { title: '订阅查询', icon: 'hostManagement',level: 1 }
      }
    ]

  },
  {
    path: '/messageCenter',
    component: Layout,
    meta: { title: '消息中心', level: 0},
    expand:false,
    children: [
      {
        path: '/messageCenter/messageConfiguration',
        name: 'logSearch',
        component: () => import('@/views/messageCenter/messageConfiguration'),
        meta: { title: '消息配置', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/messageCenter/messageQuery',
        name: 'logSearch',
        component: () => import('@/views/messageCenter/messageQuery'),
        meta: { title: '消息查询', icon: 'hostManagement', level: 1 }
      },

    ]
  },
  {
    path: '/registrationCenter',
    component: Layout,
    meta: { title: '注册中心', level: 0},
    expand:false,
    children: [
      {
        path: '/registrationCenter/registrationConfiguration',
        name: 'logSearch',
        component: () => import('@/views/registrationCenter/registrationConfiguration'),
        meta: { title: '注册中心配置', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/messageCenter/blueGreenRelease',
        name: 'logSearch',
        component: () => import('@/views/registrationCenter/blueGreenRelease'),
        meta: { title: '蓝绿发布', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/messageCenter/addRelationship',
        name: 'logSearch',
        component: () => import('@/views/registrationCenter/addRelationship'),
        meta: { title: '主备关系', icon: 'hostManagement', level: 1 },
        hidden:true
      },

    ]
  },
  {
    path: '/projectOverview',
    component: Layout,
    expand:false,
    meta: {
      title: '系统管理', icon: 'Overview',level:0
    },
    // children: [
    //   ...managenrouter.a
    // ],
    children:[
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
          {
            path: '/projectOverview/SystemConfiguration/fileManagement',
            component: () => import('@/views/projectManagement/view/menu/fileManagement'),
            meta: {
              title: '文件管理',
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
  },
  {
    path: '/logManagement',
    component: Layout,
    meta: { title: '日志管理', level: 0},
    expand:false,
    children: [
      {
        path: '/logManagement/logApproval',
        name: 'logApproval',
        component: () => import('@/views/logManagement/logApproval'),
        meta: { title: '审计日志', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/logManagement/logSearch',
        name: 'logSearch',
        component: {render: h => h('router-view')},
        meta: { title: '日志查询', icon: 'hostManagement', level: 1 },
        children:[
          {
            path: '/logManagement/logSearch/index',
            name: 'logSearch',
            component: () => import('@/views/logManagement/logSearch'),
            meta: { title: '日志查询', icon: 'hostManagement', level: 2 }
          },
            {
            path: '/logManagement/logSearch/Logmonitoring',
            name: 'Logmonitoring',
            component: () => import('@/views/projectManagement/view/menu/Logmonitoring'),
            meta: { title: '日志监控', icon: 'hostManagement', level: 2 }
          }
        ]
      },
    ]
  },
  {
    path: '/reportManagement',
    component: Layout,
    redirect: '/serviceGrid/gateway/protocolType',
    meta: { title: '报表管理', level: 0},
    expand:false,
    children: [
      {
        path: '/reportManagement/report1',
        name: 'logSearch',
        component: () => import('@/views/serviceGrid/genericComponent/protocolType'),
        meta: { title: '报表分类1', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/reportManagement/report2',
        name: 'logSearch',
        component: () => import('@/views/serviceGrid/genericComponent/protocolType'),
        meta: { title: '报表分类2', icon: 'hostManagement', level: 1 }
      }
    ]
  },
  {
    path: '/monitoringManagement',
    component: Layout,
    redirect: '/serviceGrid/gateway/protocolType',
    meta: { title: '监控管理', level: 0},
    expand:false,
    children: [
      {
        path: '/monitoringManagement/resourcesMonitoring',
        name: 'logSearch',
        component: () => import('@/views/serviceGrid/genericComponent/protocolType'),
        meta: { title: '资源监控', icon: 'hostManagement', level: 1 }
      },
      {
        path: '/monitoringManagement/warningMonitoring',
        name: 'logSearch',
        component: () => import('@/views/serviceGrid/genericComponent/protocolType'),
        meta: { title: '预警监控', icon: 'hostManagement', level: 1 }
      }
    ]
  },
  // {
  //   path: '/Storeandforward',
  //   name: 'Storeandforward',
  //   component: Layout,
  //   expand:false,
  //   meta: {
  //     title: '存储转发', icon: 'hostManagement',level: 0
  //   },
  //   children: [
  //     {
  //       path: '/Storeandforward/Forwardingsettings',
  //       name: 'Forwardingsettings',
  //       component: () => import('@/views/projectManagement/view/menu/Storeandforward/Forwardingsettings'),
  //       meta: { title: '发布设置', icon: 'hostManagement' ,level: 1}
  //     },
  //     {
  //       path: '/Storeandforward/Forwardquery',
  //       name: 'Forwardquery',
  //       component: () => import('@/views/projectManagement/view/menu/Storeandforward/Forwardquery'),
  //       meta: { title: '订阅查询', icon: 'hostManagement',level: 1 }
  //     },
  //     // {
  //     //   path: '/Storeandforward/Servicesubscription',
  //     //   name: 'Servicesubscription',
  //     //   component: () => import('@/views/projectManagement/view/menu/Storeandforward/Servicesubscription'),
  //     //   meta: { title: '服务订阅映射设置', icon: 'hostManagement',level: 1 }
  //     // }
  //   ]
  // },





  {
    path: '/',
    component: Layout,
    redirect: '/gateway/protocolType',
    meta: { title: '' }
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
