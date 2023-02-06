import { ILoginData } from './types'
import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:7001/nodeServe'

// 用户登录
export const userLogin = (data: ILoginData) => {
  return axios.post('/front/login', data)
}
// 用户登出，清楚token设计
export const logoutByMobile = () => {
  return axios.post('/front/logout')
}
