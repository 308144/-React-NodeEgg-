import axios from 'axios'
import service from '@/api/service'
axios.defaults.baseURL = `${process.env.NODE_ENV === 'production' ? 'http://116.62.175.219:7001' : ''}`

// 创建信息
export const createInformation = data => {
  return axios.post('/nodeServe/createInformation', data)
}
// 查询列表页
export const findInformation = params => {
  return axios.post('/nodeServe/findInformation', params)
}



// 修改单个数据
export const updateOneInformation = params => {
  return axios.post(`/nodeServe/updateOneInformation`, params)
}


// 删除单个数据
export const removeOneInformation = data => {
  return service({ url: `/nodeServe/removeInformation`,data:data, method: 'post' })
}


// 回显数据
export const echoOneInformationData = phone => {
  return service({ url: `/nodeServe/echoOneInformationData/${phone}`, method: 'get' })
}


// 查询老师数据
export const getSelectTeacherDatas = data => {
  return service({ url: `/nodeServe/selectTeacherDatas/${data}`, method: 'get' })
}
// 查询教师的手机号
export const getInformationModalTeacherPhoneData = data => {
  return service({ url: '/nodeServe/getInformationModalTeacherPhoneData',data, method: 'post' })
}
