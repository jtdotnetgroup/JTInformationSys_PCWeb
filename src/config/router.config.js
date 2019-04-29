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
<<<<<<< HEAD

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

      }

      // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: PageView,
      //   meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/BasicForm'),
      //       meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
      //     }
      //   ]
      // },

      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: PageView,
      //   redirect: '/list/table-list',
      //   meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/StandardList'),
      //       meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic/Index'),
      //       meta: { title: '基础详情页', permission: [ 'profile' ] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: [ 'profile' ] }
      //     }
      //   ]
      // },

      // // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: PageView,
      //   redirect: '/result/success',
      //   meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     }
      //   ]
      // },
=======
>>>>>>> master

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
