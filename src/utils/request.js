import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
// import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'

import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

var url = window.location.host
var baseURL = ''
if (url.indexOf('http://222.72.134.71') >= 0) {
  baseURL = 'http://222.72.134.71:8093'
} else if (url.indexOf('localhost') >= 0) {
  // 开发环境
  // baseURL = 'http://localhost:21021/'
  baseURL = 'http://localhost:21021'
} else {
  baseURL = 'http://222.72.134.71:8093'
  // baseURL = 'http://192.168.1.214:21021'
}

// 创建 axios 实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 40000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)

    switch (error.response.status) {
      case 403: {
        message.error('抱歉，你没有权限操作！', 3)
        break
      }
      case 401: {
        if (!(data.result && data.result.isLogin)) {
          message.error('未授权,请登录', 3)
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
        }
        break
      }
      case 500: {
        const err = error.response.data.error

        const mes = err.message ? err.message : err.details

        message.error(mes, 3)
        break
      }
      case 400: {
        // data.details.forEach(e => {
        //   message.error(e, 2)
        // })
        message.error(data.error.details, 2)
        break
      }
    }

    // if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
    //   message.error('未授权,请登录', 3)
    //   if (token) {
    //     store.dispatch('Logout').then(() => {
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 1500)
    //     })
    //   }
    // }
    // if (error.response.status === 500) {
    //   const err = error.response.data.error
    //   message.error(err.message, 3)
    // }
    // if (error.response.status === 400) {
    //   message.error(data.error.details, 3)
    // }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  config.headers.common['.AspNetCore.Culture'] = 'zh-Hans'
  if (token) {
    // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers.common['Authorization'] = 'Bearer ' + token
  }

  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  // var resData = response.data
  // if (resData.success) {
  //   message.success('操作成功', 3)
  // } else {
  //   message.error('操作异常请联系网管或稍候再试', 3)
  // }

  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
