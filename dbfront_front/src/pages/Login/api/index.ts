import { ILoginData } from './types'
import axios from 'axios'
axios.defaults.baseURL = `${process.env.NODE_ENV === 'production' ? 'http://116.62.175.219:7001' : ''}`

// 用户登录
export const userLogin = (data: ILoginData) => {
  return axios.post('/nodeServe/login', data)
}
// 用户登出，清楚token设计
export const logoutByMobile = () => {
  return axios.post('/nodeServe/logout')
}
