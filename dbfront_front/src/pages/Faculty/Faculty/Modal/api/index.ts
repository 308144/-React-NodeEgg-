import service from '@/api/service'
// 创建学院
export const facultyCreate = data => {
  return service({ url: `/nodeServe/facultyCreate`,data:data, method: 'post' })
}
// 修改
export const updateFaculty= data => {
  return service({ url: `/nodeServe/updateFaculty`,data:data, method: 'post' })
}
