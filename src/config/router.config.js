// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

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
        meta: { title: '工作台', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },

      // production
      {
        path: '/production',
        redirect: '/production/Taskscheduling/Pscheduling',
        component: RouteView,
        meta: { title: '生产管理', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/production/Taskscheduling',
            name: 'Pscheduling',
            component: () => import('@/views/production/Taskscheduling/Pscheduling'),
            meta: { title: '任务排产', keepAlive: true, permission: [ 'form' ] }
          },

          {
            path: '/production/Taskassignment',
            name: 'Dworker',
            component: () => import('@/views/production/Taskassignment/Dworker'),
            meta: { title: '任务派工', keepAlive: true, permission: [ 'form' ] }
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

      // 系统管理
      {
        path: '/systemmanage',
        name: 'systemmanage',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: '系统管理', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/systemmanage/usermanage',
            name: 'usermanage',
            component: () => import('@/views/systemsetting/user/UserList'),
            meta: { title: '用户管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/systemmanage/rolemanage',
            name: 'rolemanage',
            component: () => import('@/views/systemsetting/role/RoleTable'),
            meta: { title: '角色管理', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },

      // 基础资料

      {
        path: '/basicdata',
        name: 'basicdata',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: '基础资料', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/basicdata/organization',
            name: 'organization',
            meta: { title: '组织架构', keepAlive: true, permission: ['dashboard'] },
            component: () => import('@/views/basicdata/organization/Organization')
          }
        ]
      }
      // {
      //   path: '/production',
      //   name: 'production',
      //   component: RouteView,
      //   hideChildrenInMenu: false,
      //   meta: { title: '生产计划', keepAlive: true, permission: ['dashboard'] },
      //   children: [
      //     {
      //       path: '/production/scheduling',
      //       name: 'scheduling',
      //       meta: { title: '任务排产', keepAlive: true, permission: ['dashboard'] },
      //       component: () => import('@/views/jtproduction/production')
      //     }
      //   ]
      // }

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
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
