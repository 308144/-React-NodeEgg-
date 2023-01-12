import axios from 'axios'
import qs from 'qs'

// 基础配置
axios.defaults.timeout = 5000
// 是否携带允许携带cookie等
axios.defaults.withCredentials = true

// 对post请求头进行配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => {
  qs.stringify(data)
}

// 请求数据的时候,把本地token从localStorage获取出来
axios.interceptors.request.use(
  (config: any) => {
    let token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

axios.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  err => {
    return Promise.reject(err)
    const { response } = err

    if (response) {
      switch (response.status) {
        case 401: //权限问题,提示未登录或无权限等；
          break
        case 403: //服务器拒绝执行 （token过期）
          break
        case 404: //找不到页面
          break
      }
    } else {
      //服务器连结果都没有返回
      if (!window.navigator.onLine) {
        //断网处理：跳转断网页面/提示网络错误等等
        return
      }
      return Promise.reject(err)
    }
  },
)
