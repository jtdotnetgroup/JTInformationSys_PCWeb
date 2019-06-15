// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse, basics } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: '工作中心', keepAlive: true, icon: 'home' },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作中心', keepAlive: true }
          }
        ]
      },

      // production
      {
        path: '/production',
        redirect: '/production/Taskscheduling/Pscheduling',
        component: RouteView,
        meta: { title: '生产管理', icon: 'form' },
        children: [
          {
            path: '/production/Taskscheduling',
            name: 'Pscheduling',
            component: () => import('@/views/production/Taskscheduling/Pscheduling'),
            meta: { title: '任务排产', keepAlive: true }
          },

          {
            path: '/production/Taskassignment',
            name: 'Dworker',
            component: () => import('@/views/production/Taskassignment/Dworker'),
            meta: { title: '任务派工', keepAlive: true }
          }
          // ,
          // {
          //   path: '/form/base-form',
          //   name: 'BaseForm',
          //   component: () => import('@/views/form/BasicForm'),
          //   meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
          // }
        ]

      },

      // 报表管理
      {
        path: '/Report',
        name: 'Report',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: '报表管理', keepAlive: true, icon: 'bar-chart' },
        children: [
          {
            path: '/Report/DataSource',
            name: 'DataSource',
            meta: { title: '数据源管理', keepAlive: true },
            component: () => import('@/views/Report/DataSource/index')
          },
          {
            path: '/Report/Setting',
            name: 'Setting',
            meta: { title: '报表设置', keepAlive: true },
            component: () => import('@/views/Report/Setting/index')
          }
        ]
      },

      // 基础资料

      {
        path: '/basicdata',
        name: 'basicdata',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: '基础资料', keepAlive: true, icon: 'codepen' },
        children: [
          {
            path: '/basicdata/organization',
            name: 'organization',
            meta: { title: '组织架构', keepAlive: true },
            component: () => import('@/views/basicdata/organization/Organization')
          }, {
            path: '/basicdata/equipmentarchives',
            name: 'equipmentarchives',
            meta: { title: '设备档案', keepAlive: true },
            component: () => import('@/views/basicdata/equipmentarchives/EquipmentArchives')
          },
          {
            path: '/basicdata/Processmaintenance',
            name: 'Processmaintenance',
            meta: { title: '不良项目维护', keepAlive: true },
            component: () => import('@/views/basicdata/Processmaintenance/Process')
          }
        ]
      },

      // // 系统管理
      {
        path: '/systemmanage',
        name: 'systemmanage',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: '系统管理', keepAlive: true, icon: 'setting' },
        children: [
          {
            path: '/systemmanage/usermanage',
            name: 'usermanage',
            component: () => import('@/views/systemsetting/user/UserList'),
            meta: { title: '用户管理', keepAlive: true }
          },
          {
            path: '/systemmanage/rolemanage',
            name: 'rolemanage',
            component: () => import('@/views/systemsetting/role/RoleTable'),
            meta: { title: '角色管理', keepAlive: true }
          }, {
            path: '/systemmanage/taskdispatch',
            name: 'taskdispatch',
            meta: { title: '任务调度', keepAlive: true },
            component: () => import('@/views/systemsetting/taskdispatch/Task')
          },
          {
            path: '/systemmanage/logsmanager',
            name: 'logsmanager',
            meta: { title: '日志查询', keepAlive: true },
            component: () => import('@/views/systemsetting/logsmanager/logsTable')
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/systemsetting/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/systemsetting/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/systemsetting/user/RegisterResult')
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  }

]
