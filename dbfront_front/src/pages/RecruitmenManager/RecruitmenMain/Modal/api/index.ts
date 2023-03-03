import service from '@/api/service'
// 创建教师信息
export const recruitmenCreate = data => {
  return service({ url: `/nodeServe/recruitmenCreate`,data:data, method: 'post' })
}
// 修改
export const updateRecruitmen= data => {
  return service({ url: `/nodeServe/updateRecruitmen`,data:data, method: 'post' })
}
