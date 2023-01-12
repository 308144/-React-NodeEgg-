import axios from 'axios'
import service from '@/api/service'

// axios.defaults.baseURL = 'http://127.0.0.1:7001/nodeServe'
// 创建信息
export const createInformation = data => {
  return axios.post('/front/createInformation', data)
}
// 查询列表页
export const findInformation = params => {
  return axios.post('/front/findInformation', params)
}

// 删除单个数据
export const removeOneInformation = phone => {
  return axios.get(`/front/removeInformation/${phone}`)
}

// 修改单个数据
export const updateOneInformation = params => {
  return axios.post(`/front/updateOneInformation`, params)
}

// 回显数据
export const echoOneInformationData = phone => {
  return service({ url: `/front/echoOneInformationData/${phone}`, method: 'get' })
}

// 回显数据
export const echoServiceOneInformationData = phone => {
  return service({ url: `/front/echoOneInformationData/${phone}`, method: 'get' })
}
