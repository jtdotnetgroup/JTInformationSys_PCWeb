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

      // 系统管理
      {
        path: '/systemmanage',
        name: 'systemmanage',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: '系统管理', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/systemmanage/usermanage',
            name: 'usermanage',
            component: () => import('@/views/user/UserList'),
            meta: { title: '用户管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/systemmanage/rolemanage',
            name: 'rolemanage',
            component: () => import('@/views/role/RoleTable'),
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
            component: () => import('@/views/organization/Organization')
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
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
