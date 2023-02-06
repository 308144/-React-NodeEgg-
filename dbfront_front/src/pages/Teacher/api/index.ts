import service from '@/api/service'


// 查询所有老师
export const findAllTeacher = data => {
  return service({ url: `/front/findAllTeacher`, data: data, method: 'post' })
}
// 删除老师
export const removeOneTeacher = data => {
  return service({ url: `/front/removeOneTeacher/${data}`, method: 'get' })
}
// 回显老师
export const echoOneTeacherData = data => {
  return service({ url: `/front/echoOneTeacherData/${data}`, method: 'get' })
}
