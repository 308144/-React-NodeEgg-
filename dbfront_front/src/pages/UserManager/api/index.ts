import service from '@/api/service'

// 创建用户
export const findAllUser = data => {
  return service({ url: `/front/findAllUser`, data: data, method: 'post' })
}
// 创建用户
export const removeOneUser = data => {


  return service({ url: `/front/removeOneUser/${data}`, method: 'get' })
}
// 创建用户
export const echoOneUserData = data => {
  return service({ url: `/front/echoOneUserData/${data}`, method: 'get' })
}
