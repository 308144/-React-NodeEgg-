import axios from 'axios'
import service from '@/api/service'

// 创建信息
export const createInformation = data => {
  return axios.post('/front/createInformation', data)
}
// 查询列表页
export const findInformation = params => {
  return axios.post('/front/findInformation', params)
}



// 修改单个数据
export const updateOneInformation = params => {
  return axios.post(`/front/updateOneInformation`, params)
}


// 删除单个数据
export const removeOneInformation = data => {
  return service({ url: `/front/removeInformation`,data:data, method: 'post' })
}


// 回显数据
export const echoOneInformationData = phone => {
  return service({ url: `/front/echoOneInformationData/${phone}`, method: 'get' })
}


// 查询老师数据
export const getSelectTeacherDatas = data => {
  return service({ url: `/front/selectTeacherDatas/${data}`, method: 'get' })
}
// 查询教师的手机号
export const getInformationModalTeacherPhoneData = data => {
  return service({ url: '/front/getInformationModalTeacherPhoneData',data, method: 'post' })
}
