import service from '@/api/service'

// 查询所有老师
export const findAllRecruitmen = data => {
  return service({ url: `/nodeServe/findAllRecruitmen`, data: data, method: 'post' })
}
// 删除老师
export const removeOneRecruitmen = data => {
  return service({ url: `/nodeServe/removeOneRecruitmen/${data}`, method: 'get' })
}
// 回显老师
export const echoOneRecruitmenData = data => {
  return service({ url: `/nodeServe/echoOneRecruitmenData/${data}`, method: 'get' })
}
