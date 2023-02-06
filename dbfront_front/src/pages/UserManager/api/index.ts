import service from '@/api/service'

// 创建用户
export const findAllUser = data => {
  return service({ url: `/nodeServe/findAllUser`, data: data, method: 'post' })
}
// 创建用户
export const removeOneUser = data => {


  return service({ url: `/nodeServe/removeOneUser/${data}`, method: 'get' })
}
// 创建用户
export const echoOneUserData = data => {
  return service({ url: `/nodeServe/echoOneUserData/${data}`, method: 'get' })
}
