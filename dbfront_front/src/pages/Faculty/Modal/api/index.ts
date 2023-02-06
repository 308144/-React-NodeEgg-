import service from '@/api/service'
// 创建学院
export const facultyCreate = data => {
  return service({ url: `/front/facultyCreate`,data:data, method: 'post' })
}
// 修改
export const updateFaculty= data => {
  return service({ url: `/front/updateFaculty`,data:data, method: 'post' })
}
