import service from '@/api/service'
// 创建教师信息
export const recruitmenCampusCreate = data => {
  return service({ url: `/nodeServe/recruitmenCampusCreate`, data: data, method: 'post' })
}
// 修改
export const updateRecruitmenCampus = data => {
  return service({ url: `/nodeServe/updateRecruitmenCampus`, data: data, method: 'post' })
}
