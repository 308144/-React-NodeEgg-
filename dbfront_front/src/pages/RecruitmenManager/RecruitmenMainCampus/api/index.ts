import service from '@/api/service'

// 查询所有老师
export const findAllRecruitmenCampus = data => {
  return service({ url: `/nodeServe/findAllRecruitmenCampus`, data: data, method: 'post' })
}
// 删除老师
export const removeOneRecruitmenCampus = data => {
  return service({ url: `/nodeServe/removeOneRecruitmenCampus/${data}`, method: 'get' })
}
// 回显老师
export const echoOneRecruitmenCampusData = data => {
  return service({ url: `/nodeServe/echoOneRecruitmenCampusData/${data}`, method: 'get' })
}
