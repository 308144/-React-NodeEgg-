// 1、为甚不能使用hooks

import { message } from 'antd'
import axios from 'axios'

// import { tokenStorage } from '@/common/localStorage'
// import { DpGo } from '@/utils/auth'

const service = axios.create({
  timeout: 10000,
  withCredentials: true,
})

service.interceptors.request.use(
  config => {
    console.log('res_config', config)
    return config
  },
  error => {
    console.log('error_req')
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    console.log('response', response.data)
    return response.data
  },
  err => {
    const { response } = err

    if (response) {
      // eslint-disable-next-line default-case
      switch (response.status) {
        case 401: // 权限问题,提示未登录或无权限等；
          // DpGo('/login')
          message.error('无cookie，请重新登录')
          break
        case 403: // 服务器拒绝执行 （token过期）
          // DpGo('/login')
          // message.error('身份过期，请重新登录')
          // tokenStorage.removeItem('dbfrontToken')
          break
        case 404: // 找不到页面
          break
      }
    } else {
      // 服务器连结果都没有返回
      if (!window.navigator.onLine) {
        // 断网处理：跳转断网页面/提示网络错误等等
        return
      }
      return Promise.reject(err)
    }
  },
)

export default service
