import service from '@/api/service'
// 创建教师信息
export const teacherCreate = data => {
  return service({ url: `/nodeServe/teacherCreate`,data:data, method: 'post' })
}
// 修改
export const updateTeacher= data => {
  return service({ url: `/nodeServe/updateTeacher`,data:data, method: 'post' })
}
