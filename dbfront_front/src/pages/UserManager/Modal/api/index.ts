import service from '@/api/service'

// 创建用户
export const adminCreate = data => {
  return service({ url: `/front/adminCreate`,data:data, method: 'post' })
}
// 创建用户
export const updateUser = data => {
  return service({ url: `/front/updateUser`,data:data, method: 'post' })
}
// 上传excle表格
export const uploadExcle = data => {
  return service({ url: `/front/uploadExcle`,data:data, method: 'post' })
}
